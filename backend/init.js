const { execSync } = require('child_process');
const fs = require('fs');

// Vérifier si le dossier node_modules existe
if (!fs.existsSync('node_modules')) {
  console.log('Installing dependencies...');
  execSync('npm install', { stdio: 'inherit' });
}

// Vérifier si le fichier .env existe
if (!fs.existsSync('.env')) {
  console.log('Creating .env file...');
  fs.copyFileSync('.env.example', '.env');
}

// Compiler le projet
console.log('Building project...');
execSync('npm run build', { stdio: 'inherit' });

// Démarrer le serveur
console.log('Starting server...');
execSync('npm run start:dev', { stdio: 'inherit' }); 