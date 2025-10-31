import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './contact-us.html',
  styleUrls: ['./contact-us.css']
})
export class ContactUs {
  name: string = '';
  email: string = '';
  message: string = '';

  onSubmit() {
    alert(`Thank you, ${this.name}! Your message has been received.`);
    this.name = '';
    this.email = '';
    this.message = '';
  }
}
