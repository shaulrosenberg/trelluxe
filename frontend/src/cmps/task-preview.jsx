import { GrTextAlignFull, GrAttachment } from 'react-icons/gr'
import { SlBubble } from 'react-icons/sl'
import { IoMdCheckboxOutline } from 'react-icons/io'
import { IoTimeOutline } from 'react-icons/io5';
import { GrCheckboxSelected } from 'react-icons/gr';
import { IoCheckboxOutline } from "react-icons/io5";


import { MdCheckBoxOutlineBlank } from "react-icons/md";

import { useEffect, useState } from 'react'
import { boardService } from '../services/board.service'
import { updateTask } from '../store/board.actions';
import { toggleLabels } from '../store/board.actions'
import { useSelector } from 'react-redux';
import { utilService } from '../services/util.service';

export function TaskPreview(props) {

     const { task, board, boardId, groupId } = props
     const taskLabels = boardService.getTaskLabels(board.labels, task.labelIds)

     const taskMembers = boardService.getTaskMembers(
          board.members,
          task.memberIds
     )
     const dueDateInfo = task.dueDate ? boardService.getDueDateInfo(task) : null
     const labelExpanedStatus = useSelector(
          (storeState) => storeState.boardModule.isLabelExpand
     )

     const [isDateBadgeHovered, setIsDateBadgeHovered] = useState(false)
     function toggleIsDone(ev) {
          ev.stopPropagation()
          updateTask({ ...task, isDone: !task.isDone }, boardId, groupId)
     }

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
          toggleLabels()



          // setIsLabelClick(!isLabelClick)


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

                         {!labelExpanedStatus ? (
                              taskLabels &&
                              taskLabels.map(label =>
                                   <div className="label" key={label.id} style={{ backgroundColor: label.color }}></div>
                              )
                         ) : (
                              taskLabels &&
                              taskLabels.map(label =>
                                   <div className="labels-names-container">
                                        <div className="labels-with-names"
                                             key={label.id} style={{ backgroundColor: label.color, color: utilService.getContrast(label.color) }}
                                        >
                                             <p className='label-text'>{label.title}</p>
                                        </div>

                                   </div>
                              )
                         )
                         }

                    </div>

                    <div className='title-container'>
                         <p>{task.title}</p>
                    </div>

                    <div className='task-preview-badges'>
                         {/* due date badge */}
                         {task.dueDate &&
                              <>
                                   <div title={dueDateInfo.title} className={`due-date-badge ${dueDateInfo.class}`} onMouseEnter={() => setIsDateBadgeHovered(true)}
                                        onMouseLeave={() => setIsDateBadgeHovered(false)}>

                                        <span className="due-icon">
                                             {!isDateBadgeHovered ? <IoTimeOutline /> : task.isDone ? <IoCheckboxOutline className="date-checkbox-done" onClick={(ev) => toggleIsDone(ev)} /> : <MdCheckBoxOutlineBlank onClick={(ev) => toggleIsDone(ev)} />}

                                        </span>
                                        <span className="due-date-txt">{new Date(task.dueDate).toLocaleDateString('en-US', {
                                             month: "short",
                                             day: "numeric",
                                        })}</span>
                                   </div>
                              </>}
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

                                             <img className='task-member-badge'
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
