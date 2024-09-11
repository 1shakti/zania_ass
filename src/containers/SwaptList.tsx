import { useState } from "react";
const data = [
  { title: "First", id: 0, checked: false },
  { title: "Second", id: 1, checked: false },
  { title: "Third", id: 2, checked: false },
  { title: "Fourth", id: 3, checked: false },
];

interface listInte {
    title: string;
    id: number;
    checked: boolean;
}

function SwaptList() {
    const [leftList, setLeftList] = useState<listInte[]>(data);
    const [rightList, setRightList] = useState<listInte[]>([]);
    const [selectedItems, setSelectedItems] = useState<listInte[]>([]);
    const [selectedSide, setSelectedSide] = useState<string>('');
  
    const handleItems = (panel: string, item:listInte): void => {
      const alreadySelected = selectedItems.find((i) => i.id === item.id);
      if (alreadySelected) {
        const filterSelectitems = selectedItems.filter((i) => i.id !== item.id);
        setSelectedItems(filterSelectitems);
      } else {
        setSelectedItems([...selectedItems, { ...item, checked: true }]);
        setSelectedSide(panel);
      }
    };
  
    const moveItems = (transfer: string) => {
      if (selectedItems.length === 0) return;
      if (transfer === "right" && selectedSide === "left") {
        const newLeftList = leftList.filter(
          (i) => !selectedItems.some((item) => item.id === i.id)
        );
        const newRightList = [
          ...rightList,
          ...selectedItems.map((item) => ({ ...item, checked: false })),
        ];
        setLeftList(newLeftList);
        setRightList(newRightList);
      }
      if (transfer === "left" && selectedSide === "right") {
        const newRightList = rightList.filter(
          (i) => !selectedItems.some((item) => item.id === i.id)
        );
        const newLeftList = [
          ...leftList,
          ...selectedItems.map((item) => ({ ...item, checked: false })),
        ];
        setRightList(newRightList);
        setLeftList(newLeftList);
      }
      setSelectedItems([]);
      setSelectedSide('');
    };
  
    const isSelected = (item:listInte) => selectedItems?.some((i) => i.id === item.id);
  
    return (
        <div className="flex justify-between p-4">
          <div className="left-list w-1/3 border-2 border-black">
            {leftList.map((item, index) => (
              <div
                className={`cursor-pointer p-2 my-1 border rounded-md ${
                  isSelected(item) ? "bg-blue-200" : "bg-white"
                }`}
                key={`item_${index}`}
                onClick={() => handleItems("left", item)}
              >
                {item.title}
              </div>
            ))}
          </div>
          <div className="flex flex-col items-center justify-center space-y-2">
            <button
              className={`p-2 rounded-md border ${
                selectedSide === "right" ? "bg-gray-200" : "bg-blue-500 text-white"
              }`}
              onClick={() => moveItems("right")}
              disabled={selectedSide === "right"}
            >
              Right Arrow
            </button>
            <button
              className={`p-2 rounded-md border ${
                selectedSide === "left" ? "bg-gray-200" : "bg-blue-500 text-white"
              }`}
              onClick={() => moveItems("left")}
              disabled={selectedSide === "left"}
            >
              Left Arrow
            </button>
          </div>
          <div className="right-list w-1/3 border-2 border-black">
            {rightList.map((item, index) => (
              <div
                className={`cursor-pointer p-2 my-1 border rounded-md ${
                  isSelected(item) ? "bg-blue-200" : "bg-white"
                }`}
                key={`item_${index}`}
                onClick={() => handleItems("right", item)}
              >
                {item.title}
              </div>
            ))}
          </div>
        </div>
      );
}

export default SwaptList


