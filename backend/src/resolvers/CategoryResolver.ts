import { FindManyOptions } from "typeorm";
import Category from "../entities/category";
import { Mutation, Query, Resolver } from "type-graphql";
import Ad from "../entities/ad";

@Resolver(Category)
export default class CategoryResolver {
  @Query(() => [Category])
  async getAllCategory() {
    let findOptions: FindManyOptions<Category> = {
      relations: { ads: true },
    };
    const categories = await Category.find(findOptions);
    return categories;
  }

  @Mutation(() => Category)
  createCategory() {}

  @Mutation(() => Category)
  deleteCategory() {}

  @Mutation(() => Category)
  updateCategory() {}
}
