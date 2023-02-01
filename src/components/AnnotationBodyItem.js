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
            purposeOptionState: 0,
            ...bodyState,
        }

        this.edit = this.edit.bind(this);
        this.confirm = this.confirm.bind(this);
        this.cancel = this.cancel.bind(this);
        this.delete = this.delete.bind(this);
        this.handleTextFieldInput = this.handleTextFieldInput.bind(this);
        this.handleSelcetedPurposeOption = this.handleSelcetedPurposeOption.bind(this);
    }

    componentDidMount() {
        const { body } = this.props;
        const { value, type, purpose, purposeOptionState } = this.state;
        if(body.value) {
            this.setState({ value: body.value });
        }
        if(body.type) {
            this.setState({ type: body.type });
        }
        if(body.purpose) {
            this.setState({ purpose: body.purpose });
            switch(body.purpose) {
                case 'describing':
                    this.setState({ purposeOptionState: 1 });
                    break;
                case 'classifying':
                    this.setState({ purposeOptionState: 2 });
                    break;
                default:
                    this.setState({ purposeOptionState: 0 });
            }
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
        const { bodyPos, handleSubmit, body } = this.props;
        if(edit) {
            handleSubmit('body', { value: value, type: type, purpose: purpose, _temp_id: body._temp_id }, bodyPos);
            this.setState({
                edit: false
            });
        }
    }

    handleSelcetedPurposeOption(e) {
        const { purpose } = this.state;
        this.setState({ purpose: e.target.value });
        switch(e.target.value) {
            case 'describing':
                this.setState({ purposeOptionState: 1 });
                break;
            case 'classifying':
                this.setState({ purposeOptionState: 2 });
                break;
            default:
                this.setState({ purposeOptionState: 0 });
                break;
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
                this.setState({ value: body.value });
            };
            if(body.type) {
                this.setState({ type: body.type });
            };
            if(body.purpose) {
                this.setState({ purpose: body.purpose });
                switch(purpose) {
                    case 'describing':
                        this.setState({ purposeOptionState: 1 });
                        break;
                    case 'classifying':
                        this.setState({ purposeOptionState: 2 });
                        break;
                    default:
                        this.setState({ purposeOptionState: 0 });
                }
            };
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
        const { body, classes, t } = this.props;
        const { edit, value, purpose, type, purposeOptionState } = this.state;
        const purposeOptions = ['tagging', 'describing', 'classifying'];

        return (
            <ListItem divider className={classes.editAnnotationListItem}>
                <div>
                    <Grid container spacing={1}>
                        <Grid item xs={8}>
                            <ListItemText style={{ lineHeight: '1rem'}} primary={type} secondary={purpose} />
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
                            <FormControl>
                                    <InputLabel variant="standard" htmlFor='uncontrolled-native'>
                                        purpose
                                    </InputLabel>
                                    {/* maybe add a key */}
                                    <NativeSelect value={purposeOptions[purposeOptionState]} inputProps={{ name: 'metadata', id: 'uncontrolled-native' }} onChange={this.handleSelcetedPurposeOption}>
                                        {purposeOptions.map((value) => (
                                            <option value={value}>{value}</option>
                                        ))}
                                    </NativeSelect>
                                </FormControl>
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
