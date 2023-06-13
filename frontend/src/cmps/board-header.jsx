import { useParams } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'

import { darken, transparentize } from 'polished'
import { boardService } from '../services/board.service'
import { updateBoard } from '../store/board.actions'
import { DynamicActionModal } from './dynamic-modal/dynamic-action-modal'

//icons
import { BsFilter } from 'react-icons/bs'
import {
   IoStarOutline,
   IoPersonAddOutline,
   IoEllipsisHorizontalSharp,
} from 'react-icons/io5'
import { AiFillStar, AiOutlineStar } from 'react-icons/ai'
import PropTypes, { func } from 'prop-types'

export function BoardHeader({ board }) {
   const params = useParams()
   const [currTask, setCurrTask] = useState(null)
   const [navColor, setNavColor] = useState(null)

   const [currBoard, setCurrboard] = useState(null)
   const [modalType, setModalType] = useState(null)

   const eventRef = useRef()

   const modalTitles = {
      filter: 'Filter',
      activity: 'Menu',
      addMember: 'Add Member',
   }

   function onToggleModal(type = null, ev = null) {
      eventRef.current = ev
      setModalType(type)
   }

   function onCloseModal() {
      setModalType(null)
   }

   useEffect(() => {
      fetchBoardStyle()
      console.log(params)
   }, [])

   async function fetchBoardStyle() {
      if (params.boardId) {
         try {
            const board = await boardService.getById(params.boardId)
            setCurrboard(board)
            let boardStyleColor = board.style.backgroundColor
            if (!boardStyleColor) return

            boardStyleColor = darken(0.1, boardStyleColor)
            const transparentColor = transparentize(0.8, boardStyleColor)

            setNavColor(transparentColor)
         } catch (err) {
            console.log('failed to change nav color', err)
         }
      }
   }

   async function onStarredClick() {
      const boardCopy = { ...currBoard }
      boardCopy.isStarred = true
      try {
         await updateBoard(boardCopy)
      } catch (err) {
         console.log('failed to starred board', err)
      }
   }
   console.log('board from header', board)
   return (
      <header className='board-header' style={{ backgroundColor: navColor }}>
         <div className='left'>
            <h1 className='board-title'>{board?.title}</h1>

            {board.isStarred ? (
               <IconButton
                  Icon={AiFillStar}
                  text=''
                  onClick={() => console.log('Clicked!')}
               />
            ) : (
               <IconButton
                  Icon={AiOutlineStar}
                  text=''
                  onClick={() => onStarredClick()}
               />
            )}
         </div>

         <div className='right'>
            <IconButton
               Icon={BsFilter}
               text='Filter'
               onClick={(ev) => onToggleModal('filter', ev)}
            />
            <div className='board-header-members-container'>
               {board.members.map((member) => {
                  return <img src={member.imgUrl} />
               })}
            </div>
            <IconButton
               Icon={IoPersonAddOutline}
               text='Share'
               className='share-board-btn '
               onClick={(ev) => onToggleModal('addMember', ev)}
            />

            <IconButton
               Icon={IoEllipsisHorizontalSharp}
               text=''
               onClick={(ev) => onToggleModal('activity', ev)}
            />
         </div>

         {modalType && (
            <DynamicActionModal
               cmpType={modalType}
               modalTitle={modalTitles[modalType]}
               event={eventRef.current}
               boardId={params.boardId}
               onCloseModal={onCloseModal}
            />
         )}
      </header>
   )
}

const IconButton = ({
   Icon,
   text = '',
   style = {},
   className = 'svg-btn',
   ...props
}) => {
   const defaultStyle = {}
   IconButton.propTypes = {
      Icon: PropTypes.elementType.isRequired,
      text: PropTypes.string,
      style: PropTypes.object,
   }
   return (
      <button style={defaultStyle} className={className} {...props}>
         <Icon style={{ marginRight: text ? '8px' : '0' }} />
         {text}
      </button>
   )
}
