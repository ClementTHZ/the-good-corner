import Ad from "../entities/ad";
import { Mutation, Query, Resolver } from "type-graphql";
import { FindManyOptions } from "typeorm";

@Resolver(Ad)
class AdResolver {
  @Query(() => [Ad])
  async getAllAds() {
    let findOptions: FindManyOptions<Ad> = {
      relations: { category: true, tags: true },
    };

    const allAds = await Ad.find(findOptions);
    return allAds;
  }

  @Query(() => Ad)
  async GetAdById() {}

  @Mutation(() => Ad)
  createAd() {}

  @Mutation(() => Ad)
  deleteAd() {}

  @Mutation(() => Ad)
  updateAd() {}
}
