import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TextField } from '@material-ui/core';


class MetadataCreatorItem extends Component {
    constructor(props) {
        super(props);

        this.handleTextFieldInput = this.handleTextFieldInput.bind(this);
    }

    handleTextFieldInput(e) {
        const { handleChange } = this.props;

        handleChange(e.target.value);
    }


    render() {
        const {
            id,
            value,
            t,
        } = this.props;

        return (
            <TextField
                id={id}
                value={value}
                onChange={this.handleTextFieldInput}
                variant="standard" />
            )
    }
}

MetadataCreatorItem.propTypes = {}
MetadataCreatorItem.defaultProps = {

}

export default MetadataCreatorItem;
