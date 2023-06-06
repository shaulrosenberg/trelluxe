import { useState } from 'react'
import { addGroup } from '../store/board.actions.js';
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service";
import { GroupPreview } from './group-preview.jsx'

//icons
import { GrClose } from 'react-icons/gr';
import { FaPlus } from "react-icons/fa";


export function GroupList({ board, groups, boardId }) {
    const [isAddGroupOpen, setIsGroupOpen] = useState(false)
    const [groupTitle, setGroupTitle] = useState('')


    async function onAddGroup(ev) {
        ev.preventDefault()
        if (!groupTitle) return
        try {
            const newGroup = await addGroup(groupTitle, boardId)
            setGroupTitle('')
            showSuccessMsg(`Task added (id: ${newGroup.id})`)
        } catch (err) {
            showErrorMsg('Cannot add group')
        }
    }
    return (
        <section className="group-list-container">
            {groups.map(group =>
                <GroupPreview board={board} key={group.id} group={group} />
            )}
            {isAddGroupOpen ? (
                <div className='add-group'>
                    <input
                        autoFocus
                        placeholder="Enter list title..."
                        onChange={ev => setGroupTitle(ev.target.value)}
                        value={groupTitle}

                    ></input>
                    <div className="add-new-list flex align-center">
                        <button onClick={onAddGroup}>
                            Add list
                        </button>


                        <button
                            onClick={() => {
                                setIsGroupOpen(false)
                            }}
                        >
                            <GrClose />
                        </button>
                    </div>
                </div>
            ) : (
                <div className='add-group-btn' onClick={() => { setIsGroupOpen(true) }}>
                    <FaPlus className="icon-add-group" />
                    <p>Add another list</p>
                </div>
            )
            }

        </section>
    )
}