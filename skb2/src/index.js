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
		const re = /\d|_|\//g; 
		// если в имени нет цифр или подчеркивания или слеша
		if (!~fullName.search(re)) { 
			const fullNameParts = fullName.trim().split(/\s+/); // массив без пустых элементов 
			const fullNamePartsLength = fullNameParts.length;
			// если имя больше ноля и меньше четырех слов
			if (fullNamePartsLength > 0 && fullNamePartsLength < 4) {
				fullNameFormatted = fullNameParts[fullNamePartsLength - 1].toLowerCase(); // все буквы в нижнем регистре
				fullNameFormatted = fullNameFormatted[0].toUpperCase() + fullNameFormatted.slice(1); // а первая в верхнем
				for (let i = 0; i <= fullNamePartsLength - 2; i++) {
					fullNameFormatted += ' ' + fullNameParts[i][0].toUpperCase() + '.'; // буквы в верхнем регистре
				}
			}
		}
	}

	return fullNameFormatted || 'Invalid fullname';
}

app.get('/task2B', (req, res) => {
  res.send(formatFullName(req.query.fullname));
});

app.listen(3000, () => {
  console.log('Your app listening on port 3000!');
});
