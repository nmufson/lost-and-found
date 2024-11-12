/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `Photo` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Photo" ADD COLUMN     "slug" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Photo_slug_key" ON "Photo"("slug");
