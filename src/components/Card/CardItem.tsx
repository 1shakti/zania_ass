import { useState } from "react";
import { Card } from "../../types";
import { ImSpinner2 } from "react-icons/im";

interface carditems {
  card: Card;
  onClick: () => void;
}

function CardItem({ card, onClick }: carditems) {
  const [loading, setLoading] = useState<boolean>(true);

  const handleImageLoad = () => {
    setLoading(false);
  };

  return (
    <div
      className="card bg-white shadow-md rounded-lg p-4 cursor-pointer"
      onClick={onClick}
    >
      <h3 className="mt-2 text-lg font-semibold">{card.title}</h3>
      <div>
        {loading && (
          <div className="flex items-center justify-center h-32 w-full bg-gray-200">
            <ImSpinner2 className="animate-spin text-gray-500 text-3xl" />
          </div>
        )}
        <img
          src={card.thumbnail}
          alt=""
          onLoad={handleImageLoad}
          className={`w-full h-32 object-cover rounded-md ${loading ? "hidden" : "block"}`}
        />
      </div>
    </div>
  );
}

export default CardItem;
