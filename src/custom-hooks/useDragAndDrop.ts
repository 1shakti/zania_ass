import { useState } from "react";
import { DropResult } from "react-beautiful-dnd";
import { Card } from "../types";

export function useDragAndDrop() {
  const [cards, setCards] = useState<Card[]>([]);

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    const sourceIndex = result.source.index;
    const destinationIndex = result.destination.index;
    if (sourceIndex === destinationIndex) return;
    const updatedCards = Array.from(cards);
    const [removedCard] = updatedCards.splice(sourceIndex, 1);
    updatedCards.splice(destinationIndex, 0, removedCard);
    setCards(updatedCards);
  };

  return { cards, setCards, onDragEnd };
}
