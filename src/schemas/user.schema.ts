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
import { Pet } from './pet.schema';

@Table({
  tableName: 'users',
  timestamps: false,
})
export class User extends Model {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  declare uid : string;

  @Unique
  @Column({
    type: DataType.STRING(100),
    allowNull: false,
  })
  declare email : string;

  @Column({
    type: DataType.STRING(200),
    allowNull: false,
  })
  declare password : string;

  @Column({
    type: DataType.STRING(100),
    allowNull: false,
  })
  declare name : string;

  @HasMany(() => Pet)
  declare pets: Pet[];
}