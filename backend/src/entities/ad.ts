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
import Category from "./category";
import Tag from "./tag";
import { Field, ObjectType } from "type-graphql";

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

export default Ad;
