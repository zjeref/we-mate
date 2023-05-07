import React, { useEffect, useState } from 'react'
import axios from 'axios';
import addImg from '../../assets/add-img.png'
import Cookies from 'js-cookie';

// useEffect(() => {
//     const token = Cookies.get('authToken');
//     const headers = { 'Authorization': `Bearer ${token}` }
//     axios.get(`${process.env.REACT_APP_API_URL}/prefer/`, { headers })
//         .then(async (res) => {
//             if (res.data.photoes != null) {
//                 const newImages = [...images];
//                 const newFileImage = [...fileImage];
//                 for (let i = 0; i < res.data.photoes.length; i++) {
//                     const photo = res.data.photoes[i];
//                     const nullIndex = newImages.findIndex((image) => image === null);
//                     if (nullIndex !== -1) {
//                         newImages[nullIndex] = photo;
//                         newFileImage[nullIndex] = await urlToFile(photo, `my-image${i}.jpg`, 'image/jpeg');
//                         setImages(newImages);
//                         setFileImage(newFileImage);
//                     } else {
//                         console.log("No more empty slots in the images array");
//                     }
//                 }
//             }
//         })
// }, [])

const Photos = ({ photosData }) => {
    const [isLoading, setIsLoading] = useState(false);

    const [images, setImages] = useState([null, null, null, null, null, null]);
    const [fileImage, setFileImage] = useState([null, null, null, null, null, null]);

    useEffect(() => {
        if (photosData) {
            const newImages = [...images];
            const newFileImage = [...fileImage];
            for (let i = 0; i < photosData.length; i++) {
                const photo = photosData[i];
                const nullIndex = newImages.findIndex((image) => image === null);
                if (nullIndex !== -1) {
                    newImages[nullIndex] = photo;
                    newFileImage[nullIndex] = urlToFile(photo, `my-image${i}.jpg`, 'image/jpeg');
                } else {
                    console.log("No more empty slots in the images array");
                    break;
                }
            }
            setImages(newImages);
            setFileImage(newFileImage);
        }
    }, [photosData]);

    async function urlToFile(url, filename, mimeType) {
        const res = await fetch(url);
        const blob = await res.blob();
        return new File([blob], filename, { type: mimeType });
    }

    function handleImageClick() {
        const input = document.createElement("input");
        input.type = "file";
        input.accept = "image/*";
        input.addEventListener("change", () => {
            const file = input.files[0];
            if (file) {
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.addEventListener("load", () => {
                    const newImages = [...images];
                    const newFileImage = [...fileImage];
                    const nullIndex = newImages.findIndex((image) => image === null);
                    if (nullIndex !== -1) {
                        newImages[nullIndex] = reader.result;
                        newFileImage[nullIndex] = file;
                        setImages(newImages);
                        setFileImage(newFileImage);
                    } else {
                        console.log("No more empty slots in the images array");
                    }
                });
            }
        });
        input.click();
    }

    function removeImage(e, index) {
        e.stopPropagation();
        const newImages = [...images];
        const newFileImages = [...fileImage]; // create a new copy of fileImage array
        newImages[index] = null;
        newFileImages[index] = null; // remove the corresponding file from fileImage array
        setImages(newImages);
        setFileImage(newFileImages);
    }


    async function handleImageSubmit() {
        setIsLoading(true);
        const token = Cookies.get('authToken');
        const headers = { 'Content-Type': 'multipart/form-data', 'Authorization': `Bearer ${token}` }
        const formData = new FormData();
        console.log(fileImage)
        fileImage.forEach((file, index) => {
            if (file !== null) {
                formData.append('myImage', file);
            }
        });

        await axios.put(`${process.env.REACT_APP_API_URL}/prefer/images`, formData, { headers })
            .then(res => console.log("photos saved"))
            .catch(err => console.error(err))

        setIsLoading(false);
    }



    // console.log(currentUser)
    return (
        <div className="w-full max-w-6xl flex flex-col p-2">
            <div className="space-y-4">
                <div className="w-full flex justify-between">
                    <h1 className="text-4xl text-blackk font-bold">Photos</h1>
                    <button onClick={handleImageSubmit} className={`btn font-semibold bg-secondary ${isLoading ? 'opacity-60' : ""}`} disabled={isLoading}>{!isLoading ? "Save" : "Saving..."}</button>
                </div>
                <p >Pick some that shows the true you</p>
            </div>

            <div className="grid grid-cols-8 grid-rows-6 gap-4 my-8 h-[800px]">

                <div className="col-span-3 row-span-4 img-grid" onClick={() => handleImageClick()} >
                    {images[0] ? <>
                        <img src={images[0]} alt="" />
                        <button className="img-btn" onClick={(e) => removeImage(e, 0)}>&times;</button>
                    </>
                        : <img src={addImg} alt="" className='w-20' />}
                    <p className="absolute left-5 bottom-6 px-4 py-1 bg-slate-500 text-white text-xs rounded-full">Main</p>
                </div>
                <div className="col-span-2 row-span-3 img-grid" onClick={() => handleImageClick()}>

                    {images[1] ? <>
                        <img src={images[1]} alt="" />
                        <button className="img-btn" onClick={(e) => removeImage(e, 1)}>&times;</button>
                    </>
                        : <img src={addImg} alt="" className='w-20' />}
                </div>
                <div className='col-span-3 row-span-3 img-grid ' onClick={() => handleImageClick()}>
                    {images[2] ? <>
                        <img src={images[2]} alt="" />
                        <button className="img-btn" onClick={(e) => removeImage(e, 2)}>&times;</button>
                    </>
                        : <img src={addImg} alt="" className='w-20' />}
                </div>
                <div className='col-span-2 row-span-3 img-grid' onClick={() => handleImageClick()}>
                    {images[4] ? <>
                        <img src={images[4]} alt="" />
                        <button className="img-btn" onClick={(e) => removeImage(e, 4)}>&times;</button>
                    </>
                        : <img src={addImg} alt="" className='w-20' />}
                </div>
                <div className='col-span-3 row-span-3 img-grid' onClick={() => handleImageClick()}>
                    {images[5] ? <>
                        <img src={images[5]} alt="" />
                        <button className="img-btn" onClick={(e) => removeImage(e, 5)}>&times;</button>
                    </>
                        : <img src={addImg} alt="" className='w-20' />}
                </div>
                <div className='col-span-3 row-span-2 img-grid' onClick={() => handleImageClick()}>
                    {images[3] ? <>
                        <img src={images[3]} alt="" />
                        <button className="img-btn" onClick={(e) => removeImage(e, 3)}>&times;</button>
                    </>
                        : <img src={addImg} alt="" className='w-20' />}
                </div>
            </div>
        </div>
    )
}

export default Photos
