import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
interface SocialLink {
  name: string;
  url: string;
  icon: string;
}

@Component({
  selector: 'app-sidebar-left',
  imports: [CommonModule],
  templateUrl: './sidebar-left.component.html',
  styleUrls: ['./sidebar-left.component.scss']
})
export class SidebarLeftComponent {
  socialLinks: SocialLink[] = [
    {
      name: 'GitHub',
      url: 'https://github.com/rida2911',
      icon: 'fab fa-github'
    },
    {
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/in/rida-jahan',
      icon: 'fab fa-linkedin-in'
    },
    {
      name: 'Email',
      url: 'mailto:ridajahan750@gmail.com',
      icon: 'fas fa-envelope'
    },
     {
    name: 'LeetCode',
    url: 'https://leetcode.com/u/Rida_Jahan/',
    icon: 'fas fa-code'
  }
  ];
}