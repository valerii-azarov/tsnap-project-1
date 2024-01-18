import React, { useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "./redux/store";
import { loadRegionsData, loadPopularServicesData, loadFeaturedNewsData, loadNewsData, loadFaqData } from "./redux/actionCreators";

import Main from "./layout/Main/Main";
import Sidebar from "./layout/Sidebar/Sidebar";

import RegionModal from "./components/RegionModal/RegionModal";
import FirstMenu from "./components/FirstMenu/FirstMenu";
import SecondMenu from "./components/SecondMenu/SecondMenu";
import Loading from "./components/Loading/Loading";

import "./App.css";

function App() {
  // Отримуємо доступ до диспетчера Redux
  const dispatch: AppDispatch = useDispatch();
  // Отримуємо дані за допомогою Redux
  const appearance = useSelector((state: RootState) => state.settings.interface.appearance);
  const { desktop, mobile } = useSelector((state: RootState) => state.settings.interface);
  const { isOpenModal, isToggleMenu } = desktop;
  const { isToggleFirstMenu, isToggleSecondMenu } = mobile;
  
  // Створення мемоїзованих значень для ефективного використання в ефектах
  const isToggleMenus = useMemo(() => [isToggleMenu, isToggleFirstMenu, isToggleSecondMenu], [isToggleMenu, isToggleFirstMenu, isToggleSecondMenu]);
  const variablesAndValues = useMemo(() => [{ variable: "--default", value: appearance.data.background }], [appearance]);

  // Ефект для оновлення CSS змінних на основі отриманих значень
  useEffect(() => {
    variablesAndValues.forEach(({ variable, value }) => {
      try {
        document.documentElement.style.setProperty(variable, value);
      } catch (error) {
        console.error(`Error setting CSS variable ${variable}:`, error);
      }
    }, [variablesAndValues]);
  }, [variablesAndValues]);

  // Ефект для додавання класу "no-scroll" до body в залежності від стану відкритих вікон та меню
  useEffect(() => {
    const shouldAddNoScroll = [isOpenModal, ...isToggleMenus].some((value) => value);
    if (shouldAddNoScroll) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
  }, [isOpenModal, isToggleMenus]);

  // Значення для початкової сторінки та кількості елементів на сторінці
  const initialPage = 1;
  const itemsPerPage = 10;
  
  // Ефект для завантаження даних при завантаженні
  useEffect(() => {
    dispatch(loadRegionsData());
    dispatch(loadPopularServicesData());
    dispatch(loadFeaturedNewsData());
    dispatch(loadNewsData(initialPage, itemsPerPage));
    dispatch(loadFaqData());
  }, [dispatch]);

  return (
    <div className="container">
      <Main isToggle={isToggleMenu} />
      <Sidebar isToggle={isToggleMenu} />
      <RegionModal />
      <FirstMenu />
      <SecondMenu />
      <Loading />
    </div>
  );
}

export default App;
