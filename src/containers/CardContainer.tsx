import { useCallback, useEffect, useState } from "react";
import { CardList } from "../components";
import CardOverlay from "../components/Overlay/CardOverlay";
import { DragDropContext } from "react-beautiful-dnd";
import { useDragAndDrop } from "../custom-hooks/useDragAndDrop";
import { ImSpinner2 } from "react-icons/im";
import Timer from "../components/Timer/Timer";

function CardContainer() {
  const { cards, setCards, onDragEnd, isSaving, lastSavedTime } = useDragAndDrop();
  const [SelectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    const fetchCards = async () => {
      try{
        const response = await fetch('/api/products');
        const data = await response.json();
        setCards(data);
      }catch(e){
        console.log("error",e)
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
    <>
      {isSaving && (
          <div className="saving-indicator">
            <ImSpinner2 className="animate-spin text-gray-500 text-3xl" />
            Saving data... 
          </div>
        )}
        <Timer lastSavedTime={lastSavedTime} />
        <DragDropContext onDragEnd={onDragEnd}>
          <CardList cards={cards} onClickCard={handleCardClick} />
        </DragDropContext>
      {SelectedImage && (
        <CardOverlay image={SelectedImage} onClose={handleOverlayClose} />
      )}
    </>
  );
}

export default CardContainer;
