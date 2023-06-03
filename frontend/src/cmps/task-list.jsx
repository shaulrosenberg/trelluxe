// import { TaskPreview } from "./task-preview"


// export function TaskList({ tasks, groupId, boardId }) {

//     console.log('tasks:', tasks)
//     return (
//         <section className="task-list-container">
//             {tasks.map((task) => {
//                 return (

//                     <TaskPreview task={task} groupId={groupId} />

//                 )
//             })}
//         </section>
//     )

// }
import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import TaskPreview from './task-preview';

export function TaskList({ tasks, groupId, boardId }) {
    const [taskList, setTaskList] = useState(tasks);  // State to store the tasks

    // Function to handle the onDragEnd event
    const handleOnDragEnd = (result) => {
        if (!result.destination) return;
        const items = Array.from(taskList);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);
        setTaskList(items);
    }

    return (
        <DragDropContext onDragEnd={handleOnDragEnd}>
            <Droppable droppableId="taskList">
                {(provided) => (
                    <section className="task-list-container" {...provided.droppableProps} ref={provided.innerRef}>
                        {taskList.map((task, index) => {
                            return (
                                <Draggable key={task.id} draggableId={task.id} index={index}>
                                    {(provided) => (
                                        <div
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                        >
                                            <TaskPreview
                                                task={task}
                                                groupId={groupId}
                                            />
                                        </div>
                                    )}
                                </Draggable>
                            )
                        })}
                        {provided.placeholder}
                    </section>
                )}
            </Droppable>
        </DragDropContext>
    )
}