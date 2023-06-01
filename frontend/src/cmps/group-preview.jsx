import { AddTask } from "./add-task"
import { TaskList } from "./task-list"
import { TaskPreview } from "./task-preview"

export function GroupPreview({ group }) {

    // TaskList
    // TaskPreview

    return (
        <article className="group-preview">
            <h1 className="group-title">{group.title}</h1>
            <TaskList tasks={group.tasks} />
            <AddTask group={group} />

        </article>
    )
}