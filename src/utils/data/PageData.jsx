import {
  CompanyName,
  CompanyPhoneNumber,
  FACEBOOK_BUSINESS_URL,
  FULL_BUSINESS_URL,
  INSTAGRAM_BUSINESS_URL,
  LINKEDIN_BUSINESS_URL,
  SHOWCASE_PAGE_URL,
} from '../Constants';
import { MainServicesArray } from './CompanyData';

// Home Page
export const homePageStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: CompanyName,
  url: FULL_BUSINESS_URL,
  description: `${CompanyName} offers expert web and circuit design services in the UK.`,
  potentialAction: {
    '@type': 'SearchAction',
    target: `${FULL_BUSINESS_URL}/?s={search_term_string}`,
    'query-input': 'required name=search_term_string',
  },
  sameAs: [
    `${FACEBOOK_BUSINESS_URL}`,
    `${INSTAGRAM_BUSINESS_URL}`,
    `${LINKEDIN_BUSINESS_URL}`,
  ],
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: `${CompanyPhoneNumber}`,
    contactType: 'Customer Service',
    areaServed: 'GB',
    availableLanguage: ['English'],
  },
};

export const homePageAdditionalMeta = [
  { property: 'og:title', content: `Welcome to ${CompanyName}` },
  {
    property: 'og:description',
    content:
      'Explore our simulations and tools for optimal gaming experiences.',
  },
  { property: 'og:image', content: `${FULL_BUSINESS_URL}/brand/logo.png` },
  { property: 'og:url', content: FULL_BUSINESS_URL },
  { name: 'twitter:card', content: 'summary_large_image' },
  { name: 'twitter:title', content: `Welcome to ${CompanyName}` },
  {
    name: 'twitter:description',
    content: 'Discover simulations and tools for optimal gaming experiences.',
  },
  { name: 'twitter:image', content: `${FULL_BUSINESS_URL}/brand/logo.png` },
];

// About us
export const aboutUsStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: CompanyName,
  url: FULL_BUSINESS_URL,
  logo: `${FULL_BUSINESS_URL}/brand/logo.png`,
  description: `${CompanyName} specializes in web and circuit design services, delivering innovative solutions for businesses.`,
  sameAs: [
    FACEBOOK_BUSINESS_URL,
    INSTAGRAM_BUSINESS_URL,
    LINKEDIN_BUSINESS_URL,
  ],
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: CompanyPhoneNumber,
    contactType: 'Customer Service',
    areaServed: 'GB',
    availableLanguage: ['English'],
  },
};

export const aboutUsAdditionalMeta = [
  { property: 'og:title', content: `About Us - ${CompanyName}` },
  {
    property: 'og:description',
    content: `Learn more about ${CompanyName}, a leading web and circuit design company in the UK.`,
  },
  {
    property: 'og:image',
    content: `${FULL_BUSINESS_URL}/brand/about-us-preview.jpg`,
  },
  { property: 'og:url', content: `${FULL_BUSINESS_URL}/about-us` },
  { name: 'twitter:card', content: 'summary_large_image' },
  { name: 'twitter:title', content: `About Us - ${CompanyName}` },
  {
    name: 'twitter:description',
    content: `Discover the mission, team, and services of ${CompanyName}, your trusted partner for web and circuit design.`,
  },
  {
    name: 'twitter:image',
    content: `${FULL_BUSINESS_URL}/brand/about-us-preview.jpg`,
  },
];

