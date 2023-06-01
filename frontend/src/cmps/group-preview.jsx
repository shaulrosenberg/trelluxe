
export function GroupPreview({ group }) {

    // TaskList
    // TaskPreview

    return (
        <article className="group-preview-container">
            <h1 className="group-title" contentEditable={true}>{group.title}</h1>
            <section className="task-list"></section>
        </article>
    )
}