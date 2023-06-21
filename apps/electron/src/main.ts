import { app, BrowserWindow } from "electron";
import { start } from "@illusion/server";

const createWindow = () => {
	const win = new BrowserWindow({
		width: 800,
		height: 600,
	});

	win.loadFile("index.html");
};

app.whenReady().then(() => {
	createWindow();
	start();
});
