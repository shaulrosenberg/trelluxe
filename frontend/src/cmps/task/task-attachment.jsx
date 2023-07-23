import { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import { updateBoard, updateTask} from '../../store/board.actions'
// icon
import { ImAttachment } from 'react-icons/im'
import { MdSubtitles } from 'react-icons/md'

// dynamic modal
import { DynamicActionModal } from '../dynamic-modal/dynamic-action-modal'
import { useSelector } from 'react-redux'

export function AttachImage({ task }) {
   const params = useParams()
   const [modalType, setModalType] = useState(null)
   const eventRef = useRef(null)
   const board = useSelector(
      (storeState) => storeState.boardModule.selectedBoard
   )

   async function onDeleteAttachment(index) {
      const taskClone = { ...task }
      taskClone.attachments.splice(index, 1)
      await updateTask(taskClone, params.boardId, params.groupId)
   }

   function onToggleModal(type = null, ev = null) {
      eventRef.current = ev
      setModalType(type)
   }

      async function onCoverClick(imgUrl) {
         console.log('imgUrl', imgUrl)
         // console.log('board', board)
         const currGroup = board.groups.find((group) => group.id === params.groupId)
         const currTask = currGroup.tasks.find((task) => task.id === params.taskId)
         // console.log('currGroup', currGroup)
         // console.log('currTask', currTask)

         const newTask = {
            ...currTask,
            style: {backgroundImage: imgUrl}
         }

         console.log('newTask', newTask)
         await updateTask(newTask, params.boardId, params.groupId)
      }

   return (
      <div className='img-attachment-container'>
         {console.log('loop of attach')}
         {task.attachments && <p>Attachments</p>}
         {task.attachments
            ? task.attachments.map((imgObject, index) => (
                 <div key={index} className='attachment-container'>
                    <div>
                       <img
                          src={imgObject.url}
                          alt='Attachment'
                          className='img-attachment'
                       />
                    </div>
                    <div className='img-attach-actions'>
                       <div>
                          <h3 className='attachment-name attachment-bold'>
                             {imgObject.original_filename +
                                '.' +
                                imgObject.format}
                          </h3>
                       </div>
                       <div>
                          <h3>{imgObject.created_at}</h3>
                          <h3 className='attachment-underline'>Comment</h3>
                          <h3
                             className='attachment-underline'
                             onClick={() => onDeleteAttachment(index)}
                          >
                             Delete
                          </h3>
                          <h3
                             onClick={(ev) => onToggleModal('editAttach', ev)}
                             className='attachment-underline'
                          >
                             Edit
                          </h3>
                          {modalType && (
                             <DynamicActionModal
                                cmpType='editAttach'
                                modalTitle='edit'
                                onCloseModal={onToggleModal}
                                event={eventRef.current}
                                isDetails={true}
                             />
                          )}
                       </div>
                       <div>
                          <h3 onClick={() => onCoverClick(imgObject.url)}>
                             <span>
                                <MdSubtitles className='cover-icon' />
                             </span>
                             Make cover
                          </h3>
                       </div>
                    </div>
                 </div>
              ))
            : null}
      </div>
   )
}
