import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
} from "typeorm";
import Ad from "./ad";
import { Field, ObjectType } from "type-graphql";

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
  ads: Ad[];
}

export default Category;
