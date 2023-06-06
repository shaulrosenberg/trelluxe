import { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import { boardService } from '../services/board.service'

// icon
import { ImAttachment } from 'react-icons/im'
import { MdSubtitles } from 'react-icons/md'
import { updateTask } from '../store/board.actions'

// dynamic modal
import { DynamicActionModal } from './dynamic-modal/dynamic-action-modal'


export function AttachImage({ task }) {
     const params = useParams()
     const [modalType, setModalType] = useState(null)
     const eventRef = useRef(null)

     function onDeleteAttachment() {
          const taskClone = { ...task }
          console.log('taskClone', taskClone)
          taskClone.attachments = ''
          updateTask(taskClone, params.boardId, params.groupId)
     }

     function onToggleModal(type = null, ev = null) {
          eventRef.current = ev
          setModalType(type)
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
                                          <h3>
                                               {imgObject.created_at.substring(
                                                    0,
                                                    10
                                               )}
                                          </h3>
                                          <h3 className='attachment-underline'>
                                               Comment
                                          </h3>
                                          <h3
                                               className='attachment-underline'
                                               onClick={() =>
                                                    onDeleteAttachment()
                                               }
                                          >
                                               Delete
                                          </h3>
                                          <h3 onClick={(ev) => onToggleModal('editAttach', ev)} className='attachment-underline'>
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
                                          <h3>
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
