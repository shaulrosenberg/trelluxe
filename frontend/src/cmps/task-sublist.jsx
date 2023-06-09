import { useState, useRef, useEffect } from 'react'
import ChecklistIcon from '../assets/img/checklistIcon.svg'
import { BsCheck2Square, BsTrash } from 'react-icons/bs'
import { updateTask } from '../store/board.actions'
import { utilService } from '../services/util.service'

// renders the todos + add , toggle todo
export function TaskSublist({ checklist, task, boardId, groupId }) {
    const [isEditable, setIsEditable] = useState(true)
    const [todoTitle, setTodoTitle] = useState('')
    const [isDone, setIsDone] = useState(false)
    const [isHovered, setIsHovered] = useState(false)
    const inputRef = useRef()

    useEffect(() => {
        if (inputRef.current) inputRef.current.focus()
    }, [])


    async function handleSubmit(ev) {
        ev.preventDefault()
        const todo = { id: utilService.makeId(), title: todoTitle, isDone: isDone }
        const updatedTask = { ...task }
        const checklistIndex = updatedTask.checklists.findIndex(c => c.id === checklist.id)
        if (checklistIndex !== -1) {
            updatedTask.checklists[checklistIndex].todos.push(todo)
        }
        try {
            await updateTask(updatedTask, boardId, groupId)
            setTodoTitle('')
            // TODO: chain add todos
            setIsEditable(false)
        } catch (err) {
            console.error('Failed to add todo', err)
        }
    }

    async function handleCheckboxChange(todoId) {
        const updatedTask = { ...task }
        const checklistIndex = updatedTask.checklists.findIndex(c => c.id === checklist.id)
        if (checklistIndex !== -1) {
            const todoIndex = updatedTask.checklists[checklistIndex].todos.findIndex(t => t.id === todoId)
            if (todoIndex !== -1) {
                updatedTask.checklists[checklistIndex].todos[todoIndex].isDone = !updatedTask.checklists[checklistIndex].todos[todoIndex].isDone
                try {
                    await updateTask(updatedTask, boardId, groupId)
                } catch (err) {
                    console.error('Failed to update todo', err)
                }
            }
        }
    }

    async function handleTodoDelete(todoId) {
        const updatedTask = { ...task }
        const checklistIndex = updatedTask.checklists.findIndex(c => c.id === checklist.id)
        if (checklistIndex !== -1) {
            updatedTask.checklists[checklistIndex].todos = updatedTask.checklists[checklistIndex].todos.filter(t => t.id !== todoId)
            try {
                await updateTask(updatedTask, boardId, groupId)
            } catch (err) {
                console.error('Failed to delete todo', err)
            }
        }
    }

    async function handleDelete() {
        const updatedTask = { ...task }
        updatedTask.checklists = updatedTask.checklists.filter(c => c.id !== checklist.id)
        try {
            await updateTask(updatedTask, boardId, groupId)
        } catch (err) {
            console.error('Failed to delete checklist', err)
        }
    }

    function calculateProgress() {
        const doneTodos = checklist.todos.filter(todo => todo.isDone).length
        const totalTodos = checklist.todos.length
        return totalTodos === 0 ? 0 : (doneTodos / totalTodos) * 100
    }

    // <img src={ChecklistIcon} />
    return (
        <section className="task-details-sublist">
            <div className="sublist-header">
                <h3>{<BsCheck2Square />} {checklist.title}</h3>
                <button onClick={handleDelete}>Delete</button>
            </div>

            <div className='checklist-progress'>
                <div className="progress-percent">
                    {calculateProgress().toFixed(0)}%
                </div>
                <div className="sublist-progress-bar">
                    <div className="progress-bar-foreground" style={{ width: `${calculateProgress()}%`, backgroundColor: calculateProgress() === 100 ? '#1F845A' : '#579DFF' }}></div>
                </div>
            </div>



            <div className="sublist-todos">
                {checklist.todos.map((todo, idx) =>
                    <div key={todo.id} onMouseEnter={() => setIsHovered(todo.id)} onMouseLeave={() => setIsHovered(null)}>
                        <input type="checkbox" checked={todo.isDone} onChange={() => handleCheckboxChange(todo.id)} />
                        <span>{todo.title}</span>
                        {isHovered === todo.id && <button onClick={() => handleTodoDelete(todo.id)}><BsTrash /></button>}
                    </div>
                )}

            </div>


            {!isEditable && <button className='add-item-btn' onClick={() => setIsEditable(true)}>Add an item</button>}
            {isEditable &&
                <section>
                    <form className="add-new-item-container" onSubmit={handleSubmit}>
                        <input placeholder='Add an item' type="text" ref={inputRef} value={todoTitle} onChange={e => setTodoTitle(e.target.value)} />
                        <div>
                            <button>Add</button>
                            <button onClick={() => setIsEditable(false)}>Cancel</button>
                        </div>
                    </form>
                </section>
            }
        </section>
    )
}