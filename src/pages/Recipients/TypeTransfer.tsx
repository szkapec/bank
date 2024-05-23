import React from "react";
import { Box } from "@mui/material";
import AddRoadIcon from "@mui/icons-material/AddRoad";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import AdUnitsIcon from "@mui/icons-material/AdUnits";
import AssuredWorkloadIcon from "@mui/icons-material/AssuredWorkload";
import AttractionsIcon from "@mui/icons-material/Attractions";
import DataSaverOnIcon from "@mui/icons-material/DataSaverOn";
import TextWrapper from "components/Contents/TextWrapper";

const TypeTransfer = () => {
  return (
    <Box className="type-transfer">
      <section>
        <AddRoadIcon />
        <TextWrapper label="recipients.national" />
      </section>
      <section>
        <AccountBoxIcon />
        <TextWrapper label="recipients.forOwnAccount" />
      </section>
      <section>
        <AdUnitsIcon />
        <TextWrapper label="recipients.topUpPhone" />
      </section>
      <section>
        <AssuredWorkloadIcon />
        <TextWrapper label="recipients.office" />
      </section>
      <section>
        <AttractionsIcon />
        <TextWrapper label="recipients.currencyOrForeign" />
      </section>
      <Box className="recurring-payment">
        <section>
          <DataSaverOnIcon />
          <TextWrapper label="recipients.newCecurringPayment" />
        </section>
      </Box>
    </Box>
  );
};

export default React.memo(TypeTransfer);
