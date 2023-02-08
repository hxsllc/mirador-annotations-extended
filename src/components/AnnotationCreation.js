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
import { Add, TransferWithinAStationOutlined } from '@material-ui/icons';
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
import { Visibility } from '@material-ui/icons';
import { VisibilityOff } from '@material-ui/icons';
import ns from 'mirador/dist/es/src/config/css-ns';
import MiradorMenuButton from 'mirador/dist/es/src/containers/MiradorMenuButton';
import AnnotationBodyItem from '../containers/AnnotationBodyItem';
import AnnotationMetadataItem from '../containers/AnnotationMetadataItem';
import AnnotationTargetItem from '../containers/AnnotationTargetItem';
import AnnotationTargetDisplay from '../containers/AnnotationTargetDisplay';
import ToggleTargetVisibilityDialog from '../containers/ToggleTargetVisibilityDialog';

/** */
class AnnotationCreation extends Component {
    /** */
    constructor(props) {
        super(props);

        const nickName = ['Norman', 'Johannes', 'Simone', 'Eva', 'Thomas', 'Sophie', 'Astrid', 'Annika', 'Jens', 'Willy'];

        const svgEnclosingTags = {
            start: "<svg xmlns='http://www.w3.org/2000/svg'>",
            end: "</svg>",
        };

        const annoState = {};
        if (props.annotation) {
            if(props.annotation.id) {
                annoState.annoId = props.annotation.id;
            } else {
                annoState.annoId = uuid();
            }
            annoState.metadata = [];
            annoState.metadataCount = 0;

            var tempCreator = {
                type : 'creator',
                value: props.annotation.creator && props.annotation.creator.name ? props.annotation.creator.name : null,
                _temp_id: annoState.annoId + '-metadata-item-' + annoState.metadataCount
            };
            annoState.metadata.push(tempCreator);
            annoState.metadataCount++;

            var tempMotivation = {
                type: 'motivation',
                value: props.annotation.motivation ? props.annotation.motivation : null,
                _temp_id: annoState.annoId + '-metadata-item-' + annoState.metadataCount
            };
            annoState.metadata.push(tempMotivation);
            annoState.metadataCount++;

            annoState.body = [];
            annoState.bodyCount = 0;
            if(props.annotation.body) {
                if (Array.isArray(props.annotation.body)) {
                    props.annotation.body.forEach((body) => {
                        var tempBody = {
                            type: body.type ? body.type : null,
                            purpose: body.purpose ? body.purpose : null,
                            value: body.value,
                            _temp_id: annoState.annoId + '-body-item-' + annoState.bodyCount
                        };
                        annoState.body.push(tempBody);
                        annoState.bodyCount++;
                    });
                } else {
                    var tempBody = {
                        type: props.annotation.body.type ? props.annotation.body.type : null,
                        purpose: props.annotation.body.purpose ? props.annotation.body.purpose : null,
                        value: props.annotation.body.value,
                        _temp_id: annoState.annoId + '-body-item-' + annoState.bodyCount
                    };
                    annoState.body.push(tempBody);
                    annoState.bodyCount++;
                }
            }
            annoState.target = [];
            annoState.targetCount = 0;
            if (props.annotation.target.selector) {
                if (Array.isArray(props.annotation.target.selector)) {
                    props.annotation.target.selector.forEach((selector) => {
                        if(selector.type == 'SvgSelector') {
                            var svgObject = new DOMParser().parseFromString(selector.value, "image/svg+xml");
                            var pathObjects = svgObject.querySelectorAll('path');
                            pathObjects.forEach(path => {
                                var tempTarget = {
                                    type: selector.type ? selector.type : null,
                                    value: path.outerHTML,
                                    _temp_id: annoState.annoId + '-target-item-' + annoState.targetCount,
                                    _temp_name: nickName[annoState.targetCount%nickName.length]
                                };
                                annoState.target.push(tempTarget);
                                annoState.targetCount++;
                            });
                        } else {
                            var tempTarget = {
                                type: selector.type ? selector.type : null,
                                value: selector.value,
                                _temp_id: annoState.annoId + '-target-item-' + annoState.targetCount,
                                _temp_name: nickName[annoState.targetCount%nickName.length]
                            };
                            annoState.target.push(tempTarget);
                            annoState.targetCount++;
                        }
                    });
                } else {
                    var tempTarget = {
                        type: props.annotation.target.selector.type ? props.annotation.target.selector.type : null,
                        value: props.annotation.target.selector.value,
                        _temp_id: annoState.annoId + '-target-item-' + annoState.targetCount,
                        _temp_name: nickName[annoState.targetCount%nickName.length]
                    };
                    annoState.target.push(tempTarget);
                    annoState.targetCount++;
                }
            }
        } else {
            annoState.annoId = uuid();
            annoState.metadata = [];
            annoState.metadataCount = 0;
            var tempCreator = {
                type : 'creator',
                value: null,
                _temp_id: annoState.annoId + '-metadata-item-' + annoState.metadataCount
            };
            annoState.metadata.push(tempCreator);
            annoState.metadataCount++;

            var tempMotivation = {
                type: 'motivation',
                value: null,
                _temp_id: annoState.annoId + '-metadata-item-' + annoState.metadataCount
            };
            annoState.metadata.push(tempMotivation);
            annoState.metadataCount++;

        }

        this.state = {
            annoId: null,
            body: [],
            metadata: [],
            target: [],
            bodyCount: 0,
            showTarget: false,
            targetEditState: null,
            bodyEditState: null,
            metadataEditState: null,
            metadataCount: 0,
            targetCount: 0,
            nickName,
            svgEnclosingTags,
            dialogToggleTargetVisibilityOpen: false,
            ...annoState,
        };

        this.submitAnnotation = this.submitAnnotation.bind(this);
        this.deleteAnnotationItem = this.deleteAnnotationItem.bind(this);
        this.updateAnnotationItem = this.updateAnnotationItem.bind(this);
        this.createAnnotationItem = this.createAnnotationItem.bind(this);
        this.setEditState = this.setEditState.bind(this);
        this.toggleAllTargets = this.toggleAllTargets.bind(this);
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
        const { body, metadata, target, metadataCount, bodyCount, targetCount, annoId, nickName } = this.state;

        switch(type) {
            case "target":
                const targetBase = { type: 'SvgSelector', value: null, _temp_id: annoId + '-target-item-' + targetCount, _temp_name: nickName[targetCount%nickName.length] };
                var newData = target.concat(targetBase);
                this.setState({ target: newData, targetCount: targetCount + 1 });
                break;
            case "body":
                const bodyBase = { type: 'TextualBody', value: null, purpose: null, _temp_id: annoId + '-body-item-' + bodyCount };
                var newData = body.concat(bodyBase);
                this.setState({ body: newData, bodyCount: bodyCount +1 });
                break;
            default:
                break;
        }
    }

