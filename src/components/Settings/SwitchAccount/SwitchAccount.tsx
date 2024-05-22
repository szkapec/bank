import {
  Box,
  Button,
  FormControl,
  InputLabel,
  ListSubheader,
  MenuItem,
  Select,
} from "@mui/material";
import TextWrapper from "components/Contents/TextWrapper";
import GlobalLoader from "components/Loader/GlobalLoader";
import Loader from "components/Loader/Loader";
import MiniLoader from "components/Loader/MiniLoader";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
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
  accountEmail?: string;
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
      (account) => account.accountName === "general"
    );
    savings = accountsSelector.filter(
      (account) => account.accountName === "saving"
    );
  };
  accountOption();

  const onChange = (e: any) => {
    setAccount(e.target.value);
  };

  const submit = async () => {
    const switchAccount = await dispatch(
      loginSwitchAccount({ accountId: account })
    );
    if (switchAccount.payload.token) {
      navigate("/transfer");
    }
  };

  return (
    <Box className="connect-account">
      {accountsSelector.length ? (
        <FormControl sx={{ m: 1, minWidth: 120 }}>
          <InputLabel htmlFor="grouped-select">Konta</InputLabel>
          <Select id="grouped-select" label="Grouping" onChange={onChange}>
            <ListSubheader>
              <TextWrapper label="offer.personalAccounts" />
            </ListSubheader>
            {generals?.map((general) => (
              <MenuItem key={general.accountId} value={general.accountId}>
                {general.accountEmail}
              </MenuItem>
            ))}
            {savings.length && (
              <ListSubheader>
                <TextWrapper label="offer.savingsAccount" />
              </ListSubheader>
            )}
            {savings?.map((savigs) => (
              <MenuItem key={savigs.accountId} value={savigs.accountId}>
                {savigs.accountEmail}
              </MenuItem>
            ))}
          </Select>
          <Button
            onClick={submit}
            sx={{ margin: "30px 0 20px" }}
            variant="contained"
          >
            {loaderSelector ? (
              <MiniLoader />
            ) : (
              <TextWrapper label="offer.switchAccount" />
            )}
          </Button>
        </FormControl>
      ) : isLoading ? (
        <Loader></Loader>
      ) : (
        <Box>
          <TextWrapper label="offer.noAssociatedAccounts" />
        </Box>
      )}
      {loaderSelector && (
        <GlobalLoader noBackground={true} messages={dataMessage} />
      )}
    </Box>
  );
};

export default SwitchAccount;

const dataMessage = [
  "Sprawdzam dane...",
  "Weryfikuje dane...",
  "Pobieram dane...",
  "Ustawiam dane...",
  "Zmieniam język",
  "Weryfikacja...",
];
