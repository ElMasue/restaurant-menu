import { useEffect, useState } from "react";
import MenuList from "../components/MenuList";
import { getPrice } from "../utils/prices";

export default function Home() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState(""); // buscador

  useEffect(() => {
    const fetchAllMeals = async () => {
      setLoading(true);
      try {
        const resCats = await fetch(
          "https://www.themealdb.com/api/json/v1/1/list.php?c=list"
        );
        const dataCats = await resCats.json();
        const categories: string[] = dataCats.meals.map((m: any) => m.strCategory);

        let allMeals: any[] = [];
        for (const cat of categories) {
          const resMeals = await fetch(
            `https://www.themealdb.com/api/json/v1/1/filter.php?c=${cat}`
          );
          const dataMeals = await resMeals.json();
          const meals = (dataMeals.meals || []).map((m: any) => ({
            id: m.idMeal,
            name: m.strMeal,
            category: cat,
            thumb: m.strMealThumb,
            price: getPrice(m.strMeal),
          }));
          allMeals = allMeals.concat(meals);
        }

        setItems(allMeals);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };

    fetchAllMeals();
  }, []);

  if (loading) return <p style={{ textAlign: "center" }}>Cargando...</p>;

  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div>
      <h2>Menú completo</h2>

      <div style={{ textAlign: "center", marginBottom: "16px" }}>
        <input
          type="text"
          placeholder="Buscar plato..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{
            padding: "8px",
            width: "200px",
            borderRadius: "4px",
            border: "1px solid #aaa",
          }}
        />
      </div>

      {filteredItems.length > 0 ? (
        <MenuList items={filteredItems} />
      ) : (
        <p style={{ textAlign: "center", color: "#555" }}>
          No se ha encontrado ningún plato
        </p>
      )}
    </div>
  );
}