// Info Page
export const infoPageStructuredData = (pageType) => ({
  '@context': 'https://schema.org',
  '@type': pageType === 'offer' ? 'Offer' : 'ItemList', // Dynamically set based on query
  name: `${CompanyName} ${pageType === 'offer' ? 'Offers' : 'Available Items'}`,
  url: `${FULL_BUSINESS_URL}/info?type=${pageType}`,
  description: pageType === 'offer'
    ? `Explore the latest special offers from ${CompanyName}.`
    : `View available items and services offered by ${CompanyName}.`,
  provider: {
    '@type': 'Organization',
    name: CompanyName,
    url: FULL_BUSINESS_URL,
  },
  sameAs: [
    `${FACEBOOK_BUSINESS_URL}`,
    `${INSTAGRAM_BUSINESS_URL}`,
    `${LINKEDIN_BUSINESS_URL}`,
  ],
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: `${CompanyPhoneNumber}`,
    contactType: 'Customer Service',
    areaServed: 'GB',
    availableLanguage: ['English'],
  },
  ...(pageType === 'offer' && {
    priceCurrency: 'GBP',
    price: '0.00', // Replace with dynamic pricing if available
    availability: 'https://schema.org/InStock',
    validFrom: new Date().toISOString(), // Current date as start of offer
  }),
});

// Additional Meta
export const infoPageAdditionalMeta = (pageType) => [
  { property: 'og:title', content: `${CompanyName} - ${pageType === 'offer' ? 'Special Offers' : 'Available Items'}` },
  {
    property: 'og:description',
    content:
      pageType === 'offer'
        ? `Discover the latest offers and promotions from ${CompanyName}.`
        : `Browse the selection of items and services available at ${CompanyName}.`,
  },
  { property: 'og:image', content: `${FULL_BUSINESS_URL}/brand/${pageType}-banner.png` }, // Customize based on type
  { property: 'og:url', content: `${FULL_BUSINESS_URL}/info?type=${pageType}` },
  { name: 'twitter:card', content: 'summary_large_image' },
  { name: 'twitter:title', content: `${CompanyName} - ${pageType === 'offer' ? 'Special Offers' : 'Available Items'}` },
  {
    name: 'twitter:description',
    content:
      pageType === 'offer'
        ? 'Don’t miss out on our latest offers!'
        : 'Check out our available items and services.',
  },
  { name: 'twitter:image', content: `${FULL_BUSINESS_URL}/brand/${pageType}-banner.png` },
];


// Blog
export const blogPageStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'Blog',
  name: `${CompanyName} Blog`,
  description: `Stay updated with the latest insights, tutorials, and news from ${CompanyName}.`,
  url: `${FULL_BUSINESS_URL}/blog`,
  sameAs: [
    FACEBOOK_BUSINESS_URL,
    INSTAGRAM_BUSINESS_URL,
    LINKEDIN_BUSINESS_URL,
  ],
  publisher: {
    '@type': 'Organization',
    name: CompanyName,
    logo: {
      '@type': 'ImageObject',
      url: `${FULL_BUSINESS_URL}/brand/logo.png`,
    },
  },
};

export const blogPageAdditionalMeta = [
  { property: 'og:title', content: `Latest Insights from ${CompanyName}` },
  {
    property: 'og:description',
    content: `Explore tutorials, insights, and updates on web and circuit design from ${CompanyName}.`,
  },
  {
    property: 'og:image',
    content: `${FULL_BUSINESS_URL}/brand/blog-preview.jpg`,
  },
  { property: 'og:url', content: `${FULL_BUSINESS_URL}/blog` },
  { name: 'twitter:card', content: 'summary_large_image' },
  { name: 'twitter:title', content: `Latest Blog Posts - ${CompanyName}` },
  {
    name: 'twitter:description',
    content: `Stay informed with the latest trends and insights in web and circuit design from ${CompanyName}.`,
  },
  {
    name: 'twitter:image',
    content: `${FULL_BUSINESS_URL}/brand/blog-preview.jpg`,
  },
];

