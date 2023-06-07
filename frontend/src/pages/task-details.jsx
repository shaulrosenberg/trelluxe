import { useEffect } from 'react'
import { useParams } from 'react-router'
import { useNavigate } from 'react-router-dom'
import { boardService } from '../services/board.service'
import { useState } from 'react'

// icons
import { MdSubtitles } from 'react-icons/md'
import { TfiAlignLeft } from 'react-icons/tfi'
import { TfiMenuAlt } from 'react-icons/tfi'
import { AiOutlineClose } from 'react-icons/ai'
import { ImAttachment } from 'react-icons/im'

// dynamic cmps
import { TaskControls } from '../cmps/task-controls'
import { DescEdit } from '../cmps/task-desc'
import { AttachImage } from '../cmps/task-attachment'
import { useSelector } from 'react-redux'
import { TaskOverview } from '../cmps/task-overview'

export function TaskDetails() {
     const { taskId, groupId, boardId } = useParams()
     const [task, setTask] = useState(null)
     const [isDescEdit, setIsDescEdit] = useState(false)
     const [gTitle, setGTitle] = useState('')
     const board = useSelector(
          (storeState) => storeState.boardModule.selectedBoard
     )
     const navigate = useNavigate()
     const params = useParams()

     useEffect(() => {
          getGroupTitle()
          boardService
               .findTaskById(taskId)
               .then((currTask) => setTask(currTask))
     }, [board])

     function onTaskExit() {
          navigate(`/board/${boardId}`)
     }

     function getGroupTitle() {
          const groupTitle = boardService.findGroupById(params.groupId, board)
          setGTitle(groupTitle)
     }

     function checkStyle() {
          let coverStyle = null
          if (task.style.backgroundColor) {
               coverStyle = task.style.backgroundColor
          } else if (task.style.backgroundImage) {
               coverStyle = task.style.backgroundImage
          } else return
          return coverStyle
     }

     console.log('task:', task) // Check the value of task
     if (!task) return <div className='loading-bar'>Loading...</div>
     return (
          <section className='section-task-deatils'>
               <div className='div-task-deatils'>
                    <AiOutlineClose
                         className='btn-exit-task'
                         onClick={() => onTaskExit()}
                    />

                    {task && task.style && (
                         <div
                              className='task-cover-container'
                              style={{
                                   // backgroundColor: task.style.backgroundColor,
                                   backgroundColor: checkStyle()
                              }}
                         ></div>
                    )}

                    <MdSubtitles className='icon-title' />
                    <div className='div-task-title'>
                         {task ? <h2>{task.title}</h2> : 'Loading'}
                         <p>
                              in list{' '}
                              <span className='group-title-task-details'>
                                   {gTitle}
                              </span>
                         </p>
                    </div>
                    <div className="task-details-overview-container">
                         <TaskOverview task={task}
                              boardId={boardId}
                              groupId={groupId} />
                    </div>
                    <div className='div-task-controls'>
                         <TaskControls
                              task={task}
                              boardId={boardId}
                              groupId={groupId}
                         />
                    </div>
                    <TfiAlignLeft className='icon-desc' />
                    <div className='div-desc'>
                         <p>Description</p>
                         {isDescEdit ? (
                              <DescEdit
                                   task={task}
                                   setIsDescEdit={setIsDescEdit}
                              />
                         ) : (
                              <a
                                   className='a-desc'
                                   onClick={() => setIsDescEdit(true)}
                              >
                                   {!task.description &&
                                        'Add a more detailed description...'}
                                   {task !== null && task.description}
                              </a>
                         )}
                    </div>
                    {/* Need to render checklist here */}

                    {/* need to render Attachment cmp here */}
                    {task.attachments && (
                         <>
                              <ImAttachment className='icon-attachment' />
                              <div className='div-img'>
                                   <AttachImage task={task} />
                              </div>
                         </>
                    )}

                    <TfiMenuAlt className='icon-activitiy' />
                    <div className='div-activity'>
                         <p>Activity</p>
                         <input
                              className='input-task-activity'
                              placeholder='Write a comment...'
                         ></input>
                    </div>
               </div>

               {/* Overlay element */}
               <div className='overlay' onClick={() => onTaskExit()} />
          </section>
     )
}
