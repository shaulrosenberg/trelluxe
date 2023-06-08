import { useParams } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'

import { darken, transparentize } from 'polished'
import { boardService } from '../services/board.service'
import { updateBoard } from '../store/board.actions'
import { DynamicActionModal } from './dynamic-modal/dynamic-action-modal'

//icons
import { BsFilter } from 'react-icons/bs'
import {IoStarOutline, IoPersonAddOutline, IoEllipsisHorizontalSharp,} from 'react-icons/io5'
import { AiFillStar, AiOutlineStar } from 'react-icons/ai'
import PropTypes, { func } from 'prop-types'

export function BoardHeader({ board}) {
     const params = useParams()
     const [currTask, setCurrTask] = useState(null)
     const [navColor, setNavColor] = useState(null)
     
     const [currBoard, setCurrboard] = useState(null)
     const [modalType, setModalType] = useState(null)

     const eventRef = useRef()

     function onToggleModal(ev) {
          eventRef.current = ev
          setModalType('filter')
      }


      function onCloseModal() {
          setModalType(null)
      }

     useEffect( () => {
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
                    const transparentColor = transparentize(
                         0.7,
                         boardStyleColor
                    )

                    setNavColor(transparentColor)
               } catch (err) {
                    console.log('failed to change nav color', err)
               }
          } else {
               setNavColor('#026AA7')
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

     return (
          <header
               className='board-header'
               style={{ backgroundColor: navColor }}
          >
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
                         onClick={(ev) => onToggleModal(ev)}
                    />
                    <IconButton
                         Icon={IoPersonAddOutline}
                         text='Share'
                         className='share-board-btn '
                         onClick={() => console.log(currTask)}
                    />
                    <IconButton
                         Icon={IoEllipsisHorizontalSharp}
                         text=''
                         onClick={() => console.log('Clicked!')}
                    />
               </div>

               {modalType && <DynamicActionModal
                        cmpType={modalType}
                        event={eventRef.current}
                        boardId={params.boardId}
                        onCloseModal={onCloseModal}
                    />}
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
