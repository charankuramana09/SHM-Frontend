// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-form-selector',
//   templateUrl: './form-selector.component.html',
//   styleUrls: ['./form-selector.component.scss']
// })
// export class FormSelectorComponent {
//   selectedCategory: string = '';

//   onCategoryChange(event: any) {
//     this.selectedCategory = event.target.value;
//   }
// }

import { Component } from '@angular/core';

@Component({
  selector: 'app-form-selector',
  templateUrl: './form-selector.component.html',
  styleUrls: ['./form-selector.component.scss']
})
export class FormSelectorComponent {
  selectedCategory: string = '';

  onCategoryChange(event: any) {
    this.selectedCategory = event.target.value;
  }
}

