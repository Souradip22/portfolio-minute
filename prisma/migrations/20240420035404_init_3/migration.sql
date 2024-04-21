/*
  Warnings:

  - You are about to drop the column `userId` on the `EducationWithExperience` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Skill` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `SocialLink` table. All the data in the column will be lost.
  - You are about to drop the column `bio` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `completedProjects` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `experience` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `font` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `fullName` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `isOpenToWork` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `phone` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `shortname` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `theme` on the `User` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "EducationWithExperience" DROP CONSTRAINT "EducationWithExperience_userId_fkey";

-- DropForeignKey
ALTER TABLE "Project" DROP CONSTRAINT "Project_userId_fkey";

-- DropForeignKey
ALTER TABLE "Skill" DROP CONSTRAINT "Skill_userId_fkey";

-- DropForeignKey
ALTER TABLE "SocialLink" DROP CONSTRAINT "SocialLink_userId_fkey";

-- AlterTable
ALTER TABLE "EducationWithExperience" DROP COLUMN "userId",
ADD COLUMN     "profileId" TEXT;

-- AlterTable
ALTER TABLE "Project" DROP COLUMN "userId",
ADD COLUMN     "profileId" TEXT;

-- AlterTable
ALTER TABLE "Skill" DROP COLUMN "userId",
ADD COLUMN     "profileId" TEXT;

-- AlterTable
ALTER TABLE "SocialLink" DROP COLUMN "userId",
ADD COLUMN     "profileId" TEXT;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "bio",
DROP COLUMN "completedProjects",
DROP COLUMN "experience",
DROP COLUMN "font",
DROP COLUMN "fullName",
DROP COLUMN "isOpenToWork",
DROP COLUMN "phone",
DROP COLUMN "shortname",
DROP COLUMN "theme";

-- CreateTable
CREATE TABLE "Profile" (
    "id" TEXT NOT NULL,
    "email" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "font" TEXT,
    "theme" TEXT,
    "shortname" TEXT,
    "fullName" TEXT,
    "bio" TEXT,
    "experience" TEXT,
    "completedProjects" TEXT,
    "isOpenToWork" BOOLEAN,
    "phone" TEXT,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Profile_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Profile_email_key" ON "Profile"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Profile_userId_key" ON "Profile"("userId");

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Skill" ADD CONSTRAINT "Skill_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SocialLink" ADD CONSTRAINT "SocialLink_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EducationWithExperience" ADD CONSTRAINT "EducationWithExperience_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile"("id") ON DELETE SET NULL ON UPDATE CASCADE;
