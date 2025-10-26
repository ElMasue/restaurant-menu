import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getPrice } from "../utils/prices";

export default function MealDetail() {
  const { id } = useParams();
  const [meal, setMeal] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    setError("");
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (!data.meals) {
          setError("Plato no encontrado");
          setLoading(false);
          return;
        }
        const m = data.meals[0];
        setMeal({
          id: m.idMeal,
          name: m.strMeal,
          category: m.strCategory,
          thumb: m.strMealThumb,
          price: getPrice(m.strMeal),
        });
        setLoading(false);
      })
      .catch(() => {
        setError("Error cargando el plato");
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p style={{ textAlign: "center" }}>Cargando...</p>;
  if (error) return <p style={{ color: "red", textAlign: "center" }}>{error}</p>;
  if (!meal) return null;

  return (
    <div className="detail">
      <Link className="back-link" to={`/category/${meal.category}`}>
        ← Volver a {meal.category}
      </Link>
      <img src={meal.thumb} alt={meal.name} />
      <h2>{meal.name}</h2>
      <p><strong>Categoría:</strong> {meal.category}</p>
      <p><strong>Precio:</strong> €{meal.price}</p>
    </div>
  );
}
