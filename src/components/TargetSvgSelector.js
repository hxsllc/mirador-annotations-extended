import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import RectangleIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CircleIcon from '@material-ui/icons/RadioButtonUnchecked';
import PolygonIcon from '@material-ui/icons/Timeline';
import GestureIcon from '@material-ui/icons/Gesture';
import FormatShapesIcon from '@material-ui/icons/FormatShapes';
import Divider from '@material-ui/core/Divider';;
import AnnotationSvgDrawing from '../containers/AnnotationSvgDrawing';
import StrokeColorIcon from '@material-ui/icons/BorderColor';
import LineWeightIcon from '@material-ui/icons/LineWeight';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import FormatColorFillIcon from '@material-ui/icons/FormatColorFill';
import { Collapse } from '@material-ui/core';
import CursorIcon from '../icons/Cursor';

class SelectorTools extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const {
      activeTool,
      blockTargetHover,
    } = this.props;

    if (activeTool !== 'edit') {
      blockTargetHover(true);
    }
  }

  componentWillUnmount() {
    const { blockTargetHover } = this.props;

    blockTargetHover(false);
  }

  render() {
    const {
      activeTool,
      changeColor,
      changeTool,
      colors,
      strokeColor,
      t,
      // add key, nörgels about missing key
    } = this.props;

    return (
      <>
        <Grid item xs={12}>
          <Paper elevation={0} className="MuiPaper-root AnnotationCreation-paper-97 MuiPaper-elevation0 MuiPaper-rounded">
            <ToggleButtonGroup
              className="MuiToggleButtonGroup-root AnnotationCreation-grouped-96"
              value={activeTool}
              exclusive
              onChange={this.changeTool}
              aria-label="tool selection"
              size="small"
            >
              <ToggleButton value="cursor" aria-label="select cursor">
                <CursorIcon />
              </ToggleButton>
              <ToggleButton value="edit" aria-label="select cursor">
                <FormatShapesIcon />
              </ToggleButton>
            </ToggleButtonGroup>
            <Divider flexItem orientation="vertical" className="MuiDivider-root AnnotationCreation-divider-95 MuiDivider-flexItem MuiDivider-vertical" />
            <ToggleButtonGroup
              className="MuiToggleButtonGroup-root AnnotationCreation-grouped-96"
              value={activeTool}
              exclusive
              onChange={this.changeTool}
              aria-label="tool selection"
              size="small"
            >
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
            </ToggleButtonGroup>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <ToggleButtonGroup
            aria-label="style selection"
            size="small"
          >
            <ToggleButton
              value="strokeColor"
              aria-label="select color"
              onClick={this.openChooseColor}
            >
              <StrokeColorIcon style={{ fill: strokeColor }} />
              <ArrowDropDownIcon />
            </ToggleButton>
            <ToggleButton
              value="strokeColor"
              aria-label="select line weight"
              onClick={this.openChooseLineWeight}
            >
              <LineWeightIcon />
              <ArrowDropDownIcon />
            </ToggleButton>
            <ToggleButton
              value="fillColor"
              aria-label="select color"
              onClick={this.openChooseColor}
            >
              <FormatColorFillIcon style={{  }} />
              <ArrowDropDownIcon />
            </ToggleButton>
          </ToggleButtonGroup>

          <Divider flexItem orientation="vertical" className="MuiDivider-root AnnotationCreation-divider-95 MuiDivider-flexItem MuiDivider-vertical" />
          { /* close / open polygon mode only for freehand drawing mode. */
            activeTool === 'freehand'
              ? (
                <ToggleButtonGroup
                  size="small"
                  value={closedMode}
                  onChange={this.changeClosedMode}
                >
                  <ToggleButton value="closed">
                    <ClosedPolygonIcon />
                  </ToggleButton>
                  <ToggleButton value="open">
                    <OpenPolygonIcon />
                  </ToggleButton>
                </ToggleButtonGroup>
              )
              : null
          }

        </Grid>
      </>
    )
  }
}

SelectorTools.propTypes = {
  activeTool: PropTypes.string.isRequired,
  blockTargetHover: PropTypes.func.isRequired,
  changeColor: PropTypes.func.isRequired,
  changeTool: PropTypes.func.isRequired,
  colors: PropTypes.arrayOf(PropTypes.string).isRequired,
  strokeColor: PropTypes.string.isRequired,
  t: PropTypes.func.isRequired,
}


class TargetSvgSelector extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeTool: 'rectangle',
      strokeColor: "#cc0000",
      strokeWidth: 3,
      closedMode: true,
    }

    this.changeTool = this.changeTool.bind(this);
    this.updateGeometry = this.updateGeometry.bind(this);
    this.changeColor = this.changeColor.bind(this);
  }

  componentDidMount() {
    const { value } = this.props;

    if (value) {
      this.setState({ activeTool: 'edit' });
    }
  }

  changeTool(e, tool) {
    const { activeTool } = this.state;

    if (activeTool !== 'edit') {
      this.setState({
        activeTool: tool,
      });
    };
    switch (tool) {
      case 'rectangle':
        this.setState({ closedMode: true });
        break;
      case 'ellipse':
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
    const { updateValue, blockTargetHover } = this.props;
    const { activeTool } = this.state;

    if (svg && activeTool !== 'edit') {
      this.setState({ activeTool: 'edit' });
    }
    updateValue({ value: svg });
    blockTargetHover(false);
  }

  render() {
    const {
      blockTargetHover,
      classes,
      edit,
      hover,
      t,
      targetId,
      value,
      windowId,
    } = this.props;

    const {
      activeTool,
      closedMode,
      strokeColor,
      strokeWidth,
    } = this.state;

    const colors = ["#cc0000", "#fcba03", "#32c784", "#403df2"];

    return (
      <div className={classes.selector}>
        <Collapse
          className={classes.editAnnotationCollapse}
          in={edit}
          unmountOnExit
        >
          {
            edit && (
              <SelectorTools
                activeTool={activeTool}
                blockTargetHover={blockTargetHover}
                changeTool={this.changeTool}
                changeColor={this.changeColor}
                colors={colors}
                key={`${targetId}-tools`}
                strokeColor={strokeColor}
                t={t}
              />
            )
          }
        </Collapse>
        {
          (edit || hover) && (
            <AnnotationSvgDrawing
              activeTool={activeTool}
              closed={closedMode}
              edit={edit}
              strokeColor={strokeColor}
              strokeWidth={strokeWidth}
              svg={value}
              updateGeometry={this.updateGeometry}
              windowId={windowId}
            />
          )
        }
      </div>
    )
  }
};

TargetSvgSelector.propTypes = {
  blockTargetHover: PropTypes.func.isRequired,
  classes: PropTypes.objectOf(PropTypes.string),
  edit: PropTypes.bool.isRequired,
  hover: PropTypes.bool.isRequired,
  t: PropTypes.func.isRequired,
  targetId: PropTypes.string.isRequired,
  updateValue: PropTypes.func.isRequired,
  value: PropTypes.string,
  windowId: PropTypes.string.isRequired,
}
TargetSvgSelector.defaultProps = {
  classes: {},
  value: null,
};

export default TargetSvgSelector;
