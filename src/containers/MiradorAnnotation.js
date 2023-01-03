import { compose } from 'redux';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import * as actions from 'mirador/dist/es/src/state/actions';
import { getWindowViewType } from 'mirador/dist/es/src/state/selectors';
import { getVisibleCanvases } from 'mirador/dist/es/src/state/selectors/canvases';
import MiradorAnnotation from '../components/MiradorAnnotation';

const mapDispatchToProps = (dispatch, props) => ({
    addCompanionWindow: (content, additionalProps) => dispatch(
        actions.addCompanionWindow(props.targetProps.windowId, { content, ...additionalProps }),
    ),
    switchToSingleCanvasView: () => dispatch(
        actions.setWindowViewType(props.targetProps.windowId, 'single'),
    ),
});
  
const mapStateToProps = (state, { targetProps: { windowId } }) => ({
    canvases: getVisibleCanvases(state, { windowId }),
    config: state.config,
    windowViewType: getWindowViewType(state, { windowId }),
});

const enhance = compose(
    withTranslation(),
    connect(mapStateToProps, mapDispatchToProps),
);
  
export default enhance(MiradorAnnotation);