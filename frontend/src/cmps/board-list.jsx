
import { BoardPreview } from "./board-preview.jsx"
import { BoardPreviewAdd } from "./board-preview-add.jsx"



export function BoardList({ boards, onUpdateBoard, onAddBoard, includeAdd }) {
    return (
        <ul className="board-list">
            {includeAdd &&
                <li className="board-preview add-board">
                    <BoardPreviewAdd onAddBoard={onAddBoard} />
                </li>
            }
            {boards.map(board =>
                <li className="board-preview" key={board._id}>
                    <BoardPreview board={board} onUpdateBoard={onUpdateBoard} />
                </li>
            )}
        </ul>
    )
}



