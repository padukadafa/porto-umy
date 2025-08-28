/*
  Warnings:

  - You are about to drop the column `imageUrl` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `link` on the `Project` table. All the data in the column will be lost.
  - Added the required column `category` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `duration` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fullDescription` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `icon` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `team` to the `Project` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Project" DROP COLUMN "imageUrl",
DROP COLUMN "link",
ADD COLUMN     "category" TEXT NOT NULL,
ADD COLUMN     "challenges" TEXT[],
ADD COLUMN     "demo" TEXT,
ADD COLUMN     "duration" TEXT NOT NULL,
ADD COLUMN     "features" TEXT[],
ADD COLUMN     "fullDescription" TEXT NOT NULL,
ADD COLUMN     "github" TEXT,
ADD COLUMN     "icon" TEXT NOT NULL,
ADD COLUMN     "images" TEXT[],
ADD COLUMN     "objectives" TEXT[],
ADD COLUMN     "published" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "rating" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "results" TEXT[],
ADD COLUMN     "solutions" TEXT[],
ADD COLUMN     "status" TEXT NOT NULL,
ADD COLUMN     "team" TEXT NOT NULL,
ADD COLUMN     "technologies" TEXT[],
ADD COLUMN     "testimonial" JSONB;
