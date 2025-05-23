import { SubmitHandler, useForm } from "react-hook-form";
import { Inputs } from "../types";
import { useNavigate, useParams } from "react-router";
import { toast } from "react-toastify";
import {
  useCreateAdMutation,
  useGetAdByIdQuery,
  useGetAllCategoriesAndTagsQuery,
} from "../generated/graphql-types";

export const UpdateAdForm = () => {
  // Le nom de cette variable doit avoir le même nom que dans la route (app.tsx)
  const navigate = useNavigate();
  const { id } = useParams();

  const {
    loading: loadCategoriesAndTags,
    error: errorCategoriesAndTags,
    data: dataCategoriesAndTags,
  } = useGetAllCategoriesAndTagsQuery();

  const {
    loading: loadAd,
    error: errorAd,
    data: dataAd,
  } = useGetAdByIdQuery({
    variables: { getAdId: Number(id) },
  });

  const [createAd] = useCreateAdMutation();

  const { register, handleSubmit } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    console.log(data);
    try {
      const newData = {
        ...data,
        category: `${data.category}`,
      };
      createAd({ variables: { data: newData } });
      navigate("/");
      toast.success("Ad has been updated");
    } catch (error) {
      toast.error("An error occurred");
      console.log(error);
    }
  };
  if (!loadAd || loadCategoriesAndTags) return <p>En attente...</p>;
  if (errorAd || errorCategoriesAndTags) return <p>Une erreur est apparue</p>;
  if (!dataAd || !dataCategoriesAndTags)
    return <p>Something's amiss (should never render this)</p>;
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        defaultValue={dataAd.getAdById.title}
        {...register("title", { required: true })}
      />
      <br />
      <input
        defaultValue={dataAd.getAdById.description}
        {...register("description", { required: true })}
      />
      <br />
      <input
        defaultValue={dataAd.getAdById.owner}
        {...register("owner", { required: true })}
      />
      <br />
      <input
        type="number"
        defaultValue={dataAd.getAdById.price}
        {...register("price", { required: true })}
      />
      <br />
      <input
        type="file"
        accept="picture/png"
        defaultValue={dataAd.getAdById.picture}
        {...register("picture", { required: true })}
      />
      <br />
      <input
        defaultValue={dataAd.getAdById.city}
        {...register("city", { required: true })}
      />
      <br />

      {/* On map sur notre tableau de categories pour les afficher sous forme de selection */}

      <select
        defaultValue={dataAd.getAdById.category.id}
        {...register("category", { required: true })}
      >
        {dataCategoriesAndTags.getAllCategories.map((el) => (
          <option value={el.id} key={el.id}>
            {el.title}
          </option>
        ))}
      </select>
      <br />

      {/* on map sur notre tableau de tags pour les afficher avec les checkboxs */}
      {dataCategoriesAndTags.getAllTags.map((el) => (
        <div key={el.id}>
          <label>
            {el.title}
            <input
              value={el.id}
              type="checkbox"
              defaultChecked={dataAd.getAdById.tags.some(
                (tag) => tag.id === el.id
              )}
              {...register("tags")}
            />
          </label>
        </div>
      ))}
      <button type="submit">Modifier l'annonce</button>
    </form>
  );
};
