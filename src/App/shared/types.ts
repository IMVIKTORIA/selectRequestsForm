import { ItemData, ItemDataString } from '../../UIKit/CustomList/CustomListTypes'

export interface IInputData<DataType = any> {
	value: string
	data?: DataType
}

export class SelectTaskData {
	// Номер задачи - строчька
	number?: ItemData
	// Вид задачи - поиск по названию
	status?: ItemData
	// Вид задачи - поиск по названию
	channel?: ItemData
	channelManual?: ItemData
	// Дата создания - дата с по
	createdAt?: ItemDataString
	contragent?: ItemData
	appeal?: ItemData
	appealSubject?: ItemData
	status3l?: ItemData
	policy?: ItemData
	product?: ItemData

	constructor({
		number,
		status,
		channel,
		channelManual,
		createdAt,
		contragent,
		appeal,
		appealSubject,
		status3l,
		policy,
		product,
	}: SelectTaskData) {
		this.number = number
		this.status = status
		this.channel = channel
		this.channelManual = channelManual
		this.createdAt = createdAt
		this.contragent = contragent
		this.appeal = appeal
		this.appealSubject = appealSubject
		this.status3l = status3l
		this.policy = policy
		this.product = product
	}
}
