import Button from "../ui/Button";
import Card from "../ui/Card";
import "../../styles/users.css";

const UserCard = ({ user, onEdit, onToggle }) => {
  return (
    <Card>
      <article className="user-card">
        <p>
          <strong>{user.employee_name}</strong>
        </p>
        <p>{user.employee_number}</p>

        <div className="card-buttons">
          <Button onClick={() => onEdit(user)}>Editar</Button>
          <Button onClick={() => onToggle(user)}>
            {user.active ? "Desactivar" : "Activar"}
          </Button>
        </div>
      </article>
    </Card>
  );
};

export default UserCard;
