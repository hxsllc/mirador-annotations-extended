import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CanvasListItem from './CanvasListItem';
import AnnotationActionsContext from '../AnnotationActionsContext';
import SingleCanvasDialog from '../containers/SingleCanvasDialog';

/** */
class CanvasAnnotationsWrapper extends Component {
    /** */
    constructor(props) {
        super(props);
        this.state = {
            singleCanvasDialogOpen: false,
        };
        this.toggleSingleCanvasDialogOpen = this.toggleSingleCanvasDialogOpen.bind(this);
        this.doNothing = this.doNothing.bind(this);
    }

    doNothing() {
        return null;
    }

    /** */
    toggleSingleCanvasDialogOpen() {
        const { singleCanvasDialogOpen } = this.state;
        this.setState({
            singleCanvasDialogOpen: !singleCanvasDialogOpen,
        });
    }

    /** */
    render() {
        const {
            addCompanionWindow, annotationsOnCanvases, canvases, config, receiveAnnotation,
            switchToSingleCanvasView, TargetComponent, targetProps, windowViewType, createAnnotation
        } = this.props;
        const { singleCanvasDialogOpen } = this.state;
        const props = {
            ...targetProps,
            /*...(!createAnnotation
                ? {
                    containerRef: null,
                    deselectAnnotation: this.doNothing,
                    hoverAnnotation: this.doNothing,
                    hoveredAnnotationIds: '',
                    selectAnnotation: this.doNothing,
                    selectedAnnotationId: '',
                }
                : {}),*/
            listContainerComponent: CanvasListItem,
        };
        return (
            <AnnotationActionsContext.Provider
                value={{
                    addCompanionWindow,
                    annotationsOnCanvases,
                    canvases,
                    config,
                    receiveAnnotation,
                    storageAdapter: config.annotation.adapter,
                    toggleSingleCanvasDialogOpen: this.toggleSingleCanvasDialogOpen,
                    windowId: targetProps.windowId,
                    createAnnotation,
                    windowViewType,
                }}
            >
                <TargetComponent
                    {...props} // eslint-disable-line react/jsx-props-no-spreading
                />
                {windowViewType !== 'single' && (
                    <SingleCanvasDialog
                        handleClose={this.toggleSingleCanvasDialogOpen}
                        open={singleCanvasDialogOpen}
                        switchToSingleCanvasView={switchToSingleCanvasView}
                    />
                )}
            </AnnotationActionsContext.Provider>
        );
    }
}

CanvasAnnotationsWrapper.propTypes = {
    addCompanionWindow: PropTypes.func.isRequired,
    annotationsOnCanvases: PropTypes.object, // eslint-disable-line react/forbid-prop-types
    canvases: PropTypes.arrayOf(
        PropTypes.shape({ id: PropTypes.string, index: PropTypes.number }),
    ),
    config: PropTypes.shape({
        annotation: PropTypes.shape({
            adapter: PropTypes.func,
        }),
    }).isRequired,
    receiveAnnotation: PropTypes.func.isRequired,
    switchToSingleCanvasView: PropTypes.func.isRequired,
    TargetComponent: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.node,
    ]).isRequired,
    targetProps: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
    windowViewType: PropTypes.string.isRequired,
};

CanvasAnnotationsWrapper.defaultProps = {
    annotationsOnCanvases: {},
    canvases: [],
};

export default CanvasAnnotationsWrapper;
