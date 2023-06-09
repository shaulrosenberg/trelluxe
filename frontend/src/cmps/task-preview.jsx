import { GrTextAlignFull, GrAttachment } from 'react-icons/gr'
import { SlBubble } from 'react-icons/sl'
import { IoMdCheckboxOutline } from 'react-icons/io'

import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { boardService } from '../services/board.service'

export function TaskPreview(props) {
     const board = useSelector(
          (storeState) => storeState.boardModule.selectedBoard
     )
     const { task } = props
     const taskMembers = boardService.getTaskMembers(
          board.members,
          task.memberIds
     )
     const [isLabelClick, setIsLabelClick] = useState(false)

     function getTodosRatio() {
          let todos = 0
          let done = 0
          let checklists = task.checklists

          for (let checklist of checklists) {
               todos += checklist.todos.length
               for (let todo of checklist.todos) {
                    if (todo.isDone) done++
               }
          }
          const ans = {
               txt: `${done}/${todos}`,
               status: done / todos === 1 ? 'check-list-done' : '',
          }
          return ans
     }

     function onLabelClick(ev) {
          ev.stopPropagation()
          console.log('label click')
          setIsLabelClick(!isLabelClick)
     }

     const hasBackgroundImage = task.style?.backgroundImage
     const hasBackgroundColor = task.style?.backgroundColor
     const isFullyCover = task.style?.isFullyCover ? 'fullCover' : ''

     return !isFullyCover ? (
          <div className='task-preview-container'>
               {task.style && (
                    <section
                         className={'task-preview-cover'}
                         style={{
                              backgroundColor: hasBackgroundImage
                                   ? null
                                   : hasBackgroundColor,
                         }}
                    >
                         {hasBackgroundImage && (
                              <img
                                   src={task.style.backgroundImage}
                                   alt='Task Cover'
                              />
                         )}
                    </section>
               )}

               {!task.style && task.imgAttachment && (
                    <section className='task-preview-cover'>
                         <img src={task.imgAttachment} alt='Task Cover' />
                    </section>
               )}

               {/* labels rendering */}
               <section className='task-preview-body'>
                    <div
                         className='task-preview-labels'
                         onClick={(ev) => onLabelClick(ev)}
                    >
                         {!isLabelClick ? (
                              task.labelIds &&
                              task.labelIds.map((labelId) => {
                                   const label = boardService.findLabelStyleById(labelId, board)
                                   return (
                                        <div
                                             key={labelId}
                                             className='label'
                                             style={{
                                                  backgroundColor: label?.color,
                                             }}
                                        ></div>
                                   )
                              })
                         ) : (
                              task.labelIds.map((labelId) => {
                                   const label = boardService.findLabelStyleById(labelId, board)

                                   return (
                                        <div className='labels-names-container'>
                                             <div
                                                  key={labelId}
                                                  className='labels-with-names'
                                                  style={{
                                                       backgroundColor: label?.color,
                                                  }}>
                                                  <p className='label-text'>
                                                       {label.title}
                                                  </p>
                                             </div>
                                        </div>
                                   )
                              })
                         )}
                    </div>

                    <div className='title-container'>
                         <p>{task.title}</p>
                    </div>

                    <div className='task-preview-badges'>
                         {/* due date badge */}
                         {/* TODO: when shaul finishes? */}
                         {/* description badge */}
                         {task.description?.length > 0 && (
                              <div
                                   title='This task has a description'
                                   className='badge-btn description'
                              >
                                   <div className='icon'>
                                        <GrTextAlignFull />
                                   </div>
                              </div>
                         )}

                         {/* comments badge */}
                         {task.comments?.length > 0 && (
                              <div title='comments' className='badge-btn'>
                                   <div className='icon'>
                                        <SlBubble />
                                   </div>
                                   <div className='btn-txt'>
                                        {task.comments.length}
                                   </div>
                              </div>
                         )}

                         {/* attachments badge */}
                         {task.attachments?.length > 0 && (
                              <div title='Attachments' className='badge-btn'>
                                   <div className='icon'>
                                        <GrAttachment />
                                   </div>
                                   <div className='btn-txt'>
                                        {task.attachments.length}
                                   </div>
                              </div>
                         )}

                         {/* check list badge */}
                         {task.checklists?.length > 0 && (
                              <div
                                   className={`badge-btn ${getTodosRatio().status
                                        }`}
                              >
                                   <div className='icon'>
                                        <IoMdCheckboxOutline />
                                   </div>
                                   <div className='btn-txt'>
                                        {getTodosRatio().txt}
                                   </div>
                              </div>
                         )}

                         {/* members badge */}
                         {taskMembers && (
                              <ul className='task-member-badges clean-list'>
                                   {taskMembers.map((taskMember, index) => (
                                        <li key={index} className='task-member-badge'>
                                             {' '}
                                             <img
                                                  key={taskMember.id}
                                                  src={taskMember.imgUrl}
                                                  alt=''
                                             />
                                        </li>
                                   ))}
                              </ul>
                         )}
                    </div>
               </section>
               <div className='quick-edit'></div>
          </div>
     ) : (
          <div
               className='task-preview-container-full'
               style={{
                    backgroundColor: hasBackgroundImage
                         ? null
                         : hasBackgroundColor,
               }}
          >
               <div className='title-container-full'>
                    <p>{task.title}</p>
               </div>
          </div>
     )
}
