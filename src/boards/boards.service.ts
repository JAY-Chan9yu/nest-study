import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardRepository } from './board.repository';
import { Board } from './board.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { BoardStatus } from './board-status.enum';

@Injectable()
export class BoardsService {
  // constructor(private readonly boardRepository: BoardRepository) {}
  constructor(
    @InjectRepository(BoardRepository)
    private boardRepository: BoardRepository,
  ) {}

  async getBoardById(id: number): Promise<Board> {
    const found = await this.boardRepository.findOne(id);
    if (!found) {
      throw new NotFoundException(`Can't find Board with id ${id}`);
    }
    return found;
  }

  async getAllBoard(): Promise<Board[]> {
    const found = await this.boardRepository.find();
    if (!found) {
      throw new NotFoundException(`Can't find Boards`);
    }
    return found;
  }

  async createBoard(createBoardDto: CreateBoardDto): Promise<Board> {
    return await this.boardRepository.createBoard(createBoardDto);
  }

  async deleteBoard(id: number) {
    const result = await this.boardRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('Board not found(no delete)');
    }
  }

  async updateBoard(id: number, stauts: BoardStatus) {
    const found = await this.getBoardById(id);
    found.status = stauts;
    await this.boardRepository.save(found);
  }
}
