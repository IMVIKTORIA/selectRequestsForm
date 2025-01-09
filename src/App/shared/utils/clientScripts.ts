import {
  FetchData,
  ItemData,
  ItemDataString,
  SortData,
} from "../../../UIKit/CustomList/CustomListTypes";
import { ObjectItem } from "../../../UIKit/Filters/FiltersTypes";
import { FetchInputData } from "../../../UIKit/shared/types/types";
import { SelectRequestFilters } from "../../stores/SelectRequestContext";
import { SelectRequestData } from "../types";

/** Заглушка ожидания ответа сервера */
function randomDelay() {
  const delay = Math.random() * 1000;
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
}

/** Получение списка обращений */
async function getAppeals(
  page: number,
  sortData?: SortData,
  searchData?: SelectRequestFilters
): Promise<FetchData<SelectRequestData>> {
  await randomDelay();

  console.log({
    page,
    sortData,
    searchData,
  });

  const mockData: SelectRequestData = {
    number: new ItemData({ value: "RQ00000004/24", info: "test" }),
    status: new ItemData({ value: "Новое", info: "test" }),
    channel: new ItemData({ value: "Телефон", info: "test" }),
    createdAt: new ItemDataString("06.12.2023 12:22"),
    contragent: new ItemData({ value: "Иванов Иван Иванович", info: "test" }),
    appeal: new ItemDataString("Тестирование"),
    appealSubject: new ItemData({
      value: "Петров Петр Петрович",
      info: "test",
    }),
    insuredStatus: new ItemData({ value: "VIP", info: "test" }),
    policy: new ItemData({ value: "Тест", info: "test" }),
    product: new ItemData({ value: "Сбереги здоровье", info: "test" }),
  };
  return {
    items: Array(5)
      .fill(0)
      .map((data, index) => {
        return {
          id: String(index),
          data: new SelectRequestData(mockData),
        };
      }),
    hasMore: true,
  };
}

/** Получение количества задач по фильтрам */
async function getRequestsCount(
  searchData?: SelectRequestFilters
): Promise<number> {
  return 0;
}

/** Получение статусов обращений */
async function getStatuses(): Promise<ObjectItem[]> {
  await randomDelay();

  const statuses: ObjectItem[] = [
    new ObjectItem({ code: "test", value: "Открыто" }),
    new ObjectItem({ code: "test1", value: "В работе" }),
    new ObjectItem({ code: "test2", value: "Уточнение запроса" }),
    new ObjectItem({ code: "test3", value: "В ожидании" }),
    new ObjectItem({ code: "test4", value: "Закрыто" }),
  ];

  return statuses;
}

/** Получение статусов 3Л */
async function getInsuredStatuses(): Promise<ObjectItem[]> {
  await randomDelay();

  const insuredStatuses: ObjectItem[] = [
    new ObjectItem({ code: "test", value: "VIP" }),
    new ObjectItem({ code: "test1", value: "Проблемный" }),
    new ObjectItem({ code: "test2", value: "Сотрудник Сбер" }),
  ];

  return insuredStatuses;
}

/** Получение каналов */
async function getChannels(): Promise<ObjectItem[]> {
  await randomDelay();

  const channels: ObjectItem[] = [
    new ObjectItem({ code: "test", value: "Email" }),
    new ObjectItem({ code: "test1", value: "СМС" }),
    new ObjectItem({ code: "test2", value: "Телефон" }),
    new ObjectItem({ code: "test3", value: "Ручной ввод" }),
    new ObjectItem({ code: "test4", value: "email(GMAIL)" }),
    new ObjectItem({ code: "test5", value: "email(Все линии)" }),
  ];

  return channels;
}

/** Получение id обращения по id задачи */
async function getRequestIdByTaskId(taskId: string): Promise<string> {
  return "test";
}

/** Получение ссылки для перехода на страницу обращения */
async function getRequestLink(): Promise<string> {
  return "#test";
}

/** Уровни доступа */
enum AccessLevel {
  /** Нет доступа, даже не видим */
  noAccess = 0,
  /** Только видим, не можем писать или менять */
  readOnly = 1,
  /** Видим, читаем и можем писать или нажимать на кнопку/ссылку */
  writeRead = 2,
}

/** Настройки доступа формы отбора задач */
interface ISelectTaskAccessSettings {
  searchButton: AccessLevel;
  appendResponsible: AccessLevel;
}

/** Получить настройки доступа формы отбора задач */
function getSelectRequestAccessSettings(): ISelectTaskAccessSettings {
  return {
    searchButton: 2,
    appendResponsible: 2,
  };
}

/** Получить ссылку формы отбора обращений */
function getSelectRequestLink(): string {
  return "#selectRequestTest";
}

/** Получить ссылку формы отбора застрахованных */
function getSelectInsuredLink(): string {
  return "#selectRequestTest";
}

async function OnInit(): Promise<void> {
  await randomDelay();
}

// При переносе удалить
declare const Context: any;
/**
 * Из оригинальных скриптов
 */
/** Получение кода страницы Договор */
function getTreatyPageCode(): string {
  return Context.data.insurance_treaty_page_code;
}
/** Получение кода страницы Рабочий стол */
function getWortTablePageCode(): string {
  return Context.data.worktable_page_code;
}
/** Получение кода страницы Обращение */
function getRequestPagePath(): string {
  return Context.data.request_page_path;
}
/** Получение кода страницы Отбор задач */
function getSelectTaskPageCode(): string {
  return Context.data.select_task_page_code;
}
/** Получение кода страницы Контрагента */
function getContractorPageCode(): string {
  return Context.data.contractor_page_path;
}

async function createInteractionByRequestId(
  requestId: string,
  contractorId: string,
  phone: string
): Promise<void> {}

/** Установить обращение в фильтр */
async function setFilterRequest(requestId: string) {}

async function setRequest(id: string) {}

export default {
  getAppeals,
  getRequestsCount,
  getStatuses,
  getInsuredStatuses,
  getChannels,
  getRequestIdByTaskId,
  getRequestLink,
  getSelectRequestAccessSettings,
  getSelectRequestLink,
  getSelectInsuredLink,
  OnInit,

  getRequestPagePath,
  getSelectTaskPageCode,
  getContractorPageCode,
  createInteractionByRequestId,
  setFilterRequest,
  setRequest,
};
