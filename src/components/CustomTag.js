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

CustomTag.propTypes = {
    classes: PropTypes.objectOf(PropTypes.string),
    label: PropTypes.string,
}

CustomTag.defaultProps = {
    classes: {},
    label: '',
}

export default CustomTag;
