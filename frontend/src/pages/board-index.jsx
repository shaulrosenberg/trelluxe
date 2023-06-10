import { useSelector } from 'react-redux'
import { Outlet, useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { GroupList } from '../cmps/group-list'
import { BoardHeader } from '../cmps/board-header'
import { Loader } from '../cmps/loader'

import { boardService } from '../services/board.service'
import { setSelectedBoard } from '../store/board.actions'

export function BoardIndex() {
   const board = useSelector(
      (storeState) => storeState.boardModule.selectedBoard
   )

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
         console.log('cannot load board', err)
      }
   }

   function getBoardStyle() {
      let articleStyle = { ...board.style }

      // Check if backgroundImage exists, if not fallback to backgroundColor
      if (board.style.backgroundImage) {
         articleStyle.backgroundImage = `url(${board.style.backgroundImage})`
         articleStyle.backgroundSize = 'cover'
         articleStyle.backgroundPosition = 'center'
         // articleStyle.backgroundRepeat = 'no-repeat'
      } else {
         articleStyle.backgroundColor = board.style.backgroundColor
      }

      return articleStyle
   }

   if (!board) return <Loader />
   return (
      // render a list of groups
      // in each group -> render a list of tasks
      <section style={getBoardStyle()} className='board-index'>
         {/* maybe app-header should be here in order to change the app-header style while changing color */}
         <BoardHeader board={board} />
         {board && (
            <GroupList board={board} groups={board.groups} boardId={boardId} />
         )}
         <Outlet />
      </section>
   )
}
