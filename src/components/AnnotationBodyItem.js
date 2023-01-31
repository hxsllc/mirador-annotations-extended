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


class AnnotationBodyItem extends Component {
    constructor(props) {
        super(props);

        const bodyState = {
            value: null,
            type: null,
            purpose: null
        }

        this.state = {
            edit: false,
            ...bodyState,
        }

        this.edit = this.edit.bind(this);
        this.confirm = this.confirm.bind(this);
        this.cancel = this.cancel.bind(this);
        this.delete = this.delete.bind(this);
        this.handleTextFieldInput = this.handleTextFieldInput.bind(this);
    }

    componentDidMount() {
        const { body } = this.props;
        const { value, type, purpose } = this.state;
        if(body.value) {
            this.setState({ value: body.value })
        }
        if(body.type) {
            this.setState({ type: body.type })
        }
        if(body.purpose) {
            this.setState({ purpose: body.purpose })
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
        const { edit, value, type, purpose } = this.state;
        const { bodyPos, handleSubmit } = this.props;
        if(edit) {
            handleSubmit('metadata', { value, type, purpose }, bodyPos);
            /*this.setState({
                edit: false
            });*/
        }
    }

    handleTextFieldInput(e) {
        const { value } = this.state;
        this.setState({ value: e.target.value });
    }

    cancel() {
        const { edit, value, type, purpose } = this.state;
        const { body } = this.props;
        if(edit) {
            if(body.value) {
                this.setState({ value: body.value })
            }
            if(body.type) {
                this.setState({ type: body.type })
            }
            if(body.purpose) {
                this.setState({ purpose: body.purpose })
            }
        }
    }

    delete() {
        const { edit } = this.state;
        const { bodyPos, handleDelete } = this.props;
        if(!edit) {
            handleDelete('body', bodyPos);
            // you can only delete when you are not editing
        }
    }

    render() {
        const { body, classes, t, bodyPos } = this.props;
        const { edit, value, purpose, type } = this.state;

        return (
            <ListItem divider className={classes.editAnnotationListItem} key={body}>
                <div>
                    <Grid container spacing={1}>
                        <Grid item xs={8}>
                            <ListItemText style={{ lineHeight: '1rem'}} primary={type} secondary={purpose} />
                            {bodyPos}
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
                                <TextField id={`${body}-body`} label={t('annotationMetadataBody')} value={value} onChange={this.handleTextFieldInput} variant="standard" />
                            </Grid>
                        </Grid>
                    </Collapse>
                </div>
            </ListItem>
        )
    }
}

AnnotationBodyItem.propTypes = {
    classes: PropTypes.objectOf(PropTypes.string),
    body: PropTypes.arrayOf(
        PropTypes.shape({ value: PropTypes.string, type: PropTypes.string, purpose: PropTypes.string }),
    ),
    t: PropTypes.func.isRequired,
}

AnnotationBodyItem.defaultProps = {
    classes: {},
    body: {},
    t: key => key,
}

export default AnnotationBodyItem;
