import { useState } from "react";
import { boardService } from "../services/board.service";
import { addTask } from "../store/board.actions";
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service";
import { GrAdd, GrClose } from 'react-icons/gr';
export function AddTask({ group, boardId }) {
    const [isEditable, setIsEditable] = useState(false)
    const [cardTitle, setCardTitle] = useState('')

    function handleInputChange(ev) {
        ev.preventDefault()
        setCardTitle(ev.target.value)
    }


    async function onAddTask(ev) {
        ev.preventDefault()
        if (!cardTitle) return
        let newTask = boardService.getEmptyTask()
        newTask.title = cardTitle
        try {
            newTask = await addTask(newTask, boardId, group.id)
            setCardTitle('')
            showSuccessMsg(`Task added (id: ${newTask.id})`)
        } catch (err) {
            showErrorMsg('Cannot add car')
        }

    }

    return (
        <>
            {
                isEditable ? (
                    <div className="add-task-opened">
                        <form onSubmit={onAddTask}>
                            <input
                                type="text"
                                placeholder="Enter a card title..."
                                value={cardTitle}
                                onChange={handleInputChange}
                            />
                            <button><GrAdd />Add card</button>
                            <button onClick={() => setIsEditable(false)} ><GrClose /></button>
                        </form>
                    </div>
                ) : (

                    <button onClick={() => setIsEditable(true)}>Add a card</button>
                )
            }
        </>
    )

}

