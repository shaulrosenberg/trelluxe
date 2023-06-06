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

    const handleFocus = (event) => {
        event.target.select();
    }

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault(); // Prevent form submission
            event.target.blur(); // Trigger the onBlur event
        }
    }

    async function saveNewTitle(ev) {

        ev.preventDefault()
        const groupIdx = board.groups.findIndex(g => g.id === group.id)
        board.groups[groupIdx].title = groupTitle
        try {
            await updateBoard(board)
        } catch (err) {
            console.log('Could not update board:', err)
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
                onFocus={handleFocus}
                onKeyDown={handleKeyDown}




            />
        </form>
    )
}