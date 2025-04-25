import { FindManyOptions } from "typeorm";
import Category, { CategoryInput } from "../entities/category";
import { Arg, ID, Mutation, Query, Resolver } from "type-graphql";
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

  @Mutation(() => ID)
  async createCategory(@Arg("data") data: CategoryInput) {
    const category = Category.create({ ...data });
    await category.save();
    return category.id;
  }

  @Mutation(() => Category)
  deleteCategory() {} // TODO Make function DeleteCategory
}
