import { useState } from "react";
import { useDispatch } from 'react-redux';
import { boardService } from "../services/board.service";
import { updateBoard } from "../store/board.actions";

export function AddTask({ groups }) {
    const dispatch = useDispatch();
    const [isEditable, setIsEditable] = useState(false)
    const [cardTitle, setCardTitle] = useState('Enter a title for this card...')

    function handleInputChange(ev) {
        ev.preventDefault()
        setCardTitle(ev.target.value)
    }

    async function handleSubmit(ev) {
        ev.preventDefault()

    }

    async function onAddTask(boardId, groupId) {
        const newTask = boardService.getEmptyTask()
        newTask.title = cardTitle
        const updatedBoard = await boardService.getById(boardId)
        const group = updatedBoard.groups.find(group => group.id === groupId)
        group.push(newTask)
        updatedBoard(updatedBoard)
    }

    return (
        <>
            {
                isEditable ? (
                    <div className="add-task-opened">
                        <form onSubmit={handleSubmit}>
                            <input
                                type="text"
                                placeholder="Enter the card title"
                                value={cardTitle}
                                onChange={handleInputChange}
                            />
                        </form>
                    </div>
                ) : (

                    <button onClick={() => setIsEditable(true)}>Add a card</button>
                )
            }
        </>
    )

}

