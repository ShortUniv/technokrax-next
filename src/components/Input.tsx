import React, { ChangeEvent } from "react";
import { TextField, Grid, InputAdornment, IconButton } from "@mui/material";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

interface InputProps {
  name: string;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  label: string;
  half?: boolean;
  autoFocus?: boolean;
  type?: string;
  handleShowPassword?: () => void;
  handleKeyDown :any
  value?:any
}

const Input: React.FC<InputProps> = ({
  value,
  name,
  handleChange,
  label,
  half,
  autoFocus,
  type,
  handleShowPassword,
  handleKeyDown
}) => {
  return (
    <Grid item xs={12} sm={half ? 6 : 12}>
      <TextField
      value={value}
        name={name}
        onChange={handleChange}
        variant="outlined"
        required
        fullWidth
        onKeyDown={handleKeyDown}
        label={label}
        autoFocus={autoFocus}
        type={type}
        InputProps={
          type === "password"
            ? {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleShowPassword}>
                      {type === "password" ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }
            : undefined
        }
      />
    </Grid>
  );
};

export default Input;
