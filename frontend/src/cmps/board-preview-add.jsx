// onClick -> Show modal with board-create-content
import { useState } from "react"

export function BoardPreviewAdd({ onAddBoard }) {
    const [isHovered, setIsHovered] = useState(false)

    // Handle your add logic here...
    function onAdd(board) {
        onAddBoard(board)
    }

    return (
        <article
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={onAdd}
        >
            {isHovered && <span className="darken-background"></span>}
            <h2 className="board-title">Add a new board</h2>
            {/* additional elements here */}
        </article>
    )
}