import React, { useEffect, useState } from 'react'
import FiltersWrapper from '../../../UIKit/Filters/FiltersWrapper/FiltersWrapper'
import FilterItemString from '../../../UIKit/Filters/FilterItems/FilterItemString/FilterItemString'
import { selectRequestContext } from '../../stores/SelectRequestContext'
import { IFilter, ObjectItem } from '../../../UIKit/Filters/FiltersTypes'
import FilterItemDates from '../../../UIKit/Filters/FilterItems/FilterItemDates/FilterItemDates'
import FilterItemSearch from '../../../UIKit/Filters/FilterItems/FilterItemSearch/FilterItemSearch'
import FilterItemCategory from '../../../UIKit/Filters/FilterItems/FilterItemCategory/FilterItemCategory'
import Scripts from '../../shared/utils/clientScripts'
import { saveState } from '../../shared/utils/utils'

interface SelectRequestFiltersProps { }

/** Фильтры формы отбора обращений */
export default function SelectRequestFiltersForm({ }: SelectRequestFiltersProps) {
	const { data, setValue } = selectRequestContext.useContext()
	const filters = data.filters

	/** Статусы */
	const [statuses, setStatuses] = useState<ObjectItem[]>([]);
	/** Каналы */
	const [channels, setChannels] = useState<ObjectItem[]>([]);
	/** Статусы ЗЛ */
	const [insuredStatuses, setInsuredStatuses] = useState<ObjectItem[]>([]);

	/** Получение вариантов категорий */
	React.useLayoutEffect(() => {
		Scripts.getStatuses().then(items => setStatuses(items))
		Scripts.getChannels().then(items => setChannels(items))
		Scripts.getInsuredStatuses().then(items => setInsuredStatuses(items))
	}, [])

	/** Изменение значения конкретного фильтра */
	const changeFilterValue = (key: string, value: IFilter) => {
		const currentFilters = filters
		currentFilters[key] = value
		setValue('filters', currentFilters)
	}

	const changeValueConstructor = (key: string) => {
		return (value: IFilter) => changeFilterValue(key, value)
	}

	/** Сброс фильтров */
	const resetFilters = () => {
		data.filters.reset()
		setValue('filters', data.filters)
	}

	/** Обработчик нажатия на кнопку поиска */
	const searchHandler = async () => {
		// Количество отобранных элементов
		const elementsCount = await Scripts.getRequestsCount(data.filters)
		setValue('elementsCount', elementsCount)

		// Поиск
		data.onClickSearch()
	}

	// Установка состояния обертки
	const setIsOpenFactory = (code: string) => {
		return (isOpen: boolean) => {
			const filterStates = data.filterStates

			filterStates[code] = isOpen

			setValue('filterStates', filterStates)
		}
	}

	/** Сохранение состояния формы */
	const saveStateHandler = () => {
		saveState(data)
	}

	/** Ссылка на форму отбора обращения */
	const selectRequestHref = Scripts.getSelectRequestLink()
	/** Ссылка на форму отбора застрахованного */
	const selectInsuredHref = Scripts.getSelectInsuredLink()

	return (
		<FiltersWrapper
			searchHandler={searchHandler}
			resetHandler={resetFilters}
			isSearchButtonDisabled={Scripts.getSelectRequestAccessSettings().searchButton < 2}
		>
			<FilterItemString
				setIsOpenInit={setIsOpenFactory(data.filters.number.fieldCode)}
				isOpenInit={data.filterStates.number}
				title={data.filters.number.fieldName}
				filterValue={data.filters.number}
				setFilterValue={changeValueConstructor(data.filters.number.fieldCode)}
			/>
			<FilterItemCategory
				setIsOpenInit={setIsOpenFactory(data.filters.status.fieldCode)}
				isOpenInit={data.filterStates.status}
				title={data.filters.status.fieldName}
				filterValue={data.filters.status}
				variants={statuses}
				setFilterValue={changeValueConstructor(data.filters.status.fieldCode)}
			/>
			<FilterItemCategory
				setIsOpenInit={setIsOpenFactory(data.filters.channel.fieldCode)}
				isOpenInit={data.filterStates.channel}
				title={data.filters.channel.fieldName}
				filterValue={data.filters.channel}
				variants={channels}
				setFilterValue={changeValueConstructor(data.filters.channel.fieldCode)}
			/>
			<FilterItemString
				setIsOpenInit={setIsOpenFactory(data.filters.channelManual.fieldCode)}
				isOpenInit={data.filterStates.channelManual}
				title={data.filters.channelManual.fieldName}
				filterValue={data.filters.channelManual}
				setFilterValue={changeValueConstructor(data.filters.channelManual.fieldCode)}
			/>
			<FilterItemDates
				setIsOpenInit={setIsOpenFactory(data.filters.createdAt.fieldCode)}
				isOpenInit={data.filterStates.createdAt}
				title={data.filters.createdAt.fieldName}
				filterValue={data.filters.createdAt}
				setFilterValue={changeValueConstructor(data.filters.createdAt.fieldCode)}
			/>
			<FilterItemString
				setIsOpenInit={setIsOpenFactory(data.filters.contragent.fieldCode)}
				isOpenInit={data.filterStates.contragent}
				title={data.filters.contragent.fieldName}
				filterValue={data.filters.contragent}
				setFilterValue={changeValueConstructor(data.filters.contragent.fieldCode)}
			/>
			<FilterItemString
				setIsOpenInit={setIsOpenFactory(data.filters.appealSubject.fieldCode)}
				isOpenInit={data.filterStates.appealSubject}
				title={data.filters.appealSubject.fieldName}
				filterValue={data.filters.appealSubject}
				setFilterValue={changeValueConstructor(data.filters.appealSubject.fieldCode)}
			/>
			<FilterItemCategory
				setIsOpenInit={setIsOpenFactory(data.filters.insuredStatus.fieldCode)}
				isOpenInit={data.filterStates.insuredStatus}
				title={data.filters.insuredStatus.fieldName}
				filterValue={data.filters.insuredStatus}
				variants={insuredStatuses}
				setFilterValue={changeValueConstructor(data.filters.insuredStatus.fieldCode)}
			/>
			<FilterItemString
				setIsOpenInit={setIsOpenFactory(data.filters.policy.fieldCode)}
				isOpenInit={data.filterStates.policy}
				title={data.filters.policy.fieldName}
				filterValue={data.filters.policy}
				setFilterValue={changeValueConstructor(data.filters.policy.fieldCode)}
			/>
			<FilterItemString
				setIsOpenInit={setIsOpenFactory(data.filters.product.fieldCode)}
				isOpenInit={data.filterStates.product}
				title={data.filters.product.fieldName}
				filterValue={data.filters.product}
				setFilterValue={changeValueConstructor(data.filters.product.fieldCode)}
			/>
			{/* <FilterItemString setIsOpenInit={setIsOpenFactory(data.filters.request.fieldCode)} isOpenInit={data.filterStates.request} title={data.filters.request.fieldName} filterValue={data.filters.request} setFilterValue={changeValueConstructor(data.filters.request.fieldCode)} /> */}
			{/* <FilterItemString isOpenInit={data.filterStates.insured} title={data.filters.insured.fieldName} filterValue={data.filters.insured} setFilterValue={changeValueConstructor(data.filters.insured.fieldCode)} /> */}
		</FiltersWrapper>
	)
}
