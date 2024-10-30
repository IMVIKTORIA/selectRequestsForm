import React, { useEffect, useRef, useState } from 'react';
import { selectTaskContext, SelectTaskData } from '../../stores/SelectTaskContext';
import Header from '../Header/Header';
import SelectTaskFiltersForm from '../SelectTaskFiltersForm/SelectTaskFiltersForm';
import SelectTaskList from '../SelectTaskList/SelectTaskList';
import { getDataFromDraft } from '../../shared/utils/utils';

/** Форма отбора задач */
export default function SelectTaskForm() {
	const [data, setValue] = selectTaskContext.useState()
	const contentWrapperRef = useRef<HTMLDivElement>(null)

	// Подгрузка данных
	React.useLayoutEffect(() => {
		// Данные формы из черновика
		let draftData: SelectTaskData;
		try {
			draftData = getDataFromDraft()
		} catch (e) {
			throw new Error("Ошибка получения данных из черновика: " + e)
		}

		if (!draftData) return;

		// Установка фильтров
		setValue("filters", draftData.filters);
		// Установка состояния оберток фильтров
		setValue("filterStates", draftData.filterStates);
	}, [])

	useEffect(() => { console.log(data) }, [data])

	const [isShowFilters, setIsShowFilters] = useState<boolean>(true);
	const toggleShowFilters = () => setIsShowFilters(!isShowFilters);

	// Ширина списка
	const [listWidth, setListWidth] = useState<number>(0);

	// Назначение обработчиков событий
	useEffect(() => {
		handleResizeWrapper();
		window.addEventListener("resize", handleResizeWrapper)

		return () => { window.removeEventListener("resize", handleResizeWrapper) }
	}, [])

	// Обработчик изменения размера
	const handleResizeWrapper = () => {
		const width = contentWrapperRef.current?.getBoundingClientRect().width ?? 0;
		setListWidth(width)
	}

	return (
		<selectTaskContext.Provider value={{ data, setValue }}>
			<div className="select-task-form">
				<div className="select-task-form__header">
					<Header clickFilterHandler={toggleShowFilters} elementsCount={data.elementsCount} title='Форма отбора задач' />
				</div>
				<div className="select-task-form__content" ref={contentWrapperRef}>
					<div className={`select-task-form__filters${!isShowFilters ? " select-task-form__filters_hidden" : ""}`}>
						<SelectTaskFiltersForm />
					</div>
					<div className="select-task-form__list">
						<div>
							<SelectTaskList width={listWidth} />
						</div>
					</div>
				</div>
			</div>
		</selectTaskContext.Provider >
	)
}