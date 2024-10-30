import React, { useEffect, useState } from 'react'
import FiltersWrapper from '../../../UIKit/Filters/FiltersWrapper/FiltersWrapper'
import FilterItemString from '../../../UIKit/Filters/FilterItems/FilterItemString/FilterItemString'
import { selectTaskContext } from '../../stores/SelectTaskContext'
import { IFilter } from '../../../UIKit/Filters/FiltersTypes'
import FilterItemDates from '../../../UIKit/Filters/FilterItems/FilterItemDates/FilterItemDates'
import FilterItemSearch from '../../../UIKit/Filters/FilterItems/FilterItemSearch/FilterItemSearch'
import Scripts from '../../shared/utils/clientScripts'
import { saveState } from '../../shared/utils/utils'

interface SelectTaskFiltersProps {}

/** Фильтры формы отбра задач */
export default function SelectTaskFiltersForm({}: SelectTaskFiltersProps) {
	const { data, setValue } = selectTaskContext.useContext()
	const filters = data.filters

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
		const elementsCount = await Scripts.getTasksCount(data.filters)
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
			isSearchButtonDisabled={Scripts.getSelectTaskAccessSettings().searchButton < 2}
		>
			<FilterItemString
				setIsOpenInit={setIsOpenFactory(data.filters.number.fieldCode)}
				isOpenInit={data.filterStates.number}
				title={data.filters.number.fieldName}
				filterValue={data.filters.number}
				setFilterValue={changeValueConstructor(data.filters.number.fieldCode)}
			/>
			<FilterItemSearch
				setIsOpenInit={setIsOpenFactory(data.filters.status.fieldCode)}
				isOpenInit={data.filterStates.status}
				title={data.filters.status.fieldName}
				filterValue={data.filters.status}
				getDataHandler={Scripts.getStatus}
				setFilterValue={changeValueConstructor(data.filters.status.fieldCode)}
			/>
			<FilterItemSearch
				setIsOpenInit={setIsOpenFactory(data.filters.channel.fieldCode)}
				isOpenInit={data.filterStates.channel}
				title={data.filters.channel.fieldName}
				filterValue={data.filters.channel}
				getDataHandler={Scripts.getChannel}
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
			<FilterItemSearch
				setIsOpenInit={setIsOpenFactory(data.filters.status3l.fieldCode)}
				isOpenInit={data.filterStates.status3l}
				title={data.filters.status3l.fieldName}
				filterValue={data.filters.status3l}
				getDataHandler={Scripts.getStatus3l}
				setFilterValue={changeValueConstructor(data.filters.status3l.fieldCode)}
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