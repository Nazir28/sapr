import BootstrapTable from "react-bootstrap-table-next";
// @ts-ignore
import cellEditFactory from "react-bootstrap-table2-editor";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Button } from "@mui/material";

import { RodsDataState, HaveSupportsState } from "../../types";
// import { tableColumns } from "./constants";
import { Dispatch, SetStateAction } from "react";
import { isNaNValidate } from "./utils";


export const tableColumns = [
  {
    dataField: "indexNumber",
    text: "№",
    editable: false,
  },
  {
    dataField: "rodLength",
    text: "Длина стержня (L)",
    editable: true,
    validator: (newValue: number) => isNaNValidate(newValue),
  },
  {
    dataField: "crossSectionalArea",
    text: "Площадь поперечного сечения (A)",
    editable: true,
    validator: (newValue: number) => isNaNValidate(newValue),
  },
  {
    dataField: "elasticModulus",
    text: "Модуль упругости (E)",
    editable: true,

    validator: (newValue: number) => isNaNValidate(newValue),
  },
  {
    dataField: "allowableVoltage",
    text: "Допускаемое напряжение (σ)",
    editable: true,

    validator: (newValue: number) => isNaNValidate(newValue),
  },
  {
    dataField: "concentratedLoad",
    text: "Сосредоточенная нагрузка (F)",
    editable: true,

    validator: (newValue: number) => isNaNValidate(newValue),
  },
  {
    dataField: "linearLoad",
    text: "Погонная нагрузка (Q)",
    editable: true,

    validator: (newValue: number) => isNaNValidate(newValue),
  },
];

interface RodsTableProps {
  rodsDataState: RodsDataState;
  haveSupportsState: HaveSupportsState;
  setIsShowModal: Dispatch<SetStateAction<boolean>>;
}

const RodsTable = ({
  rodsDataState,
  haveSupportsState,
  setIsShowModal,
}: RodsTableProps) => {
  const { isHaveSupports, setIsHaveSupports } = haveSupportsState;
  const { rodsData, setRodsData } = rodsDataState;

  return (
    <div className="preprocessorApp__block mt-4">
      <h5>Конструкция</h5>
      <div className="overflow-auto">
        <BootstrapTable
          keyField="id"
          classes="bg-white"
          data={rodsData.map((rod, index) => {
            return { ...rod, indexNumber: ++index };
          })}
          columns={tableColumns}
          cellEdit={cellEditFactory({
            mode: "dbclick",
            afterSaveCell: (
              _oldValue: any,
              newValue: any,
              currentRod: { id: string },
              column: { dataField: any }
            ) => {
              setRodsData(
                rodsData.map((rod) => {
                  if (rod.id === currentRod.id) {
                    return { ...rod, [column.dataField]: newValue };
                  }
                  return rod;
                })
              );
            },
          })}
        />
      </div>
      <Row>
        <Col>
          <input
            className="form-check-input"
            type="checkbox"
            value={Number(isHaveSupports.supportLeft)}
            onChange={() =>
              setIsHaveSupports((prevState) => {
                return {
                  ...prevState,
                  supportLeft: !prevState.supportLeft,
                };
              })
            }
            id="supportLeft"
          />
          <label className="form-check-label mx-3" htmlFor="supportLeft">
            Опора слева
          </label>
          <input
            className="form-check-input"
            type="checkbox"
            value={Number(isHaveSupports.supportRight)}
            onChange={() =>
              setIsHaveSupports((prevState) => {
                return {
                  ...prevState,
                  supportRight: !prevState.supportRight,
                };
              })
            }
            id="supportRight"
          />
          <label className="form-check-label mx-3" htmlFor="supportRight">
            Опора справа
          </label>
        </Col>

        <button onClick={() => setIsShowModal(true)} className="btn btn-outline-success mt-3">
          Сохранить конструкцию
        </button>

      </Row>
    </div>
  );
};

export default RodsTable;
