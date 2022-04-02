/* eslint-disable prettier/prettier */
import { ArgumentMetadata, BadRequestException, PipeTransform } from '@nestjs/common';
import { BoardStatus } from '../boards.models';

export class BoardStatusValdationPipe implements PipeTransform {
  // class 외부에서 접근할 수 있는 변수, 하지만 읽을수 만 있다.
  readonly StatusOption = [
    BoardStatus.PRIVATE,
    BoardStatus.PUBLIC
  ]

  transform(value: any, metadata: ArgumentMetadata) {
    if (!this.isStatusValue(value)) {
      throw new BadRequestException(`${value} is not in the stauts options`)
    }
    return value;
  }

  private isStatusValue(status: any) {
    const isStatusVal = this.StatusOption.indexOf(status);
    return isStatusVal !== -1;
  }
}
