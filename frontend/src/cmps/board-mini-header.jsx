import { IoStarOutline, IoPersonAddOutline } from 'react-icons/io5';
export function BoardMiniHeader({ board }) {


    return (
        <header className="board-mini-header">
            <nav>
                <h1 className="board-title">{board?.title}</h1>
                <div className='star'><IoStarOutline /></div>
                <button title="Share board" className='share-board-btn'>
                    <span><IoPersonAddOutline /></span>
                    <span>Share</span>
                </button>
            </nav>
        </header >
    )
}