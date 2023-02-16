import { compose } from 'redux';
import { withTranslation } from 'react-i18next';
import { withStyles } from '@material-ui/core/styles';
import CanvasAnnotationHeader from '../components/CanvasAnnotationHeader';

const styles = (theme) => ({
    container: {
        display: 'flex',
        justifyContent: 'space-between',
        backgroundColor: theme.palette.shades.light,
    },
    heading: {},
    buttons: {},
});

const enhance = compose(
    withTranslation(),
    withStyles(styles),
);

export default enhance(CanvasAnnotationHeader);
