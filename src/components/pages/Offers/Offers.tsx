import { Box, Button } from "@mui/material";
import { lazy, Suspense, useState } from "react";
import "./Offers.scss";
import LockResetIcon from "@mui/icons-material/LockReset";
import Loader from "components/Loader/Loader";
import TextWrapper from "components/Contents/TextWrapper";
import LanguageIcon from "@mui/icons-material/Language";
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';

const ChangePassword = lazy(
  () => import("../../Settings/ChangePassword/ChangePassword")
);
const ChangeLanguage = lazy(
  () => import("../../Settings/ChangeLanguage/ChangeLanguage")
);
const ChangeLimit = lazy(
  () => import("../../Settings/ChangeLimit/ChangeLimit")
);

const ChangeColor = lazy(
  () => import("../../Settings/ChangeColor/ChangeColor")
);

const Offers = () => {
  const renderLoader = () => <Loader />;
  const [password, setPassword] = useState(false);
  const [language, setLanguage] = useState(false);
  const [colorPage, setColorPage] = useState(false);
  const [limit, setlimit] = useState(false);

  return (
    <Box className="offers-profil">
      <TextWrapper label="offer.editProfil" Selector="h3" />
      <section>
        <Button className="btn-info" onClick={() => setPassword(!password)}>
          <LockResetIcon />
          <TextWrapper label="offer.changePassword"></TextWrapper>
        </Button>
        <Suspense fallback={renderLoader()}>
          {password && <ChangePassword setOffer={setPassword} />}
        </Suspense>
      </section>
      <section>
        <Button className="btn-info" onClick={() => setLanguage(!language)}>
          <LanguageIcon />
          <TextWrapper label="offer.changeLanguage" />
        </Button>

        <Suspense fallback={renderLoader()}>
          {language && <ChangeLanguage setOffer={setLanguage} />}
        </Suspense>
      </section>
      <section>
        <Button className="btn-info" onClick={() => setlimit(!limit)}>
          <AccountBalanceIcon/>
          <TextWrapper label="offer.changeLimitTransaction" />
        </Button>
        <Suspense fallback={renderLoader()}>
          {limit && <ChangeLimit setOffer={setlimit} />}
        </Suspense>
      </section>

      <section>
        <Button className="btn-info" onClick={() => setColorPage(!colorPage)}>
          <AccountBalanceIcon/>
          <TextWrapper label="zmiana koloru strony" />
        </Button>
        <Suspense fallback={renderLoader()}>
          {colorPage && <ChangeColor setOffer={setColorPage} />}
        </Suspense>
      </section>

      <section>
        <Button className="btn-info" onClick={() => setlimit(true)}>
          <AccountBalanceIcon/>
          <TextWrapper label="Moze jakies pozyczki albo konto oszczednosciowe"/>
        </Button>
        <Suspense fallback={renderLoader()}>
          {/* {limit && <ChangeLimit />} */}
        </Suspense>
      </section>

      <section>
        <Button className="btn-info" onClick={() => setlimit(true)}>
          <AccountBalanceIcon/>
          <TextWrapper label="Moze subkonta utwozone w ramach tego konta?"/>
        </Button>
        <Suspense fallback={renderLoader()}>
          {/* {limit && <ChangeLimit />} */}
        </Suspense>
      </section>
    </Box>
  );
};

export default Offers;
