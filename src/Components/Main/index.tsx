import MainHeader from "./MainHeader";
import MainContent from "./MainContent";
import { useSelector } from "react-redux";
import { TStore } from "../../store/hooks";
import { TPayload } from "../../interfaces/interfaces";

let Main = () => {
  const values: TPayload = useSelector((state: TStore) => state.storeReducer);

  return (
    <>
      <MainHeader />
      <MainContent showElementsArr={values} />
    </>
  );
};

export default Main;
