import { useState, useRef } from 'react'
import { DynamicActionModal } from '../dynamic-modal/dynamic-action-modal'
import { updateTask, removeTask } from '../../store/board.actions'

import { AiOutlineTags, AiOutlineMinus, AiOutlineCheckSquare, AiOutlineFieldTime, AiOutlineCopy } from "react-icons/ai"
import { BsPersonPlus, BsArrowRight, BsArchive, BsSquareHalf } from "react-icons/bs"
import { MdOutlineAttachment } from "react-icons/md"
import { useSelector } from 'react-redux'
import { BsWindowDesktop } from "react-icons/bs";
import { useNavigate } from 'react-router-dom'


export function TaskControls({ task, boardId, groupId }) {
    const [modalType, setModalType] = useState(null)
    const eventRef = useRef(null)
    const [isArchive, setIsArchive] = useState(false)
    const navigate = useNavigate()


    const board = useSelector(storeState => storeState.boardModule.selectedBoard)

    function onToggleModal(type = null, ev = null) {
        eventRef.current = ev
        setModalType(type)
    }

    function onTaskArchive() {
        // TODO: Implement this...
        console.log('archived...')
    }

    const modalTitles = {
        'members': 'Members',
        'labels': 'Labels',
        'checklist': 'Checklist',
        'dates': 'Dates',
        'attachment': 'Attachment',
        'archive': 'Archive',
        'cover': 'Cover',

    }
    async function onRemoveTask() {

        try {
            console.log('remove:')
            await removeTask(task.id, groupId, boardId)
            navigate(`/board/${boardId}`)
        } catch (err) {
            console.log('Cannot remove task ', err)
        }

    }

    return (
        <section className="task-controls">
            <section className='add-to-card'>
                <h3 className="controls-title">Add to card</h3>
                <section className='btn-container'>
                    <button className='btn-task-control' onClick={(ev) => onToggleModal('members', ev)}><BsPersonPlus />Members</button>
                    <button className='btn-task-control' onClick={(ev) => onToggleModal('labels', ev)}><AiOutlineTags />Labels</button>
                    <button className='btn-task-control' onClick={(ev) => onToggleModal('checklist', ev)}><AiOutlineCheckSquare />Checklist</button>
                    <button className='btn-task-control' onClick={(ev) => onToggleModal('dates', ev)}><AiOutlineFieldTime />Dates</button>
                    <button className='btn-task-control' onClick={(ev) => onToggleModal('attachment', ev)}><MdOutlineAttachment />Attachment</button>

                    {!isArchive ?
                        <button className='btn-task-control' onClick={(ev) => setIsArchive(true)}><BsArchive />Archive</button> :
                        (<button className='btn-task-control remove-task' onClick={onRemoveTask} onBlur={() => setIsArchive(false)} >Delete</button>)}
                    {/* TODO  implement archive as well is delete*/}
                    <button className='btn-task-control' onClick={(ev) => onToggleModal('cover', ev)}><BsWindowDesktop />Cover</button>
                </section>
            </section>
            {modalType &&
                <DynamicActionModal
                    cmpType={modalType}
                    modalTitle={modalTitles[modalType]}
                    onCloseModal={() => onToggleModal(null)}
                    event={eventRef.current}
                    isDetails={true}
                    task={task}
                    groupId={groupId}
                    boardId={boardId}
                    updateTask={updateTask}
                    onToggleModal={onToggleModal}
                />}
        </section>
    )
}
