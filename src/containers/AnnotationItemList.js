import { compose } from 'redux';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { withStyles } from '@material-ui/core/styles';
import AnnotationItemList from "../components/AnnotationItemList";

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

/** */
function mapStateToProps(state, { windowId }) {
    return {
        ...state,
        windowId,
    };
}

const enhance = compose(
    withTranslation(),
    withStyles(styles),
    connect(mapStateToProps),
);

export default enhance(AnnotationItemList);
