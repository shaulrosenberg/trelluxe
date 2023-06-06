import { useState, useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'


export function MembersContent({ task }) {
    // initial state should be task.members
    const board = useSelector(storeState => storeState.boardModule.selectedBoard)
    const memberIds = task.memberIds

    const [boardMembers, setBoardMembers] = useState(board.members)

    function handleChange({ target }) {
        // pseudo
        // if(!members.includes(member) return)
        // else addMemberToTask()
        // updateTask(task, boardId, groupId)
    }
    return (
        <>
            <section className='members-modal'>
                <div className='members-modal-search'>
                    <input
                        placeholder={`Search members`}
                        type="text"
                        className="modal-main-input"
                        onChange={ev => {
                            // setSearchedMemberText(ev.target.value);
                        }}
                        autoFocus
                    />
                </div>
                <div className='members-modal-body'>
                    <ul className="task-members clean-list">
                        {boardMembers && boardMembers.map(member =>
                            <li key={member._id} className=''>
                                <img className='board-member' src={member.imgUrl} alt='a member icon. when clicked on members is added to the task' />
                                <span>{member.fullname}</span>

                            </li>

                        )}

                    </ul>
                </div>

            </section>
        </>
    )
}