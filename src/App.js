import React, { useState, useEffect } from "react";

import api from './services/api';

import logoImg from './assets/github-icon.png';
import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data);
    });
  }, []);

  async function handleAddRepository() {        
    const response = await api.post('repositories', { 
      title: 'React Native',
      url: 'https://github.com/leticiadeieno/desafio-conceitos-react-native.git',
      techs: ['React Native'],
      likes: 0
     });
    
    setRepositories([...repositories, response.data]);   
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${ id }`);

    setRepositories(repositories.filter(repository => repository.id !== id)); 
  }

  return (
    <>
    <div className="project-container">
      <header>
        <img src={ logoImg } alt="logoGitHub"/>
        <h1> Repositórios GitHub </h1>
      </header>
    

      <div className="newProject">
        <button type="submit" onClick={ handleAddRepository }> Adicionar </button>
      </div>   

      <ul data-testid="repository-list">
        { repositories.map(repository => ( 
          <li key={ repository.id }>
            <strong> REPOSITÓRIO </strong>
            <p> { repository.title } </p>
            
            <strong> URL GitHub: </strong>
            <p> { repository.url } </p>

            <strong> TECNOLOGIAS: </strong>
            <p> { repository.techs } </p>

            <strong> LIKES: </strong>
            <p> { repository.likes } </p>

            <button onClick={() => handleRemoveRepository(repository.id) } type="submit" >
              Remover
            </button>
          </li>
        )) }  
      </ul>

    </div>

    </>
  );
}

export default App;
