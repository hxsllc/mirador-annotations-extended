import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import RectangleIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CircleIcon from '@material-ui/icons/RadioButtonUnchecked';
import PolygonIcon from '@material-ui/icons/Timeline';
import GestureIcon from '@material-ui/icons/Gesture';
import ClosedPolygonIcon from '@material-ui/icons/ChangeHistory';
import OpenPolygonIcon from '@material-ui/icons/ShowChart';
import FormatColorFillIcon from '@material-ui/icons/FormatColorFill';
import StrokeColorIcon from '@material-ui/icons/BorderColor';
import LineWeightIcon from '@material-ui/icons/LineWeight';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import FormatShapesIcon from '@material-ui/icons/FormatShapes';
import DeleteIcon from '@material-ui/icons/DeleteForever';
import EditIcon from '@material-ui/icons/Edit';
import { Add } from '@material-ui/icons';
import Popover from '@material-ui/core/Popover';
import Divider from '@material-ui/core/Divider';
import MenuItem from '@material-ui/core/MenuItem';
import { TextField } from '@material-ui/core';
import { ExpandMore, ExpandLess } from '@material-ui/icons';
import { Collapse } from '@material-ui/core';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import MenuList from '@material-ui/core/MenuList';
import { List, ListItem, ListItemText } from '@material-ui/core';
import { SketchPicker } from 'react-color';
import { v4 as uuid } from 'uuid';
import CompanionWindow from 'mirador/dist/es/src/containers/CompanionWindow';
import CollapsibleSection from 'mirador/dist/es/src/containers/CollapsibleSection';
import AnnotationDrawing from './AnnotationDrawing';
import TextEditor from '../containers/TextEditor';
import WebAnnotation from '../WebAnnotation';
import CursorIcon from '../icons/Cursor';
import { Check } from '@material-ui/icons';
import IconButton from '@material-ui/core/IconButton';
import ns from 'mirador/dist/es/src/config/css-ns';
import MiradorMenuButton from 'mirador/dist/es/src/containers/MiradorMenuButton';
import AnnotationBodyItem from '../containers/AnnotationBodyItem';
import AnnotationMetadataItem from '../containers/AnnotationMetadataItem';
import AnnotationTargetItem from '../containers/AnnotationTargetItem';

/** */
class AnnotationCreation extends Component {
    /** */
    constructor(props) {
        super(props);
        const annoState = {};
        if (props.annotation) {
            if(props.annotation.id) {
                annoState.annoId = props.annotation.id;
            } else {
                annoState.annoId = uuid();
            }
            if (Array.isArray(props.annotation.body)) {
                annoState.tags = [];
                props.annotation.body.forEach((body) => {
                    if (body.purpose === 'tagging') {
                        annoState.tags.push(body.value);
                    } else {
                        annoState.annoBody = body.value;
                    }
                });
            } else {
                annoState.annoBody = props.annotation.body.value;
            }
            if (props.annotation.target.selector) {
                if (Array.isArray(props.annotation.target.selector)) {
                    props.annotation.target.selector.forEach((selector) => {
                        if (selector.type === 'SvgSelector') {
                            annoState.svg = selector.value;
                        } else if (selector.type === 'FragmentSelector') {
                            annoState.xywh = selector.value.replace('xywh=', '');
                        }
                    });
                } else {
                    annoState.svg = props.annotation.target.selector.value;
                }
            }
        }


        this.state = {
            annoId: null,
            body: [],
            metadata: [],
            target: [],
            bodyCount: 0,
            metadataCount: 0,
            targetCount: 0,
            ...annoState,
        };

        this.submitForm = this.submitForm.bind(this);
        this.deleteAnnotationItem = this.deleteAnnotationItem.bind(this);
        this.updateAnnotationItem = this.updateAnnotationItem.bind(this);
        this.createAnnotationItem = this.createAnnotationItem.bind(this);
    }

    deleteAnnotationItem(type, pos) {
        const { body, metadata, target } = this.state;
        switch(type) {
            case "target":
                var newData = target;
                newData.splice(pos, 1);
                this.setState({ target: newData });
                break;
            case "metadata":
                var newData = metadata;
                newData.splice(pos, 1);
                this.setState({ metadata: newData });
                break;
            case "body":
                var newData = body;
                newData.splice(pos, 1);
                this.setState({ body: newData });
                break;
            default:
                break;
        }
    }

    /** add dynamic generatet ids whichare only used to get freaking rerendering done */
    createAnnotationItem(type) {
        const { body, metadata, target, metadataCount, bodyCount, targetCount, annoId } = this.state;

        switch(type) {
            case "target":
                const targetBase = { type: 'SvgSelector', value: null, _temp_id: annoId + '-target-item-' + targetCount };
                var newData = target.concat(targetBase);
                this.setState({ target: newData, targetCount: targetCount + 1 });
                break;
            case "body":
                const bodyBase = { type: 'TextualBody', value: null, purpose: 'describing', _temp_id: annoId + '-body-item-' + bodyCount };
                var newData = body.concat(bodyBase);
                this.setState({ body: newData, bodyCount: bodyCount +1 });
                break;
            case "metadata":
                const metadataBase = { type: 'creator', value: null, _temp_id: annoId + '-metadata-item-' + metadataCount };
                var newData = metadata.concat(metadataBase);
                this.setState({ metadata: newData, metadataCount: metadataCount +1 });
                break;
            default:
                break;
        }
    }

