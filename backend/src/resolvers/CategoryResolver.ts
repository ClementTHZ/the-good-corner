import Category from "../entities/category";
import { Query, Resolver } from "type-graphql";

@Resolver(Category)
class CategoryResolver {
  @Query(() => [Category])
  async getAllCategory() {
    const categories = await Category.find();
    return categories;
  }
}
