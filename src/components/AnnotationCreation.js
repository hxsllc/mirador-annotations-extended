import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { Add } from '@material-ui/icons';
import { List } from '@material-ui/core';
import { v4 as uuid } from 'uuid';
import CompanionWindow from 'mirador/dist/es/src/containers/CompanionWindow';
import { Divider } from '@material-ui/core';
import WebAnnotation from '../WebAnnotation';
import ns from 'mirador/dist/es/src/config/css-ns';
import MiradorMenuButton from 'mirador/dist/es/src/containers/MiradorMenuButton';
import AnnotationBodyItem from '../containers/AnnotationBodyItem';
import AnnotationMetadataItem from '../containers/AnnotationMetadataItem';
import AnnotationTargetItem from '../containers/AnnotationTargetItem';
import CustomSection from '../containers/CustomSection';

/** */
class AnnotationCreation extends Component {
    /** */
    constructor(props) {
        super(props);

        const nickName = ['Norman', 'Johannes', 'Simone', 'Eva', 'Thomas', 'Sophie', 'Astrid', 'Annika', 'Jens', 'Willy'];

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
                value: 'commenting',
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
            targetEditState: null,
            bodyEditState: null,
            metadataEditState: null,
            metadataCount: 0,
            targetCount: 0,
            nickName,
            ...annoState,
        };

