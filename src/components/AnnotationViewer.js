import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CompanionWindow from 'mirador/dist/es/src/containers/CompanionWindow';
import ns from 'mirador/dist/es/src/config/css-ns';
import CustomSection from '../containers/CustomSection';
import AnnotationViewCategoryList from '../containers/AnnotationViewCategoryList';
import AnnotationLayerList from '../containers/AnnotationLayerList';
import AnnotationItemList from '../containers/AnnotationItemList';

import { VIEWER_CATEGORIES, CATEGORY_ALL } from '../configs/category';

/** */
class AnnotationViewer extends Component {
    /** */
    constructor(props) {
        super(props);
        const { t, config, canvases, receiveAnnotation } = this.props;

        this.state = {
            layers: [],
            categories: VIEWER_CATEGORIES,
            annotations: [],
        };

        this.updateAnnotationItem = this.updateAnnotationItem.bind(this);

        setTimeout(() => {
            canvases.forEach((canvas) => {
                if (config != null && config.annotation != null) {
                    const storageAdapter = config.annotation.adapter(canvas.id);

                    storageAdapter.getByCategory(VIEWER_CATEGORIES).then(annoPage => {
                        if (annoPage) {
                            receiveAnnotation(canvas.id, storageAdapter.annotationPageId, annoPage);
                            this.setState({ annotations: annoPage?.items });
                        }
                    });
                } else {
                    console.error("config.annotation is null");
                }
            });
        }, 50);
    }

    /**
    * generic update function
    * use item type and id for item update
    */
    updateAnnotationItem(type, content, _temp_id) {
        const { config, canvases, receiveAnnotation } = this.props;
        const { categories } = this.state;

        if (type == "category") {
            let categoryCnt = categories.length;

            if (content.value == CATEGORY_ALL) {
                for (let i = 0; i < categoryCnt; i++) {
                    categories[i].checked = content.checked;
                }
            } else {
                for (let i = 0; i < categoryCnt; i++) {
                    if (categories[i].value == content.value) {
                        categories[i].checked = content.checked;
                        break;
                    }
                }

                // Set All Category Option
                let generalCateCnt = 0;
                for (let i = 0; i < categoryCnt; i++) {
                    if (categories[i].value !== CATEGORY_ALL && categories[i].checked) {
                        generalCateCnt++;
                    }
                }

                for (let i = 0; i < categoryCnt; i++) {
                    if (categories[i].value == CATEGORY_ALL) {
                        categories[i].checked = generalCateCnt == (categoryCnt - 1);
                        break;
                    }
                }
            }

            this.setState({ categories: categories });
        }

        canvases.forEach((canvas) => {
            if (config != null && config.annotation != null) {
                const storageAdapter = config.annotation.adapter(canvas.id);

                storageAdapter.getByCategory(categories).then(annoPage => {
                    if (annoPage) {
                        receiveAnnotation(canvas.id, storageAdapter.annotationPageId, annoPage);
                        this.setState({ annotations: annoPage?.items });
                    }
                });
            } else {
                console.error("config.annotation is null");
            }
        });
    }

    /** */
    render() {
        const {
            id,
            t,
            windowId,
            config,
            canvases
        } = this.props;

        const {
            annotations,
            categories
        } = this.state;

        return (
            <CompanionWindow
                title={t('annotationBrowse')}
                windowId={windowId}
                id={id}
                paperClassName={ns('window-sidebar-annotation-panel')}
            >

                {/* layers section */}
                {/* <CustomSection
                    primary={t('headerLabel_layers')}
                    id={`${id}-layers`}
                >
                    <AnnotationLayerList
                        updateContent={this.updateAnnotationItem}
                        windowId={windowId}
                        config={config}
                        canvases={canvases}
                    />
                </CustomSection> */}

                {/* category section */}
                <CustomSection
                    primary={t('headerLabel_category')}
                    id={`${id}-category`}
                >
                    <AnnotationViewCategoryList
                        updateContent={this.updateAnnotationItem}
                        categories={categories}
                    />
                </CustomSection>

                {/* annotations section */}
                <CustomSection
                    primary={t('headerLabel_annotations')}
                    id={`${id}-category`}
                >
                    <AnnotationItemList
                        updateContent={this.updateAnnotationItem}
                        windowId={windowId}
                        annots={annotations}
                    />
                </CustomSection>
            </CompanionWindow>
        );
    }
}

AnnotationViewer.propTypes = {
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

AnnotationViewer.defaultProps = {
    annotation: null,
    canvases: [],
    classes: {},
    closeCompanionWindow: () => { },
};

export default AnnotationViewer;
