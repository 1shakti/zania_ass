import { Card } from "../../types";

interface carditems {
  card: Card;
  onClick: () => void;
}

function CardItem({ card, onClick }: carditems) {
  return (
    <div
      className="card bg-white shadow-md rounded-lg p-4 cursor-pointer"
      onClick={onClick}
    >
      <h3 className="mt-2 text-lg font-semibold">{card.title}</h3>
      <div>
        <img
          src={card.thumbnail}
          alt=""
          className="w-full h-32 object-cover rounded-md"
          loading="lazy"
        />
      </div>
    </div>
  );
}

export default CardItem;
