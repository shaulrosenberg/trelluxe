export function TaskPreview(props) {
    const { task } = props

    

    return (
        <div className="task-preview-container">
            {/* {task.style.backgroundColor &&
                <section className='task-preview-cover'></section>} */}
            <section className='task-preview-body'>
                <div className="task-preview-labels"></div>
                <div className="title-container"><p>{task.title}</p></div>
                <div className="task-preview-badges"></div>
            </section>
            <div className="quick-edit"></div>



        </div>
    )
}