import React, { useEffect, useState } from 'react'
import addImg from '../../assets/add-img.png'

const Photos = ({ user }) => {
    const [currentUser, setCurrentUser] = useState(null);
    useEffect(() => {
        setCurrentUser(user)
    })

    const [images, setImages] = useState([
        currentUser?.avatar || null, // First image is the user's avatar (if available)
        null, null, null, null, null
    ]);

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
                    const nullIndex = newImages.findIndex((image) => image === null);
                    if (nullIndex !== -1) {
                        newImages[nullIndex] = reader.result;
                        setImages(newImages);
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
        newImages[index] = null;
        setImages(newImages);
    }

    // console.log(currentUser)
    return (
        <div className="w-full max-w-6xl flex flex-col p-2">
            <div className="space-y-4">
                <h1 className="text-4xl font-bold">Photos and videos</h1>
                <p >Pick some that shows the true you</p>
            </div>

            <div className="grid grid-cols-8 grid-rows-6 gap-4 my-8">
                <div className="col-span-3 row-span-4 img-grid" onClick={() => handleImageClick(0)}>
                    {currentUser?.avatar ? <img src={currentUser?.avatar} alt="" className='' />
                        : <img src={addImg} alt="" className='w-20' />
                    }

                </div>
                <div className="col-span-2 row-span-3 img-grid" onClick={() => handleImageClick(1)}>
                    {images[1] ? <>
                        <img src={images[1]} alt="" />
                        <button className="img-btn" onClick={(e) => removeImage(e, 1)}>&times;</button>
                    </>
                        : <img src={addImg} alt="" className='w-20' />}
                </div>
                <div className='col-span-3 row-span-3 img-grid ' onClick={() => handleImageClick(2)}>
                    {images[2] ? <>
                        <img src={images[2]} alt="" />
                        <button className="img-btn" onClick={(e) => removeImage(e, 2)}>&times;</button>
                    </>
                        : <img src={addImg} alt="" className='w-20' />}
                </div>
                <div className='col-span-2 row-span-3 img-grid' onClick={() => handleImageClick(3)}>
                    {images[3] ? <>
                        <img src={images[3]} alt="" />
                        <button className="img-btn" onClick={(e) => removeImage(e, 3)}>&times;</button>
                    </>
                        : <img src={addImg} alt="" className='w-20' />}
                </div>
                <div className='col-span-3 row-span-3 img-grid' onClick={() => handleImageClick(4)}>
                    {images[4] ? <>
                        <img src={images[4]} alt="" />
                        <button className="img-btn" onClick={(e) => removeImage(e, 4)}>&times;</button>
                    </>
                        : <img src={addImg} alt="" className='w-20' />}
                </div>
                <div className='col-span-3 row-span-2 img-grid' onClick={() => handleImageClick(5)}>
                    {images[5] ? <>
                        <img src={images[5]} alt="" />
                        <button className="img-btn" onClick={(e) => removeImage(e, 5)}>&times;</button>
                    </>
                        : <img src={addImg} alt="" className='w-20' />}
                </div>
            </div>
        </div>
    )
}

export default Photos
