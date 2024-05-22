import React, { useMemo, useRef, useState, useCallback } from "react";
import styled from "styled-components";
import { TableData } from "./helper/helper";
import Table from "./Table";
import KeyboardTabIcon from "@mui/icons-material/KeyboardTab";
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";
import useSearch from "../Hook/useSearch";
import Loader from "components/Loader/Loader";
import { Box } from "@mui/material";
import { columnsForHistory } from "./helper/Columns";

const TableWrapper = ({ accountNumberSelector }) => {
  const [pageNumber, setPageNumber] = useState(1);

  const { transfers, loading, end, error } = useSearch(
    accountNumberSelector,
    pageNumber
  );

  const dataTable = TableData(transfers, accountNumberSelector) || [];

  const data = useMemo(() => {
    return dataTable;
  }, [dataTable.length]);

  const observer = useRef();
  const lastBookElementRef = useCallback((node) => {
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setPageNumber((prevPageNumber) => prevPageNumber + 1);
      }
    });
    if (node) observer.current.observe(node);
  }, []);

  const recExp = useMemo(() => {
    const data = transfers?.map((transfer) => {
      return transfer.fromUser.bankAccountNumber === accountNumberSelector
        ? {
            receipts: -transfer.howMuchMoney,
          }
        : {
            expenses: transfer.howMuchMoney,
          };
    });

    return {
      receipts: data
        ?.filter((rec) => rec.receipts)
        ?.reduce((prev, value) => prev + value.receipts, 0)
        .toFixed(2),
      expenses: data
        ?.filter((exp) => exp.expenses)
        ?.reduce((prev, value) => prev + Number(value.expenses), 0)
        .toFixed(2),
    };
  }, [transfers?.length]);


  const newCountPrecent = () => {
    const revenues = Number(recExp.expenses);
    const costs = -Number(recExp.receipts);
    return {
      rec: (costs / revenues) * 100 + '%',
      exp: '100%'
    }
  }

  return (
    <StyledWrapper>
      <StyledRecExp
        rec={newCountPrecent().rec}
        exp={newCountPrecent().exp}
      >
        <Box className="balance">
          <div>Bilans wpływy i wydatki</div>
          <div className="money">
            {(recExp.expenses - -recExp.receipts).toFixed(2)} PLN
          </div>
        </Box>
        <Box className="line">
          <span className="expenses">
            <b>
              <KeyboardReturnIcon /> Wpływy
            </b>
          </span>
          <span className="receipts">
            <b>
              {" "}
              <KeyboardTabIcon /> Wydatki
            </b>
          </span>
        </Box>
        <Box className="price">
          <span className="expenses">{recExp.expenses} PLN</span>
          <span className="receipts"> {recExp.receipts} PLN</span>
        </Box>
      </StyledRecExp>
      <StyledOperation>
        <Box>
          Lista operacji: <span>{transfers?.length}</span>{" "}
        </Box>
        <Box>Exportuj historię operacji</Box>
      </StyledOperation>
      <StyledTable>
        {data && (
          <Table
            columns={columnsForHistory}
            data={data}
            lastBookElementRef={lastBookElementRef}
          />
        )}
        <Box>{end && <StyledRecord>Nie ma więcej rekordów</StyledRecord>}</Box>
        <Box style={{ padding: "20px 0" }}>
          {loading && <Loader text={"Ładuje dane"} />}
        </Box>
        <Box>
          {error && (
            <StyledRecord>Coś poszło nie tak, przepraszamy ;( </StyledRecord>
          )}
        </Box>
      </StyledTable>
    </StyledWrapper>
  );
};

const StyledTable = styled.div`
  padding-top: 1rem;
  table {
    border-spacing: 0;
    border: 1px solid black;
    width: 100%;
    text-align: left;

    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }
    th,
    td {
      margin: 0;
      padding: 0.5rem;
      border-bottom: 1px solid black;

      :last-child {
        border-right: 0;
      }
    }

    .row-depth {
      background-color: #dddddd;
    }
  }
`;
const StyledRecord = styled.div`
  padding: 20px;
  font-weight: bold;
`;

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const StyledRecExp = styled.div`
  .balance {
    padding: 10px;
    text-transform: uppercase;
    margin-top: 10px;
    .money {
      font-size: 30px;
      margin: 10px 0;
    }
  }

  .line {
    display: flex;
    flex-wrap: nowrap;
    width: 100%;
    max-width: 100%;
    .expenses,
    .receipts {
      display: inline-block;
      color: white;
      padding: 10px 0;

      b {
        display: flex;
        align-items: center;
        svg {
          margin: 0 10px;
        }
      }
    }
    .expenses {
      background-color: green;
      width: ${(props) => props.exp};
      min-width: 120px;
    }
    .receipts {
      background-color: red;
      width: ${(props) => props.rec};
      min-width: 120px;
    }
  }
  .price {
    display: flex;
    justify-content: space-between;

    .expenses {
      color: green;
      border-left: 2px solid green;
      padding: 10px;
      font-weight: bold;
    }
    .receipts {
      color: red;
      border-right: 2px solid red;
      padding: 10px;
      font-weight: bold;
    }
  }
`;

const StyledOperation = styled.div`
  display: flex;
  margin: 10px 10px 0px;

  justify-content: space-between;
  color: red;
  font-weight: bold;
  z-index: 1;
  div {
    z-index: 3;
    padding-bottom: 10px;
    border-bottom: 1px solid grey;
    width: 50%;
  }
  div:first-child {
    border-bottom: 1px solid red;
  }
  div:last-child {
    text-align: right;
  }
  span {
    color: grey;
    text-decoration: underline;
  }
`;

export default TableWrapper;
