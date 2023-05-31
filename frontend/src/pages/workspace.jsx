// WORKSPACE
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { loadBoards, addBoard, updateBoard, removeBoard } from '../store/board.actions.js'

import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import { BoardPreview } from '../cmps/board-preview.jsx'
import { boardService } from '../services/board.service.js'

export function Workspace() {

    const boards = useSelector(storeState => storeState.boardModule.boards)

    useEffect(() => {
        loadBoards()
    }, [])

    async function onRemoveBoard(boardId) {
        try {
            await removeBoard(boardId)
            showSuccessMsg('Board removed')            
        } catch (err) {
            showErrorMsg('Cannot remove board')
        }
    }

    async function onAddBoard(board) {
        try {
            const savedBoard = await addBoard(board)
            showSuccessMsg(`Board added (id: ${savedBoard._id})`)
        } catch (err) {
            showErrorMsg('Cannot add board')
        }        
    }

    async function onUpdateBoard(board) {
        const price = +prompt('New price?')
        const boardToSave = { ...board, price }
        try {
            const savedBoard = await updateBoard(boardToSave)
            showSuccessMsg(`Board updated, new price: ${savedBoard.price}`)
        } catch (err) {
            showErrorMsg('Cannot update board')
        }        
    }

    function onAddBoardActivity(board) {
        console.log(`TODO Adding activity to board`)
    }

    return (
        <div>
            <h3>Boards App</h3>
            <main>
                <button onClick={onAddBoard}>Add Board ⛐</button>
                <ul className="board-list">
                    {boards.map(board =>
                        <li className="board-preview" key={board._id}>
                            <h4>{board.vendor}</h4>
                            <h1>⛐</h1>
                            <p>Price: <span>${board.price.toLocaleString()}</span></p>
                            <p>Owner: <span>{board.owner && board.owner.fullname}</span></p>
                            <div>
                                <button onClick={() => { onRemoveBoard(board._id) }}>x</button>
                                <button onClick={() => { onUpdateBoard(board) }}>Edit</button>
                            </div>
                        </li>)
                    }
                </ul>
            </main>
        </div>
    )
}