import React from "react";
import Scripts from "../../../shared/utils/clientScripts";
import { selectRequestContext } from "../../../stores/SelectRequestContext";
import Button from "../../../../UIKit/Button/Button";
import { redirectSPA } from "../../../shared/utils/utils";

interface SelectButtonProps {}

/** Кнопка Выбрать */
export default function SelectButton({}: SelectButtonProps) {
  const { data, setValue } = selectRequestContext.useContext();

  // Обработка создания взаимодействия
  const handleCreateInteraction = async (id: string) => {
    const phone = localStorage.getItem("medpult-call-phone");
    const contractorId = localStorage.getItem("medpult-call-contractor");

    if (phone || contractorId) {
      localStorage.removeItem("medpult-call-phone");
      localStorage.removeItem("medpult-call-contractor");
    } else {
      return false;
    }

    if (phone && contractorId) {
      await Scripts.createInteractionByRequestId(id, contractorId, phone);
      localStorage.removeItem("medpult-draft");
      const request_page_path = Scripts.getRequestPagePath();
      redirectSPA(request_page_path);
    } else {
      return false;
    }
    return true;
  };

  // Обработка записи обращения в фильтр
  const handleAddFilter = async (id: string) => {
    const fieldId = new URLSearchParams(window.location.search).get("field_id");
    if (fieldId == undefined) return false;
    if (fieldId != "select-task-request") return false;

    await Scripts.setFilterRequest(id);
    const select_task_page_code = Scripts.getSelectTaskPageCode();
    redirectSPA(select_task_page_code);

    return true;
  };

  /** Обработчик события нажатия на кнопку ссылки */
  const onClickViewRequests = async () => {
    const selectedAppealId = data.selectedItemsIds[0];
    await Scripts.setRequest(selectedAppealId);
    // Обработка создания взаимодействия
    if (await handleCreateInteraction(selectedAppealId)) return;
    // Обработка записи обращения в фильтр
    if (await handleAddFilter(selectedAppealId)) return;

    const request_page_path = Scripts.getRequestPagePath();
    redirectSPA(request_page_path);
  };

  return (
    <>
      {Boolean(data.selectedItemsIds.length) && (
        <Button
          title={"Выбрать" + `: ${data.selectedItemsIds.length}`}
          clickHandler={onClickViewRequests}
        />
      )}
    </>
  );
}
