// WORKSPACE
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { loadBoards, addBoard, updateBoard } from '../store/board.actions.js'

import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import { BoardList } from '../cmps/board-list.jsx'
import { AiOutlineClockCircle, AiOutlineStar } from 'react-icons/ai'



export function Workspace() {
    const boards = useSelector(storeState => storeState.boardModule.boards)
    const { isLoading } = useSelector(storeState => storeState.systemModule)

    useEffect(() => {
        loadBoards()
    }, [])


    // this function should open the dynamic modal, and dynamic modal
    // will handle the content for adding a board
    async function onAddBoard(board) {
        try {
            const savedBoard = await addBoard(board)
            showSuccessMsg(`Board added (id: ${savedBoard._id})`)
        } catch (err) {
            showErrorMsg('Cannot add board')
        }
    }

    async function onUpdateBoard(board) {
        try {
            const savedBoard = await updateBoard(board)
            showSuccessMsg(`Board updated`)
        } catch (err) {
            showErrorMsg('Cannot update board')
        }
    }


    if (!boards) return <h1>Loading boards...</h1>
    return (
        <section className='workspace-container'>
            <main>
                <div className="header-with-icon">
                    <AiOutlineStar className="header-icon star-icon" />
                    <h2>Starred boards</h2>
                </div>

                <BoardList
                    boards={boards.filter(board => board.isStarred)}
                    onUpdateBoard={onUpdateBoard}
                />

                <div className='header-with-icon'>
                    <AiOutlineClockCircle className="header-icon recent-icon" />
                    <h2>Recently viewed</h2>
                </div>

                <BoardList
                    boards={boards}
                    onUpdateBoard={onUpdateBoard}
                    onAddBoard={onAddBoard}
                    includeAdd={true}
                />
            </main>
        </section>
    )
}