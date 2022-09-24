import {
  Entity,
  Column,
  DataSource,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import {User} from './users';

@Entity({
  name: 'historys',
})
export class History {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({
    name: 'type',
    nullable: false,
  })
  type!: string;

  @Column({
    name: 'message',
  })
  message!: string;

  @ManyToOne(() => User, user => user.historys)
  @JoinColumn({
    name: 'user_id',
    referencedColumnName: 'id',
  })
  user!: User;

  @Column({
    type: 'timestamp without time zone',
    name: 'create_at',
    nullable: false,
  })
  createdAt!: Date;
}

export async function TokenRepository(database: DataSource) {
  return database.getRepository(History);
}

export default TokenRepository;
