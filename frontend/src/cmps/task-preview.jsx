import { GrTextAlignFull, GrAttachment } from 'react-icons/gr';
import { SlBubble } from 'react-icons/sl';
import { IoMdCheckboxOutline } from 'react-icons/io';


import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { boardService } from "../services/board.service"

export function TaskPreview(props) {
    const { task } = props
    function getTodosRatio() {
        let todos = 0;
        let done = 0;
        let checklists = task.checklists;

        for (let checklist of checklists) {
            todos += checklist.todos.length
            for (let todo of checklist) {
                if (todo.isDone) done++
            }
        }
        return `${done}/${todos}`;

    };
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
                    {task.labelIds && task.labelIds.map(labelId => {
                        const label = boardService.findLabelStyleById(labelId, board)
                        return <div key={labelId} className="label" style={{ backgroundColor: label?.color }}></div>;
                    })}
                </div>
                <div className="title-container"><p>{task.title}</p></div>
                <div className="task-preview-badges">
                    {/* due date badge */}
                    {/* description badge */}
                    {task.description?.length > 0 && (

                        <div title="This task has a description" className="badge-btn description">
                            <div className="icon" > <GrTextAlignFull /></div>
                        </div>

                    )}
                    {/* comments badge */}

                    {task.comments?.length > 0 && (<div title="comments" className="badge-btn">
                        <div className="icon" > <SlBubble /></div>
                        <div className="btn-txt">{task.comments.length}</div>

                    </div>)}


                    {/* attachments badge */}
                    {task.attachments?.length > 0 && (<div
                        title="Attachments"
                        className="badge-btn">
                        <div className="icon"> <GrAttachment /></div>
                        <div className="btn-txt">{task.attachments.length}</div>
                    </div>)}

                    {/* check list badge */}
                    {task.checklists?.length > 0 && (


                        <div className="badge-btn">
                            <div className="icon"> <IoMdCheckboxOutline /></div>
                            <div className="btn-txt">{getTodosRatio()}</div>

                        </div>)}

                    {/* members badge */}

                </div>
            </section>
            <div className="quick-edit"></div>



        </div>
    )
}