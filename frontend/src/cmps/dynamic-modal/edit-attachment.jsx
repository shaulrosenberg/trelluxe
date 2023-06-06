import { useParams } from 'react-router-dom'
import { boardService } from '../../services/board.service'
import { useEffect, useState } from 'react'
import { updateTask } from '../../store/board.actions'

export function EditAttachment() {
     const params = useParams()
     const [cloneTask, setCloneTask] = useState({})
     const [inputVal, setInputVal] = useState('')
     const [imageName, setImageName] = useState('')
     function currTask() {
          boardService.findTaskById(params.taskId).then((task) => {
               setCloneTask({ ...task })
          })
     }

     useEffect(() => {
          console.log('from edit', params)
          console.log(cloneTask)
          currTask()
     }, [])

     async function onUpdateTitle() {
          const imgIdx = cloneTask.imgAttachment.findIndex(
               (imgObj) =>
                    imgObj.original_filename ===
                    cloneTask.imgAttachment.find((img) => img.original_filename)
          )

          cloneTask.imgAttachment[0].original_filename = inputVal
          await updateTask(cloneTask, params.boardId, params.groupId)
     }

     return (
          <section className='edit-attachment-container'>
               <h5> Link name</h5>
               <div className='edit-attachment-area'>
                    <input
                         type='text'
                         name=''
                         id=''
                         placeholder='Enter name name'
                         onChange={(ev) => setInputVal(ev.target.value)}
                    />
                    <button onClick={() => onUpdateTitle()}>Update</button>
               </div>
          </section>
     )
}
