import { useState, useRef } from 'react'
import DynamicActionModal from './DynamicActionModal'

// Import your icons here...
import { AiOutlineTags, AiOutlineMinus, AiOutlineCheckSquare, AiOutlineFieldTime, AiOutlineCopy } from "react-icons/ai"
import { IoPersonOutline } from "react-icons/io5"
import { BsPersonPlus, BsArrowRight, BsArchive, BsSquareHalf } from "react-icons/bs"
import { MdOutlineAttachment } from "react-icons/md"
import { IoMdRefresh } from "react-icons/io"
// ...

export function TaskControls() {
    const [modalType, setModalType] = useState(null)
    const eventRef = useRef(null)

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
    }

    return (
        <section className='task-controls'>
            <section className='add-to-card'>
                <h3 className="controls-title">Add to card</h3>
                <section className='btn-container'>
                    <button className='btn-task-control' onClick={(ev) => onToggleModal('members', ev)}><BsPersonPlus />Members</button>
                    <button className='btn-task-control' onClick={(ev) => onToggleModal('labels', ev)}><AiOutlineTags />Labels</button>
                    <button className='btn-task-control' onClick={(ev) => onToggleModal('checklist', ev)}><AiOutlineCheckSquare />Checklist</button>
                    <button className='btn-task-control' onClick={(ev) => onToggleModal('dates', ev)}><AiOutlineFieldTime />Dates</button>
                    <button className='btn-task-control' onClick={(ev) => onToggleModal('attachment', ev)}><MdOutlineAttachment />Attachment</button>
                    <button className='btn-task-control' onClick={(ev) => onToggleModal('archive', ev)}><BsArchive />Archive</button>
                </section>
            </section>
            {modalType &&
                <DynamicActionModal
                    cmpType={modalType}
                    modalTitle={modalTitles[modalType]}
                    onClose={() => onToggleModal(null)}
                    // send click event
                    event={eventRef.current}
                    isDetails={true}
                />}
        </section>
    )
}
