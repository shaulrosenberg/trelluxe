import { useState, useEffect } from "react"
import { GrClose } from "react-icons/gr"

// Import different cmps based on type
import { DatesContent } from "./dates-content"
import { LabelsContent } from "./labels-content"
import { ChecklistContent } from "./checklist-content"
import { MembersContent } from "./members-content"
import { AttachContent } from "./attach-content"

export function DynamicActionModal({ cmpType, modalTitle, event, isDetails, ...props }) {
    // Get window width
    const [width, setWidth] = useState(window.innerWidth)

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
        attachment: AttachContent
    }

    // Get the component from the map
    const ComponentToRender = componentMap[cmpType]

    // onCloseModal from props
    const handleClose = () => {
        if (props.onCloseModal) props.onCloseModal()
    }

    function getModalPositionStyle(event, type, isDetails, width) {
        const typesWithSpecialPositioning = ['activity']
        const padding = 10
        const { top, left, height, right } = event.target.getBoundingClientRect()
        const startSideValueDesktop = (width / left < 2) ? 30 : left
        const startSideValueMobile = (width - left > 320) ? left : 20
        const startSideDesktop = (width / left < 2) ? 'right' : 'left'
        const startSideMobile = (width - left > 320) ? 'left' : 'right'

        if (typesWithSpecialPositioning.includes(type) && isDetails) {
            return { top: top / 2, right: 15 }
        }

        if (width > 980) {
            return { top: top + height + padding, [startSideDesktop]: startSideValueDesktop + 'px' }
        } else if (width > 768) {
            return { top: top + height + padding, left: left }
        } else {
            return { top: top + height + padding, [startSideMobile]: startSideValueMobile + 'px' }
        }

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
