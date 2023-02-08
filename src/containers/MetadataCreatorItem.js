import { compose } from 'redux';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { withStyles } from '@material-ui/core/styles';
import MetadataCreatorItem from '../components/MetadataCreatorItem';

const styles = (theme) => ({

});

const enhance = compose(
    withTranslation(),
    withStyles(styles),
);

export default enhance(MetadataCreatorItem);
