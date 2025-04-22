import { DataSource } from "typeorm";
import Ad from "../entities/ad";
import Category from "../entities/category";
import Tag from "../entities/tag";

export const dataSource = new DataSource({
  type: "sqlite",
  database: "good_corner.sqlite",
  entities: [Ad, Category, Tag],
  synchronize: true,
  logging: ["query", "error"],
});

export default dataSource;
