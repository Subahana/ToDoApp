import React, { useState } from 'react'
import tick from '../assets/tick.png'
import delete_icon from '../assets/delete.png'
import not_tick from '../assets/not_tick.png'
import edit from '../assets/edit.png'
import { Draggable } from '@hello-pangea/dnd'

const Todoitems = ({ text, id, isComplete, isEditing, deleteTodo, toggle, toggleEdit, updateTodo, index }) => {
  const [editText, setEditText] = useState(text)

  return (
    <Draggable draggableId={String(id)} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          className={`flex items-center gap-2 p-3 mb-2 rounded-lg border 
            transition-all duration-200
            ${snapshot.isDragging ? 'bg-purple-200 shadow-lg scale-105' : 'bg-white shadow-sm'}
          `}
        >
          {/* Drag handle */}
          <div
            {...provided.dragHandleProps}
            className="cursor-grab text-purple-950 pr-2 select-none hover:text-gray-600"
            title="Drag to reorder"
          >
            ⋮⋮
          </div>

          {isEditing ? (
            <>
              <input
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                className="flex-1 border rounded px-2 py-1 outline-none"
              />
              <button
                onClick={() => updateTodo(id, editText)}
                className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded transition"
              >
                Save
              </button>
              <button
                onClick={() => toggleEdit(id)}
                className="bg-gray-400 hover:bg-gray-500 text-white px-3 py-1 rounded transition"
              >
                Cancel
              </button>
            </>
          ) : (
            <>
              {/* Complete toggle */}
              <div onClick={() => toggle(id)} className="flex flex-1 items-center cursor-pointer">
                <img
                  src={isComplete ? tick : not_tick}
                  alt=""
                  className="w-7"
                />
                <p
                  className={`ml-4 text-[17px] ${
                    isComplete ? 'line-through text-gray-500' : 'text-slate-700'
                  }`}
                >
                  {text}
                </p>
              </div>

              {/* Action buttons */}
              <img
                onClick={() => toggleEdit(id)}
                src={edit}
                alt="Edit"
                className="w-5 cursor-pointer hover:scale-110 transition"
              />
              <img
                onClick={() => deleteTodo(id)}
                src={delete_icon}
                alt="Delete"
                className="w-5 cursor-pointer hover:scale-110 transition"
              />
            </>
          )}
        </div>
      )}
    </Draggable>
  )
}

export default Todoitems
