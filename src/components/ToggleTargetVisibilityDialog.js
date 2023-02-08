import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';

class ToggleTargetVisibilityDialog  extends Component {
    constructor(props) {
        super(props);
    }

    /** */
    render() {
        const {
            handleClose,
            open,
            t,
        } = this.props;
        return (
            <Dialog
                aria-labelledby="toggle-target-visibility-dialog-title"
                fullWidth
                maxWidth="sm"
                onClose={handleClose}
                onEscapeKeyDown={handleClose}
                open={open}
            >
                <DialogTitle id="toggle-target-visibility-dialog-title" disableTypography>
                    <Typography variant="h2">
                        {t('dialogToggleTargetVisibilityTitle')}
                    </Typography>
                </DialogTitle>
                <DialogContent>
                    <DialogContentText variant="body1" color="inherit">
                        {t('dialogToggleTargetVisibilityContent')}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>
                        {t('dialogToggleTargetVisibilityButton')}
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}


export default ToggleTargetVisibilityDialog;
