import { IoStarOutline, IoPersonAddOutline, IoEllipsisHorizontalSharp } from 'react-icons/io5';
import { BsFilter } from "react-icons/bs"
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import { useEffect, useState } from 'react'
import { darken } from 'polished'
import { boardService } from '../services/board.service'
import { Link, NavLink, useLocation, Route, useParams } from 'react-router-dom'
import PropTypes from 'prop-types';


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


            <div className="left">
                <h1 className="board-title">{board?.title}</h1>

                {(board.isStarred) ?
                    <IconButton Icon={AiFillStar} text="" onClick={() => console.log('Clicked!')} />
                    :
                    <IconButton Icon={AiOutlineStar} text="" onClick={() => console.log('Clicked!')} />

                }



            </div>


            <div className="right">


                <IconButton Icon={BsFilter} text="Filter" onClick={() => console.log('Clicked!')} />
                <IconButton Icon={IoPersonAddOutline} text="Share" className='share-board-btn ' onClick={() => console.log('Clicked!')} />
                <IconButton Icon={IoEllipsisHorizontalSharp} text="" onClick={() => console.log('Clicked!')} />

            </div>



        </header >
    )


}


const IconButton = ({ Icon, text = '', style = {}, className = 'svg-btn', ...props }) => {
    const defaultStyle = {

    };
    IconButton.propTypes = {
        Icon: PropTypes.elementType.isRequired,
        text: PropTypes.string,
        style: PropTypes.object,
    };
    return (
        <button style={defaultStyle} className={className} {...props}>
            <Icon style={{ marginRight: text ? '8px' : '0' }} />
            {text}
        </button>
    );


};