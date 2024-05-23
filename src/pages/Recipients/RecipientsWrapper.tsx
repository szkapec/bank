import Box from "@mui/material/Box";
import "react-notifications/lib/notifications.css";
import TypeTransfer from "./TypeTransfer";
import Recipients from "./Recipients";
import "./Recipients.scss";

const RecipientsWrapper = () => {
  return (
    <Box className="box">
      <Box className="box__recipients">
        <Recipients />
      </Box>
      <Box className="box__saved">
        <TypeTransfer />
      </Box>
    </Box>
  );
};

export default RecipientsWrapper;
