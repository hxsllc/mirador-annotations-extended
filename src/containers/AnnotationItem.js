import { compose } from 'redux';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { withStyles } from '@material-ui/core/styles';

import * as actions from 'mirador/dist/es/src/state/actions';

import AnnotationItem from "../components/AnnotationItem/index";

const styles = (theme) => ({
});

const mapDispatchToProps = (dispatch, props) => ({
    addCompanionWindow: (content, additionalProps) => {
        dispatch(
            actions.addCompanionWindow(props.windowId, { content, ...additionalProps }),
        )
    },
    switchToSingleCanvasView: () => dispatch(
        actions.setWindowViewType(props.targetProps.windowId, 'single'),
    ),
});

function mapStateToProps() {
    return {
    }
};

const enhance = compose(
    withTranslation(),
    withStyles(styles),
    connect(mapStateToProps, mapDispatchToProps),
);

export default enhance(AnnotationItem);
