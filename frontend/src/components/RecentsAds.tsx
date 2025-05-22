import AdCard from "./AdCard";
import { useState } from "react";
import { Link } from "react-router";
import { useGetAllAdsQuery } from "../generated/graphql-types";

export const RecentsAds = () => {
  /*
  //fonction react router Pour récupérer les params
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
  }; */

  const [total, setTotal] = useState(0);

  const { data, loading, error } = useGetAllAdsQuery();

  if (loading) return <p>En attente</p>;
  if (error) return <p>Une erreur est apparue</p>;
  return (
    <>
      <h2>Annonces récentes</h2>
      <p>Prix total: {total} €</p>
      <section className="recent-ads">
        {data?.getAllAds.map((ad) => (
          <div>
            <Link key={ad.id} to={`/ad/${ad.id}`}>
              <AdCard title={ad.title} picture={ad.picture} price={ad.price} />
            </Link>
            <button
              className="button"
              onClick={() => {
                setTotal(total + ad.price);
              }}
            >
              Ajouter au total
            </button>
          </div>
        ))}
      </section>
    </>
  );
};
