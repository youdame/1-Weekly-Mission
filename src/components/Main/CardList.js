import Card from "./Card";
import "../../style/style.css";
import "./CardList.css";

function CardList({ links }) {
  if (!links) {
    return <div>No links available.</div>;
  }
  return (
    <div className="CardList">
      {links.map((link) => (
        <Card key={link.id} link={link} />
      ))}
    </div>
  );
}

export default CardList;
