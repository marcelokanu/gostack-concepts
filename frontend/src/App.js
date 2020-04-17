import React, { useState, useEffect } from 'react';
import Header from './components/Header';

import './App.css';

import api from './services/api';


function App() {
  const [projects, setProjects] = useState([]);
  
  // primeiro parametro é qual função eu quero disparar, o segundo é quando quero disparar a funcao.
  useEffect(() => {
    api.get('projects').then(response => {
      setProjects(response.data);
    })
  }, []) 
  
  //utiliza handle como padrão de nome para toda açao que vem do usuário
  async function handleAddProject () {
  
    //projects.push(`Novo projeto ${Date.now()}`);
    //setProjects([...projects, `Novo projeto ${Date.now()}`])
    const response = await api.post('projects',
      {
        title: `Novo projeto ${Date.now()}`,
        owner: "Marcelo Bonilla"
    });

    const project = response.data;

    setProjects([...projects, project]);
  }
  
  return (
    <>
      <Header title="Projects" />
      
      <ul>
        {projects.map(project => <li key={project.id}>{project.title}</li>)}
      </ul>
      <button type="button" onClick={handleAddProject}>Adicionar projeto</button>
    </>
  );
}

export default App;