import { useState } from "react";

export default function ImageSlider(props) {
    const images = props.images;
    console.log(images);
    
    //selected omage index state
    const [selectedImage, setSelecteImage] = useState(images[0]);

    return(
        <div className="w-full h-full flex flex-col items-center">
             <img src={selectedImage} alt="Product Image" className="w-full h-[70%] object-cover" />
             <div className="w-full h-[30%] flex justify-center items-center mt-4">
                {
                    images.map((image, index) => {
                        return <img key={index} src={image} alt="product" className={`w-[20%] h-[50%] mr-4 object-cover cursor-pointer ${image==selectedImage && "border border-accent"}`} onClick={
                            ()=>{
                                setSelecteImage(image);
                            }
                        } />
                    })
                }
            </div>
        </div>
    )
}