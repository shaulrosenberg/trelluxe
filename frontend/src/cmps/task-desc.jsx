import { useLocation, useParams } from 'react-router'
import { useNavigate } from 'react-router-dom'
import { boardService } from '../services/board.service'
import { updateTask } from '../store/board.actions'

// icons
import { IoText } from 'react-icons/io5'
import { BsTypeBold } from 'react-icons/bs'
import { BiItalic } from 'react-icons/bi'
import { AiOutlineUnorderedList } from 'react-icons/ai'
import { AiOutlineLink } from 'react-icons/ai'
import { BiImageAlt } from 'react-icons/bi'
import { useEffect, useState } from 'react'

export function DescEdit({ task, setIsDescEdit }) {
     const location = useLocation()
     const navigate = useNavigate()

     const [newDesc, setNewDesc] = useState('')
     const [boardId, setBoardId] = useState(null) // board id
     const [groupId, setGroupId] = useState(null) // group id

     async function onSaveDesc() {
          const taskToUpdate = { ...task }
          taskToUpdate.desc = newDesc

          try {
               await getGroupId()
               await updateTask(taskToUpdate, boardId, groupId)
               console.log('description saved')
          } catch (err) {
               console.log('err saving description', err)
          }
     }

     // find the specific group id
     async function getGroupId() {
          try {
               const board = await boardService.getById(boardId)
               const group = board.groups.find((group) =>
                    group.tasks.find((t) => t.id === task.id)
               )
               if (group) {
                    setGroupId(group.id) // Set the group ID in the state
                    console.log('group id is', groupId)
               }
          } catch (err) {
               console.log('failed to get groupId', err)
          }
     }

     // get the board id from the url
     function getBoardIdFromURL() {
          const boardIdRegex = /\/board\/(t\d+)/
          const match = location.pathname.match(boardIdRegex)
          if (match && match[1]) {
               return match[1]
          }
          return null
     }

     useEffect(() => {
          setBoardId(getBoardIdFromURL())
     }, [])

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
