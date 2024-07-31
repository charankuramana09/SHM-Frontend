import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CaptchaService {

  private characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  
  constructor() { }

  generateCaptcha(length: number = 6): string {
    let captcha = '';
    for (let i = 0; i < length; i++) {
      captcha += this.characters.charAt(Math.floor(Math.random() * this.characters.length));
    }
    return captcha;
  }
}

