import { uploadService } from '../../services/upload.service'
import { boardService } from '../../services/board.service'
import { updateTask } from '../../store/board.actions'

import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

export function AttachContent(props) {
     const params = useParams()
     const [currTask, setCurrTask] = useState(null)
     

     async function saveImg(ev) {
          try {
               const imgUrl = await uploadService.uploadImg(ev)
               currTask.imgAttachment = imgUrl
               await updateTask(currTask, params.boardId, params.groupId)
               props.onCloseModal()
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
