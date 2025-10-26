import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function NavBar() {
  const [categories, setCategories] = useState<string[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://www.themealdb.com/api/json/v1/1/list.php?c=list")
      .then((res) => res.json())
      .then((data) => {
        const cats = data.meals.map((m: any) => m.strCategory);
        setCategories(cats);
      });
  }, []);

  return (
    <nav className="nav">
      <button className="nav-button" onClick={() => navigate("/")}>
        Inicio
      </button>

      <select
        className="nav-select"
        onChange={(e) => navigate(`/category/${e.target.value}`)}
        defaultValue=""
      >
        <option value="" disabled>
          Filtrar por categoría
        </option>
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>
    </nav>
  );
}
