import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Chip } from '@material-ui/core';

class CustomTag extends Component {
    render() {
        const {
            label,
            classes,
        } = this.props;

        return (
            <Chip
                className={classes.tag}
                label={label}
                {...this.props}
            />
        )
    }
}

export default CustomTag;
