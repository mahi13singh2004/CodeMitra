export const healthCheck=(req,res)=>{
    try {
        return res.status(200).json({success:true,message:"Running"})
    } 
    catch (error) {
        return res.status(500).json({success:false, message:error.message})
    }
}