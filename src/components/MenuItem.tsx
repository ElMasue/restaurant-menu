import { Link } from "react-router-dom";

export default function MenuItem({ item }: any) {
  return (
    <div className="item">
      <img src={item.thumb} alt={item.name} width={200} />
      <h3>{item.name}</h3>
      <p>Cat: {item.category}</p>
      <p>Precio: €{item.price}</p>
      <Link to={`/meals/${item.id}`}>Ver detalle</Link>
    </div>
  );
}
