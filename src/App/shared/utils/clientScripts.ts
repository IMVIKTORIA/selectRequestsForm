import {
	FetchData,
	ItemData,
	ItemDataString,
	SortData,
} from '../../../UIKit/CustomList/CustomListTypes'
import { ObjectItem } from '../../../UIKit/Filters/FiltersTypes'
import { FetchInputData } from '../../../UIKit/shared/types/types'
import { SelectTaskFilters } from '../../stores/SelectTaskContext'
import { SelectTaskData } from '../types'

/** Заглушка ожидания ответа сервера */
function randomDelay() {
	const delay = Math.random() * 1000
	return new Promise((resolve) => {
		setTimeout(resolve, delay)
	})
}

/** Получение списка обращений */
async function getAppeals(
	page: number,
	sortData?: SortData,
	searchData?: SelectTaskFilters
): Promise<FetchData<SelectTaskData>> {
	await randomDelay()

	console.log({
		page,
		sortData,
		searchData,
	})

	const mockData = {
		number: new ItemData({ value: 'RQ00000004/24', info: 'test' }),
		status: new ItemData({ value: 'Новое', info: 'test' }),
		channel: new ItemData({ value: 'Телефон', info: 'test' }),
		createdAt: new ItemDataString('06.12.2023 12:22'),
		contragent: new ItemData({ value: 'Иванов Иван Иванович', info: 'test' }),
		appeal: new ItemData({ value: 'Тестирование', info: 'test' }),
		appealSubject: new ItemData({ value: 'Петров Петр Петрович', info: 'test' }),
		status3l: new ItemData({ value: 'VIP', info: 'test' }),
		policy: new ItemData({ value: 'Тест', info: 'test' }),
		product: new ItemData({ value: 'Сбереги здоровье', info: 'test' }),
	}
	return {
		items: Array(5)
			.fill(0)
			.map((data, index) => {
				return {
					id: String(index),
					data: new SelectTaskData(mockData),
				}
			}),
		hasMore: true,
	}
}

/** Получение количества задач по фильтрам */
async function getTasksCount(searchData?: SelectTaskFilters): Promise<number> {
	return 0
}

/** Получение статусов обращений */
async function getStatus(page: number, query?: string | undefined): Promise<FetchInputData> {
	await randomDelay()

	const sorts: ObjectItem[] = [
		new ObjectItem({ code: 'test', value: 'Открыто' }),
		new ObjectItem({ code: 'test1', value: 'В работе' }),
		new ObjectItem({ code: 'test2', value: 'Уточнение запроса' }),
		new ObjectItem({ code: 'test3', value: 'В ожидании' }),
		new ObjectItem({ code: 'test4', value: 'Закрыто' }),
	]

	return {
		items: sorts,
		hasMore: true,
	}
}

/** Получение статусов 3Л */
async function getStatus3l(page: number, query?: string | undefined): Promise<FetchInputData> {
	await randomDelay()

	const sorts: ObjectItem[] = [
		new ObjectItem({ code: 'test', value: 'VIP' }),
		new ObjectItem({ code: 'test1', value: 'Проблемный' }),
		new ObjectItem({ code: 'test2', value: 'Сотрудник Сбер' }),
	]

	return {
		items: sorts,
		hasMore: true,
	}
}

/** Получение каналов */
async function getChannel(page: number, query?: string | undefined): Promise<FetchInputData> {
	await randomDelay()

	const sorts: ObjectItem[] = [
		new ObjectItem({ code: 'test', value: 'Email' }),
		new ObjectItem({ code: 'test1', value: 'СМС' }),
		new ObjectItem({ code: 'test2', value: 'Телефон' }),
		new ObjectItem({ code: 'test3', value: 'Ручной ввод' }),
		new ObjectItem({ code: 'test4', value: 'email(GMAIL)' }),
		new ObjectItem({ code: 'test5', value: 'email(Все линии)' }),
	]

	return {
		items: sorts,
		hasMore: true,
	}
}

/** Получение id обращения по id задачи */
async function getRequestIdByTaskId(taskId: string): Promise<string> {
	return 'test'
}

/** Получение ссылки для перехода на страницу обращения */
async function getRequestLink(): Promise<string> {
	return '#test'
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
	searchButton: AccessLevel
	appendResponsible: AccessLevel
}

/** Получить настройки доступа формы отбора задач */
function getSelectTaskAccessSettings(): ISelectTaskAccessSettings {
	return {
		'searchButton': 1,
		'appendResponsible': 2,
	}
}

/** Получить ссылку формы отбора обращений */
function getSelectRequestLink(): string {
	return '#selectRequestTest'
}

/** Получить ссылку формы отбора застрахованных */
function getSelectInsuredLink(): string {
	return '#selectRequestTest'
}

export default {
	getAppeals,
	getTasksCount,
	getStatus,
	getStatus3l,
	getChannel,
	getRequestIdByTaskId,
	getRequestLink,
	getSelectTaskAccessSettings,
	getSelectRequestLink,
	getSelectInsuredLink,
}
