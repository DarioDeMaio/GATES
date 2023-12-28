-- CreateTable
CREATE TABLE "Tipologia" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "tipo" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Dispositivo" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "connectionString" TEXT NOT NULL,
    "matricola" TEXT NOT NULL,
    "tipologiaId" INTEGER NOT NULL,
    CONSTRAINT "Dispositivo_tipologiaId_fkey" FOREIGN KEY ("tipologiaId") REFERENCES "Tipologia" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Dispositivo_matricola_key" ON "Dispositivo"("matricola");
