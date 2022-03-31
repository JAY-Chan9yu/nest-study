import { Injectable } from '@nestjs/common';
import { Board, BoardStatus } from './boards.models';
import { v1 as uuid } from 'uuid';
import { createBoardDto } from './dto/create-board.dto';
import { Board } from '../../dist/boards/boards.models';

@Injectable()
export class BoardsService {
  private boards: Board[] = [];

  // 서비스 클래스 내부 함수들을 Handler라고 한다.
  getAllBoalds(): Board[] {
    return this.boards;
  }

  getBoardById(id: string): Board {
    return this.boards.find((board) => board.id === id);
  }

  deleteBoardById(id: string): void {
    this.boards = this.boards.filter((board) => board.id === id);
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
