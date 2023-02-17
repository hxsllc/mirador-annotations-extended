import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ListItem, ListItemText } from '@material-ui/core';
import { Check } from '@material-ui/icons';
import DeleteIcon from '@material-ui/icons/DeleteForever';
import EditIcon from '@material-ui/icons/Edit';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import TargetSvgSelector from '../containers/TargetSvgSelector';
import ColorIcon  from '../icons/Color';

class AnnotationTargetItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            color: null,
            hover: false,
        }

        this.confirm = this.confirm.bind(this);
        this.delete = this.delete.bind(this);
        this.edit = this.edit.bind(this);
        this.updateTargetValue = this.updateTargetValue.bind(this);
    }

    componentDidMount() {
        const {
            handleEdit,
            target,
        } = this.props;

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
        const {
            handleEdit,
            target,
        } = this.props;

        handleEdit(target._temp_id, 'target');
    }

    updateTargetValue({ value }) {
        const {
            target,
            updateContent
        } = this.props;

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
        const {
            edit,
            target,
        } = this.props;

        return target._temp_id == edit;
    }

    delete() {
        const {
            handleDelete,
            target,
        } = this.props;

        handleDelete('target', target._temp_id);
    }

    renderSvgSelector() {
        const {
            _temp_id,
            classes,
            t,
            target,
            windowId,
        } = this.props;

        const {
            color,
            hover,
        } = this.state;

        const edit = this.editing();

        return (
            <ListItem className={classes.editAnnotationListItem} divider>
                <div>
                    <Grid container spacing={1}
                        onMouseEnter={() => this.setState({hover: true})}
                        onMouseLeave={() => this.setState({hover: false })}
                    >
                        <Grid item xs={8}>
                            <ListItemText
                                style={{ lineHeight: '1rem' }}
                                primary={target._temp_name}
                                secondary={
                                    color
                                    ? <> {t('Color')} <ColorIcon style={{ color: color, marginLeft: '25px' }}/> </>
                                    : target.value
                                }
                            />
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
                    <TargetSvgSelector
                        edit={edit}
                        hover={hover}
                        key={`${_temp_id}-SvgSelector`}
                        updateValue={this.updateTargetValue}
                        value={target.value}
                        windowId={windowId}
                    />
                </div>
            </ListItem>
        )
    }

    render() {
        const { target } = this.props;

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
