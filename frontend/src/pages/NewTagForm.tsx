import axios from "axios";
import { SubmitHandler, useForm } from "react-hook-form";

type inputs = {
  title: string;
};

export const NewTagForm = () => {
  const { register, handleSubmit } = useForm<inputs>();
  const onSubmit: SubmitHandler<inputs> = async (data) => {
    await axios.post("http://localhost:3000/tags", data);
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
