import { Box } from "@mui/material";
import Loader from "components/Loader/Loader";
import React from "react";
import { useSelector } from "react-redux";
import {
  selectorAdminUsers,
  selectorAdminUsersLoader,
} from "store/Admin/adminSelector";
import styled from "styled-components";

interface StyledProps {
  premium?: boolean;
}

const Users = () => {
  const adminUsersSelector = useSelector(selectorAdminUsers);
  const spinnerSelector = useSelector(selectorAdminUsersLoader);
  return (
    <Box>
      {!spinnerSelector ? (
        adminUsersSelector?.map(({ _id, firstName, email, premium }, index) => (
          <Box key={_id}>
            <StyledAdminList premium={premium}>
              <span className="index">{index}: </span>
              <span>
                <b>ID:</b>
                {_id}
              </span>
              <span>
                <b>fisrtName:</b> {firstName}
              </span>
              <span>
                <b>email:</b> {email}{" "}
              </span>
              <span>
                <b>premium:</b> {premium ? "Tak" : "Nie"}
              </span>
            </StyledAdminList>
          </Box>
        ))
      ) : (
        <Loader />
      )}
    </Box>
  );
};

const StyledAdminList = styled.ul<StyledProps>`
  color: ${(props) => (props.premium ? "#a7a7a7" : "black")};
  padding: 10px;
  border: 1px solid black;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 10px 20px;
  max-width: 1100px;
  .index {
    border: 1px solid grey;
    padding: 7px;
    border-radius: 45%;
    margin-right: 10px;
  }
  b {
    margin-left: 20px;
  }
`;

export default React.memo(Users);
