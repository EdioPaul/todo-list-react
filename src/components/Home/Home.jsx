import React, { useEffect, useState } from 'react';
import axios from 'axios'; 
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

import './Home.css';

const Home = () => {
const [todos, setTodos] = useState([]);
const history = useHistory(); 

    useEffect(() => {
      axios.get('http://localhost:8080/todolist')
      .then((response) => {
        setTodos(response.data);
    })
      .catch(error => { console.log(error) });
  }, []);

  async function handleDelete(id) {
     await axios.delete(`http://localhost:8080/todolist/${id}`)
    .catch(error => { console.log(error) });
    history.push('/')
}
    return ( 
      <div className="list">
          <h1 className="todo-form__title">TODO LIST</h1>
        <div>      
        <Link to={'/create'}>
          <button className="btn-insert">Inserir</button>
        </Link>
        </div>

         { todos.map(todo => (
           <div className="list-box">
             <ul key= { todo.id }> 
             <ul><strong>Tarefa:</strong> { todo.todo }</ul>
             <ul><strong>Tempo:</strong> { todo.time }</ul>
             <ul><strong>Comentário:</strong> { todo.commit }</ul>
           <div className="btn-links">
             <Link to={`/edit/${todo.id}`}>
               <button className="btn-button-edit">Editar</button>
             </Link>
             <Link to={`/delete/${todo.id}`}>
               <button className="btn-button-delete" onClick={() => handleDelete(todo.id)}>Exluir</button>
             </Link>
             </div>
             </ul>
            </div>
          ))}
      </div>
    )
  };


export default Home;