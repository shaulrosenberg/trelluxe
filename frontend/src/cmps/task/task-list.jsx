import { useState, useEffect } from 'react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import { useNavigate } from "react-router-dom"
import { TaskPreview } from './task-preview'
import { updateBoard } from '../../store/board.actions'
import { useSelector } from 'react-redux'


export function TaskList({ tasks, groupId, boardId }) {
    const navigate = useNavigate()
    const board = useSelector(storeState => storeState.boardModule.selectedBoard)
    const [taskList, setTaskList] = useState(tasks)

    useEffect(() => {
        const group = board.groups.find(group => group.id === groupId)
        if (group) setTaskList(group.tasks)
        // eslint-disable-next-line
    }, [board])

    return (
        <section className="task-list-container">
            <Droppable droppableId={groupId} type="TASK">
                {(provided) => (
                    <div ref={provided.innerRef} {...provided.droppableProps}>
                        {taskList.map((task, index) => (
                            <Draggable key={task.id} draggableId={task.id} index={index}>
                                {(provided) => (
                                    <section
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                        onClick={() => navigate(`group/${groupId}/task/${task.id}`)}
                                    >
                                        <TaskPreview board={board} task={task} groupId={groupId} boardId={boardId} />
                                    </section>
                                )}
                            </Draggable>
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </section>
    )
}




