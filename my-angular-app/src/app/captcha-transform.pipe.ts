import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'captchaTransform'
})
export class CaptchaTransformPipe implements PipeTransform {

  transform(value: string): string {
    let result = '';
    for (let i = 0; i < value.length; i++) {
      const char = value.charAt(i);
      const randomSize = Math.floor(Math.random() * 10) + 15;
      const randomRotation = Math.floor(Math.random() * 21) - 10;
      const randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
      result += `<span style="font-size:${randomSize}px; color:${randomColor}; transform:rotate(${randomRotation}deg);">${char}</span>`;
    }
    return result;
  }

}
