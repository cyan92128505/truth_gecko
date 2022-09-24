import {
  Entity,
  PrimaryGeneratedColumn,
  PrimaryColumn,
  Column,
  Unique,
  DataSource,
} from 'typeorm';

@Entity({
  name: 'federated_credentials',
})
@Unique(['provider', 'subject'])
export class Credential {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({
    name: 'user_id',
  })
  userId!: string;

  @PrimaryColumn({
    nullable: false,
  })
  provider!: string;

  @PrimaryColumn({
    nullable: false,
  })
  subject!: string;

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

export async function CredentialRepository(database: DataSource) {
  return database.getRepository(Credential);
}

export default CredentialRepository;
