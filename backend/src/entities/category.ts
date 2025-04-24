import Ad from "./ad";
import { Field, ID, InputType, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
} from "typeorm";

@Entity()
@ObjectType()
class Category extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field()
  id: number;

  @Column({ unique: true })
  @Field()
  title: string;

  @OneToMany(() => Ad, (ad) => ad.category)
  @Field(() => [Ad])
  ads: Ad[];
}

@InputType()
export class CategoryInput {
  @Field()
  title: string;

  @Field(() => [ID])
  ads: Ad[];
}

export default Category;
