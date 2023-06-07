import { useState, useEffect, useRef } from 'react'
import { BiCheck } from 'react-icons/bi'
import { useSelector } from 'react-redux'
import { updateTask } from '../../store/board.actions'

export function MembersContent({ task, boardId, groupId }) {
    const board = useSelector(storeState => storeState.boardModule.selectedBoard)
    const taskMembersIds = task.memberIds

    const [displayedMembers, setDisplayedMembers] = useState(board.members)

    async function onMemberToggle(id) {
        let updatedMembersIds = []
        let updatedTask
        if (taskMembersIds?.includes(id)) {
            updatedMembersIds = taskMembersIds.filter(currId => currId !== id)
            updatedTask = { ...task, memberIds: updatedMembersIds }
        } else {
            let newIds = taskMembersIds ? [...taskMembersIds, id] : [id]
            updatedTask = { ...task, memberIds: newIds }
        }
        try {
            await updateTask(updatedTask, boardId, groupId)
        } catch (error) {
            console.error(error)
        }
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
                            const regex = new RegExp(ev.target.value, 'i')
                            setDisplayedMembers(board.members.filter(member => regex.test(member.fullname)))
                        }}
                        autoFocus
                    />
                </div>
                <h4 className=''>Board members</h4>
                <div className='members-modal-body'>
                    <ul className="task-members clean-list">
                        {displayedMembers && displayedMembers.map(memberToDisplay =>
                            <li key={memberToDisplay._id} className='flex member-to-display' title={`${memberToDisplay.fullname}`} onClick={() => { onMemberToggle(memberToDisplay._id) }} >
                                <img className='board-member-icon' src={memberToDisplay.imgUrl} alt='a member icon. when clicked on members is added to the task' />
                                <span className='board-member-name'>{memberToDisplay.fullname}</span>
                                {taskMembersIds?.includes(memberToDisplay._id) && (
                                    <span className='checked-icon' > <BiCheck /></span>
                                )}
                            </li>

                        )}
                        {displayedMembers.length ? null : <li className="">Looks like that person isn't a member yet. </li>}


                    </ul>
                </div>

            </section>
        </>
    )
}