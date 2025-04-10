import {
  AllowNull,
  BelongsTo,
  Column,
  DataType,
  Default,
  ForeignKey,
  HasMany,
  IsEmail,
  IsUUID,
  Model,
  PrimaryKey,
  Table,
  Unique,} from 'sequelize-typescript';
import { User } from './user.schema'; 

@Table
export class Pet extends Model {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  declare uid: string;

  @Column({
    type: DataType.STRING(100),
    allowNull: false,
  })
  declare name: string;

  @Column({
    type: DataType.STRING(100),
    allowNull: true,
  })
  declare breed: string | null;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare age: number;

  @ForeignKey(() => User)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  declare userId: string;

  @BelongsTo(() => User)
  declare user: User;
}