import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AnnotationItem from '../containers/AnnotationItem';

class AnnotationItemList extends Component {
    /** */
    constructor(props) {
        super(props);

        this.changeDetailWindow = this.changeDetailWindow.bind(this);

        this.state = {
            detailedAnnotId: "",
            detailedWindowId: ""
        };
    }

    changeDetailWindow(annotId) {
        const { detailedAnnotId, detailedWindowId } = this.state;
        const { addCompanionWindow, removeCompanionWindow, selectAnnotation, addOrUpdateCompanionWindow, updateCompanionWindow, toggleAnnotationDisplay } = this.props;

        if (detailedAnnotId != annotId) {
            removeCompanionWindow(detailedWindowId);
            const { id } = addCompanionWindow('annotationDetailViewer', {
                annotationid: annotId,
                position: 'right'
            })

            this.setState({
                detailedAnnotId: annotId,
                detailedWindowId: id
            });

            selectAnnotation(annotId);
        }
    }

    /** */
    render() {
        const { windowId, annots } = this.props;

        return <>
            {
                annots?.map((item, idx) =>
                    <AnnotationItem windowId={windowId} item={item} key={idx} changeDetailWindow={(annotId) => this.changeDetailWindow(annotId)} />
                )
            }
        </>;
    }
}

AnnotationItemList.propTypes = {
    windowId: PropTypes.string.isRequired
}

export default AnnotationItemList;