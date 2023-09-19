import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CompanionWindow from 'mirador/dist/es/src/containers/CompanionWindow';
import ns from 'mirador/dist/es/src/config/css-ns';
import CustomSection from '../containers/CustomSection';
import AnnotationCategoryList from '../containers/AnnotationCategoryList';
import AnnotationLayerList from '../containers/AnnotationLayerList';
import AnnotationItemList from '../containers/AnnotationItemList';

/** */
class AnnotationViewer extends Component {
    /** */
    constructor(props) {
        super(props);
        const { t } = this.props;

        this.state = {
            layers: [],
            categories: [
                {
                    label: "Whole Pages",
                    value: "whole-pages",
                    checked: true
                },
                {
                    label: "Regions",
                    value: "regions",
                    checked: true
                },
                {
                    label: "Story Arcs",
                    value: "story-arcs",
                    checked: true
                },
                {
                    label: "Glyphs",
                    value: "glyphs",
                    checked: true
                },
                {
                    label: "Glosses",
                    value: "glosses",
                    checked: true
                },
                {
                    label: "FORS/XRF",
                    value: "fors/xrf",
                    checked: true
                },
                {
                    label: "Other",
                    value: "other",
                    checked: true
                }
            ],
            annotations: [],
        };

        this.updateAnnotationItem = this.updateAnnotationItem.bind(this);
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
            for (let i = 0; i < categoryCnt; i++) {
                if (categories[i].value == content.value) {
                    categories[i].checked = content.checked;
                    break;
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
                <CustomSection
                    primary={t('headerLabel_layers')}
                    id={`${id}-layers`}
                >
                    <AnnotationLayerList
                        updateContent={this.updateAnnotationItem}
                        windowId={windowId}
                        config={config}
                        canvases={canvases}
                    />
                </CustomSection>

                {/* category section */}
                <CustomSection
                    primary={t('headerLabel_category')}
                    id={`${id}-category`}
                >
                    <AnnotationCategoryList
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
