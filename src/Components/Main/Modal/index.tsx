import { useState } from "react";
import s from "./style.module.scss";
import { ChangeIcon } from "../../../image/svg/ChangeIcon";
import { IPhoneData } from "../../../interfaces/interfaces";

let Modal = (props: any) => {
  const SCREENW = window.screen.width;
  const [showElementsArray, setShowElementsArray] = useState<Array<IPhoneData>>(
    props.hideElementsArray
  );

  let eSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    let eValue = e.target.value;
    let arr: Array<any> = [];

    if (eValue.length > 0) {
      showElementsArray.forEach((item: any) => {
        if (item.name.toLowerCase().includes(eValue.toLowerCase())) {
          arr.push(item);
        }
      });

      setShowElementsArray(arr);
    } else {
      setShowElementsArray(props.hideElementsArray);
    }
  };

  return (
    <div className={s.container} onMouseLeave={() => {
      props.closePopup();      
    }}>
      <div
        className={s.popup}
        style={props.lengthArr > 3 ? { overflowY: "scroll" } : undefined}
      >
        {SCREENW < 760 && (
          <button onClick = {() => {
            props.closePopup();      
          }}>X</button>
        )}

        {props.lengthArr > 3 && (
          <div className={s.searchBlock}>
            <input
              type="search"
              name=""
              id=""
              onChange={eSearch}
              placeholder="Поиск"
            />
          </div>
        )}

        {showElementsArray &&
          showElementsArray.map((item: any, i: any) => (
            <div className={s.infoBlock} key={i}>
              <button
                onClick={() => {
                  props.changeElementByElement(item.id, props.selectedItemId);
                }}
              >
                <ChangeIcon />
              </button>
              <img src={item.img} alt="" />
              <p>{item.name}</p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Modal;
