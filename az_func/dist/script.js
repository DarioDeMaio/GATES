"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        let i = 0;
        const d = yield prisma.dispositivo.create({
            data: {
                matricola: "125878489654894769adada",
                connectionString: "cs",
            },
        });
        const a = yield prisma.aria.create({
            data: {
                idDispositivo: d.id,
            },
        });
        for (let month = 1; month <= 12; month++) {
            for (let j = 0; j < 10; j++) {
                const data = new Date(`2024-${month.toString().padStart(2, '0')}-${(j + 1).toString().padStart(2, '0')}T18:25:26.216Z`);
                const misurazione = yield prisma.misurazioniAria.create({
                    data: {
                        cov: 22,
                        gas: 55,
                        dispId: 14,
                        data: data,
                    },
                });
                console.log(misurazione);
            }
        }
    });
}
main()
    .then(() => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma.$disconnect();
}))
    .catch((e) => __awaiter(void 0, void 0, void 0, function* () {
    console.error(e);
    yield prisma.$disconnect();
    process.exit(1);
}));
//# sourceMappingURL=script.js.map