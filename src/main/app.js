const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: true
      // или contextIsolation, preload-скрипты и т.д. — это потом
    }
  });

  // Загрузка index.html из папки renderer
  mainWindow.loadFile(path.join(__dirname, '../renderer/index.html'));

  // Можно открыть DevTools:
  // mainWindow.webContents.openDevTools();
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    // macOS: если все окна закрыты, то при клике на иконку открывается новое
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// Закрытие приложения, когда все окна закрыты (кроме macOS)
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
