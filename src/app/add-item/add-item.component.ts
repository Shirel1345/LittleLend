import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  FormBuilder,
  FormGroup,

  Validators,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';




@Component({
  selector: 'app-add-item',
  standalone: true,
  imports: [FormsModule, MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,],
  templateUrl: './add-item.component.html',
  styleUrl: './add-item.component.css'

})
export class AddItemComponent {

  category: string = '';
  image: string = '';
  name: string = '';
  company: string = '';
  description: string = '';
  deposit: number = 0;
  question: string = '';
  isAvailable: boolean = false;

  // פונקציה שתטפל בהוספת הפריט
  addItem() {
    // כאן יש להטיל פעולות שתבצע את הוספת הפריט כמו שצריך
    console.log('הפריט הוסף בהצלחה!');
  }


}


