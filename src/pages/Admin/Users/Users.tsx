import { Box } from "@mui/material";
import TextWrapper from "components/Contents/TextWrapper";
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
        adminUsersSelector?.map(
          ({ _id, firstName, email, ban, premium }, index) => (
            <Box key={_id}>
              <StyledAdminList premium={premium}>
                <span className="index">{index}</span>
                <Box>
                  <TextWrapper label="ID:" Selector="b" />
                  <TextWrapper label={_id} />
                </Box>
                <Box>
                  <TextWrapper label="admin.firstName" Selector="b" />
                  <TextWrapper label={firstName} />
                </Box>
                <Box>
                  <TextWrapper label="admin.email" Selector="b" />
                  <TextWrapper label={email} />
                </Box>
                <Box>
                  <TextWrapper label="admin.isBan" Selector="b" />
                  <TextWrapper label={ban ? "admin.yes" : "admin.no"} />
                </Box>
                <Box>
                  <TextWrapper label="admin.premium" Selector="b" />
                  <TextWrapper label={premium ? "admin.yes" : "admin.no"} />
                </Box>
              </StyledAdminList>
            </Box>
          )
        )
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
