import { Worker } from "bullmq";

const worker = new Worker(
    "aiQueue",
    async (job) => {

        console.log("--------------------------------");
        console.log("Processing Job");
        console.log("Job Name:", job.name);
        console.log("Job Data:", job.data);
        console.log("Job Completed");
        console.log("--------------------------------");

    },
    {
        connection: {
            host: "127.0.0.1",
            port: 6379,
        },
    }
);

console.log("AI Worker Started...");