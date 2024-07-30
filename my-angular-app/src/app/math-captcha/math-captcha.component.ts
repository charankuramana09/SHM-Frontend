import { Component } from '@angular/core';

@Component({
  selector: 'app-math-captcha',
  templateUrl: './math-captcha.component.html',
  styleUrl: './math-captcha.component.scss'
})
export class MathCaptchaComponent {
  question: string = '';
  answer: number = 0;
  userAnswer: number = 0;
  captchaStatus: 'pending' | 'success' | 'error' = 'pending';

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

    this.captchaStatus = 'pending';
  }

  verifyCaptcha(): void {
    if (this.answer === this.userAnswer) {
      this.captchaStatus = 'success';
    } else {
      this.captchaStatus = 'error';
    }
  }
}
