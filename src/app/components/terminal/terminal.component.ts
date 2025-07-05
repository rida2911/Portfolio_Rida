import { Component, ElementRef, ViewChild, AfterViewInit, HostListener} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule, NgClass } from '@angular/common';
interface Command {
  name: string;
  description: string;
  aliases?: string[];
}

interface TerminalLine {
  type: 'input' | 'output' | 'error';
  content: string;
  timestamp?: Date;
}

@Component({
  selector: 'app-terminal',
  standalone: true,
  imports: [FormsModule, CommonModule, NgClass],
  templateUrl: './terminal.component.html',
  styleUrls: ['./terminal.component.scss']
})
export class TerminalComponent implements AfterViewInit {
  // @ViewChild('terminalInput') terminalInput!: ElementRef;
  @ViewChild('terminalContent') terminalContent!: ElementRef;
  @ViewChild('terminalInput') terminalInput!: ElementRef<HTMLInputElement>;
  @ViewChild('cursorRef') cursorRef!: ElementRef<HTMLSpanElement>;
  @ViewChild('promptRef') promptRef!: ElementRef<HTMLSpanElement>;
  @ViewChild('inputTextRef') inputTextRef!: ElementRef<HTMLSpanElement>;

  currentInput = '';
  commandHistory: string[] = [];
  historyIndex = -1;
  terminalLines: TerminalLine[] = [];
  currentPath = '~/portfolio';
  userName = 'rida';

  private commands: Command[] = [
    { name: 'help', description: 'Display all available commands' },
    { name: 'about-me', description: 'Display information about me', aliases: ['about'] },
    { name: 'experiences', description: 'Show my work experiences', aliases: ['exp', 'work'] },
    { name: 'projects', description: 'Show all projects' },
    { name: 'get-projects', description: 'Get projects by category (web, ml, mobile, miscellaneous)' },
    { name: 'skills', description: 'Display my technical skills' },
    { name: 'education', description: 'Show my educational background', aliases: ['edu'] },
    { name: 'achievements', description: 'Display my achievements and awards' },
    { name: 'extracurriculars', description: 'Show extracurricular activities', aliases: ['extra'] },
    { name: 'get-github', description: 'Get GitHub profile URL', aliases: ['github'] },
    { name: 'get-linkedin', description: 'Get LinkedIn profile URL', aliases: ['linkedin'] },
    { name: 'get-leetcode', description: 'Get leetcode profile URL', aliases: ['leetcode'] },
    { name: 'get-email', description: 'Get email address', aliases: ['email'] },
    { name: 'get-resume', description: 'Download resume', aliases: ['resume'] },
    { name: 'clear', description: 'Clear the terminal screen' },
    { name: 'whoami', description: 'Display current user' },
    { name: 'pwd', description: 'Print working directory' },
    { name: 'date', description: 'Display current date and time' },
    { name: 'echo', description: 'Display a line of text' }
  ];

  // Data from your portfolio
  private personalInfo = {
    name: 'Rida Jahan',
    roles: ['Software Developer', 'Dreamer','AI Explorer' ,'Engineer'],
    description: 'Final Year Undergraduate in Computer Science Engineering with a passion for building innovative solutions. I focus on creating high-quality digital experiences through clean code and creative problem-solving..'
  };

