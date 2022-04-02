import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Board } from './board.entity';
import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dto/create-board.dto';

@Controller('boards')
export class BoardsController {
  constructor(private boadsService: BoardsService) {}

  @Get('/:id')
  getBoardById(@Param('id', ParseIntPipe) id: number): Promise<Board> {
    return this.boadsService.getBoardById(id);
  }

  @Delete('/:id')
  deleteBoardById(@Param('id', ParseIntPipe) id: number) {
    return this.boadsService.deleteBoard(id);
  }

  @Get('/')
  getAllBoard(): Promise<Board[]> {
    return this.boadsService.getAllBoard();
  }

  @Post('/')
  @UsePipes(ValidationPipe) // 유효성 체크
  createBoard(@Body() createBoard: CreateBoardDto): Promise<Board> {
    return this.boadsService.createBoard(createBoard);
  }
}
