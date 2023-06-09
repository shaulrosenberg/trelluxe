import { uploadService } from '../../services/upload.service'
import { boardService } from '../../services/board.service'
import { updateTask } from '../../store/board.actions'

import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

export function AttachContent({ onCloseModal }) {
     const params = useParams()
     const [currTask, setCurrTask] = useState(null)

     async function saveImg(ev) {
          try {
               const data = await uploadService.uploadImg(ev)
               let updatedTask = { ...currTask }
               if (updatedTask.attachments) {
                    updatedTask.attachments = [...updatedTask.attachments, data]
               } else {
                    updatedTask.attachments = [data]
               }
               await updateTask(updatedTask, params.boardId, params.groupId)
               onCloseModal()
          } catch (err) {
               console.log('err saving img', err)
          }
     }

     useEffect(() => {
          boardService.findTaskById(params.taskId).then((task) => {
               setCurrTask(task)
          })
     }, [])

     return (
          <section className='attachment-add-container'>
               <label className='item-attach-img-style' htmlFor='fileInput'>
                    Choose File
                    <input
                         id='fileInput'
                         type='file'
                         onChange={saveImg}
                         style={{ display: 'none' }}
                    />
               </label>
               {/* <input type='file' onChange={saveImg} /> */}
               <p className='item-attach-img-style'>Attach Pic</p>
               <p className='item-attach-img-style'>Attach Whatever</p>
          </section>
     )
}
