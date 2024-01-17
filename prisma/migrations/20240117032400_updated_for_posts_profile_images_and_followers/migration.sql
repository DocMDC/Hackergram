-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_createdById_fkey";

-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "likedById" TEXT,
ADD COLUMN     "postImage" TEXT,
ALTER COLUMN "createdById" DROP NOT NULL;

-- CreateTable
CREATE TABLE "_Follow" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_Follow_AB_unique" ON "_Follow"("A", "B");

-- CreateIndex
CREATE INDEX "_Follow_B_index" ON "_Follow"("B");

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_likedById_fkey" FOREIGN KEY ("likedById") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Follow" ADD CONSTRAINT "_Follow_A_fkey" FOREIGN KEY ("A") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Follow" ADD CONSTRAINT "_Follow_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
