import { Query, Resolver } from "type-graphql";
import Tag from "../entities/tag";

@Resolver(Tag)
class TagResolver {
  @Query(() => [Tag])
  async getAllTags() {
    const tags = await Tag.find();
    return tags;
  }
}
