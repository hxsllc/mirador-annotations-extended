import { compose } from 'redux';
import { withTranslation } from 'react-i18next';
import { withStyles } from '@material-ui/core/styles';
import AnnotationTextFieldItem from '../components/AnnotationTextFieldItem';

const styles = (theme) => ({
    editorRoot: {
    },
});

const enhance = compose(
    withTranslation(),
    withStyles(styles),
);

export default enhance(AnnotationTextFieldItem);
