import { useState } from 'react'
import { boardService } from '../services/board.service'
import { addTask } from '../store/board.actions'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'
import { GrAdd, GrClose } from 'react-icons/gr'

export function AddTask({ group, boardId }) {
     const [isEditable, setIsEditable] = useState(false)
     const [cardTitle, setCardTitle] = useState('')

     function handleInputChange(ev) {
          ev.preventDefault()
          setCardTitle(ev.target.value)
     }

     async function onAddTask(ev) {
          ev.preventDefault()
          if (!cardTitle) return
          let newTask = boardService.getEmptyTask()
          newTask.title = cardTitle
          try {
               newTask = await addTask(newTask, boardId, group.id)
               setCardTitle('')
               showSuccessMsg(`Task added (id: ${newTask.id})`)
          } catch (err) {
               showErrorMsg('Cannot add car')
          }
     }

     return (
          <>
               {isEditable ? (
                    <div className='add-task-opened'>
                         <form onSubmit={onAddTask}>
                              {/* <input
                                   type='text'
                                   placeholder='Enter a title for this card...'
                                   value={cardTitle}
                                   onChange={handleInputChange}
                              /> */}
                              <textarea
                                   type='text'
                                   placeholder='Enter a title for this card...'
                                   value={cardTitle}
                                   onChange={handleInputChange}
                              />

                              <div className='add-task-btns'>
                                   <button className='add-card-btn'>Add card</button>
                                   <button  onClick={() => setIsEditable(false)}>
                                        <GrClose style={{fontSize: '17px'}} />
                                   </button>
                              </div>
                         </form>
                    </div>
               ) : (
                    <div className='add-new-task'>
                         <button onClick={() => setIsEditable(true)}>
                         <GrAdd className='add-task-icon' />
                              Add a card
                         </button>
                    </div>
               )}
          </>
     )
}
