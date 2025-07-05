// app.component.ts is the source file that describes the app-root component. This is the top-level Angular component in the app.
//  A component is the basic building block of an Angular application. The component description includes the component's code,
//  HTML template, and styles, which can be described in this file, or in separate files.
import { Component, AfterViewInit, NgZone, OnDestroy, PLATFORM_ID, Inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterOutlet } from '@angular/router';

import { HeaderComponent } from './components/header/header.component';
import { SidebarLeftComponent } from './components/sidebar-left/sidebar-left.component';
import { SidebarRightComponent } from './components/sidebar-right/sidebar-right.component';
import { AboutComponent } from './components/about/about.component';
import { WhatIDoComponent } from './components/what-i-do/what-i-do.component';
import { ExperienceComponent } from './components/experience/experience.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { SkillsComponent } from './components/skills/skills.component';
import { EducationComponent } from './components/education/education.component';
import { AchievementsComponent } from './components/achievements/achievements.component';
import { ExtracurricularsComponent } from './components/extracurriculars/extracurriculars.component';
import { ContactComponent } from './components/contact/contact.component';
import { FooterComponent } from './components/footer/footer.component';
import { TerminalComponent } from './components/terminal/terminal.component';

@Component({
  selector: 'app-root',
  standalone: true, 
  imports: [
    CommonModule,
    RouterOutlet,
    HeaderComponent,
    SidebarLeftComponent,
    SidebarRightComponent,
    AboutComponent,
    WhatIDoComponent,
    ExperienceComponent,
    ProjectsComponent,
    SkillsComponent,
    EducationComponent,
    AchievementsComponent,
    ExtracurricularsComponent,
    ContactComponent,
    FooterComponent,
    TerminalComponent, 
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'] 
})
export class AppComponent implements AfterViewInit, OnDestroy {
  isTerminalMode = false;
  activeSection: string = 'about'; // default visible section
  private observer?: IntersectionObserver;

  constructor(
    private ngZone: NgZone,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  toggleMode() {
    this.isTerminalMode = !this.isTerminalMode;
  }

  ngAfterViewInit(): void {
    // Only run in browser environment
    if (isPlatformBrowser(this.platformId)) {
      // Use setTimeout to ensure DOM is fully rendered
      setTimeout(() => {
        this.setupIntersectionObserver();
      }, 100);
    }
  }

  ngOnDestroy(): void {
    if (this.observer) {
      this.observer.disconnect();
    }
  }

  private setupIntersectionObserver(): void {
    // Double-check we're in browser environment
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    const sections = document.querySelectorAll('section[id]');

    // Check if IntersectionObserver is available
    if (typeof IntersectionObserver === 'undefined') {
      return;
    }

    this.observer = new IntersectionObserver(
      (entries) => {
        // Find the section with the highest intersection ratio
        let mostVisibleSection = entries.reduce((prev, current) => {
          return current.intersectionRatio > prev.intersectionRatio ? current : prev;
        });

        if (mostVisibleSection.isIntersecting && mostVisibleSection.intersectionRatio > 0.3) {
          // Use NgZone to trigger change detection
          this.ngZone.run(() => {
            this.activeSection = mostVisibleSection.target.id;
          });
        }
      },
      {
        threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0],
        rootMargin: '-10% 0px -10% 0px' // Slight margin to improve detection
      }
    );

    sections.forEach(section => {
      if (section.id) {
        this.observer?.observe(section);
      }
    });
  }
}