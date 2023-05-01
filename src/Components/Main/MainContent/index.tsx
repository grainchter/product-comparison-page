import { useDispatch } from "react-redux";

import { useEffect, useState } from "react";
import s from "./style.module.scss";
import { changeValue } from "../../../store/Store";
import { ArrowIcon } from "../../../image/svg/ArrowIcon";
import Modal from "../Modal";
import { TrueIcon } from "../../../image/svg/TrueIcon copy";
import { FalseIcon } from "../../../image/svg/FalseIcon";

import DATA from "./../../../DATA/DATA.json";
import TITLE_DATA from "./../../../DATA/TITLE_DATA.json";
import { IPhoneData, ITitleData } from "../../../interfaces/interfaces";

let MainContent = (showElementsArr: any) => {
  const dispatch = useDispatch();

  const [showElementsArray, setShowElementsArray] = useState<Array<IPhoneData>>(
    []
  );
  const [hideElementsArray, setHideElementsArray] = useState<Array<IPhoneData>>(
    []
  );
  const [showTitle, setShowTitle] = useState<Array<ITitleData>>(TITLE_DATA);
  const [showComparison, setShowComparison] = useState<boolean>(false);

  const [openPopup, setOpenPopup] = useState<boolean>(false);
  const [selectedItemForChange, setSelectedItemForChange] = useState<number>();

  let editArrayToShow = (value: boolean) => {
    if (value) {
      let arr: Array<any> = [];
      let resultArr: Array<string> = [];
      let resultArrayShow: Array<any> = [];

      Object.assign(arr, showElementsArray);

      //       DATA.forEach((el:any) => {
      //         console.log(el);

      //         arr.forEach((element:any, i:any) => {
      // if (el.id === element.id) {
      //   arr.splice(i, 1, el);

      // }
      //         })
      //       })

      // console.log(arr);

      arr.shift();

      arr.forEach((element: IPhoneData) => {
        if (element.id !== showElementsArray[0].id) {
          resultArr.push("id");
        }

        if (element.name !== showElementsArray[0].name) {
          resultArr.push("name");
        }
        if (element.manufacturer !== showElementsArray[0].manufacturer) {
          resultArr.push("manufacturer");
        }

        if (element.releaseYear !== showElementsArray[0].releaseYear) {
          resultArr.push("releaseYear");
        }

        if (element.screenDiagonal !== showElementsArray[0].screenDiagonal) {
          resultArr.push("screenDiagonal");
        }

        if (
          element.manufacturerCountry !==
          showElementsArray[0].manufacturerCountry
        ) {
          resultArr.push("manufacturerCountry");
        }

        if (element.memory !== showElementsArray[0].memory) {
          resultArr.push("memory");
        }

        if (
          element.screenRefreshRate !== showElementsArray[0].screenRefreshRate
        ) {
          resultArr.push("screenRefreshRate");
        }

        if (element.nfc !== showElementsArray[0].nfc) {
          resultArr.push("nfc");
        }

        if (element.esim !== showElementsArray[0].esim) {
          resultArr.push("esim");
        }

        if (element.wirelessCharger !== showElementsArray[0].wirelessCharger) {
          resultArr.push("wirelessCharger");
        }

        if (element.price !== showElementsArray[0].price) {
          resultArr.push("price");
        }
      });

      showElementsArray.forEach((arrItem: IPhoneData) => {
        let item: Array<any> = [];
        let title: Array<ITitleData> = [];
        let keysArr = Object.keys(arrItem).filter(function (f) {
          return f !== "img";
        });

        let keysToDelete: Array<any> = [];
        keysArr.forEach((element) => {
          if (!~resultArr.indexOf(element)) keysToDelete.push(element);
        });

        Object.assign(item, arrItem);
        Object.assign(title, showTitle);

        keysToDelete.forEach((resItem: any) => {
          delete item[resItem];

          showTitle.forEach((element: any, i: any) => {
            if (element.engName === resItem) {
              delete title[i];
            }
          });
        });
        resultArrayShow.push(item);
        setShowTitle(title);
      });
      setShowElementsArray(resultArrayShow);
    }
  };

  let changeElementByElement = (id: string, deletedItemId: string) => {
    setOpenPopup(!openPopup);

    let showArray: Array<IPhoneData> = [];
    let resultShowArray: Array<IPhoneData> = [];
    let hideArray: Array<IPhoneData> = [];
    let newShowElement: any = {};
    let newHideElement: any = {};

    DATA.forEach((item: any) => {
      if (item.id === id) {
        Object.assign(newShowElement, item);
      }
    });

    DATA.forEach((item: any) => {
      if (item.id === deletedItemId) {
        Object.assign(newHideElement, item);
      }
    });

    Object.assign(showArray, showElementsArray);
    Object.assign(hideArray, hideElementsArray);

    console.log(showArray);
    console.log(hideArray);

    showElementsArray.forEach((item: any, i: any) => {
      if (item.id === newHideElement.id) {
        showArray.splice(i, 1, newShowElement);
      }
    });

    hideElementsArray.forEach((item: any, i: any) => {
      if (item.id === newShowElement.id) {
        hideArray.splice(i, 1, newHideElement);
      }
    });

    console.log(showArray);

    showArray.forEach((el: any) => {
      DATA.forEach((element: any) => {
        if (el.id === element.id) {
          resultShowArray.push(element);
        }
      });
    });

    setShowElementsArray(resultShowArray);

    setHideElementsArray(hideArray);

    dispatch(
      changeValue({
        values: {
          countElementsShow:
            showElementsArr.showElementsArr.values.hideData.countElementsShow,
          showData: resultShowArray,
          hideData: hideArray,
        },
      })
    );
  };

  let closePopup = () => {
    setOpenPopup(false);
  };

  useEffect(() => {
    setShowElementsArray(showElementsArr.showElementsArr.values.showData);
    setHideElementsArray(showElementsArr.showElementsArr.values.hideData);
    setShowComparison(false);
    setShowTitle(TITLE_DATA);
  }, [showElementsArr]);

  return (
    <div className={s.container}>
      <div
        className={s.wrap}
        style={{
          gridTemplateColumns: `255px repeat(${showElementsArray.length}, 180px)`,
        }}
      >
        <div className={s.checkboxBlock}>
          <input
            type="checkbox"
            name=""
            id=""
            className={s.checkbox}
            checked={showComparison ? showComparison : false}
            onChange={() => {
              if (!showComparison) {
                setShowComparison(!showComparison);
                editArrayToShow(!showComparison);
              } else {
                setShowElementsArray(
                  showElementsArr.showElementsArr.values.showData
                );
                setShowTitle(TITLE_DATA);
                setShowComparison(!showComparison);
              }
            }}
          />
          <p>Показать различия</p>
        </div>
        {showElementsArray &&
          showElementsArray.map((item: any, i: any) => (
            <div className={s.item} key={i}>
              <div className={s.itemRow1}>
                <img src={item.img} alt="" />

                {hideElementsArray && hideElementsArray.length > 0 && (
                  <button
                    onClick={() => {
                      setOpenPopup(!openPopup);
                      setSelectedItemForChange(i);
                    }}
                    style={
                      openPopup && selectedItemForChange === i
                        ? { display: "none" }
                        : undefined
                    }
                  >
                    <ArrowIcon />
                  </button>
                )}
                {openPopup && selectedItemForChange === i && (
                  <Modal
                    lengthArr={hideElementsArray.length}
                    hideElementsArray={hideElementsArray}
                    selectedItem={i}
                    selectedItemId={item.id}
                    changeElementByElement={changeElementByElement}
                    closePopup={closePopup}
                  />
                )}
              </div>
              <div className={s.itemRow2}>
                <p>{item.name}</p>
              </div>
            </div>
          ))}
      </div>

      <div className={s.contentWrap}>
        <div
          className={s.content}
          style={{
            gridTemplateColumns: `255px repeat(${showElementsArray.length}, 180px)`,
          }}
        >
          <div className={s.itemDesc}>
            {showTitle.map((item: any, i: any) => (
              <div className={s.element} key={i}>
                <p>{item.name}</p>
              </div>
            ))}
          </div>

          {showElementsArray &&
            showElementsArray.map((item: any, i: any) => (
              <div className={s.elements} key={i}>
                {item.manufacturer && (
                  <div className={s.element}>
                    <p>{item.manufacturer}</p>
                  </div>
                )}

                {item.releaseYear && (
                  <div className={s.element}>
                    <p>{item.releaseYear}</p>
                  </div>
                )}

                {item.screenDiagonal && (
                  <div className={s.element}>
                    <p>{item.screenDiagonal}</p>
                  </div>
                )}

                {item.manufacturerCountry && (
                  <div className={s.element}>
                    <p>{item.manufacturerCountry}</p>
                  </div>
                )}

                {item.memory && (
                  <div className={s.element}>
                    <p>{item.memory} Гб</p>
                  </div>
                )}

                {item.screenRefreshRate && (
                  <div className={s.element}>
                    <p>{item.screenRefreshRate} Гц</p>
                  </div>
                )}

                {(item.nfc === true || item.nfc === false) && (
                  <div className={s.element}>
                    <p>{item.nfc === true ? <TrueIcon /> : <FalseIcon />}</p>
                  </div>
                )}

                {(item.esim === true || item.esim === false) && (
                  <div className={s.element}>
                    <p>{item.esim === true ? <TrueIcon /> : <FalseIcon />}</p>
                  </div>
                )}

                {(item.wirelessCharger === true ||
                  item.wirelessCharger === false) && (
                  <div className={s.element}>
                    <p>
                      {item.wirelessCharger === true ? (
                        <TrueIcon />
                      ) : (
                        <FalseIcon />
                      )}
                    </p>
                  </div>
                )}

                {item.price && (
                  <div className={s.element}>
                    <p>{item.price.toLocaleString()} ₽</p>
                  </div>
                )}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default MainContent;
