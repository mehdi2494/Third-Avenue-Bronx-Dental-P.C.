export interface Service {
  id: string;
  title: string;
  description: string;
  fullDescription: string;
  category: 'preventative' | 'cosmetic' | 'surgical' | 'emergency';
  duration: string;
  priceEstimate: string;
  iconName: string;
}

export interface Testimonial {
  id: string;
  name: string;
  text: string;
  rating: number;
  role: string;
  date: string;
  verified: boolean;
}

export interface Booking {
  id: string;
  name: string;
  email: string;
  phone: string;
  service: string;
  date: string;
  time: string;
  notes?: string;
  createdAt: string;
  status: 'pending' | 'confirmed' | 'cancelled';
}

export interface GalleryItem {
  id: string;
  title: string;
  description: string;
  beforeLabel: string;
  afterLabel: string;
  beforeSrc: string;
  afterSrc: string;
}
