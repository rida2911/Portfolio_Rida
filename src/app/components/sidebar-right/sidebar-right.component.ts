import { Component, Input, OnInit, PLATFORM_ID, Inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';

interface NavLink {
  name: string;
  link: string;
  id: string; // Add id for easier comparison
}

@Component({
  selector: 'app-sidebar-right',
  imports: [CommonModule],
  templateUrl: './sidebar-right.component.html',
  styleUrls: ['./sidebar-right.component.scss']
})
export class SidebarRightComponent implements OnInit {
  @Input() activeSection: string = 'about';
  isMenuOpen: boolean = false; // Add property to track menu state

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  navLinks: NavLink[] = [
    { name: 'About', link: '#about', id: 'about' },
    { name: 'What I Do', link: '#what-i-do', id: 'what-i-do' },
    { name: 'Experience', link: '#experience', id: 'experience' },
    { name: 'Projects', link: '#projects', id: 'projects' },
    { name: 'Skills', link: '#skills', id: 'skills' },
    { name: 'Education', link: '#education', id: 'education' },
    { name: 'Achievements', link: '#achievements', id: 'achievements' },
    { name: 'Extracurriculars', link: '#extracurriculars', id: 'extracurriculars' },
    { name: 'Contact', link: '#contact', id: 'contact' }
  ];

  ngOnInit(): void {
    // Only run in browser environment
    if (isPlatformBrowser(this.platformId)) {
      this.setupScrollProgress();
      this.setupMobileMenuHandlers();
    }
  }

  private setupScrollProgress(): void {
    // Double-check we're in browser environment
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    const progressBar = document.getElementById('scrollProgressBar');
    if (!progressBar) return;

    const updateScrollProgress = () => {
      if (!isPlatformBrowser(this.platformId)) return;
      
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrollPercent = (scrollTop / scrollHeight) * 100;
      progressBar.style.height = `${scrollPercent}%`;
    };

    window.addEventListener('scroll', updateScrollProgress);
    updateScrollProgress(); // Initial call
  }

  private setupMobileMenuHandlers(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    // Close menu when clicking outside (with timeout to prevent immediate closing)
    setTimeout(() => {
      document.addEventListener('click', (event) => {
        const sidebar = document.querySelector('.sidebar-right');
        const menuToggle = document.querySelector('.mobile-menu-toggle');
        const target = event.target as HTMLElement;
        
        if (sidebar && menuToggle && 
            !sidebar.contains(target) && 
            !menuToggle.contains(target) && 
            this.isMenuOpen) {
          this.isMenuOpen = false;
        }
      });
    }, 100);

    // Close menu on window resize if it becomes desktop size
    window.addEventListener('resize', () => {
      if (window.innerWidth > 1024 && this.isMenuOpen) {
        this.isMenuOpen = false;
      }
    });
  }

  // Method to toggle mobile menu
  toggleMobileMenu(event?: Event): void {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    console.log('Toggle clicked, current state:', this.isMenuOpen); // Debug log
    this.isMenuOpen = !this.isMenuOpen;
    console.log('New state:', this.isMenuOpen); // Debug log
  }

  // Method to handle smooth scrolling when clicking nav links
  scrollToSection(event: Event, link: string): void {
    // Only run in browser environment
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    event.preventDefault();
    const targetId = link.substring(1); // Remove the '#' from the link
    const targetElement = document.getElementById(targetId);
    
    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
      
      // Close mobile menu after clicking a link
      this.isMenuOpen = false;
    }
  }
}