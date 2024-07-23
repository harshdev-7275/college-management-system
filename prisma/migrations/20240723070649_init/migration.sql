/*
  Warnings:

  - You are about to drop the column `title` on the `Professor` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[title]` on the table `Subject` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `name` to the `Professor` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Professor" DROP COLUMN "title",
ADD COLUMN     "name" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Subject_title_key" ON "Subject"("title");
