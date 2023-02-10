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
import MetadataCreatorItem from '../containers/MetadataCreatorItem';
import MetadataMotivationItem from '../containers/MetadataMotivationItem';

// you still have a lot of work to do

class AnnotationMetadataItem extends Component {
    constructor(props) {
        super(props);

        const metadataState = {
            value: null,
            type: null
        }

        this.state = {
            ...metadataState,
        }

        this.edit = this.edit.bind(this);
        this.confirm = this.confirm.bind(this);
        this.cancel = this.cancel.bind(this);
        this.delete = this.delete.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        const { metadata, edit, handleEdit } = this.props;

        if(metadata.value) {
            this.setState({ value: metadata.value })
        } else {
            if(metadata.type =='creator' && edit==null) {
                handleEdit(metadata._temp_id, 'metadata');
            }
        }
        if(metadata.type) {
            this.setState({ type: metadata.type })
        }
    }

    edit() {
        const { edit, metadata, handleEdit } = this.props
        if(edit == null) {
            handleEdit(metadata._temp_id, 'metadata');
        }
    }

    confirm() {
        const { value, type } = this.state;
        const { handleSubmit, metadata, edit, handleEdit } = this.props;
        if(edit == metadata._temp_id) {
            handleSubmit('metadata', { value: value, type: type, _temp_id: metadata._temp_id }, metadata._temp_id);
            handleEdit(null, 'metadata');
        }
    }

    handleChange( newValue ) {
        this.setState({ value: newValue });
    }

    cancel() {
        const { metadata, edit, handleEdit } = this.props;
        if(edit == metadata._temp_id) {
            if(metadata.value) {
                this.setState({ value: metadata.value })
            }
            if(metadata.type) {
                this.setState({ type: metadata.type })
            }
            handleEdit(null, 'metadata');
        }
    }

    delete() {
        const { handleDelete, metadata, edit } = this.props;
        if(edit == null) {
            handleDelete('metadata', metadata._temp_id);
        }
    }

    render() {
        const { metadata, classes, t, edit } = this.props;
        const { value } = this.state;

        return (


            <ListItem divider className={classes.editAnnotationListItem}>
                <div>
                    <Grid container spacing={1}>
                        <Grid item xs={8}>
                            <ListItemText style={{ lineHeight: '1rem'}} primary={metadata.type} secondary={ metadata.value ? metadata.value : 'n.a.' }/>
                        </Grid>
                        <Grid item xs={4}>
                            <IconButton disabled={edit!==null && edit!==metadata._temp_id} size="small" onClick={() => edit==metadata._temp_id ? this.confirm() : this.edit()}>
                                {
                                    edit==metadata._temp_id
                                    ? <Check />
                                    : <EditIcon />
                                }
                            </IconButton>
                            <IconButton disabled={edit!==null && edit!==metadata._temp_id} size="small" onClick={() => edit==metadata._temp_id ? this.cancel() : null}>
                                {
                                    edit==metadata._temp_id
                                    ? <Cancel />
                                    : <></>
                                }
                            </IconButton>
                        </Grid>
                    </Grid>
                </div>
                <div className={classes.editAnnotation}>
                    <Collapse className={classes.editAnnotationCollapse} in={edit==metadata._temp_id} unmountOnExit>
                        <Grid container spacing={1}>
                            <Grid item xs={12}>
                                {
                                    metadata.type == 'creator'
                                    ? <MetadataCreatorItem id={`${metadata}-creator`} value={value} handleChange={this.handleChange}/>
                                    : <MetadataMotivationItem value={value} handleChange={this.handleChange} />
                                }
                            </Grid>
                        </Grid>
                    </Collapse>
                </div>
            </ListItem>
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
