import {
  Entity,
  PrimaryGeneratedColumn,
  PrimaryColumn,
  Column,
  Unique,
  DataSource,
} from 'typeorm';

@Entity({
  name: 'tokens',
})
@Unique(['type', 'token'])
export class Token {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({
    name: 'user_id',
  })
  userId!: string;

  @PrimaryColumn({
    nullable: false,
  })
  type!: string;

  @PrimaryColumn({
    nullable: false,
  })
  token!: string;

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
}

export async function TokenRepository(database: DataSource) {
  return database.getRepository(Token);
}

export default TokenRepository;
