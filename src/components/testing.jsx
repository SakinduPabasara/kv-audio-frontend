
import { useState } from "react";
import mediaUpload from "../utils/mediaUpload";

export default function Testing(){
    const [file, setFile] = useState(null);
    
    function uploadFile(){
        console.log(file.name)
        mediaUpload(file).then((url)=>{
            console.log(url)
        })
    }

    return(
        <div className="w-full h-screen flex flex-col justify-center items-center">
            <input type="file" onChange={(e)=>{setFile(e.target.files[0])}} />
            <button onClick={uploadFile} className="bg-blue-500 text-white px-4 py-2 rounded mt-4">
                Upload
            </button>
        </div>
    );
}


// import { useState } from "react";
//import mediaUpload from "../utils/mediaUpload";

// export default function Testing(){
//     const [file, setFile] = useState(null);
    
//     function uploadFile(){
//         console.log(file.name)
//         mediaUpload(file).then((url)=>{
//             console.log(url)
//         })
//     }

//     return(
//         <div className="w-full h-screen flex flex-col justify-center items-center">
//             <input type="file" onChange={(e)=>{console.log(e.target.files[0])}} />
//             <button onClick={uploadFile} className="bg-blue-500 text-white px-4 py-2 rounded mt-4">
//                 Upload
//             </button>
//         </div>
//     );
// }