-- DropForeignKey
ALTER TABLE "character" DROP CONSTRAINT "character_photoId_fkey";

-- DropForeignKey
ALTER TABLE "score" DROP CONSTRAINT "score_photoId_fkey";

-- AlterTable
ALTER TABLE "character" ALTER COLUMN "positionX" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "positionY" SET DATA TYPE DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "score" ALTER COLUMN "time" SET DATA TYPE DOUBLE PRECISION;

-- AddForeignKey
ALTER TABLE "character" ADD CONSTRAINT "character_photoId_fkey" FOREIGN KEY ("photoId") REFERENCES "Photo"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "score" ADD CONSTRAINT "score_photoId_fkey" FOREIGN KEY ("photoId") REFERENCES "Photo"("id") ON DELETE CASCADE ON UPDATE CASCADE;
