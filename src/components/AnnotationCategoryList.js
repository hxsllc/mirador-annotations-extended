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
                    <FormControlLabel control={<Checkbox size="small" name="whole-pages" value="whole-pages" onChange={this.handleChange} />} label="Whole Pages" />
                    <FormControlLabel control={<Checkbox size="small" name="regions" value="regions" onChange={this.handleChange} />} label="Regions (80)" />
                    <FormControlLabel control={<Checkbox size="small" name="story-arcs" value="story-arcs" onChange={this.handleChange} />} label="Story Arcs (100+)" />
                    <FormControlLabel control={<Checkbox size="small" name="glyphs" value="glyphs" onChange={this.handleChange} />} label="Glyphs" />
                    <FormControlLabel control={<Checkbox size="small" name="glosses" value="glosses" onChange={this.handleChange} />} label="Glosses" />
                    <FormControlLabel control={<Checkbox size="small" name="fors/xrf" value="fors/xrf" onChange={this.handleChange} />} label="FORS/XRF" />
                    <FormControlLabel control={<Checkbox size="small" name="other" value="other" onChange={this.handleChange} />} label="Other" />
                </FormGroup>

            </>
        );
    }
}

export default AnnotationCategoryList;