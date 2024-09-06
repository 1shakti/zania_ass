import { memo } from "react";
import { Card } from "../../types";
import CardItem from "./CardItem";
import { Draggable, Droppable } from "react-beautiful-dnd";

interface CardProps {
  cards: Card[];
  onClickCard: (image: string) => void;
}

function CardList({ cards, onClickCard }: CardProps) {
  return (
    <Droppable droppableId="droppable">
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {cards.map((card, index) => (
            <Draggable
              key={card.position}
              draggableId={`${card.position}`}
              index={index}
            >
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                >
                  <CardItem
                    card={card}
                    onClick={() => onClickCard(card.thumbnail)}
                    key={card.position}
                  />
                </div>
              )}
            </Draggable>
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
}

export default memo(CardList);
