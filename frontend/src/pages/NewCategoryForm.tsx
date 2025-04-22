import axios from "axios";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";

type inputs = {
  title: string;
};

export const NewCategoryForm = () => {
  const { register, handleSubmit } = useForm<inputs>();
  const onSubmit: SubmitHandler<inputs> = async (data) => {
    // submitHandler prend en paramètre le type Inputs (type générique)
    console.log(data);
    try {
      await axios.post("http://localhost:3000/categories", data);
      toast.success("Category has been created");
    } catch (err) {
      console.log(err);
      toast.error("An error occured");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>
        Titre de la catégorie
        <input {...register("title", { required: true })} />
      </label>
      <button className="submit">Valider</button>
    </form>
  );
};
