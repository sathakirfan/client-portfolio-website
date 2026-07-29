export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  impact: string;
  image: string;
  kpis: string[];
  tags: string[];
  featured: boolean;
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  responsibilities: string[];
  metrics: string[];
  logoText: string;
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  location: string;
  year: string;
  details: string;
  gpaOrHonors?: string;
}

export interface Skill {
  id: string;
  category: 'Warehouse Ops' | 'WMS & ERP' | 'Analytics' | 'Leadership';
  name: string;
  level: number; // 0 - 100
  iconName: string;
  description: string;
}

export interface Achievement {
  id: string;
  title: string;
  metric: string;
  description: string;
  date: string;
  organization: string;
  badge: string;
}

export interface Certificate {
  id: string;
  title: string;
  issuer: string;
  issueDate: string;
  credentialId: string;
  verifyUrl?: string;
  badgeColor: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'Automation' | 'Storage' | 'Fleet' | 'Safety';
  imageUrl: string;
  description: string;
  location: string;
}

export interface Testimonial {
  id: string;
  name: string;
  position: string;
  company: string;
  avatar: string;
  quote: string;
  rating: number;
  verified: boolean;
}

export interface Message {
  id: string;
  name: string;
  email: string;
  company: string;
  phone: string;
  subject: string;
  message: string;
  date: string;
  read: boolean;
  status: 'new' | 'reviewed' | 'contacted';
}

export interface VisitorAnalytics {
  totalVisitors: number;
  resumeDownloads: number;
  contactRequests: number;
  conversionRate: number;
  recentViews: { date: string; count: number }[];
}

export interface SiteSettings {
  candidateName: string;
  roleTitle: string;
  location: string;
  availableForHire: boolean;
  targetRecruiters: string[];
  contactEmail: string;
  whatsappNumber: string;
  linkedInUrl: string;
  resumeUrl: string;
}
