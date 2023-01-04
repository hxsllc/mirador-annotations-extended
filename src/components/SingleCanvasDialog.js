import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';

/**
 * Dialog to enforce single view for annotation creation / editing
 */
class SingleCanvasDialog extends Component {
  /** */
  constructor(props) {
    super(props);
    this.confirm = this.confirm.bind(this);
  }

  /** */
  confirm() {
    const {
      handleClose,
      switchToSingleCanvasView,
    } = this.props;
    switchToSingleCanvasView();
    handleClose();
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
        aria-labelledby="single-canvas-dialog-title"
        fullWidth
        maxWidth="sm"
        onClose={handleClose}
        onEscapeKeyDown={handleClose}
        open={open}
      >
        <DialogTitle id="single-canvas-dialog-title" disableTypography>
          <Typography variant="h2">
            {t('dialogSingleCanvasTitle')}
          </Typography>
        </DialogTitle>
        <DialogContent>
          <DialogContentText variant="body1" color="inherit">
            {t('dialogSingleCanvasContent')}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>
            {t('dialogSingleCanvasButtonCancel')}
          </Button>
          <Button color="primary" onClick={this.confirm} variant="contained">
            {t('dialogSingleCanvasButtonSubmit')}
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

SingleCanvasDialog.propTypes = {
  handleClose: PropTypes.func.isRequired,
  open: PropTypes.bool,
  switchToSingleCanvasView: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
};

SingleCanvasDialog.defaultProps = {
  open: false,
  t: key => key,
};

export default SingleCanvasDialog;
