import Ad from "./ad";
import { Field, ID, InputType, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
} from "typeorm";

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

@InputType()
export class TagInput {
  @Field()
  title: string;

  @Field(() => [ID])
  ads: Ad[];
}

export default Tag;
