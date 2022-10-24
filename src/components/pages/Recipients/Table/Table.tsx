import React, { useState } from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Box, Button, IconButton, Menu, MenuItem } from "@mui/material";

interface IRecipients {
  id: string;
  recipientsAccount: string;
  recipientsAdress: string;
  recipientsName: string;
  sum: string;
  title: string;
  toRecipient: string;
}

const Table = ({ recipients }: any) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  if (!recipients) return <div>Brak danych</div>;

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return recipients.map((recipient: IRecipients) => (
    <Box className="recipient">
      <Box className="adress">
        <div className="recipients-adress">
          {recipient.recipientsAdress} <span>{recipient.recipientsName}</span>
        </div>
        <Box sx={{ fontWeight: "300" }}>
          {recipient.toRecipient} | Bank CD S.A
        </Box>
      </Box>
      <Box className="title">
        <div className="sum">{recipient.sum} PLN</div>
        <Box sx={{ fontWeight: "300" }}>{recipient.title}</Box>
      </Box>
      <Box className="menu">
        <div>
          <Button
            id="basic-button"
            aria-controls={open ? "basic-menu" : undefined}
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
          >
            <MoreVertIcon />
          </Button>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem onClick={handleClose}>Usuń</MenuItem>
            <MenuItem onClick={handleClose}>Edytuj</MenuItem>
          </Menu>
        </div>
      </Box>
    </Box>
  ));
};

export default React.memo(Table);
