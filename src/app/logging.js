//  library Node.js untuk melakukan logging
import winston from 'winston';

// Objek logger untuk mencatat pesan-pesan log dalam aplikasi.
const logger = winston.createLogger({
    // Mencatat pesan-pesan dengan tingkat 'info' atau lebih tinggi.
    level: 'info',
    // Menentukan format dari pesan log yang akan dihasilkan
    format: winston.format.json(),
    // menentukan transport yang akan digunakan untuk mengirimkan pesan-pesan log
    transports: [
        new winston.transports.Console({}),
    ]
})

export {
    logger
}