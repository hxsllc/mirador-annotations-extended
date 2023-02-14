import React, { Component } from 'react';
import PropTypes, { bool } from 'prop-types';
import { ListItem, ListItemText } from '@material-ui/core';
import { Check } from '@material-ui/icons';
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


        this.edit = this.edit.bind(this);
        this.confirm = this.confirm.bind(this);
        this.delete = this.delete.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        const { metadata, edit, handleEdit } = this.props;

        if(!metadata.value) {
            handleEdit(metadata._temp_id, 'metadata');
        }
    }

    edit() {
        const { metadata, handleEdit } = this.props;

        handleEdit(metadata._temp_id, 'metadata');
    }

    confirm() {
        const { handleEdit } = this.props;

        handleEdit(null, 'metadata');
    }

    handleChange( newValue ) {
        const { metadata, updateContent } = this.props;

        updateContent('metadata', { value: newValue, type: metadata.type, _temp_id: metadata._temp_id }, metadata._temp_id);
    }

    delete() {
        const { handleDelete, metadata } = this.props;

        handleDelete('metadata', metadata._temp_id);
    }

    render() {
        const { metadata, classes, t, edit } = this.props;

        return (
            <>
                {
                    metadata.type == 'creator'
                    ? (
                        <ListItem divider className={classes.editAnnotationListItem}>
                            <div>
                                <Grid container spacing={1}>
                                    <Grid item xs={8}>
                                        <ListItemText style={{ lineHeight: '1rem'}} primary={metadata.type} secondary={ metadata.value ? metadata.value : 'n.a.' }/>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <IconButton size="small" onClick={() => edit==metadata._temp_id ? this.confirm() : this.edit()}>
                                            {
                                                edit==metadata._temp_id
                                                ? <Check />
                                                : <EditIcon />
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
                                                ? <MetadataCreatorItem id={`${metadata}-creator`} value={metadata.value} handleChange={this.handleChange}/>
                                                : <MetadataMotivationItem value={metadata.value} handleChange={this.handleChange} />
                                            }
                                        </Grid>
                                    </Grid>
                                </Collapse>
                            </div>
                        </ListItem>
                    )
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
