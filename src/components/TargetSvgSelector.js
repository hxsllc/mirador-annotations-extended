import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AnnotationSvgDrawing from '../containers/AnnotationSvgDrawing';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import RectangleIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CircleIcon from '@material-ui/icons/RadioButtonUnchecked';
import PolygonIcon from '@material-ui/icons/Timeline';
import GestureIcon from '@material-ui/icons/Gesture';
import ClosedPolygonIcon from '@material-ui/icons/ChangeHistory';
import OpenPolygonIcon from '@material-ui/icons/ShowChart';
import { ButtonGroup } from '@material-ui/core';
import MiradorMenuButton from 'mirador/dist/es/src/containers/MiradorMenuButton';
import { Button } from '@material-ui/core';

class TargetSvgSelector extends Component {
    constructor(props) {
        super(props);

        const toolState = {
            activeTool: 'rectangle',
            strokeColor: '#CC0000',
            strokeWidth: 1,
            closedMode: false,
        };

        this.state = {
            ...toolState,
            svg: null,
        }

        this.changeTool = this.changeTool.bind(this);
        this.updateGeometry = this.updateGeometry.bind(this);
    }

    changeTool(e, tool) {
        console.log(tool);
        this.setState({
            activeTool: tool,
        });
    }

    updateGeometry({ svg }) {
        this.setState({ svg });
    }

    render() {
        const { classes, windowId } = this.props;
        const { activeTool, strokeColor, svg, strokeWidth, closedMode } = this.state;

        return (
            <div className={classes.selector}>
                <AnnotationSvgDrawing activeTool={activeTool} strokeColor={strokeColor} strokeWidth={strokeWidth} closed={closedMode} svg={svg} updateGeometry={this.updateGeometry} windowId={windowId} />
                <ToggleButtonGroup value={activeTool} exclusive onChange={this.changeTool} aria-Label='tools'>
                    <ToggleButton value="rectangle" aria-label="rectangle">
                        <RectangleIcon />
                    </ToggleButton>
                    <ToggleButton value="ellipse" aria-label="circle">
                        <CircleIcon />
                    </ToggleButton>
                    <ToggleButton value="polygon" aria-label="polygon">
                        <PolygonIcon />
                    </ToggleButton>
                    <ToggleButton value="freehand" aria-label="freehand">
                        <GestureIcon />
                    </ToggleButton>
                </ToggleButtonGroup>
                {/*<ToggleButtonGroup value={activeTool} onChange={this.changeTool} aria-Label='tools'>
                    <ToggleButton value="rectangle" aria-label="add a rectangle">
                        <RectangleIcon />
                    </ToggleButton>
                    <ToggleButton value="ellipse" aria-label="add a circle">
                        <CircleIcon />
                    </ToggleButton>
                    <ToggleButton value="polygon" aria-label="add a polygon">
                        <PolygonIcon />
                    </ToggleButton>
                    <ToggleButton value="freehand" aria-label="free hand polygon">
                        <GestureIcon />
                    </ToggleButton>
        </ToggleButtonGroup>*/}
            </div>
        )
    }
}

export default TargetSvgSelector;
