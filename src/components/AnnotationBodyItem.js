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
import AnnotationTextEditorItem from '../containers/AnnotationTextEditorItem';
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
            edit: false,
            purposeOptionState: 0,
            ...bodyState,
        }

        this.edit = this.edit.bind(this);
        this.confirm = this.confirm.bind(this);
        this.cancel = this.cancel.bind(this);
        this.delete = this.delete.bind(this);
        this.handleTextFieldInput = this.handleTextFieldInput.bind(this);
        this.handleSelectedPurposeOption = this.handleSelectedPurposeOption.bind(this);
        this.updateBodyValue = this.updateBodyValue.bind(this);
    }

    componentDidMount() {
        const { body } = this.props;
        if(body.value) {
            this.setState({ value: body.value });
        } else {
            this.setState({ edit: true });
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

    handleTextFieldInput(e) {
        this.setState({ value: e.target.value });
    }

    updateBodyValue(newValue) {
        const { edit } = this.state;
        if(edit) {
            this.setState({ value: newValue });
        }
    }

    cancel() {
        const { edit } = this.state;
        const { body } = this.props;
        if(edit) {
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
            this.setState({ edit: false });
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
        const { body, classes, t, windowId } = this.props;
        const { edit, value, purpose, type, purposeOptionState } = this.state;
        const purposeOptions = ['describing', 'tagging'];

        return (
            <ListItem divider className={classes.editAnnotationListItem}>
                <div>
                    <Grid container spacing={1}>
                        <Grid item xs={8}>
                            <ListItemText style={{ lineHeight: '1rem'}} primary={body.value ? ReactHtmlParser(body.value) : 'no text'} secondary={`${type} | ${purpose}`} />
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
                                    <NativeSelect value={purposeOptions[purposeOptionState]} inputProps={{ name: 'metadata', id: 'uncontrolled-native' }} onChange={this.handleSelectedPurposeOption}>
                                        {purposeOptions.map((value, index) => (
                                            <option value={value}>{value}</option>
                                        ))}
                                    </NativeSelect>
                                </FormControl>
                                {
                                    purposeOptionState=="0"
                                    ? <AnnotationTextEditorItem key={`${body._temp_id}-TextEditorItem`} value={value} updateValue={this.updateBodyValue} windowId={windowId}  />
                                    : <TextField id={`${body}-body`} label={t('annotationMetadataBody')} value={value} onChange={this.handleTextFieldInput} variant="standard" />
                                }
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
