import { useEffect, useState } from "react";
import { CardList } from "../components";
import CardOverlay from "../components/Overlay/CardOverlay";
import { DragDropContext } from "react-beautiful-dnd";
import { useDragAndDrop } from "../custom-hooks/useDragAndDrop";

function CardContainer() {
  const { cards, setCards, onDragEnd } = useDragAndDrop();
  const [SelectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    fetch(`public/data.json`)
      .then((response) => response.json())
      .then((jsonData) => setCards(jsonData))
      .catch((error) => console.error("Error fetching the JSON data:", error));
  }, [setCards]);

  const handleCardClick = (image: string): void => {
    setSelectedImage(image);
  };

  const handleOverlayClose = (): void => {
    setSelectedImage(null);
  };

  return (
    <>
      <div>
        <DragDropContext onDragEnd={onDragEnd}>
          <CardList cards={cards} onClickCard={handleCardClick} />
        </DragDropContext>
      </div>
      {SelectedImage && (
        <CardOverlay image={SelectedImage} onClose={handleOverlayClose} />
      )}
    </>
  );
}

export default CardContainer;
