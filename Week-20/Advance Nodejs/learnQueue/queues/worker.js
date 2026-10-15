import {Worker} from 'bullmq'
import {QueueMap, notificationQueue} from './queue.js'
import { redisConnection } from '../connection.js'

const wait = (e) => new Promise((res) => setTimeout(res, s * 1000));

export const videoProcessingWorker = new Worker(
    QueueMap['VIDEO_PROCESSING_QUEUE'],
    async (job) => {
        console.log(`processing job`, job.id)
        console.log(`Transcoding job`, {url: job.data})
        
        await wait(2);
        console.log(`Transcoding Job Done.....`, {url: job.data})

        await notificationQueue.add(`notification-${job.data.videoURL}`,{notification: `Video has been processed for ${job.data.videoURL}`,
        });
        return true;
    },
    {autorun: false, connection: redisConnection}
);

export const notificationWorker = new Worker(
    QueueMap['NOTIFICATION_QUEUE'],
    async(job) => {
        console.log(`Sending notification: ${job.data.notification}`);
    },
    {
        connection: redisConnection,
        autorun: false,
        concurrency: 1,
        limiter: {
            max: 5,
            duration: 10 * 1000,
        },
    }
);