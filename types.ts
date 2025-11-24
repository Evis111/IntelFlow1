export interface Testimonial {
  id: number;
  name: string;
  role: string;
  image: string;
  content: string;
}

export interface Benefit {
  id: number;
  title: string;
  description: string;
  icon: string;
}

export interface AppConcept {
  features: string[];
  tagline: string;
  estimatedImpact: string;
}