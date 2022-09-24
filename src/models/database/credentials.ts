import {
  Entity,
  PrimaryColumn,
  Column,
  Unique,
  DataSource,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import {User} from './users';

@Entity({
  name: 'credentials',
})
@Unique(['provider', 'subject'])
export class Credential {
  @PrimaryColumn({
    name: 'provider',
    nullable: false,
  })
  provider!: string;

  @PrimaryColumn({
    name: 'subject',
    nullable: false,
  })
  subject!: string;

  @ManyToOne(() => User, user => user.credentials)
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
}

export async function CredentialRepository(database: DataSource) {
  return database.getRepository(Credential);
}

export default CredentialRepository;
