/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `UserSubscription` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "UserSubscription_email_key" ON "UserSubscription"("email");
