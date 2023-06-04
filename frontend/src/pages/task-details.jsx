import { useEffect, useRef } from 'react'
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

export function TaskDetails() {
     const { taskId, groupId, boardId } = useParams()
     const [task, setTask] = useState(null)
     const navigate = useNavigate()

     const [isDescEdit, setIsDescEdit] = useState(false)

     useEffect(() => {
          boardService
               .findTaskById(taskId)
               .then((currTask) => setTask(currTask))
     }, [isDescEdit])

     function onTaskExit() {
          navigate(`/board/${boardId}`)
     }

     console.log('task:', task) // Check the value of task
     if (!task) return <div>Loading...</div>
     return (
          <section className='section-task-deatils'>
               <div className='div-task-deatils'>
                    <AiOutlineClose
                         className='btn-exit-task'
                         onClick={() => onTaskExit()}
                    />

                    <MdSubtitles className='icon-title' />
                    <div className='div-task-title'>
                         {task ? <h2>{task.title}</h2> : 'Loading'}
                         <p>in list group 1</p>
                    </div>

                    <TfiAlignLeft className='icon-desc' />
                    <div className='div-task-controls'>
                         <TaskControls task={task} boardId={boardId} groupId={groupId} />
                    </div>
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
                                   {!task.desc &&
                                        'Add a more detailed description...'}
                                   {task !== null && task.desc}
                              </a>
                         )}
                    </div>

                    {/* need to render Attachment cmp here */}
                    
                    
                    <TfiMenuAlt className='icon-activitiy' />
                    <h5 className='task-details-user'>User</h5>
                    <div className='a'></div>
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
