import { useNavigate } from "react-router-dom"
import React, { forwardRef } from 'react'
const TaskPreview = forwardRef(({ task, groupId }, ref) => {

    const navigate = useNavigate()


    return (
        <div ref={ref} className="task-preview-container" onClick={() => navigate(`group/${groupId}/task/${task.id}`)} >
            <div className="title-container"><p>{task.title}</p></div>
        </div >
    )
});


export default TaskPreview




