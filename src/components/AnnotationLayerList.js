import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Checkbox, FormControlLabel, FormGroup } from '@material-ui/core';

class AnnotationLayerList extends Component {
    /** */
    constructor(props) {
        super(props);

        // const { config, canvases, fetchManifest, requestManifest, updateLayers } = this.props;
        // canvases.forEach((canvas) => {
        //     if (config != null && config.annotation != null) {
        //         let ll = updateLayers(canvas.id, {});
        //         console.log("updateLayers", ll);
        //     } else {
        //         console.error("config.annotation is null");
        //     }
        // });
        // const maniInfo = requestManifest("https://iiif.io/api/cookbook/recipe/0033-choice/manifest.json");
        // console.log("maniInfo", maniInfo);

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

export default AnnotationLayerList;