import { useState } from 'react'
import { addGroup } from '../store/board.actions.js';
import { GrAdd, GrClose } from 'react-icons/gr';
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service";



//components imports
import { GroupPreview } from './group-preview.jsx'

export function GroupList({ groups, boardId }) {
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
                <GroupPreview key={group.id} group={group} />
            )}
            {isAddGroupOpen ? (
                <div className={'add-group'}>
                    <input
                        autoFocus
                        placeholder="Enter list title..."
                        onChange={ev => setGroupTitle(ev.target.value)}
                        value={groupTitle}

                    ></input>
                    <div className="flex align-center">
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
                <div className={`flex`} onClick={() => { setIsGroupOpen(true) }}>
                    <GrAdd className="icon" />
                    <p>Add another list</p>
                </div>
            )
            }

        </section>
    )
}