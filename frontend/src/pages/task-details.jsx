import { useEffect } from 'react'
import { useParams } from 'react-router'
import { useNavigate } from 'react-router-dom'
import { boardService } from '../services/board.service'
import { useState } from 'react'

// icons
import { IoIosCard } from 'react-icons/io'
import { TfiAlignLeft } from 'react-icons/tfi'
import { TfiMenuAlt } from 'react-icons/tfi'
import { AiOutlineClose } from 'react-icons/ai'

// dynamic cmps
import { DescEdit } from '../cmps/task-desc'

export function TaskDetails() {
     const { taskId } = useParams()
     const [task, setTask] = useState(null)
     const navigate = useNavigate()

     const [isDescEdit, setIsDescEdit] = useState(false)

     useEffect(() => {
          boardService
               .findTaskById(taskId)
               .then((currTask) => setTask(currTask))
     }, [taskId, isDescEdit])

     function onTaskExit() {
          navigate(-1)
     }
     console.log('task:', task); // Check the value of task
     return (
          <section className='section-task-deatils'>
               <div className='div-task-deatils'>
                    {/* <button className='btn-exit-task'>X</button> */}
                    <AiOutlineClose
                         className='btn-exit-task'
                         onClick={() => onTaskExit()}
                    />

                    <IoIosCard className='icon-title' />
                    <div className='div-task-title'>
                         {task ? <h2>{task.title}</h2> : 'Loading'}
                         <p>in list group 1</p>
                    </div>

                    <TfiAlignLeft className='icon-desc' />
                    <div className='div-desc'>
                         <p>Description</p>
                         {isDescEdit ? (
                              <DescEdit task={task} setIsDescEdit={setIsDescEdit} />
                         ) : (
                              <a className='a-desc' onClick={() => setIsDescEdit(true)}>
                                   {task !== null && task.desc}
                                   {!task.desc && 'Add a more detailed description...'}
                              </a>
                         )}
                    </div>

                    <TfiMenuAlt className='icon-activitiy' />
                    <div className='a'></div>
                    <h5 className='task-details-user'>User</h5>
                    <div className='div-activity'>
                         <p>Activity</p>
                         <input
                              className='input-task-activity'
                              placeholder='Write a comment...'
                         ></input>
                    </div>

               </div>
          </section>
     )
}
