import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import type { Advert } from "./type-advert";
import { getAdvert, deleteAdvert } from "./services";
import { AxiosError } from "axios";
import { Page } from "../../components/layout/page";
import { useMessages } from "../../components/hooks/useMessage";
import { Notifications } from "../../components/notifications";

export const AdvertPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [advert, setAdvert] = useState<Advert | null>(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [imageError, setImageError] = useState(false);
  const { successMessage, errorMessage, showSuccess, showError } =
    useMessages();

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
  };

  const confirmDelete = async () => {
    if (!id) return;
    setLoadingDelete(true);

    try {
      await deleteAdvert(id);
      showSuccess("Anuncio borrado correctamente.");
      setTimeout(() => {
        navigate("/adverts", { replace: true });
      }, 1000);
    } catch (error) {
      setLoadingDelete(false);
      showError("Error al borrar el anuncio. Intentalo mas tarde.");
    }
  };

  if (!advert) {
    return <p className="py-8 text-center">Cargando anuncio...</p>;
  }

  return (
    <Page title="Detalle del anuncio">
      <div className="space-y-4">
        {!imageError && advert.photo ? (
          <a
            href={advert.photo}
            target="_blank"
            rel="noopener noreferrer"
            className="block"
          >
            <img
              src={advert.photo}
              alt={advert.name || "Imagen del anuncio"}
              className="mx-auto max-h-[300px] w-full max-w-md rounded-xl object-contain"
              onError={(event) => {
                event.currentTarget.onerror = null;
                event.currentTarget.src = "/no-fotos.png";
                setImageError(true);
              }}
            />
          </a>
        ) : (
          <>
            <img
              src="/no-fotos.png"
              alt="Sin imagen disponible"
              className="mx-auto max-h-[300px] w-full max-w-md rounded-xl object-contain"
            />
            <p className="text-center text-sm text-gray-500">
              Imagen del anuncio no disponible
            </p>
          </>
        )}

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
            <Notifications
              successMessage={successMessage}
              errorMessage={errorMessage}
            />
            <p className="mb-4 text-lg font-semibold text-gray-700">
              ¿Estás seguro que quieres borrar este anuncio?
            </p>
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
