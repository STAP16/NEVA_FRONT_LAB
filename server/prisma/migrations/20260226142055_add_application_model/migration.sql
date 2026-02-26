-- CreateTable
CREATE TABLE "Application" (
    "id" SERIAL NOT NULL,
    "type" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "telegram" TEXT NOT NULL,
    "direction" TEXT,
    "projectId" TEXT,
    "phone" TEXT,
    "email" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Application_pkey" PRIMARY KEY ("id")
);