  private experiences = [
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

  private projects = [
     {
    id: 1,
    title: 'Achievo - Your Path to Success',
    description:  'Productivity web‑app with Pomodoro timer and smart task manager.',
    longDescription:  `Achievo helps users stay focused and motivated by combining the Pomodoro technique with a dynamic to‑do list. Sessions, breaks, and tasks are tracked in localStorage, and desktop notifications remind you to start the next sprint.`,
    technologies: ['HTML', 'CSS', 'JavaScript'],
    category: 'web',
    date: '2025-03-01',
    githubUrl: 'https://github.com/rida2911/Achievo.git',
    liveUrl: '',
    imageUrl: 'Achievohome.png',
    featured: false
  },

   
  {
    id: 2,
    title: 'QuickCrave – Online Food Ordering System',
    description: 'An online food ordering system using MERN stack.',
    longDescription: 'A web app to place food orders online, built with React, Node.js, MongoDB, and various modern React features .',
    technologies: ['MongoDB', 'Express.js', 'React', 'Node.js', 'Multer','Axios'],
    category: 'web',
    date: '2025-05-07',
    githubUrl: 'https://github.com/rida2911/Quick-Crave.git',
    liveUrl: '',
    imageUrl: 'quickCrave.png',
    featured: false
  },
   {
    id: 3,
    title: 'Autonomous Self-Driving Cars',
    description: 'Computer vision project inspired by Nvidia’s 2016 paper on end-to-end learning.',
    longDescription: 'Developed a self-driving car system using computer vision and deep learning, trained using data from the Udacity simulator. Includes preprocessing and bias removal techniques.',
    technologies: ['Python', 'TensorFlow', 'OpenCV'],
    category: 'ml',
    date: '2025-05-06',
    githubUrl: 'https://github.com/rida2911/Self-Driving-Car',
    liveUrl: '',
    imageUrl: 'self_driving_car.png',
    featured: false
  },
  {
    id: 4,
    title: 'Smart Phone Book',
    description: 'Terminal-based contact manager using Linked Lists in C++.',
    longDescription: 'Built a terminal-based phone book using Linked Lists with add, display, update, search, delete features. Handles duplicate entries efficiently.',
    technologies: ['C++'],
    category: 'miscellaneous',
    date: '2024-11-01',
    githubUrl: 'https://github.com/rida2911/Smart_PhoneBook',
    liveUrl: '',
    imageUrl: 'smartphonebookoutput.png',
    featured: false
  },
  {
    id: 5,
    title: 'CityPulse – Smart City AI Solution',
    description: 'Real-time dashboard for civic trends using AI, ML, and external APIs.',
    longDescription: 'CityPulse is a smart city project powered by AI and Machine Learning that predicts traffic congestion and air pollution.',
    technologies: ['React', 'Flask', 'Python', 'Jupyter Notebook', 'LSTM','TomTom API', 'Google Maps API'],
    category: 'ml',
    date: '2025-05-15',
    githubUrl: 'https://github.com/rida2911/CityPulse.git',
    liveUrl: '',
    imageUrl: 'architecture.png',
    featured: false
  },
  {
  id: 6,
  title: 'Ecommerce Sales Dashboard',
  description: 'Interactive dashboard for visualizing ecommerce performance using advanced BI tools.',
  longDescription: `A powerful data visualization dashboard that displays ecommerce metrics such as profit trends, state-wise sales, payment mode usage, and customer segmentation. Designed with a modern, responsive layout to assist strategic business decisions. Features dynamic filters by quarter and state.`,
  technologies: ['Power BI', 'DAX', 'Data Modeling', 'Data Cleaning', 'CSV', 'Dashboard Filters', 'Bar & Donut Charts'],
  category: 'data',
  date: '2024-11-02',
  githubUrl: 'https://github.com/rida2911/Ecommerce-Sale-Dashboard',
  liveUrl: '',
  imageUrl: 'Ecommerce dashboard.png',
  featured: false
 },
  {
    id: 7,
    title: 'Handwritten Digit Recognition',
    description: 'Web app that identifies handwritten digits (0‑9) with a >99 % accurate CNN trained on MNIST.',
    longDescription: 'CNN‑based OCR built with TensorFlow/Keras and Streamlit; handles basic preprocessing and predicts MNIST digits in real time with 99 %+ accuracy.',
    technologies: ['Python', 'TensorFlow', 'Keras', 'OpenCV', 'Streamlit', 'NumPy', 'Pillow'],
    category: 'Ml',
    date: '2025-03-30',
    githubUrl: 'https://github.com/rida2911/handwritten-digit-recognition.git',
    liveUrl: '',
    imageUrl: 'Digit.png',
    featured: false
  },
  {
    id: 8,
    title: '3D Solar System ',
    description: 'Interactive 3‑D web app that lets users explore realistic planetary orbits and view each planet from any angle.',
    longDescription: 'A responsive 3‑D model of the solar system built with vanilla HTML, CSS, and JavaScript. It features smooth orbital motion, zoom and rotate controls, and informative tool‑tips for every planet to help users learn key facts while exploring..',
    technologies: ['Html', 'Css', 'JavaScript'],
    category: 'web',
    date: '2025-03-30',
    githubUrl: 'https://github.com/rida2911/3D-Solar-System-Project',
    liveUrl: '',
    imageUrl: 'Solar System.png',
    featured: false
  },
  {
    id: 8,
    title: 'Vehicle Number‑Plate Detection ',
    description: 'Detects and reads car licence plates with OpenCV and EasyOCR.',
    longDescription: 'Python notebook that locates number plates in vehicle images, crops the region, and extracts the text using EasyOCR. Built entirely in Jupyter, making it beginner‑friendly and fully reproducible.',
    technologies: ['Python', 'OpenCV', 'EasyOCR', 'Imutils', 'Matplotlib', 'Jupyter Notebook'],
    category: 'ml',
    date: '2025-04-30',
    githubUrl: 'https://github.com/rida2911/Vehicle-Number-Plate-Detection',
    liveUrl: '',
    imageUrl: 'Number-Plate-Detection.png',
    featured: false
  },

  ];

  private skillCategories = [
    {
      title: 'Languages',
      skills: ['Java', 'JavaScript', 'Python', 'C++', 'SQL']
    },
    {
      title: 'Web Development',
      skills: ['React.js', 'Node.js', 'Express.js', 'TailwindCSS', 'Django']
    },
    {
      title: 'Databases',
      skills: ['MongoDB', 'MySQL', 'Firebase']
    },
    {
      title: 'Machine Learning',
      skills: ['TensorFlow', 'Pandas', 'NumPy', 'Keras', 'Scikit-Learn', 'OpenCV']
    },
    {
      title: 'Tools & Technologies',
      skills: ['Git', 'VS Code', 'Firebase','Vercel', 'Jupyter']
    },
    {
      title: 'Soft Skills',
      skills: ['Problem Solving', 'Self Learning', 'Project Management', 'Leadership']
    }
  ];

  private socialLinks = {
    github: 'https://github.com/rida2911',
    linkedin: 'https://www.linkedin.com/in/rida-jahan',
    email: 'ridajahan750@gmail.com',
    leetcode: 'https://leetcode.com/u/Rida_Jahan/',
  };

  ngAfterViewInit() {
    this.focusInput();
    this.addLine('output', 'Welcome to Rida\'s Portfolio Terminal! 🚀');
    this.addLine('output', 'Type "help" to see available commands.');
    this.updateCursorPosition();
  }
  updateCursorPosition() {
    setTimeout(() => {
      // Get the bounding rectangles
      const promptRect = this.promptRef.nativeElement.getBoundingClientRect();
      const containerRect = this.inputTextRef.nativeElement.parentElement!.getBoundingClientRect();
      const inputTextRect = this.inputTextRef.nativeElement.getBoundingClientRect();

      // Calculate position relative to the container
      const promptWidth = promptRect.width;
      const inputTextWidth = inputTextRect.width;

      // Position cursor exactly at the end of the text
      this.cursorRef.nativeElement.style.left = `${promptWidth + inputTextWidth - 210}px`;
    }, 0);
  }

  @HostListener('document:click')
  onDocumentClick() {
    this.focusInput();
  }

  @HostListener('document:keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    if (event.key === 'ArrowUp') {
      event.preventDefault();
      this.navigateHistory('up');
    } else if (event.key === 'ArrowDown') {
      event.preventDefault();
      this.navigateHistory('down');
    }
  }

