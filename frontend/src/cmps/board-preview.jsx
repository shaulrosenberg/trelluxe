import { useNavigate } from "react-router-dom"
import { AiOutlineStar, AiFillStar } from 'react-icons/ai'
import { useState } from "react"

export function BoardPreview({ board, onUpdateBoard }) {
    const navigate = useNavigate()
    const [isHovered, setIsHovered] = useState(false)

    function onToggleStarred(ev) {
        ev.stopPropagation()
        const boardToUpdate = { ...board }
        boardToUpdate.isStarred = !boardToUpdate.isStarred
        onUpdateBoard(boardToUpdate)
    }

    function onSelectBoard(boardId) {
        navigate(`/board/${boardId}`)
    }

    return (
        <article
            style={board.style}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={() => onSelectBoard(board._id)}
        >
            {isHovered && <span className="darken-background"></span>}
            <h2 className="board-title">{board.title}</h2>
            <div className="starred-container" onClick={onToggleStarred}>
                <span className={board.isStarred ? 'starred' : ''} >
                    {board.isStarred ? <AiFillStar className="star-icon" /> : <AiOutlineStar className="star-icon" />}
                </span>
            </div>
        </article>
    )
}
