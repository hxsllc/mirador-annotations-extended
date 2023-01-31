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

        const selectorState = {
            value: null,
            type: null
        }

        this.state = {
            edit: false,
            ...selectorState,
        }

        this.edit = this.edit.bind(this);
        this.confirm = this.confirm.bind(this);
        this.cancel = this.cancel.bind(this);
        this.delete = this.delete.bind(this);
        this.handleTextFieldInput = this.handleTextFieldInput.bind(this);
    }

    componentDidMount() {
        const { selector } = this.props;
        const { value, type } = this.state;
        if(selector.value) {
            this.setState({ value: selector.value })
        }
        if(selector.type) {
            this.setState({ type: selector.type })
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
        const { edit } = this.state;
        if(edit) {
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
        const { selector } = this.props;
        if(edit) {
            if(selector.value) {
                this.setState({ value: selector.value })
            }
            if(selector.type) {
                this.setState({ type: selector.type })
            }
        }
    }

    delete() {
        const { edit } = this.state;
        if(!edit) {
            // you can only delete when you are not editing
        }
    }

    render() {
        const { selector, classes, t } = this.props;
        const { edit, value, purpose, type } = this.state;
        console.log(selector);
        console.log(value);
        console.log(type);
        return (
            <ListItem divider className={classes.editAnnotationListItem} key={selector}>
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
                                <TextField id={`${selector}-target`} label={t('annotationMetadataSelector')} value={value} onChange={this.handleTextFieldInput} variant="standard" />
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
    selector: PropTypes.arrayOf(
        PropTypes.shape({ value: PropTypes.string, type: PropTypes.string, purpose: PropTypes.string }),
    ),
    t: PropTypes.func.isRequired,
}

AnnotationTargetItem.defaultProps = {
    classes: {},
    selector: {},
    t: key => key,
}

export default AnnotationTargetItem;
