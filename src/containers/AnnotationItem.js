import { compose } from 'redux';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { withStyles } from '@material-ui/core/styles';
import { getCompanionWindowsForContent } from 'mirador/dist/es/src/state/selectors/companionWindows';

import * as actions from 'mirador/dist/es/src/state/actions';

import AnnotationItem from "../components/AnnotationItem/index";

const styles = (theme) => ({
});

const mapDispatchToProps = (dispatch, props) => ({
    addCompanionWindow: (content, additionalProps) => dispatch(
        actions.addCompanionWindow(props.windowId, { content, ...additionalProps }),
    ),
    removeCompanionWindow: (id) => dispatch(
        actions.removeCompanionWindow(props.windowId, id),
    ),
    switchToSingleCanvasView: () => dispatch(
        actions.setWindowViewType(props.windowId, 'single'),
    ),
    hoverAnnotation: (annotationIds) => dispatch(
        actions.hoverAnnotation(props.windowId, annotationIds)
    ),
    selectAnnotation: (annotationId) => dispatch(
        actions.selectAnnotation(props.windowId, annotationId)
    )

});

function mapStateToProps(state, props) {
    var annotationViewerCompanionWindows = getCompanionWindowsForContent(state, { content: 'annotationDetailViewer', windowId: props.windowId });
    var viewAnnotationDetail = true;
    if (Object.keys(annotationViewerCompanionWindows).length !== 0) {
        viewAnnotationDetail = false;
    }

    return {
        viewAnnotationDetail: viewAnnotationDetail
    }
};

const enhance = compose(
    withTranslation(),
    withStyles(styles),
    connect(mapStateToProps, mapDispatchToProps),
);

export default enhance(AnnotationItem);
