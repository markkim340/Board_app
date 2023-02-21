"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const yaml = require("js-yaml");
const path_1 = require("path");
const YAML_CONFIG_PROD = 'production.yaml';
const YAML_CONFIG_DEV = 'development.yaml';
exports.default = () => {
    return yaml.load(process.env.NODE_ENV === 'production'
        ? (0, fs_1.readFileSync)((0, path_1.join)(__dirname, YAML_CONFIG_PROD), 'utf8')
        : (0, fs_1.readFileSync)((0, path_1.join)(__dirname, YAML_CONFIG_DEV), 'utf8'));
};
//# sourceMappingURL=config.js.map