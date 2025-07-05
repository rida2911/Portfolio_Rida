import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Achievement {
  id: number;
  title: string;
  organization: string;
  description: string;
  amount?: string;
  period: string;
  icon: string;
  category: string;
  highlights: string[];
  color: string;
}

@Component({
  selector: 'app-achievements',
  imports: [CommonModule],
  templateUrl: './achievements.component.html',
  styleUrl: './achievements.component.scss'
})
export class AchievementsComponent implements OnInit {
  achievements: Achievement[] = [


{
     id: 1,   
     title: 'Cisco Virtual Internship Program 2025',
     organization: 'Cisco Networking Academy',
     description: 'Selected for Cisco’s national virtual internship; completing the Cyber‑Security & Networking track under industry mentors.',
     period: 'June 2025 – Present 2025',  
     icon: '🛡️',
     category: 'program',
     highlights: [ 'Hands‑on NetAcad labs','Cyber‑Security & Networking pathway','Mentor‑guided coursework'],
     color: 'cisco',

    },
    {
      id: 2,
      title: 'Google Girl Hackathon',
      organization: 'Google',
      description: 'Selected for the prestigious national-level hackathon by Google, focused on innovation and women in tech',
      period: 'February 2025',
      icon: '👩‍💻',
      category: 'competition',
      highlights: ['Google Event', 'Selected Participant', 'Women in Tech'],
      color: 'google'
    },
    {
      id: 3,
      title: 'Infosys Springboard Pragati - Cohort 3',
      organization: 'Infosys',
      description: 'Selected among top students across India for Infosys Springboard Cohort 3',
      period: 'October 2024 - March 2025',
      icon: '🎓',
      category: 'program',
      highlights: ['Tech Skill Development', 'Industry Exposure', 'Elite Selection'],
      color: 'infosys'
    },
    {
      id: 4,
      title: 'HackSRIT Top 10 Team',
      organization: 'Shri Ram Institute of Technology',
      description: 'Top 10 out of 200+ teams; developed a AI-based civic issue reporting system with real-time feedback',
      period: '2025',
      icon: '🏆',
      category: 'competition',
      highlights: ['Top 10 out of 220+', 'AI-based Civic Tech Solution', 'Web + AI Integration'],
      color: 'hackathon'
    },
    {
      id: 5,
      title: 'Academic Excellence Recognition',
      organization: 'University',
      description: 'Maintained a strong academic record with consistent performance every semester',
      period: '2022 - 2025',
      icon: '🌟',
      category: 'academic',
      highlights: ['CGPA 8.05', 'Top Performer', 'Focused & Disciplined'],
      color: 'academic'
    }
  ];

  selectedCategory: string = 'all';
  visibleAchievements: Achievement[] = [];

  ngOnInit(): void {
    this.visibleAchievements = this.achievements;
  }

  filterAchievements(category: string): void {
    this.selectedCategory = category;
    if (category === 'all') {
      this.visibleAchievements = this.achievements;
    } else {
      this.visibleAchievements = this.achievements.filter(
        achievement => achievement.category === category
      );
    }
  }

  getFilteredAchievements(): Achievement[] {
    return this.visibleAchievements;
  }

  trackByAchievement(index: number, achievement: Achievement): number {
    return achievement.id;
  }

  getTotalAwards(): number {
    return this.achievements.length;
  }

  getScholarshipValue(): string {
    const scholarships = this.achievements.filter(a => a.amount);
    const total = scholarships.reduce((sum, a) => {
      const amount = parseFloat(a.amount!.replace(/[$,]/g, ''));
      return sum + amount;
    }, 0);
    return `$${total.toLocaleString()}`;
  }

  getYearsOfExcellence(): string {
    const years = new Set<string>();
    this.achievements.forEach(achievement => {
      const period = achievement.period;
      if (period.includes('-')) {
        const [start, end] = period.split('-').map(p => p.trim());
        const startYear = parseInt(start.match(/\d{4}/)?.[0] || '0');
        const endYear = parseInt(end.match(/\d{4}/)?.[0] || '0');
        for (let year = startYear; year <= endYear; year++) {
          years.add(year.toString());
        }
      } else {
        const year = period.match(/\d{4}/)?.[0];
        if (year) years.add(year);
      }
    });
    return `${years.size}+`;
  }
}