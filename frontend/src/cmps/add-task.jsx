import { useState } from 'react'
import { boardService } from '../services/board.service'
import { addTask } from '../store/board.actions'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'

// icons
import { GrAdd, GrClose } from 'react-icons/gr'
import { AiOutlinePlus } from "react-icons/ai";



export function AddTask({ group, boardId }) {
     const [isEditable, setIsEditable] = useState(false)
     const [cardTitle, setCardTitle] = useState('')

     function handleBlur(ev) {
          ev.preventDefault()
          if (cardTitle !== '') { onAddTask(ev) }
          else { setIsEditable(false) }

     }

     function handleInputChange(ev) {
          ev.preventDefault()
          setCardTitle(ev.target.value)
     }

     const handleKeyDown = (event) => {
          if (event.key === 'Enter') {
               event.preventDefault();
               onAddTask(event)
          }
     }

     async function onAddTask(ev) {
          ev.preventDefault()
          if (!cardTitle) return
          let newTask = boardService.getEmptyTask()
          newTask.title = cardTitle
          try {
               newTask = await addTask(newTask, boardId, group.id)
               setCardTitle('')
               showSuccessMsg(`Card added (id: ${newTask.id})`)
          } catch (err) {
               showErrorMsg('Cannot add card')
          }
     }



     return (
          <>
               {isEditable ? (
                    <div className='add-task-opened'>
                         <form onSubmit={onAddTask}>
                              <textarea
                                   type='text'
                                   placeholder='Enter a title for this card...'
                                   value={cardTitle}
                                   onChange={handleInputChange}
                                   onBlur={handleBlur}
                                   onKeyDown={handleKeyDown}
                                   autoFocus={true}
                              />

                              <div className='add-task-btns'>
                                   <button className='add-card-btn'>
                                        Add card
                                   </button>
                                   <button className='close-card-btn' onClick={() => setIsEditable(false)}>
                                        <GrClose style={{ fontSize: '17px' }} />
                                   </button>
                              </div>
                         </form>
                    </div>
               ) : (
                    <div className='add-new-task'>
                         <button onClick={() => setIsEditable(true)}>
                              <AiOutlinePlus className='add-task-icon' />
                              Add a card
                         </button>
                    </div>
               )}
          </>
     )
}
