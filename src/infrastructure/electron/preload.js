const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  loadActivities: () => ipcRenderer.invoke('load-activities'),
  saveActivities: (data) => ipcRenderer.invoke('save-activities', data)
});
