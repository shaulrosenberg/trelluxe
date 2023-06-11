import { FiPlus } from 'react-icons/fi'
import { boardService } from '../services/board.service'
import { IoIosArrowDown } from 'react-icons/io'
import { useSelector } from 'react-redux'
import { DynamicActionModal } from './dynamic-modal/dynamic-action-modal'
import { useEffect, useRef, useState } from 'react'
import { utilService } from '../services/util.service'
import { updateTask } from '../store/board.actions'
export function TaskOverview({ task, groupId, boardId }) {
   const [modalType, setModalType] = useState(null)
   const eventRef = useRef()

   const board = useSelector(
      (storeState) => storeState.boardModule.selectedBoard
   )

   const taskMembers = boardService.getTaskMembers(
      board.members,
      task.memberIds
   )

   const taskLabels = boardService.getTaskLabels(board.labels, task.labelIds)
   const dueDateInfo = task.dueDate ? boardService.getDueDateInfo(task) : null

   function onToggleModal(ev, type) {
      eventRef.current = ev
      switch (type) {
         case 'members':
            setModalType('members')
            break
         case 'labels':
            setModalType('labels')
            break
         case 'dates':
            setModalType('dates')
            break

         default:
            break
      }
   }

   const modalTitles = {
      dates: 'Dates',
   }

   function onCloseModal() {
      setModalType(null)
   }

   return (
      <section className='task-overview'>
         {/* TODO: finish when user support is implemented */}
         {/* <button className='subscribe-btn'>
                <div className="svg-icon"><AiOutlineEye /></div>
                <div className="btn-txt">Watch</div>
            </button> */}

         {/* Task members */}
         {taskMembers && (
            <div className='task-members-container'>
               <h4>Members</h4>
               <ul className='clean-list task-members-list'>
                  {taskMembers.map((taskMember) => (

                     <img key={taskMember._id} className='task-member-icon' src={taskMember.imgUrl} alt='' />

                  ))}

                  <li key='' className=''>
                     <button
                        className='add-member-btn'
                        onClick={(ev) => onToggleModal(ev, 'members')}
                     >
                        <FiPlus />
                     </button>
                  </li>
               </ul>
            </div>
         )}

         {/* Task labels */}
         {taskLabels && (
            <div className='task-labels-container'>
               <h4>Labels</h4>
               <ul className='clean-list task-labels-list'>
                  {taskLabels.map((taskLabel) => (
                     <li
                        className='task-label-button'
                        onClick={(ev) => onToggleModal(ev, 'labels')}
                        key={taskLabel.id}
                        style={{ backgroundColor: taskLabel.color }}
                     >
                        {taskLabel.title}
                     </li>
                  ))}
               </ul>
            </div>
         )}

         {task.dueDate && (
            <div className='task-due-date-wrapper'>
               <h4>Due date</h4>
               <div className='task-due-date-container'>
                  <input
                     onChange={async (ev) => {
                        ev.preventDefault()
                        await updateTask(
                           { ...task, isDone: !task.isDone },
                           boardId,
                           groupId
                        )
                     }}
                     checked={task.isDone}
                     className='task-due-date-checkbox'
                     type='checkbox'
                  />
                  <div className='due-date-display'>
                     <span className='date-display'>
                        {boardService.getDueDateTimeFormat(task.dueDate)}
                     </span>
                     <span className={`due-date-status ${dueDateInfo.class}`}>
                        {dueDateInfo.status}
                     </span>
                     <IoIosArrowDown
                        onClick={(ev) => onToggleModal(ev, 'dates')}
                     />
                  </div>
               </div>
            </div>
         )}
         {/* Dynamic modal */}
         {modalType && (
            <DynamicActionModal
               cmpType={modalType}
               modalTitle={modalTitles[modalType]}
               event={eventRef.current}
               task={task}
               groupId={groupId}
               boardId={boardId}
               onCloseModal={onCloseModal}
            />
         )}
      </section>
   )
}
