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
            edit: false,
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
        } else {
            this.setState({ edit: true });
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
        const { edit } = this.state;
        if(!edit) {
            this.setState({
                edit: true
            });
        }
    }

    updateTargetValue({ value }) {
        const { edit, type } = this.state;
        if(value && type=='SvgSelector') {
            var val = value.split('stroke="');
            this.setState({ color: val[1].substr(0,7) });
        }
        if(edit) {
            this.setState({ value });
        }
    }

    confirm() {
        const { edit , value, type } = this.state;
        const { targetPos, handleSubmit, target } = this.props;
        if(edit) {
            handleSubmit('target', { value: value, type: type, _temp_id: target._temp_id }, targetPos);
            this.setState({
                edit: false
            });
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
        const { edit } = this.state;
        const { target } = this.props;
        if(edit) {
            if(target.value) {
                this.setState({ value: target.value });
            } else {
                this.setState({ value: null });
            }
            if(target.type) {
                this.setState({ type: target.type });
                switch(target.type) {
                    case 'SvgSelector':
                        this.setState({ targetOptionState: 1 });
                        break;
                    default:
                        this.setState({ targetOptionState: 0 });
                        break;
                }
            }
            this.setState({ edit: false });
        }
    }

    delete() {
        const { edit } = this.state;
        const { targetPos, handleDelete } = this.props;
        if(!edit) {
            handleDelete('target', targetPos);
            // you can only delete when you are not editing
        }
    }

    render() {
        const { target, classes, t, targetPos, windowId, _temp_id } = this.props;
        const { edit, value, type, targetOptionState, color } = this.state;
        const targetOptions = ['FragmentSelector', 'SvgSelector'];

        return (
            <ListItem divider className={classes.editAnnotationListItem}>
                <div>
                    <Grid container spacing={1}>
                        <Grid item xs={8}>
                            <ListItemText style={{ lineHeight: '1rem'}} primary={type} secondary={ color ? color : value } />
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
