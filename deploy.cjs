const fs = require('fs');
const path = require('path');
const https = require('https');

const APP_DIR = path.join(__dirname, 'src');
const API_KEY = 'ak_53815fda18385dc495e54e611d665bb7572cd738870908ec9e897c4396dad0e7';
const ENDPOINT = 'https://api-v2.appdeploy.ai/mcp';

// Walk directory
function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
  });
}

const files = [];

// Add index.html, vite.config.ts, package.json, tsconfig.app.json, tsconfig.node.json, tsconfig.json
const rootFiles = ['index.html', 'package.json', 'vite.config.ts', 'tsconfig.app.json', 'tsconfig.node.json', 'tsconfig.json', 'eslint.config.js'];
for (const rf of rootFiles) {
  if (fs.existsSync(rf)) {
    files.push({
      path: rf,
      content: fs.readFileSync(rf, 'utf8')
    });
  }
}

// Add all src files
walkDir(APP_DIR, (filePath) => {
  if (!filePath.includes('.test.') && !filePath.includes('.stories.')) {
    files.push({
      path: filePath.replace(__dirname + path.sep, '').replace(/\\/g, '/'),
      content: fs.readFileSync(filePath, 'utf8')
    });
  }
});

const payload = {
  jsonrpc: "2.0",
  id: 1,
  method: "tools/call",
  params: {
    name: "deploy_app",
    arguments: {
      app_id: null,
      app_type: "frontend-only",
      app_name: "find-people",
      description: "Frontend challenge with React, Vite, Framer Motion",
      frontend_template: "react-vite",
      model: "gemini-2.5-pro",
      intent: "initial app deploy",
      files: files
    }
  }
};

const req = https.request(ENDPOINT, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json, text/event-stream',
    'Authorization': 'Bearer ' + API_KEY
  }
}, (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => console.log(data));
});

req.on('error', (e) => console.error(e));
req.write(JSON.stringify(payload));
req.end();
