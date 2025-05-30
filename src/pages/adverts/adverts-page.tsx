import { useEffect, useState } from "react";
import type { Advert } from "./type-advert";
import { getAdvertsList } from "./services";
import { Button } from "../../components/button";
import { Link, useNavigate } from "react-router-dom";
import { Page } from "../../components/layout/page";
import { useAuth } from "../auth/context";
import {
  FilterClosedIcon,
  FilterOpenIcon,
} from "../../components/icons/filters";

const EmptyAdverts = () => {
  return (
    <div className="empty-adverts-page">
      <p>Ningún anuncio que mostrar.</p>
      <Link to={"/adverts/new"}>
        <Button variant="primary" type="button">
          Crear anuncio
        </Button>
      </Link>
    </div>
  );
};

export const AdvertsPage = () => {
  const [adverts, setAdverts] = useState<Advert[]>([]);
  const [nameFilter, setNameFilter] = useState("");
  const [tagFilter, setTagFilter] = useState("");
  const [priceMin, setPriceMin] = useState("");
  const [priceMax, setPriceMax] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const { isLogged } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLogged) {
      navigate("/login", { replace: true });
    }
    async function getAdverts() {
      const advert = await getAdvertsList();
      setAdverts(advert);
    }
    getAdverts();
  }, [isLogged, navigate]);

  const filteredAdverts = adverts.filter((advert) => {
    const matchesName = advert.name
      .toLowerCase()
      .includes(nameFilter.toLowerCase());
    const matchesTag = tagFilter === "" || advert.tags.includes(tagFilter);
    const matchesMinPrice =
      priceMin === "" || advert.price >= parseFloat(priceMin);
    const matchesMaxPrice =
      priceMax === "" || advert.price <= parseFloat(priceMax);
    return matchesName && matchesTag && matchesMinPrice && matchesMaxPrice;
  });

  const uniqueTags = [
    ...new Set(adverts.flatMap((filterAdvert) => filterAdvert.tags)),
  ];

  return (
    <Page title="Anuncios">
      <div className="mx-auto max-w-6xl px-4 py-8">
        <div className="mb-4 text-right">
          <Button
            onClick={() => setShowFilters((prev) => !prev)}
            className="inline-flex items-center justify-center rounded-lg bg-emerald-600 p-2 text-white shadow transition hover:bg-emerald-700"
            title={showFilters ? "Ocultar filtros" : "Mostrar filtros"}
          >
            {showFilters ? <FilterOpenIcon /> : <FilterClosedIcon />}
          </Button>
        </div>

        {/* Panel de filtros */}
        {showFilters && (
          <div className="animate-fadeIn mb-8 rounded-xl bg-gray-100 p-4 shadow-inner">
            <h2 className="mb-4 text-lg font-semibold text-emerald-800">
              Filtros
            </h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4">
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Nombre
                </label>
                <input
                  type="text"
                  placeholder="Buscar por nombre"
                  value={nameFilter}
                  onChange={(event) => setNameFilter(event.target.value)}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm shadow-sm focus:border-emerald-500 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Tag
                </label>
                <select
                  value={tagFilter}
                  onChange={(event) => setTagFilter(event.target.value)}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm shadow-sm focus:border-emerald-500 focus:ring-emerald-500 focus:outline-none"
                >
                  <option value="">Todos los tags</option>
                  {uniqueTags.map((tag) => (
                    <option key={tag} value={tag}>
                      {tag}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Precio mínimo (€)
                </label>
                <input
                  type="number"
                  min="0"
                  value={priceMin}
                  onChange={(event) => setPriceMin(event.target.value)}
                  placeholder="Mínimo"
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm shadow-sm focus:border-emerald-500 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Precio máximo (€)
                </label>
                <input
                  type="number"
                  min="0"
                  value={priceMax}
                  onChange={(event) => setPriceMax(event.target.value)}
                  placeholder="Máximo"
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm shadow-sm focus:border-emerald-500 focus:ring-emerald-500 focus:outline-none"
                />
              </div>
            </div>
          </div>
        )}

        {/* Lista de anuncios */}
        {filteredAdverts.length > 0 ? (
          <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
            {filteredAdverts.map((advert) => (
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
