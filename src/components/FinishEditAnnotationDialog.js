import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';

class FinishEditAnnotationDialog  extends Component {
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
                aria-labelledby="finish-edit-annotation-dialog-title"
                fullWidth
                maxWidth="sm"
                onClose={handleClose}
                onEscapeKeyDown={handleClose}
                open={open}
            >
                <DialogTitle id="finish-edit-annotation-dialog-title" disableTypography>
                    <Typography variant="h2">
                        {t('dialogFinishEditAnnotationTitle')}
                    </Typography>
                </DialogTitle>
                <DialogContent>
                    <DialogContentText variant="body1" color="inherit">
                        {t('dialogFinishEditAnnotationContent')}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>
                        {t('dialogFinishEditAnnotationButton')}
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}


export default FinishEditAnnotationDialog;
