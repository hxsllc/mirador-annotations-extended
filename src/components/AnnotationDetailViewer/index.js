import React, { Component } from 'react';
import PropTypes from 'prop-types';

import CompanionWindow from 'mirador/dist/es/src/containers/CompanionWindow';
import ns from 'mirador/dist/es/src/config/css-ns';

import CustomSection from '../../containers/CustomSection';
import CustomTag from '../../containers/CustomTag';

import { getNameByValue } from '../../utils/category-util';
import { getMonthString, linkify } from '../../utils';
import './annotationdetailviewer.css'

/** */
class AnnotationDetailViewer extends Component {
    /** */
    constructor(props) {
        super(props);

        const { annotation } = this.props;

        let annoId = null;
        let title = "";
        let tags = [];
        let content = "";
        let addResources = [];

        if (annotation) {
            annoId = annotation.id;

            let category = "";
            if (annotation.category) {
                let categoryCnt = annotation.category.length;
                let cnt = 0;
                for (let i = 0; i < categoryCnt; i++) {
                    if (annotation.category[i].checked) {
                        if (cnt > 0)
                            category += ", ";
                        category += getNameByValue(annotation.category[i].value);
                        cnt++;
                    }
                }
            }
            title = category;

            annotation?.body?.forEach((body) => {
                if (body.purpose == "tagging") {
                    tags.push(body.value);
                } else if (body.purpose == "describing") {
                    content = body.value;
                } else if (body.purpose == "linking") {
                    addResources.push(body.value);
                }
            })
        }

        this.state = {
            annoId,
            title,
            tags,
            content,
            addResources,
        };

        this.isAddResourceExist = this.isAddResourceExist.bind(this);
    }

    isAddResourceExist() {
        const { addResources } = this.state;

        let cnt = addResources != null ? addResources.length : 0;
        for (let i = 0; i < cnt; i++) {
            if (addResources[i] != '')
                return true;
        }

        return false;
    }

    /** */
    render() {
        const {
            annotation,
            id,
            t,
            windowId,
        } = this.props;

        const { title, tags, content, addResources } = this.state;

        return (
            <CompanionWindow
                title={t('annotationView')}
                windowId={windowId}
                id={id}
                paperClassName={ns('window-sidebar-annotation-panel')}
            >
                <div style={{ height: '100%' }}>
                    <div className='annotation-detail-body'>
                        {/* annotation information */}
                        <CustomSection
                            primary={title}
                            id={`${id}-title`}
                        >
                            <div dangerouslySetInnerHTML={{ __html: linkify(content) }} style={{ fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif' }}></div>

                            {
                                tags.map(tag => (
                                    tag != '' && <CustomTag label={tag} />
                                ))
                            }

                        </CustomSection>

                        {/* addtional resources */}
                        {
                            this.isAddResourceExist() &&
                            <CustomSection
                                primary={t("headerLabel_additional_resources")}
                                id={`${id}-title`}
                            >
                                <div className='annotation-detail-resource'>
                                    {
                                        addResources.map(addResource => <div><a href={addResource} style={{ fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif' }}>{addResource}</a></div>)
                                    }
                                </div>
                            </CustomSection>
                        }
                        <div className='annotation-detail-creator-copy'>
                        </div>
                    </div>

                    <div className='annotation-detail-creator'>
                        <p className='annotation-detail-creator-text'>Annotated by {annotation?.creator?.name} on {getMonthString(new Date(annotation?.creator?.created_on).getMonth() + 1)} {new Date(annotation?.creator?.created_on).getDate()}, {new Date(annotation?.creator?.created_on).getFullYear()}</p>
                    </div>
                </div>
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
