import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { boardService } from "../services/board.service"

export function TaskPreview(props) {
    const { task } = props
    const board = useSelector(storeState => storeState.boardModule.selectedBoard)

    
    return (
        <div className="task-preview-container">
            {/* {task.style.backgroundColor &&
                <section className='task-preview-cover'></section>} */}
            <section className='task-preview-body'>
                <div className="task-preview-labels">
                    {task.labelIds && task.labelIds.map(labelId =>{
                        const label = boardService.findLabelStyleById(labelId, board)  
                        return <div key={labelId} className="label" style={{ backgroundColor: label.color }}></div>;
                    })}
                </div>
                <div className="title-container"><p>{task.title}</p></div>
                <div className="task-preview-badges"></div>
            </section>
            <div className="quick-edit"></div>



        </div>
    )
}