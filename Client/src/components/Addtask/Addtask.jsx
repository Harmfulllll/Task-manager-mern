import { useState } from "react";
import "./Addtask.css";
import { addTask } from "../../redux/Conf/taskSlice";
import { useDispatch, useSelector } from "react-redux";

const AddTask = () => {
  const dispatch = useDispatch();
  const { auth } = useSelector((state) => ({ ...state }));
  const { currentUser } = auth;
  const [state, setState] = useState({
    name: "",
    description: "",
  });

  const handleChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addTask(state.name, state.description));
    setState({
      task: "",
    });
  };

  return (
    <div>
      <div className="addtask">
        <form action="" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="add your task name"
            onChange={handleChange}
            value={state.name}
          />
          <input
            type="text"
            name="description"
            placeholder="add your task description"
            onChange={handleChange}
            value={state.description}
          />
          <button className="button">Add Task</button>
        </form>
      </div>
    </div>
  );
};

export default AddTask;
