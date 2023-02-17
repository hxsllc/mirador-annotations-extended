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
            hover: false,
        }

        this.edit = this.edit.bind(this);
        this.confirm = this.confirm.bind(this);
        this.delete = this.delete.bind(this);
        this.updateTargetValue = this.updateTargetValue.bind(this);
    }

    componentDidMount() {
        const { target, handleEdit } = this.props;
        if(!target.value) {
            handleEdit(target._temp_id, 'target');
        }
        if(target.type) {
            switch(target.type) {
                case 'SvgSelector':
                    if(target.value) {
                        var val = target.value.split('stroke="');
                        this.setState({ color: val[1].substr(0,7) })
                    }
                    break;
                default:
                    break;
            }
        }
    }

    edit() {
        const { target, handleEdit } = this.props;

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

    editing() {
        const { target, edit } = this.props;

        return target._temp_id == edit;
    }

    delete() {
        const { handleDelete, target } = this.props;

        handleDelete('target', target._temp_id);
    }

    renderSvgSelector() {
        const { classes, target, windowId, t, _temp_id } = this.props;
        const { color, hover } = this.state;
        const edit = this.editing();
        return (
            <ListItem divider className={classes.editAnnotationListItem} >
                <div>
                    <Grid container spacing={1}
                        onMouseEnter={() => this.setState({hover: true})}
                        onMouseLeave={() => this.setState({hover: false })}>
                        <Grid item xs={8}>
                            <ListItemText
                                style={{ lineHeight: '1rem' }}
                                primary={target._temp_name}
                                secondary={ color ? <> {t('Color')} <Favorite style={{ color: color, marginLeft: '25px' }}/> </> : target.value } />
                        </Grid>
                        <Grid item xs={4}>
                            <IconButton size="small" onClick={() => edit ? this.confirm() : this.edit()}>
                                {
                                    edit
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
                <div>
                    <TargetSvgSelector key={`${_temp_id}-SvgSelector`} value={target.value} edit={edit} hover={hover} updateValue={this.updateTargetValue} windowId={windowId} />
                </div>
            </ListItem>
        )
    }

    render() {
        const { target, } = this.props;

        return (
            <>
                {(() => {
                    switch(target.type) {
                        case 'SvgSelector':
                            return this.renderSvgSelector();
                        default:
                            return null;
                    }
                })()}
            </>
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
