import Tag from "../entities/tag";
import { Query, Resolver, Mutation } from "type-graphql";

@Resolver(Tag)
export default class TagResolver {
  @Query(() => [Tag])
  async getAllTags() {
    const tags = await Tag.find();
    return tags;
  }

  @Mutation(() => Tag)
  createTag() {}

  @Mutation(() => Tag)
  deleteTag() {}
}
