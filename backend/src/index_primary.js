const express = require('express');

const app = express();

app.use(express.json());

app.get('/projects', (req, res) => {
  const {title, owner} = req.query;
  
  console.log("Title GET: ", title);
  console.log("Owner GET: ", owner);

  return res.json([ 
    'Projeto 1',
    'Projeto 2',
    'Projeto 3',
  ]);
});

app.post('/projects', (req,res) => {
  const {title,owner} = req.body;

  console.log("Title POST: ", title);
  console.log("Owner POST: ", owner);
  
  return res.json([
    'Projeto 1',
    'Projeto 2',
    'Projeto 3',
    'Projeto 4',
  ]);
});

app.put('/projects/:id', (req,res) => {
  const {id} = req.params;
  console.log("ID PUT: ", id);
  
  return res.json([
    'Projeto 5',
    'Projeto 6',
    'Projeto 7',
    'Projeto 8',
  ]);
});

app.delete('/projects/:id', (req,res) => {
  const {id} = req.params;
  console.log("ID DELETE: ", id);

  return res.json([
    'Projeto 6',
    'Projeto 7',
    'Projeto 8',
  ]);
});

app.listen(3333, () => {
  console.log('😊Back-end started.');
});