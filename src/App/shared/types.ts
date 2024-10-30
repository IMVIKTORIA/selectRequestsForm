import { ItemData, ItemDataString } from "../../UIKit/CustomList/CustomListTypes";

export interface IInputData<DataType = any> {
  value: string;
  data?: DataType;
}

export class SelectRequestData {
  /** Номер обращения */
  number?: ItemData;
  /** Статус */
  status?: ItemData;
  /** Тема обращения */
  appeal?: ItemDataString;
  /** Канал */
  channel?: ItemData;
  /** Канал(Ручной ввод) */
  channelManual?: ItemData;
  /** Дата создания */
  createdAt?: ItemDataString;
  /** Обратившийся */
  contragent?: ItemData;
  /** Застрахованный */
  appealSubject?: ItemData;
  /** Статус ЗЛ */
  insuredStatus?: ItemData;
  /** Полис */
  policy?: ItemData;
  /** Продукт */
  product?: ItemData;

  constructor({
    number,
    status,
    channel,
    channelManual,
    createdAt,
    contragent,
    appeal,
    appealSubject,
    insuredStatus,
    policy,
    product,
  }: SelectRequestData) {
    this.number = number;
    this.status = status;
    this.channel = channel;
    this.channelManual = channelManual;
    this.createdAt = createdAt;
    this.contragent = contragent;
    this.appeal = appeal;
    this.appealSubject = appealSubject;
    this.insuredStatus = insuredStatus;
    this.policy = policy;
    this.product = product;
  }
}
