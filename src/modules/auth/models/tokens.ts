import {
  Entity,
  PrimaryColumn,
  Column,
  Unique,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import {User} from '../../user/models/users';
import database from '../../../config/database';

@Entity({
  name: 'tokens',
})
@Unique(['type', 'token'])
export class Token {
  @PrimaryColumn({
    nullable: false,
  })
  type!: string;

  @PrimaryColumn({
    nullable: false,
  })
  token!: string;

  @ManyToOne(() => User, user => user.tokens)
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

  @Column({
    type: 'timestamp without time zone',
    name: 'updated_at',
    nullable: false,
  })
  updatedAt!: Date;

  @Column({
    type: 'timestamp without time zone',
    name: 'expired_at',
    nullable: false,
  })
  expiredAt!: Date;
}

export async function TokenRepository() {
  return database.getRepository(Token);
}

export default TokenRepository;
