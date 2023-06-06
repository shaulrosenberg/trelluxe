import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { addBoard } from '../../store/board.actions'
import boardPreview from '../../assets/img/board-preview.svg'

export function CreateBoardContent({ onCloseModal }) {
    const [boardTitle, setBoardTitle] = useState('')
    const [boardBackground, setBoardBackground] = useState('#0079bf')  // default Trello board color
    const navigate = useNavigate()

    const backgrounds = [
        '#0079bf', 
        '#d29034', 
        // 'linear-gradient(to right, #519839, #b04632)', 
        '#89609e', 
        // 'linear-gradient(to right, #cd5a91, #4bbf6b)', 
        '#00aecc', 
        '#838c91',
        // 'linear-gradient(to right, #0079bf, #d29034)',
        // 'linear-gradient(to right, #89609e, #838c91)'
    ]

    async function handleSubmit(event) {
        event.preventDefault()
        const newBoard = await addBoard({
            title: boardTitle,
            style: { backgroundColor: boardBackground },
            isStarred: false,
            groups: [],
            activities: []
        })
        onCloseModal()
        navigate(`/board/${newBoard._id}`)
    }

    return (
        <section className="create-board-content">
            {/* Board Preview */}
            <div className="board-preview" style={{ backgroundColor: boardBackground }}>
                <h3>{boardTitle || 'Untitled Board'}</h3>
            </div>

            {/* Board Creation Form */}
            <form onSubmit={handleSubmit}>
                <label htmlFor="boardTitle">Title</label>
                <input id="boardTitle" type="text" value={boardTitle} onChange={(e) => setBoardTitle(e.target.value)} required />

                <label htmlFor="boardBackground">Background</label>
                <div id="boardBackground" className="color-selector">
                    {backgrounds.map(background => (
                        <div
                            key={background}
                            className="color-option"
                            style={{ backgroundColor: background }}
                            onClick={() => setBoardBackground(background)}
                        ></div>
                    ))}
                </div>

                <button type="submit">Create Board</button>
            </form>
        </section>
    )
}
