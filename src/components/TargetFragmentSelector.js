import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import RectangleIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CircleIcon from '@material-ui/icons/RadioButtonUnchecked';
import PolygonIcon from '@material-ui/icons/Timeline';
import GestureIcon from '@material-ui/icons/Gesture';
import ClosedPolygonIcon from '@material-ui/icons/ChangeHistory';
import OpenPolygonIcon from '@material-ui/icons/ShowChart';
import AnnotationFragmentDrawing from '../containers/AnnotationFragmentDrawing';

class TargetFragmentSelector extends Component {
    constructor(props) {
        super(props);

        const toolState = {
            activeTool: 'rectangle',
            strokeColor: '#000000',
            strokeWidth: 1,
            closedMode: false,
        };

        this.state = {
            ...toolState,
            xywh: null,
        }

        this.changeTool = this.changeTool.bind(this);
        this.updateGeometry = this.updateGeometry.bind(this);
    }

    componentDidMount() {
        const { value } = this.props;
        if(value) {
            this.setState({ xywh: value.includes('xywh=') ? value.slice(5) : value, activeTool: 'edit' });
        }
    }

    changeTool(tool) {
        this.setState({
            activeTool: tool,
        });
    }

    updateGeometry({ xywh }) {
        const { updateValue } = this.props;
        const { activeTool } = this.state;
        this.setState({ xywh });
        updateValue({ value: `xywh=${xywh}` });
        if(xywh && activeTool !=='edit') {
            this.setState({ activeTool: 'edit'});
        }
    }

    render() {
        const { classes, windowId, value } = this.props;
        const { activeTool, strokeColor, xywh, strokeWidth, closedMode } = this.state;

        return (
            <div className={classes.selector}>
                <AnnotationFragmentDrawing activeTool={activeTool} strokeColor={strokeColor} strokeWidth={strokeWidth} closed={closedMode} xywh={value} updateGeometry={this.updateGeometry} windowId={windowId} />
                {
                    activeTool=='edit'
                    ? <div>Sie die gesetzte Markierung verschieben, vergrößern oder verkleinern</div>
                    : <div>Sie können jetzt einen Bereich markieren</div>
                }
            </div>
        )
    }
}

export default TargetFragmentSelector;
