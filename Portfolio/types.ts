
export interface Project {
  title: string;
  issuedBy: string;
  date: string;
  certificateId: string;
  summary: string;
  skills: string[];
  type: 'AI' | 'Data' | 'Other';
}

export interface Hobby {
  title: string;
  description: string;
  icon: string;
  color: string;
  imageUrl: string;
}

export interface Skill {
  name: string;
  level: number;
  icon: string;
}
