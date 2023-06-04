import { uploadService } from '../../services/upload.service'
import { boardService } from '../../services/board.service'
import { updateTask } from '../../store/board.actions'

import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

export function AttachContent() {
     const params = useParams()
     const [currTask, setCurrTask] = useState(null)

     // get the curr task by the url task id
     // get the board id
     // get the group id

     async function saveImg(ev) {
          try {
               const imgUrl = await uploadService.uploadImg(ev)
               console.log(imgUrl)
               console.log('currTask', currTask)
               currTask.imgAttachment = imgUrl
               await updateTask(currTask, params.boardId, params.groupId)
          } catch (err) {
               console.log('err saving img', err)
          }
     }

     useEffect(() => {
          //   setTaskId(params.taskId)
          //   setBoardId(params.boardId)
          console.log('cool params', params)
          boardService.findTaskById(params.taskId).then((task) => {
               setCurrTask(task)
          })
     }, [])

     //  async function s() {
     //       console.log(taskId)
     //       const cTask = await boardService.findTaskById(taskId)
     //       console.log('cTask', cTask)
     //       setCurrTask(cTask)
     //  }

     return (
          <section>
               <p>Attach File</p>
               <input type='file' onChange={saveImg} />
               <p>Attach Pic</p>
               <p>Attach Whatever</p>
          </section>
     )
}
