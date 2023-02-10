import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ListItem, ListItemText } from '@material-ui/core';
import { Check, Cancel } from '@material-ui/icons';
import DeleteIcon from '@material-ui/icons/DeleteForever';
import EditIcon from '@material-ui/icons/Edit';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import { Collapse } from '@material-ui/core';
import { TextField } from '@material-ui/core';
import { Chip } from '@material-ui/core';
import { NativeSelect, FormControl, InputLabel } from '@material-ui/core';
import AnnotationTextEditorItem from '../containers/AnnotationTextEditorItem';
import AnnotationTextFieldItem from '../containers/AnnotationTextFieldItem';
import ReactHtmlParser from 'react-html-parser';

class AnnotationBodyItem extends Component {
    constructor(props) {
        super(props);

        const bodyState = {
            value: null,
            type: null,
            purpose: null
        }

        this.state = {
            purposeOptionState: 0,
            ...bodyState,
        }

        this.edit = this.edit.bind(this);
        this.confirm = this.confirm.bind(this);
        this.cancel = this.cancel.bind(this);
        this.delete = this.delete.bind(this);
        this.handleSelectedPurposeOption = this.handleSelectedPurposeOption.bind(this);
        this.updateBodyValue = this.updateBodyValue.bind(this);
    }

    componentDidMount() {
        const { body, edit, handleEdit } = this.props;
        if(body.value) {
            this.setState({ value: body.value });
        } else if(edit == null) {
            handleEdit(body._temp_id, 'body');
        }
        if(body.type) {
            this.setState({ type: body.type });
        }
        if(body.purpose) {
            this.setState({ purpose: body.purpose });
            switch(body.purpose) {
                case 'describing':
                    this.setState({ purposeOptionState: 0 });
                    break;
                case 'tagging':
                    this.setState({ purposeOptionState: 1 });
                    break;
                default:
                    this.setState({ purposeOptionState: 0 });
                    break;
            }
        }
    }

    edit() {
        const { edit, handleEdit, body } = this.props;
        if(edit == null) {
            handleEdit(body._temp_id, 'body');
        }
    }

    confirm() {
        const { value, type, purpose } = this.state;
        const { handleSubmit, body, handleEdit } = this.props;

        handleSubmit('body', { value: value, type: type, purpose: purpose, _temp_id: body._temp_id }, body._temp_id);
        handleEdit(null, 'body');
    }

    handleSelectedPurposeOption(e) {;
        this.setState({ purpose: e.target.value });
        switch(e.target.value) {
            case 'describing':
                this.setState({ purposeOptionState: 0 });
                break;
            case 'tagging':
                this.setState({ purposeOptionState: 1 });
                break;
            default:
                this.setState({ purposeOptionState: 0 });
                break;
        }
    }

    updateBodyValue(newValue) {
        const { edit, body } = this.props;
        if(edit == body._temp_id) {
            this.setState({ value: newValue });
        }
    }

    cancel() {
        const { body, edit, handleEdit } = this.props;
        if(edit == body._temp_id) {
            if(body.value) {
                this.setState({ value: body.value });
            } else {
                this.setState({ value: null });
            }
            if(body.type) {
                this.setState({ type: body.type });
            };
            if(body.purpose) {
                this.setState({ purpose: body.purpose });
                switch(body.purpose) {
                    case 'describing':
                        this.setState({ purposeOptionState: 0 });
                        break;
                    case 'tagging':
                        this.setState({ purposeOptionState: 1 });
                        break;
                    default:
                        this.setState({ purposeOptionState: 0 });
                        break;
                }
            };
            handleEdit(null, 'body');
        }
    }

    delete() {
        const { body, handleDelete, edit } = this.props;
        if(edit == null) {
            handleDelete('body', body._temp_id);
        }
    }

    render() {
        const { body, classes, t, windowId, edit } = this.props;
        const { value, purpose, type, purposeOptionState } = this.state;
        const purposeOptions = ['describing', 'tagging'];

        return (
            <>
                {
                    body.purpose == 'tagging'
                    ? (
                        <Chip
                            disabled={edit!==null && edit!=body._temp_id}
                            label={
                                edit==body._temp_id
                                ? (<AnnotationTextFieldItem key={`${body._temp_id}-TextFieldItem`} value={value} updateValue={this.updateBodyValue} windowId={windowId} />)
                                : (body.value ? body.value : '❤ (｡◕‿◕｡) ❤')}
                            variant={edit==body._temp_id ? "default" : "outlined"}
                            color={edit==body._temp_id ? "primary" : ""}
                            onClick={() => edit==body._temp_id ? null : this.edit()}
                            deleteIcon={edit==body._temp_id ? <Check /> : <DeleteIcon />}
                            onDelete={() => edit==body._temp_id ? this.confirm() : this.delete()}/>
                        )
                    : (<ListItem divider className={classes.editAnnotationListItem}>
                        <div>
                            <Grid container spacing={1}>
                                <Grid item xs={8}>
                                    <ListItemText style={{ lineHeight: '1rem'}} primary={body.value ? ReactHtmlParser(body.value) : 'no text'} secondary={`${type} | ${purpose}`} />
                                </Grid>
                                <Grid item xs={4}>
                                    <IconButton disabled={edit!==null && edit!==body._temp_id} size="small" onClick={() => edit==body._temp_id ? this.confirm() : this.edit()}>
                                        {
                                            edit==body._temp_id
                                            ? <Check />
                                            : <EditIcon />
                                        }
                                    </IconButton>
                                    <IconButton disabled={edit!==null && edit!==body._temp_id} size="small" onClick={() => edit==body._temp_id ? this.cancel() : this.delete()}>
                                        {
                                            edit==body._temp_id
                                            ? <Cancel />
                                            : <DeleteIcon />
                                        }
                                    </IconButton>
                                </Grid>
                            </Grid>
                        </div>
                        <div className={classes.editAnnotation}>
                            <Collapse className={classes.editAnnotationCollapse} in={edit==body._temp_id} unmountOnExit>
                                <Grid container spacing={1}>
                                    <Grid item xs={12}>
                                    <FormControl style={{display: 'none'}}>
                                            <InputLabel variant="standard" htmlFor='uncontrolled-native'>
                                                purpose
                                            </InputLabel>
                                            {/* maybe add a key */}
                                            <NativeSelect value={purposeOptions[purposeOptionState]} inputProps={{ name: 'metadata', id: 'uncontrolled-native' }} onChange={this.handleSelectedPurposeOption}>
                                                {purposeOptions.map((value, index) => (
                                                    <option value={value}>{value}</option>
                                                ))}
                                            </NativeSelect>
                                        </FormControl>
                                        {
                                            purposeOptionState=="0"
                                            ? <AnnotationTextEditorItem key={`${body._temp_id}-TextEditorItem`} value={value} updateValue={this.updateBodyValue} windowId={windowId}  />
                                            : <AnnotationTextFieldItem key={`${body._temp_id}-TextFieldItem`} value={value} updateValue={this.updateBodyValue} windowId={windowId} />
                                        }
                                    </Grid>
                                </Grid>
                            </Collapse>
                        </div>
                    </ListItem>)
                }
            </>
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
