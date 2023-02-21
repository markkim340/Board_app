"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BoardStatusValidationPipe = void 0;
const board_status_enum_1 = require("../entities/board-status.enum");
const common_1 = require("@nestjs/common");
class BoardStatusValidationPipe {
    constructor() {
        this.StatusOptions = [board_status_enum_1.BoardStatus.PRIVATE, board_status_enum_1.BoardStatus.PUBLIC];
    }
    transform(value, metadata) {
        const status = value.status.toUpperCase();
        if (!this.isStatusValid(status)) {
            throw new common_1.BadRequestException(`${value.status} isn't in the Status`);
        }
        value.status = status;
        return value;
    }
    isStatusValid(status) {
        const index = this.StatusOptions.indexOf(status);
        return index !== -1;
    }
}
exports.BoardStatusValidationPipe = BoardStatusValidationPipe;
//# sourceMappingURL=board-status-validation.pipe.js.map