const path = require('path');
const { Sitemap } = require('react-router-sitemap');
const fs = require('fs');

// Import your AppRoutes component
const routes = require('./src/AppRoutes').default;

// Define the paths for dynamic routes
const paramsConfig = {
  '/portfolio-item/:itemId': [
    { itemId: '0' },
    { itemId: '1' },
    { itemId: '2' },
    { itemId: '3' },
    { itemId: '4' },
    { itemId: '5' },
    { itemId: '6' },
  ],
};

// Generate the sitemap
const generateSitemap = () =>
  new Sitemap(routes)
    .applyParams(paramsConfig)
    .build('https://www.example.com')
    .save(path.resolve(__dirname, 'public', 'sitemap.xml'));

generateSitemap();
