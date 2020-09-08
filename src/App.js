import React, { useEffect }from 'react';
import TodoList from "./Todo/TodoList.js";
import Context from "./context";
import AddTodo from "./Todo/AddTodo";
import $ from 'jquery';







function App() {
  const [todos, setTodos] = React.useState([]);
  
  
  useEffect(()=>{
    $.ajax({
      url: "http://localhost:8080/todolist/page",
      method: "GET",
      contentType: "application/json",
      complete: function(serverResponse){
        let todos = serverResponse.responseJSON;
        console.log(todos.content)
        setTodos(todos.content) 
      }
    })
                
  },[])

  function toggleTodo(id){
    setTodos(
      todos.map(todo =>{
        if (todo.id === id){
          todo.completed = !todo.completed;
        }
        return todo;
      })
    )
  }

  function removeTodo(id){
    $.ajax({
      url:"http://localhost:8080/todolist/" + id ,
      method: "DELETE",
      contentType: "application/json",
      complete:function(serverResponse){
        setTodos(todos.filter(todo => todo.id !==id))
          // if(serverResponse.status == 200){
          //   alert("Deleted")
          // }
      }
  })

    
  }

  function addTodo(title){
    setTodos(todos.concat([
      {
      title,
      id: Date.now(),
      completed: false
      }
  ]))
  }


  return (
    <Context.Provider value={{ removeTodo }}>
    <div className = "wrapper">
      <h1>ToDo List</h1>
      <AddTodo onCreate={addTodo} />
      {todos.length ? <TodoList todos={todos} onToggle={toggleTodo} /> :<p>Nothing to do!</p>}
      
    </div>
    </Context.Provider>
  )
}

export default App;
