import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MenuList from "../components/MenuList";
import { getPrice } from "../utils/prices";

export default function CategoryPage() {
  const { category } = useParams();
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
      .then((res) => res.json())
      .then((data) => {
        const meals = data.meals || [];
        const menu = meals.map((m: any) => ({
          id: m.idMeal,
          name: m.strMeal,
          category,
          thumb: m.strMealThumb,
          price: getPrice(m.strMeal),
        }));
        setItems(menu);
        setLoading(false);
      });
  }, [category]);

  if (loading) return <p style={{ textAlign: "center" }}>Cargando...</p>;

  return (
    <div>
      <h2>Categoría: {category}</h2>
      <MenuList items={items} />
    </div>
  );
}
