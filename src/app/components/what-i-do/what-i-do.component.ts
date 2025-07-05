import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-what-i-do',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './what-i-do.component.html',
  styleUrl: './what-i-do.component.scss'
})
export class WhatIDoComponent {
  
  services = [
    {
      title: 'SOFTWARE ENGINEERING',
      description: 'Building scalable, efficient, and reliable software solutions using modern technologies and best practices.'
    },
    {
      title: 'WEB DEVELOPMENT',
      description: 'Crafting responsive, interactive web applications using cutting-edge frameworks and technologies. Focus on user experience, performance optimization, and modern design principles.'
    },
    {
      title: 'FRONTEND',
      description: 'Creating stunning, responsive user interfaces with modern frameworks like Angular, React, and Vue. Emphasis on accessibility, performance, and delightful user experiences.'
    },
    {
      title: 'BACKEND',
      description: 'Developing secure, scalable server-side applications and APIs. Expertise in database design, cloud services, microservices architecture, and performance optimization.'
    },
    {
      title: 'MACHINE LEARNING',
      description: 'Exploring machine learning through practical projects, model training, and data analysis with real-world tools and frameworks.'
    },
      {
      title: 'TECH EXPLORATION',
      description: 'Diving deep into the world of technology through hands-on practice, curiosity-driven learning, and real-world problem-solving.'
      },


  ];

  hoveredIndex: number | null = null;

  onMouseEnter(index: number): void {
    this.hoveredIndex = index;
  }

  onMouseLeave(): void {
    this.hoveredIndex = null;
  }
}