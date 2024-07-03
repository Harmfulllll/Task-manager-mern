import "./listcard.scss";
import { BiChevronLeft, BiChevronRight, BiTrash } from "react-icons/bi";
import { arrowClick, deleteItem } from "../../redux/Conf/taskSlice";
import { useDispatch } from "react-redux";

const ListCard = (items) => {
  const { item } = items;

  const dispatch = useDispatch();

  const changeStatus = () => {
    dispatch(arrowClick(item));
  };
  const handleDelete = () => {
    dispatch(deleteItem(item._id));
  };

  return (
    <div>
      <ul className={` ${item.status === "done" ? "completed menu" : "menu"}`}>
        <li>
          <p>{item._id}</p>
        </li>
        <li>
          <p>{item.task}</p>
        </li>
        <li>
          <p>{item.description}</p>
        </li>
        <li>
          <p>{item.status}</p>
        </li>
        <li>
          <button
            disabled={item.status === true}
            onClick={() => changeStatus()}
          ></button>
          <button onClick={handleDelete}>
            <BiTrash />
          </button>
        </li>
      </ul>
    </div>
  );
};

export default ListCard;
