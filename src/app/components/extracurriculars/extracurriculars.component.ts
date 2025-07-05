import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Extracurricular {
  id: number;
  title: string;
  organization: string;
  duration: string;
  description: string;
  highlights: string[];
  icon: string;
  color: string;
}

@Component({
  selector: 'app-extracurriculars',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './extracurriculars.component.html',
  styleUrls: ['./extracurriculars.component.scss']
})
export class ExtracurricularsComponent {
  extracurriculars: Extracurricular[] = [
    {
      id: 1,
      title: 'WWT ALWOH 2025',
      organization: 'Women Who Tech',
      duration: 'July2025',
      description: 'Participated in a national-level women-centric hackathon focused on AI and innovation.',
      highlights: [
        'Built a solution using machine learning to tackle social good challenges',
        'Collaborated in a team of 4 to develop and pitch the prototype',
        'Strengthened skills in problem-solving, teamwork, and AI tools'
      ],
      icon: '👩‍💻',
      color: 'violet'
    },
    {
     id: 2,                      
     title: 'AWS Cloud Practitioner Essentials',
     organization: 'AWS Skill Builder',
     duration: 'January 2025',
     description: 'Completed AWS’s foundational cloud course, covering core services and architectural best practices.',
     highlights: [
    'Earned official AWS Cloud Practitioner Essentials Certification ',
    'Learning EC2, S3, IAM, and Lambda through hands-on labs',
    'Understanding AWS cloud security, billing, and pricing models',
     ],
    icon: '☁️',
    color: 'purple'
    },

    {
      id: 3,
      title: 'Meesho ScriptedByHer 2025',
      organization: 'Meesho',
      duration: 'June 2025',
      description: 'Shortlisted for Meesho’s all-women national hackathon celebrating women in tech and coding excellence',
      highlights: [
        'Qualified for the national-level coding challenge',
        'Focused on promoting diversity and innovation in tech',
        'Supporting women in tech career development'
      ],
      icon: '💻',
      color: 'light-purple'
    }
  ];

  constructor() { }

  trackByFn(index: number, item: Extracurricular): number {
    return item.id;
  }
}