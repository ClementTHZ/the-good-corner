import Ad, { AdInput } from "../entities/ad";
import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { FindManyOptions } from "typeorm";

@Resolver(Ad)
export default class AdResolver {
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
  async createAd(@Arg("data") data: AdInput) {
    const ad = new Ad();
    ad.title = data.title;
    ad.description = data.description;
    ad.owner = data.owner;
    ad.price = data.price;
    ad.picture = data.picture;
    ad.city = data.city;
    ad.category = data.category;
    try {
      await ad.save();
      return ad;
    } catch (error) {
      console.warn(error);
      return ad;
    }
  }

  @Mutation(() => Ad)
  deleteAd() {}

  @Mutation(() => Ad)
  updateAd() {}
}
