import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Menu, { MenuProps } from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import EditIcon from "@mui/icons-material/Edit";
import Divider from "@mui/material/Divider";
import ArchiveIcon from "@mui/icons-material/Archive";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { ILoginUser } from "store/Login/loginInterface";
import { useSelector } from "react-redux";
import { selectorSubAccounts } from "store/SubAccount/subAccountSelector";
import SwitchAccessShortcutAddIcon from "@mui/icons-material/SwitchAccessShortcutAdd";
import { loginSwitchAccount } from "store/Login/loginThunk";
import { useAppDispatch } from "store/hooks";
import GlobalLoader from "components/Loader/GlobalLoader";
import { selectorAuthLoading } from "store/Login/loginSelector";
import { useNavigate } from "react-router";
import { useQuery } from "react-query";
import { getConnectAccount } from "store/SubAccount/subAccountThunk";
import SettingsIcon from "@mui/icons-material/Settings";
import { Badge } from "@mui/material";

interface PropsType {
  user: ILoginUser;
}

export const CustomizedMenus = ({ user }: PropsType) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [
    anchorElSubmenu,
    setAnchorElSubmenu,
  ] = React.useState<null | HTMLElement>(null);

  const dispatch = useAppDispatch();
  const subAccountsSelector = useSelector(selectorSubAccounts);
  const loaderSelector = useSelector(selectorAuthLoading);
  const navigate = useNavigate();

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const { isLoading } = useQuery("getConnectAccount", () =>
    dispatch(getConnectAccount())
  );

  const handleClickSubmenu = (event: React.MouseEvent<HTMLElement>) => {
    if (anchorElSubmenu) {
      setAnchorElSubmenu(null);
    } else {
      setAnchorElSubmenu(event.currentTarget);
    }
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSwichAndCloseAll = async (accountId: string) => {
    setAnchorEl(null);
    setAnchorElSubmenu(null);
    const switchAccount = await dispatch(
      loginSwitchAccount({ accountId: accountId })
    );

    if (switchAccount.payload.token) {
      navigate("/transfer");
    }
  };

  const handleCloseSubmenu = () => {
    setAnchorElSubmenu(null);
  };

  const handleCloseAndTransferSetting = () => {
    handleClose();
    navigate("/offers");
  };
  return (
    <div>
      <Button
        id="customized-button"
        aria-controls={!!anchorEl ? "customized-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={!!anchorEl ? "true" : undefined}
        disableElevation
        onClick={handleClick}
        endIcon={<KeyboardArrowDownIcon />}
        style={{ color: "white" }}
      >
        <span className="custom-lastName">{user.lastName}</span>
      </Button>
      <StyledMenu
        id="customized-menu"
        MenuListProps={{
          "aria-labelledby": "customized-button",
        }}
        anchorEl={anchorEl}
        open={!!anchorEl}
        onClose={handleClose}
      >
        <MenuItem
          disabled={!subAccountsSelector.length}
          onClick={handleClickSubmenu}
          disableRipple
        >
          <EditIcon />
          Połączone konta
          <Badge
            style={{
              margin: '4px 4px 0 0'
            }}
            badgeContent={subAccountsSelector.length || '0'}
            color="primary"
          >
            <Button
              id="customized-button2"
              aria-controls={!!anchorElSubmenu ? "customized-menu2" : undefined}
              aria-haspopup="true"
              aria-expanded={!!anchorElSubmenu ? "true" : undefined}
              disableElevation
              onClick={handleClickSubmenu}
              endIcon={<KeyboardArrowDownIcon />}
              style={{ color: "white" }}
            >
              <span className="custom-lastName2">{user.lastName}</span>
            </Button>
          </Badge>
          <StyledMenu
            id="customized-menu2"
            MenuListProps={{
              "aria-labelledby": "customized-button2",
            }}
            anchorEl={anchorElSubmenu}
            open={!!anchorElSubmenu}
            onClose={handleCloseSubmenu}
          >
            {subAccountsSelector.map((account) => (
              <MenuItem
                onClick={() => handleSwichAndCloseAll(account.accountId)}
                disableRipple
              >
                <SwitchAccessShortcutAddIcon />
                {account.accountEmail}
              </MenuItem>
            ))}
          </StyledMenu>
        </MenuItem>
        <MenuItem onClick={handleCloseAndTransferSetting} disableRipple>
          <SettingsIcon />
          Ustawienia
        </MenuItem>
        <Divider sx={{ my: 0.5 }} />
        <MenuItem onClick={handleClose} disableRipple>
          <MoreHorizIcon />
          More...
        </MenuItem>
      </StyledMenu>
      {loaderSelector && (
        <GlobalLoader noBackground={true} messages={dataMessage} />
      )}
    </div>
  );
};

const dataMessage = [
  "Sprawdzam dane...",
  "Weryfikuje dane...",
  "Pobieram dane...",
  "Ustawiam dane...",
  "Zmieniam język",
  "Weryfikacja...",
];

const StyledMenu = styled((props: MenuProps) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color:
      theme.palette.mode === "light"
        ? "rgb(55, 65, 81)"
        : theme.palette.grey[300],
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    "& .MuiMenu-list": {
      padding: "4px 0",
    },
    "& .MuiMenuItem-root": {
      "& .MuiSvgIcon-root": {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      "&:active": {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity
        ),
      },
    },
  },
}));

export default React.memo(CustomizedMenus);
