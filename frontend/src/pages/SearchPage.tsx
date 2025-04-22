import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import AdCard, { AdCardProps } from "../components/AdCard";
import { toast } from "react-toastify";

export const SearchPage = () => {
  const { keyword } = useParams();

  const [total, setTotal] = useState(0);

  // console.log(searchParams.get("category"));

  const [ads, setAds] = useState<AdCardProps[]>([]);

  const fetchAds = async () => {
    const url = `http://localhost:3000/ads?search=${keyword}`;
    // if (keyword?.get("category")) {
    //   url += `?category=${keyword.get("ad")}`;
    // }
    const result = await axios.get(url);
    setAds(result.data);
  };

  useEffect(() => {
    fetchAds();
  }, [keyword]);

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`http://localhost:3000/ads/${id}`);
      toast.success("Ad has been deleted");
    } catch (error) {
      toast.error("An error occurred");
      console.error(error);
    }
    fetchAds();
  };

  return (
    <>
      <h2>Annonces récentes</h2>
      <section className="recent-ads">
        {ads.map((ad) => (
          <div>
            {/* La key se met sur l'élément qui se répète / élément parent */}
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
  return <p>{keyword}</p>;
};
