"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeORMConfig = void 0;
exports.typeORMConfig = {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    entities: [__dirname + '/../**/*.entity.{js,ts}'],
    synchronize: false,
};
//# sourceMappingURL=typeorm.config.js.map