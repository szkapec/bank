import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../../store/hooks";
import { getTransfers } from "../../../store/Transfer/transferThunk";
import { selectorAuthLoginUserNumberAccount } from "../../../store/Login/loginSelector";
import {
  selectorLoaderTransfer,
  selectorTransfers,
} from "../../../store/Transfer/transferSelector";
import "./History.scss";
import Table from "./Table/TableWrapper";
import Search from "./Search/Search";
import Loader from "../../Loader/Loader";

const History = () => {
  const dispatch = useAppDispatch();
  const accountNumberSelector = useSelector(selectorAuthLoginUserNumberAccount);
  const transfersSelector = useSelector(selectorTransfers);
  const loaderSelector = useSelector(selectorLoaderTransfer);

  useEffect(() => {
    accountNumberSelector && dispatch(getTransfers(accountNumberSelector));
  }, [accountNumberSelector]);

  return (
    <div className="history">
      <Search />
      {loaderSelector ? (
        <Loader text="Ładuje historie przelewów" />
      ) : (
        <Table
          transfersSelector={transfersSelector}
          accountNumberSelector={accountNumberSelector}
        />
      )}
    </div>
  );
};

export default History;
