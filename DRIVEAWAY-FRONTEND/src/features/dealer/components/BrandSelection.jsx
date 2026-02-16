import React from 'react'
import { FormControl, InputLabel, Select, MenuItem, ListItemIcon, ListItemText } from '@mui/material';
import { brandsArray } from '../../../shared/constants/brands';
import { useMemo } from 'react';
import Box from '@mui/material';

const BrandSelection = ({ form, handleChange }) => {

    // ✅ Sorted once (performance-safe)
	const sortedBrands = useMemo(
		() => [...brandsArray].sort((a, b) => a.label.localeCompare(b.label)),
		[]
	);

    return (
        <>
            <FormControl fullWidth>
                <InputLabel id="brand-label">Car Brand</InputLabel>

                <Select
                    labelId="brand-label"
                    name="brand"
                    value={form.brand}
                    label="Car Brand"
                    onChange={handleChange}
                    renderValue={(selected) => {
                        const item = sortedBrands.find(
                            (b) => b.value === selected
                        );
                        if (!item) return "";
                        return (
                            <Box display="flex" alignItems="center" gap={1}>
                                <img src={item.logo} width={20} alt={item.label} />
                                {item.label}
                            </Box>
                        );
                    }}
                >
                    {sortedBrands.map((b) => (
                        <MenuItem key={b.value} value={b.value}>
                            <ListItemIcon>
                                <img src={b.logo} width={20} alt={b.label} />
                            </ListItemIcon>
                            <ListItemText primary={b.label} />
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

        </>
    )
}

export default BrandSelection