import { compose } from 'redux';
import { withTranslation } from 'react-i18next';
import AnnotationTargetDisplay from '../components/AnnotationTargetDisplay';

const enhance = compose(
    withTranslation(),
);

export default enhance(AnnotationTargetDisplay);