  focusInput() {
    setTimeout(() => {
      this.terminalInput?.nativeElement?.focus();
    }, 0);
  }

  onInputKeyDown(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.executeCommand();
    } else if (event.key === 'Tab') {
      event.preventDefault();
      this.autoComplete();
    }
    setTimeout(() => this.updateCursorPosition(), 0);
  }

  executeCommand() {
    const command = this.currentInput.trim().toLowerCase();
    
    if (command) {
      this.addLine('input', `${this.userName}@portfolio:${this.currentPath}$ ${this.currentInput}`);
      this.commandHistory.unshift(this.currentInput);
      this.historyIndex = -1;
      
      this.processCommand(command);
    }
    
    this.currentInput = '';
    this.scrollToBottom();
  }

  processCommand(command: string) {
    const [cmd, ...args] = command.split(' ');
    
    switch (cmd) {
      case 'help':
        this.showHelp();
        break;
      case 'about-me':
      case 'about':
        this.showAbout();
        break;
      case 'experiences':
      case 'exp':
      case 'work':
        this.showExperiences();
        break;
      case 'projects':
        this.showProjects();
        break;
      case 'get-projects':
        this.showProjectsByCategory(args[0]);
        break;
      case 'skills':
        this.showSkills();
        break;
      case 'education':
      case 'edu':
        this.showEducation();
        break;
      case 'achievements':
        this.showAchievements();
        break;
      case 'extracurriculars':
      case 'extra':
        this.showExtracurriculars();
        break;
      case 'get-github':
      case 'github':
        this.openLink(this.socialLinks.github, 'GitHub');
        break;
      case 'get-linkedin':
      case 'linkedin':
        this.openLink(this.socialLinks.linkedin, 'LinkedIn');
        break;
      case 'get-leetcode':
      case 'leetcode':
        this.openLink(this.socialLinks.leetcode, 'LeeTCode');
        break;
      case 'get-email':
      case 'email':
        this.addLine('output', `📧 Email: ${this.socialLinks.email}`);
        break;
      case 'get-resume':
      case 'resume':
        this.downloadResume();
        break;
      case 'clear':
        this.clearTerminal();
        break;
      case 'whoami':
        this.addLine('output', this.userName);
        break;
      case 'pwd':
        this.addLine('output', this.currentPath);
        break;
      case 'date':
        this.addLine('output', new Date().toString());
        break;
      case 'echo':
        this.addLine('output', args.join(' '));
        break;
      default:
        this.addLine('error', `Command not found: ${cmd}. Type 'help' for available commands.`);
    }
  }

  showHelp() {
    this.addLine('output', '📋 Available Commands:');
    this.addLine('output', '');
    this.commands.forEach(cmd => {
      const aliases = cmd.aliases ? ` (${cmd.aliases.join(', ')})` : '';
      this.addLine('output', `  ${cmd.name}${aliases} - ${cmd.description}`);
    });
  }

  showAbout() {
    this.addLine('output', `👋 Hi! I'm ${this.personalInfo.name}`);
    this.addLine('output', '');
    this.addLine('output', '🚀 Roles:');
    this.personalInfo.roles.forEach(role => {
      this.addLine('output', `  • ${role}`);
    });
    this.addLine('output', '');
    this.addLine('output', '📝 About:');
    this.addLine('output', `  ${this.personalInfo.description}`);
  }

  showExperiences() {
    this.addLine('output', '💼 Work Experiences:');
    this.addLine('output', '');
    this.experiences.forEach(exp => {
      this.addLine('output', `🏢 ${exp.position} at ${exp.company}`);
      this.addLine('output', `   📅 ${exp.period} | ${exp.type}`);
      this.addLine('output', `   📝 ${exp.description}`);
      this.addLine('output', `   🛠️  Skills: ${exp.skills.join(', ')}`);
      this.addLine('output', '');
    });
  }

  showProjects() {
    this.addLine('output', '🚀 All Projects:');
    this.addLine('output', '');
    this.projects.forEach(project => {
      this.addLine('output', `${project.featured ? '⭐' : '📁'} ${project.title}`);
      this.addLine('output', `   📝 ${project.description}`);
      this.addLine('output', `   🏷️  Category: ${project.category}`);
      this.addLine('output', `   🛠️  Tech: ${project.technologies.join(', ')}`);
      if (project.githubUrl) {
        this.addLine('output', `   🔗 ${project.githubUrl}`);
      }
      this.addLine('output', '');
    });
    this.addLine('output', '💡 Use "get-projects <category>" to filter by category');
    this.addLine('output', '   Categories: web, ml, mobile, miscellaneous');
  }

  showProjectsByCategory(category?: string) {
    if (!category) {
      this.addLine('output', '📂 Project Categories:');
      this.addLine('output', '   • web - Web Development Projects');
      this.addLine('output', '   • ml - Machine Learning Projects');
      this.addLine('output', '   • mobile - Mobile App Projects');
      this.addLine('output', '   • miscellaneous - Other Projects');
      this.addLine('output', '');
      this.addLine('output', 'Usage: get-projects <category>');
      return;
    }

    const filteredProjects = this.projects.filter(p => p.category === category);
    
    if (filteredProjects.length === 0) {
      this.addLine('error', `No projects found in category: ${category}`);
      return;
    }

    this.addLine('output', `🗂️  ${category.toUpperCase()} Projects:`);
    this.addLine('output', '');
    filteredProjects.forEach(project => {
      this.addLine('output', `${project.featured ? '⭐' : '📁'} ${project.title}`);
      this.addLine('output', `   📝 ${project.longDescription}`);
      this.addLine('output', `   🛠️  Tech: ${project.technologies.join(', ')}`);
      if (project.githubUrl) {
        this.addLine('output', `   🔗 ${project.githubUrl}`);
      }
      this.addLine('output', '');
    });
  }

  showSkills() {
    this.addLine('output', '🛠️  Technical Skills:');
    this.addLine('output', '');
    this.skillCategories.forEach(category => {
      this.addLine('output', `📂 ${category.title}:`);
      this.addLine('output', `   ${category.skills.join(' • ')}`);
      this.addLine('output', '');
    });
  }

  showEducation() {
    this.addLine('output', '🎓 Education:');
    this.addLine('output', '');
    this.addLine('output', '📚 2022 - Present');
    this.addLine('output', '   B.Tech in Computer Science and Engineering');
    this.addLine('output', '  Shri Ram Group, Jabalpur, Madhya Pradesh');
    this.addLine('output', '   CGPA: 8.50/10.0');
    this.addLine('output', '');
    this.addLine('output', '📚 2020 - 2022');
    this.addLine('output', '   High School');
    this.addLine('output', '   Husainia Girls School, Jabalpur, Madhya Pradesh');
    this.addLine('output', '   12th: 77%');
    this.addLine('output', '   10th: 75.6%');
    this.addLine('output', '   Specialized in Physics, Chemistry, Maths and Biology');
  }

  showAchievements() {
    this.addLine('output', '🏆 Achievements:');
    this.addLine('output', '');
    this.addLine('output', 'Cisco Virtual Internship Program 2025 - July 2025');
    this.addLine('output', '   Cico | Progarm');
    this.addLine('output', '   Hands‑on NetAcad labs • Networking pathway • Mentor‑guided coursework');
    this.addLine('output', '');
    this.addLine('output', '👩‍💻 Google Girl Hackathon - February 2025');
    this.addLine('output', '   Powered by Google');
    this.addLine('output', '   Selected Participan • Google Event • Women in Tech');
    this.addLine('output', '');
    this.addLine('output', '🤖 Infosys Springboard Pragati Cohort 3 - October 2024 - March 2025');
    this.addLine('output', '   infosys');
    this.addLine('output', '   Tech Skill Developmen • Industry Exposur • Elite Selection ');
    this.addLine('output', '');
    this.addLine('output', '🌟 HackSRIT Top 10 Team- 2025');
    this.addLine('output', '   Shri Ram Group');
    this.addLine('output', '   Top 10 out of 220+ • AI-based Civic Tech Solution ');
    this.addLine('output', '🎓 Academic Excellence Recognition - 2022-2025');
    this.addLine('output', '   academic');
    this.addLine('output', '   CGPA 8.05 • Top Performer • Focused & Disciplined');
    this.addLine('output', '');
  }

  showExtracurriculars() {
    this.addLine('output', '🌟 Extracurricular Activities:');
    this.addLine('output', '');
    this.addLine('output', '👩‍💻 WWT ALWOH 2025 - July 2025');
    this.addLine('output', '   Women Who Tech');
    this.addLine('output', '   • Built a solution using machine learning to tackle social good challenges');
    this.addLine('output', '   • Collaborated in a team of 4');
    this.addLine('output', '   • Strengthened skills in problem-solving');
    this.addLine('output', '');
    this.addLine('output', '🚀 AWS Cloud Practitioner Essentials - January 2025');
    this.addLine('output', '   AWS Skill Builder');
    this.addLine('output', '   • Earned official AWS Cloud Practitioner Essentials Certification');
    this.addLine('output', '   • Learning EC2, S3, IAM, and Lambda through hands-on labs');
    this.addLine('output', '   • Understanding AWS cloud security, billing, and pricing models');
    this.addLine('output', '');
    this.addLine('output', '🤖 Meesho ScriptedByHer 2025 - July 2025');
    this.addLine('output', '   Meesho');
    this.addLine('output', '   • Qualified for the national-level coding challenge');
    this.addLine('output', '   • Focused on promoting diversity and innovation in tech');
    this.addLine('output', '   • Supporting women in tech career development');
  }

  openLink(url: string, platform: string) {
    this.addLine('output', `🔗 Opening ${platform}: ${url}`);
    window.open(url, '_blank');
  }

