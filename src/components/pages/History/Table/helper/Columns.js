import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import TableSaveOrRemoveRecipientsModal from "components/Modal/Table/TableSaveOrRemoveRecipientsModal";
import { configPdf } from "./configPdf";
import TextWrapper from "components/Contents/TextWrapper";

export const columnsForHistory = [
  {
    Header: "history.firstAndLastName",
    accessor: "firstName",
  },
  {
    Header: "history.titleTransfer",
    accessor: "body",
  },
  {
    Header: "history.accountNumber",
    accessor: "account",
  },
  {
    Header: "history.price",
    accessor: "price",
  },
  {
    Header: "history.date",
    accessor: "date",
  },
  {
    Header: "history.confirmation",
    id: "confirmation",
    Cell: ({ row }) =>
      row.canExpand ? (
        <button className="btn-pdf" onClick={() => configPdf(row)}>
          <TextWrapper label="history.confirmation" />
        </button>
      ) : null,
  },
  {
    id: "expander",
    Cell: ({ row }) => {
      return row.canExpand ? (
        <span
          {...row.getToggleRowExpandedProps({
            style: {
              paddingLeft: `${row.depth * 2}rem`,
            },
          })}
        >
          {row.isExpanded ? <ArrowDropDownIcon /> : <ArrowLeftIcon />}
        </span>
      ) : null;
    },
  },
  {
    Header: "history.settings",
    id: "settings",
    Cell: ({ row }) => {
      return row.canExpand ? (
        <TableSaveOrRemoveRecipientsModal
          historyTable
          numberAccount={row.original.account}
          recipient={parseData(row.original)}
        />
      ) : null;
    },
  },
];

const parseData = (data) => {
  const sum = data.price.slice(0, data.price.length - 3);
  return {
    recipientsAccount: data.account,
    title: data.body,
    sum: sum > 0 ? sum : 1,
    toRecipient: data.firstName,
  };
};
