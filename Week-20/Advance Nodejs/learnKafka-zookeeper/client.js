import { Kafka } from "kafkajs"

export const kafka = new Kafka({
    brokers: ['192.168.31.217:9092']
});