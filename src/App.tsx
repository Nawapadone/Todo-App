import Todo from "./components/createTodo";
import TodoTable from "./components/todoTable";
import ProgressBar from "./components/progressBar";

const App = () => {
  return (
    <div>
      <ProgressBar />
      <TodoTable />
      <Todo />
    </div>
  );
};

export default App;
