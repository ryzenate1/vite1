// Define the structure for a single testimonial
export interface TestimonialData {
  id: string;
  name: string;
  title: string;
  content: string;
  avatar: string;
}

// Sample Testimonial Data (Updated Image URLs)
// Using https://avatar.iran.liara.run/public/boy?username=[...] or /girl?username=[...] for more variety
export const testimonials: TestimonialData[] = [
  {
    id: '1',
    name: 'John Doe',
    title: 'CEO, TechCorp',
    content: 'Amazing experience working with this team. They delivered beyond our expectations!',
    avatar: '/avatars/john-doe.jpg'
  },
  {
    id: '2',
    name: 'Jane Smith',
    title: 'CTO, InnovateTech',
    content: 'The attention to detail and technical expertise is outstanding.',
    avatar: '/avatars/jane-smith.jpg'
  },
  {
    id: '3',
    name: 'Arjun Kumar',
    title: 'Product Lead, TechStart',
    content: 'Ryzen consistently delivered high-quality results ahead of schedule.',
    avatar: '/avatars/arjun-kumar.jpg'
  },
  {
    id: '4',
    name: 'Emily White',
    title: 'UX Designer, DesignCo',
    content: 'Understood the design vision perfectly and executed flawlessly.',
    avatar: '/avatars/emily-white.jpg'
  },
  {
    id: '5',
    name: 'Suresh Ramalingam',
    title: 'Business Owner, Digital Solutions',
    content: 'Transformed our operations. Highly recommend for digitalization.',
    avatar: '/avatars/suresh-r.jpg'
  },
  {
    id: '6',
    name: 'Michael B.',
    title: 'Tech Consultant, NYC',
    content: 'A reliable, skilled, and proactive developer.',
    avatar: '/avatars/michael-b.jpg'
  },
  {
    id: '7',
    name: 'Lakshmi Menon',
    title: 'Project Manager, TechFirm',
    content: 'Clear communication and proactive problem-solving made the project smooth.',
    avatar: '/avatars/lakshmi-m.jpg'
  },
  {
    id: '8',
    name: 'Robert Jones',
    title: 'Lead Engineer, InnoSoft',
    content: 'High-quality code and always willing to find the best solution.',
    avatar: '/avatars/robert-j.jpg'
  },
  {
    id: '9',
    name: 'Ananya Gupta',
    title: 'Marketing Director, WebTech',
    content: 'The new platform is performing brilliantly.',
    avatar: '/avatars/ananya-g.jpg'
  }
];