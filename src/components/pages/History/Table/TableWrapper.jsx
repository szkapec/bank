import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { TableData } from "./helper/helper";
import Table from "./Table";
import { selectorUser } from "../../../../store/Login/loginSelector";
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ForkLeftIcon from '@mui/icons-material/ForkLeft';
import ForkRightIcon from '@mui/icons-material/ForkRight';

import KeyboardTabIcon from '@mui/icons-material/KeyboardTab';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';

const columns = [
  {
    Header: "Imię i nazwisko",
    accessor: "firstName",
  },
  {
    Header: "Tytuł przelewu",
    accessor: "body",
  },
  {
    Header: "Numer konta",
    accessor: "account",
  },
  {
    Header: "Cena",
    accessor: "price",
  },
  {
    Header: "Data",
    accessor: "date",
  },
  {
    id: "expander",
    Cell: ({ row }) =>
      row.canExpand ? (
        <span
          {...row.getToggleRowExpandedProps({
            style: {
              paddingLeft: `${row.depth * 2}rem`,
            },
          })}
        >
          {row.isExpanded ? <ArrowDropDownIcon/> : <ArrowLeftIcon/>}
        </span>
      ) : null,
  },
];

const ContainerTable = ({ transfersSelector, accountNumberSelector }) => {
  const data = TableData(transfersSelector, accountNumberSelector) || [];
  const userSelector = useSelector(selectorUser);

  const recExp = useMemo(() => {
    const data = transfersSelector?.map((transfer) => {
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
  }, [transfersSelector?.length]);

  const countPrecent = () => {
    const rec = -recExp.receipts;
    const count = ((recExp.expenses - rec) / rec) * 100;
    if (count) {
      return {
        expensesPercent: 50 + count + "%",
        receiptsPercent: 50 - count + "%",
      };
    } else
      return {
        expensesPercent: "50%",
        receiptsPercent: "50%",
      };
  };

  return (
    <StyledWrapper>
      <StyledRecExp
        rec={countPrecent().receiptsPercent}
        exp={countPrecent().expensesPercent}
      >
        <div className="balance">
          <div>Bilans wpływy i wydatki</div>
          <div className="money">
            {(recExp.expenses - -recExp.receipts).toFixed(2)} PLN
          </div>
        </div>
        <div className="line">
          <span className="expenses">
            <b><KeyboardReturnIcon/> Wpływy</b>
          </span>

          <span className="receipts">
            <b> <KeyboardTabIcon/> Wydatki</b>
          </span>
        </div>
        <div className="price">
          <span className="expenses">{recExp.expenses} PLN</span>
          <span className="receipts"> {recExp.receipts} PLN</span>
        </div>
      </StyledRecExp>
      <StyledOperation>
        <div>
          Lista operacji: <span>{transfersSelector?.length}</span>{" "}
        </div>
        <div>Exportuj historię operacji</div>
      </StyledOperation>
      <StyledTable>
        <Table columns={columns} data={data} />
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
    }
    .receipts {
      background-color: red;
      width: ${(props) => props.rec};
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

export default ContainerTable;
