/*
  Warnings:

  - You are about to drop the column `iv` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `ChatRoom` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ChatRoomMessage` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserChatRoom` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserVertexChatRoom` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `VertexChatRoom` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `VertexChatRoomExample` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `VertexChatRoomMessage` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ChatRoomMessage" DROP CONSTRAINT "ChatRoomMessage_chatRoomId_fkey";

-- DropForeignKey
ALTER TABLE "ChatRoomMessage" DROP CONSTRAINT "ChatRoomMessage_userId_fkey";

-- DropForeignKey
ALTER TABLE "UserChatRoom" DROP CONSTRAINT "UserChatRoom_chatRoomId_fkey";

-- DropForeignKey
ALTER TABLE "UserChatRoom" DROP CONSTRAINT "UserChatRoom_userId_fkey";

-- DropForeignKey
ALTER TABLE "UserVertexChatRoom" DROP CONSTRAINT "UserVertexChatRoom_userId_fkey";

-- DropForeignKey
ALTER TABLE "UserVertexChatRoom" DROP CONSTRAINT "UserVertexChatRoom_vertexChatRoomId_fkey";

-- DropForeignKey
ALTER TABLE "VertexChatRoomExample" DROP CONSTRAINT "VertexChatRoomExample_vertexChatRoomId_fkey";

-- DropForeignKey
ALTER TABLE "VertexChatRoomMessage" DROP CONSTRAINT "VertexChatRoomMessage_vertexChatRoomId_fkey";

-- DropIndex
DROP INDEX "User_username_idx";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "iv";

-- DropTable
DROP TABLE "ChatRoom";

-- DropTable
DROP TABLE "ChatRoomMessage";

-- DropTable
DROP TABLE "UserChatRoom";

-- DropTable
DROP TABLE "UserVertexChatRoom";

-- DropTable
DROP TABLE "VertexChatRoom";

-- DropTable
DROP TABLE "VertexChatRoomExample";

-- DropTable
DROP TABLE "VertexChatRoomMessage";

-- CreateTable
CREATE TABLE "House" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "address" TEXT,
    "userId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "House_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FixPart" (
    "id" SERIAL NOT NULL,
    "estimateFixTime" TEXT,
    "houseId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FixPart_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Movie" (
    "id" SERIAL NOT NULL,
    "estimatedTime" TEXT,
    "learningTime" TEXT,
    "fixPartId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Movie_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Partner" (
    "id" SERIAL NOT NULL,
    "companyName" TEXT,
    "contactPerson" TEXT,
    "companyAddress" TEXT,
    "companyTel" TEXT,
    "acceptableAreas" TEXT[],
    "houseId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Partner_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Skill" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Skill_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RoomType" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RoomType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tool" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Tool_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserSkill" (
    "userId" INTEGER NOT NULL,
    "skillId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserSkill_pkey" PRIMARY KEY ("userId","skillId")
);

-- CreateTable
CREATE TABLE "RoomTypeFixPart" (
    "roomTypeId" INTEGER NOT NULL,
    "fixPartId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RoomTypeFixPart_pkey" PRIMARY KEY ("roomTypeId","fixPartId")
);

-- CreateTable
CREATE TABLE "MovieSkill" (
    "movieId" INTEGER NOT NULL,
    "skillId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MovieSkill_pkey" PRIMARY KEY ("movieId","skillId")
);

-- CreateTable
CREATE TABLE "MovieTool" (
    "movieId" INTEGER NOT NULL,
    "toolId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MovieTool_pkey" PRIMARY KEY ("movieId","toolId")
);

-- AddForeignKey
ALTER TABLE "House" ADD CONSTRAINT "House_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FixPart" ADD CONSTRAINT "FixPart_houseId_fkey" FOREIGN KEY ("houseId") REFERENCES "House"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Movie" ADD CONSTRAINT "Movie_fixPartId_fkey" FOREIGN KEY ("fixPartId") REFERENCES "FixPart"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Partner" ADD CONSTRAINT "Partner_houseId_fkey" FOREIGN KEY ("houseId") REFERENCES "House"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserSkill" ADD CONSTRAINT "UserSkill_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserSkill" ADD CONSTRAINT "UserSkill_skillId_fkey" FOREIGN KEY ("skillId") REFERENCES "Skill"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RoomTypeFixPart" ADD CONSTRAINT "RoomTypeFixPart_roomTypeId_fkey" FOREIGN KEY ("roomTypeId") REFERENCES "RoomType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RoomTypeFixPart" ADD CONSTRAINT "RoomTypeFixPart_fixPartId_fkey" FOREIGN KEY ("fixPartId") REFERENCES "FixPart"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MovieSkill" ADD CONSTRAINT "MovieSkill_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "Movie"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MovieSkill" ADD CONSTRAINT "MovieSkill_skillId_fkey" FOREIGN KEY ("skillId") REFERENCES "Skill"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MovieTool" ADD CONSTRAINT "MovieTool_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "Movie"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MovieTool" ADD CONSTRAINT "MovieTool_toolId_fkey" FOREIGN KEY ("toolId") REFERENCES "Tool"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
