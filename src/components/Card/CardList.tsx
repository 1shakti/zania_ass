import { memo } from "react";
import { Card } from "../../types";
import CardItem from "./CardItem";

interface CardProps {
  cards: Card[];
  onClickCard: (image: string) => void;
  moveCard: (dragIndex: number, hoverIndex: number) => void;
}

function CardList({ cards, onClickCard, moveCard }: CardProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {cards.map((card, index) => (
        <CardItem
          key={card.position}
          index={index}
          card={card}
          onClickCard={onClickCard}
          moveCard={moveCard}
        />
      ))}
    </div>
  );
}

export default memo(CardList);
