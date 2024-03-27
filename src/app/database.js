import {PrismaClient} from "@prisma/client";

import {logger} from "./logging.js";

// objek instance dari Prisma Client untuk berinteraksi dengan database dalam aplikasi Node.js
const prismaClient = new PrismaClient({
    // Konfigurasi log untuk menangkap event
    log: [
        {
            emit: 'event',
            level: 'query',
        },
        {
            emit: 'event',
            level: 'error',
        },
        {
            emit: 'event',
            level: 'info',
        },
        {
            emit: 'event',
            level: 'warn',
        },
    ],
});

// Event listener untuk menangani event
prismaClient.$on('query', (e) => {
    logger.info(e);
});

prismaClient.$on('error', (e) => {
    logger.error(e);
});

prismaClient.$on('info', (e) => {
    logger.info(e);
});

prismaClient.$on('warn', (e) => {
    logger.warn(e);
});

export {
    prismaClient
}