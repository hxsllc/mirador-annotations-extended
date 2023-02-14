import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Grid } from '@material-ui/core';

class CanvasAnnotationHeader extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <>
                <Grid>
                    {/*<div style={{ width: '100%', height: 30, backgroundColor: '#d33120'}}></div>*/}
                </Grid>
            </>
        )
    }
}

export default CanvasAnnotationHeader;
