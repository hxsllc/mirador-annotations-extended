import React, { Component } from 'react';
import PropTypes, { bool } from 'prop-types';
import { ListItem, ListItemText } from '@material-ui/core';
import { Check } from '@material-ui/icons';
import DeleteIcon from '@material-ui/icons/DeleteForever';
import EditIcon from '@material-ui/icons/Edit';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import { Collapse } from '@material-ui/core';
import { TextField } from '@material-ui/core';
import { NativeSelect, FormControl, InputLabel } from '@material-ui/core';
import TargetFragmentSelector from '../containers/TargetFragmentSelector';
import TargetSvgSelector from '../containers/TargetSvgSelector';
import { Favorite } from '@material-ui/icons';

class AnnotationTargetItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            color: null,
            targetOptionState: 1,

        }

        this.edit = this.edit.bind(this);
        this.confirm = this.confirm.bind(this);
        this.delete = this.delete.bind(this);
        this.handleSelectedTargetOption = this.handleSelectedTargetOption.bind(this);
        this.updateTargetValue = this.updateTargetValue.bind(this);
    }

    componentDidMount() {
        const { target, edit, handleEdit } = this.props;
        if(!target.value) {
            handleEdit(target._temp_id, 'target');
        }
        if(target.type) {
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

        handleEdit(target._temp_id, 'target');
    }

    updateTargetValue({ value }) {
        const { target, updateContent } = this.props;

        if(value && target.type=='SvgSelector') {
            var val = value.split('stroke="');
            this.setState({ color: val[1].substr(0,7) });
        }

        updateContent('target', { value: value, type: target.type, _temp_id: target._temp_id, _temp_name: target._temp_name }, target._temp_id);
    }

    confirm() {
        const { handleEdit } = this.props;

        handleEdit(null, 'target');
    }

    handleSelectedTargetOption(e) {
        switch(e.target.value) {
            case 'SvgSelector':
                this.setState({ targetOptionState: 1 });
                break;
            default:
                this.setState({ targetOptionState: 0 });
                break;
        }
    }

    delete() {
        const { handleDelete, target } = this.props;

        handleDelete('target', target._temp_id);
    }

    render() {
        const { target, classes, t, windowId, _temp_id, edit } = this.props;
        const { targetOptionState, color } = this.state;
        const targetOptions = ['FragmentSelector', 'SvgSelector'];

        return (
            <ListItem divider className={classes.editAnnotationListItem}>
                <div>
                    <Grid container spacing={1}>
                        <Grid item xs={8}>
                            <ListItemText style={{ lineHeight: '1rem'}} primary={target._temp_name} /*secondaryTypographyProps={ color ? { style: { color: color } } : {}}*/ secondary={ color ? <> {t('Color')} <Favorite style={{ color: color, marginLeft: '25px' }}/> </> : target.value } />
                        </Grid>
                        <Grid item xs={4}>
                            <IconButton size="small" onClick={() => edit == target._temp_id ? this.confirm() : this.edit()}>
                                {
                                    edit == target._temp_id
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
                                    ? <TargetSvgSelector key={`${_temp_id}-SvgSelector`} value={target.value} updateValue={this.updateTargetValue} windowId={windowId} />
                                    : <TargetFragmentSelector key={`${_temp_id}-FragmentSelector`} value={target.value} updateValue={this.updateTargetValue} windowId={windowId} />
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
