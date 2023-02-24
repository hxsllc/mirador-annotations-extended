import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Check } from '@material-ui/icons';
import DeleteIcon from '@material-ui/icons/DeleteForever';
import EditIcon from '@material-ui/icons/Edit';
import AnnotationTextEditorItem from '../containers/AnnotationTextEditorItem';
import AnnotationTextFieldItem from '../containers/AnnotationTextFieldItem';
import CustomListItem from '../containers/CustomListItem';
import CustomTag from '../containers/CustomTag';
import SanitizedHtml from 'mirador/dist/es/src/containers/SanitizedHtml';
import MiradorMenuButton from 'mirador/dist/es/src/containers/MiradorMenuButton';
import { Typography } from '@material-ui/core';

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

        updateContent('body', { value: newValue, type: body.type, purpose: body.purpose, _temp_id: body._temp_id, _temp_name: body._temp_name }, body._temp_id);
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

    renderTag() {
        const {
            body,
            windowId,
            t,
        } = this.props;

        const edit = this.editing();

        return (
            <CustomTag
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
                deleteIcon={<MiradorMenuButton aria-label={edit ? t('bodyBtn_confirm') : t('bodyBtn_delete')}> {edit ? <Check /> : <DeleteIcon />}</MiradorMenuButton>}
                onDelete={() => edit ? this.confirm() : this.delete()}
            />
        )
    }

    renderTextField() {
        const {
            body,
            classes,
            htmlSanitizationRuleSet,
            t,
            windowId,
        } = this.props;

        const edit = this.editing();

        return (
            <CustomListItem
                buttons={
                    <>
                        <MiradorMenuButton aria-label={edit ? t('bodyBtn_confirm') : t('bodyBtn_edit')} size="small" onClick={() => edit ? this.confirm() : this.edit()}>
                            {
                                edit
                                ? <Check />
                                : <EditIcon />
                            }
                        </MiradorMenuButton>
                        <MiradorMenuButton aria-label={t('bodyBtn_delete')} size="small" onClick={this.delete}>
                            <DeleteIcon />
                        </MiradorMenuButton>
                    </>
                }
                primary={body._temp_name}
            >
                {
                    edit
                    ? (
                        <AnnotationTextEditorItem
                            key={`${body._temp_id}-TextEditorItem`}
                            updateValue={this.updateBodyValue}
                            value={body.value}
                            windowId={windowId}
                        />
                    )
                    : (body.value ? <Typography color="textSecondary" variant="body2"><SanitizedHtml ruleSet={htmlSanitizationRuleSet} htmlString={body.value} /></Typography> : '')
                }
            </CustomListItem>
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
