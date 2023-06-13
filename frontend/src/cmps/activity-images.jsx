import { useEffect, useState } from "react";
import { unsplashService } from "../services/unsplash.service";

export function ActivityImages() {
    const [imagesObj, setImagesObj] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            const images = await unsplashService.searchPhotos('fantasy', 1, 6);
            setImagesObj(images);
        };

        fetchData();
    }, []);

    console.log('images', imagesObj);

    return (
        <section>
            {imagesObj.map((image) => {
                return <div>
                    <img src={image.urls.small}/>
                </div>
            })}
        </section>
    );
}
