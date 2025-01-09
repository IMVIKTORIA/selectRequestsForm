import React, { useEffect, useRef, useState } from "react";
import {
  selectRequestContext,
  SelectRequestData,
} from "../../stores/SelectRequestContext";
import Header from "../Header/Header";
import SelectRequestFiltersForm from "../SelectRequestFiltersForm/SelectRequestFiltersForm";
import SelectRequestList from "../SelectRequestList/SelectRequestList";
import { getDataFromDraft } from "../../shared/utils/utils";
import Scripts from "../../shared/utils/clientScripts";
import Loader from "../../../UIKit/Loader/Loader";
import {
  DateFilter,
  StringFilter,
  ListFilter,
} from "../../../UIKit/Filters/FiltersTypes";

/** Форма отбора обращений */
export default function SelectRequestForm() {
  const [data, setValue] = selectRequestContext.useState();
  const contentWrapperRef = useRef<HTMLDivElement>(null);

  // Инициализация с черновиком
  const initializeWithDraft = (filtersData: SelectRequestData) => {
    try {
      const draftData: SelectRequestData | undefined = getDataFromDraft();
      if (draftData) {
        filtersData.filters.number = new StringFilter(
          "number",
          "номер",
          draftData.filters.number?.value
        );
        filtersData.filters.status = new ListFilter(
          "status",
          "статус обращения",
          draftData.filters.status?.values
        );
        filtersData.filters.channel = new ListFilter(
          "channel",
          "канал",
          draftData.filters.channel?.values
        );
        filtersData.filters.channelManual = new StringFilter(
          "channelManual",
          "канал(Ручной ввод)",
          draftData.filters.channelManual?.value
        );
        filtersData.filters.createdAt = new DateFilter(
          "createdAt",
          "дата создания",
          {
            valueFrom: draftData.filters.createdAt?.valueFrom,
            valueTo: draftData.filters.createdAt?.valueTo,
          }
        );
        filtersData.filters.contragent = new StringFilter(
          "contragent",
          "обратившийся",
          draftData.filters.contragent?.value
        );
        filtersData.filters.appealSubject = new StringFilter(
          "appealSubject",
          "застрахованный",
          draftData.filters.appealSubject?.value
        );
        filtersData.filters.insuredStatus = new ListFilter(
          "insuredStatus",
          "Статус 3Л",
          draftData.filters.insuredStatus?.values
        );
        filtersData.filters.policy = new StringFilter(
          "policy",
          "полис",
          draftData.filters.policy?.value
        );
        filtersData.filters.product = new StringFilter(
          "product",
          "продукт",
          draftData.filters.product?.value
        );
        filtersData.filterStates = draftData.filterStates;
      }
    } catch (e) {
      throw new Error("Ошибка получения данных из черновика: " + e);
    }
  };

  const [isMultipleSelect, setIsMultipleSelect] = useState<boolean>(false);
  const [isSelectable, setIsSelectable] = useState<boolean>(false);

  // Инициализация с параметрами
  const initializeWithParams = (filtersData: SelectRequestData) => {
    // Поиск по ФИО
    const fieldId = new URLSearchParams(window.location.search).get("field_id");
    const fullname = new URLSearchParams(window.location.search).get(
      "fullname"
    );

    // Множественный выбор
    const selectMultiple = new URLSearchParams(window.location.search).get(
      "select_multiple"
    );
    if (selectMultiple != undefined) {
      setIsMultipleSelect(true);
    }

    if (fieldId != undefined) {
      setIsSelectable(true);

      if (fullname) {
        filtersData.filters.number.value = fullname;
        filtersData.filterStates.number = true;
      }
    }
  };

  const [isInitializing, setIsInitializing] = useState<boolean>(true);

  // Подгрузка данных
  useEffect(() => {
    Scripts.OnInit().then(() => {
      // Данные формы из черновика
      let filtersData: SelectRequestData = new SelectRequestData();

      initializeWithDraft(filtersData);
      initializeWithParams(filtersData);

      // Установка фильтров
      setValue("filters", filtersData.filters);
      // Установка состояния оберток фильтров
      setValue("filterStates", filtersData.filterStates);

      setIsInitializing(false);
    });
  }, []);

  const [isShowFilters, setIsShowFilters] = useState<boolean>(true);

  const toggleShowFilters = () => setIsShowFilters(!isShowFilters);

  // Ширина списка
  const [listWidth, setListWidth] = useState<number>(0);

  // Назначение обработчиков событий
  useEffect(() => {
    handleResizeWrapper();
    window.addEventListener("resize", handleResizeWrapper);

    return () => {
      window.removeEventListener("resize", handleResizeWrapper);
    };
  }, []);

  // Обработчик изменения размера
  const handleResizeWrapper = () => {
    const width = contentWrapperRef.current?.getBoundingClientRect().width ?? 0;
    setListWidth(width);
  };

  return (
    <selectRequestContext.Provider value={{ data, setValue }}>
      <div className="select-request-form">
        {isInitializing && (
          <div className="select-request-form__loader">
            <Loader />
          </div>
        )}
        {!isInitializing && (
          <>
            <div className="select-request-form__header">
              <Header
                clickFilterHandler={toggleShowFilters}
                elementsCount={data.elementsCount}
                title="Форма отбора обращений"
              />
            </div>
            <div
              className="select-request-form__content"
              ref={contentWrapperRef}
            >
              <div
                className={`select-request-form__filters${
                  !isShowFilters ? " select-request-form__filters_hidden" : ""
                }`}
              >
                <SelectRequestFiltersForm />
              </div>
              <div className="select-request-form__list">
                <div>
                  <SelectRequestList
                    width={listWidth}
                    isMultipleSelect={isMultipleSelect}
                    isSelectable={isSelectable}
                  />
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </selectRequestContext.Provider>
  );
}
