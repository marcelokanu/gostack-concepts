const express = require('express');
const {uuid, isUuid} = require('uuidv4');
const cors = require('cors') ;

const app = express();

app.use(cors()); // permissão para requisicoes http
app.use(express.json());

//armazenando na memória
const projects = [];

//middleware - se não chamar função next, a requisição será interrompida, caso contrário, será continuada
function logRequests(req, res, next) {
  const { method, url } = req;

  const logLabel = `[${method.toUpperCase()}] ${url}`;
  console.time(logLabel);
  
  //return next(); remover return para não parar.
  next();

  console.timeEnd(logLabel);
}

function validateProjectId(req, res, next) {
  const {id} = req.params;

  //caso não seja um uuid válido
  if (!isUuid(id)) {
    return res.status(400).json({error: "Invalid project ID."});
  }
  // caso seja válido, deixa rota continuar
  return next();
}

// Pode ser colocado em cada método quantas middlewares quiser, entre rota e req / res
// ex: app.get('/projects', logRequests, middleware1, middleware2, (req, res) => {}
// Pode chamar direto na função ou via app.use como abaixo, quantas quiser também

app.use(logRequests);
app.use('/projects/:id', validateProjectId);



app.get('/projects', (req, res) => {
  const { title } = req.query;

  // Filtro de listagem 
  // verificar se titulo foi preenchido ou não
  const results = title 
  ? projects.filter(project => project.title.includes(title)) // se foi preenchido, retorna filtrado por title
  : projects; // senão, retorna todos

  return res.json(results);
});

app.post('/projects', (req,res) => {
  const {title, owner} = req.body;
  const project = {id: uuid(), title, owner};
  
  projects.push(project);

  return res.json(project);
});

app.put('/projects/:id', (req,res) => {
  const {id} = req.params;
  const {title, owner} = req.body;
  const projectIndex = projects.findIndex(project => project.id === id);
  
  //quando retorna -1, é porque não encontrou registro
  if (projectIndex < 0) {
    return res.status(400).json({error: 'Project not found.'});
  };
  const project = {
    id,
    title,
    owner,
  };
  projects[projectIndex] = project;

  return res.json(project);
});

app.delete('/projects/:id', (req,res) => {
  const {id} = req.params;
  
  const projectIndex = projects.findIndex(project => project.id === id);

  if (projectIndex < 0) {
    return res.status(400).json({error: 'Project not found.'});
  }

  //metodo de remoção, parametros (posição a remvoer, quantas posições remover)
  projects.splice(projectIndex, 1);

  return res.status(200).send(`Project id ${id} removed.`);
});

app.listen(3333, () => {
  console.log('😊Back-end started.');
});