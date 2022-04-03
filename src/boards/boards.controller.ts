import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { BoardStatus } from './board-status.enum';
import { Board } from './board.entity';
import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardStatusValdationPipe } from './pipes/board-status-valdiation.pipe';
import { AuthGuard } from '@nestjs/passport';

@Controller('boards')
@UseGuards(AuthGuard())
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

  @Patch('/:id/status')
  updateBoardStatus(
    @Param('id') id: number,
    @Body('status', BoardStatusValdationPipe) status: BoardStatus,
  ) {
    this.boadsService.updateBoard(id, status);
  }
}
