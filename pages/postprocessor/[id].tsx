import Head from "next/head";
import { useRouter } from "next/router";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { Card } from "@mui/material";

import { calculateData, getConstructionsFromLocalStorage, xsCalc } from "../../utils";
import { ConstructionQuery } from "../../types";
import { ConstructionsTable } from "../../components/constructions-table";

const Id = () => {
  const [constructions, setConstructions] = useState<ConstructionQuery[]>([]);
  const [selectedConstruction, setSelectedConstruction] = useState<ConstructionQuery>();

  const { push, query: { id } } = useRouter();

  useEffect(() => {
    setConstructions(getConstructionsFromLocalStorage());
  }, []);

  useEffect(() => {
    setSelectedConstruction(constructions?.find(({ name }) => name === id));
  }, [constructions, id])

  return (
    <>
      <Head>
        <title>Рассчет значений</title>
        <meta name="description" content="postprocessorValue" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className="bg-dark">
        <div className="container d-flex align-items-center">
          <Typography
            variant="h1"
            className="fs-1 fw-bold p-3 text-bg-info"
          >
            <Link href="/postprocessor">Вернуться</Link>
          </Typography>
          <Typography variant="h2" className="ms-5 fs-3 text-secondary">
            {`Рассчет значений для конструкции - ${typeof id === 'string' && id?.replace("construction.", "")}`}
          </Typography>
        </div>
      </header>
      <main>
        <div className="container">
          <div className="row mt-4">
            <div className="col-4">
              <ConstructionsTable cb={() => push('/postprocessor')} />
            </div>
            <div className="col-8">

              {xsCalc(selectedConstruction?.construction.rodsData)?.map((xsArr, index) => (
                <div key={index}>
                  <table className="table">
                    <thead className="bg-dark text-white">
                      <tr>
                        <th>{`Стержень ${++index}`}</th>
                        {xsArr.map((value) => (
                          <th key={value}>{value}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>N</td>
                        {calculateData(selectedConstruction?.construction)?.N?.[--index]?.map((value) => (
                          <td key={value}>{value}</td>
                        ))}
                      </tr>
                      <tr>
                        <td>U</td>
                        {calculateData(selectedConstruction?.construction)?.U?.[index]?.map((value) => (
                          <td key={value}>{value}</td>
                        ))}
                      </tr>
                      <tr>
                        <td>σ</td>
                        {calculateData(selectedConstruction?.construction)?.S?.[index]?.map((value) => (
                          <td key={value} className={value <= (selectedConstruction?.construction?.rodsData?.[index]?.allowableVoltage as number) && value >= (-(selectedConstruction?.construction?.rodsData?.[index]?.allowableVoltage as number)) ? `text-bg-success` : 'text-bg-danger'}>{value}</td>
                        ))}
                      </tr>
                    </tbody>
                  </table>
                </div>
              ))}
            </div>
          </div>
        </div>

      </main>
    </>
  )
}

export default Id;