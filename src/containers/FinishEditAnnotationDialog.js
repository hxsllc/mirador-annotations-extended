import { compose } from 'redux';
import { withTranslation } from 'react-i18next';
import { withStyles } from '@material-ui/core/styles';
import FinishEditAnnotationDialog from '../components/FinishEditAnnotationDialog';


const styles = (theme) => ({

});

const enhance = compose(
    withTranslation(),
    withStyles(styles),
);

export default enhance(FinishEditAnnotationDialog);
