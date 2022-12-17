import React from "react";
import { Box } from "@mui/material";
import AddRoadIcon from "@mui/icons-material/AddRoad";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import AdUnitsIcon from "@mui/icons-material/AdUnits";
import AssuredWorkloadIcon from "@mui/icons-material/AssuredWorkload";
import AttractionsIcon from "@mui/icons-material/Attractions";
import DataSaverOnIcon from '@mui/icons-material/DataSaverOn';
import { useTranslation } from "react-i18next";

const TypeTransfer = () => {
  const { t } = useTranslation();
  return (
    <Box className="type-transfer">
      <section>
        <AddRoadIcon />
        <span>{t("recipients.national")}</span>
      </section>
      <section>
        <AccountBoxIcon />
        <span>{t("recipients.forOwnAccount")}</span>
      </section>
      <section>
        <AdUnitsIcon />
        <span>{t("recipients.topUpPhone")}</span>
      </section>
      <section>
        <AssuredWorkloadIcon />
        <span>{t("recipients.office")}</span>
      </section>
      <section>
        <AttractionsIcon />
        <span>{t("recipients.currencyOrForeign")}</span>
      </section>
      <div className='recurring-payment'>
        <section>
          <DataSaverOnIcon />
          <span>{t("recipients.newCecurringPayment")}</span>
        </section>
      </div>
    </Box>
  );
};

export default React.memo(TypeTransfer);
