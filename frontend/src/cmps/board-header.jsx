import { IoStarOutline, IoPersonAddOutline } from 'react-icons/io5';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import { useEffect, useState } from 'react'
import { darken } from 'polished'
import { boardService } from '../services/board.service'
import { Link, NavLink, useLocation, Route, useParams } from 'react-router-dom'


export function BoardHeader({ board }) {
    const location = useLocation()

    const [navColor, setNavColor] = useState(null)
    const boardId = location.pathname.split('/board/')[1]
    useEffect(() => {
        fetchBoardStyle()
    }, [location])

    function fetchBoardStyle() {
        if (boardId) {
            boardService
                .getById(boardId)
                .then((board) => {
                    let boardStyleColor = board.style.backgroundColor
                    boardStyleColor = darken(0.1, boardStyleColor)

                    setNavColor(boardStyleColor)
                })
                .catch((err) =>
                    console.log('failed to change nav color', err)
                )
        } else {
            setNavColor('#026AA7')
        }
    }

    return (
        <header className="board-header" style={{ backgroundColor: navColor }}>

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