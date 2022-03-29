import { Body, Controller, Get, Post } from '@nestjs/common';
import { Board } from './boards.models';
import { BoardsService } from './boards.service';

@Controller('boards')
export class BoardsController {
  constructor(private boadsService: BoardsService) {}

  @Get('/')
  getAllBoards(): Board[] {
    return this.boadsService.getAllBoalds();
  }

  @Post('/')
  createBoard(
    @Body('title') title: string,
    @Body('description') description: string,
  ): Board {
    return this.boadsService.createBoard(title, description);
  }
}
