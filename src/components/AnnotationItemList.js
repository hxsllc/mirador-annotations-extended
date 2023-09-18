import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Radio, FormControlLabel, FormGroup } from '@material-ui/core';
import AnnotationItem from '../containers/AnnotationItem';

class AnnotationItemList extends Component {
    /** */
    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
    }


    /** */
    handleChange(e) {
        const {
            updateContent,
        } = this.props;

        const value = e.target.value;
        const checked = e.target.checked;
        updateContent('category', { value: value, checked: checked });
    }

    /** */
    render() {
        const { windowId } = this.props;

        return <>
            <AnnotationItem windowId={windowId} />
            <AnnotationItem windowId={windowId} />
            <AnnotationItem windowId={windowId} />
            <AnnotationItem windowId={windowId} />
            <AnnotationItem windowId={windowId} />
            <AnnotationItem windowId={windowId} />
            <AnnotationItem windowId={windowId} />
        </>;
    }
}

AnnotationItemList.propTypes = {
    windowId: PropTypes.string.isRequired
}

export default AnnotationItemList;