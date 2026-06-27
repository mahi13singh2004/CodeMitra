import aiQueue from "../queues/ai.queue.js"

export const testQueue=async(req,res)=>{
    try {
        const {message}=req.body 
        await aiQueue.add("test-job",{message})

        return res.status(200).json({
            success:true,
            message:"Job added successfully"
        })
    } 
    catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message
        })    
    }
}