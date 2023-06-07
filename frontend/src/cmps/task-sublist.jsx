import { useState, useRef, useEffect } from 'react'
import ChecklistIcon from '../assets/img/checklistIcon.svg'
import { updateTask } from '../store/board.actions'

// renders the todos + add , toggle todo
export function TaskSublist({ checklist, task, boardId, groupId }) {
    
    const [isEditable, setIsEditable] = useState(true)
    const inputRef = useRef()

    useEffect(() => {
        if(inputRef.current) inputRef.current.focus()
    }, [])

    
    
    function handleSubmit(ev) {
        ev.preventDefault()
        // add todo
        // const todo = {id: makeId(), isDone: false, }

    }

    return (
        <section className="task-details-sublist">
            <div className="sublist-header" >
                <h3><img src={ChecklistIcon} /> {checklist.title}</h3>
                <button>Delete</button>
            </div>

            <div className="sublist-progress-bar"></div>

            <div className="sublist-todos">
                {checklist.todos.map((todo, idx) =>
                    <div>
                        <input type="checkbox" />
                        <span>{todo.title}</span>
                    </div>)}
            </div>

            {!isEditable && <button onClick={() => setIsEditable(true)}>Add an item</button>}
            {isEditable &&
                <section>
                    <form onSubmit={handleSubmit}>
                        <input type="text" ref={inputRef}/>
                        <button>Add</button>
                        <button onClick={() => setIsEditable(false)}>Cancel</button>
                    </form>
                </section>
            }
        </section>
    )
}