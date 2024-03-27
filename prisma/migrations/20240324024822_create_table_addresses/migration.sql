-- CreateTable
CREATE TABLE `addresses` (
    `id_address` INTEGER NOT NULL AUTO_INCREMENT,
    `street` VARCHAR(255) NULL,
    `city` VARCHAR(100) NULL,
    `province` VARCHAR(100) NULL,
    `country` VARCHAR(100) NOT NULL,
    `postal_code` CHAR(10) NOT NULL,
    `id_contact` INTEGER NOT NULL,

    PRIMARY KEY (`id_address`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `addresses` ADD CONSTRAINT `addresses_id_contact_fkey` FOREIGN KEY (`id_contact`) REFERENCES `contacts`(`id_contact`) ON DELETE RESTRICT ON UPDATE CASCADE;
