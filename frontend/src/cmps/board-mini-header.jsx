import { IoStarOutline, IoPersonAddOutline } from 'react-icons/io5';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';

export function BoardMiniHeader({ board }) {


    return (
        <header className="board-header">
            <nav className='board-header-nav'>
                <div className="nav-inline-start">
                    <h1 className="board-title">{board?.title}</h1>
                    <div className="board-header-btn">
                        {(board.isStarred) ?
                            <AiFillStar className="fav-icon-on" /> :
                            <AiOutlineStar className="fav-icon-off" />
                        }
                    </div>
                </div>
                <div className="nav-inline-end">
                    <div className="members-container">

                    </div>

                    <button title="Share board" className='share-board-btn'>
                        <span><IoPersonAddOutline /></span>
                        <span>Share</span>
                    </button>
                </div>


            </nav>
        </header >
    )
}