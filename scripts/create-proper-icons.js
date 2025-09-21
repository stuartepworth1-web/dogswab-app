#!/usr/bin/env node

// Create proper DOGSWAB icons with mint green background
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🎨 CREATING PROPER DOGSWAB ICONS WITH MINT GREEN BACKGROUND...');

// Create SVG template with proper background
function createIconSVG(size) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
  <!-- Mint green background (no transparency) -->
  <rect width="${size}" height="${size}" fill="#77e1c0" rx="${size * 0.22}"/>
  
  <!-- White circle for logo -->
  <circle cx="${size/2}" cy="${size/2}" r="${size * 0.35}" fill="white" opacity="0.95"/>
  
  <!-- DOGSWAB text -->
  <text x="${size/2}" y="${size/2 - size * 0.05}" text-anchor="middle" fill="#2d2f63" 
        font-family="Arial, sans-serif" font-size="${size * 0.12}" font-weight="bold">DOGSWAB</text>
  
  <!-- Paw print -->
  <g transform="translate(${size/2}, ${size/2 + size * 0.15}) scale(${size * 0.0008})">
    <!-- Main pad -->
    <ellipse cx="0" cy="0" rx="25" ry="20" fill="#2d2f63"/>
    <!-- Toe pads -->
    <ellipse cx="-20" cy="-25" rx="10" ry="12" fill="#2d2f63"/>
    <ellipse cx="-7" cy="-30" rx="10" ry="12" fill="#2d2f63"/>
    <ellipse cx="7" cy="-30" rx="10" ry="12" fill="#2d2f63"/>
    <ellipse cx="20" cy="-25" rx="10" ry="12" fill="#2d2f63"/>
  </g>
</svg>`;
}

const iconSizes = [
  { name: 'icon-20.png', size: 20 },
  { name: 'icon-29.png', size: 29 },
  { name: 'icon-40.png', size: 40 },
  { name: 'icon-58.png', size: 58 },
  { name: 'icon-60.png', size: 60 },
  { name: 'icon-76.png', size: 76 },
  { name: 'icon-80.png', size: 80 },
  { name: 'icon-87.png', size: 87 },
  { name: 'icon-120.png', size: 120 },
  { name: 'icon-152.png', size: 152 },
  { name: 'icon-167.png', size: 167 },
  { name: 'icon-180.png', size: 180 },
  { name: 'icon-1024.png', size: 1024 }
];

const outputDir = path.join(__dirname, '../ios/App/App/Assets.xcassets/AppIcon.appiconset');

// Create SVG files for each size
iconSizes.forEach(icon => {
  const svgContent = createIconSVG(icon.size);
  const svgPath = path.join(outputDir, icon.name.replace('.png', '.svg'));
  fs.writeFileSync(svgPath, svgContent);
  console.log(`✅ Created ${icon.name.replace('.png', '.svg')} (${icon.size}×${icon.size}px)`);
});

console.log('\n🎨 SVG icons created with proper mint green background!');
console.log('\n📋 NEXT STEPS:');
console.log('1. Go to https://convertio.co/svg-png/');
console.log('2. Upload each .svg file');
console.log('3. Convert to PNG');
console.log('4. Download and replace in your AppIcon.appiconset folder');
console.log('5. Upload to GitHub');
console.log('\n💡 OR use an online app icon generator:');
console.log('1. Go to https://appicon.co');
console.log('2. Upload your DOGSWAB logo');
console.log('3. Choose "Add background color" → #77e1c0 (mint green)');
console.log('4. Download all iOS sizes');
console.log('5. Upload to GitHub');