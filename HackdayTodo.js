import React, { Component } from 'react'
import { AppRegistry, View, ListView } from 'react-native'

import TodoList from './TodoList'
import Input from './Input'
import Title from './Title'

const ds = new ListView.DataSource({rowHasChanged: (row1, row2) => true});
export default class HackdayTodo extends Component {

  state = {
    todos: [
      {'rowId': 0, 'content': 'Click to remove'},
      {'rowId': 1, 'content': 'Learn React Native'},
      {'rowId': 2, 'content': 'Write Code'},
      {'rowId': 3, 'content': 'Ship App'}
    ],
    scrollEnabled: true,
  }

  onAddTodo = (text) => {
    const {todos} = this.state

    this.setState({
      todos: [{'id': todos.length + 1, 'content': text}, ...todos],
    })
  }

  onRemoveTodo = (rowId) => {
    const {todos} = this.state

    this.setState({
      todos: todos.filter((todo, i) => i !== rowId),
    })
  }

  render() {
    const {todos} = this.state

    return (
      <View>
        <Title>
          To-Do List
        </Title>
        <Input
          placeholder={'Type a todo, then hit enter!'}
          onSubmitEditing={this.onAddTodo}
        />
        <TodoList
          dataSource={ds.cloneWithRows(this.state.todos)}
          todos={this.state.todos}
          onRemoveTodo={this.onRemoveTodo}/>
      </View>
    )
  }
}
