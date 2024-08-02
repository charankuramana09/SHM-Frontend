import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CaptchaService } from '../services/captcha.service';

@Component({
  selector: 'app-captcha',
  templateUrl: './captcha.component.html',
  styleUrls: ['./captcha.component.scss']
})
export class CaptchaComponent implements OnInit {
  captcha: string = '';
  userCaptcha: string = '';
  captchaStatus: 'pending' | 'success' | 'error' = 'pending'; 
  @Output() captchaValidity = new EventEmitter<boolean>();
  errorMessage: string | null = null; 
  invalidMessage : string | null;

  constructor(private captchaService: CaptchaService) { }

  ngOnInit(): void {
    this.refreshCaptcha();
  }

  refreshCaptcha(): void {
    this.captcha = this.captchaService.generateCaptcha();
    this.captchaStatus = 'pending'; 
    this.errorMessage = null; 
    this.userCaptcha = ''; 
  }

  verifyCaptcha(): void {
    if (!this.userCaptcha) {
      this.errorMessage = 'captcha cannot be empty';
      this.captchaValidity.emit(false);
      return;
    }
    else if (this.captcha === this.userCaptcha) {
      this.captchaStatus = 'success';
      this.captchaValidity.emit(true);
      this.errorMessage = null; 
      this.invalidMessage=null;
    } else {
      this.captchaStatus = 'error';
      this.captchaValidity.emit(false);
      this.invalidMessage = 'Invalid captcha.';   
      this.refreshCaptcha(); 
    }
  }
}
