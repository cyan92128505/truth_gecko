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

export async function CredentialRepository() {
  return database.getRepository(Credential);
}

export default CredentialRepository;