downloadResume() {
  this.addLine('output', '📄 Downloading resume...');
  
    try {
      // Create a link element
      const link = document.createElement('a');

      link.href = 'Rida_Jahan_Resume.pdf';
      link.download = 'Rida_Jahan_Resume.pdf';

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      this.addLine('output', '✅ Resume download initiated!');
    } catch (error) {
      this.addLine('error', '❌ Failed to download resume. Please try again.');
      console.error('Download error:', error);
    }
    }

  clearTerminal() {
    this.terminalLines = [];
  }

  navigateHistory(direction: 'up' | 'down') {
    if (direction === 'up' && this.historyIndex < this.commandHistory.length - 1) {
      this.historyIndex++;
      this.currentInput = this.commandHistory[this.historyIndex];
    } else if (direction === 'down' && this.historyIndex > -1) {
      this.historyIndex--;
      this.currentInput = this.historyIndex === -1 ? '' : this.commandHistory[this.historyIndex];
    }
  }

  autoComplete() {
    const input = this.currentInput.toLowerCase();
    const matches = this.commands.filter(cmd => 
      cmd.name.startsWith(input) || 
      (cmd.aliases && cmd.aliases.some(alias => alias.startsWith(input)))
    );
    
    if (matches.length === 1) {
      this.currentInput = matches[0].name;
    }
  }

  addLine(type: 'input' | 'output' | 'error', content: string) {
    this.terminalLines.push({
      type,
      content,
      timestamp: new Date()
    });
  }

  scrollToBottom() {
    setTimeout(() => {
      if (this.terminalContent) {
        this.terminalContent.nativeElement.scrollTop = this.terminalContent.nativeElement.scrollHeight;
      }
    }, 0);
  }

  getAsciiArt(): string {
    return `



 ██████╗ ██╗██████╗  █████╗ 
██╔══██╗██║██╔══██╗██╔══██╗
██████╔╝██║██║  ██║███████║
██╔══██╗██║██║  ██║██╔══██║
██║  ██║██║██████╔╝██║  ██║
╚═╝  ╚═╝╚═╝╚═════╝ ╚═╝  ╚═╝
  Welcome to Rida's Portfolio Terminal! 🚀
  Type "help" to see available commands.`;
  }
}




