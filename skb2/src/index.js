import express from 'express';
import cors from 'cors';

const app = express();

app.use(cors());

app.get('/', (req, res) => {
	res.json({
		hello: 'JS World',
  });
});

app.get('/task2A', (req, res) => {
	const sum = (+req.query.a || 0) + (+req.query.b || 0);

	res.send(sum + '');
});

function formatFullname(fullname) {
	let fullnameFormatted = '';	
	const fullnameParts = fullname.trim().split(/\s+/);

	if (fullname && (!~fullname.search(/\d|_|\//)) && (fullnameParts.length > 0) && (fullnameParts.length < 4)) {
		fullnameFormatted = fullnameParts[fullnameParts.length - 1].toLowerCase();
		fullnameFormatted = fullnameFormatted[0].toUpperCase() + fullnameFormatted.slice(1);

		for (let i = 0; i <= fullnameParts.length - 2; i++) {
			fullnameFormatted += ' ' + fullnameParts[i][0].toUpperCase() + '.';
		}
	}

	return fullnameFormatted || 'Invalid fullname';
}

app.get('/task2B', (req, res) => {
	res.send(formatFullname(req.query.fullname));
});

function usernameFromURL(url) {
	return url[0] === '@' ? url : '@' + url.slice(url.lastIndexOf('/') + 1);	
}

app.get('/task2C', (req, res) => {
	res.send(usernameFromURL(req.query.username));
  });

app.listen(3000, () => {
	console.log('Your app listening on port 3000!');
});
