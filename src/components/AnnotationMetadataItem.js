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
import { NativeSelect, FormControl, InputLabel } from '@material-ui/core';

// you still have a lot of work to do

class AnnotationMetadataItem extends Component {
    constructor(props) {
        super(props);

        const metadataState = {
            value: null,
            type: null
        }

        this.state = {
            edit: false,
            myPos: null,
            ...metadataState,
        }

        this.edit = this.edit.bind(this);
        this.confirm = this.confirm.bind(this);
        this.cancel = this.cancel.bind(this);
        this.delete = this.delete.bind(this);
        this.handleTextFieldInput = this.handleTextFieldInput.bind(this);
    }

    componentDidMount() {
        const { metadata, metadataPos } = this.props;
        this.setState({ myPos: metadataPos });
        if(metadata.value) {
            this.setState({ value: metadata.value })
        } else {
            this.setState({ edit: true });
        }
        if(metadata.type) {
            this.setState({ type: metadata.type })
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
        const { metadataPos, handleSubmit, metadata } = this.props;
        if(edit) {
            handleSubmit('metadata', { value: value, type: type, _temp_id: metadata._temp_id }, metadataPos);
            this.setState({
                edit: false
            });
        }
    }

    handleTextFieldInput(e) {
        this.setState({ value: e.target.value });
    }

    cancel() {
        const { edit } = this.state;
        const { metadata } = this.props;
        if(edit) {
            if(metadata.value) {
                this.setState({ value: metadata.value })
            }
            if(metadata.type) {
                this.setState({ type: metadata.type })
            }
            this.setState({ edit: false });
        }
    }

    delete() {
        const { edit } = this.state;
        const { handleDelete, metadataPos } = this.props;
        if(!edit) {
            handleDelete('metadata', metadataPos);
            // you can only delete when you are not editing
        }
    }

    render() {
        const { metadata, classes, t} = this.props;
        const { edit, value, type } = this.state;
        const metadataOptions = ['creator', 'motivation'];

        return (
            <>
                {
                    metadata.type == 'creator'
                    ? (<ListItem divider className={classes.editAnnotationListItem}>
                        <div>
                            <Grid container spacing={1}>
                                <Grid item xs={8}>
                                    <ListItemText style={{ lineHeight: '1rem'}} primary={metadata.type} secondary={ metadata.value ? metadata.value : 'n.a.' }/>
                                </Grid>
                                <Grid item xs={4}>
                                    <IconButton size="small" onClick={() => edit ? this.confirm() : this.edit()}>
                                        {
                                            edit
                                            ? <Check />
                                            : <EditIcon />
                                        }
                                    </IconButton>
                                    <IconButton size="small" onClick={() => edit ? this.cancel() : null}>
                                        {
                                            edit
                                            ? <Cancel />
                                            : <></>
                                        }
                                    </IconButton>
                                </Grid>
                            </Grid>
                        </div>
                        <div className={classes.editAnnotation}>
                            <Collapse className={classes.editAnnotationCollapse} in={edit} unmountOnExit>
                                <Grid container spacing={1}>
                                    <Grid item xs={12}>
                                        {
                                            metadata.type == 'creator'
                                            ? <TextField id={`${metadata}-creator`} label={t('annotationMetadataCreator')} value={value} onChange={this.handleTextFieldInput} variant="standard" />
                                            : <></>
                                        }
                                    </Grid>
                                </Grid>
                            </Collapse>
                        </div>
                    </ListItem>)
                    : null
                }
            </>
        )
    }
}

AnnotationMetadataItem.propTypes = {
    classes: PropTypes.objectOf(PropTypes.string),
    metadata: PropTypes.arrayOf(
        PropTypes.shape({ value: PropTypes.string, type: PropTypes.string }),
    ),
    t: PropTypes.func.isRequired,
}

AnnotationMetadataItem.defaultProps = {
    classes: {},
    metadata: {},
    t: key => key,
}

export default AnnotationMetadataItem;
