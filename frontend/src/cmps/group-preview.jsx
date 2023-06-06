import { Link, useParams } from 'react-router-dom'
import { AddTask } from './add-task'
import { TaskList } from './task-list'
import { useEffect } from 'react'
import TitleAdd from './title-add'

export function GroupPreview({ board, group }) {
     const { boardId } = useParams()

     useEffect(() => {
          console.log('group', group)
     }, [])

     return (
          <article className='group-preview'>
               <TitleAdd board={board} group={group} />
               <TaskList tasks={group.tasks} groupId={group.id} boardId={boardId} />
               <AddTask group={group} boardId={boardId} />
          </article>
     )
}
