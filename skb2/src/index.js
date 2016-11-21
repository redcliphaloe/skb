import express from 'express';
import cors from 'cors';

const app = express();

app.use(cors());

app.get('/', (req, res) => {
	res.json({
		hello: 'JS World',
  });
});

/*
Задача 2A: A + B
Краткое описание задачи
Вычислить сумму чисел
Полное описание задачи
Клиент делает GET запрос с параметрами Query: ?a и ?b в которых записаны числа, необходимо вывести сумму этих чисел.
Результат нужно вывести в виде строки. Если какой-то параметр не передан или не конвертируется в число, он считается равных нулю (0).
*/

app.get('/task2A', (req, res) => {
	const sum = (+req.query.a || 0) + (+req.query.b || 0);

	res.send(sum + '');
});

/*
Задача 2B: Фамилия И. О.
Краткое описание задачи
Перевести полное `Имя Отчество Фамилия` в `Фамилия И. О.`
Полное описание задачи
Клиент делает GET запрос с параметром Query: ?fullname в виде Имя Отчество Фамилия (или Имя Фамилия или Фамилия), ваша задача сделать вывести инициалы в таком виде: Фамилия И. О. ( или Фамилия И.).
Результат нужно вывести в виде строки, при неверных входных данных нужно вывести слово Invalid fullname.
*/

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

/*
Задача 2C: @username
Краткое описание задачи
Верезать из строки вида `telegram.me/skillbranch` username `skillbranch`
Полное описание задачи
Многие сервисы, такие как ВК, Twitter, Telegram позволяют занимать унивальные имена пользователей. Очень часто пользователи заполняя формы на сайте, вставляют не стандартные ссылки на свои профили в соц.сетях.
Клиент выполняет GET запрос с параметром Query: ?username в разных форматах.
Задача: привести все ссылки к единому формату, а именно к виду @username.
В случае если в url находится некорретная строка, необходимо вывести Invalid username
*/

function usernameFromURL(url) {
	let username = '';
	const indexOfDot = url.indexOf('.');

	if (~indexOfDot) {
		const firstIndexOfDelimiter = url.indexOf('/', indexOfDot);
		let secondIndexOfDelimiter = url.indexOf('/', firstIndexOfDelimiter + 1);
		secondIndexOfDelimiter = ~secondIndexOfDelimiter ? secondIndexOfDelimiter : url.indexOf('?', firstIndexOfDelimiter + 1);
		secondIndexOfDelimiter = ~secondIndexOfDelimiter ? secondIndexOfDelimiter : url.length;
		username = url.slice(firstIndexOfDelimiter + 1, secondIndexOfDelimiter);
	} else {
		username = url;
	}		

	return username[0] === '@' ? username : '@' + username;
} 

app.get('/task2C', (req, res) => {
	res.send(usernameFromURL(req.query.username));
  });

/*
Задача 2D: #colors
Краткое описание задачи
Распознать цвет и привести его к #abcdef виду
Полное описание задачи
Довольно часто, разработчиком приходится работать с цветами. Существуем множество цветовых систем и форматов их записи.
Клиент выполняет GET запрос с параметром Query: ?color= и присылает цвета в разных форматах.
Задача: привести все цвета к виду HEX виду в нижнем регистре: #123abc.
В случае если в color находится некорректный цвет, Invalid color
*/

function hslToRgb(h, s, l) {
	let result = {};
	result.r = result.g = result.b = undefined;
	let r, g, b;	

	s = s.replace(/%/, '');
	l = l.replace(/%/, '');

	if (0 <= h && h <= 360 && 0 <= s && s <= 100 && 0 <= l && l <= 100) {
		h = h / 360;
		s = s / 100;
		l = l / 100;

		if (s == 0) {
			r = g = b = l;
		} else {
			const hue2rgb = function hue2rgb(p, q, t){
				if (t < 0) t += 1;
				if (t > 1) t -= 1;
				if (t < 1/6) return p + (q - p) * 6 * t;
				if (t < 1/2) return q;
				if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
			
				return p;
			}

			let q = l < 0.5 ? l * (1 + s) : l + s - l * s;
			let p = 2 * l - q;
		
			r = hue2rgb(p, q, h + 1/3);
			g = hue2rgb(p, q, h);
			b = hue2rgb(p, q, h - 1/3);
		}

		result.r = Math.round(r * 255);
		result.g = Math.round(g * 255);
		result.b = Math.round(b * 255);
	}

	return result;
}

function hslStringToHex(hslString) {
	let result = 'Invalid color';

	hslString.replace(/hsl\((-?\d+),(-?\d+%),(-?\d+%)\)/, function (hslString, h, s, l) {
		const rgb = hslToRgb(h, s, l);
		result = rgbToHex(rgb.r, rgb.g, rgb.b);
	});

	return result;
}

function rgbToHex(r, g, b) {
	let result = 'Invalid color';

	if (0 <= r && r <= 255 && 0 <= g && g <= 255 && 0 <= b && b <= 255) {
		r = Number(r).toString(16); 
		g = Number(g).toString(16);
		b = Number(b).toString(16);
		r += r.length == 1 ? r : '';
		g += g.length == 1 ? g : '';
		b += b.length == 1 ? b : '';
		result = r + g + b;
	}

	return result;
}

function rgbStringToHex(rgbString) {
	let result = 'Invalid color';

	rgbString.replace(/rgb\((-?\d+),(-?\d+),(-?\d+)\)/, function (rgbString, r, g, b) {
		result = rgbToHex(r, g, b);
	});

	return result;
}

function colorToHexFromQuery(query) {
	if (!query.color) {
		return 'Invalid color';
	}

	let result = query.color.replace(/ |%20/g, '').toLowerCase();

	if (result.indexOf('rgb') == 0) {
		result = rgbStringToHex(result);
	}

	if (result.indexOf('hsl') == 0) {
		result = hslStringToHex(result);
	}

	if (result[0] == '#') {
		result = result.slice(1);
	}

	if (result.length == 3) {
		result = result[0] + result[0] + result[1] + result[1] + result[2] + result[2];
	}

	if (~result.search(/[^\da-fA-F]/) || result.length != 6) {
		return 'Invalid color';
	}

	return '#' + result;
}

app.get('/task2D', (req, res) => {
	console.log(req.query);
	res.send(colorToHexFromQuery(req.query));
});

app.listen(3000, () => {
	console.log('Your app listening on port 3000!');
});
