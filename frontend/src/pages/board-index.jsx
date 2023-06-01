import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import { GroupList } from "../cmps/group-list"

import { boardService } from "../services/board.service"

export function BoardIndex() {

    const [board, setBoard] = useState(null)
    const { boardId } = useParams()

    useEffect(() => {
        loadBoard()
        // add listeners

        return () => {
            // remove listeners
        }
    }, [])

    async function loadBoard() {
        try {
            const board = await boardService.getById(boardId)
            console.log(board.groups)
            setBoard(board)
        } catch (err) {
            console.log("cannot load board", err)
        }
    }
    
    return (
        
        // render a list of groups
        // in each group -> render a list of tasks
        <section className="board-index">
            {board && <GroupList groups={board.groups}/>}
        </section>
    )
}