// Blog post
export const blogPostStructuredData = (post) => ({
  '@context': 'https://schema.org',
  '@type': 'BlogPosting',
  headline: post.title,
  author: {
    '@type': 'Person',
    name: post.author,
  },
  publisher: {
    '@type': 'Organization',
    name: CompanyName,
    logo: {
      '@type': 'ImageObject',
      url: `${FULL_BUSINESS_URL}/brand/logo.png`,
    },
  },
  datePublished: post.datePublished,
  dateModified: post.dateModified || post.datePublished,
  url: `${FULL_BUSINESS_URL}/blog/${post.slug}`,
  description: post.description,
  mainEntityOfPage: {
    '@type': 'WebPage',
    '@id': `${FULL_BUSINESS_URL}/blog/${post.slug}`,
  },
  image: {
    '@type': 'ImageObject',
    url: post.image,
    width: 1200,
    height: 628,
  },
});

export const blogPostAdditionalMeta = (post) => [
  { property: 'og:title', content: post.title },
  { property: 'og:description', content: post.excerpt || post.description },
  {
    property: 'og:image',
    content: post.image || `${FULL_BUSINESS_URL}/brand/blog-preview.jpg`,
  },
  { property: 'og:url', content: `${FULL_BUSINESS_URL}/blog/${post.slug}` },
  { name: 'twitter:card', content: 'summary_large_image' },
  { name: 'twitter:title', content: post.title },
  { name: 'twitter:description', content: post.excerpt || post.description },
  {
    name: 'twitter:image',
    content: post.image || `${FULL_BUSINESS_URL}/brand/blog-preview.jpg`,
  },
];

// Contact page
export const contactPageStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'ContactPage',
  mainEntity: {
    '@type': 'Organization',
    name: CompanyName,
    url: FULL_BUSINESS_URL,
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: CompanyPhoneNumber,
      contactType: 'Customer Service',
      areaServed: 'GB',
      availableLanguage: ['English'],
    },
    sameAs: [
      FACEBOOK_BUSINESS_URL,
      INSTAGRAM_BUSINESS_URL,
      LINKEDIN_BUSINESS_URL,
    ],
    logo: {
      '@type': 'ImageObject',
      url: `${FULL_BUSINESS_URL}/brand/logo.png`,
    },
  },
};

export const contactPageAdditionalMeta = [
  { property: 'og:title', content: `Contact ${CompanyName}` },
  {
    property: 'og:description',
    content: `Reach out to ${CompanyName} for professional web and circuit design solutions. We're ready to discuss your projects and answer any questions.`,
  },
  {
    property: 'og:image',
    content: `${FULL_BUSINESS_URL}/brand/contact-preview.jpg`,
  },
  { property: 'og:url', content: `${FULL_BUSINESS_URL}/contact` },
  { name: 'twitter:card', content: 'summary_large_image' },
  { name: 'twitter:title', content: `Contact ${CompanyName}` },
  {
    name: 'twitter:description',
    content: `Contact ${CompanyName} for expert web and circuit design services. Let's discuss your needs and find the best solution.`,
  },
  {
    name: 'twitter:image',
    content: `${FULL_BUSINESS_URL}/brand/contact-preview.jpg`,
  },
];

// Error page
export const errorPageStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: '404 Error Page',
  description: `The requested page could not be found on ${CompanyName}.`,
  url: `${FULL_BUSINESS_URL}/404`,
  potentialAction: {
    '@type': 'SearchAction',
    target: `${FULL_BUSINESS_URL}/?s={search_term_string}`,
    'query-input': 'required name=search_term_string',
  },
};

export const errorPageAdditionalMeta = [
  { property: 'og:title', content: 'Page Not Found - 404' },
  {
    property: 'og:description',
    content: `Oops! The page you’re looking for isn’t here. Visit ${CompanyName} to find what you need.`,
  },
  {
    property: 'og:image',
    content: `${FULL_BUSINESS_URL}/assets/images/pages/404-preview.jpg`,
  },
  { property: 'og:url', content: `${FULL_BUSINESS_URL}/404` },
  { name: 'twitter:card', content: 'summary_large_image' },
  { name: 'twitter:title', content: 'Page Not Found - 404' },
  {
    name: 'twitter:description',
    content: `Oops! The page you’re looking for isn’t here. Visit ${CompanyName} to find what you need.`,
  },
  {
    name: 'twitter:image',
    content: `${FULL_BUSINESS_URL}/assets/images/pages/404-preview.jpg`,
  },
];

