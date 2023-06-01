
import { BoardPreview } from "./board-preview.jsx"


export function BoardList({ boards, onUpdateBoard }) {
    return <ul className="board-list">
        {boards.map(board =>
            <li className="board-preview" key={board._id}>
                <BoardPreview board={board} onUpdateBoard={onUpdateBoard}/>
            </li>)}
    </ul>
}


