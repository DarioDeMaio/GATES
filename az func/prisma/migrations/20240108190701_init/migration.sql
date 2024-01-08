-- CreateTable
CREATE TABLE "Dispositivo" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "connectionString" TEXT NOT NULL,
    "matricola" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Dispositivo_matricola_key" ON "Dispositivo"("matricola");
