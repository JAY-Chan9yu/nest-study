import { Injectable, NotFoundException } from '@nestjs/common';
import { Board, BoardStatus } from './boards.models';
import { v1 as uuid } from 'uuid';
import { createBoardDto } from './dto/create-board.dto';

@Injectable()
export class BoardsService {
  private boards: Board[] = [];

  getAllBoalds(): Board[] {
    return this.boards;
  }

  getBoardById(id: string): Board {
    const board = this.boards.find((board) => board.id === id);
    if (!board) {
      throw new NotFoundException(`Can not find Board with id ${id}`);
    }
    return board;
  }

  deleteBoardById(id: string): void {
    const foundBoard = this.getBoardById(id);
    this.boards = this.boards.filter((board) => board.id === foundBoard.id);
  }

  createBoard(createBoardDto: createBoardDto) {
    const { title, description } = createBoardDto;
    const board: Board = {
      id: uuid(),
      title: title,
      description: description,
      status: BoardStatus.PUBLIC,
    };

    this.boards.push(board);
    return board;
  }

  updateBoardStatus(id: string, status: BoardStatus): Board {
    const board = this.getBoardById(id);
    board.status = status;
    return board;
  }
}