// Maintenance
export const maintenancePageStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Maintenance Page',
  description: `The ${CompanyName} website is currently undergoing maintenance. We’ll be back soon!`,
  url: `${FULL_BUSINESS_URL}/maintenance`,
};

export const maintenancePageAdditionalMeta = [
  { property: 'og:title', content: `We'll Be Back Soon - ${CompanyName}` },
  {
    property: 'og:description',
    content: `The ${CompanyName} website is currently undergoing maintenance. We’ll be back shortly with exciting updates.`,
  },
  {
    property: 'og:image',
    content: `${FULL_BUSINESS_URL}/assets/images/pages/maintenance-preview.jpg`,
  },
  { property: 'og:url', content: `${FULL_BUSINESS_URL}/maintenance` },
  { name: 'twitter:card', content: 'summary_large_image' },
  { name: 'twitter:title', content: `We'll Be Back Soon - ${CompanyName}` },
  {
    name: 'twitter:description',
    content: `The ${CompanyName} website is currently undergoing maintenance. We’ll be back shortly with exciting updates.`,
  },
  {
    name: 'twitter:image',
    content: `${FULL_BUSINESS_URL}/assets/images/pages/maintenance-preview.jpg`,
  },
];
// portfolioPageStructuredData.js
export const portfolioPageStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Portfolio Page',
  description: `Explore the portfolio of ${CompanyName}, showcasing our amazing websites, apps, circuits, and robots.`,
  url: `${FULL_BUSINESS_URL}/portfolio`,
};

export const portfolioPageAdditionalMeta = [
  { property: 'og:title', content: `Portfolio - ${CompanyName}` },
  {
    property: 'og:description',
    content: `Discover the innovative websites, apps, circuits, and robots created by ${CompanyName}.`,
  },
  {
    property: 'og:image',
    content: `${FULL_BUSINESS_URL}/assets/images/pages/portfolio-preview.jpg`,
  },
  { property: 'og:url', content: `${FULL_BUSINESS_URL}/portfolio` },
  { name: 'twitter:card', content: 'summary_large_image' },
  { name: 'twitter:title', content: `Portfolio - ${CompanyName}` },
  {
    name: 'twitter:description',
    content: `Explore our projects showcasing websites, apps, circuits, and robots designed by ${CompanyName}.`,
  },
  {
    name: 'twitter:image',
    content: `${FULL_BUSINESS_URL}/assets/images/pages/portfolio-preview.jpg`,
  },
];

// Policies page
export const termsAndPoliciesStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Terms and Policies',
  description: `Explore the terms of service and privacy policies of ${CompanyName}.`,
  url: `${FULL_BUSINESS_URL}/terms-and-policies`,
  mainEntity: {
    '@type': 'FAQPage',
    name: 'Terms and Policies FAQ',
    description: `Frequently asked questions about terms of service, privacy policies, and compliance at ${CompanyName}.`,
  },
};


export const termsAndPoliciesAdditionalMeta = [
  { property: 'og:title', content: `Terms and Policies - ${CompanyName}` },
  {
    property: 'og:description',
    content: `Understand the terms of service, privacy policies, and compliance guidelines of ${CompanyName}.`,
  },
  {
    property: 'og:image',
    content: `${FULL_BUSINESS_URL}/assets/images/pages/terms-preview.jpg`,
  },
  { property: 'og:url', content: `${FULL_BUSINESS_URL}/terms-and-policies` },
  { name: 'twitter:card', content: 'summary_large_image' },
  { name: 'twitter:title', content: `Terms and Policies - ${CompanyName}` },
  {
    name: 'twitter:description',
    content: `Learn more about our terms of service, privacy policies, and compliance at ${CompanyName}.`,
  },
  {
    name: 'twitter:image',
    content: `${FULL_BUSINESS_URL}/assets/images/pages/terms-preview.jpg`,
  },
];

