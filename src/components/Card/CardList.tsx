import { Card } from "../../types";
import CardItem from "./CardItem";

interface CardProps {
  cards: Card[];
  onClickCard: (image: string) => void;
}

function CardList({ cards, onClickCard }: CardProps) {
  return (
    <div className="w-full grid grid-cols-3 gap-4">
      {cards.map((card) => (
        <CardItem
          card={card}
          onClick={() => onClickCard(card.thumbnail)}
          key={card.position}
        />
      ))}
    </div>
  );
}

export default CardList;
