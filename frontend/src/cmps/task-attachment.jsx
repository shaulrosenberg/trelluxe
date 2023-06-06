import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { boardService } from '../services/board.service'

// icon
import { ImAttachment } from 'react-icons/im'
import { MdSubtitles } from 'react-icons/md'
import { updateTask } from '../store/board.actions'

export function AttachImage({ task }) {

     const params = useParams()

     function onDeleteAttachment(){
          const taskClone = {...task}
          console.log('taskClone', taskClone)
          taskClone.imgAttachment = ''
          updateTask(taskClone, params.boardId, params.groupId)
     }

     return (
          <div className='img-attachment-container'>
               {task.imgAttachment && <p>Attachment</p>}
               {task.imgAttachment ? (
                    <div className='attachment-container'>
                         <div>
                              <img
                                   src={task.imgAttachment}
                                   alt='Attachment'
                                   className='img-attachment'
                              />
                         </div>
                         <div className='img-attach-actions'>
                              <div>
                                   <h3>Comment</h3>
                                   <h3 onClick={() => onDeleteAttachment()}>Delete</h3>
                                   <h3>Edit</h3>
                              </div>
                              <div>
                                   <h3>
                                        <span>
                                             {' '}
                                             <MdSubtitles className='cover-icon' />{' '}
                                        </span>{' '}
                                        Make cover
                                   </h3>
                              </div>
                         </div>
                    </div>
               ) : null}
          </div>
     )
}
