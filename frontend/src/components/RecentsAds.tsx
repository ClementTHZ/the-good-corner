import AdCard, { AdCardProps } from "./AdCard";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useSearchParams } from "react-router";
import { toast } from "react-toastify";

export const RecentsAds = () => {
  const [total, setTotal] = useState(0);

  /* fonction react router Pour récupérer les params */
  const [searchParams] = useSearchParams();

  // console.log(searchParams.get("category"));

  const [ads, setAds] = useState<AdCardProps[]>([]);

  const fetchData = async () => {
    let url = "http://localhost:3000/ads";
    if (searchParams.get("category")) {
      url += `?category=${searchParams.get("category")}`;
    }

    const result = await axios.get(url);
    setAds(result.data);
  };

  useEffect(() => {
    fetchData();
  }, [searchParams]);

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`http://localhost:3000/ads/${id}`);
      toast.success("Ad has been deleted");
    } catch (error) {
      toast.error("An error occurred");
      console.error(error);
    }
    fetchData();
  };

  return (
    <>
      <h2>Annonces récentes</h2>
      <p>Prix total: {total} €</p>
      <section className="recent-ads">
        {ads.map((ad) => (
          <div>
            <Link key={ad.id} to={`/ad/${ad.id}`}>
              <AdCard
                title={ad.title}
                picture={ad.picture}
                price={ad.price}
                link={ad.link}
              />
            </Link>
            <button
              className="button"
              onClick={() => {
                setTotal(total + ad.price);
              }}
            >
              Ajouter au total
            </button>
            <button
              className="button"
              onClick={() => {
                if (ad.id) {
                  handleDelete(ad.id);
                }
              }}
            >
              Supprimer
            </button>
          </div>
        ))}
      </section>
    </>
  );
};
