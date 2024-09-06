import { http, HttpResponse } from "msw";

async function fetchInitialData() {
  const response = await fetch("/data.json");
  console.log("response",response)
  return await response.json();
}

const getStoredData = async () => {
  const storedData = localStorage.getItem("products");
  if (!storedData) {
    const initialData = await fetchInitialData();
    localStorage.setItem("products", JSON.stringify(initialData));
    return initialData;
  }
  return JSON.parse(storedData);
};

export const handlers = [
  http.get("/api/products", async () => {
    const data = await getStoredData();
    return HttpResponse.json(data);
  }),

  http.post("/api/products", async ({ request }) => {
    const newCards = await request.json();
    localStorage.setItem("products", JSON.stringify(newCards));
    return HttpResponse.json({ message: "Data saved" });
  }),
];
