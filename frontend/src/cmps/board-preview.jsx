import { useNavigate } from "react-router-dom"


export function BoardPreview({ board, onUpdateBoard }) {

    function onToggleStarred() {

    }

    function onSelectBoard() {

    }

    return (
        <article style={board.style}>
            <span className="board-title">{board.title}</span>
            <div>
                <span className={board.isStarred ? 'starred' : ''} onClick={() => { onUpdateBoard(board._id) }}>⭐</span>
            </div>
        </article>
    )
}