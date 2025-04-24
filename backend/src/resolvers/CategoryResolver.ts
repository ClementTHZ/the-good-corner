import Category from "../entities/category";
import { Mutation, Query, Resolver } from "type-graphql";

@Resolver(Category)
class CategoryResolver {
  @Query(() => [Category])
  async getAllCategory() {
    const categories = await Category.find();
    return categories;
  }

  @Mutation(() => Category)
  createCategory() {}

  @Mutation(() => Category)
  deleteCategory() {}

  @Mutation(() => Category)
  updateCategory() {}
}
