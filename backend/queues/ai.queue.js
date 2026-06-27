import {Queue} from "bullmq"

const aiQueue=new Queue("aiQueue",{
    connection:{
        host:"127.0.0.1",
        port:6379
    }
})

export default aiQueue