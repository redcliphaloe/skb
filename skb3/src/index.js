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

//get object
app.get('/task3A/:key', async (req, res) => {
    let objKey = req.params.key;
    (pc[objKey]) ? objKey : objKey = objKey.toString();
    let reply = pc[objKey];
    
    (reply != null && reply.constructor === Array)
        ? reply = pc[objKey.toString()]
        : reply;
    
    await (reply && reply !== 'array')
        ? res.json(reply) 
        : (pc[objKey] === 0) 
                ? res.send('0') 
                : (pc[objKey] === null) 
                        ? res.json(reply) 
                        : res.sendStatus(404);
    
    console.log(objKey + ' - ' + reply);
});

//get field
app.get('/task3A/:key/:value', async (req, res) => {
    const objKey = req.params.key;
    let objValue;
    
    (req.params.value === 'length') ? res.sendStatus(404) : objValue = req.params.value;
    
    console.log(objKey + '/' + objValue);
    
    (pc[objKey] === undefined) ? res.sendStatus(404) : 0;
    (pc[objKey][objValue] === undefined) ? res.sendStatus(404) : 0;
    
    let reply = pc[objKey][objValue];
    console.log(reply);
    
    (pc[objKey] === Array)
        ? reply = 'array'
        : reply;
    
    await (reply && reply !== 'array')
        ? res.json(reply) 
        : res.sendStatus(404);
});

app.listen(3000, () => {
	console.log('Your app listening on port 3000!');
});
