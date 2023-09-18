import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { v4 as uuid } from 'uuid';

import CompanionWindow from 'mirador/dist/es/src/containers/CompanionWindow';
import ns from 'mirador/dist/es/src/config/css-ns';

import CustomSection from '../../containers/CustomSection';
import CustomTag from '../../containers/CustomTag';

/** */
class AnnotationDetailViewer extends Component {
    /** */
    constructor(props) {
        super(props);
        const { t } = this.props;

        const annoState = {};
        let tempBody = {};
        let tempCreator = {};
        let tempMotivation = {};
        let tempTarget = {};

        /**
         * apply scheme to annotation for editing form
         * add/apply default values for missing fields
         * enhance fields with additional data for rendering
         */
        if (props.annotation) {
            if (props.annotation.id) {
                annoState.annoId = props.annotation.id;
            } else {
                annoState.annoId = uuid();
            }

            annoState.metadata = [];
            annoState.metadataCount = 0;

            /** add/transform basic fields for given metadata */
            tempCreator = {
                _temp_id: annoState.annoId + '-metadata-item-' + annoState.metadataCount,
                type: 'creator',
                value: props.annotation.creator && props.annotation.creator.name ? props.annotation.creator.name : null,
            };
            annoState.metadata.push(tempCreator);
            annoState.metadataCount++;

            tempMotivation = {
                _temp_id: annoState.annoId + '-metadata-item-' + annoState.metadataCount,
                type: 'motivation',
                value: props.annotation.motivation ? props.annotation.motivation : null,
            };
            annoState.metadata.push(tempMotivation);
            annoState.metadataCount++;

            /** transform body elements into given scheme */
            annoState.body = [];
            annoState.bodyCount = 0;
            if (props.annotation.body) {
                if (Array.isArray(props.annotation.body)) {
                    props.annotation.body.forEach((body) => {
                        tempBody = {
                            _temp_id: annoState.annoId + '-body-item-' + annoState.bodyCount,
                            _temp_name: t('body'),
                            purpose: body.purpose ? body.purpose : null,
                            type: body.type ? body.type : null,
                            value: body.value,
                        };
                        annoState.body.push(tempBody);
                        annoState.bodyCount++;
                    });
                } else {
                    tempBody = {
                        _temp_id: annoState.annoId + '-body-item-' + annoState.bodyCount,
                        _temp_name: t('body'),
                        purpose: props.annotation.body.purpose ? props.annotation.body.purpose : null,
                        type: props.annotation.body.type ? props.annotation.body.type : null,
                        value: props.annotation.body.value,
                    };
                    annoState.body.push(tempBody);
                    annoState.bodyCount++;
                }
            }

            /** transform target elements into given scheme */
            annoState.target = [];
            annoState.targetCount = 0;
            if (props.annotation.target.selector) {
                if (Array.isArray(props.annotation.target.selector)) {
                    props.annotation.target.selector.forEach((selector) => {
                        if (selector.type == 'SvgSelector') {
                            const svgObject = new DOMParser().parseFromString(selector.value, 'image/svg+xml');
                            const pathObjects = svgObject.querySelectorAll('path');
                            pathObjects.forEach(path => {
                                tempTarget = {
                                    _temp_id: annoState.annoId + '-target-item-' + annoState.targetCount,
                                    _temp_name: t('target'),
                                    type: selector.type ? selector.type : null,
                                    value: path.outerHTML,
                                };
                                annoState.target.push(tempTarget);
                                annoState.targetCount++;
                            });
                        } else {
                            tempTarget = {
                                _temp_id: annoState.annoId + '-target-item-' + annoState.targetCount,
                                _temp_name: t('target'),
                                type: selector.type ? selector.type : null,
                                value: selector.value,
                            };
                            annoState.target.push(tempTarget);
                            annoState.targetCount++;
                        }
                    });
                } else {
                    tempTarget = {
                        _temp_id: annoState.annoId + '-target-item-' + annoState.targetCount,
                        _temp_name: t('target'),
                        type: props.annotation.target.selector.type ? props.annotation.target.selector.type : null,
                        value: props.annotation.target.selector.value,
                    };
                    annoState.target.push(tempTarget);
                    annoState.targetCount++;
                }
            }
        } else {
            /** create new annotation object with basic metadata */
            annoState.annoId = uuid();
            annoState.metadata = [];
            annoState.metadataCount = 0;
            tempCreator = {
                _temp_id: annoState.annoId + '-metadata-item-' + annoState.metadataCount,
                type: 'creator',
                value: null,
            };
            annoState.metadata.push(tempCreator);
            annoState.metadataCount++;

            tempMotivation = {
                _temp_id: annoState.annoId + '-metadata-item-' + annoState.metadataCount,
                type: 'motivation',
                value: 'commenting',
            };
            annoState.metadata.push(tempMotivation);
            annoState.metadataCount++;

        }

        this.state = {
            annoId: null,
            annotationSubmitDialogOpen: false,
            blockTargetHover: false, // blocks hover effects on svg drawing target items
            body: [], // body data
            bodyCount: 0, // global body count
            bodyEditState: null, // indicates current edited body item
            metadata: [], // metadata data
            metadataCount: 0, // global metadata count
            metadataEditState: null, // indicates current edited metadata item
            target: [], // target data
            targetCount: 0, // global target count
            targetEditState: null, // indicates current edited target item
            ...annoState,
        };

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
        } = this.state;

        return (
            <CompanionWindow
                title={t('annotationView')}
                windowId={windowId}
                id={id}
                paperClassName={ns('window-sidebar-annotation-panel')}
            >

                {/* annotation information */}
                <CustomSection
                    primary={"Story Arc"}
                    id={`${id}-title`}
                >
                    <p>Xolotl and Nopaltzin converse regarding what they have seen in their travels in and around the Basin of Mexico.</p>
                    <br />
                    <p>GEOREFERENCE</p>
                    <p>https://earth.google.com/web/@48.8583701.2.2944813.146.72686635a.666.6160.8691d.35y.0h.45t.0r</p>
                    <CustomTag
                        label={"Hello"}
                    />
                </CustomSection>

                {/* addtional resources */}
                <CustomSection
                    primary={t("headerLabel_additional_resources")}
                    id={`${id}-title`}
                >
                    <p>https://www.vangoghmuseum.nl/en/art-and-stories/...</p>
                </CustomSection>

            </CompanionWindow>
        );
    }
}

AnnotationDetailViewer.propTypes = {
    annotation: PropTypes.object, // eslint-disable-line react/forbid-prop-types
    canvases: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string,
        index: PropTypes.number,
    })),
    classes: PropTypes.objectOf(PropTypes.string),
    closeCompanionWindow: PropTypes.func,
    config: PropTypes.shape({
        annotation: PropTypes.shape({
            adapter: PropTypes.func,
            defaults: PropTypes.objectOf(
                PropTypes.oneOfType([PropTypes.bool, PropTypes.func, PropTypes.number, PropTypes.string]),
            ),
        }),
    }).isRequired,
    id: PropTypes.string.isRequired,
    receiveAnnotation: PropTypes.func.isRequired,
    t: PropTypes.func.isRequired,
    windowId: PropTypes.string.isRequired,
};

AnnotationDetailViewer.defaultProps = {
    annotation: null,
    canvases: [],
    classes: {},
    closeCompanionWindow: () => { },
};

export default AnnotationDetailViewer;
