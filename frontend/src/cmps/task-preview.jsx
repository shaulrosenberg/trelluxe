export function TaskPreview(props) {
    const { task } = props
    return (
        <div className="task-preview-container">
            <div className="title-container"><p>{task.title}</p></div>
        </div>
    )
}