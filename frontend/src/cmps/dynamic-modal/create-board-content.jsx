import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { boardService } from '../../services/board.service'
import { unsplashService } from '../../services/unsplash.service'
import { addBoard } from '../../store/board.actions'
import boardPreview from '../../assets/img/board-preview.svg'

export function CreateBoardContent({ onCloseModal }) {
	const [boardTitle, setBoardTitle] = useState('')
	const [boardBackgroundColor, setBoardBackgroundColor] = useState('#0079bf') // default Trello board color
	const [boardBackgroundImage, setBoardBackgroundImage] = useState('') // new state variable for image background
	const [unsplashImages, setUnsplashImages] = useState([])
	const [backgroundType, setBackgroundType] = useState('color')
	const navigate = useNavigate()

	const backgrounds = ['#0079bf', '#d29034', '#89609e', '#00aecc', '#838c91', '#F1813A', '#B86BBF', '#b2d8d8']

	async function handleSubmit(event) {
		event.preventDefault()
		const newBoard = await addBoard(
			boardService.getEmptyBoard(boardTitle, { backgroundColor: boardBackgroundColor, backgroundImage: boardBackgroundImage })
		)
		onCloseModal()
		navigate(`/board/${newBoard._id}`)
	}

	const setBoardBackground = (background, type) => {
		setBackgroundType(type);
		if (type === 'color') {
			setBoardBackgroundColor(background)
		} else if (type === 'image') {
			setBoardBackgroundImage(background)
		}
	}

	useEffect(() => {
		const fetchUnsplashImages = async () => {
			const images = await unsplashService.searchPhotos('nature', 1, 4)
			setUnsplashImages(images)
		}
		fetchUnsplashImages()
	}, [])

	const isAllow = !boardTitle ? 'not-allowed' : ''

	return (
		<section className='create-board-content'>
			{/* Board Preview */}
			<div
				className='board-preview'
				style={
					backgroundType === 'color'
						? { backgroundColor: boardBackgroundColor }
						: {
							backgroundImage: `url(${boardBackgroundImage})`, // Change this line
							backgroundSize: 'cover',
							backgroundPosition: 'center',
							backgroundRepeat: 'no-repeat'
						}
				}
			>
				<img src='https://a.trellocdn.com/prgb/assets/14cda5dc635d1f13bc48.svg' />
			</div>

			{/* Board Creation Form */}
			<form onSubmit={handleSubmit}>
				<label htmlFor='boardBackground' className='workspace-text-style'>
					Background
				</label>
				<div id='boardBackground' className='color-selector'>
					{backgrounds.map((background) => (
						<div
							key={background}
							className='color-option'
							style={{ backgroundColor: background }}
							onClick={() => setBoardBackground(background, 'color')}
						></div>
					))}
				</div>
				<div id='unsplashImages' className='image-selector'>
					{unsplashImages.map((image) => (
						<div
							key={image.id}
							className='image-option'
							onClick={() => setBoardBackground(image.urls.full, 'image')}
						>
							<img src={image.urls.small} alt={image.description} />
						</div>
					))}
				</div>

				<label className='workspace-text-style' htmlFor='boardTitle'>
					Title
				</label>
				<input
					id='boardTitle'
					className='workspace-board-input'
					type='text'
					value={boardTitle}
					onChange={(e) => setBoardTitle(e.target.value)}
					required
				/>
				{!boardTitle && (
					<p
						className='workspace-text-style'
						style={{ fontWeight: 400, fontSize: '14px' }}
					>
						👋 Board title is required
					</p>
				)}

				<button
					style={{ cursor: isAllow }}
					className='workspace-create-btn'
					type='submit'
				>
					Create Board
				</button>
			</form>
		</section>
	)
}
