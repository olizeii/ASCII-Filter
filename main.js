const { app, BrowserWindow, screen, globalShortcut, session } = require('electron');
const path = require('path');
const { pathToFileURL } = require('url');

function parseCLI() {
  let size;
  const argv = process.argv.slice(2);
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === '--size') {
      size = argv[i + 1] ?? 'auto';
      i++;
    } else if (a.startsWith('--size=')) {
      size = a.split('=')[1];
    }
  }
  return { size };
}

function createOverlay(opts = {}) {
  const primary = screen.getPrimaryDisplay();
  const { x, y, width, height } = primary.bounds;

  const win = new BrowserWindow({
    x, y, width, height,
    frame: false,
    resizable: false,
    movable: false,
    fullscreen: false,
    alwaysOnTop: true,
    skipTaskbar: true,
    focusable: false,
    backgroundColor: '#000000',
    transparent: false,
    hasShadow: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  });

  win.setIgnoreMouseEvents(true, { forward: true });
  win.setContentProtection(true);

  // Load index.html with ?size=... in the URL
  const fileUrl = pathToFileURL(path.join(__dirname, 'index.html'));
  if (opts.size) fileUrl.searchParams.set('size', String(opts.size));
  win.loadURL(fileUrl.href);

  // Optional for debugging
  //win.webContents.openDevTools({ mode: 'detach' });

  // ESC = beenden
  globalShortcut.register('Esc', () => app.quit());
}

app.whenReady().then(() => {
  session.defaultSession.setPermissionRequestHandler((webContents, permission, callback) => {
    const allow = permission === 'media' || permission === 'display-capture';
    callback(allow);
  });

  const opts = parseCLI();
  createOverlay(opts);
});

app.on('will-quit', () => {
  globalShortcut.unregisterAll();
});

app.on('window-all-closed', () => app.quit());
