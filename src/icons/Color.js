import React from 'react';
import { SvgIcon as MuiSvgIcon, styled } from '@material-ui/core';

/**
 * create custom ColorIcon
*/

const SvgIcon = styled(MuiSvgIcon, {
    name: 'ColorIcon',
    shouldForwardProp: (prop) => prop == 'fill',
})(() => ({
    fill:'currentColor',
}));

SvgIcon.defaultProps = {
    viewBox: '0 0 24 24',
    focusable: 'false',
    'aria-hidden': 'true',
}

const ColorIcon = (props) => {
    return (
        <SvgIcon {...props}>
            <path d="M 14.062469,8.9212496e-7 C 12.876965,8.5049999 19.226264,13.074257 18.093391,19.013963 17.096785,24.239219 10.496098,26.151462 7.0240744,20.840054 3.2218825,15.023567 11.009291,5.2083859 14.062469,8.9212496e-7 Z" />
        </SvgIcon>
    )
}

export default ColorIcon;
