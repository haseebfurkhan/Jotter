import React, { Component } from 'react';
import axios from 'axios';
import Input from './Input';

class Todo extends Component {

  state = {
    todos: []
  }

  componentDidMount() {
    this.getTodos();
  }

  getTodos = () => {
    axios.get('/api/todos')
      .then(res => {
        if (res.data) {
          this.setState({
            todos: res.data
          })
        }
      })
      .catch(err => console.log(err))
  }

  completeTodo = (event)=> {

    const task = JSON.parse(event.target.name);
 
     if (task != null) {
      task.isComplete = event.target.checked;
       axios.put('/api/todos', task)
         .then(res => {
           if (res.data) {
            this.getTodos()
           }
         })
         .catch(err => console.log(err))
     } else {
       console.log('input field required')
     }
  }

  deleteTodo = (id) => {
    axios.delete(`/api/todos/${id}`)
      .then(res => {
        if (res.data) {
          this.getTodos()
        }
      })
      .catch(err => console.log(err))
  }

  render() {
    let { todos } = this.state;
    let that = this;
    return (
      <div className="container">
        <h4 style={{ fontFamily: "monospace" }} className="col s12 brand-logo center black-text"><i className="material-icons">code</i>Jotter</h4>
        <Input getTodos={this.getTodos} />
        {
          this.state.todos.map(function (data, index) {
            return (<div style={{ fontFamily: "monospace" }} key={data._id}>
              <label>
                <input type="checkbox" checked={data.isComplete} name={JSON.stringify(data)} onChange={that.completeTodo} />
                <span>                
                {!data.isComplete ? <span>{data.action}</span> : <s>{data.action}</s>}
                  <a href="#!" className="secondary-content red-text accent-4">
                    <i key={data._id} onClick={that.deleteTodo.bind(this, data._id)} className="material-icons">delete_forever</i>
                  </a>
                </span>
              </label>
            </div>)
          })
        }

      </div>
    )
  }
}

export default Todo;
