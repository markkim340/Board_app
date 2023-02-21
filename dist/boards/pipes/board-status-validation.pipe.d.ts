import { BoardStatus } from '../entities/board-status.enum';
import { ArgumentMetadata, PipeTransform } from '@nestjs/common';
export declare class BoardStatusValidationPipe implements PipeTransform {
    readonly StatusOptions: BoardStatus[];
    transform(value: any, metadata: ArgumentMetadata): any;
    private isStatusValid;
}
