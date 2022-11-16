import React, { useCallback, useEffect, useState } from "react";
import { FormControlLabel, Switch, Modal, Button, Box } from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import RecipientModal from "components/Modal/Form/RecipientModal";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import TextField from "@mui/material/TextField";
import TableWrapper from "./Table/TableWrapper";
import { debounce } from "lodash";
import { IAddRecipient } from "store/Recipient/recipientInterface";
import { useSelector } from "react-redux";
import {
  selectorDataRecipient,
  selectorLoaderRecipient,
} from "store/Recipient/recipientSelector";
import Loader from "components/Loader/Loader";
import Error from "components/Error/Error";
import { useAppDispatch } from "store/hooks";
import { useQuery } from "react-query";
import { userRecipients } from "store/Recipient/recipientThunk";

const Recipients = () => {
  const loginErrorSelector = useSelector(selectorLoaderRecipient);
  const dataSelector = useSelector(selectorDataRecipient);
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState<IAddRecipient[]>([]);
  const dispatch = useAppDispatch();
  const { isLoading, error } = useQuery("recipients", () =>
    dispatch(userRecipients())
  );

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    handleClose();
  }, [loginErrorSelector]);

  const changeHandler = (e: any) => {
    const newTargetValue = dataSelector?.filter(
      (data) => data.recipientsName.search(e.target.value) === 0
    );
    if (e.target.value.length >= 2) {
      setSearch(newTargetValue);
    } else setSearch([]);
  };

  const debouncedChangeHandler = useCallback(debounce(changeHandler, 300), []);

  const handleOpen = () => {
    setOpen(true);
  };

  if (isLoading) return <Loader />;

  if (error) return <Error error="An error has occurred: " />;

  return (
    <>
      <h3>Odbiorcy zdefiniowani</h3>
      <div>
        <Button onClick={handleOpen}>
          <AddCircleOutlineIcon />
          <span>Dodaj odbiorce</span>
        </Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="parent-modal-title"
          aria-describedby="parent-modal-description"
        >
          <RecipientModal />
        </Modal>
      </div>
      <Box className="box-search">
        <TextField
          size="small"
          id="outlined-basic"
          label="Wyszukaj"
          variant="outlined"
          onChange={debouncedChangeHandler}
        />
        <Box className="saved">
          <FormControlLabel
            control={<Switch defaultChecked />}
            label="Tylko zaufani odbiorcy"
          />
          <LockIcon color="primary" />
        </Box>
      </Box>
      <Box>
        <TableWrapper recipients={search.length > 0 ? search : dataSelector} />
      </Box>
    </>
  );
};

export default Recipients;
