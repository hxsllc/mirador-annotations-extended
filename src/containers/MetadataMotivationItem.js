import { compose } from 'redux';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { withStyles } from '@material-ui/core/styles';
import MetadataMotivationItem from '../components/MetadataMotivationItem';

const styles = (theme) => ({
});

const enhance = compose(
    withTranslation(),
    withStyles(styles),
);

export default enhance(MetadataMotivationItem);
