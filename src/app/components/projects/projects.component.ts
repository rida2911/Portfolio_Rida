// projects.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Project {
  id: number;
  title: string;
  description: string;
  longDescription: string;
  technologies: string[];
  category: string;
  date: string;
  githubUrl?: string;
  liveUrl?: string;
  imageUrl: string;
  featured: boolean;
}

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {
  filterCategories = [
    { key: 'all', label: 'All Projects', icon: '🚀' },
    { key: 'web', label: 'Web Dev', icon: '🌐' },
    { key: 'mobile', label: 'Mobile', icon: '📱' },
    { key: 'ml', label: 'AI/ML', icon: '🤖' },
    { key: 'miscellaneous', label: 'Miscellaneous', icon: '⚙️' }
  ];

  allProjects: Project[] = [
    
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


  filteredProjects: Project[] = [];
  activeFilter: string = 'all';
  isLoading: boolean = true;

  ngOnInit() {
    setTimeout(() => {
      this.filteredProjects = this.allProjects;
      this.isLoading = false;
    }, 500);
  }

  filterProjects(category: string) {
    this.activeFilter = category;
    this.filteredProjects = category === 'all'
      ? this.allProjects
      : this.allProjects.filter(project => project.category === category);
  }

  getCategoryCount(category: string): number {
    return category === 'all'
      ? this.allProjects.length
      : this.allProjects.filter(project => project.category === category).length;
  }
}

