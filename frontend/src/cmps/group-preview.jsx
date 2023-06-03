import { Link, useParams } from 'react-router-dom'
import { AddTask } from './add-task'
import { TaskList } from './task-list'
import { TaskPreview } from './task-preview'
import { useEffect } from 'react'

export function GroupPreview({ group }) {
     // TaskList
     // TaskPreview
     const { boardId } = useParams()

     useEffect(() => {
          console.log('group', group)
     }, [])

     return (
          <article className='group-preview'>
               <h1 className='group-title'>{group.title}</h1>
               <TaskList tasks={group.tasks} />
               <AddTask group={group} boardId={boardId} />
               {group.tasks.map((task) => (
                    <Link
                         key={task.id}
                         to={`/board/${boardId}/task/${task.id}`}
                    >
                         View Task: {task.title}
                    </Link>
               ))}
          </article>
     )
}
