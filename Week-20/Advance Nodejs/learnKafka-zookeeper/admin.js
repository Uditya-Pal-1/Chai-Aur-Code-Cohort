import { kafka } from "./client.js"

async function init() {
    const admin = kafka.admin();
    console.log("Admin Connecting..");
    await admin.connect();
    console.log("Admin Connected Successfully...")

    console.log("creating Topic [rider-updates]");
    await admin.createTopics({
        topics: [
            {
                topic: 'rider-updates',
                numPartitions: 2,
            },
        ],
    });
    console.log("Topic Created Success [rider-updates]")

    console.log("Disconnecting Admin")
    await admin.disconnect();
}

init().catch((error) => {
    console.error("Failed to initialize Kafka admin:", error);
    process.exitCode = 1;
});