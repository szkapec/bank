import { useSelector } from "react-redux";
import { selectorAuthLoginUserNumberAccount } from "store/Login/loginSelector";
import { selectorLoaderTransfer } from "store/Transfer/transferSelector";
import TableWrapper from "./Table/TableWrapper";
import Search from "./Search/Search";
import "./History.scss";
import Loader from "components/Loader/Loader";

const History = () => {
  
  const accountNumberSelector = useSelector(selectorAuthLoginUserNumberAccount);
  const loaderSelector = useSelector(selectorLoaderTransfer);
  return (
    <div className="history">
      <Search />
      {loaderSelector ? (
        <Loader text="Ładuje historie przelewów" />
      ) : (
        <TableWrapper accountNumberSelector={accountNumberSelector} />
      )}
    </div>
  );
};

export default History;
