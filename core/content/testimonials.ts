import { Testimonial } from '@/core/types';

/**
 * ILLUSTRATIVE CONTENT — not real farmer quotes.
 *
 * These are written to show how the section reads. Nothing here should be
 * presented as a documented CropX outcome. Replace with consented, attributable
 * quotes before launch, or remove the section.
 */
export const testimonials: Testimonial[] = [
  {
    id: 'illustrative-1',
    author: 'Illustrative example',
    role: 'Maize farmer',
    location: 'Kaduna State',
    quote:
      'The rains came three weeks late. Knowing which extra-early variety could still finish the season was the difference between a harvest and starting again.',
  },
  {
    id: 'illustrative-2',
    author: 'Illustrative example',
    role: 'Sorghum and millet farmer',
    location: 'Katsina State',
    quote:
      'I had been planting the same seed my father planted. Nobody had explained that varieties bred for shorter seasons existed, let alone which ones to ask for.',
  },
  {
    id: 'illustrative-3',
    author: 'Illustrative example',
    role: 'Extension officer',
    location: 'Benue State',
    quote:
      'What helps most is the reasoning attached to each suggestion. I can explain to a farmer why one variety suits their field and another does not.',
  },
];

/** Set false until the quotes above are replaced with real, consented ones. */
export const showTestimonials = false;
