import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ListItem, ListItemText } from '@material-ui/core';
import { Check } from '@material-ui/icons';
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

        this.state = {
            purposeOptionState: 0,
        }

        this.edit = this.edit.bind(this);
        this.confirm = this.confirm.bind(this);
        this.delete = this.delete.bind(this);
        this.handleSelectedPurposeOption = this.handleSelectedPurposeOption.bind(this);
        this.updateBodyValue = this.updateBodyValue.bind(this);
    }

    componentDidMount() {
        const { body, edit, handleEdit } = this.props;
        if(!body.value) {
            handleEdit(body._temp_id, 'body');
        }
        if(body.purpose) {
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
        const { handleEdit, body } = this.props;

        handleEdit(body._temp_id, 'body');
    }

    confirm() {
        const { handleEdit } = this.props;

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
        const { updateContent, body } = this.props;

        updateContent('body', { value: newValue, type: body.type, purpose: body.purpose, _temp_id: body._temp_id }, body._temp_id);
    }

    delete() {
        const { body, handleDelete} = this.props;

        handleDelete('body', body._temp_id);
    }

    render() {
        const { body, classes, t, windowId, edit } = this.props;
        const { purposeOptionState } = this.state;
        const purposeOptions = ['describing', 'tagging'];

        return (
            <>
                {
                    body.purpose == 'tagging'
                    ? (
                        <Chip
                            label={
                                edit==body._temp_id
                                ? (<AnnotationTextFieldItem key={`${body._temp_id}-TextFieldItem`} value={body.value} updateValue={this.updateBodyValue} windowId={windowId} />)
                                : (body.value ? body.value : "no text")}
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
                                    <ListItemText style={{ lineHeight: '1rem'}} primary={body.value ? ReactHtmlParser(body.value) : 'no text'} />
                                </Grid>
                                <Grid item xs={4}>
                                    <IconButton size="small" onClick={() => edit==body._temp_id ? this.confirm() : this.edit()}>
                                        {
                                            edit==body._temp_id
                                            ? <Check />
                                            : <EditIcon />
                                        }
                                    </IconButton>
                                    <IconButton size="small" onClick={this.delete}>
                                        <DeleteIcon />
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
                                            ? <AnnotationTextEditorItem key={`${body._temp_id}-TextEditorItem`} value={body.value} updateValue={this.updateBodyValue} windowId={windowId}  />
                                            : <AnnotationTextFieldItem key={`${body._temp_id}-TextFieldItem`} value={body.value} updateValue={this.updateBodyValue} windowId={windowId} />
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
