import { useSelector } from "react-redux";
import { updateBoard } from "../../store/board.actions"


export function GroupPreviewContent({ groupId }) {

    const board = useSelector(
        (storeState) => storeState.boardModule.selectedBoard
    )

    async function onDeleteList() {
        let updatedBoard = { ...board }
        const groupIdx = updatedBoard.groups.findIndex(group => group.id === groupId)
        if (groupIdx !== -1) {
            updatedBoard.groups.splice(groupIdx, 1)
            await updateBoard(updatedBoard)
        }

    }


    return (
        <section className="group-preview-content">
            <div onClick={onDeleteList}>Delete list</div>
        </section>
    )

}