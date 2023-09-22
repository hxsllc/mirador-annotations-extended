import { compose } from 'redux';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { withStyles } from '@material-ui/core/styles';
import AnnotationItemList from "../components/AnnotationItemList";

import * as actions from 'mirador/dist/es/src/state/actions';

const styles = (theme) => ({
    editAnnotation: {
        backgroundColor: theme.palette.shades.light,
    },
    editAnnotationListItem: {
        display: "inherit !important",
        '&:last-child': {
            borderBottom: 'none',
        },
        paddingLeft: theme.spacing(0),
        paddingRight: theme.spacing(0),
    },
});

const mapDispatchToProps = (dispatch, props) => ({
    addCompanionWindow: (content, additionalProps) => dispatch(
        actions.addCompanionWindow(props.windowId, { content, ...additionalProps }),
    ),
    removeCompanionWindow: (id) => dispatch(
        actions.removeCompanionWindow(props.windowId, id),
    ),
    addOrUpdateCompanionWindow: (windowId, payload) => dispatch(
        actions.addOrUpdateCompanionWindow(windowId, payload),
    ),
    updateCompanionWindow: (windowId, id, payload) => dispatch(
        actions.updateCompanionWindow(windowId, id, payload)
    ),
    selectAnnotation: (annotationId) => dispatch(
        actions.selectAnnotation(props.windowId, annotationId),
    ),
    toggleAnnotationDisplay: () => dispatch(
        actions.toggleAnnotationDisplay(props.windowId)
    )
});

/** */
function mapStateToProps(state, { windowId }) {
    return {
        ...state,
        windowId,
    };
}

const enhance = compose(
    withTranslation(),
    withStyles(styles),
    connect(mapStateToProps, mapDispatchToProps),
);

export default enhance(AnnotationItemList);
