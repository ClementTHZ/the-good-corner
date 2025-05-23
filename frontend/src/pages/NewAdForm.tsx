import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import {
  AdInput,
  useCreateAdMutation,
  useGetAllCategoriesAndTagsQuery,
} from "../generated/graphql-types";
import { GET_ALL_ADS } from "../graphql/operations";

export const NewAdForm = () => {
  const navigate = useNavigate();

  const { loading, error, data } = useGetAllCategoriesAndTagsQuery();
  const [createAd] = useCreateAdMutation({
    refetchQueries: [
      {
        query: GET_ALL_ADS,
      },
    ],
  });
  const { register, handleSubmit } = useForm<AdInput>();

  const onSubmit: SubmitHandler<AdInput> = async (data) => {
    const sanitizeData = { ...data, price: Number(data.price) };
    try {
      await createAd({
        variables: { data: sanitizeData },
      });
      navigate("/");
      toast.success("L'annonce à été créer avec succès !");
    } catch (error) {
      toast.error("Un erreur empêche la suppression");
      console.log(error);
    }
  };

  if (loading) return <p>En attente...</p>;
  if (error) return <p>Une erreur est apparue</p>;

  /* SANS REACT HOOK FORM 
  //   const handleSubmit = async (e: React.FormEvent) => {
  //     e.preventDefault();
  //     const form = e.target;
  //     const formData = new FormData(form as HTMLFormElement);
  //     const formJson = Object.fromEntries(formData.entries());
  //     await axios.post("http://localhost:3000/ads", formJson);
  //   };*/
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
        {data?.getAllCategories.map((el) => (
          <option value={el.id} key={el.id}>
            {el.title}
          </option>
        ))}
        ;
      </select>
      <br />
      {/* on map sur notre tableau de tags pour les afficher avec les checkboxs */}
      {data?.getAllTags.map((el) => (
        <div key={el.id}>
          <label>
            {el.title}
            <input value={el.id} type="checkbox" {...register("tags")} />
          </label>
        </div>
      ))}
      <button type="submit">Créer l'annonce</button>
    </form>

    /* SANS REACT HOOK FORM 
     <form
       onSubmit={async (e) => {
         handleSubmit(e);
       }}
     >
       <label>
         Titre de l'annonce :<input className="text-field" name="title"></input>
       </label>
       <br />
       <label>
         Description :<input className="text-field" name="description"></input>
       </label>
       <br />
       <label>
         Owner :<input className="text-field" name="owner"></input>
       </label>
       <br />
       <label>
         Price :<input className="text-field" name="price"></input> €
       </label>
       <br />
       <label>
         picture :<input className="text-field" name="picture"></input>
       </label>
       <br />
       <label>
         City :<input className="text-field" name="city"></input>
       </label>
       <br />
       <select name="category">
         {categories.map((el) => (
           <option value={el.id} key={el.id}>
             {el.title}
           </option>
         ))}
       </select>
       <button className="button">Submit</button>
     </form> 
     */
  );
};
