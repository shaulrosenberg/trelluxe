import { useParams } from 'react-router-dom'
import { boardService } from '../../services/board.service'
import { useEffect, useState } from 'react'
import { updateTask } from '../../store/board.actions'

export function EditAttachment() {
     const params = useParams()
     const [cloneTask, setCloneTask] = useState({})
     const [inputVal, setInputVal] = useState('')
     const [imageName, setImageName] = useState('')

     useEffect(() => {
          async function fetchTask() {
               const task = await boardService.findTaskById(params.taskId)
               setCloneTask({ ...task })
          }

          fetchTask()
     }, [params.taskId])

     async function onUpdateTitle() {
          if (!cloneTask.imgAttachment || cloneTask.imgAttachment.length === 0) {
               return
          }

          const updatedCloneTask = {
               ...cloneTask,
               imgAttachment: cloneTask.imgAttachment.map((img, idx) =>
                    idx === 0 ? { ...img, original_filename: inputVal } : img
               )
          }

          await updateTask(updatedCloneTask, params.boardId, params.groupId)
          setCloneTask(updatedCloneTask)
     }

     return (
          <section className='edit-attachment-container'>
               <h5> Link name</h5>
               <div className='edit-attachment-area'>
                    <input
                         type='text'
                         name=''
                         id=''
                         placeholder='Enter new name'
                         onChange={(ev) => setInputVal(ev.target.value)}
                    />
                    <button onClick={onUpdateTitle}>Update</button>
               </div>
          </section>
     )
}
