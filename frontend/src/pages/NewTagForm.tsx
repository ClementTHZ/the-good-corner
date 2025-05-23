import { SubmitHandler, useForm } from "react-hook-form";
import { useCreateTagMutation } from "../generated/graphql-types";
import { GET_ALL_TAGS } from "../graphql/operations";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

type tagInputs = {
  title: string;
};

export const NewTagForm = () => {
  const navigate = useNavigate();
  const [createTag] = useCreateTagMutation({
    refetchQueries: [
      {
        query: GET_ALL_TAGS,
      },
    ],
  });

  const { register, handleSubmit } = useForm<tagInputs>();
  const onSubmit: SubmitHandler<tagInputs> = async (data) => {
    try {
      await createTag({ variables: { data: data } });
      navigate("/");
      toast.success("L'annonce à été créer avec succès !");
    } catch (error) {
      console.log(error);
      toast.error("Un erreur empêche la suppression");
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>
        Titre du tag
        <input {...register("title", { required: true })} />
      </label>
      <button className="submit">Envoyer</button>
    </form>
  );
};
