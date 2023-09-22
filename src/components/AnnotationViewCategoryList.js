import React, { Component } from 'react';
import { Checkbox, FormControlLabel, FormGroup } from '@material-ui/core';

class AnnotationViewCategoryList extends Component {
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
        const { categories } = this.props;

        return (
            <>
                <FormGroup>
                    {
                        categories.map((category, idx) => <FormControlLabel control={<Checkbox size="small" name={category.value} value={category.value} onChange={this.handleChange} checked={category.checked} />} label={category.label} key={idx} />)
                    }
                </FormGroup>
            </>
        );
    }
}

export default AnnotationViewCategoryList;