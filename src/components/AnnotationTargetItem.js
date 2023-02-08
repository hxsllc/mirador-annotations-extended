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
import TargetFragmentSelector from '../containers/TargetFragmentSelector';
import TargetSvgSelector from '../containers/TargetSvgSelector';

class AnnotationTargetItem extends Component {
    constructor(props) {
        super(props);

        const targetState = {
            value: null,
            type: null,
            color: null
        }

        this.state = {
            ...targetState,
            targetOptionState: 1,

        }

        this.edit = this.edit.bind(this);
        this.confirm = this.confirm.bind(this);
        this.cancel = this.cancel.bind(this);
        this.delete = this.delete.bind(this);
        this.handleSelectedTargetOption = this.handleSelectedTargetOption.bind(this);
        this.updateTargetValue = this.updateTargetValue.bind(this);
    }

    componentDidMount() {
        const { target } = this.props;
        if(target.value) {
            this.setState({ value: target.value });
        }
        if(target.type) {
            this.setState({ type: target.type })
            switch(target.type) {
                case 'SvgSelector':
                    this.setState({ purposeOptionState: 1 });
                    if(target.value) {
                        var val = target.value.split('stroke="');
                        this.setState({ color: val[1].substr(0,7) })
                    }
                    break;
                default:
                    this.setState({ purposeOptionState: 0 });
                    break;
            }
        }
    }

    edit() {
        const { edit, target, handleEdit } = this.props;
        if(edit == null) {
            handleEdit(target._temp_id, 'target');
        }
    }

    updateTargetValue({ value }) {
        const { type } = this.state;
        if(value && type=='SvgSelector') {
            var val = value.split('stroke="');
            this.setState({ color: val[1].substr(0,7) });
        }
        this.setState({ value });
    }

    confirm() {
        const { value, type } = this.state;
        const { handleSubmit, target, edit, targetPos, handleEdit } = this.props;
        if(edit == target._temp_id) {
            handleSubmit('target', { value: value, type: type, _temp_id: target._temp_id, _temp_name: target._temp_name }, targetPos);
            handleEdit(null, 'target');
        }
    }

    handleSelectedTargetOption(e) {
        this.setState({ type: e.target.value });
        switch(e.target.value) {
            case 'SvgSelector':
                this.setState({ targetOptionState: 1 });
                break;
            default:
                this.setState({ targetOptionState: 0 });
                break;
        }
    }

    cancel() {
        const { target, edit, targetPos, handleEdit } = this.props;

        if(edit == target._temp_id) {
            if(target.value) {
                if(target.type == 'SvgSelector') {
                    var val = target.value.split('stroke="');
                    if(val) {
                        this.setState({ targetOptionState: 1, color: val[1].substr(0,7), type: target.type });
                    } else {
                        this.setState({ targetOptionState: 1, color: null, type: target.type });
                    }
                } else {
                    this.setState({ targetOptionState: 0, color: null, type: target.type ? target.type : 'FragmentSelector' });
                }
                this.setState({ value: target.value });
            } else {
                this.setState({ value: null, targetOptionState: 1, color: null, type: 'SvgSelector' });
            }
            handleEdit(null, 'target');
        }
    }

    delete() {
        const { handleDelete, edit, targetPos } = this.props;
        if(edit == null) {
            handleDelete('target', targetPos);
            // you can only delete when you are not editing
        }
    }

    render() {
        const { target, classes, t, targetPos, windowId, _temp_id, edit } = this.props;
        const { value, type, targetOptionState, color } = this.state;
        const targetOptions = ['FragmentSelector', 'SvgSelector'];

        return (
            <ListItem divider className={classes.editAnnotationListItem}>
                <div>
                    <Grid container spacing={1}>
                        <Grid item xs={8}>
                            <ListItemText style={{ lineHeight: '1rem'}} primary={target._temp_name} secondaryTypographyProps={ color ? { style: { color: color } } : {}} secondary={ color ? color : value } />
                        </Grid>
                        <Grid item xs={4}>
                            <IconButton disabled={ edit!==null && edit !== target._temp_id } size="small" onClick={() => edit == target._temp_id ? this.confirm() : this.edit()}>
                                {
                                    edit == target._temp_id
                                    ? <Check />
                                    : <EditIcon />
                                }
                            </IconButton>
                            <IconButton disabled={ edit!==null && edit !== target._temp_id } size="small" onClick={() => edit == target._temp_id ? this.cancel() : this.delete()}>
                                {
                                    edit == target._temp_id
                                    ? <Cancel />
                                    : <DeleteIcon />
                                }
                            </IconButton>
                        </Grid>
                    </Grid>
                </div>
                <div className={classes.editAnnotation}>
                    <Collapse className={classes.editAnnotationCollapse} in={edit==target._temp_id} unmountOnExit>
                        <Grid container spacing={1}>
                            <Grid item xs={12}>
                            <FormControl className={classes.hidden}>
                                    <InputLabel variant="standard" htmlFor='uncontrolled-native-target'>
                                        type
                                    </InputLabel>
                                    {/* maybe add a key */}
                                    <NativeSelect value={targetOptions[targetOptionState]} inputProps={{ name: 'target', id: 'uncontrolled-native-target' }} onChange={this.handleSelectedTargetOption}>
                                        {targetOptions.map((value, index) => (
                                            <option value={value}>{value}</option>
                                        ))}
                                    </NativeSelect>
                                </FormControl>
                                {
                                    targetOptionState==1
                                    ? <TargetSvgSelector key={`${_temp_id}-SvgSelector`} value={value} updateValue={this.updateTargetValue} windowId={windowId} />
                                    : <TargetFragmentSelector key={`${_temp_id}-FragmentSelector`} value={value} updateValue={this.updateTargetValue} windowId={windowId} />
                                }
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
