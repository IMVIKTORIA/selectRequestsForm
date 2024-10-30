import React from 'react'
import { initGlobalContext } from './GlobalContext'
import {
	AppFilter,
	DateFilter,
	IFiltersData,
	ListFilter,
	StringFilter,
} from '../../UIKit/Filters/FiltersTypes'

/** Данные обращения */
export class SelectTaskData {
	/** Фильтры поиска */
	filters: SelectTaskFilters
	/** Состояние оберток фильтров */
	filterStates: SelectTaskFiltersStates
	/** Обработчик нажатия на кнопку поиск */
	onClickSearch: () => Promise<void>
	/** Количество отобранных элементов */
	elementsCount: number

	constructor() {
		this.filters = new SelectTaskFilters()
		this.filterStates = new SelectTaskFiltersStates()
		this.onClickSearch = async () => {
			alert('test')
		}
		this.elementsCount = 0
	}
}

/** Состояние оберток фильтров */
export class SelectTaskFiltersStates {
	/** Номер */
	number: boolean
	/** Статус обращения */
	status: boolean
	appeal: boolean
	/** Канал */
	channel: boolean
	/** Канал ручной ввод */
	channelManual: boolean
	/** Дата создания */
	createdAt: boolean
	/** Обратившийся*/
	contragent: boolean
	/** Застрахованный */
	appealSubject: boolean
	/** Статус 3Л */
	status3l: boolean
	/** Полис */
	policy: boolean
	/** Продукт*/
	product: boolean

	constructor() {
		this.number = false
		this.status = false
		this.appeal = false
		this.channel = false
		this.channelManual = false
		this.createdAt = false
		this.contragent = false
		this.appealSubject = false
		this.status3l = false
		this.policy = false
		this.product = false
	}
}

/** Значения фильтров формы отбора задач */
export class SelectTaskFilters implements IFiltersData {
	/** Номер задачи */
	number: StringFilter
	/** Вид задачи */
	status: ListFilter
	appeal: StringFilter
	/** Вид задачи */
	channel: ListFilter
	/** Вид задачи */
	channelManual: StringFilter
	/** Дата создания */
	createdAt: DateFilter
	/** Вид задачи */
	contragent: StringFilter
	/** Вид задачи */
	appealSubject: StringFilter
	/** Вид задачи */
	status3l: ListFilter
	/** Вид задачи */
	policy: StringFilter
	/** Вид задачи */
	product: StringFilter

	constructor() {
		this.number = new StringFilter('number', 'номер')
		this.status = new ListFilter('status', 'статус обращения')
		this.appeal = new StringFilter('appeal', 'тема обращения')
		this.channel = new ListFilter('channel', 'канал')
		this.channelManual = new StringFilter('channelManual', 'канал(Ручной ввод)')
		this.createdAt = new DateFilter('createdAt', 'дата создания')
		this.contragent = new StringFilter('contragent', 'обратившийся')
		this.appealSubject = new StringFilter('appealSubject', 'застрахованный')
		this.status3l = new ListFilter('status3l', 'Статус 3Л')
		this.policy = new StringFilter('policy', 'полис')
		this.product = new StringFilter('product', 'продукт')
	}

	reset() {
		this.number.reset()
		this.status.reset()
		this.appeal.reset()
		this.channel.reset()
		this.channelManual.reset()
		this.createdAt.reset()
		this.contragent.reset()
		this.appealSubject.reset()
		this.status3l.reset()
		this.policy.reset()
		this.product.reset()
	}
}

export const selectTaskContext = initGlobalContext<SelectTaskData>(new SelectTaskData())
