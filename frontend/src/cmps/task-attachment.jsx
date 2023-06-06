import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { boardService } from '../services/board.service'

// icon
import { ImAttachment } from 'react-icons/im'
import { MdSubtitles } from 'react-icons/md'

export function AttachImage({ task }) {
     return (
          <div className='img-attachment-container'>
               {task.imgAttachment && <p>Attachment</p>}
               {task.imgAttachment ? (
                    <div className='attachment-container'>
                         <img
                              src={task.imgAttachment}
                              alt='Attachment'
                              className='img-attachment'
                         />
                         <h3><span> <MdSubtitles className='cover-icon'/> </span> Remove cover</h3>
                    </div>
               ) : null}
          </div>
     )
}
