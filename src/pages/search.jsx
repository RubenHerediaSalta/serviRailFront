import SearchGridItem from "../components/Search/SearchGridItem";
import { SEARCH_GIGS_ROUTE } from "../utils/constants";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

function Search() {
  const router = useRouter();
  const { category, q } = router.query;
  const [gigs, setGigs] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get(
          `${SEARCH_GIGS_ROUTE}?searchTerm=${q}&category=${category}`
        );
        setGigs(data.gigs);
      } catch (err) {
        console.error(err);
      }
    };
    if (category || q) getData();
  }, [category, q]);

  return (
    <>
      {gigs && (
        <div className="mx-4 md:mx-8 lg:mx-24 mb-24">
          {q && (
            <h3 className="text-4xl mb-10">
              Resultados de <strong>{q}</strong>
            </h3>
          )}
          <div>
            <div className="my-2">
              <span className="text-[#74767e] font-medium ">
                {gigs.length} servicios disponibles
              </span>
            </div>
            <div className="grid gap-3 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-items-center">
              {gigs.map((gig) => (
                <SearchGridItem gig={gig} key={gig.id} />
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Search;
