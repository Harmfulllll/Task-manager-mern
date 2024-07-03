import "./ListCard.css";
import { BiChevronLeft, BiChevronRight, BiTrash } from "react-icons/bi";
import { changeStatus, deleteItem } from "../../redux/Conf/taskSlice";
import { useDispatch } from "react-redux";

const ListCard = (items) => {
  const { item } = items;
  const dispatch = useDispatch();
  const change = () => {
    dispatch(changeStatus(item));
  };
  const handleDelete = () => {
    dispatch(deleteItem(item._id));
  };

  return (
    <div>
      <ul className="menu">
        <li>
          <p>{item._id}</p>
        </li>
        <li>
          <p>{item.title}</p>
        </li>
        <li>
          <p>{item.description}</p>
        </li>
        <li>
          <p>{item.completed === true ? "Done" : "Pending"}</p>
        </li>
        <li>
          <button disabled={item.completed === true} onClick={() => change()}>
            Change Status
          </button>
          <button onClick={handleDelete}>
            <BiTrash />
          </button>
        </li>
      </ul>
    </div>
  );
};

export default ListCard;
