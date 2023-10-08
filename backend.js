import express from "express";
import cors from "cors";
const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

const users = { 
    users_list :
    [
       { 
          id : 'xyz789',
          name : 'Charlie',
          job: 'Janitor',
       },
       {
          id : 'abc123', 
          name: 'Mac',
          job: 'Bouncer',
       },
       {
          id : 'ppp222', 
          name: 'Mac',
          job: 'Professor',
       }, 
       {
          id: 'yat999', 
          name: 'Dee',
          job: 'Aspring actress',
       },
       {
          id: 'zap555', 
          name: 'Dennis',
          job: 'Bartender',
       }
    ]
 }

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/users', (req, res) => {
    const name = req.query.name;
    if (name != undefined){
        let result = findUserByName(name);
        result = {users_list: result};
        res.send(result);
    }
    else {
        res.send(result);
    }
});

app.get('/users/:id', (req, res) => {
    const id = req.params['id']; //or req.params.id
    let result = findUserById(id);
    if (result === undefined || result.length == 0)
        res.status(404).send('Resource not found.');
    else {
        result = {users_list: result};
        res.send(result);
    }
});

function findUserById(id) {
    return users['users_list'].find( (user) => user['id'] === id); // or line below
    //return users['users_list'].filter( (user) => user['id'] === id);
}

const findUserByName = (name) => { 
    return users['users_list'].filter( (user) => user['name'] === name); 
}

app.post('/users', (req, res) => {
    const record = req.body;
    idgen['id'] = idGenerator();
    length = addUser(idgen);
    if (length === undefined)
        res.status(204).end();
    else
        res.status(201).send(idgen);
});

function addUser(user){
    return users['users_list'].push(user);
}

function idGenerator(){
    var random_ID = "";
    var random_char = '';
    for (var i=0; i<6; i++){
        if (i < 3){ 
            random_char = Math.floor(Math.random() * (26) + 97);
            random_ID += String.fromCharCode(random_char); 
        } else {
            random_char = Math.floor(Math.random() * (10) + 48);
            random_ID += String.fromCharCode(random_char); 
        }
    }
    return random_ID;
}

app.delete('/users/:id', (req, res) => {
    const id = req.params['id']
    const userToDelete = findUserById(id)
    if (userToDelete === undefined) {
        res.status(404).send('Resource Not Found');
    }
    else {
        deleteUser(userToDelete);
        res.status(204).end();
    }
});

function deleteUser(user){
    const index = users['users_list'].indexOf(user)
    if(index < 0 || index > users['users_list'].length)
        res.status(200).end();
    else
        users['users_list'].splice(index, 1);
}


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});

// const findUserByNameandJob = (name, job) => {
//     return users['users_list'].filter((user) => user['name'] === name && user['job'] === job);
// }