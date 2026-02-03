import { ipcMain, IpcMessageEvent } from 'electron'

import { createNewWindow } from './WindowManager'
import {IPC} from "../renderer/data/const";

// Define functions
function onRequestCreateNewWindow(ev: IpcMessageEvent) {
  // Validate sender URL
  const senderURL = ev.sender.getURL();
  if (senderURL.startsWith('file://')) {
    createNewWindow();
  } else {
    console.warn("Blocked unauthorized new window request from: " + senderURL);
  }
}


// Initialize and release listeners
let initialized = false;
export function initializeIpcEvents() {
  if (initialized) {
    return;
  }

  initialized = true;
  ipcMain.on(IPC.newWindow, onRequestCreateNewWindow);
}

export function releaseIpcEvents() {
  if (initialized) {
    ipcMain.removeAllListeners(IPC.newWindow);
  }

  initialized = false;
}