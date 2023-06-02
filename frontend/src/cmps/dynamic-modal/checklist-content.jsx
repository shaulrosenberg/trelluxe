import { useState, useRef, useEffect } from "react"

import { updateTask } from "../../store/board.actions"


// pass task, groupId & boardId to these cmps from dynamic action modal
export function ChecklistContent(props) {

    const [title, setTitle] = useState('Checklist')
    const inputRef = useRef()

    useEffect(() => {
        inputRef.current.focus()
    }, [])

    function handleChange({ target }) {
        if (target.name === 'title') {
            setTitle(target.value)
        }
    }

    function onAddChecklist(ev) {
        ev.preventDefault()
        // create checklist data + add to task data
        // task = getTask()
        // task.checklist = {}
        // updateTask(task, boardId, groupId)
    }

    return (
        <section className="checklist-content">
            <form onSubmit={onAddChecklist}>
                <label htmlFor="checklist-title">Title</label>
                <input value={title} onChange={handleChange} ref={inputRef} type="text" name="title" id="checklist-title" />
                <button>Add</button>
            </form>
        </section>
    )
}