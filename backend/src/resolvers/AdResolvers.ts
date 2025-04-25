import Ad, { AdInput } from "../entities/ad";
import { Arg, ID, Mutation, Query, Resolver } from "type-graphql";
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
  async GetAdById(@Arg("id") id: number) {
    const ad = Ad.findOneByOrFail({ id });
    return ad;
  }

  @Mutation(() => ID)
  async createAd(@Arg("data") data: AdInput) {
    const ad = Ad.create({
      ...data,
      tags: data.tags.map((tag) => ({ id: Number(tag) })),
    });
    await ad.save();
    return ad.id;
    /* async createAd(@Arg("data") data: AdInput) {
    const ad = new Ad();
    ad.title = data.title;
    ad.description = data.description;
    ad.owner = data.owner;
    ad.price = data.price;
    ad.picture = data.picture;
    ad.city = data.city;
    ad.category = data.category;
    ad.tags = data.tags;
    
    await ad.save();
    return ad.id;
  }*/ // TODO Make a new function with tag in commentary
  }

  @Mutation(() => ID)
  async deleteAd(@Arg("id") id: number) {
    Ad.delete({ id });
    return id;
  }

  @Mutation(() => ID)
  async updateAd(@Arg("id") id: number, @Arg("data") data: AdInput) {
    let ad = await Ad.findOneByOrFail({ id });
    ad = Object.assign(ad, data, {
      tags: data.tags.map((tag) => ({ id: Number(tag) })),
    });
    await ad.save();
    return ad.id;
  }
}
