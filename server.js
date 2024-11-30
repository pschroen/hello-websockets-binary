/**
 * @author pschroen / https://ufo.ai/
 *
 * Remix of https://glitch.com/edit/#!/hello-express
 */

import express from 'express';
const app = express();

import enableWs from 'express-ws';
const expressWs = enableWs(app);
const aWss = expressWs.getWss('/');

app.use(express.static('public'));

//

app.ws('/', (ws, request) => {
});

setInterval(() => {
	const color = Math.floor(Math.random() * 0xffffff);

	const data = Buffer.allocUnsafe(1 + 4);
	data.writeUInt8(0, 0);
	data.writeUInt32BE(color, 1);

	aWss.clients.forEach(client => {
		client.send(data);
	});
}, 1000);

//

const listener = app.listen(process.env.PORT, () => {
	console.log(`Your app is listening on port ${listener.address().port}`);
});
