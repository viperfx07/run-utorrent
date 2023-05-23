const express = require('express');
const path = require('path');
const { exec } = require('child_process');

const app = express();
const PORT = 5000; // Replace with your desired port number

app.use(express.json());

app.get('/webhook', (req, res) => {
	// Extract necessary information from the webhook payload
	const { url, target } = req.query;

	// Trigger the download in uTorrent
	const command = `uTorrent.exe /DIRECTORY "${target}" /ADD ${url}`;

	// Execute the uTorrent command
	exec(command, { cwd: path.resolve(process.env.APPDATA, 'uTorrent') }, (error, stdout, stderr) => {
		if (error) {
			console.error(`Error executing uTorrent command: ${error.message}`);
			return;
		}

		console.log('Download triggered successfully');
	});

	res.sendStatus(200);
});

app.listen(PORT, () => {
	console.log(`Webhook listener running on port ${PORT}`);
});
