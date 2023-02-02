import { compose } from 'redux';
import { withTranslation } from 'react-i18next';
import { withStyles } from '@material-ui/core/styles';
import TargetFragmentSelector from "../components/TargetFragmentSelector";


const styles = (theme) => ({
    selector: {

    },
});

const enhance = compose(
    withTranslation(),
    withStyles(styles),
);

export default enhance(TargetFragmentSelector);
