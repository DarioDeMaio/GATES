-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_MisurazioniAcqua" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "pH" REAL NOT NULL,
    "metalli" REAL NOT NULL,
    "data" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dispId" INTEGER NOT NULL,
    CONSTRAINT "MisurazioniAcqua_dispId_fkey" FOREIGN KEY ("dispId") REFERENCES "Acqua" ("idDispositivo") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_MisurazioniAcqua" ("dispId", "id", "metalli", "pH") SELECT "dispId", "id", "metalli", "pH" FROM "MisurazioniAcqua";
DROP TABLE "MisurazioniAcqua";
ALTER TABLE "new_MisurazioniAcqua" RENAME TO "MisurazioniAcqua";
CREATE TABLE "new_MisurazioniAria" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "cov" REAL NOT NULL,
    "gas" REAL NOT NULL,
    "data" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dispId" INTEGER NOT NULL,
    CONSTRAINT "MisurazioniAria_dispId_fkey" FOREIGN KEY ("dispId") REFERENCES "Aria" ("idDispositivo") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_MisurazioniAria" ("cov", "dispId", "gas", "id") SELECT "cov", "dispId", "gas", "id" FROM "MisurazioniAria";
DROP TABLE "MisurazioniAria";
ALTER TABLE "new_MisurazioniAria" RENAME TO "MisurazioniAria";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
