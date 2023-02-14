import { compose } from 'redux';
import { withTranslation } from 'react-i18next';
import { withStyles } from '@material-ui/core/styles';
import CanvasAnnotationHeader from '../components/CanvasAnnotationHeader';

const styles = (theme) => ({

});

const enhance = compose(
    withTranslation(),
    withStyles(styles),
);

export default enhance(CanvasAnnotationHeader);
