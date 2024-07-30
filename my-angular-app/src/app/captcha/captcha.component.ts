import { Component, OnInit } from '@angular/core';
import { CaptchaService } from '../services/captcha.service';

@Component({
  selector: 'app-captcha',
  templateUrl: './captcha.component.html',
  styleUrls: ['./captcha.component.css']
})
export class CaptchaComponent implements OnInit {
  captcha: string = '';
  userCaptcha: string = '';
  captchaVerified: boolean = false;

  constructor(private captchaService: CaptchaService) { }

  ngOnInit(): void {
    this.refreshCaptcha();
  }

  refreshCaptcha(): void {
    this.captcha = this.captchaService.generateCaptcha();
  }

  verifyCaptcha(): void {
    this.captchaVerified = this.captcha === this.userCaptcha;
    if (this.captchaVerified) {
      alert('Captcha Verified Successfully');
    } else {
      alert('Captcha Verification Failed');
    }
  }
}
