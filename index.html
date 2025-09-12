const { app, BrowserWindow, screen, globalShortcut, session } = require('electron');

function parseCLI() {
  const args = process.argv.slice(2);
  let size = 'auto';
  for (let i = 0; i < args.length; i++) {
    const a = args[i];
    if (a === '--size') { size = args[i + 1] ?? 'auto'; i++; continue; }
    if (a.startsWith('--size=')) { size = a.split('=')[1]; }
  }
  return { size };
}

function createOverlay(opts = {}) {
  const primary = screen.getPrimaryDisplay();
  const bounds = primary.bounds;             // full monitor (DIP)
  const work = primary.workArea || bounds;   // minus taskbar/dock (DIP)

  const win = new BrowserWindow({
    x: work.x, y: work.y,
    width: work.width, height: work.height,
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

  // Pass rectangles + size to the renderer
  const params = new URLSearchParams({
    bx: String(bounds.x), by: String(bounds.y), bw: String(bounds.width), bh: String(bounds.height),
    wx: String(work.x),   wy: String(work.y),   ww: String(work.width),   wh: String(work.height),
    s: String(opts.size ?? 'auto')
  });

  win.loadFile('index.html', { search: `?${params.toString()}` });

  globalShortcut.register('Esc', () => app.quit()); // enable if you want ESC to quit
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
