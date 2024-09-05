import { CardOverlayInte } from "../../types";
import Overlay from "./Overlay";

function CardOverlay({ image, onClose }: CardOverlayInte) {
  return (
    <Overlay onClose={onClose}>
      <img src={image} alt="" className=" w-full h-full object-contain" />
    </Overlay>
  );
}

export default CardOverlay;