// Showcase
export const showcasePageStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Showcase',
  description: `Explore the diverse showcase of ${CompanyName}, featuring projects in web design, server/database management, circuit design, and robotics.`,
  url: `${FULL_BUSINESS_URL}/${SHOWCASE_PAGE_URL}`,
  mainEntity: {
    '@type': 'CollectionPage',
    name: `${CompanyName} Showcase`,
    description: `A collection of projects and case studies by ${CompanyName} across various domains, including frontend development, server management, circuit design, and robotics.`,
  },
};

export const showcasePageAdditionalMeta = [
  { property: 'og:title', content: `Showcase - ${CompanyName}` },
  {
    property: 'og:description',
    content: `Discover the showcase of ${CompanyName}, showcasing expertise in web design, server/database management, circuit design, and robotics.`,
  },
  {
    property: 'og:image',
    content: `${FULL_BUSINESS_URL}/assets/images/pages/showcase-preview.jpg`,
  },
  { property: 'og:url', content: `${FULL_BUSINESS_URL}/${SHOWCASE_PAGE_URL}` },
  { name: 'twitter:card', content: 'summary_large_image' },
  { name: 'twitter:title', content: `Showcase - ${CompanyName}` },
  {
    name: 'twitter:description',
    content: `Explore the diverse projects from ${CompanyName}, including web development, server management, circuit design, and robotics.`,
  },
  {
    name: 'twitter:image',
    content: `${FULL_BUSINESS_URL}/assets/images/pages/showcase-preview.jpg`,
  },
];

// Project
export const projectPageStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Project Page',
  description: `Explore detailed projects and solutions provided by ${CompanyName}, showcasing our expertise in web and circuit design.`,
  url: `${FULL_BUSINESS_URL}/projects`,
  mainEntity: {
    '@type': 'CreativeWork',
    name: 'Highlighted Project',
    description: `A featured project from ${CompanyName}, demonstrating innovative design and technical skills.`,
  },
};
export const projectPageAdditionalMeta = [
  { property: 'og:title', content: `Project Showcase - ${CompanyName}` },
  {
    property: 'og:description',
    content: `Discover the projects and innovative solutions developed by ${CompanyName}. Explore our latest work and case studies.`,
  },
  {
    property: 'og:image',
    content: `${FULL_BUSINESS_URL}/assets/images/pages/project-preview.jpg`,
  },
  { property: 'og:url', content: `${FULL_BUSINESS_URL}/projects` },
  { name: 'twitter:card', content: 'summary_large_image' },
  { name: 'twitter:title', content: `Project Showcase - ${CompanyName}` },
  {
    name: 'twitter:description',
    content: `Explore our latest projects and case studies, showcasing the technical expertise of ${CompanyName}.`,
  },
  {
    name: 'twitter:image',
    content: `${FULL_BUSINESS_URL}/assets/images/pages/project-preview.jpg`,
  },
];

// Services
export const servicesPageStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Services',
  description: `Discover the wide range of services offered by ${CompanyName}, including web design, circuit design, and more.`,
  url: `${FULL_BUSINESS_URL}/services`,
  mainEntity: MainServicesArray.map((service) => ({
    '@type': 'Service',
    name: service.label,
    description: service.content.props.children
      .map((child) =>
        typeof child === 'string' ? child : child.props.children || ''
      )
      .join(''),
    provider: {
      '@type': 'Organization',
      name: CompanyName,
    },
  })),
};

