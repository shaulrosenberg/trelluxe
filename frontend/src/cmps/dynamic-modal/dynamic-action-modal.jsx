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
import { FilterContent } from "./filter-content"
import { ActivityContent } from "./activity-content"

export function DynamicActionModal({ cmpType, modalTitle, event, isDetails, ...props }) {
    // Get window width
    const [width, setWidth] = useState(window.innerWidth)

    // maybe use global state for toggling modal??

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
        filter: FilterContent,
        activity: ActivityContent
    }

    // Get the component from the map
    const ComponentToRender = componentMap[cmpType]

    // onCloseModal from props
    const handleClose = () => {
        if (props.onCloseModal) props.onCloseModal()
    }

    function getModalPositionStyle() {
        const padding = 10
        const modalWidth = 300 
        const modalHeight = 550 // not 200

        const { top, left, height, width } = event.target.getBoundingClientRect()

        // initial position
        let calculatedLeft = left
        let calculatedTop = top + height + padding

        if (left + modalWidth > window.innerWidth) {
            calculatedLeft = window.innerWidth - modalWidth - padding
        }

        if (top + height + modalHeight > window.innerHeight) {
            calculatedTop = top - modalHeight - padding
        }

        if (calculatedTop < 0) {
            calculatedTop = top + height + padding
        }

        if (calculatedLeft < 0) {
            calculatedLeft = left + width + padding
        }

        if (cmpType === 'activity') {
            return { top: calculatedTop, right: 0, height: '100vh' }
        }

        return { top: calculatedTop, left: calculatedLeft }
    }



    const modalStyle = getModalPositionStyle(event, cmpType, isDetails, width)

    return (
        <section style={modalStyle} className={`dynamic-action-modal ${cmpType === 'activity' ? 'activity-modal' : ''}`}>
            <section className="dynamic-modal-header">
                <span>{modalTitle}</span>
                <button className='btn-modal-close' onClick={handleClose}><GrClose className='btn-content' /></button>
            </section>
            <section className="modal-content">
                {ComponentToRender && <ComponentToRender {...props} />}
            </section>
        </section>
    )
}
