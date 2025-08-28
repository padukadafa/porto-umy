import { Project } from "@/types/project";
import { Code, Palette, Star, Zap } from "lucide-react";

export const projects: Project[] = [
  {
    id: "ecommerce-platform",
    title: "E-Commerce Platform",
    category: "Full Stack Web Application",
    description: "A comprehensive e-commerce platform with modern UI, secure payment integration, admin dashboard, and real-time inventory management.",
    fullDescription: "This project represents a complete end-to-end e-commerce solution built with modern web technologies. The platform features a responsive design, secure payment processing through Stripe, real-time inventory management, and a comprehensive admin dashboard. The application emphasizes performance, security, and user experience, incorporating advanced features like AI-powered product recommendations, multi-language support, and progressive web app capabilities.",
    technologies: ["Next.js", "TypeScript", "Prisma", "PostgreSQL", "Stripe", "Tailwind CSS", "Redis", "Docker"],
    images: [
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop"
    ],
    github: "https://github.com/username/ecommerce-platform",
    demo: "https://ecommerce-demo.vercel.app",
    rating: 5,
    icon: <Zap className="w-5 h-5 text-white" />,
    duration: "4 months",
    team: "Solo Developer",
    status: "Completed",
    challenges: [
      "Implementing real-time inventory synchronization across multiple channels",
      "Ensuring PCI DSS compliance for payment processing",
      "Optimizing performance for large product catalogs",
      "Creating a scalable architecture for future growth"
    ],
    solutions: [
      "Built event-driven architecture using Redis for real-time updates",
      "Integrated Stripe for secure, compliant payment processing",
      "Implemented advanced caching strategies and database optimization",
      "Designed microservices architecture with Docker containerization"
    ],
    features: [
      "Responsive design optimized for all devices",
      "Advanced product search with filters and sorting",
      "Secure payment processing with Stripe integration",
      "Real-time inventory management",
      "Admin dashboard with analytics and reporting",
      "Multi-language support (i18n)",
      "Progressive Web App capabilities",
      "AI-powered product recommendations"
    ],
    objectives: [
      "Create a modern, user-friendly e-commerce experience",
      "Ensure secure and reliable payment processing",
      "Build a scalable platform for future growth",
      "Implement best practices for SEO and performance"
    ],
    results: [
      "98% lighthouse performance score achieved",
      "Zero security vulnerabilities in production",
      "50% faster page load times compared to legacy systems",
      "Increased user engagement by 40%"
    ],
    testimonial: {
      text: "The e-commerce platform exceeded our expectations. The clean design, fast performance, and robust features have significantly improved our online sales.",
      author: "Sarah Johnson",
      role: "Business Owner"
    }
  },
  {
    id: "task-management-app",
    title: "Task Management App",
    category: "Productivity Application",
    description: "A collaborative task management application with real-time updates, team collaboration features, and advanced project tracking capabilities.",
    fullDescription: "A comprehensive task management solution designed for modern teams. The application features real-time collaboration, advanced project tracking, time management tools, and intuitive user interfaces. Built with scalability in mind, it supports multiple teams, custom workflows, and integrates with popular productivity tools. The platform emphasizes user experience and productivity enhancement through smart automation and data-driven insights.",
    technologies: ["React", "TypeScript", "Firebase", "Material-UI", "Socket.io", "Node.js"],
    images: [
      "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800&h=600&fit=crop"
    ],
    github: "https://github.com/username/task-manager",
    demo: "https://task-manager-demo.vercel.app",
    rating: 4,
    icon: <Code className="w-5 h-5 text-white" />,
    duration: "3 months",
    team: "2 Developers",
    status: "Completed",
    challenges: [
      "Implementing real-time collaboration without conflicts",
      "Creating intuitive drag-and-drop interfaces",
      "Managing complex state across multiple components",
      "Ensuring offline functionality and data synchronization"
    ],
    solutions: [
      "Used operational transformation for conflict-free collaboration",
      "Implemented custom drag-and-drop system with React DnD",
      "Applied Redux pattern for predictable state management",
      "Built offline-first architecture with service workers"
    ],
    features: [
      "Real-time collaborative task management",
      "Drag-and-drop kanban boards",
      "Time tracking and reporting",
      "Team member assignment and notifications",
      "Custom project templates",
      "Advanced filtering and search",
      "Mobile-responsive design",
      "Offline mode with sync capabilities"
    ],
    objectives: [
      "Improve team productivity and collaboration",
      "Create an intuitive task management experience",
      "Enable seamless real-time collaboration",
      "Provide comprehensive project insights"
    ],
    results: [
      "35% improvement in team task completion rates",
      "90% user satisfaction score",
      "Real-time collaboration with sub-second latency",
      "Successfully deployed to 50+ teams"
    ],
    testimonial: {
      text: "This task management app has transformed how our team collaborates. The real-time features and intuitive design make project management effortless.",
      author: "Mike Chen",
      role: "Project Manager"
    }
  },
  {
    id: "portfolio-website",
    title: "Portfolio Website",
    category: "Personal Branding",
    description: "A modern, responsive portfolio website featuring interactive 3D elements, smooth animations, and an intuitive user experience.",
    fullDescription: "A cutting-edge portfolio website that showcases creative work through interactive 3D experiences and modern web technologies. The site features immersive Spline 3D scenes, smooth animations, and a carefully crafted user journey. Built with performance and accessibility in mind, it demonstrates advanced front-end development skills while maintaining clean, professional aesthetics. The website serves as both a portfolio showcase and a testament to modern web development capabilities.",
    technologies: ["Next.js", "TypeScript", "Spline", "Framer Motion", "Tailwind CSS", "Three.js"],
    images: [
      "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1559028006-448665bd7c7f?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop"
    ],
    github: "https://github.com/username/portfolio",
    demo: "https://portfolio-demo.vercel.app",
    rating: 5,
    icon: <Palette className="w-5 h-5 text-white" />,
    duration: "2 months",
    team: "Solo Developer",
    status: "Completed",
    challenges: [
      "Integrating 3D elements without compromising performance",
      "Creating smooth animations across different devices",
      "Balancing visual appeal with loading speed",
      "Ensuring accessibility with complex interactions"
    ],
    solutions: [
      "Optimized 3D models and implemented lazy loading",
      "Used CSS-in-JS with hardware acceleration",
      "Implemented progressive loading and image optimization",
      "Added proper ARIA labels and keyboard navigation"
    ],
    features: [
      "Interactive 3D scenes with Spline integration",
      "Smooth scroll-triggered animations",
      "Responsive design across all devices",
      "Dark/light theme toggle",
      "Project showcase with filtering",
      "Contact form with validation",
      "SEO optimized with meta tags",
      "Progressive Web App capabilities"
    ],
    objectives: [
      "Create a memorable first impression",
      "Showcase technical and design skills",
      "Provide easy access to project information",
      "Demonstrate modern web development practices"
    ],
    results: [
      "95% lighthouse performance score",
      "60% increase in project inquiries",
      "Featured in web design showcases",
      "100% accessibility compliance achieved"
    ],
    testimonial: {
      text: "The portfolio website perfectly captures creativity and technical expertise. The 3D elements and smooth animations create an unforgettable experience.",
      author: "Lisa Wang",
      role: "Creative Director"
    }
  },
  {
    id: "analytics-dashboard",
    title: "Analytics Dashboard",
    category: "Data Visualization",
    description: "Interactive analytics dashboard with real-time data visualization, customizable charts, and comprehensive reporting features.",
    fullDescription: "A comprehensive analytics dashboard that transforms complex data into actionable insights through interactive visualizations. The platform features real-time data processing, customizable chart types, and advanced filtering capabilities. Built for scalability and performance, it handles large datasets while maintaining responsive user interactions. The dashboard serves various industries with flexible configuration options and white-label capabilities.",
    technologies: ["Next.js", "TypeScript", "Chart.js", "D3.js", "PostgreSQL", "Recharts"],
    images: [
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=600&fit=crop"
    ],
    github: "https://github.com/username/analytics-dashboard",
    demo: "https://analytics-demo.vercel.app",
    rating: 4,
    icon: <Star className="w-5 h-5 text-white" />,
    duration: "5 months",
    team: "3 Developers",
    status: "Completed",
    challenges: [
      "Processing and visualizing large datasets efficiently",
      "Creating responsive charts for different screen sizes",
      "Implementing real-time data updates",
      "Ensuring data accuracy and consistency"
    ],
    solutions: [
      "Implemented data virtualization and pagination",
      "Used responsive chart libraries with breakpoint adaptations",
      "Built WebSocket connections for real-time updates",
      "Created comprehensive data validation and error handling"
    ],
    features: [
      "Real-time data visualization with multiple chart types",
      "Customizable dashboard layouts",
      "Advanced filtering and date range selection",
      "Export functionality for reports and charts",
      "Multi-tenant architecture support",
      "Role-based access control",
      "Mobile-responsive design",
      "API integration capabilities"
    ],
    objectives: [
      "Transform complex data into actionable insights",
      "Provide intuitive data exploration tools",
      "Enable real-time decision making",
      "Support multiple data sources and formats"
    ],
    results: [
      "Processed 10M+ data points with sub-second response times",
      "85% reduction in report generation time",
      "Deployed across 25+ client organizations",
      "99.9% uptime reliability achieved"
    ],
    testimonial: {
      text: "The analytics dashboard has revolutionized how we understand our data. The real-time insights and intuitive interface have improved our decision-making process significantly.",
      author: "David Rodriguez",
      role: "Data Analyst"
    }
  }
];  