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
            inner,
            primary,
            secondary,
        } = this.props;

        return (
            <div className={inner ? classes.subsection : classes.section}>
                <div className={classes.container}>
                    <div className={classes.heading}>
                        <Typography
                            className={inner ? classes.secondaryTitle : classes.primaryTitle}
                            color={inner ? undefined : "primary"}
                        >
                            {primary}
                        </Typography>
                        <Typography className={classes.description}>
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
