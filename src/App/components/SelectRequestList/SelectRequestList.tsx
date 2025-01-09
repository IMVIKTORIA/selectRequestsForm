import React, { useEffect, useState } from "react";
import CustomList from "../../../UIKit/CustomList/CustomList";
import {
  ItemData,
  ListColumnData,
} from "../../../UIKit/CustomList/CustomListTypes";
import Scripts from "../../shared/utils/clientScripts";
import {
  SelectRequestFilters,
  selectRequestContext,
} from "../../stores/SelectRequestContext";
import { SelectRequestData } from "../../shared/types";
import utils from "../../shared/utils/utils";
import { localStorageDraftKey } from "../../shared/utils/constants";

interface SelectRequestListProps {
  /** Ширина списка */
  width: number;
}

/** Фильтры формы отбра задач */
export default function SelectRequestList({ width }: SelectRequestListProps) {
  const { data, setValue } = selectRequestContext.useContext();

  /** Установка обработчика нажатия на поиск */
  const setSearchHandler = (callback: () => void) => {
    console.log("setSearchHandler");
    setValue("onClickSearch", callback);
  };

  /** Обработчик нажатия на номер обращения */
  const onClickAppealNumber = async (props: ItemData) => {
    const taskId = props.info;
    if (!taskId) return;

    // Запись текущего url в localStorage
    window.localStorage.setItem(
      "medpultPathBefore",
      window.location.pathname + window.location.search
    );

    localStorage.setItem("currentRequestId", taskId);
    localStorage.setItem(localStorageDraftKey, JSON.stringify(data));

    // Переход
    const link = Scripts.getRequestPagePath();
    utils.redirectSPA(link);
  };

  /** Обработчик нажатия на номер обращения */
  const onClickRequest = async (props: ItemData) => {
    const requestId = props.info;
    if (!requestId) return;
    // Установка обращения
    utils.setRequest(requestId);

    // Переход
    const link = await Scripts.getRequestLink();
    utils.redirectSPA(link);
  };

  // Вычислить количество отобранных элементов
  useEffect(() => {
    Scripts.getRequestsCount(data.filters).then((count) =>
      setValue("elementsCount", count)
    );
  }, []);

  /** Доступ к поиску */
  const searchAccess =
    Scripts.getSelectRequestAccessSettings().searchButton == 2;

  /** Колонки списка */
  const columns = [
    new ListColumnData({
      name: data.filters.number.fieldName,
      code: data.filters.number.fieldCode,
      fr: 1,
      isSortable: searchAccess,
      isLink: true,
      onClick: onClickAppealNumber,
    }),
    new ListColumnData({
      name: data.filters.status.fieldName,
      code: data.filters.status.fieldCode,
      fr: 1,
      isSortable: searchAccess,
    }),
    new ListColumnData({
      name: data.filters.appeal.fieldName,
      code: data.filters.appeal.fieldCode,
      fr: 1,
      isSortable: searchAccess,
    }),
    new ListColumnData({
      name: data.filters.channel.fieldName,
      code: data.filters.channel.fieldCode,
      fr: 1,
      isSortable: searchAccess,
    }),

    new ListColumnData({
      name: data.filters.createdAt.fieldName,
      code: data.filters.createdAt.fieldCode,
      fr: 1,
      isSortable: searchAccess,
    }),
    new ListColumnData({
      name: data.filters.contragent.fieldName,
      code: data.filters.contragent.fieldCode,
      fr: 1,
      isSortable: searchAccess,
      isLink: true,
    }),
    new ListColumnData({
      name: data.filters.appealSubject.fieldName,
      code: data.filters.appealSubject.fieldCode,
      fr: 1,
      isSortable: searchAccess,
      isLink: true,
    }),
    new ListColumnData({
      name: data.filters.insuredStatus.fieldName,
      code: data.filters.insuredStatus.fieldCode,
      fr: 1,
      isSortable: searchAccess,
    }),
    new ListColumnData({
      name: data.filters.policy.fieldName,
      code: data.filters.policy.fieldCode,
      fr: 1,
      isSortable: searchAccess,
    }),
    new ListColumnData({
      name: data.filters.product.fieldName,
      code: data.filters.product.fieldCode,
      fr: 1,
      isSortable: searchAccess,
    }),
  ];

  return (
    <div className="select-request-list">
      <CustomList<SelectRequestFilters, SelectRequestData>
        setSearchHandler={setSearchHandler}
        searchData={data.filters}
        columnsSettings={columns}
        getDataHandler={Scripts.getAppeals}
        height="70vh"
        listWidth={width}
      />
    </div>
  );
}
