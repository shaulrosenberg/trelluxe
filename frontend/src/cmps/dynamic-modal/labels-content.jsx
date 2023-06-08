import { useSelector } from "react-redux"
import { useState, useRef } from "react"
import { RxPencil1 } from "react-icons/rx";
import { updateTask } from "../../store/board.actions";
import { DynamicActionModal } from '../dynamic-modal/dynamic-action-modal'


export function LabelsContent({ boardId, groupId, task, onToggleModal, }) {
    const board = useSelector(storeState => storeState.boardModule.selectedBoard)
    const taskLabelIds = task.labelIds
    const [displayedLabels, setDisplayedLabels] = useState(board.labels)




    async function toggleLabel(id) {
        let updatedLabelIds = []
        let updatedTask
        if (taskLabelIds?.includes(id)) {
            updatedLabelIds = taskLabelIds.filter(currId => currId !== id)
            updatedTask = { ...task, labelIds: updatedLabelIds }
        } else {
            let newIds = taskLabelIds ? [...taskLabelIds, id] : [id]
            updatedTask = { ...task, labelIds: newIds }
        }

        try {
            await updateTask(updatedTask, boardId, groupId)
        } catch (error) { console.error(error) }
    }

    return (
        <section className="labels-content">
            <div className="modal-labels-search">

                <input
                    placeholder={`Search labels...`}
                    type="text"
                    className="modal-labels-input"
                    onChange={ev => {
                        const regex = new RegExp(ev.target.value, 'i')
                        setDisplayedLabels(board.labels.filter(label => regex.test(label.title)))
                    }}
                    autoFocus
                    autoComplete="off"

                />
            </div>

            <h4>Labels</h4>

            <ul className="labels-list clean-list">
                {displayedLabels && displayedLabels.map(label =>

                    <li key={label.id} className="label-container" >
                        <input
                            onChange={() => { toggleLabel(label.id) }}
                            checked={task.labelIds?.includes(label.id)}
                            className="label-checkbox"
                            type="checkbox"
                            id={label.id}
                        />

                        <label title={`Label Title: ${label.title}`} htmlFor={label.id} className="label-block" style={{ backgroundColor: label.color }}>{label.title}</label>
                        <button className="clean-btn label-edit-icon" onClick={(ev) => onToggleModal(ev, 'editLabel')} ><RxPencil1 /></button>



                    </li>)}


            </ul>

        </section >
    )
}

