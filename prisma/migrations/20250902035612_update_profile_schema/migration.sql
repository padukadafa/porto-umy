/*
  Warnings:

  - You are about to drop the `SocialMedia` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE "public"."Profile" ADD COLUMN     "availability" TEXT DEFAULT 'available',
ADD COLUMN     "experience" TEXT,
ADD COLUMN     "github" TEXT,
ADD COLUMN     "languages" TEXT[],
ADD COLUMN     "linkedin" TEXT;

-- DropTable
DROP TABLE "public"."SocialMedia";
