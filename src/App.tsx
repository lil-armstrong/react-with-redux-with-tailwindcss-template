import { ThemeCtx } from "./context/ThemeContext";
import { useContext, useEffect } from "react";

// MAIN APP
function App() {
  const theme = useContext(ThemeCtx);

  useEffect(() => {
    const body = document?.body;
    if (theme && body) {
      body?.setAttribute("data-theme", theme?.currentValue);
    }
  }, [theme]);

  return (
    <div className="flex h-screen items-center justify-center">
      <PageTitle>Victor Casino</PageTitle>
    </div>
  );
}

const PageTitle: React.FC<{}> = (props) => {
  return <h2>{props?.children}</h2>;
};

export default App;
