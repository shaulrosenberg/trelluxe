import { uploadService } from '../../services/upload.service'
import { boardService } from '../../services/board.service'
import { updateTask } from '../../store/board.actions'

import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

export function AttachContent({task, onCloseModal}) {
     const params = useParams()
     const [currTask, setCurrTask] = useState(null)
     // const attachment = task?.attachment ?? []

     async function saveImg(ev) {
          try {
               // const imgUrl = await uploadService.uploadImg(ev)
               const data = await uploadService.uploadImg(ev)
               console.log('data', data)
               if (currTask.attachments){
                    currTask.attachments.push(data)
               }

               await updateTask(currTask, params.boardId, params.groupId)
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
          <section>
               <p>Attach File</p>
               <input type='file' onChange={saveImg} />
               <p>Attach Pic</p>
               <p>Attach Whatever</p>
          </section>
     )
}
