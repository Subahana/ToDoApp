import React, { useEffect, useRef, useState } from 'react'
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import todo_icon from '../assets/todo_icon.png'
import Todoitems from './Todoitems'
const Todo = () => {
const [todoList,setTodoList] = useState(localStorage.getItem('todo')?
JSON.parse(localStorage.getItem('todo')) : []); // getItem is used to get item from local storage
const inputRef = useRef(); 
const add = () =>{
    const inputText = inputRef.current.value.trim();
    if (inputText === ""){
        return null;
    }
    const newTodo ={
        id: Date.now(),
        text: inputText,
        isComplete: false,
        isEditing: false
    }
    setTodoList((prev) =>[...prev,newTodo]);
    inputRef.current.value = ""
}
const deleteTodo =(id) =>{
    setTodoList((prevTodo)=>{
        return prevTodo.filter((todo) => todo.id !== id)
    })
}


const toggle = (id) =>{
    setTodoList((prevTodo) =>{
        return prevTodo.map((todo) =>{
            if (todo.id === id){
                return {
                    ...todo,
                    isComplete : !todo.isComplete
                }
            }
            return todo;
        })
    })
}
const toggleEdit = (id) =>{
    setTodoList((prevTodo) =>{
        return prevTodo.map((todo) =>{
            if (todo.id === id){
                return {
                    ...todo,
                    isEditing:!todo.isEditing
                }
            }
            return todo;
        })
    })
}
const updateTodo = (id,newText) =>{
    setTodoList((prev) =>{
        return prev.map((todo) =>{
            if (todo.id === id){
                return {
                    ...todo,
                    text:newText,
                    isEditing:false
                }
            }
            return todo;
        })
    })
}

  const handleOnDragEnd = (result) => {
    if (!result.destination) return;
    const items = Array.from(todoList);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setTodoList(items);
  };

useEffect(() =>{
    console.log(todoList)
    localStorage.setItem('todo',JSON.stringify(todoList)) 
},[todoList])
 // setItem used to store data in local storage
    /* it is used to store the data in local storage ,
    if we want to store it in local storage we can only store data in form of  string data type ,
    so we use JSON.stringify(todoLiist) to convert array to string */

  return (
    <div className='bg-white place-self-center w-11/12 max-w-md flex flex-col p-7 min-h-[550px] rounded-xl'>
      {/*-------title --------*/}
      <div className='flex items-center mt-7 gap-2'>
        <img className='w-8' src={todo_icon} alt="" />
        <h1 className='text-4xl font-black'>To-Do-List</h1>
      </div>

      {/*------input box ------*/}
      <div className='flex items-center my-7 bg-purple-100 rounded-full'>
        <input
          ref={inputRef}
          className='bg-transparent border-0 outline-none flex-1 h-14 pl-6 pr-2 placeholder:text-slate-800'
          type="text"
          placeholder='Enter ....'
        />
        <button
          onClick={add}
          className='border-none rounded-full bg-purple-500 w-32 h-14 text-white text-lg font-medium cursor-pointer'>
          ADD +
        </button>
      </div>

      {/*------list with drag and drop ------*/}
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="todos">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {todoList.map((item, index) => (
                <Todoitems
                  key={item.id}
                  index={index}
                  text={item.text}
                  id={item.id}
                  isComplete={item.isComplete}
                  isEditing={item.isEditing}
                  deleteTodo={deleteTodo}
                  toggle={toggle}
                  toggleEdit={toggleEdit}
                  updateTodo={updateTodo}
                />
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  )
}

export default Todo
