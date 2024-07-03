import AddTask from "../../components/Addtask/Addtask";
import TaskList from "../../components/TaskView/TaskView";
import "./taskmanager.scss";

const TaskManager = () => {
  return (
    <div>
      <div className="taskmanager__right">
        <div className="taskmanager__addtask">
          <AddTask />
        </div>
        <div className="taskmanager__tasklist">
          <TaskList />
        </div>
      </div>
    </div>
  );
};

export default TaskManager;
