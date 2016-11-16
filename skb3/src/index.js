import express from 'express';
import fetch from 'isomorphic-fetch';
import cors from 'cors';

const app = express();

app.use(cors());

/*
Задача 3A: API 80286
Краткое описание задачи
Реализовать Express.js приложение по работе с API, обработка GET запросов для получения данных
Полное описание задачи
У вас есть объект, который описывает структуру персонального компьютера на базе процессора 80286. Необходимо реализовать геттеры внутренних подструктур и свойст этой модели.
Ответ должен быть всегда валидным JSON, например при отдаче строки, она должна быть в двойных кавычках (смотрите примеры). В случае ошибки запроса подструктуры которой нет в модели, необходимо возвращать 404 код ошибки, с телом "Not Found". Нумерация массивов начинается с 0.
Дополнительно необходимо реализовать метод /volumes, который подсчитывает, сколько места на каком диске находится, подробности можно увидеть в примерах.
Структуру модели, можно получить ТУТ:
https://gist.githubusercontent.com/isuvorov/ce6b8d87983611482aac89f6d7bc0037/raw/pc.json
Совет, так как данная структура может быть изменена в процессе, необходимо регулярно обновлять её в программе. Или разработать механиз, автоматического скачивания при старте веб-сервера.
*/

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
		dataFound[p] += 'B';
	}

	hdd.length > 0 ? res.json(dataFound) : res.sendStatus(404);
});

app.get('/task3A/:key', (req, res) => {
	let dataFound;

	try {
		dataFound = pc[req.params.key];
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
