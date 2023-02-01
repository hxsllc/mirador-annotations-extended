import React, { Component } from 'react';
import PropTypes, { bool } from 'prop-types';
import { ListItem, ListItemText } from '@material-ui/core';
import { Check, Cancel } from '@material-ui/icons';
import DeleteIcon from '@material-ui/icons/DeleteForever';
import EditIcon from '@material-ui/icons/Edit';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import { Collapse } from '@material-ui/core';
import { TextField } from '@material-ui/core';


class AnnotationTargetItem extends Component {
    constructor(props) {
        super(props);

        const targetState = {
            value: null,
            type: null
        }

        this.state = {
            edit: false,
            ...targetState,
        }

        this.edit = this.edit.bind(this);
        this.confirm = this.confirm.bind(this);
        this.cancel = this.cancel.bind(this);
        this.delete = this.delete.bind(this);
        this.handleTextFieldInput = this.handleTextFieldInput.bind(this);
    }

    componentDidMount() {
        const { target } = this.props;
        const { value, type } = this.state;
        if(target.value) {
            this.setState({ value: target.value })
        }
        if(target.type) {
            this.setState({ type: target.type })
        }
    }

    edit() {
        const { edit } = this.state;
        if(!edit) {
            this.setState({
                edit: true
            });
        }
    }

    confirm() {
        const { edit , value, type } = this.state;
        const { targetPos, handleSubmit, target } = this.props;
        if(edit) {
            handleSubmit('target', { value: value, type: type, _temp_id: target._temp_id }, targetPos);
            this.setState({
                edit: false
            });
        }
    }

    handleTextFieldInput(e) {
        const { value } = this.state;
        this.setState({ value: e.target.value });
    }

    cancel() {
        const { edit, value, type } = this.state;
        const { target } = this.props;
        if(edit) {
            if(target.value) {
                this.setState({ value: target.value })
            }
            if(target.type) {
                this.setState({ type: target.type })
            }
        }
    }

    delete() {
        const { edit } = this.state;
        const { targetPos, handleDelete } = this.props;
        if(!edit) {
            handleDelete('target', targetPos);
            // you can only delete when you are not editing
        }
    }

    render() {
        const { target, classes, t, targetPos } = this.props;
        const { edit, value, type } = this.state;

        return (
            <ListItem divider className={classes.editAnnotationListItem}>
                <div>
                    <Grid container spacing={1}>
                        <Grid item xs={8}>
                            <ListItemText style={{ lineHeight: '1rem'}} primary={type} secondary={value} />
                        </Grid>
                        <Grid item xs={4}>
                            <IconButton size="small" onClick={() => edit ? this.confirm() : this.edit()}>
                                {
                                    edit
                                    ? <Check />
                                    : <EditIcon />
                                }
                            </IconButton>
                            <IconButton size="small" onClick={() => edit ? this.cancel() : this.delete()}>
                                {
                                    edit
                                    ? <Cancel />
                                    : <DeleteIcon />
                                }
                            </IconButton>
                        </Grid>
                    </Grid>
                </div>
                <div className={classes.editAnnotation}>
                    <Collapse className={classes.editAnnotationCollapse} in={edit} unmountOnExit>
                        <Grid container spacing={1}>
                            <Grid item xs={12}>
                                <TextField id={`${target}-target`} label={t('annotationMetadataTarget')} value={value} onChange={this.handleTextFieldInput} variant="standard" />
                            </Grid>
                        </Grid>
                    </Collapse>
                </div>
            </ListItem>
        )
    }
}

AnnotationTargetItem.propTypes = {
    classes: PropTypes.objectOf(PropTypes.string),
    target: PropTypes.arrayOf(
        PropTypes.shape({ value: PropTypes.string, type: PropTypes.string, purpose: PropTypes.string }),
    ),
    t: PropTypes.func.isRequired,
}

AnnotationTargetItem.defaultProps = {
    classes: {},
    target: {},
    t: key => key,
}

export default AnnotationTargetItem;
