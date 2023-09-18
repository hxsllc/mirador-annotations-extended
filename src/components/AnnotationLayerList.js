import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Checkbox, FormControlLabel, FormGroup } from '@material-ui/core';

class AnnotationCategoryList extends Component {
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
        return (
            <>
                <FormGroup>
                    <FormControlLabel control={<Checkbox size="small" name="whole-pages" value="whole-pages" onChange={this.handleChange} />} label="Visible light" />
                    <FormControlLabel control={<Checkbox size="small" name="regions" value="regions" onChange={this.handleChange} />} label="Infrared" />
                </FormGroup>

            </>
        );
    }
}

export default AnnotationCategoryList;