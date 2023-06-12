import { useSelector, useDispatch } from 'react-redux'
import { Outlet, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'

// my cmps
import { GroupList } from '../cmps/group-list'
import { BoardHeader } from '../cmps/board-header'
import { Loader } from '../cmps/loader'
// services
import { socketService } from '../services/socket.service'
import { boardService } from '../services/board.service'
import { setSelectedBoard, updateBoard } from '../store/board.actions'



export function BoardIndex() {
   const [isLoading, setIsLoading] = useState(true)
   const board = useSelector(
      (storeState) => storeState.boardModule.selectedBoard
   )
   const labelExpanedStatus = useSelector(
      (storeState) => storeState.boardModule.isLabelExpand
   )
   
   const dispatch = useDispatch()
   const { boardId } = useParams()

   useEffect(() => {
      loadBoard()
      // add listeners
      try {
         socketService.emit('join-board', boardId)
         socketService.on('board-update', (updatedBoard) => {
            dispatch({type: 'UPDATE_BOARD',board: updatedBoard})
            dispatch({ type: 'SET_SELECTED_BOARD', board: updatedBoard })
         })
      } catch (err) {

      }
      return () => {
         // remove listeners
         socketService.off('board-update')
         // clear board to fix bug
      }
   }, [])

   async function loadBoard() {
      try {
         setIsLoading(true)
         const board = await boardService.getById(boardId)
         setSelectedBoard(board)
         setIsLoading(false)
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
