import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { useCreateCategoryMutation } from "../generated/graphql-types";
import { GET_ALL_CATEGORIES } from "../graphql/operations";

export type categoryInputs = {
  title: string;
};

export const NewCategoryForm = () => {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm<categoryInputs>();
  const [createCategory] = useCreateCategoryMutation({
    refetchQueries: [
      {
        query: GET_ALL_CATEGORIES,
      },
    ],
  });

  const onSubmit: SubmitHandler<categoryInputs> = async (data) => {
    // submitHandler prend en paramètre le type Inputs (type générique)
    console.log(data);
    try {
      await createCategory({ variables: { data: data } });
      navigate("/");
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
