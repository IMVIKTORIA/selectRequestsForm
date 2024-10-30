import React from "react";
import { initGlobalContext } from "./GlobalContext";
import { AppFilter, DateFilter, IFiltersData, ListFilter, StringFilter } from "../../UIKit/Filters/FiltersTypes";

/** Данные формы отбора обращения */
export class SelectRequestData {
  /** Фильтры поиска */
  filters: SelectRequestFilters;
  /** Состояние оберток фильтров */
  filterStates: SelectRequestFiltersStates;
  /** Обработчик нажатия на кнопку поиск */
  onClickSearch: () => Promise<void>;
  /** Количество отобранных элементов */
  elementsCount: number;

  constructor() {
    this.filters = new SelectRequestFilters();
    this.filterStates = new SelectRequestFiltersStates();
    this.onClickSearch = async () => {
      alert("test");
    };
    this.elementsCount = 0;
  }
}

/** Состояние оберток фильтров */
export class SelectRequestFiltersStates {
  /** Номер задачи */
  number: boolean;
  /** Вид задачи */
  status: boolean;
  /** Тема обращения */
  appeal: boolean;
  /** Канал */
  channel: boolean;
  /** Канал(Ручной ввод) */
  channelManual: boolean;
  /** Дата создания */
  createdAt: boolean;
  /** Обратившийся */
  contragent: boolean;
  /** Застрахованный */
  appealSubject: boolean;
  /** Статус ЗЛ */
  insuredStatus: boolean;
  /** Полис */
  policy: boolean;
  /** Продукт */
  product: boolean;

  constructor() {
    this.number = false;
    this.status = false;
    this.appeal = false;
    this.channel = false;
    this.channelManual = false;
    this.createdAt = false;
    this.contragent = false;
    this.appealSubject = false;
    this.insuredStatus = false;
    this.policy = false;
    this.product = false;
  }
}

/** Значения фильтров формы отбора задач */
export class SelectRequestFilters implements IFiltersData {
  /** Номер обращения */
  number: StringFilter;
  /** Статус */
  status: ListFilter;
  /** Тема обращения */
  appeal: StringFilter;
  /** Канал */
  channel: ListFilter;
  /** Канал(Ручной ввод) */
  channelManual: StringFilter;
  /** Дата создания */
  createdAt: DateFilter;
  /** Обратившийся */
  contragent: StringFilter;
  /** Застрахованный */
  appealSubject: StringFilter;
  /** Статус ЗЛ */
  insuredStatus: ListFilter;
  /** Полис */
  policy: StringFilter;
  /** Продукт */
  product: StringFilter;

  constructor() {
    this.number = new StringFilter("number", "номер");
    this.status = new ListFilter("status", "статус обращения");
    this.appeal = new StringFilter("appeal", "тема обращения");
    this.channel = new ListFilter("channel", "канал");
    this.channelManual = new StringFilter("channelManual", "канал(Ручной ввод)");
    this.createdAt = new DateFilter("createdAt", "дата создания");
    this.contragent = new StringFilter("contragent", "обратившийся");
    this.appealSubject = new StringFilter("appealSubject", "застрахованный");
    this.insuredStatus = new ListFilter("insuredStatus", "Статус 3Л");
    this.policy = new StringFilter("policy", "полис");
    this.product = new StringFilter("product", "продукт");
  }

  reset() {
    this.number.reset();
    this.status.reset();
    this.appeal.reset();
    this.channel.reset();
    this.channelManual.reset();
    this.createdAt.reset();
    this.contragent.reset();
    this.appealSubject.reset();
    this.insuredStatus.reset();
    this.policy.reset();
    this.product.reset();
  }
}

export const selectRequestContext = initGlobalContext<SelectRequestData>(new SelectRequestData());
