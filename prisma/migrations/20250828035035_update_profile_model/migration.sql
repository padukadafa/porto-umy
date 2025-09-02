/*
  Warnings:

  - You are about to drop the column `github` on the `Profile` table. All the data in the column will be lost.
  - You are about to drop the column `linkedin` on the `Profile` table. All the data in the column will be lost.
  - You are about to drop the column `twitter` on the `Profile` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."Profile" DROP COLUMN "github",
DROP COLUMN "linkedin",
DROP COLUMN "twitter",
ADD COLUMN     "education" JSONB,
ADD COLUMN     "skills" TEXT[];
