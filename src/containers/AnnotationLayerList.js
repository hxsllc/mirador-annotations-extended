import { compose } from 'redux';
import { withTranslation } from 'react-i18next';
import { withStyles } from '@material-ui/core/styles';
import AnnotationLayerList from "../components/AnnotationLayerList";

const styles = (theme) => ({
    editAnnotation: {
        backgroundColor: theme.palette.shades.light,
    },
    editAnnotationListItem: {
        display: "inherit !important",
        '&:last-child': {
            borderBottom: 'none',
        },
        paddingLeft: theme.spacing(0),
        paddingRight: theme.spacing(0),
    },
});

const enhance = compose(
    withTranslation(),
    withStyles(styles),
);

export default enhance(AnnotationLayerList);
