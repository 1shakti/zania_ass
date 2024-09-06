import { useEffect, useRef, useState } from "react";
import { DropResult } from "react-beautiful-dnd";
import { Card } from "../types";

export function useDragAndDrop() {
  const [cards, setCards] = useState<Card[]>([]);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [lastSavedTime, setLastSavedTime] = useState<number | null>(null);
  const previousCardsRef = useRef<Card[]>(cards);

  useEffect(() => {
    const saveData = async () => {
      if (!cards.length) return;

      const currentCards = JSON.stringify(cards);
      const previousCards = JSON.stringify(previousCardsRef.current);

      if (currentCards === previousCards) return;

      try {
        setIsSaving(true);
        await fetch("/api/products", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: currentCards,
        });
        setIsSaving(false);
        setLastSavedTime(Date.now());
        previousCardsRef.current = [...cards];
      } catch (e) {
        console.log("Error saving data:", e);
      }
    };

    const intervalId = setInterval(() => {
      saveData();
    }, 5000);

    return () => clearInterval(intervalId);
  }, [cards]);

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

  return { cards, setCards, onDragEnd, isSaving, lastSavedTime };
}
