import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllTasks } from "../../redux/Conf/taskSlice";
import ListCard from "../ListCard/ListCard";
import "./TaskView.css";
import { combineSlices } from "@reduxjs/toolkit";

const TaskList = () => {
  const auth = useSelector((state) => state.auth);
  const tasks = useSelector((state) => state.task);

  const { currentUser } = auth;
  const { AllTasks } = tasks;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllTasks(currentUser.token, currentUser.id));
  }, [dispatch, currentUser.token, currentUser.id]);

  return (
    <div>
      <ul className="list-header">
        <li>
          <h5>Id</h5>
        </li>
        <li>
          <h5>Task name</h5>
        </li>
        <li>
          <h5>Description</h5>
        </li>
        <li>
          <h5>Status</h5>
        </li>
      </ul>
      {Object.keys(AllTasks).length === 0 && (
        <div className="notask">
          <h3>No Task Found</h3>
        </div>
      )}
      {Object.values(AllTasks) &&
        Object.values(AllTasks).map((item) => {
          return <ListCard key={item._id} item={item} />;
        })}
    </div>
  );
};

export default TaskList;
