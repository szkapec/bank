import { Box, Button } from "@mui/material";
import { lazy, Suspense, useState } from "react";
import "./SettingsPage.scss";
import LockResetIcon from "@mui/icons-material/LockReset";
import Loader from "components/Loader/Loader";
import TextWrapper from "components/Contents/TextWrapper";
import LanguageIcon from "@mui/icons-material/Language";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import ConnectAccount from "components/Settings/ConnectAccount/ConnectAccount";
import SwitchAccount from "components/Settings/SwitchAccount/SwitchAccount";
import SeparateAccount from "components/Settings/SeparateAccount/SeparateAccount";

const ChangePassword = lazy(() =>
  import("components/Settings/ChangePassword/ChangePassword")
);
const ChangeLanguage = lazy(() =>
  import("components/Settings/ChangeLanguage/ChangeLanguage")
);
const ChangeLimit = lazy(() =>
  import("components/Settings/ChangeLimit/ChangeLimit")
);

const ChangeColor = lazy(() =>
  import("components/Settings/ChangeColor/ChangeColor")
);

const renderLoader = () => <Loader />;

const SettingsPage = () => {
  const [password, setPassword] = useState(false);
  const [language, setLanguage] = useState(false);
  const [colorPage, setColorPage] = useState(false);
  const [connectAccount, setConnectAccount] = useState(false);
  const [limit, setlimit] = useState(false);
  const [switchAccount, setSwitchAccount] = useState(false);
  const [separateAccount, setSeparateAccount] = useState(false)

  return (
    <Box className="offers-profil">
      <Box style={{margin: '10px 0 0'}}>
        <TextWrapper label="settings.editProfil" Selector="h3" />
      </Box>
      <section>
        <Button className="btn-info" onClick={() => setPassword(!password)}>
          <LockResetIcon />
          <TextWrapper label="settings.changePassword"></TextWrapper>
        </Button>
        <Suspense fallback={renderLoader()}>
          {password && <ChangePassword setOffer={setPassword} />}
        </Suspense>
      </section>
      <section>
        <Button className="btn-info" onClick={() => setLanguage(!language)}>
          <LanguageIcon />
          <TextWrapper label="settings.changeLanguage" />
        </Button>

        <Suspense fallback={renderLoader()}>
          {language && <ChangeLanguage setOffer={setLanguage} />}
        </Suspense>
      </section>
      <section>
        <Button className="btn-info" onClick={() => setlimit(!limit)}>
          <AccountBalanceIcon />
          <TextWrapper label="settings.changeLimitTransaction" />
        </Button>
        <Suspense fallback={renderLoader()}>
          {limit && <ChangeLimit setOffer={setlimit} />}
        </Suspense>
      </section>

      <section>
        <Button className="btn-info" onClick={() => setColorPage(!colorPage)}>
          <AccountBalanceIcon />
          <TextWrapper label="settings.changeColor" />
        </Button>
        <Suspense fallback={renderLoader()}>
          {colorPage && <ChangeColor setOffer={setColorPage} />}
        </Suspense>
      </section>

      <section>
        <Button
          className="btn-info"
          onClick={() => setConnectAccount(!connectAccount)}
        >
          <AccountBalanceIcon />
          <TextWrapper label="settings.connectAccounts" />
        </Button>
        <Suspense fallback={renderLoader()}>
          {connectAccount && <ConnectAccount setOffer={setConnectAccount} />}
        </Suspense>
      </section>

      <section>
        <Button
          className="btn-info"
          onClick={() => setSwitchAccount(!switchAccount)}
        >
          <AccountBalanceIcon />
          <TextWrapper label="settings.switchAccount" />
        </Button>
        <Suspense fallback={renderLoader()}>
          {switchAccount && <SwitchAccount setOffer={setSwitchAccount} />}
        </Suspense>
      </section>

      <section>
        <Button
          className="btn-info"
          onClick={() => setSeparateAccount(!separateAccount)}
        >
          <AccountBalanceIcon />
          <TextWrapper label="offer.separateAccount" />
        </Button>
        <Suspense fallback={renderLoader()}>
          {separateAccount && <SeparateAccount setOffer={setSeparateAccount} />}
        </Suspense>
      </section>

    {/* 
    <section>
        <Button className="btn-info" onClick={() => setlimit(true)}>
          <AccountBalanceIcon />
          <TextWrapper label="Moze jakies pozyczki albo konto oszczednosciowe" />
        </Button>
        <Suspense fallback={renderLoader()}>
          {/* {limit && <ChangeLimit />} */}
        {/* </Suspense> */}
      {/* // </section> */}
      
    </Box>
  );
};

export default SettingsPage;