    updateAnnotationItem(type, content, pos) {
        const { body, metadata, target } = this.state;
        console.log('i really have fun doing shit');
        console.log(type);
        console.log(content);
        console.log(pos);
        switch(type) {
            case "target":
                var newData = target;
                newData[pos] = content;
                this.setState({ target: newData });
                break;
            case "metadata":
                var newData = metadata;
                newData[pos] = content;
                this.setState({ metadata: newData });
                break;
            case "body":
                var newData = body;
                newData[pos] = content;
                this.setState({ body: newData });
                break;
            default:
                break;
        }
    }

    /** */
    submitForm(e) {
        e.preventDefault();
    }

    /** */
    render() {
        const {
            annotation, classes, closeCompanionWindow, id, windowId, t
        } = this.props;

        const {
            body, metadata, target, annoId
        } = this.state;
        console.log('this is anno - id');
        console.log(annoId);
        return (
            <CompanionWindow
                title={annotation ? t('editAnnotation') : t('addAnnotation')}
                windowId={windowId}
                id={id}
                paperClassName={ns('window-sidebar-annotation-panel')}
            >

                {/* metadata testing section */}
                <div className={classes.section}>
                    <CollapsibleSection id={`${id}-metadata`} label={t('metadata')}>
                        <List disablePadding>
                            {metadata?.map((value, index) => (
                                <AnnotationMetadataItem key={value._temp_id} metadata={value} metadataPos={index} handleDelete={this.deleteAnnotationItem} handleSubmit={this.updateAnnotationItem} />
                            ))}
                        </List>
                        <div className={classes.addSection}>
                            <MiradorMenuButton aria-label="hooray" className={classes.button} onClick={() => this.createAnnotationItem('metadata')}>
                                <Add />
                            </MiradorMenuButton>
                        </div>
                    </CollapsibleSection>
                </div>

                {/* target testing section */}
                <div className={classes.section}>
                    <CollapsibleSection id={`${id}-targets`} label="Targets">
                        <List disablePadding>
                            {target?.map((value, index) => (
                                <AnnotationTargetItem key={value._temp_id} target={value} targetPos={index} handleDelete={this.deleteAnnotationItem} handleSubmit={this.updateAnnotationItem} windowId={windowId} />
                            ))}
                        </List>
                        <div className={classes.addSection}>
                            <MiradorMenuButton aria-label="hooray" className={classes.button} onClick={() => this.createAnnotationItem('target')}>
                                <Add />
                            </MiradorMenuButton>
                        </div>
                    </CollapsibleSection>
                </div>

                {/* testing body section */}
                <div className={classes.section}>
                    <CollapsibleSection id={`${id}-bodies`} label="Bodies">
                        <List component="div" disablePadding>
                            {body?.map((value, index) => (
                                <AnnotationBodyItem key={value._temp_id} body={value} bodyPos={index} handleDelete={this.deleteAnnotationItem} handleSubmit={this.updateAnnotationItem} />

                            ))}
                        </List>
                        <div className={classes.addSection}>
                            <MiradorMenuButton aria-label="hooray" className={classes.button} onClick={() => this.createAnnotationItem('body')}>
                                <Add />
                            </MiradorMenuButton>
                        </div>
                    </CollapsibleSection>
                </div>

                <div>
                    <Button onClick={closeCompanionWindow}>
                        {t('annotationPanelCancel')}
                    </Button>
                    <Button variant="contained" color="primary" onClick={() => console.log('you submited')}>
                        {t('annotationPanelSubmit')}
                    </Button>
                </div>
            </CompanionWindow>
        );
    }
}

AnnotationCreation.propTypes = {
    annotation: PropTypes.object, // eslint-disable-line react/forbid-prop-types
    canvases: PropTypes.arrayOf(
        PropTypes.shape({ id: PropTypes.string, index: PropTypes.number }),
    ),
    classes: PropTypes.objectOf(PropTypes.string),
    closeCompanionWindow: PropTypes.func,
    config: PropTypes.shape({
        annotation: PropTypes.shape({
            adapter: PropTypes.func,
            defaults: PropTypes.objectOf(
                PropTypes.oneOfType(
                    [PropTypes.bool, PropTypes.func, PropTypes.number, PropTypes.string]
                )
            ),
        }),
    }).isRequired,
    id: PropTypes.string.isRequired,
    receiveAnnotation: PropTypes.func.isRequired,
    windowId: PropTypes.string.isRequired,
    t: PropTypes.func.isRequired,
};

AnnotationCreation.defaultProps = {
    annotation: null,
    canvases: [],
    classes: {},
    closeCompanionWindow: () => { },
    t: key => key,
};

export default AnnotationCreation;
