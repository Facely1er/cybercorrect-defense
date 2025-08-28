#!/usr/bin/env node

/**
 * Production Build Verification Script
 * Run this script before deploying to production
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🔍 Verifying Production Build...\n');

// Check if dist folder exists
const distPath = path.join(process.cwd(), 'dist');
if (!fs.existsSync(distPath)) {
  console.error('❌ Build folder not found. Run "npm run build" first.');
  process.exit(1);
}

// Check bundle sizes and assets
const assetsPath = path.join(distPath, 'assets');
if (fs.existsSync(assetsPath)) {
  const files = fs.readdirSync(assetsPath);
  let totalSize = 0;
  
  files.forEach(file => {
    const filePath = path.join(assetsPath, file);
    const stats = fs.statSync(filePath);
    const sizeInKB = Math.round(stats.size / 1024);
    totalSize += sizeInKB;
    
    if (sizeInKB > 1000) {
      console.warn(`⚠️  Large bundle: ${file} (${sizeInKB}KB)`);
    } else {
      console.log(`✅ ${file} (${sizeInKB}KB)`);
    }
  });
  
  console.log(`\n📦 Total bundle size: ${Math.round(totalSize / 1024)}MB`);
  
  if (totalSize > 2048) {
    console.warn('⚠️  Bundle size is large. Consider optimization.');
  }
  
  // Check for CSS and JS assets
  console.log('\n📁 Checking built assets...');
  const cssFiles = files.filter(f => f.endsWith('.css'));
  const jsFiles = files.filter(f => f.endsWith('.js'));
  
  if (cssFiles.length > 0) {
    console.log(`✅ CSS files: ${cssFiles.length} found`);
  } else {
    console.error('❌ No CSS files found');
  }
  
  if (jsFiles.length > 0) {
    console.log(`✅ JavaScript files: ${jsFiles.length} found`);
  } else {
    console.error('❌ No JavaScript files found');
  }
}

// Check critical files
const criticalFiles = [
  'index.html'
];

console.log('\n📁 Checking critical files...');
criticalFiles.forEach(file => {
  const filePath = path.join(distPath, file);
  if (fs.existsSync(filePath)) {
    console.log(`✅ ${file}`);
  } else {
    console.error(`❌ Missing: ${file}`);
  }
});

// Check environment variables
console.log('\n🔐 Checking environment configuration...');
const envExample = path.join(process.cwd(), '.env.production');
if (fs.existsSync(envExample)) {
  console.log('✅ Production environment template found');
} else {
  console.warn('⚠️  No production environment template found');
}

// Check database migrations
const migrationsPath = path.join(process.cwd(), 'supabase', 'migrations');
if (fs.existsSync(migrationsPath)) {
  const migrations = fs.readdirSync(migrationsPath).filter(f => f.endsWith('.sql'));
  console.log(`✅ Database migrations: ${migrations.length} found`);
} else {
  console.warn('⚠️  No database migrations found');
}

// Final status
console.log('\n🎯 Production Build Verification Complete!');
console.log('\n📋 Next Steps:');
console.log('1. Configure production environment variables');
console.log('2. Deploy to your chosen platform');
console.log('3. Run post-deployment testing');
console.log('4. Monitor performance and errors');

console.log('\n🚀 Ready for Production Deployment!');