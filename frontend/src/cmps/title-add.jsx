import { useState, useEffect } from "react";
import { updateBoard } from "../store/board.actions";
export default function TitleAdd({ board, group }) {
    const [groupTitle, setGroupTitle] = useState('');

    useEffect(() => {
        setGroupTitle(group.title)
    }, [group.title])

    function handleChange({ target }) {
        const groupTitle = target.value;
        setGroupTitle(groupTitle)
    }

    function handleSubmit(ev) {
        ev.preventDefault()
        saveNewTitle()
    }

    async function saveNewTitle(ev) {

        ev.preventDefault()
        const groupIdx = board.groups.findIndex(g => g.id === group.id)
        board.groups[groupIdx].title = groupTitle
        try {
            await updateBoard(board)
        } catch (err) {
            console.log('Could not save board:', err)
        }

    }



    return (
        <form onSubmit={saveNewTitle}>
            <input
                className="group-title"
                value={groupTitle}
                onChange={handleChange}
                type="text"
                onBlur={saveNewTitle}

            />
        </form>
    )
}