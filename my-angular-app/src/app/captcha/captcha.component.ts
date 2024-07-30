import { Component, OnInit } from '@angular/core';
import { CaptchaService } from '../services/captcha.service';

@Component({
  selector: 'app-captcha',
  templateUrl: './captcha.component.html',
  styleUrls: ['./captcha.component.scss']
})
export class CaptchaComponent implements OnInit {
  captcha: string = '';
  userCaptcha: string = '';
  captchaStatus: 'pending' | 'success' | 'error' = 'pending'; // Track status

  constructor(private captchaService: CaptchaService) { }

  ngOnInit(): void {
    this.refreshCaptcha();
  }

  refreshCaptcha(): void {
    this.captcha = this.captchaService.generateCaptcha();
    this.captchaStatus = 'pending'; // Reset status
  }

  verifyCaptcha(): void {
    if (this.captcha === this.userCaptcha) {
      this.captchaStatus = 'success';
    } else {
      this.captchaStatus = 'error';
    }
  }
}