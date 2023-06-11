import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { addBoard } from '../../store/board.actions'
import boardPreview from '../../assets/img/board-preview.svg'

export function CreateBoardContent({ onCloseModal }) {
   const [boardTitle, setBoardTitle] = useState('')
   const [boardBackground, setBoardBackground] = useState('#0079bf') // default Trello board color
   const navigate = useNavigate()

   const backgrounds = ['#0079bf', '#d29034', '#89609e', '#00aecc', '#838c91', '#F1813A', '#B86BBF', '#b2d8d8'];

   async function handleSubmit(event) {
      event.preventDefault()
      // TODO: move this empty board template to service
      const newBoard = await addBoard({
         title: boardTitle,
         style: { backgroundColor: boardBackground },
         isStarred: false,
         groups: [],
         members: [{
            _id: 'u101',
            fullname: 'Adam G',
            imgUrl: 'https://robohash.org/adam'
         }],
         activities: [],
      })
      onCloseModal()
      navigate(`/board/${newBoard._id}`)
   }

   useEffect(() => {

   }, [boardTitle])
   const isAllow = !boardTitle ? 'not-allowed' : ''
   return (
      <section className='create-board-content'>
         {/* Board Preview */}
         <div
            className='board-preview'
            style={{ backgroundColor: boardBackground }}
         >
            {/* <h3>{boardTitle || 'Untitled Board'}</h3> */}
            <img src='https://a.trellocdn.com/prgb/assets/14cda5dc635d1f13bc48.svg' />
         </div>

         {/* Board Creation Form */}
         <form onSubmit={handleSubmit}>
            <label htmlFor='boardBackground' className='workspace-text-style'>
               Background
            </label>
            <div id='boardBackground' className='color-selector'>
               {backgrounds.map((background) => (
                  <div
                     key={background}
                     className='color-option'
                     style={{ backgroundColor: background }}
                     onClick={() => setBoardBackground(background)}
                  ></div>
               ))}
            </div>

            <label className='workspace-text-style' htmlFor='boardTitle'>
               Title
            </label>
            <input
               id='boardTitle'
               className='workspace-board-input'
               type='text'
               value={boardTitle}
               onChange={(e) => setBoardTitle(e.target.value)}
               required
            />
            {!boardTitle && (
               <p
                  className='workspace-text-style'
                  style={{ fontWeight: 400, fontSize: '14px' }}
               >
                  👋 Board title is required
               </p>
            )}

            <button
               style={{ cursor: isAllow }}
               className='workspace-create-btn'
               type='submit'
            >
               Create Board
            </button>
         </form>
      </section>
   )
}
