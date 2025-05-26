import { useEffect, useState } from "react";
import type { Advert } from "./type-advert";
import { getAdvertsList } from "./services";
import { Button } from "../../components/button";

const EmptyAdverts = () => {
  return (
    <div className="empty-adverts-page">
      <p>Ningún anuncio que mostrar.</p>
      <Button variant="primary">Crear el primero</Button>
    </div>
  );
};

export const AdvertsPage = () => {
  const [adverts, setAdverts] = useState<Advert[]>([]);
  //TODO implement service getAdvertsList
  useEffect(() => {
    async function getAdverts() {
      const advert = await getAdvertsList();
      setAdverts(advert);
    }
    getAdverts();
  }, []);

  return (
    <div className="adverts-page">
      {adverts.length > 0 ? (
        <ul>
          {adverts.map((advert) => (
            <li key={advert.id}>
              <img src={advert.photo} />
              <h2>{advert.name}</h2>
              <p>{advert.price} €</p>
              <p>{advert.description}</p>
              <p>{advert.tags.join(", ")}</p>
              <p>{advert.sale ? "Venta" : "Compra"}</p>
            </li>
          ))}
        </ul>
      ) : (
        <EmptyAdverts />
      )}
    </div>
  );
};
