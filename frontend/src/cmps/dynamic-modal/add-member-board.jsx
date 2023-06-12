import { useState, useEffect, useRef } from 'react'
import { BiCheck } from 'react-icons/bi'
import { useSelector } from 'react-redux'
import { updateTask, updateBoard } from '../../store/board.actions'
import { loadUsers } from '../../store/user.actions';
import curriedAdjustHue from 'polished/lib/color/adjustHue';

export function AddMemberBoard() {
    const board = useSelector(storeState => storeState.boardModule.selectedBoard)
    const users = useSelector(storeState => storeState.userModule.users)
    // const users = useRef()
    useEffect(() => {
        onLoad()

        return () => {

        }
    }, [])

    function onLoad() {
        // users.current = loadUsers()
        loadUsers()

    }
    async function onMemberToggle(id) {

        let updatedBoard = { ...board }
        console.log('boardmembers:', board)
        let currUser
        if (board && board.members) {
            // debugger
            currUser = board.members.find((user) => user._id === id)
        }

        if (currUser) {
            let userToRemoveIdx = board.members.findIndex((user) => user._id === id)
            updatedBoard.members.splice(userToRemoveIdx, 1)
        }
        else {
            updatedBoard.members.push(users.find(user => user._id === id))
        }
        try {
            let shaulUsers = await updateBoard(updatedBoard)
            console.log('shaulUsers.members:', shaulUsers.members)
        } catch (err) {
            console.log('err:', err)
        }


    }



    // if (!users.current) return <p>loading!!</p>
    return (
        <>

            <section className='add-members-board'>
                <div className='members-modal-search'>
                    {/* <input
                        placeholder={`Search members`}
                        type="text"
                        className="modal-main-input"
                        onChange={ev => {
                            const regex = new RegExp(ev.target.value, 'i')
                            setDisplayedMembers(board.members.filter(member => regex.test(member.fullname)))
                        }}
                        autoFocus
                    /> */}
                </div>
                <h4 className=''>Board members</h4>
                <div className='members-modal-body'>
                    <ul className="task-members clean-list">
                        {users && users.map(memberToDisplay =>
                            <li key={memberToDisplay._id} className='flex member-to-display' title={`${memberToDisplay.fullname}`} onClick={() => { onMemberToggle(memberToDisplay._id) }} >
                                <img className='board-member-icon' src={memberToDisplay.imgUrl} alt='a member icon. when clicked on members is added to the task' />
                                <span className='board-member-name'>{memberToDisplay.fullname}</span>
                                {users?.includes(memberToDisplay._id) && (
                                    <span className='checked-icon' > <BiCheck /></span>
                                )}
                            </li>

                        )}
                        {/* {displayedMembers && displayedMembers.length ? null : <li className="">Looks like that person isn't a member yet. </li>} */}


                    </ul>
                </div>

            </section>
        </>
    )
}




// ------------ - -- - - - - 
// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { loadUsers } from '../../store/user.actions';
// import { updateBoard } from '../../store/board.actions';
// import { RiCheckboxCircleLine } from 'react-icons/ri';



// export function AddMemberBoard() {
//     const dispatch = useDispatch()
//     const { users, loading, error } = useSelector((storeState) => storeState.userModule)
//     const board = useSelector((storeState) => storeState.boardModule.selectedBoard)
//     const [selectedUsers, setSelectedUsers] = useState([])

//     useEffect(async () => {
//         await loadUsers()
//     }, [])

//     function toggleAddUser(user) {
//         setSelectedUsers((prevSelectedUsers) => {
//             if (prevSelectedUsers.includes(user)) {
//                 return prevSelectedUsers.filter((selectedUser) => selectedUser !== user)
//             } else {
//                 return [...prevSelectedUsers, user]
//             }
//         })
//     }

//     async function handleSave() {
//         const updatedBoard = { ...board, members: selectedUsers }
//         await updateBoard(updatedBoard)
//     }

//     const isUserOnBoard = (user) => board.members.includes(user)

//     return (
//         <div className="add-member-board">
//             <h3>Add Members</h3>
//             {loading && <p>Loading users...</p>}
//             {error && <p>Error loading users. Please try again.</p>}
//             {!loading && !error && (
//                 <ul className="add-member-board__user-list">
//                     {users.map((user) => (
//                         <li
//                             key={user._id}
//                             className={`add-member-board__user-item ${isUserOnBoard(user) ? 'selected' : ''}`}
//                             onClick={() => toggleAddUser(user)}
//                         >
//                             <div className="add-member-board__user-info">
//                                 <img src={user.imgUrl} alt={user.fullname} className="add-member-board__user-avatar" />
//                                 <span className="add-member-board__user-name">{user.name}</span>
//                             </div>
//                             {isUserOnBoard(user) && <RiCheckboxCircleLine className="add-member-board__user-icon" />}
//                         </li>
//                     ))}
//                 </ul>
//             )}
//             <button className="add-member-board__save-btn" onClick={handleSave}>Save</button>
//         </div>
//     )
// }
