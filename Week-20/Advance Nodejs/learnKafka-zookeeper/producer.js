import { kafka } from './client.js'

async function init() {
    const producer = kafka.producer();

    try {
        console.log('connecting to producer...')
        await producer.connect();
        console.log('producer connected successfully')

        await producer.send({
            topic: "rider-updates",
            messages: [
                {
                    key: 'location-update',
                    value: JSON.stringify({name: 'Tony Stark', loc: 'south'}),
                },
            ],
        });
    } finally {
        await producer.disconnect();
        console.log("Producer disconnected...")
    }
}

init().catch((error) => {
    console.error("Failed to produce Kafka message:", error);
    process.exitCode = 1;
});