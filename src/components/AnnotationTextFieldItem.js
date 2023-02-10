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
            <TextField hiddenLabel value={value} onChange={this.onChange} small style={ value ? { width: (value.length * 7.5) } : { width: 10}} variant="standard" />
        )
    }
}

export default AnnotationTextFieldItem;
