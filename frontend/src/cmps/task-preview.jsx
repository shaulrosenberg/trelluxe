import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { boardService } from "../services/board.service"

export function TaskPreview(props) {
    const { task } = props
    const board = useSelector(storeState => storeState.boardModule.selectedBoard)

    const hasBackgroundImage = task.style?.backgroundImage
    const hasBackgroundColor = task.style?.backgroundColor

    return (
        <div className="task-preview-container">
             {task.style &&
                <section
                    className='task-preview-cover'
                    style={{ backgroundColor: hasBackgroundImage ? null : hasBackgroundColor }}
                >
                    {hasBackgroundImage && <img src={task.style.backgroundImage} alt="Task Cover" />}
                </section>
            }
            {!task.style && task.imgAttachment && <section
                    className='task-preview-cover'><img src={task.imgAttachment} alt="Task Cover" /></section>}
            <section className='task-preview-body'>
                <div className="task-preview-labels">
                    
                </div>
                <div className="title-container"><p>{task.title}</p></div>
                <div className="task-preview-badges"></div>
            </section>
            <div className="quick-edit"></div>



        </div>
    )
}