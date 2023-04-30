import s from "./App.module.scss";
import Main from "./Components/Main";
import Header from "./Components/Header";

function App() {
  return (
    <div className={s.container}>
      <Header />
        <Main />
    </div>
  );
}

export default App;
