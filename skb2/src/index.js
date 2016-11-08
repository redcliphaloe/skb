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

function formatFullName(fullName) {
	let fullNameFormatted = '';	
	// если имя не пустое
	if (fullName) {
		let re = /^\s|\d|_|\//g;
		// если в имени нет начального пробела или цифр или подчеркивания
		if (!~fullName.search(re)) {
			const fullNameParts = fullName.split(' ');
			const fullNamePartsLength = fullNameParts.length;
			// если имя больше ноля и меньше четырех слов
			if (fullNamePartsLength > 0 && fullNamePartsLength < 4) {
				fullNameFormatted = fullNameParts[fullNamePartsLength - 1];
				for (let i = 0; i <= fullNamePartsLength - 2; i++) {
					fullNameFormatted += ' ' + fullNameParts[i][0] + '.';
				}
			}
		}
	}

	return fullNameFormatted || 'Invalid fullname';
}

app.get('/task2B', (req, res) => {
	/*let fullNameFormatted;
	const fullNameParts = req.query.fullname.split(' ');
	const fullNamePartsLength = fullNameParts.length;

	//if (fullNamePartsLength >= 1 && fullNamePartsLength <= 3) {
	if (fullNameIsVallid()) {
		fullNameFormatted = fullNameParts[fullNamePartsLength - 1];
		for (let i = 0; i <= fullNamePartsLength - 2; i++) {
			fullNameFormatted += ' ' + fullNameParts[i][0] + '.';
		}
	}*/

  res.send(formatFullName(req.query.fullname));
});

app.listen(3000, () => {
  console.log('Your app listening on port 3000!');
});
