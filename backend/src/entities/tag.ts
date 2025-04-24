import Ad from "./ad";
import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
} from "typeorm";
import { Field, ObjectType } from "type-graphql";

@Entity()
@ObjectType()
class Tag extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field()
  id: number;

  @Column()
  @Field()
  title: string;

  @ManyToMany(() => Ad, (ad) => ad.tags)
  ads: Ad[];
}

export default Tag;
