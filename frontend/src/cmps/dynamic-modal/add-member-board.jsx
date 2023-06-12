import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadUsers } from '../../store/user.actions';
import { updateBoard } from '../../store/board.actions';
import { RiCheckboxCircleLine } from 'react-icons/ri';



export function AddMemberBoard() {
    const dispatch = useDispatch()
    const { users, loading, error } = useSelector((storeState) => storeState.userModule)
    const board = useSelector((storeState) => storeState.boardModule.selectedBoard)
    const [selectedUsers, setSelectedUsers] = useState([])

    useEffect(async () => {
        await loadUsers()
    }, [])

    function toggleAddUser(user) {
        setSelectedUsers((prevSelectedUsers) => {
            if (prevSelectedUsers.includes(user)) {
                return prevSelectedUsers.filter((selectedUser) => selectedUser !== user)
            } else {
                return [...prevSelectedUsers, user]
            }
        })
    }

    async function handleSave() {
        const updatedBoard = { ...board, members: selectedUsers }
        await updateBoard(updatedBoard)
    }

    const isUserOnBoard = (user) => board.members.includes(user)

    return (
        <div className="add-member-board">
            <h3>Add Members</h3>
            {loading && <p>Loading users...</p>}
            {error && <p>Error loading users. Please try again.</p>}
            {!loading && !error && (
                <ul className="add-member-board__user-list">
                    {users.map((user) => (
                        <li
                            key={user._id}
                            className={`add-member-board__user-item ${isUserOnBoard(user) ? 'selected' : ''}`}
                            onClick={() => toggleAddUser(user)}
                        >
                            <div className="add-member-board__user-info">
                                <img src={user.imgUrl} alt={user.fullname} className="add-member-board__user-avatar" />
                                <span className="add-member-board__user-name">{user.name}</span>
                            </div>
                            {isUserOnBoard(user) && <RiCheckboxCircleLine className="add-member-board__user-icon" />}
                        </li>
                    ))}
                </ul>
            )}
            <button className="add-member-board__save-btn" onClick={handleSave}>Save</button>
        </div>
    )
}
