import React, { Component } from 'react';
import axios from 'axios';


class Input extends Component {

  state = {
    action: "", 
    length:0,
  }

  addTodo = () => {
    const task = { action: this.state.action }

    if (task.action && task.action.length > 0) {
      axios.post('/api/todos', task)
        .then(res => {
          if (res.data) {
            this.props.getTodos();
            this.setState({ action: "", length:0 })
          }
        })
        .catch(err => console.log(err))
    } else {
      console.log('input field required')
    }
  }

  handleChange = (e) => {
    this.setState({
      action: e.target.value, 
      length: e.target.value.length
    })
  }

  render() {
    let { action } = this.state;
    return (
      <div className="row">
          <input id="input_text" type="text" data-length="30" onChange={this.handleChange} value={action} maxLength="30" className="input-field col s7 offset-s1 darken-1 blue-text text-darken-2" />
          <label  className="col">
            {this.state.length}/30
          </label>
          <button onClick={this.addTodo} className="btn waves-effect waves-light hoverable blue accent-3 col">Jot</button>
      </div>
    )
  }
}

export default Input