    updateAnnotationItem(type, content, pos) {
        const { body, metadata, target } = this.state;
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

    setEditState(editState, type) {
        switch(type) {
            case 'target':
                this.setState({ targetEditState: editState });
                break;
            case 'body':
                this.setState({ bodyEditState: editState });
                break;
            case 'metadata':
                this.setState({ metadataEditState: editState });
                break;
            default:
                break;
        }
    }

    toggleAllTargets() {
        const { targetEditState, showTarget } = this.state;
        if(targetEditState == null || targetEditState == -1) {
            this.setState({ targetEditState: showTarget ? null : -1 });
            this.setState({ showTarget : !showTarget })
        } else {
            this.setState({ dialogToggleTargetVisibilityOpen: true });
        }
    }

    /** */
    submitAnnotation() {
        const { annotation, canvases, receiveAnnotation, config, closeCompanionWindow } = this.props;
        const { metadata, target, body, annoId, svgEnclosingTags } = this.state;

        canvases.forEach((canvas) => {
            const storageAdatper = config.annotation.adapter(canvas.id);
            var tBody = body;
            var tTarget = target;
            tTarget.forEach(a => delete a._temp_id);
            tTarget.forEach(a=> delete a._temp_name);
            // create single svg
            const tSvgTargetArray =  svgEnclosingTags.start + tTarget.filter(a => a.type == 'SvgSelector')?.map(a => a.value).join('') + svgEnclosingTags.end;

            var redTarget = tTarget.filter(a => a.type !== 'SvgSelector');
            redTarget.push({ type: 'SvgSelector', value: tSvgTargetArray });
            tBody.forEach(a => delete a._temp_id);
            tBody.forEach(a => a.purpose == null ? delete a.purpose : null );
                /*    Das ist nur für Johannes
                    (｡◕‿◕｡)
                    (╯°□°）╯︵ ┻━┻ */
            const anno = new WebAnnotation({
                body: tBody,
                canvasId: canvas.id,
                id: (annotation && annotation.id) || annoId,
                manifestId: canvas.options.resource.id,
                target: redTarget,
                creator: metadata.find(item => item.type =='creator').value,
                motivation: metadata.find(item => item.type=='motivation').value,
            }).toJson();

            if(annotation) {
                storageAdatper.update(anno).then(annoPage => receiveAnnotation(canvas.id, storageAdatper.annotationPageId, annoPage));
            } else {
                storageAdatper.create(anno).then(annoPage => receiveAnnotation(canvas.id, storageAdatper.annotationPageId, annoPage));
            }
        });

        closeCompanionWindow();
    }

    /** */
    render() {
        const {
            annotation, classes, closeCompanionWindow, id, windowId, t
        } = this.props;

        const {
            body, metadata, target, annoId, showTarget, targetEditState, dialogToggleTargetVisibilityOpen, bodyEditState, metadataEditState,
        } = this.state;

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
                                <AnnotationMetadataItem edit={metadataEditState} key={value._temp_id} handleEdit={this.setEditState} metadata={value} metadataPos={index} handleDelete={this.deleteAnnotationItem} handleSubmit={this.updateAnnotationItem} />
                            ))}
                        </List>
                    </CollapsibleSection>
                </div>

                {/* target testing section */}
                <div className={classes.section}>
                    <CollapsibleSection id={`${id}-targets`} label="Targets">
                        <IconButton size="small" onClick={this.toggleAllTargets}>
                            { showTarget ? <VisibilityOff /> : <Visibility /> }
                        </IconButton>
                            { showTarget ? <AnnotationTargetDisplay windowId={windowId} svgs={target} /> : null }
                        <List disablePadding>
                            {target?.map((value, index) => (
                                <AnnotationTargetItem edit={targetEditState} handleEdit={this.setEditState} key={value._temp_id} target={value} targetPos={index} handleDelete={this.deleteAnnotationItem} handleSubmit={this.updateAnnotationItem} windowId={windowId} />
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
                                <AnnotationBodyItem edit={bodyEditState} key={value._temp_id} body={value} bodyPos={index} handleEdit={this.setEditState} handleDelete={this.deleteAnnotationItem} handleSubmit={this.updateAnnotationItem} />

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
                    <Button variant="contained" color="primary" onClick={this.submitAnnotation}>
                        {t('annotationPanelSubmit')}
                    </Button>
                </div>
                {dialogToggleTargetVisibilityOpen && (<ToggleTargetVisibilityDialog open={dialogToggleTargetVisibilityOpen} handleClose={() => this.setState({ dialogToggleTargetVisibilityOpen: false })} />)}
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
