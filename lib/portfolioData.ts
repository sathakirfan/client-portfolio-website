import { siteSettings as defaultSiteSettings, projects as defaultProjects, experiences as defaultExperiences, skills as defaultSkills, certificates as defaultCertificates, galleryItems as defaultGallery, testimonials as defaultTestimonials } from '@/lib/data';
import { SiteSettings, Project, Experience, Skill, Certificate, GalleryItem, Testimonial } from '@/types/portfolio';

// LocalStorage Keys
const KEYS = {
  SETTINGS: 'safthar_data_settings',
  PROJECTS: 'safthar_data_projects',
  EXPERIENCES: 'safthar_data_experiences',
  SKILLS: 'safthar_data_skills',
  CERTIFICATES: 'safthar_data_certificates',
  GALLERY: 'safthar_data_gallery',
  TESTIMONIALS: 'safthar_data_testimonials',
};

// Generic Getter
function getStored<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback;
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : fallback;
  } catch (e) {
    console.error(`Error loading ${key}:`, e);
    return fallback;
  }
}

// Generic Setter
function setStored<T>(key: string, value: T): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
    window.dispatchEvent(new Event('safthar_portfolio_data_changed'));
  } catch (e) {
    console.error(`Error saving ${key}:`, e);
  }
}

// --- Site Settings ---
export function getSiteSettings(): SiteSettings {
  return getStored<SiteSettings>(KEYS.SETTINGS, defaultSiteSettings);
}
export function saveSiteSettings(settings: SiteSettings): void {
  setStored(KEYS.SETTINGS, settings);
}

// --- Projects ---
export function getProjects(): Project[] {
  return getStored<Project[]>(KEYS.PROJECTS, defaultProjects);
}
export function saveProjects(projects: Project[]): void {
  setStored(KEYS.PROJECTS, projects);
}

// --- Experiences ---
export function getExperiences(): Experience[] {
  return getStored<Experience[]>(KEYS.EXPERIENCES, defaultExperiences);
}
export function saveExperiences(experiences: Experience[]): void {
  setStored(KEYS.EXPERIENCES, experiences);
}

// --- Skills ---
export function getSkills(): Skill[] {
  return getStored<Skill[]>(KEYS.SKILLS, defaultSkills);
}
export function saveSkills(skills: Skill[]): void {
  setStored(KEYS.SKILLS, skills);
}

// --- Certificates ---
export function getCertificates(): Certificate[] {
  return getStored<Certificate[]>(KEYS.CERTIFICATES, defaultCertificates);
}
export function saveCertificates(certificates: Certificate[]): void {
  setStored(KEYS.CERTIFICATES, certificates);
}

// --- Gallery ---
export function getGalleryItems(): GalleryItem[] {
  return getStored<GalleryItem[]>(KEYS.GALLERY, defaultGallery);
}
export function saveGalleryItems(items: GalleryItem[]): void {
  setStored(KEYS.GALLERY, items);
}

// --- Testimonials ---
export function getTestimonials(): Testimonial[] {
  return getStored<Testimonial[]>(KEYS.TESTIMONIALS, defaultTestimonials);
}
export function saveTestimonials(items: Testimonial[]): void {
  setStored(KEYS.TESTIMONIALS, items);
}

// Reset all portfolio data to initial defaults
export function resetPortfolioDataToDefault(): void {
  if (typeof window === 'undefined') return;
  Object.values(KEYS).forEach((key) => localStorage.removeItem(key));
  window.dispatchEvent(new Event('safthar_portfolio_data_changed'));
}
