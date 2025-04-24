import Category from "./category";
import Tag from "./tag";
import { Field, ID, InputType, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  ManyToMany,
  JoinTable,
  CreateDateColumn,
} from "typeorm";

@Entity()
@ObjectType()
class Ad extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field()
  id: number;

  @Column()
  @Field()
  title: string;

  @Column()
  @Field()
  description: string;

  @Column()
  @Field()
  owner: string;

  @Column()
  @Field()
  price: number;

  @Column()
  @Field()
  picture: string;

  @CreateDateColumn()
  @Field()
  createdAt: Date;

  @Column()
  @Field()
  city: string;

  @ManyToOne(() => Category, (category) => category.ads)
  category: Category;

  @ManyToMany(() => Tag)
  @JoinTable()
  tags: Tag[];
}

@InputType()
export class AdInput {
  @Field()
  title: string;

  @Field()
  description: string;

  @Field()
  owner: string;

  @Field()
  price: number;

  @Field()
  picture: string;

  @Field()
  city: string;

  @Field(() => ID)
  category: Category;

  @Field(() => [ID])
  tags: Tag[];
}

export default Ad;
