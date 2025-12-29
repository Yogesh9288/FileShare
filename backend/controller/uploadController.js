import fileModel from "../model/fileModel.js";
import dotenv from 'dotenv'
export const uploadController=async (req,res)=>{
    try {
        // console.log("from upload controller");
        // console.log(req.file);
        dotenv.config();
        const backendUrl=process.env.BACKEND_URL;
        const fileObject={
            path:req.file.path,
            name:req.file.originalname,
        }
        const file= await fileModel.create(fileObject);
        console.log(file);
        return res.status(200).json({path:`${backendUrl}/files/${file._id}`})
    } catch (error) {
        return res.stauts(500).json({message:error.message});
    }
}

export const downloadController=async (req,res)=>{
    try {
        const file=await fileModel.findById(req.params.fileId);
        if(!file){
            return res.status(404).json({message:"File not found"});
        }
        res.download(file.path,file.name);
    } catch (error) {
        
    }
}