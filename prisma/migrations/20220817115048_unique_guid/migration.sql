/*
  Warnings:

  - A unique constraint covering the columns `[guid]` on the table `todos` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "todos_guid_key" ON "todos"("guid");
