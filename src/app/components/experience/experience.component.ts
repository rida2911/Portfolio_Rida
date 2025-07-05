import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './experience.component.html',
  styleUrl: './experience.component.scss'
})
export class ExperienceComponent {
  
  experiences = [
     {
      id: 1,
      position: 'Software Developer Intern',
      company: 'Web D Solution',
      period: 'May 2025 - Present',
      type: 'Internship',
      description: 'Contributing to modern web solutions focused on responsive design and performance. Collaborating with the development team on scalable features, and real-time bug resolution using agile practices.',
      skills: ['Software Engineering', 'Frontend Development', 'Clean Code'],
      isLeft: false
    },
     {
      id: 2,
      position: 'Web Developer Intern',
      company: 'KrishiVerse',
      period: 'March 2025 – May 2025',
      type: 'Internship',
      description: 'Contributed to the development of responsive and interactive web modules as part of the product team. Worked closely with developers and designers to build seamless user interfaces and ensure consistent functionality across the platform. Played an active role in testing, resolving bugs, and improving overall site performance.',
      skills: ['Web Development', 'API Integration', 'Debugging'],
      isLeft: true
    },
    {
      id:  3,
      position: 'AI/ML Intern',
      company : 'AICTE - TechSaksham (Microsoft & SAP CSR)',
      period : 'November 2024 – December 2024',
      type: 'Internship',
      description : 'Completed a structured internship focused on Artificial Intelligence under the TechSaksham initiative by Microsoft and SAP. Gained hands-on exposure through live sessions, mini-projects, and mentor-led learning on real-world AI applications.',
      skills : ['Artificial Intelligence', 'Machine Learning', 'Industry Exposure', 'Mentored Learning'],
      isLeft: false
    },
  ];
  hoveredExperience: number | null = null;

  onMouseEnter(id: number): void {
    this.hoveredExperience = id;
  }

  onMouseLeave(): void {
    this.hoveredExperience = null;
  }
}