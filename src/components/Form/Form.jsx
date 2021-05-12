import React, { useState, useEffect } from 'react';
import axios from 'axios'; 
import {useHistory } from 'react-router-dom';
import {Link} from 'react-router-dom'; 

import './Form.css';

const initialValue = {
  todo: '',
  time: '',
  commit: ''
}

const Form = (props) => {
const [values, setValues] = useState({ initialValue })
const history = useHistory(); 
const id = props.match.params.id;

useEffect(() => {
  if(id){
    axios.get(`http://localhost:8080/todolist/${id}`)
     .then((response) => {
      setValues(response.data);
    })
    .catch(error => { console.log(error) });
  }
}, []);


  function onChange(ev) {
  const { name, value } = ev.target;

  setValues({ ...values, [name]: value });
}

  function onSubmit(ev) {
    ev.preventDefault();

    const method = id ? 'put' : 'post';
    const url = id
      ? `http://localhost:8080/todolist/${id}`
      : 'http://localhost:8080/todolist'

    axios[method](url, values)
     .then((response) => {
      history.push('/')
     })
      .catch(error => { console.log(error) });
  }

    return (
    <div className="todo-form">
      <h1 className="todo-form__title">Inserir Tarefa</h1>
      <form onSubmit={onSubmit}>
        <div className="todo-form__form-control">
          <label htmlFor="todo"></label>
          <input 
            id="todo" 
            type="text" 
            name="todo"
            placeholder="Tarefa"            
            onChange= {onChange}
            value={values.todo}
           />
        </div>
        <div className="todo-form__form-control">
          <label htmlFor="time"></label>
          <input 
            id="time" 
            type="text" 
            name="time"
            placeholder="Tempo"            
            onChange= {onChange}
            value={values.time}
           />
        </div>
        <div className="todo-form__form-control">
          <label htmlFor="commit"></label>
          <input 
            id="commit" 
            type="text" 
            name="commit"
            placeholder="Comentário"            
            onChange= {onChange}
            value={values.commit}
           />
        </div>
        <div className="btn-links-form">
            <Link to={'/'}>
              <button className="btn-button-form">Voltar</button>
           </Link> 
           <button type="submit" className="btn-button-form">Salvar</button>
           </div>

      </form>
    </div>
  )
};

export default Form;
