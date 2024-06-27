-- CreateTable
CREATE TABLE "AIOutput" (
    "id" SERIAL NOT NULL,
    "formData" TEXT NOT NULL,
    "aiResponse" TEXT NOT NULL,
    "templateSlug" TEXT NOT NULL,
    "createdBy" TEXT NOT NULL,
    "createdAt" TEXT NOT NULL,

    CONSTRAINT "AIOutput_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserSubscription" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "userName" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL,
    "paymentId" TEXT NOT NULL,
    "joinDate" TEXT NOT NULL,

    CONSTRAINT "UserSubscription_pkey" PRIMARY KEY ("id")
);
