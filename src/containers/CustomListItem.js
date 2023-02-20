import { compose } from 'redux';
import { withTranslation } from 'react-i18next';
import { withStyles } from '@material-ui/core/styles';
import CustomListItem from '../components/CustomListItem';

const styles = (theme) => ({
    container: {
        display:"inherit !important",
        '&:last-child': {
            borderBottom: 'none',
        },
        paddingLeft: theme.spacing(0),
        paddingRight: theme.spacing(0),
    },
    main: {
        display: 'flex',
        justifyContent: 'space-between',
        width: '100%'
    },
    content: {},
    buttons: {},
});

const enhance = compose(
    withTranslation(),
    withStyles(styles),
);

export default enhance(CustomListItem);
