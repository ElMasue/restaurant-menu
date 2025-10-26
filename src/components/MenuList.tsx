import MenuItem from "./MenuItem";

export default function MenuList({ items }: any) {
  return (
    <div className="list">
      {items.map((i: any) => (
        <MenuItem key={i.id} item={i} />
      ))}
    </div>
  );
}
