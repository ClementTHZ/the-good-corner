import Tag, { TagInput } from "../entities/tag";
import { FindManyOptions } from "typeorm";
import { Query, Resolver, Mutation, ID, Arg } from "type-graphql";

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

  @Mutation(() => ID)
  async createTag(@Arg("data") data: TagInput) {
    const tag = Tag.create({ ...data });
    await tag.save();
    return tag.id;
  }

  @Mutation(() => ID)
  async deleteTag(@Arg("id") id: number) {
    await Tag.delete({ id });
    return id;
  } // TODO Make function DeleteTag with Cascade trueor NOT NULL dans l'entities
}
