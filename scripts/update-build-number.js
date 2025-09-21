#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Use current timestamp to ensure uniqueness
const newBuildNumber = Math.floor(Date.now() / 1000).toString(); // Current Unix timestamp
console.log(`Setting build number to: ${newBuildNumber}`);

// Update Info.plist
const infoPlistPath = path.join(__dirname, '../ios/App/App/Info.plist');
if (fs.existsSync(infoPlistPath)) {
  let infoPlist = fs.readFileSync(infoPlistPath, 'utf8');
  infoPlist = infoPlist.replace(
    /<key>CFBundleVersion<\/key>\s*<string>.*?<\/string>/,
    `<key>CFBundleVersion</key>\n\t<string>${newBuildNumber}</string>`
  );
  fs.writeFileSync(infoPlistPath, infoPlist);
  console.log(`✅ Updated Info.plist with build number: ${newBuildNumber}`);
} else {
  console.log('❌ Info.plist not found');
}

// Update project.pbxproj
const projectPath = path.join(__dirname, '../ios/App/App.xcodeproj/project.pbxproj');
if (fs.existsSync(projectPath)) {
  let projectFile = fs.readFileSync(projectPath, 'utf8');
  projectFile = projectFile.replace(
    /CURRENT_PROJECT_VERSION = \d+;/g,
    `CURRENT_PROJECT_VERSION = ${newBuildNumber};`
  );
  fs.writeFileSync(projectPath, projectFile);
  console.log(`✅ Updated project.pbxproj with build number: ${newBuildNumber}`);
} else {
  console.log('❌ project.pbxproj not found');
}

// Update package.json
const packagePath = path.join(__dirname, '../package.json');
if (fs.existsSync(packagePath)) {
  let packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
  packageJson.version = `1.0.${newBuildNumber.slice(-3)}`; // Use last 3 digits for version
  fs.writeFileSync(packagePath, JSON.stringify(packageJson, null, 2));
  console.log(`✅ Updated package.json version`);
}

console.log('🚀 Build number update complete!');
console.log(`📱 New build number: ${newBuildNumber}`);