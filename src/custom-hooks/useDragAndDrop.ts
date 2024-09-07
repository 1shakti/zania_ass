import { useEffect, useRef, useState } from "react";
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
        setIsSaving(false);
      }
    };

    const intervalId = setInterval(() => {
      saveData();
    }, 5000);

    return () => clearInterval(intervalId);
  }, [cards]);

  const moveCard = (dragIndex: number, hoverIndex: number) => {
    const updatedCards = Array.from(cards);
    const [movedCard] = updatedCards.splice(dragIndex, 1);
    updatedCards.splice(hoverIndex, 0, movedCard);
    setCards(updatedCards);
  };

  return { cards, setCards, moveCard, isSaving, lastSavedTime };
}
