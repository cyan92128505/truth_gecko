import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  DataSource,
  OneToMany,
} from 'typeorm';

import {Credential} from './credentials';
import {History} from './history';
import {Token} from './tokens';

export type ExpressUser = {
  id?: string;
};

@Entity({
  name: 'Users',
})
export class User {
  @PrimaryGeneratedColumn('uuid', {name: 'id'})
  id!: string;

  @Column({name: 'email'})
  email!: string;

  @Column({name: 'password'})
  password!: string;

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
    name: 'deleted_at',
  })
  deletedAt!: Date;

  @Column({
    name: 'is_verified',
    nullable: false,
    default: false,
  })
  isVerified!: boolean;

  @OneToMany(() => Credential, credential => credential.user)
  credentials!: Credential[];

  @OneToMany(() => Token, token => token.user)
  tokens!: Token[];

  @OneToMany(() => History, history => history.user)
  historys!: History[];
}

export async function UserRepository(database: DataSource) {
  return database.getRepository(User);
}

export default UserRepository;
