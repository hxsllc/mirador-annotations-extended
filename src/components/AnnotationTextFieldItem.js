import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TextField } from '@material-ui/core';

class AnnotationTextFieldItem extends Component {
    constructor(props) {
        super(props);

        this.onChange = this.onChange.bind(this);
    }

    onChange(e) {
        const { updateValue } = this.props;
        if (updateValue) {
            updateValue(e.target.value);
        }
    }

    render() {
        const { value, t } = this.props;

        return (
            <TextField label={t('annotationMetadataBody')} value={value} onChange={this.onChange} variant="standard" />
        )
    }
}

export default AnnotationTextFieldItem;
