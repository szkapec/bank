import React from "react";
import { Box } from "@mui/material";
import { IAddRecipient } from "store/Recipient/recipientInterface";
import TableSaveOrRemoveRecipientsModal from "components/Modal/Table/TableSaveOrRemoveRecipientsModal";

interface IPropsRecipient {
  recipient: IAddRecipient;
}
const Table = ({ recipient }: IPropsRecipient) => {
  return (
    <Box className="recipient">
      <Box className="adress">
        <div className="recipients-adress">
          {recipient.recipientsName}{" "}
          <span> || {recipient.recipientsAdress}</span>
        </div>
        <Box sx={{ fontWeight: "300" }}>
          {recipient.recipientsAccount} | Bank CD S.A
        </Box>
      </Box>
      <Box className="title">
        <div className="sum">{recipient.sum} PLN</div>
        <Box sx={{ fontWeight: "300", textAlign: "right" }}>
          {recipient.title}
        </Box>
      </Box>
      <TableSaveOrRemoveRecipientsModal recipient={recipient} />
    </Box>
  );
};

export default React.memo(Table);
