const { app, BrowserWindow, screen, globalShortcut, session } = require('electron');
const path = require('path');

function createOverlay() {
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

  // Maus-/Touch-Events durchreichen (du klickst deine Apps „darunter“)
  win.setIgnoreMouseEvents(true, { forward: true });

  // Overlay selbst nicht mitcapturen (verhindert Spiegel-Effekt)
  win.setContentProtection(true);

  win.loadFile('index.html');

  // Optional zum Debuggen:
  win.webContents.openDevTools({ mode: 'detach' });

  // ESC = beenden
  globalShortcut.register('Esc', () => app.quit());
}

app.whenReady().then(() => {
  // Nur Screen-/Media-Capture erlauben, alles andere ablehnen
  session.defaultSession.setPermissionRequestHandler((webContents, permission, callback) => {
    const allow = permission === 'media' || permission === 'display-capture';
    callback(allow);
  });

  createOverlay();
});

app.on('will-quit', () => {
  globalShortcut.unregisterAll();
});

app.on('window-all-closed', () => app.quit());