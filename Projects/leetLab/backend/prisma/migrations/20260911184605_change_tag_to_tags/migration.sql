/*
  Warnings:

  - You are about to drop the column `tag` on the `Problem` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Problem" DROP COLUMN "tag",
ADD COLUMN     "tags" TEXT[];
