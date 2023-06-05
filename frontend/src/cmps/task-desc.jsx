import { useLocation, useParams } from 'react-router'

import { updateTask } from '../store/board.actions'

// icons
import { IoText } from 'react-icons/io5'
import { BsTypeBold } from 'react-icons/bs'
import { BiItalic } from 'react-icons/bi'
import { AiOutlineUnorderedList } from 'react-icons/ai'
import { AiOutlineLink } from 'react-icons/ai'
import { BiImageAlt } from 'react-icons/bi'
import { useState } from 'react'

export function DescEdit({ task, setIsDescEdit }) {
     const params = useParams()

     const [newDesc, setNewDesc] = useState('')

     async function onSaveDesc() {
          const taskToUpdate = { ...task }
          taskToUpdate.description = newDesc

          try {
               await updateTask(taskToUpdate, params.boardId, params.groupId)
               console.log('description saved')
               setIsDescEdit(false)
          } catch (err) {
               console.log('err saving description', err)
          }
     }

     return (
          <section className='section-edit-desc'>
               <div className='div-desc-edit'>
                    <div className='div-desc-edit-icons'>
                         <IoText className='desc-edit-icon' />
                         <BsTypeBold className='desc-edit-icon' />
                         <BiItalic className='desc-edit-icon' />
                         <AiOutlineUnorderedList className='desc-edit-icon' />
                         <AiOutlineLink className='desc-edit-icon' />
                         <BiImageAlt className='desc-edit-icon' />
                    </div>
               </div>
               <textarea
                    className='desc-textarea'
                    placeholder='Enter new description...'
                    onChange={(ev) => setNewDesc(ev.target.value)}
               ></textarea>
               <button className='desc-btn-save' onClick={() => onSaveDesc()}>
                    Save
               </button>
               <button
                    className='desc-btn-cancel'
                    onClick={() => setIsDescEdit(false)}
               >
                    Cancel
               </button>
          </section>
     )
}
