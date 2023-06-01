import { useNavigate } from "react-router-dom"


export function BoardPreview({ board, onUpdateBoard }) {
    const navigate = useNavigate()

    function onToggleStarred() {

    }

    function onSelectBoard(boardId) {
        navigate(`/board/${boardId}`)
    }

    return (
        <article style={board.style} onClick={() => onSelectBoard(board._id)} >
            <span className="board-title">{board.title}</span>
            <div>
                <span className={board.isStarred ? 'starred' : ''} onClick={() => { onUpdateBoard(board._id) }}>⭐</span>
            </div>
        </article>
    )
}