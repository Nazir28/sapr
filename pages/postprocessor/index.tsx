import { useEffect, useState } from "react";
import Head from "next/head";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import { Table } from "react-bootstrap";
import { Button } from "@mui/material";

import { getConstructionsFromLocalStorage } from "../../utils";
import { ConstructionQuery } from "../../types";
import { ConstructionsTable } from "../../components/constructions-table";

const Index = () => {
  return (
    <>
      <Head>
        <title>Постпроцессор</title>
        <meta name="description" content="postprocessor" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className="bg-dark">
        <div className="container d-flex align-items-center">
          <Typography
            variant="h1"
            className="fs-1 fw-bold p-3 text-bg-info"
          >
            <Link href="/">Вернуться</Link>
          </Typography>
          <Typography variant="h2" className="ms-5 fs-3 text-secondary">
            Постпроцессор
          </Typography>
        </div>
      </header>
      <main>
        <div className="container">
          <div className="col-4 mt-4">
            <ConstructionsTable />
          </div>
        </div>
      </main>
    </>
  );
};

export default Index;
