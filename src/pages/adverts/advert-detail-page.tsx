import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import type { Advert } from "./type-advert";
import { getAdvert, deleteAdvert } from "./services";
import { AxiosError } from "axios";
import { Page } from "../../components/layout/page";

export const AdvertPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [advert, setAdvert] = useState<Advert | null>(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAdvert = async () => {
      if (!id) return;

      try {
        const data = await getAdvert(id);
        setAdvert(data);
      } catch (error) {
        if (error instanceof AxiosError && error.response?.status === 404) {
          navigate("/not-found", { replace: true });
        } else {
          console.error("Error al obtener el anuncio:", error);
        }
      }
    };

    fetchAdvert();
  }, [id, navigate]);

  const handleDeleteClick = () => {
    setShowConfirm(true);
  };

  const cancelDelete = () => {
    setShowConfirm(false);
    setError(null);
  };

  const confirmDelete = async () => {
    if (!id) return;
    setLoadingDelete(true);
    setError(null);

    try {
      await deleteAdvert(id);
      navigate("/adverts");
    } catch (error) {
      setError("No se pudo borrar el anuncio. Intenta de nuevo.");
      setLoadingDelete(false);
    }
  };

  if (!advert) {
    return <p className="py-8 text-center">Cargando anuncio...</p>;
  }

  return (
    <Page title="Detalle del anuncio">
      <div className="space-y-4">
        <img
          src={advert.photo || "/no-fotos.png"}
          alt={advert.name || "Imagen del anuncio"}
          className="mx-auto max-h-[300px] w-full max-w-md rounded-xl object-contain"
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = "/no-fotos.png";
          }}
        />
        <h2 className="text-center text-2xl font-semibold text-emerald-900">
          {advert.name}
        </h2>
        <p className="text-center text-gray-700">{advert.tags.join(", ")}</p>
        <p className="text-center text-xl font-semibold text-emerald-800">
          {advert.price} €
        </p>
        <p className="text-center">
          <span
            className={`inline-block rounded-full px-4 py-1 text-sm font-medium shadow-md ${
              advert.sale
                ? "bg-emerald-200 text-emerald-800"
                : "bg-blue-200 text-blue-800"
            }`}
          >
            {advert.sale ? "Compra" : "Venta"}
          </span>
        </p>

        {!showConfirm ? (
          <div className="text-center">
            <button
              className="rounded bg-red-600 px-6 py-2 text-white transition hover:bg-red-700"
              onClick={handleDeleteClick}
            >
              Borrar anuncio
            </button>
          </div>
        ) : (
          <div className="mx-auto max-w-md rounded border border-gray-300 bg-gray-50 p-4 text-center shadow-md">
            <p className="mb-4 text-lg font-semibold text-gray-700">
              ¿Estás seguro que quieres borrar este anuncio?
            </p>
            {error && <p className="mb-4 text-red-600">{error}</p>}
            <button
              className="mr-4 rounded bg-gray-300 px-5 py-2 text-gray-800 transition hover:bg-gray-400"
              onClick={cancelDelete}
              disabled={loadingDelete}
            >
              Cancelar
            </button>
            <button
              className="rounded bg-red-600 px-5 py-2 text-white transition hover:bg-red-700"
              onClick={confirmDelete}
              disabled={loadingDelete}
            >
              {loadingDelete ? "Borrando..." : "Confirmar"}
            </button>
          </div>
        )}
      </div>
    </Page>
  );
};
