/*
  Warnings:

  - You are about to drop the column `createdBy` on the `AIOutput` table. All the data in the column will be lost.
  - The `createdAt` column on the `AIOutput` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `authorId` to the `AIOutput` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "AIOutput" DROP COLUMN "createdBy",
ADD COLUMN     "authorId" TEXT NOT NULL,
DROP COLUMN "createdAt",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "profileImageUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "AIOutput" ADD CONSTRAINT "AIOutput_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
