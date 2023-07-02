/*
  Warnings:

  - You are about to drop the column `content` on the `Comment` table. All the data in the column will be lost.
  - You are about to drop the column `published` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `Post` table. All the data in the column will be lost.
  - Added the required column `description` to the `Comment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Comment" DROP COLUMN "content",
ADD COLUMN     "description" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Post" DROP COLUMN "published",
DROP COLUMN "title",
ADD COLUMN     "description" TEXT NOT NULL;