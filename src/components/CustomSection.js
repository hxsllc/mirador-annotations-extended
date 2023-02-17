import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Typography } from '@material-ui/core';

class CustomSection extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {
            buttons,
            children,
            classes,
            id,
            primary,
            secondary,
        } = this.props;

        return (
            <div className={classes.section}>
                <div className={classes.container}>
                    <div className={classes.heading}>
                        <Typography color="primary" variant="h5">
                            {primary}
                        </Typography>
                        <Typography variant="subtitle2">
                            {secondary}
                        </Typography>
                    </div>
                    <div className={classes.buttons}>
                        {buttons}
                    </div>
                </div>
                {children}
            </div>
        )
    }
}

CustomSection.propTypes = {}
CustomSection.defaultProps = {}

export default CustomSection;
