import { Select } from '@windmill/react-ui';
import React from 'react';
// import { CODES } from 'currencies-map';

function SelectProductLimit({ register, name, label, required }) {
    return (
        <>
            <Select
                name={name}
                {...register(`${name}`, {
                    required: required ? false : `${label} is required!`,
                })}
            >
                <option value='' defaultValue hidden>
                    Select Products Limit
                </option>
                {/* {CODES.map((currency) => (
          <option key={currency} value={currency}>
            {currency}{' '}
          </option>
        ))} */}

                <option value='6'>6</option>
                <option value='12'>12</option>
                <option value='18'>18</option>
            </Select>
        </>
    );
}
export default SelectProductLimit;
