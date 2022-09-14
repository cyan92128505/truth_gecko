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

  @Column({
    type: 'timestamp without time zone',
    nullable: false,
  })
  createdAt!: Date;

  @Column({
    type: 'timestamp without time zone',
    nullable: false,
  })
  updatedAt!: Date;

  @Column({
    type: 'timestamp without time zone',
    nullable: true,
  })
  deletedAt!: Date;
}

export default async function (database: DataSource) {
  return database.getRepository(User);
}
