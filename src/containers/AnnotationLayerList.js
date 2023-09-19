import { compose } from 'redux';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { withStyles } from '@material-ui/core/styles';

import * as actions from 'mirador/dist/es/src/state/actions';

import AnnotationLayerList from "../components/AnnotationLayerList";

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
    fetchManifest: (manifestId, properties) => dispatch(
        actions.fetchManifest(manifestId, properties)
    ),
    requestManifest: (manifestId, properties) => dispatch(
        actions.requestManifest(manifestId, properties),
    ),
    updateLayers: (canvasId, payload) => dispatch(
        actions.updateLayers(props.windowId, canvasId, payload)
    )
});

/** */
function mapStateToProps(state, { windowId }) {

    return {
        windowId,
    };
}

const enhance = compose(
    withTranslation(),
    withStyles(styles),
    connect(mapStateToProps, mapDispatchToProps),
);

export default enhance(AnnotationLayerList);
