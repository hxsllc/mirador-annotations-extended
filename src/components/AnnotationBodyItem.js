import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ListItem, ListItemText } from '@material-ui/core';
import { Check } from '@material-ui/icons';
import DeleteIcon from '@material-ui/icons/DeleteForever';
import EditIcon from '@material-ui/icons/Edit';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import { Chip } from '@material-ui/core';
import AnnotationTextEditorItem from '../containers/AnnotationTextEditorItem';
import AnnotationTextFieldItem from '../containers/AnnotationTextFieldItem';
import ReactHtmlParser from 'react-html-parser';

class AnnotationBodyItem extends Component {
    constructor(props) {
        super(props);

        this.confirm = this.confirm.bind(this);
        this.delete = this.delete.bind(this);
        this.edit = this.edit.bind(this);
        this.editing = this.editing.bind(this);
        this.updateBodyValue = this.updateBodyValue.bind(this);
    }

    componentDidMount() {
        const {
            body,
            handleEdit,
        } = this.props;

        if(!body.value) {
            handleEdit(body._temp_id, 'body');
        }
    }

    edit() {
        const {
            body,
            handleEdit,
        } = this.props;

        handleEdit(body._temp_id, 'body');
    }

    confirm() {
        const { handleEdit } = this.props;

        handleEdit(null, 'body');
    }

    updateBodyValue(newValue) {
        const {
            body,
            updateContent,
        } = this.props;

        updateContent('body', { value: newValue, type: body.type, purpose: body.purpose, _temp_id: body._temp_id }, body._temp_id);
    }

    delete() {
        const {
            body,
            handleDelete,
        } = this.props;

        handleDelete('body', body._temp_id);
    }

    editing() {
        const {
            body,
            edit,
        } = this.props;

        return body._temp_id == edit;
    }

    renderSwitch() {
        const { body } = this.props;

        switch(body.type) {
            case 'describing':
                return (
                    <MetadataCreatorItem
                        handleChange={this.handleChange}
                        id={`${metadata}-creator`}
                        value={metadata.value}
                    />
                );
            default:
                return null;
        }
    }

    renderTag() {
        const {
            body,
            windowId,
        } = this.props;

        const edit = this.editing();

        return (
            <Chip
                label={
                    edit
                    ? (
                        <AnnotationTextFieldItem
                            key={`${body._temp_id}-TextFieldItem`}
                            updateValue={this.updateBodyValue}
                            value={body.value}
                            windowId={windowId}
                        />
                    )
                    : (body.value ? body.value : 'n.a.')
                }
                variant={edit ? "default" : "outlined"}
                color={edit ? "primary" : undefined}
                onClick={() => edit ? null: this.edit()}
                deleteIcon={edit ? <Check /> : <DeleteIcon />}
                onDelete={() => edit ? this.confirm() : this.delete()}
            />
        )
    }

    renderTextField() {
        const {
            body,
            classes,
            windowId,
        } = this.props;

        const edit = this.editing();

        return (
            <ListItem className={classes.editAnnotationListItem} divider>
                <Grid container spacing={1}>
                    <Grid item xs={8}>
                        <ListItemText
                            style={{ lineHeight: '1rem' }}
                            primary={
                                edit
                                ? (
                                    <AnnotationTextEditorItem
                                        key={`${body._temp_id}-TextEditorItem`}
                                        updateValue={this.updateBodyValue}
                                        value={body.value}
                                        windowId={windowId}
                                    />
                                )
                                : (body.value ? ReactHtmlParser(body.value) : 'no text')
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
            </ListItem>

        )
    }

    render() {
        const { body } = this.props;

        return (
            <>
                {(() => {
                    switch(body.purpose) {
                        case 'tagging':
                            return this.renderTag();
                        default:
                            return this.renderTextField();
                    }
                })()}
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
