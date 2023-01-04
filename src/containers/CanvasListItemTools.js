import { compose } from 'redux';
import { withTranslation } from 'react-i18next';
import CanvasListItemTools from '../components/CanvasListItemTools';

const enhance = compose(
    withTranslation(),
);

export default enhance(CanvasListItemTools);
