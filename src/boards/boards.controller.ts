import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Board, BoardStatus } from './boards.models';
import { BoardsService } from './boards.service';
import { createBoardDto } from './dto/create-board.dto';
import { BoardStatusValdationPipe } from './pipes/board-status-valdiation.pipe';

@Controller('boards')
export class BoardsController {
  constructor(private boadsService: BoardsService) {}

  // Controller 클래스 내부 함수들을 Handler라고 한다.
  @Get('/')
  getAllBoards(): Board[] {
    return this.boadsService.getAllBoalds();
  }

  @Get('/:id')
  getBoardById(@Param('id') id: string): Board {
    return this.boadsService.getBoardById(id);
  }

  @Delete('/:id')
  deleteBoardById(@Param('id') id: string): void {
    this.boadsService.deleteBoardById(id);
  }

  @Post('/')
  @UsePipes(ValidationPipe) // 유효성 체크
  createBoard(@Body() createBoard: createBoardDto): Board {
    return this.boadsService.createBoard(createBoard);
  }

  @Patch('/:id/status')
  updateeBoard(
    @Param('id') id: string,
    @Body('status', BoardStatusValdationPipe) status: BoardStatus,
  ) {
    return this.boadsService.updateBoardStatus(id, status);
  }
}
