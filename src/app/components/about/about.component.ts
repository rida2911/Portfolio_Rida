import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-about',
  imports: [CommonModule],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent {
  title = 'ABOUT ME';
  name = 'Rida Jahan';
  roles = ['Software Developer', 'Dreamer','AI Explorer' ,'Engineer'];
  description = 'Final Year Undergraduate in Computer Science Engineering with a passion for building innovative solutions. I focus on creating high-quality digital experiences through clean code and creative problem-solving.';

  // Animation state
  isVisible = false;

  ngOnInit() {
    // Trigger animations after component loads
    setTimeout(() => {
      this.isVisible = true;
    }, 100);
  }
}