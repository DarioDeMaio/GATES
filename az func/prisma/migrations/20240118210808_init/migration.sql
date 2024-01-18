-- CreateTable
CREATE TABLE "Dispositivo" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "connectionString" TEXT NOT NULL,
    "matricola" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Acqua" (
    "idDispositivo" INTEGER NOT NULL,
    CONSTRAINT "Acqua_idDispositivo_fkey" FOREIGN KEY ("idDispositivo") REFERENCES "Dispositivo" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "MisurazioniAcqua" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "pH" REAL NOT NULL,
    "metalli" REAL NOT NULL,
    "dispId" INTEGER NOT NULL,
    CONSTRAINT "MisurazioniAcqua_dispId_fkey" FOREIGN KEY ("dispId") REFERENCES "Acqua" ("idDispositivo") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Aria" (
    "idDispositivo" INTEGER NOT NULL,
    CONSTRAINT "Aria_idDispositivo_fkey" FOREIGN KEY ("idDispositivo") REFERENCES "Dispositivo" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "MisurazioniAria" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "cov" REAL NOT NULL,
    "gas" REAL NOT NULL,
    "dispId" INTEGER NOT NULL,
    CONSTRAINT "MisurazioniAria_dispId_fkey" FOREIGN KEY ("dispId") REFERENCES "Aria" ("idDispositivo") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Dispositivo_matricola_key" ON "Dispositivo"("matricola");

-- CreateIndex
CREATE UNIQUE INDEX "Acqua_idDispositivo_key" ON "Acqua"("idDispositivo");

-- CreateIndex
CREATE UNIQUE INDEX "Aria_idDispositivo_key" ON "Aria"("idDispositivo");
