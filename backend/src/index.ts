import "reflect-metadata";
import express from "express";
import cors from "cors";
import dataSource from "./config/db";
import Ad from "./entities/ad";
import Category from "./entities/category";
import Tag from "./entities/tag";
import { FindManyOptions, ILike } from "typeorm";

const app = express();

app.use(cors());
app.use(express.json());

const port = 3000;

/* GET */

app.get("/ads", async (req, res) => {
  console.log(req.query);
  let findOptions: FindManyOptions<Ad> = {
    relations: { category: true, tags: true },
  };
  if (req.query.category !== undefined) {
    findOptions = {
      ...findOptions,
      where: {
        category: { id: Number.parseInt(req.query.category as string) },
      },
    };
  }

  if (req.query.search !== undefined) {
    console.log("search query :", req.query.search);
    findOptions = {
      ...findOptions,
      where: { title: ILike(`%${req.query.search}%`) },
    };
  }
  const ads = await Ad.find(findOptions);
  res.send(ads);
});

app.get("/ads/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const ad = await Ad.findOneOrFail({
      relations: { category: true, tags: true },
      where: { id: Number(id) },
    });
    res.send(ad);
  } catch (error) {
    console.log(error);
  }
});

app.get("/categories", async (req, res) => {
  const categories = await Category.find();
  res.send(categories);
});

app.get("/tags", async (req, res) => {
  const tags = await Tag.find();
  res.send(tags);
});

/* POST */

app.post("/ads", async (req, res) => {
  const newAd = new Ad();
  newAd.title = req.body.title;
  newAd.description = req.body.description;
  newAd.owner = req.body.owner;
  newAd.price = req.body.price;
  newAd.picture = req.body.picture;
  newAd.createdAt = req.body.createdAt;
  newAd.city = req.body.city;
  newAd.category = req.body.category;
  newAd.tags = req.body.tags.map((el: string) => ({ id: Number.parseInt(el) }));
  try {
    await newAd.save();
    res.send("Ad has been created");
  } catch (error) {
    res.send(error);
  }
});

app.post("/categories", async (req, res) => {
  const newCategory = new Category();
  newCategory.title = req.body.title;
  try {
    await newCategory.save();
    res.status(201).send("Category has been created");
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

app.post("/tags", async (req, res) => {
  const newTag = new Tag();
  newTag.title = req.body.title;
  await newTag.save();
  res.status(201).send("Tag has been created");
});

/* DELETE */

app.delete("/ads/:id", async (req, res) => {
  await Ad.delete({ id: Number.parseInt(req.params.id) });
  res.send("Ad has been deleted");
});

app.delete("/categories/:id", async (req, res) => {
  await Category.delete({ id: Number.parseInt(req.params.id) });
});

app.delete("/tags/:id", async (req, res) => {
  await Tag.delete({ id: Number.parseInt(req.params.id) });
  res.send("Tag has been deleted");
});

/* PUT */

app.put("/ads/:id", async (req, res) => {
  try {
    const body = req.body;
    // concole.log(body)
    const adIdToUpdate = Number.parseInt(req.params.id);
    console.log(adIdToUpdate);
    // await Ad.update({ id: Number.parseInt(req.params.id) }, { ...req.body, tags: []});
    const adToUpdate = await Ad.findOneByOrFail({ id: adIdToUpdate });
    // console.log("ad to update", adToUpdate);
    // adToUpdate.title = req.body.title ? req.body.title : adToUpdate.title;
    // adToUpdate.description = req.body.description
    //   ? req.body.description
    //   : adToUpdate.description;
    // adToUpdate.city = req.body.city ? req.body.city : adToUpdate.city;
    // adToUpdate.owner = req.body.owner ? req.body.owner : adToUpdate.owner;
    // adToUpdate.picture = req.body.picture
    //   ? req.body.picture
    //   : adToUpdate.picture;
    // adToUpdate.price = req.body.price ? req.body.price : adToUpdate.price;
    // adToUpdate.category = req.body.category
    //   ? req.body.category
    //   : adToUpdate.category;
    Ad.merge(adToUpdate, body);
    adToUpdate.tags = req.body.tags
      ? req.body.tags.map((el: string) => ({ id: Number.parseInt(el) }))
      : adToUpdate.tags;
    await adToUpdate.save();
    res.send("Ad has been updated");
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

app.put("/categories/:id", async (req, res) => {
  await Category.update({ id: Number.parseInt(req.params.id) }, req.body);
  res.send("Category has been updated");
});

/* LISTEN */

app.listen(port, async () => {
  await dataSource.initialize();
  const categories = await Category.find();
  if (categories.length === 0) {
    const divers = new Category();
    divers.title = "divers";
    divers.save();
  }
  console.log("Example app listening on port 3000");
});
