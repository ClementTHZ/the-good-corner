import axios from "axios";
import { Category, Tag, Inputs } from "../types";
import { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

export const NewAdForm = () => {
  const navigate = useNavigate();

  const [categories, setCategories] = useState<Category[]>([]);

  const [tags, setTags] = useState<Tag[]>([]);

  const fetchCategoriesAndTags = async () => {
    const categories = await axios.get<Category[]>(
      "http://localhost:3000/categories"
    );
    setCategories(categories.data);

    const tags = await axios.get<Tag[]>("http://localhost:3000/tags");
    setTags(tags.data);
  };

  const { register, handleSubmit } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      await axios.post("http://localhost:3000/ads", data);
      navigate("/");
      toast.success("Ad has been created");
    } catch (error) {
      toast.error("An error occurred");
      console.log(error);
    }
  };

  /* SANS REACT HOOK FORM */
  //   const handleSubmit = async (e: React.FormEvent) => {
  //     e.preventDefault();
  //     const form = e.target;
  //     const formData = new FormData(form as HTMLFormElement);
  //     const formJson = Object.fromEntries(formData.entries());
  //     await axios.post("http://localhost:3000/ads", formJson);
  //   };

  useEffect(() => {
    fetchCategoriesAndTags();
  }, []);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        defaultValue="Mon vélo à vendre"
        {...register("title", { required: true })}
      />
      <br />
      <input
        defaultValue="Super vélo"
        {...register("description", { required: true })}
      />
      <br />
      <input
        defaultValue="Clément"
        {...register("owner", { required: true })}
      />
      <br />
      <input
        type="number"
        defaultValue="1500"
        {...register("price", { required: true })}
      />
      <br />
      <input
        defaultValue="https://images.pexels.com/photos/120049/pexels-photo-120049.jpeg"
        {...register("picture", { required: true })}
      />
      <br />
      <input
        defaultValue="Toulouse"
        {...register("city", { required: true })}
      />
      <br />

      {/* On map sur notre tableau de categories pour les afficher sous forme de selection */}

      <select {...register("category", { required: true })}>
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
            <input value={el.id} type="checkbox" {...register("tags")} />
          </label>
        </div>
      ))}
      <button type="submit">Créer l'annonce</button>
    </form>

    /* SANS REACT HOOK FORM */
    // <form
    //   onSubmit={async (e) => {
    //     handleSubmit(e);
    //   }}
    // >
    //   <label>
    //     Titre de l'annonce :<input className="text-field" name="title"></input>
    //   </label>
    //   <br />
    //   <label>
    //     Description :<input className="text-field" name="description"></input>
    //   </label>
    //   <br />
    //   <label>
    //     Owner :<input className="text-field" name="owner"></input>
    //   </label>
    //   <br />
    //   <label>
    //     Price :<input className="text-field" name="price"></input> €
    //   </label>
    //   <br />
    //   <label>
    //     picture :<input className="text-field" name="picture"></input>
    //   </label>
    //   <br />
    //   <label>
    //     City :<input className="text-field" name="city"></input>
    //   </label>
    //   <br />
    //   <select name="category">
    //     {categories.map((el) => (
    //       <option value={el.id} key={el.id}>
    //         {el.title}
    //       </option>
    //     ))}
    //   </select>
    //   <button className="button">Submit</button>
    // </form>
  );
};
