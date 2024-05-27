import { routeList } from "./routes/routeList";
import { useRoutes } from "react-router-dom";

const App = () => {
  const element = useRoutes(routeList);
  return element;
};

export default App;
