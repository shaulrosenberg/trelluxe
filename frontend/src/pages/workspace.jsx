// WORKSPACE
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { loadBoards, addBoard, updateBoard } from '../store/board.actions.js'

import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import { BoardList } from '../cmps/board-list.jsx'
import { boardService } from '../services/board.service.js'

export function Workspace() {

    const boards = useSelector(storeState => storeState.boardModule.boards)

    useEffect(() => {
        loadBoards()
    }, [])


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


    if(!boards) return <h1>Loading boards...</h1>
    return (
        <section>
            <main>
                <button onClick={onAddBoard}>Create new board</button>
                <h2>Starred boards</h2>
                <BoardList
                    boards={boards.filter(board => board.isStarred)}
                    onUpdateBoard={onUpdateBoard}
                />
                <h2>Recently viewed</h2>
                <BoardList
                    boards={boards}
                    onUpdateBoard={onUpdateBoard}
                />
            </main>
        </section>
    )
}