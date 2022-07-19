import { registerAs } from '@nestjs/config';
import ms from 'ms';
import bytes from 'bytes';

export default registerAs(
    'kafka',
    (): Record<string, any> => ({
        clientId: process.env.KAFKA_CLIENT_ID || 'KAFKA_ACK',
        brokers: process.env.KAFKA_BROKERS
            ? process.env.KAFKA_BROKERS.split(',')
            : ['localhost:9092'],

        // consumer
        consumer: {
            groupId: process.env.KAFKA_CONSUMER_GROUP || 'nestjs.ack',
            sessionTimeout: ms('30s'), // 30s
            rebalanceTimeout: ms('60s'), //60s
            heartbeatInterval: ms('5s'), // 5s

            maxBytesPerPartition: bytes('1mb'), // 1mb
            maxBytes: bytes('5mb'), // 5mb
            maxWaitTimeInMs: ms('5s'), // 5s

            allowAutoTopicCreation: false,
            retry: {
                maxRetryTime: ms('30s'), // 30s
                initialRetryTime: ms('3s'), // 3s
                retries: 8,
            },
        },
        consumerSubscribe: {
            fromBeginning: true,
        },

        // producer
        producer: {
            // optional for kafka v2<
            // createPartitioner: Partitioners.LegacyPartitioner,
            transactionTimeout: ms('60s'), //60s
            allowAutoTopicCreation: false,
            retry: {
                maxRetryTime: ms('30s'), // 30s
                initialRetryTime: ms('3s'), // 3s
                retries: 8,
            },
        },
        producerSend: {
            timeout: ms('10s'), // 10s
        },

        // admin
        admin: {
            clientId: process.env.KAFKA_ADMIN_CLIENT_ID || 'KAFKA_ADMIN_ACK',
            defaultPartition: 3,
        },
    })
);
