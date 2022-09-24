import {Entity, PrimaryGeneratedColumn, Column, DataSource} from 'typeorm';

export type ExpressUser = {
  id?: string;
};

@Entity({
  name: 'Users',
})
export class User {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  email!: string;

  @Column()
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
}

export async function UserRepository(database: DataSource) {
  return database.getRepository(User);
}

export default UserRepository;
