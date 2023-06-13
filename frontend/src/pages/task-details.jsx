import { useEffect } from 'react'
import { useParams } from 'react-router'
import { useNavigate } from 'react-router-dom'
import { boardService } from '../services/board.service'
import { useState } from 'react'
import { utilService } from '../services/util.service'

// icons
import { MdSubtitles } from 'react-icons/md'
import { BsCardHeading } from 'react-icons/bs'
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
import { TaskChecklists } from '../cmps/task-checklists'
import { ActivityList } from '../cmps/activity-list'
import { Loader } from '../cmps/loader'
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
   const taskActivities = boardService.getTaskActivities(board, taskId)

   useEffect(() => {
      loadTask()
   }, [board])

   const loadTask = async () => {
      try {
         getGroupTitle()
         const currTask = await boardService.findTaskById(taskId)
         setTask(currTask)


      } catch (err) {
         console.log('cannot load task in task-details', err)
      }
   }

   function onTaskExit() {
      navigate(`/board/${boardId}`)
   }

   function getGroupTitle() {
      const groupTitle = boardService.findGroupById(params.groupId, board)
      setGTitle(groupTitle)
   }

   function checkStyle() {
      let coverStyle = null

      if (task.style.backgroundImage) {
         coverStyle = { backgroundImage: `url(${task.style.backgroundImage})` }
      } else if (task.style.backgroundColor) {
         coverStyle = { backgroundColor: task.style.backgroundColor }
      }
      return coverStyle
   }
   if (!task) return <></>
   return (
      <section className='section-task-deatils'>
         <div className='div-task-deatils'>
            <div className='btn-exit-task-container'>
               <AiOutlineClose
                  className='btn-exit-task'
                  onClick={() => onTaskExit()}
               />
            </div>
            {task.style && (
               <div className='task-cover-container' style={checkStyle()}></div>
            )}

            <BsCardHeading
               style={{ color: '#43546F' }}
               className='icon-title'
            />

            <div className='div-task-title'>
               {<h2>{task.title}</h2>}
               <p>
                  in list{' '}
                  <span className='group-title-task-details'>{gTitle}</span>
               </p>
            </div>

            {/* {task.memberIds || task.labelsIds && */}
            <div className='task-details-overview-container'>
               <TaskOverview task={task} boardId={boardId} groupId={groupId} />
            </div>
            {/* }  */}

            <div className='div-task-controls'>
               <TaskControls task={task} boardId={boardId} groupId={groupId} />
            </div>

            <TfiAlignLeft className='icon-desc' />
            <div className='div-desc'>
               <p>Description</p>
               {isDescEdit ? (
                  <DescEdit task={task} setIsDescEdit={setIsDescEdit} />
               ) : (
                  <a
                     className='a-desc'
                     onClick={() => setIsDescEdit(true)}
                     style={{
                        backgroundColor: task.description
                           ? '#F1F2F4'
                           : '#EDEDEF',
                     }}
                  >
                     {!task.description && 'Add a more detailed description...'}
                     {task !== null && task.description}
                  </a>
               )}
            </div>

            {task.checklists && (
               <TaskChecklists
                  task={task}
                  boardId={boardId}
                  groupId={groupId}
               />
            )}

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
               {taskActivities && (
                  <ActivityList activities={taskActivities} />
                  // <section className="activity-list">
                  //    {taskActivities.map((activity) => (
                  //       <ActivityPreview key={activity.id} activity={activity} />
                  //    ))}                   </section>
               )}
            </div>
         </div>

         {/* Overlay element */}
         <div className='overlay' onClick={() => onTaskExit()} />
      </section>
   )
}