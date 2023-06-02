import { useState, useEffect, useRef } from 'react'



export function MembersContent(props) {
    // initial state should be task.members
    const [members, setMembers] = useState([])

    useEffect

    function handleChange({ target }) {
        // pseudo
        // if(!members.includes(member) return)
        // else addMemberToTask()
        // updateTask(task, boardId, groupId)
    }

    return (
        <section>
            <select onChange={handleChange}>
                <option>Shaul</option>
                <option>Adam</option>
                <option>Dor</option>
            </select>
        </section>
    )
}