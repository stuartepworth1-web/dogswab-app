#!/usr/bin/env node

// Generate DOGSWAB splash screen images
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create SVG splash screen with DOGSWAB branding
function createSplashSVG(width, height) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
  <!-- Background -->
  <rect width="${width}" height="${height}" fill="#77e1c0"/>
  
  <!-- DOGSWAB Logo Container -->
  <g transform="translate(${width/2}, ${height/2})">
    <!-- Logo Background Circle -->
    <circle cx="0" cy="0" r="${Math.min(width, height) * 0.15}" fill="white" opacity="0.95"/>
    
    <!-- DOGSWAB Text -->
    <text x="0" y="-20" text-anchor="middle" fill="#2d2f63" font-family="Arial, sans-serif" font-size="${Math.min(width, height) * 0.08}" font-weight="bold">DOGSWAB</text>
    
    <!-- Paw Print Icon -->
    <g transform="translate(0, 30)">
      <!-- Main pad -->
      <ellipse cx="0" cy="0" rx="15" ry="12" fill="#2d2f63"/>
      <!-- Toe pads -->
      <ellipse cx="-12" cy="-15" rx="6" ry="8" fill="#2d2f63"/>
      <ellipse cx="-4" cy="-18" rx="6" ry="8" fill="#2d2f63"/>
      <ellipse cx="4" cy="-18" rx="6" ry="8" fill="#2d2f63"/>
      <ellipse cx="12" cy="-15" rx="6" ry="8" fill="#2d2f63"/>
    </g>
    
    <!-- Tagline -->
    <text x="0" y="80" text-anchor="middle" fill="#2d2f63" font-family="Arial, sans-serif" font-size="${Math.min(width, height) * 0.03}" opacity="0.8">Pet Health Assistant</text>
  </g>
</svg>`;
}

// Create the splash screen images
const splashDir = path.join(__dirname, '../ios/App/App/Assets.xcassets/Splash.imageset');

// Ensure directory exists
if (!fs.existsSync(splashDir)) {
  fs.mkdirSync(splashDir, { recursive: true });
}

// Generate SVG files (we'll convert these to PNG manually or use online converters)
const sizes = [
  { name: 'splash-2732x2732.png', width: 2732, height: 2732 },
  { name: 'splash-2732x2732-1.png', width: 2732, height: 2732 },
  { name: 'splash-2732x2732-2.png', width: 2732, height: 2732 }
];

sizes.forEach(size => {
  const svgContent = createSplashSVG(size.width, size.height);
  const svgPath = path.join(splashDir, size.name.replace('.png', '.svg'));
  fs.writeFileSync(svgPath, svgContent);
  console.log(`✅ Created ${size.name.replace('.png', '.svg')}`);
});

console.log('\n🎨 SVG splash screens created!');
console.log('\n📋 NEXT STEPS:');
console.log('1. Go to https://convertio.co/svg-png/');
console.log('2. Upload each .svg file from ios/App/App/Assets.xcassets/Splash.imageset/');
console.log('3. Convert to PNG');
console.log('4. Download and replace the .png files');
console.log('5. Commit to GitHub and build!');