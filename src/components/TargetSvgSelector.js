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
import { Radio } from '@material-ui/core';

class TargetSvgSelector extends Component {
    constructor(props) {
        super(props);

        const toolState = {
            activeTool: 'rectangle',
            strokeColor: "#cc0000",
            strokeWidth: 3,
            closedMode: true,
        };

        const selectorState= {
            svg: props.value,
        };

        this.state = {
            ...toolState,
            svg: null,
            ...selectorState
        }

        this.changeTool = this.changeTool.bind(this);
        this.updateGeometry = this.updateGeometry.bind(this);
        this.changeColor = this.changeColor.bind(this);
    }

    componentDidMount() {
        const { svg } = this.state;
        if(svg) {
            this.setState({ activeTool: 'edit' });
        }
    }

    changeTool(e, tool) {
        const { activeTool } = this.state;

        if(activeTool !== 'edit') {
            this.setState({
                activeTool: tool,
            });
        };
        switch(tool) {
            case 'rectangle':
                this.setState({ closedMode: true });
                break;
            case 'ellipse':
                this.setState({ closedMode: true });
                break;
            case 'polygon':
                this.setState({ closedMode: true });
                break;
            case 'freehand':
                this.setState({ closedMode: false });
                break;
            default:
                break;
        }

    }

    changeColor(e) {
        this.setState({ strokeColor: e.target.value });
    }

    updateGeometry({ svg }) {
        const { updateValue } = this.props;
        const { activeTool } = this.state;
        this.setState({ svg });
        updateValue({ value: svg });
        if(svg && activeTool !=='edit') {
            this.setState({ activeTool: 'edit'});
        }
    }

    render() {
        const { classes, windowId, value } = this.props;
        const { activeTool, strokeColor, svg, strokeWidth, closedMode } = this.state;

        const colors = ["#cc0000", "#fcba03", "#32c784", "#403df2"];

        return (
            <div className={classes.selector}>
                <AnnotationSvgDrawing activeTool={activeTool} strokeColor={strokeColor} strokeWidth={strokeWidth} closed={closedMode} svg={value} updateGeometry={this.updateGeometry} windowId={windowId} />
                <div>
                <ToggleButtonGroup value={activeTool} exclusive onChange={this.changeTool} aria-Label='tools'>
                    <ToggleButton value="rectangle" aria-label="rectangle" disabled={activeTool =='edit'}>
                        <RectangleIcon />
                    </ToggleButton>
                    <ToggleButton value="ellipse" aria-label="circle" disabled={activeTool =='edit'}>
                        <CircleIcon />
                    </ToggleButton>
                    <ToggleButton className={classes.hidden} value="polygon" aria-label="polygon" disabled={activeTool =='edit'}>
                        <PolygonIcon />
                    </ToggleButton>
                    <ToggleButton value="freehand" aria-label="freehand" disabled={activeTool =='edit'}>
                        <GestureIcon />
                    </ToggleButton>
                </ToggleButtonGroup>
                </div>
                <div>
                    {colors.map((value) => (
                        <Radio disabled={activeTool =='edit'} style={ activeTool !== 'edit' ? { color: `${value}` } : {}} checked={strokeColor==value} onChange={this.changeColor} value={value} aria-label={`select color-${value}`} />
                    ))}
                </div>
            </div>
        )
    }
}

export default TargetSvgSelector;
