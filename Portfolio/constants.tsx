
import { Project, Hobby, Skill } from './types';

export const PROJECTS: Project[] = [
  {
    title: "AI for Manufacturing",
    issuedBy: "GTU & Intel India",
    date: "July 15, 2025",
    certificateId: "AI4MGTUS1507250181",
    summary: "Focused on AI-driven process optimization, predictive maintenance, and smart factory concepts. Collaborated on sensor data analysis and modular AI deployment strategies.",
    skills: ["Industrial Automation", "Predictive Analytics", "Modular AI", "Industry 4.0"],
    type: 'AI'
  },
  {
    title: "Microsoft Data & AI Internship",
    issuedBy: "Microsoft Philanthropies & CloudThat",
    date: "July 15, 2025",
    certificateId: "CT/25/945855",
    summary: "78 hours of hands-on training on cloud-based data pipelines, AI model deployment, and ethical AI practices using Azure tools.",
    skills: ["Data Engineering", "Azure", "Cloud-native Development", "Responsible AI"],
    type: 'Data'
  }
];

export const HOBBIES: Hobby[] = [
  {
    title: "Cricket",
    description: "Passionate about the strategy and precision of cricket. I enjoy analyzing match statistics and player performance metrics.",
    icon: "fa-solid fa-baseball-bat-ball",
    color: "from-emerald-500 to-teal-700",
    imageUrl: "https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&q=80&w=800"
  },
  {
    title: "Trekking",
    description: "An avid trekker seeking the serenity of mountains. The climb represents my approach to complex data challenges: step-by-step persistence.",
    icon: "fa-solid fa-mountain-sun",
    color: "from-amber-600 to-orange-800",
    imageUrl: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=800"
  },
  {
    title: "Car Exploration",
    description: "Fascinated by automotive engineering and the shift towards electric mobility. I love exploring the intersection of AI and autonomous driving.",
    icon: "fa-solid fa-car-side",
    color: "from-blue-600 to-indigo-800",
    imageUrl: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=800"
  },
  {
    title: "Emerging Tech",
    description: "Constantly hunting for the latest in DevOps, AI, and cloud infrastructure. If it's new and techy, I'm already tinkering with it.",
    icon: "fa-solid fa-microchip",
    color: "from-purple-600 to-pink-800",
    imageUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800"
  }
];

export const SKILLS: Skill[] = [
  { name: "Python", level: 90, icon: "fa-brands fa-python" },
  { name: "Power BI", level: 85, icon: "fa-solid fa-chart-column" },
  { name: "Tableau", level: 80, icon: "fa-solid fa-chart-pie" },
  { name: "Azure", level: 75, icon: "fa-solid fa-cloud" },
  { name: "DevOps", level: 70, icon: "fa-solid fa-infinity" },
  { name: "Excel (VBA)", level: 95, icon: "fa-solid fa-table" }
];
