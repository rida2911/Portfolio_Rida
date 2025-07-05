import { Component } from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent {
  contactInfo = {
    name: 'Rida Jahan',
    title: 'Software Engineer',
    phone: '+91 990795XXXX',
    email: 'ridajahan750@gmail.com',
    linkedin: 'LinkedIn',
    profileImage: 'rida_head_shot.jpg'
  };

  onPhoneClick() {
    window.open(`tel:${this.contactInfo.phone}`, '_self');
  }

  onEmailClick() {
    window.open(`mailto:${this.contactInfo.email}`, '_self');
  }

  onLinkedInClick() {
    window.open('https://www.linkedin.com/in/rida-jahan', '_blank');
  }
}