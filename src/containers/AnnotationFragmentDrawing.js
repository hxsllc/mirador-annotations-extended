import { compose } from 'redux';
import { withTranslation } from 'react-i18next';
import AnnotationFragmentDrawing from '../components/AnnotationFragmentDrawing';

const enhance = compose(
    withTranslation(),
);

export default enhance(AnnotationFragmentDrawing);
