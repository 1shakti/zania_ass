import { useRef, useState } from "react";
import { Card } from "../../types";
import { useDrag, useDrop } from "react-dnd";
import { ImSpinner2 } from "react-icons/im";

interface CardItemProps {
  card: Card;
  index: number;
  onClickCard: (image: string) => void;
  moveCard: (dragIndex: number, hoverIndex: number) => void;
}

function CardItem({ card, index, onClickCard, moveCard }: CardItemProps) {
  const [loading, setLoading] = useState<boolean>(true);
  const ref = useRef<HTMLDivElement>(null);

  const [{ isDragging }, drag] = useDrag({
    type: "CARD",
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: "CARD",
    hover(item: { index: number }) {
      if (!ref.current) return;

      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) return;

      moveCard(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  drag(drop(ref));

  const handleImageLoad = () => {
    setLoading(false);
  };

  return (
    <div
      ref={ref}
      className={`card bg-white shadow-md rounded-lg p-4 cursor-pointer ${isDragging ? "opacity-50" : "opacity-100"}`}
      onClick={() => onClickCard(card.thumbnail)}
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
