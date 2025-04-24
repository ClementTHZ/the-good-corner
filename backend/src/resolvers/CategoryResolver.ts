import { Query, Resolver } from "type-graphql";
import Category from "../entities/category";

@Resolver(Category)
class CategoryResolver {
  @Query(() => [Category])
  async getAllCategory() {
    const categories = await Category.find();
    return categories;
  }
}
