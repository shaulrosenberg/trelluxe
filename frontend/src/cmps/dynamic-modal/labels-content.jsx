import { useSelector } from 'react-redux'
import { useState, useRef } from 'react'
import { RxPencil1 } from 'react-icons/rx'
import { updateTask } from '../../store/board.actions'
import { DynamicActionModal } from '../dynamic-modal/dynamic-action-modal'
import { ReactComponent as EditPencilIcon } from '../../assets/img/edit-pencil.svg'
import { boardService } from '../../services/board.service'
import { ColorPalette } from '../color-pallette'
import { updateBoard } from '../../store/board.actions'

export function LabelsContent(props) {
   const { boardId, groupId, task } = props
   const [isEditMode, setIsEditMode] = useState(false)

   const board = useSelector(
      (storeState) => storeState.boardModule.selectedBoard
   )
   const taskLabelIds = task.labelIds
   const [displayedLabels, setDisplayedLabels] = useState(board.labels)
   const taskLabels = boardService.getTaskLabels(board.labels, task.labelIds)
   const [selectedLabel, setSelectedLabel] = useState('')

   async function onEditLabel() {
      const labelToEdit = {
         id: selectedLabel.id,
         color: selectedLabel.color,
         title: selectedLabel.title,
      }

      const boardLabelIndex = board.labels.findIndex(
         (boardLabel) => boardLabel.id === labelToEdit.id
      )
      if (boardLabelIndex !== -1) {
         board.labels.splice(boardLabelIndex, 1, labelToEdit)
      }
      try {
         const newBoard = { ...board }

         await updateBoard(newBoard)
         await setIsEditMode(false)
      } catch (err) {
         console.log('failed to update label', err)
      }
   }

   async function toggleLabel(id) {
      let updatedLabelIds = []
      let updatedTask
      if (taskLabelIds?.includes(id)) {
         updatedLabelIds = taskLabelIds.filter((currId) => currId !== id)
         updatedTask = { ...task, labelIds: updatedLabelIds }
      } else {
         let newIds = taskLabelIds ? [...taskLabelIds, id] : [id]
         updatedTask = { ...task, labelIds: newIds }
      }

      try {
         await updateTask(updatedTask, boardId, groupId)
      } catch (error) {
         console.error(error)
      }
   }

   return (
      <>
         {!isEditMode && (
            <section className='labels-content'>
               <div className='modal-labels-search'>
                  <input
                     placeholder={`Search labels...`}
                     type='text'
                     className='modal-labels-input'
                     onChange={(ev) => {
                        const regex = new RegExp(ev.target.value, 'i')
                        setDisplayedLabels(
                           board.labels.filter((label) =>
                              regex.test(label.title)
                           )
                        )
                     }}
                     autoFocus
                     autoComplete='off'
                  />
               </div>

               <h4>Labels</h4>

               <ul className='labels-list clean-list'>
                  {displayedLabels &&
                     displayedLabels.map((label) => (
                        <li key={label.id} className='label-container'>
                           <input
                              onChange={() => {
                                 toggleLabel(label.id)
                              }}
                              checked={task.labelIds?.includes(label.id)}
                              className='label-checkbox'
                              type='checkbox'
                              id={label.id}
                           />

                           <label
                              title={`Label Title: ${label.title}`}
                              htmlFor={label.id}
                              className='label-block'
                              style={{ backgroundColor: label.color }}
                           >
                              {label.title}
                           </label>

                           <button
                              className='edit-button'
                              onClick={() => {
                                 setSelectedLabel(label)
                                 setIsEditMode(true)
                              }}
                           >
                              <EditPencilIcon className='edit-icon' />
                           </button>
                        </li>
                     ))}
               </ul>
            </section>
         )}

         {isEditMode && (
            <section className='edit-label-content'>
               <div className='edit-label-preview'>
                  <div className='preview-container'>
                     {/* <div className="preview-label"></div> */}
                     <div
                        className='preview-label'
                        style={{ backgroundColor: selectedLabel.color }}
                     >
                        {selectedLabel.title}
                     </div>
                  </div>
               </div>
               <div className='edit-label-search'>
                  <h4>Title</h4>

                  <input
                     value={selectedLabel.title}
                     type='text'
                     className='edit-label-input'
                     onChange={(ev) =>
                        setSelectedLabel({
                           ...selectedLabel,
                           title: ev.target.value,
                        })
                     }
                     autoFocus
                     autoComplete='off'
                  />
               </div>
               <div className='edit-label-color-select'>
                  <h4>Select a color</h4>
                  <ColorPalette
                     selectedLabel={selectedLabel}
                     setSelectedLabel={setSelectedLabel}
                  />
               </div>

               <hr />

               <div className='edit-label-controls '>
                  <button onClick={onEditLabel} className='save-button'>
                     Save
                  </button>
                  <button className='delete-button'>Delete</button>
               </div>
            </section>
         )}
      </>
   )
}
