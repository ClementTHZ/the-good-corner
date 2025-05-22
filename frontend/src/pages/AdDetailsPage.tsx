import { useNavigate, useParams } from "react-router";
import { toast } from "react-toastify";
import {
  useDeleteAdMutation,
  useGetAdByIdQuery,
} from "../generated/graphql-types";

export const AdDetailsPage = function () {
  const navigate = useNavigate();
  // Permet de donnée la valeur des params dans l'URL à ID
  const { id } = useParams();

  const [deleteAd] = useDeleteAdMutation();

  const { data, loading, error } = useGetAdByIdQuery({
    variables: { getAdId: Number(id) },
  });

  if (loading) return <p>En attente...</p>;
  if (error) return <p>Une erreur est apparue</p>;
  return (
    <div>
      <h2 className="ad-details-title">{data?.getAdById.title}</h2>
      <section className="ad-details">
        <div className="ad-details-image-container">
          <img className="ad-details-image" src={data?.getAdById.picture} />
        </div>
        <div className="ad-details-info">
          <div className="ad-details-price">{data?.getAdById.price} €</div>
          <div className="ad-details-description">
            {data?.getAdById.description}
          </div>
          <hr className="separator" />
          <div className="ad-details-owner">
            Annoncée publiée par <b>{data?.getAdById.owner}</b>
            {new Date(data?.getAdById.createdAt).toLocaleDateString()} à{" "}
            {new Date(data?.getAdById.createdAt).toLocaleDateString()}
          </div>
          <a
            href="mailto:serge@serge.com"
            className="button button-primary link-button"
          >
            <svg
              aria-hidden="true"
              width="16"
              height="16"
              viewBox="0 0 32 32"
              xmlns="http://www.w3.org/2000/svg"
              className="styled__BaseIcon-sc-1jsm4qr-0 llmHhT"
              stroke="currentcolor"
              strokeWidth="2.5"
              fill="none"
            >
              <path d="M25 4H7a5 5 0 0 0-5 5v14a5 5 0 0 0 5 5h18a5 5 0 0 0 5-5V9a5 5 0 0 0-5-5ZM7 6h18a3 3 0 0 1 2.4 1.22s0 0-.08 0L18 15.79a3 3 0 0 1-4.06 0L4.68 7.26H4.6A3 3 0 0 1 7 6Zm18 20H7a3 3 0 0 1-3-3V9.36l8.62 7.9a5 5 0 0 0 6.76 0L28 9.36V23a3 3 0 0 1-3 3Z"></path>
            </svg>
            Envoyer un email
          </a>
          <button
            className="submit"
            onClick={async () => {
              try {
                await deleteAd({ variables: { deleteAdId: Number(id) } });
                navigate("/");
                toast.success("L'annonce à été supprimée");
              } catch (error) {
                toast.error("Un erreur empêche la suppression");
                console.log(error);
              }
            }}
          >
            Supprimer l'annonce
          </button>

          <button
            className="submit"
            onClick={async () => {
              navigate("/");
            }}
          >
            Retour à l'accueil
          </button>

          <button
            className="submit"
            onClick={async () => {
              navigate(`/ad/${id}/edit`);
            }}
          >
            Modifier l'annonce
          </button>
        </div>
      </section>
    </div>
  );
};
