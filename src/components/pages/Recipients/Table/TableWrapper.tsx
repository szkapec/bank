import React from "react";
import { IAddRecipient } from "store/Recipient/recipientInterface";
import Table from "./Table";

const TableWrapper = ({ recipients }: any) => {
  if (!recipients?.length) return <div style={{padding: '20px 0 0 20px'}}>Brak dodanych odbiorców</div>;

  return recipients.map((recipient: IAddRecipient) => (
    <Table recipient={recipient}></Table>
  ));
};

export default React.memo(TableWrapper);
