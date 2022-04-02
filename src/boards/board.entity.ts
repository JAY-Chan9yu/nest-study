import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BoardStatus } from './board-status.enum';

@Entity() // 엔티티란 데이터의 집합을 의미 (저장되고 관린되어야 하는 데이터)
export class Board extends BaseEntity {
  @PrimaryGeneratedColumn() // 기본키
  id: number;

  @Column() // 데이터베이스 컬럼을 의미
  title: string;

  @Column()
  description: string;

  @Column()
  status: BoardStatus;
}
