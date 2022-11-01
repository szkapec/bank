import React from "react";
import { IAddRecipient } from "store/Recipient/recipientInterface";
import Table from "./Table";

const TableWrapper = ({ recipients }: any) => {
  console.log("recipients2221 :>> ", recipients);
  if (!recipients) return <div>Brak danych</div>;

  return recipients.map((recipient: IAddRecipient) => (
    <Table recipient={recipient}></Table>
  ));
};

export default React.memo(TableWrapper);
