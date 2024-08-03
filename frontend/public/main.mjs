import { app, BrowserWindow } from 'electron';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path'; // Add this line to import the path module

// Get the directory name of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'), // Use path.join here
      contextIsolation: true,
      enableRemoteModule: false,
      nodeIntegration: false,
    },
  });

  // Load the React app built files
  win.loadFile(path.join(__dirname, 'dist/index.html')); // Use path.join here
  console.log('Loading React app...');
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
