import { useEffect, useState } from "react";
import type { Advert } from "./type-advert";
import { getAdvertsList } from "./services";
import { Button } from "../../components/button";
import { Link } from "react-router";
import { Page } from "../../components/layout/page";

// import { useAuth } from "../auth/context";

const EmptyAdverts = () => {
  return (
    <div className="empty-adverts-page">
      <p>Ningún anuncio que mostrar.</p>
      <Button variant="primary">Crear anuncio</Button>
    </div>
  );
};

export const AdvertsPage = () => {
  const [adverts, setAdverts] = useState<Advert[]>([]);
  // const { isLogged } = useAuth();
  useEffect(() => {
    async function getAdverts() {
      const advert = await getAdvertsList();
      setAdverts(advert);
    }
    getAdverts();
  }, []);

  return (
    <Page title="Anuncios">
      <div className="mx-auto max-w-6xl px-4 py-8">
        {adverts.length > 0 ? (
          <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
            {adverts.map((advert) => (
              <li key={advert.id}>
                <div className="flex flex-col space-y-3 rounded-2xl bg-white p-6 shadow-md transition-shadow duration-300 hover:shadow-lg">
                  <Link to={`/adverts/${advert.id}`}>
                    <h3 className="text-center text-lg font-semibold text-emerald-800">
                      {advert.name}
                    </h3>
                  </Link>
                  <Link to={`/adverts/${advert.id}`}>
                    <img
                      src={advert.photo || "/no-fotos.png"}
                      alt={advert.name || "Sin imagen"}
                      className="mb-4 h-48 w-full rounded-lg object-contain"
                    />
                  </Link>
                  <p className="py-1 text-center text-sm text-gray-600">
                    {advert.tags.join(", ")}
                  </p>
                  <p className="text-center font-bold text-emerald-900">
                    {advert.price} €
                  </p>
                  <span
                    className={`mx-auto inline-flex items-center justify-center rounded-full px-6 py-1 text-xs font-medium shadow-lg ${
                      advert.sale
                        ? "bg-emerald-200 text-emerald-800"
                        : "bg-blue-200 text-blue-800"
                    }`}
                  >
                    {advert.sale ? "Compra" : "Venta"}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <EmptyAdverts />
        )}
      </div>
    </Page>
  );
};
