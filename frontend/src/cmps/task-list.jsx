import { TaskPreview } from "./task-preview"

export function TaskList({ tasks }) {
    console.log('tasks:', tasks)
    return (
        <section className="class-list-container">
            {tasks.map((task) => {
                return (
                    <TaskPreview key={task.id} task={task} />
                )
            })}
        </section>
    )

}