        this.submitAnnotation = this.submitAnnotation.bind(this);
        this.deleteAnnotationItem = this.deleteAnnotationItem.bind(this);
        this.updateAnnotationItem = this.updateAnnotationItem.bind(this);
        this.createAnnotationItem = this.createAnnotationItem.bind(this);
        this.setEditState = this.setEditState.bind(this);
    }

    deleteAnnotationItem(type, _temp_id) {
        const {
            body,
            metadata,
            target,
        } = this.state;

        switch(type) {
            case "target":
                var dataPos = null;
                var index = 0;
                while (index < target.length && !dataPos) {
                    if(target[index]._temp_id == _temp_id) {
                        dataPos = index;
                    };
                    index++;
                }
                var newData = target;
                newData.splice(dataPos, 1);
                this.setState({ target: newData });
                break;
            case "metadata":
                var dataPos = null;
                var index = 0;
                while (index < metadata.length && !dataPos) {
                    if(metadata[index]._temp_id == _temp_id) {
                        dataPos = index;
                    };
                    index++;
                }
                var newData = metadata;
                newData.splice(dataPos, 1);
                this.setState({ metadata: newData });
                break;
            case "body":
                var dataPos = null;
                var index = 0;
                while (index < body.length && !dataPos) {
                    if(body[index]._temp_id == _temp_id) {
                        dataPos = index;
                    };
                    index++;
                }
                var newData = body;
                newData.splice(dataPos, 1);
                this.setState({ body: newData });
                break;
            default:
                break;
        }
    }

    /** add dynamic generatet ids which are only used to get freaking rerendering done */
    createAnnotationItem(type, subType = null) {
        const {
            annoId,
            body,
            bodyCount,
            target,
            targetCount,
            nickName,
        } = this.state;

        switch(type) {
            case "target":
                const targetBase = {
                    type: 'SvgSelector',
                    value: null,
                    _temp_id: annoId + '-target-item-' + targetCount,
                    _temp_name: nickName[targetCount%nickName.length]
                };
                var newData = target.concat(targetBase);
                this.setState({
                    target: newData,
                    targetCount: targetCount + 1
                });
                break;
            case "body":
                const bodyBase = {
                    type: 'TextualBody',
                    value: '',
                    purpose: subType,
                    _temp_id: annoId + '-body-item-' + bodyCount
                };
                var newData = body.concat(bodyBase);
                this.setState({
                    body: newData,
                    bodyCount: bodyCount +1
                });
                break;
            default:
                break;
        }
    }

    updateAnnotationItem(type, content, _temp_id) {
        const {
            body,
            metadata,
            target,
        } = this.state;

        switch(type) {
            case "target":
                var dataPos = null;
                var index = 0;
                while (index < target.length && !dataPos) {
                    if(target[index]._temp_id == _temp_id) {
                        dataPos = index;
                    };
                    index++;
                }
                var newData = target;
                newData[dataPos] = content;
                this.setState({ target: newData });
                break;
            case "metadata":
                var dataPos = null;
                var index = 0;
                while (index < metadata.length && !dataPos) {
                    if(metadata[index]._temp_id == _temp_id) {
                        dataPos = index;
                    };
                    index++;
                }
                var newData = metadata;
                newData[dataPos] = content;
                this.setState({ metadata: newData });
                break;
            case "body":
                var dataPos = null;
                var index = 0;
                while (index < body.length && !dataPos) {
                    if(body[index]._temp_id == _temp_id) {
                        dataPos = index;
                    };
                    index++;
                }
                var newData = body;
                newData[dataPos] = content;
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

    /** */
    submitAnnotation() {
        const {
            annotation,
            canvases,
            closeCompanionWindow,
            config,
            receiveAnnotation,
        } = this.props;

        const {
            annoId,
            body,
            metadata,
            target,
        } = this.state;

        canvases.forEach((canvas) => {
            const storageAdatper = config.annotation.adapter(canvas.id);
            var tBody = body;
            var tTarget = target;
            tTarget.forEach(a => delete a._temp_id);
            tTarget.forEach(a=> delete a._temp_name);
            // mirador shows only oe svg target so combine to single svg
            const tSvgTargetArray =  "<svg xmlns='http://www.w3.org/2000/svg'>" + tTarget.filter(a => a.type == 'SvgSelector')?.map(a => a.value).join('') + "</svg>";

            var redTarget = tTarget.filter(a => a.type !== 'SvgSelector');
            redTarget.push({ type: 'SvgSelector', value: tSvgTargetArray });
            tBody.forEach(a => delete a._temp_id);
            tBody.forEach(a => a.purpose == null ? delete a.purpose : null );

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
            annotation,
            classes,
            closeCompanionWindow,
            id,
            t,
            windowId,
        } = this.props;

        const {
            body,
            bodyEditState,
            metadata,
            metadataEditState,
            target,
            targetEditState,
        } = this.state;

        return (
            <CompanionWindow
                title={annotation ? t('editAnnotation') : t('addAnnotation')}
                windowId={windowId}
                id={id}
                paperClassName={ns('window-sidebar-annotation-panel')}
            >

                {/* metadata section */}
                <CustomSection
                    primary={t('annotationCreationMetadata')}
                    //secondary='dummi'
                    id={`${id}-metadata`}
                >
                    <List disablePadding>
                            {metadata?.map((value, index) => (
                                <AnnotationMetadataItem
                                    edit={metadataEditState}
                                    handleDelete={this.deleteAnnotationItem}
                                    handleEdit={this.setEditState}
                                    key={value._temp_id}
                                    metadata={value}
                                    metadataPos={index}
                                    updateContent={this.updateAnnotationItem}
                                />
                            ))}
                        </List>
                </CustomSection>

                {/* target section */}
                <CustomSection
                    primary={t('annotationCreationTarget')}
                    id={`${id}-targets`}
                    buttons={
                        <MiradorMenuButton
                            aria-label={t('createNewTarget')}
                            className={classes.button}
                            onClick={() => this.createAnnotationItem('target')}
                        >
                            <Add />
                        </MiradorMenuButton>
                    }
                >
                    <List disablePadding>
                            {target?.map((value, index) => (
                                <AnnotationTargetItem
                                    edit={targetEditState}
                                    handleDelete={this.deleteAnnotationItem}
                                    handleEdit={this.setEditState}
                                    key={value._temp_id}
                                    target={value}
                                    targetPos={index}
                                    updateContent={this.updateAnnotationItem}
                                    windowId={windowId}
                                />
                            ))}
                        </List>
                </CustomSection>

                {/* body section */}
                <CustomSection
                    primary={t('annotationCreationBody')}
                    id={`${id}-bodies`}
                >
                    <CustomSection
                        inner
                        id={`${id}-bodies-tags`}
                        primary={t('annotationCreationBodyTags')}
                        buttons={
                            <MiradorMenuButton
                                aria-label={t('createNewTag')}
                                className={classes.button}
                                onClick={() => this.createAnnotationItem('body', 'tagging')}
                            >
                                <Add />
                            </MiradorMenuButton>
                        }
                    >
                        <List component="div" disablePadding>
                            {body.filter(item => item.purpose=='tagging')?.map((value, index) => (
                                <AnnotationBodyItem
                                    body={value}
                                    bodyPos={index}
                                    edit={bodyEditState}
                                    handleDelete={this.deleteAnnotationItem}
                                    handleEdit={this.setEditState}
                                    key={value._temp_id}
                                    updateContent={this.updateAnnotationItem}
                                />
                            ))}
                        </List>
                    </CustomSection>
                    <CustomSection
                        inner
                        id={`${id}-bodies-texts`}
                        primary={t('annotationCreationBodyTexts')}
                        buttons={
                            <MiradorMenuButton
                                aria-label={t('createNewDescribing')}
                                className={classes.button}
                                onClick={() => this.createAnnotationItem('body', 'describing')}
                            >
                                <Add />
                            </MiradorMenuButton>
                        }
                    >
                        <List component="div" disablePadding>
                            {body.filter(item => item.purpose!=='tagging')?.map((value, index) => (
                                <AnnotationBodyItem
                                    body={value}
                                    bodyPos={index}
                                    edit={bodyEditState}
                                    handleEdit={this.setEditState}
                                    handleDelete={this.deleteAnnotationItem}
                                    key={value._temp_id}
                                    updateContent={this.updateAnnotationItem}
                                />
                            ))}
                        </List>
                    </CustomSection>
                </CustomSection>

                <div>
                    <Button onClick={closeCompanionWindow}>
                        {t('annotationPanelCancel')}
                    </Button>
                    <Button color="primary" onClick={this.submitAnnotation} variant="contained">
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
