import { useState, useEffect } from 'react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import { useNavigate } from "react-router-dom"
import { TaskPreview } from './task-preview'
import { updateBoard } from '../store/board.actions'
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


    async function onDragEnd(result) {
        if (!result.destination) return
        const items = Array.from(taskList)
        const [reorderedItem] = items.splice(result.source.index, 1)
        items.splice(result.destination.index, 0, reorderedItem)

        const newBoard = JSON.parse(JSON.stringify(board))
        const groupIdx = newBoard.groups.findIndex(group => group.id === groupId)
        newBoard.groups[groupIdx].tasks = items
        setTaskList(items)
        await updateBoard(newBoard)
    }


    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="taskList">
                {(provided) => (
                    <section
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        className="task-list-container"
                    >
                        {taskList.map((task, index) => (
                            <Draggable key={task.id} draggableId={task.id} index={index}>
                                {(provided) => (
                                    <section
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                        ref={provided.innerRef}
                                        onClick={() => navigate(`group/${groupId}/task/${task.id}`)}
                                    >
                                        <TaskPreview task={task} />
                                    </section>
                                )}
                            </Draggable>
                        ))}
                        {provided.placeholder}
                    </section>
                )}
            </Droppable>
        </DragDropContext>
    )
}