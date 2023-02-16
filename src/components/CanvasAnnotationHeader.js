import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Typography } from '@material-ui/core';

class CanvasAnnotationHeader extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { classes, id, creator, buttons, } = this.props;
        return (
            <>
                <div className={classes.container}>
                    <div className={classes.heading}>
                        <Typography
                            id={id}
                            variant="overline" >
                            {creator ? creator : 'n.a.'}
                        </Typography>
                    </div>

                    <div className={classes.buttons}>
                        {buttons}
                    </div>
                </div>
            </>
        )
    }
}

export default CanvasAnnotationHeader;
