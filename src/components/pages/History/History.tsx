import { useSelector } from "react-redux";
import { selectorAuthLoginUserNumberAccount } from "../../../store/Login/loginSelector";
import { selectorLoaderTransfer } from "../../../store/Transfer/transferSelector";
import Table from "./Table/TableWrapper";
import Search from "./Search/Search";
import Loader from "../../Loader/Loader";
import "./History.scss";

const History = () => {
  const accountNumberSelector = useSelector(selectorAuthLoginUserNumberAccount);
  const loaderSelector = useSelector(selectorLoaderTransfer);

  return (
    <div className="history">
      <Search />
      {loaderSelector ? (
        <Loader text="Ładuje historie przelewów" />
      ) : (
        <Table accountNumberSelector={accountNumberSelector} />
      )}
    </div>
  );
};

export default History;
