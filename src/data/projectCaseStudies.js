export const projectCaseStudies = [
  {
    slug: 'osatofogcs',
    title: "Osatofo God's Children School",
    client: "Osatofo God's Children School",
    website: 'https://osatofogcs.com.ng',
    heroBadge: 'Primary School Website',
    stack: ['Html5', 'TailwindCSS', 'Javascript'],
    shortDescription:
      'A welcoming landing page website for a primary school in Nigeria with clear admissions content and program information.',
    summary:
      'I created a polished digital presence for the school that makes the institution feel approachable, credible, and easy to trust for parents exploring enrollment.',
    challenge:
      'The school needed a modern online presence that could communicate its value quickly and encourage parents to take action without feeling overwhelmed.',
    approach:
      'I focused on a warm visual identity, clear sections for key information, and a conversion-friendly admissions experience supported by thoughtful content structure.',
    overview:
      'The website combines a strong first impression with practical information architecture. Parents can quickly find details about the school, its programs, and how to begin the admissions process.',
    features: [
      'Dedicated Home, About, Contact, Admission, and Programs sections',
      'Admissions-focused calls to action for parents and guardians',
      'Dedicated Pages for each class: Nursery, KG, Lower Primary, and Upper Primary',
      'Clean, responsive layout that feels trustworthy on mobile and desktop',
    ],
    results: [
      'Created a better first impression for prospective parents and guardians',
      'Made admissions and school information easier to access online',
      'Delivered a site that reflects the school’s values and identity in a modern way',
    ],
    coverImage: '/osatofo.png',
    galleryImages: [
      {
        src: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80',
        alt: 'Students working together in a bright classroom',
      },
      {
        src: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1200&q=80',
        alt: 'A colorful school learning environment',
      },
      {
        src: 'https://images.unsplash.com/photo-1513258496099-48168024aec0?auto=format&fit=crop&w=1200&q=80',
        alt: 'A welcoming school foyer and activity space',
      },
      {
        src: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1200&q=80',
        alt: 'Modern classroom setup with learning materials',
      },
    ],
    videoTitle: 'Video walkthrough',
    videoDescription:
      'A short walkthrough would be added here when the project has a brand video or animated demo.',
    videoUrl: '',
  },
];

export function getProjectCaseStudy(slug) {
  return projectCaseStudies.find((project) => project.slug === slug) ?? null;
}
