import { Link, useParams } from 'react-router-dom'
import { AddTask } from './add-task'
import { TaskList } from './task-list'
import { useEffect } from 'react'

export function GroupPreview({ group }) {
     const { boardId } = useParams()

     useEffect(() => {
          console.log('group', group)
     }, [])

     return (
          <article className='group-preview'>
               <h1 className='group-title'>{group.title}</h1>
               <TaskList tasks={group.tasks} groupId={group.id} boardId={boardId} />
               <AddTask group={group} boardId={boardId} />
          </article>
     )
}
