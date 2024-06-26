import { useEffect, useState } from "react";
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
import TextWrapper from "components/Contents/TextWrapper";
import { useTranslation } from "react-i18next";

const Recipients = () => {
  const loginErrorSelector = useSelector(selectorLoaderRecipient);
  const dataSelector = useSelector(selectorDataRecipient);
  const [open, setOpen] = useState(false);
  const [valueSearch, setValueSearch] = useState("");
  const [search, setSearch] = useState<IAddRecipient[]>([]);
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
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
    setValueSearch(e.target.value);
    const newTargetValue = dataSelector?.filter(
      (data) =>
        data.recipientsName
          .toLowerCase()
          .search(e.target.value.toLowerCase()) === 0
    );
    console.log("newTargetValue", newTargetValue);
    if (e.target.value.length >= 2) {
      setSearch(newTargetValue);
    } else setSearch([]);
  };

  const debouncedChangeHandler = debounce(changeHandler, 300);

  const handleOpen = () => {
    setOpen(true);
  };

  if (isLoading) return <Loader />;

  if (error) return <Error error="An error has occurred: " />;

  return (
    <>
      <TextWrapper label="recipients.definedRecipients" Selector="h3" />
      <Box>
        <Button onClick={handleOpen}>
          <AddCircleOutlineIcon />
          <TextWrapper label="recipients.addRecipient" />
        </Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="parent-modal-title"
          aria-describedby="parent-modal-description"
        >
          <RecipientModal handleClose={handleClose} />
        </Modal>
      </Box>
      <Box className="box-search">
        <TextField
          size="small"
          id="outlined-basic"
          label={t("recipients.search")}
          variant="outlined"
          onChange={debouncedChangeHandler}
        />
        <Box className="saved">
          <FormControlLabel
            control={<Switch defaultChecked />}
            label={t("recipients.nameRecipient")}
          />
          <LockIcon color="primary" />
        </Box>
      </Box>
      <Box className="search-user">
        {!search.length && valueSearch.length >= 2 && (
          <Box>Nie ma takiej nazwy użytkownika, zmień kryteria wyszukiwania</Box>
        )}
      </Box>
      <Box>
        <TableWrapper recipients={search.length > 0 ? search : dataSelector} />
      </Box>
    </>
  );
};

export default Recipients;
