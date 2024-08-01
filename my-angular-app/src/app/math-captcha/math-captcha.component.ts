import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-math-captcha',
  templateUrl: './math-captcha.component.html',
  styleUrls: ['./math-captcha.component.scss']
})
export class MathCaptchaComponent implements OnInit {
  question: string = '';
  answer: number = 0;
  userAnswer: number | null = null;
  captchaStatus: 'pending' | 'success' | 'error' = 'pending';
  @Output() mathCaptchaValidity = new EventEmitter<boolean>();
  errorMessage: string | null = null; // Initialize to null
  hasInteracted: boolean = false; // Track user interaction
  invalidMessage:string | null = null;
  ngOnInit(): void {
    this.generateMathCaptcha();
  }

  generateMathCaptcha(): void {
    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * 10) + 1;
    const operations = ['+', '-', '*'];
    const operation = operations[Math.floor(Math.random() * operations.length)];
    
    this.question = `${num1} ${operation} ${num2}?`;

    switch (operation) {
      case '+':
        this.answer = num1 + num2;
        break;
      case '-':
        this.answer = num1 - num2;
        break;
      case '*':
        this.answer = num1 * num2;
        break;
    }
  }

  resetCaptcha(): void {

    this.captchaStatus = 'pending';
    this.errorMessage = null;
    this.userAnswer = null; 
    this.mathCaptchaValidity.emit(false); 
    this.hasInteracted = false; 
  }

  verifyCaptcha(): void {
    

    if (this.userAnswer === null || this.userAnswer === undefined) {
      this.errorMessage = 'Value cannot be empty';
      this.mathCaptchaValidity.emit(false);
      return;
    }

    if (this.answer === this.userAnswer) {
      this.captchaStatus = 'success';
      this.errorMessage = null; 
      this.mathCaptchaValidity.emit(true);
    } else {
      this.captchaStatus = 'error';
      this.invalidMessage = 'Invalid value.'; 
      this.mathCaptchaValidity.emit(false);
      this.resetCaptcha();
      this.generateMathCaptcha(); 
    }
  }
}
