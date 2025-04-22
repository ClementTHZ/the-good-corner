import axios from "axios";
import { SubmitHandler, useForm } from "react-hook-form";
import { Category, Tag, Inputs, AdDetails } from "../types";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { toast } from "react-toastify";

export const UpdateAdForm = () => {
  // Le nom de cette variable doit avoir le même nom que dans la route (app.tsx)
  const { id } = useParams();

  const [categories, setCategories] = useState<Category[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);
  const [ad, setAd] = useState<AdDetails>();

  const fetchCategoriesAndTagsAndAd = async () => {
    const categories = await axios.get<Category[]>(
      "http://localhost:3000/categories"
    );
    setCategories(categories.data);

    const tags = await axios.get<Tag[]>("http://localhost:3000/tags");
    setTags(tags.data);

    const ad = await axios.get(`http://localhost:3000/ads/${id}`);
    setAd(ad.data);
  };

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    console.log(data);
    try {
      await axios.put(`http://localhost:3000/ads/${id}`, data);
      navigate("/");
      toast.success("Ad has been updated");
    } catch (error) {
      toast.error("An error occurred");
      console.log(error);
    }
  };

  const navigate = useNavigate();
  const { register, handleSubmit } = useForm<Inputs>();

  useEffect(() => {
    fetchCategoriesAndTagsAndAd();
  }, [id]);

  if (ad === undefined) {
    return <p>Loading</p>;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        defaultValue={ad.title}
        {...register("title", { required: true })}
      />
      <br />
      <input
        defaultValue={ad.description}
        {...register("description", { required: true })}
      />
      <br />
      <input
        defaultValue={ad.owner}
        {...register("owner", { required: true })}
      />
      <br />
      <input
        type="number"
        defaultValue={ad.price}
        {...register("price", { required: true })}
      />
      <br />
      <input
        type="file"
        accept="picture/png"
        defaultValue={ad.picture}
        {...register("picture", { required: true })}
      />
      <br />
      <input defaultValue={ad.city} {...register("city", { required: true })} />
      <br />

      {/* On map sur notre tableau de categories pour les afficher sous forme de selection */}

      <select
        defaultValue={ad.category.id}
        {...register("category", { required: true })}
      >
        {categories.map((el) => (
          <option value={el.id} key={el.id}>
            {el.title}
          </option>
        ))}
      </select>
      <br />

      {/* on map sur notre tableau de tags pour les afficher avec les checkboxs */}
      {tags.map((el) => (
        <div key={el.id}>
          <label>
            {el.title}
            <input
              value={el.id}
              type="checkbox"
              defaultChecked={ad.tags.some((tag) => tag.id === el.id)}
              {...register("tags")}
            />
          </label>
        </div>
      ))}
      <button type="submit">Modifier l'annonce</button>
    </form>
  );
};
