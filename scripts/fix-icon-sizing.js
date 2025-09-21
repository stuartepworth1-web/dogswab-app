#!/usr/bin/env node

// Fix icon sizing issue - create properly sized icons that fill the entire canvas
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🎨 FIXING ICON SIZING - CREATING FULL-SIZE ICONS...');

// Create SVG template that FILLS the entire canvas
function createFullSizeIconSVG(size) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
  <!-- FULL SIZE mint green background - NO PADDING -->
  <rect width="${size}" height="${size}" fill="#77e1c0" rx="${size * 0.22}"/>
  
  <!-- DOGSWAB logo scaled to fill most of the icon -->
  <g transform="translate(${size/2}, ${size/2}) scale(${size * 0.0012})">
    <!-- Large white circle background for logo -->
    <circle cx="0" cy="0" r="300" fill="white" opacity="0.95"/>
    
    <!-- DOGSWAB text - larger -->
    <text x="0" y="-50" text-anchor="middle" fill="#2d2f63" 
          font-family="Arial, sans-serif" font-size="80" font-weight="bold">DOGSWAB</text>
    
    <!-- Large paw print -->
    <g transform="translate(0, 100)">
      <!-- Main pad -->
      <ellipse cx="0" cy="0" rx="40" ry="32" fill="#2d2f63"/>
      <!-- Toe pads -->
      <ellipse cx="-32" cy="-40" rx="16" ry="20" fill="#2d2f63"/>
      <ellipse cx="-11" cy="-48" rx="16" ry="20" fill="#2d2f63"/>
      <ellipse cx="11" cy="-48" rx="16" ry="20" fill="#2d2f63"/>
      <ellipse cx="32" cy="-40" rx="16" ry="20" fill="#2d2f63"/>
    </g>
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

// Create full-size SVG files
iconSizes.forEach(icon => {
  const svgContent = createFullSizeIconSVG(icon.size);
  const svgPath = path.join(outputDir, icon.name.replace('.png', '-fullsize.svg'));
  fs.writeFileSync(svgPath, svgContent);
  console.log(`✅ Created ${icon.name.replace('.png', '-fullsize.svg')} (FULL SIZE ${icon.size}×${icon.size}px)`);
});

console.log('\n🎨 FULL-SIZE SVG icons created!');
console.log('\n📋 CRITICAL NEXT STEPS:');
console.log('1. Go to https://convertio.co/svg-png/');
console.log('2. Upload each *-fullsize.svg file');
console.log('3. Convert to PNG');
console.log('4. Download and rename (remove "-fullsize" from names)');
console.log('5. Upload to GitHub AppIcon.appiconset folder');
console.log('\n💡 ALTERNATIVE - Use AppIcon.co:');
console.log('1. Go to https://appicon.co');
console.log('2. Upload your DOGSWAB logo');
console.log('3. IMPORTANT: Set "Padding" to 0% (no padding!)');
console.log('4. Set background color to #77e1c0');
console.log('5. Download iOS pack');
console.log('\n🚨 THE KEY: NO PADDING! Your logo should fill the entire icon space!');