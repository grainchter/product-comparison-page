import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import s from "./style.module.scss";
import { changeValue } from "../../../store/Store";
import DATA from "./../../../DATA/DATA.json";
import { IPhoneData } from "../../../interfaces/interfaces";

let MainHeader = () => {
  const [countElementsOnPage, setCountElementsOnPage] = useState<
    Array<number> | undefined
  >();
  const [currentElements, setCurrentElements] = useState<number>(3);

  let generateCountElementsOnPage = () => {
    let arr: Array<number>;
    arr = Array.from({ length: DATA.length }, (_, i) => i + 1);
    arr.map((el: number) => {
      el = el + 1;
      return 1;
    });
    if (DATA.length <= 6) {
      arr.shift();
      setCountElementsOnPage(arr);
    } else if (DATA.length > 6) {
      arr = arr.slice(0, 6);
      arr.shift();
      setCountElementsOnPage(arr);
    }
  };

  let EditArrayByCountElementsOnPage = (count: number) => {
    let arr: Array<IPhoneData> = [];
    Object.assign(arr, DATA);
    arr = arr.slice(0, count);

    let hideArr: Array<IPhoneData> = [];
    Object.assign(hideArr, DATA);
    hideArr.splice(0, count);

    dispatch(
      changeValue({
        values: {
          countElementsShow: count,
          showData: arr,
          hideData: hideArr,
        },
      })
    );
  };

  const dispatch = useDispatch();

  //линтер просить внести функцию EditArrayByCountElementsOnPage как зависимость в useEffect, но это приводит к бесконечному ре-рендеру. Не получилось исправить(
  useEffect(() => {
    generateCountElementsOnPage();
    EditArrayByCountElementsOnPage(currentElements);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={s.container}>
      <div className={s.title}>
        <h1>Смартфоны</h1>
        <div
          className={s.countElementsBlock}
          style={{
            gridTemplateColumns: `repeat(${
              countElementsOnPage && countElementsOnPage.length + 1
            }, auto)`,
          }}
        >
          <p>Отобразить товары:</p>
          {countElementsOnPage &&
            countElementsOnPage.map((item: any, i: any) => (
              <p
                onClick={() => {
                  setCurrentElements(item);
                  EditArrayByCountElementsOnPage(item);
                }}
                className={item === currentElements ? s.active : s.nonActive}
                key={i}
              >
                {item}
              </p>
            ))}
        </div>
      </div>
    </div>
  );
};

export default MainHeader;
