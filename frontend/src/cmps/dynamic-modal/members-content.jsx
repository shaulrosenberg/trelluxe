import { useState, useEffect, useRef } from 'react'



export function MembersContent(props) {
    // initial state should be task.members
    const [members, setMembers] = useState([])


    useEffect(() => {

    }, [])

    function handleChange({ target }) {
        // pseudo
        // if(!members.includes(member) return)
        // else addMemberToTask()
        // updateTask(task, boardId, groupId)
    }

    return (
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
                <div className="task-members">


                </div>
            </div>

        </section>
    )
}