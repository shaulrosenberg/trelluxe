import { useEffect, useState } from 'react'
import { unsplashService } from '../../services/unsplash.service'
import { useSelector } from 'react-redux'
import { updateBoard } from '../../store/board.actions'

export function ActivityImages() {
   const [imagesObj, setImagesObj] = useState([])
   const board = useSelector(
      (storeState) => storeState.boardModule.selectedBoard
   )

   useEffect(() => {
      const fetchData = async () => {
         const images = await unsplashService.searchPhotos('nature', 2, 8)
         setImagesObj(images)
      }

      fetchData()
   }, [])

   function onImageClick(imgUrl) {
    console.log(imgUrl);
    const { style, ...rest } = board;
    const updatedBoard = {
      ...rest,
      style: {
        ...style,
        backgroundImage: imgUrl,
      },
    };
    updateBoard(updatedBoard);
  }
  

   console.log('images', imagesObj)
   if (!imagesObj) return <div>loading</div>
   return (
      <section className='main-activity-images-section'>
         {imagesObj.map((image) => {
            return (
               <div
                  className='activity-images-container cursor-pointer'
                  key={image.id}
                  onClick={() => onImageClick(image.urls.full)}
               >
                  <img src={image.urls.small} />
               </div>
            )
         })}
      </section>
   )
}
