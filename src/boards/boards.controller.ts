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
import { GetUser } from 'src/auth/deps/get-user.deps';
import { User } from 'src/auth/user.entity';

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

  @Get('/user/own')
  getMyBoards(@GetUser() user: User): Promise<Board[]> {
    return this.boadsService.getMyAllBoards(user);
  }

  @Post('/')
  @UsePipes(ValidationPipe) // 유효성 체크
  createBoard(
    @Body() createBoard: CreateBoardDto,
    @GetUser() user: User,
  ): Promise<Board> {
    return this.boadsService.createBoard(createBoard, user);
  }

  @Patch('/:id/status')
  @UsePipes(ValidationPipe) // 유효성 체크
  updateBoardStatus(
    @Param('id') id: number,
    @Body('status', BoardStatusValdationPipe) status: BoardStatus,
  ) {
    this.boadsService.updateBoard(id, status);
  }
}
