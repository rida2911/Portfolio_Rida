import { Component, EventEmitter, Output, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  @Output() modeToggle = new EventEmitter<void>();
  @Input() isTerminalMode = false;
  
  toggleMode() {
    this.modeToggle.emit();
  }
}
