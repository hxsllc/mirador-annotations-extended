import { compose } from 'redux';
import { withTranslation } from 'react-i18next';
import CanvasListItem from '../components/CanvasListItem';

const enhance = compose(
    withTranslation(),
);

export default enhance(CanvasListItem);
