import { useSelector } from "react-redux"
import { updateTask } from '../../store/board.actions'
import { useState } from "react"
export function LabelsContent({ boardId, groupId, task, updateTask }) {
    const board = useSelector(storeState => storeState.boardModule.selectedBoard)
    const [labelsToDisplay, setLabelsToDisplay] = useState(board.labels)
    // adam is responsibale for this component 
    return (
        <section className="labels-content">
            {/* <div className="modal-labels-search">

                <input
                    placeholder={`Search labels...`}
                    type="text"
                    className="modal-labels-input"
                    onChange={ev => {
                        const regex = new RegExp(ev.target.value, 'i')
                        setLabelsToDisplay(board.labels.filter(label => regex.test(label.title)))
                    }}
                    autoFocus
                />
            </div>

            <h4>Labels</h4>

            <ul className="labels-list clean-list">
             {labelsToDisplay && labelsToDisplay.map(label=>
             <li key={label.id} className="label-container">

                <button>checkmark</button>

             </li>) }
                

            </ul> */}

        </section>
    )
}