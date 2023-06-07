import { useState, useEffect } from "react"
import { GrClose } from "react-icons/gr"

// Import different cmps based on type
import { DatesContent } from "./dates-content"
import { LabelsContent } from "./labels-content"
import { ChecklistContent } from "./checklist-content"
import { MembersContent } from "./members-content"
import { AttachContent } from "./attach-content"
import { CreateBoardContent } from "./create-board-content"
import { useSelector } from "react-redux"
import { EditAttachment } from './edit-attachment'
import { CoverContent } from "./task-cover"

export function DynamicActionModal({ cmpType, modalTitle, event, isDetails, ...props }) {
    // Get window width
    const [width, setWidth] = useState(window.innerWidth)

    useSelector(storeState => storeState.boardModule.selectedBoard)



    useEffect(() => {
        const handleResize = () => setWidth(window.innerWidth)
        window.addEventListener('resize', handleResize)
        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, [])

    // Map component types to components
    const componentMap = {
        dates: DatesContent,
        labels: LabelsContent,
        checklist: ChecklistContent,
        members: MembersContent,
        attachment: AttachContent,
        createBoard: CreateBoardContent,
        editAttach: EditAttachment,
        cover: CoverContent,
    }

    // Get the component from the map
    const ComponentToRender = componentMap[cmpType]

    // onCloseModal from props
    const handleClose = () => {
        if (props.onCloseModal) props.onCloseModal()
    }

    function getModalPositionStyle(event, type, isDetails, width) {
        const padding = 10
        const { top, left, height, right } = event.target.getBoundingClientRect()
        return { top: top + height + padding, left: left }
    }

    const modalStyle = getModalPositionStyle(event, cmpType, isDetails, width)

    return (
        <section style={modalStyle} className="dynamic-action-modal">
            <section className="dynamic-modal-header">
                <span>{modalTitle}</span>
                <button onClick={handleClose}><GrClose className='btn-content' /></button>
            </section>
            <section className="modal-content">
                {ComponentToRender && <ComponentToRender {...props} />}
            </section>
        </section>
    )
}
