import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { Board, BoardStatus } from './boards.models';
import { BoardsService } from './boards.service';
import { createBoardDto } from './dto/create-board.dto';

@Controller('boards')
export class BoardsController {
  constructor(private boadsService: BoardsService) {}

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
  createBoard(@Body() createBoardDto: createBoardDto): Board {
    return this.boadsService.createBoard(createBoardDto);
  }

  @Patch('/:id/status')
  updateeBoard(@Param('id') id: string, @Body('stuats') status: BoardStatus) {
    return this.boadsService.updateBoardStatus(id, status);
  }
}
