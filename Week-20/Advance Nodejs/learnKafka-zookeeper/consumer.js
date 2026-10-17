import { kafka } from './client.js'

async function init() {
    const consumer = kafka.consumer({groupId: 'user-1'})
    await consumer.connect();

    await consumer.subscribe({ topics: ["rider-updates"], fromBeginning: true })

    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            console.log(`[${topic}]: PART ${partition}:`, message.value?.toString())
        },
    });
}

init().catch((error) => {
    console.error("Failed to consume Kafka messages:", error);
    process.exitCode = 1;
});