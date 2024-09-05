import { useEffect, useState } from "react";
import { CardList } from "../components";
import { Card } from "../types";
import CardOverlay from "../components/Overlay/CardOverlay";

function CardContainer() {
  const [data, setData] = useState<Card[]>([]);
  const [SelectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    fetch(`public/data.json`)
      .then((response) => response.json())
      .then((jsonData) => setData(jsonData))
      .catch((error) => console.error("Error fetching the JSON data:", error));
  }, []);

  const handleCardClick = (image: string): void => {
    setSelectedImage(image);
  };

  const handleOverlayClose = (): void => {
    setSelectedImage(null);
  };

  return (
    <>
      <CardList cards={data} onClickCard={handleCardClick} />
      {SelectedImage && (
        <CardOverlay image={SelectedImage} onClose={handleOverlayClose} />
      )}
    </>
  );
}

export default CardContainer;
