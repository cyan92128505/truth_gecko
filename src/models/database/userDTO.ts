import {Entity, PrimaryGeneratedColumn, Column, DataSource} from 'typeorm';

export type ExpressUser = {
  id?: number;
};

@Entity({
  name: 'Users',
})
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  email!: string;

  @Column()
  password!: string;
}

export default async function (database: DataSource) {
  return database.getRepository(User);
}
