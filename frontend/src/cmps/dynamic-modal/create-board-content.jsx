import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { addBoard } from '../../store/board.actions'

export function CreateBoardContent({ onCloseModal }) {
    const [boardTitle, setBoardTitle] = useState('')
    const [boardColor, setBoardColor] = useState('#0079bf')  // default Trello board color
    const navigate = useNavigate()

    const colors = ['#0079bf', '#d29034', '#519839', '#b04632', '#89609e', '#cd5a91', '#4bbf6b', '#00aecc', '#838c91']

    async function handleSubmit(event) {
        event.preventDefault()
        const newBoard = await addBoard({
            title: boardTitle,
            style: { backgroundColor: boardColor },
            isStarred: false,
            // PROBLEM: with groups addGroup -> doesn't add new tasks array
            groups: [],
            activities: []
            // add more fields
        })
        onCloseModal()
        navigate(`/board/${newBoard._id}`)
    }

    return (
        <section className="create-board-content">
            {/* Board Preview */}
            <div className="board-preview" style={{ backgroundColor: boardColor }}>
                <h3>{boardTitle || 'Untitled Board'}</h3>
            </div>

            {/* Board Creation Form */}
            <form onSubmit={handleSubmit}>
                <label htmlFor="boardTitle">Title</label>
                <input id="boardTitle" type="text" value={boardTitle} onChange={(e) => setBoardTitle(e.target.value)} required />

                <label htmlFor="boardColor">Color</label>
                <div id="boardColor" className="color-selector">
                    {colors.map(color => (
                        <div
                            key={color}
                            className="color-option"
                            style={{ backgroundColor: color }}
                            onClick={() => setBoardColor(color)}
                        ></div>
                    ))}
                </div>

                <button type="submit">Create Board</button>
            </form>
        </section>
    )
}
