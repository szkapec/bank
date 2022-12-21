import {
  Box,
  Button,
  FormControl,
  InputLabel,
  ListSubheader,
  MenuItem,
  Select,
} from "@mui/material";
import GlobalLoader from "components/Loader/GlobalLoader";
import Loader from "components/Loader/Loader";
import MiniLoader from "components/Loader/MiniLoader";
import React, { useState } from "react";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { useAppDispatch } from "store/hooks";
import { selectorAuthLoading } from "store/Login/loginSelector";
import { loginSwitchAccount } from "store/Login/loginThunk";
import { selectorSubAccounts } from "store/SubAccount/subAccountSelector";
import { getConnectAccount } from "store/SubAccount/subAccountThunk";

interface IProps {
  setOffer: Function;
}

interface IAccount {
  accountId?: string;
  accountName?: string;
}
const SwitchAccount = ({ setOffer }: IProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [account, setAccount] = useState("");
  const accountsSelector = useSelector(selectorSubAccounts);
  const loaderSelector = useSelector(selectorAuthLoading);


  let generals: IAccount[] = [];
  let savings: IAccount[] = [];
  let credits: IAccount[] = [];
  let investments: IAccount[] = [];

  const { isLoading } = useQuery("getConnectAccount", () =>
    dispatch(getConnectAccount())
  );

  const accountOption = () => {
    generals = accountsSelector.filter(
      (account: any) => account.accountName === "general"
    );
    savings = accountsSelector.filter(
      (account: any) => account.accountName === "saving"
    );
  };
  accountOption();

  const onChange = (e: any) => {
    setAccount(e.target.value);
  };

  const submit = async() => {
    const switchAccount = await dispatch(loginSwitchAccount({ accountId: account }));
    if(switchAccount.payload.token) {
      navigate("/transfer");
    }
  };
  console.log('loaderSelector :>> ', loaderSelector);

  return (
    <Box className="connect-account">
      {accountsSelector.length ? (
        <FormControl sx={{ m: 1, minWidth: 120 }}>
          <InputLabel htmlFor="grouped-select">Konta</InputLabel>
          <Select id="grouped-select" label="Grouping" onChange={onChange}>
            <ListSubheader>Konta osobiste</ListSubheader>
            {generals?.map((general) => (
              <MenuItem key={general.accountId} value={general.accountId}>
                {general.accountId}
              </MenuItem>
            ))}
            <ListSubheader>K. Oszczędnościowe</ListSubheader>
            {savings?.map((savigs) => (
              <MenuItem key={savigs.accountId} value={savigs.accountId}>
                {savigs.accountId}
              </MenuItem>
            ))}
          </Select>
          <Button
            onClick={submit}
            sx={{ margin: "30px 0 20px" }}
            variant="contained"
          >
            { loaderSelector ? <MiniLoader /> : 'Przełącz konto'}
          </Button>
        </FormControl>
      ) : isLoading ? (
        <Loader></Loader>
      ) : (
        <Box>Brak powiązanych kont</Box>
      )}
      { loaderSelector && <GlobalLoader noBackground={true} messages={testData} />}
    </Box>
  );
};

export default SwitchAccount;

const testData = [
  "Sprawdzam dane...",
  "Weryfikuje dane...",
  "Pobieram dane...",
  "Ustawiam dane...",
  "Zmieniam język",
  "Weryfikacja...",
];