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
    switchToSingleCanvasView: () => dispatch(
        actions.setWindowViewType(props.windowId, 'single'),
    ),
    hoverAnnotation: (annotationIds) => dispatch(
        actions.hoverAnnotation(props.windowId, annotationIds)
    ),
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
