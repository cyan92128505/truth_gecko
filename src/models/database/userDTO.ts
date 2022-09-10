import {DataTypes, Model, Optional} from 'sequelize';
import sequelizeConnection from '../../config/database';

export type ExpressUser = {
  id?: number;
};

export interface UserAttributes {
  id: number;
  email: string;
  password: string;
}

export type UserInput = Optional<UserAttributes, 'id'>;
export type UserOuput = Required<UserAttributes>;

class User extends Model<UserAttributes, UserInput> implements UserAttributes {
  public id!: number;
  public email!: string;
  public password!: string;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: true,
    sequelize: sequelizeConnection,
    paranoid: true,
  }
);

export default User;
