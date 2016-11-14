import express from 'express';
import fetch from 'isomorphic-fetch';
import cors from 'cors';

const app = express();

app.use(cors());

const pcUrl = 'https://gist.githubusercontent.com/isuvorov/ce6b8d87983611482aac89f6d7bc0037/raw/pc.json';

let pc = {};

fetch(pcUrl)
  .then(async (res) => {
    pc = await res.json();
  })
  .catch(err => {
    console.log('Что-то пошло не так:', err);
  });

app.get('/task3A', (req, res) => {
	res.json(pc);  
});

app.get('/task3A/volumes', (req, res) => {
	let dataFound = {};
	let hdd = pc['hdd'] || [];

	for (let i = 0; i < hdd.length; i++) {
		if (!dataFound[hdd[i]['volume']]) {
			dataFound[hdd[i]['volume']] = hdd[i]['size'];
		} else {
			dataFound[hdd[i]['volume']] += hdd[i]['size'];
		}
	}

	for (let p in dataFound) {
		dataFound[p] = dataFound[p] + 'B';
	}

	hdd.length > 0 ? res.json(dataFound) : res.sendStatus(404);
});

app.get('/task3A/:key', (req, res) => {
	let dataFound;

	try {
		if (req.params.value != 'length') {
			dataFound = pc[req.params.key];
		}		
	} finally {
		dataFound !== undefined ? res.json(dataFound) : res.sendStatus(404);
	}
});

app.get('/task3A/:key/:value', (req, res) => {
	let dataFound;

	try {
		if (req.params.value != 'length') {
			dataFound = pc[req.params.key][req.params.value];
		}		
	} finally {
		dataFound !== undefined ? res.json(dataFound) : res.sendStatus(404);
	}
});

app.get('/task3A/:key/:value/:value2', (req, res) => {
	let dataFound;

	try {
		if (req.params.value2 != 'length') {
			dataFound = pc[req.params.key][req.params.value][req.params.value2];
		}				
	} finally {
		dataFound !== undefined ? res.json(dataFound) : res.sendStatus(404);
	}	
});

app.listen(3000, () => {
	console.log('Your app listening on port 3000!');
});
