import { useSelector } from "react-redux"
import { Outlet, useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import { GroupList } from "../cmps/group-list"
import { BoardMiniHeader } from "../cmps/board-mini-header"

import { boardService } from "../services/board.service"
import { setSelectedBoard } from "../store/board.actions"

export function BoardIndex() {

    const { boards } = useSelector(storeState => storeState.boardModule)
    const board = useSelector(storeState => storeState.boardModule.selectedBoard)

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
            setSelectedBoard(board)
        } catch (err) {
            console.log("cannot load board", err)
        }
    }


    return (


        // render a list of groups
        // in each group -> render a list of tasks
        <section className="board-index">
            <BoardMiniHeader board={board} />
            {board && <GroupList groups={board.groups} boardId={boardId} />}
            <Outlet />
        </section>
    )
}