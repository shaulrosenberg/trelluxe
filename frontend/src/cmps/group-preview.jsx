import { Link, useParams } from 'react-router-dom'
import { AddTask } from './add-task'
import { TaskList } from './task-list'
import { useEffect, useRef, useState } from 'react'
import TitleAdd from './title-add'
import { DynamicActionModal } from "./dynamic-modal/dynamic-action-modal"
import { AiOutlineEllipsis } from 'react-icons/ai'

export function GroupPreview({ board, group }) {
     const { boardId } = useParams()
     const eventRef = useRef()
     const [modalType, setModalType] = useState(null)

     useEffect(() => {

     }, [])

     function onToggleModal(type = null, ev = null) {
          eventRef.current = ev
          setModalType(type)
     }

     return (
          <article className='group-preview'>
               <div className='title-wrapper'><TitleAdd board={board} group={group} />
                    <AiOutlineEllipsis className='group-preview-controls-btn' onClick={ev => onToggleModal('groupPreviewContent', ev)} /></div>

               <TaskList tasks={group.tasks} groupId={group.id} boardId={boardId} />
               <AddTask group={group} boardId={boardId} />

               {modalType && <DynamicActionModal
                    cmpType={modalType}
                    modalTitle='List actions'
                    event={eventRef.current}
                    onCloseModal={() => onToggleModal()}
                    groupId={group.id}

               />}
          </article>
     )
}