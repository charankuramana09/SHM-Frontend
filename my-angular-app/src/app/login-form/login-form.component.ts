import { Component, OnInit } from '@angular/core';
import { CaptchaService } from '../services/captcha.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {
  model = {
    role: '',
    email: '',
    password: '',
    captchaInput: '',
    sum: null
  };
  captcha: string;
  number1: number;
  number2: number;

  constructor(private captchaService: CaptchaService) { }

  ngOnInit(): void {
    this.generateCaptcha();
    this.generateNumbers();
  }

  generateCaptcha(): void {
    this.captcha = this.captchaService.generateCaptcha();
  }

  generateNumbers(): void {
    this.number1 = Math.floor(Math.random() * 10);
    this.number2 = Math.floor(Math.random() * 10);
  }

  verifyCaptcha(): boolean {
    return this.model.captchaInput === this.captcha;
  }

  sumValidator(sum: number): boolean {
    return sum === (this.number1 + this.number2);
  }

  onSubmit(form: any): void {
    if (form.valid && this.verifyCaptcha() && this.sumValidator(this.model.sum)) {
      // Handle form submission
      console.log('Form Submitted!', this.model);
    } else {
      console.log('Form is invalid, CAPTCHA does not match, or sum is incorrect');
    }
  }
}
