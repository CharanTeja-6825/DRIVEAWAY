import React, { useMemo } from "react";
import { Autocomplete, TextField, Box } from "@mui/material";
import { brandsArray } from "../../../shared/constants/brands";

const BrandSelection = ({ form, handleChange }) => {
  const sortedBrands = useMemo(
    () => [...brandsArray].sort((a, b) => a.label.localeCompare(b.label)),
    []
  );

  const selectedBrand =
    sortedBrands.find((b) => b.value === form.brand) || null;

  return (
    <Autocomplete
      options={sortedBrands}
      value={selectedBrand}
      onChange={(_event, newValue) => {
        handleChange({
          target: { name: "brand", value: newValue?.value ?? "" },
        });
      }}
      getOptionLabel={(option) => option.label}
      isOptionEqualToValue={(option, value) => option.value === value.value}
      renderOption={(props, option) => {
        const { key, ...rest } = props;
        return (
          <Box
            key={key}
            component="li"
            {...rest}
            sx={{ display: "flex", alignItems: "center", gap: 1.5, py: 1 }}
          >
            <img
              src={option.logo}
              alt={option.label}
              width={24}
              height={24}
              style={{ objectFit: "contain", flexShrink: 0 }}
            />
            {option.label}
          </Box>
        );
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Car Brand"
          placeholder="Search brands…"
          fullWidth
          slotProps={{
            input: {
              ...params.InputProps,
              startAdornment: selectedBrand ? (
                <Box
                  component="img"
                  src={selectedBrand.logo}
                  alt={selectedBrand.label}
                  sx={{
                    width: 22,
                    height: 22,
                    objectFit: "contain",
                    ml: 0.5,
                    mr: -0.5,
                    flexShrink: 0,
                  }}
                />
              ) : null,
            },
          }}
        />
      )}
    />
  );
};

export default BrandSelection;