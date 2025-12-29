import dotenv from 'dotenv';
export const uploadFile=async (fileData)=>{
    try {
        dotenv.config();
        const backendUrl=process.env.VITE_BACKEND_URL;
        const response=await fetch(`${backendUrl}/upload`,{
            method:"POST",
            body:fileData
        });
        return response.json();
    } catch (error) {
        console.log("Error while uploading file",error.message);
    }
}