import { useCallback, useEffect, useState } from "react";
import { CardList } from "../components";
import CardOverlay from "../components/Overlay/CardOverlay";
import { useDragAndDrop } from "../custom-hooks/useDragAndDrop";
import { ImSpinner2 } from "react-icons/im";
import Timer from "../components/Timer/Timer";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

function CardContainer() {
  const { cards, setCards, moveCard, isSaving, lastSavedTime } = useDragAndDrop();
  const [SelectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const response = await fetch("/api/products");
        const data = await response.json();
        setCards(data);
      } catch (e) {
        console.log("error", e);
      }
    };
    fetchCards();
  }, [setCards]);

  const handleCardClick = useCallback((image: string) => {
    setSelectedImage(image);
  }, []);

  const handleOverlayClose = useCallback(() => {
    setSelectedImage(null);
  }, []);

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex items-center mr-3 mb-8">
        <Timer lastSavedTime={lastSavedTime} />
        {isSaving && (
          <div className="saving-indicator flex items-center ml-3">
            <ImSpinner2 className="animate-spin text-gray-500 text-2xl mr-2" />
            Saving data...
          </div>
        )}
      </div>
      <CardList cards={cards} onClickCard={handleCardClick} moveCard={moveCard} />
      {SelectedImage && (
        <CardOverlay image={SelectedImage} onClose={handleOverlayClose} />
      )}
    </DndProvider>
  );
}

export default CardContainer;
