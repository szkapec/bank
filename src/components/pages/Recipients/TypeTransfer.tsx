import { Box } from "@mui/material";
import React from "react";
import AddRoadIcon from "@mui/icons-material/AddRoad";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import AdUnitsIcon from "@mui/icons-material/AdUnits";
import AssuredWorkloadIcon from "@mui/icons-material/AssuredWorkload";
import AttractionsIcon from "@mui/icons-material/Attractions";
import DataSaverOnIcon from '@mui/icons-material/DataSaverOn';

const TypeTransfer = () => {
  return (
    <Box className="type-transfer">
      <section>
        <AddRoadIcon />
        <span>Krajowy</span>
      </section>
      <section>
        <AccountBoxIcon />
        <span>Na własne konto</span>
      </section>
      <section>
        <AdUnitsIcon />
        <span>Doładowanie telefonu</span>
      </section>
      <section>
        <AssuredWorkloadIcon />
        <span>Do urzędu</span>
      </section>
      <section>
        <AttractionsIcon />
        <span>Walutowy / Zagraniczny</span>
      </section>
      <div className='recurring-payment'>
        <section>
          <DataSaverOnIcon />
          <span>Nowa płatność cykliczna</span>
        </section>
      </div>
    </Box>
  );
};

export default React.memo(TypeTransfer);
