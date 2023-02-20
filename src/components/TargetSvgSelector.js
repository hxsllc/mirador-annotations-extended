import React, { Component } from 'react';
import AnnotationSvgDrawing from '../containers/AnnotationSvgDrawing';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import RectangleIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CircleIcon from '@material-ui/icons/RadioButtonUnchecked';
import PolygonIcon from '@material-ui/icons/Timeline';
import GestureIcon from '@material-ui/icons/Gesture';
import { Radio } from '@material-ui/core';
import { Collapse } from '@material-ui/core';

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
        const {
            classes,
            edit,
            hover,
            value,
            windowId,
        } = this.props;

        const {
            activeTool,
            closedMode,
            strokeColor,
            strokeWidth,
            svg,
        } = this.state;

        const colors = ["#cc0000", "#fcba03", "#32c784", "#403df2"];

        return (
            <div className={classes.selector}>
                {
                    (edit || hover) && (
                        <AnnotationSvgDrawing
                            activeTool={activeTool}
                            closed={closedMode}
                            strokeColor={strokeColor}
                            strokeWidth={strokeWidth}
                            svg={value}
                            updateGeometry={this.updateGeometry}
                            windowId={windowId} />
                    )
                }
                <Collapse className={classes.editAnnotationCollapse} in={edit} unmountOnExit>
                    <div>
                    <ToggleButtonGroup value={activeTool} exclusive onChange={this.changeTool} aria-label='tools'>
                        <ToggleButton aria-label="rectangle" disabled={activeTool =='edit'} value="rectangle">
                            <RectangleIcon />
                        </ToggleButton>
                        <ToggleButton aria-label="circle" disabled={activeTool =='edit'} value="ellipse">
                            <CircleIcon />
                        </ToggleButton>
                        <ToggleButton aria-label="polygon" className={classes.hidden} disabled={activeTool =='edit'} value="polygon">
                            <PolygonIcon />
                        </ToggleButton>
                        <ToggleButton aria-label="freehand" disabled={activeTool =='edit'} value="freehand">
                            <GestureIcon />
                        </ToggleButton>
                    </ToggleButtonGroup>
                    </div>
                    <div>
                        {colors.map((value) => (
                            <Radio
                                aria-label={`select color-${value}`}
                                checked={strokeColor==value}
                                disabled={activeTool =='edit'}
                                onChange={this.changeColor}
                                style={ activeTool !== 'edit' ? { color: `${value}` } : {}}
                                value={value}
                            />
                        ))}
                    </div>
                </Collapse>
            </div>
        )
    }
};

TargetSvgSelector.propTypes = {};
TargetSvgSelector.defaultProps = {};

export default TargetSvgSelector;
