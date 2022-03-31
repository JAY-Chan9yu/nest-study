import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { isEmpty, isNotEmpty } from 'class-validator';
import { Board, BoardStatus } from './boards.models';
import { BoardsService } from './boards.service';
import { createBoardDto } from './dto/create-board.dto';

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
    const board = this.boadsService.getBoardById(id);
    if (!board) {
      throw new NotFoundException(`Can not find Board with id ${id}`);
    }
    return board;
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
  updateeBoard(@Param('id') id: string, @Body('stuats') status: BoardStatus) {
    return this.boadsService.updateBoardStatus(id, status);
  }
}
