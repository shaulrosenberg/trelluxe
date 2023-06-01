import { useEffect } from 'react'
import { useParams } from 'react-router'
import { boardService } from '../services/board.service'
import { useState } from 'react'

export function TaskDetails() {
     const { taskId } = useParams()
     const [task, setTask] = useState(null)

     useEffect(() => {
          boardService
               .findTaskById(taskId)
               .then((currTask) => setTask(currTask))
     }, [taskId])

     return (
          <section className='section-task-deatils'>
               <div className='div-task-deatils'>
                    {task ? <h2>{task.title}</h2> : 'Loading'}
                    <p>Description</p>
                    <a>Add a more detailed description...</a>
                    <p>Activity</p>
                    <input placeholder='Write a comment...'></input>
               </div>
          </section>
     )
}
