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

app.listen(3000, () => {
	console.log('Your app listening on port 3000!');
});
