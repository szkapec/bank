import { Box } from "@mui/material";
import TextWrapper from "components/Contents/TextWrapper";
import React from "react";
import { IAddRecipient } from "store/Recipient/recipientInterface";
import Table from "./Table";

export interface IPropsRecipients {
  recipients: IAddRecipient[];
}

const TableWrapper = ({ recipients }: IPropsRecipients) => {
  if (!recipients?.length)
    return (
      <Box sx={{ padding: "20px 0 0 20px" }}>
        <TextWrapper label="recipients.noRecipientsAdded" />
      </Box>
    );

  return (
    <Box>
      {recipients.map((recipient: IAddRecipient) => (
        <Table key={recipient._id} recipient={recipient}></Table>
      ))}
    </Box>
  );
};

export default React.memo(TableWrapper);
