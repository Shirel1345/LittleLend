
import { Component } from '@angular/core';

@Component({
  selector: 'app-safety',
  templateUrl: './safety.component.html',
  styleUrls: ['./safety.component.css']
})
export class SafetyComponent {
  products = [
    { name: 'מוצר 1', image: 'path/to/image1.jpg' },
    { name: 'מוצר 2', image: 'path/to/image2.jpg' },

  ];
}