export const servicesPageAdditionalMeta = [
  { property: 'og:title', content: `Our Services - ${CompanyName}` },
  {
    property: 'og:description',
    content: `Explore the wide range of services provided by ${CompanyName}, including web design, circuit design, and robotics solutions.`,
  },
  {
    property: 'og:image',
    content: `${FULL_BUSINESS_URL}/assets/images/pages/services-preview.jpg`,
  },
  { property: 'og:url', content: `${FULL_BUSINESS_URL}/services` },
  { name: 'twitter:card', content: 'summary_large_image' },
  { name: 'twitter:title', content: `Our Services - ${CompanyName}` },
  {
    name: 'twitter:description',
    content: `Discover the professional services offered by ${CompanyName}, including web and circuit design, robotics, and more.`,
  },
  {
    name: 'twitter:image',
    content: `${FULL_BUSINESS_URL}/assets/images/pages/services-preview.jpg`,
  },
];

// Forgot password
export const forgottenPasswordPageStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Reset Password',
  description: `Reset your password for your ${CompanyName} account.`,
  url: `${FULL_BUSINESS_URL}/forgotten-password`,
};

export const forgottenPasswordPageAdditionalMeta = [
  { property: 'og:title', content: `Reset Your Password - ${CompanyName}` },
  {
    property: 'og:description',
    content: `Securely reset your ${CompanyName} account password.`,
  },
  {
    property: 'og:image',
    content: `${FULL_BUSINESS_URL}/assets/images/pages/reset-password-preview.jpg`,
  },
  { property: 'og:url', content: `${FULL_BUSINESS_URL}/forgotten-password` },
  { name: 'twitter:card', content: 'summary_large_image' },
  { name: 'twitter:title', content: `Reset Your Password - ${CompanyName}` },
  {
    name: 'twitter:description',
    content: `Follow the steps to securely reset your ${CompanyName} account password.`,
  },
  {
    name: 'twitter:image',
    content: `${FULL_BUSINESS_URL}/assets/images/pages/reset-password-preview.jpg`,
  },
];

// Login
export const loginPageStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Login',
  description: `Log in to your ${CompanyName} account to access exclusive features.`,
  url: `${FULL_BUSINESS_URL}/login`,
};

export const loginPageAdditionalMeta = [
  { property: 'og:title', content: `Login - ${CompanyName}` },
  {
    property: 'og:description',
    content: `Access your ${CompanyName} account to explore exclusive features and services.`,
  },
  {
    property: 'og:image',
    content: `${FULL_BUSINESS_URL}/assets/images/pages/login-preview.jpg`,
  },
  { property: 'og:url', content: `${FULL_BUSINESS_URL}/login` },
  { name: 'twitter:card', content: 'summary_large_image' },
  { name: 'twitter:title', content: `Login - ${CompanyName}` },
  {
    name: 'twitter:description',
    content: `Sign in to your ${CompanyName} account and unlock access to premium features.`,
  },
  {
    name: 'twitter:image',
    content: `${FULL_BUSINESS_URL}/assets/images/pages/login-preview.jpg`,
  },
];

// Register
export const registerPageStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Register',
  description: `Create an account with ${CompanyName} to access exclusive features and services.`,
  url: `${FULL_BUSINESS_URL}/register`,
};

export const registerPageAdditionalMeta = [
  { property: 'og:title', content: `Register - ${CompanyName}` },
  {
    property: 'og:description',
    content: `Sign up for a ${CompanyName} account to enjoy exclusive features and personalized services.`,
  },
  {
    property: 'og:image',
    content: `${FULL_BUSINESS_URL}/assets/images/pages/register-preview.jpg`,
  },
  { property: 'og:url', content: `${FULL_BUSINESS_URL}/register` },
  { name: 'twitter:card', content: 'summary_large_image' },
  { name: 'twitter:title', content: `Register - ${CompanyName}` },
  {
    name: 'twitter:description',
    content: `Join ${CompanyName} today and unlock access to premium features.`,
  },
  {
    name: 'twitter:image',
    content: `${FULL_BUSINESS_URL}/assets/images/pages/register-preview.jpg`,
  },
];
