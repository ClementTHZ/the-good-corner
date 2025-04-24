import Tag from "../entities/tag";
import { FindManyOptions } from "typeorm";
import { Query, Resolver, Mutation } from "type-graphql";

@Resolver(Tag)
export default class TagResolver {
  @Query(() => [Tag])
  async getAllTags() {
    let findOptions: FindManyOptions<Tag> = {
      relations: { ads: true },
    };
    const tags = await Tag.find(findOptions);
    return tags;
  }

  @Mutation(() => Tag)
  createTag() {}

  @Mutation(() => Tag)
  deleteTag() {}
}
