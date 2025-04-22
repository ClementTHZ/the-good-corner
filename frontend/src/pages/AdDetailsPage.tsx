import axios from "axios";
import { AdDetails } from "../types";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { toast } from "react-toastify";

export const AdDetailsPage = function () {
  // Permet de donnée la valeur des params dans l'URL à ID
  const { id } = useParams();

  // La constante permet d'utiliser useNavigate après le Delete pour revenir sur un path
  const navigate = useNavigate();

  const [ad, setAd] = useState<AdDetails>();

  // La fonction fetchAd récupère l'annonce avec l'ID
  useEffect(() => {
    const fetchAd = async () => {
      const ad = await axios.get(`http://localhost:3000/ads/${id}`);
      setAd(ad.data);
    };
    fetchAd();
  }, [id]);

  // La fonction retourne le résultat suivant sur le client
  if (ad === undefined) {
    return <p>loading</p>;
  } else {
    return (
      <div>
        <h2 className="ad-details-title">{ad.title}</h2>
        <section className="ad-details">
          <div className="ad-details-image-container">
            <img className="ad-details-image" src={ad.picture} />
          </div>
          <div className="ad-details-info">
            <div className="ad-details-price">{ad.price} €</div>
            <div className="ad-details-description">{ad.description}</div>
            <hr className="separator" />
            <div className="ad-details-owner">
              Annoncée publiée par <b>{ad.owner}</b>
              {new Date(ad.createdAt).toLocaleDateString()} à{" "}
              {new Date(ad.createdAt).toLocaleDateString()}
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

            {/* Création du bouton supprimer sur une annonce */}

            <button
              className="submit"
              onClick={async () => {
                try {
                  await axios.delete(`http://localhost:3000/ads/${id}`);
                  navigate("/");
                  toast.success("Ad has been deleted");
                } catch (error) {
                  toast.error("An error occurred");
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
              Retour Home
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
  }
};
