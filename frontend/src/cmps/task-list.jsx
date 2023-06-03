import { TaskPreview } from "./task-preview"
import { useNavigate } from "react-router-dom"

export function TaskList({ tasks, groupId, boardId }) {
    const navigate = useNavigate()

    

    console.log('tasks:', tasks)
    return (
        <section className="task-list-container">
            {tasks.map((task) => {
                return (
                    <section onClick={() => navigate(`group/${groupId}/task/${task.id}`)}>
                        <TaskPreview key={task.id} task={task} />
                    </section>
                )
            })}
        </section>
    )

}