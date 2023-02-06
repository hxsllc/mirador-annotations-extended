import React, { Component } from 'react';
import PropTypes, { bool } from 'prop-types';
import { Editor, EditorState, RichUtils } from 'draft-js';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import BoldIcon from '@material-ui/icons/FormatBold';
import ItalicIcon from '@material-ui/icons/FormatItalic';
import { stateToHTML } from 'draft-js-export-html';
import { stateFromHTML } from 'draft-js-import-html';

class AnnotationTextEditorItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            editorState: EditorState.createWithContent(stateFromHTML(props.value ? props.value : '')),
        };

        this.onChange = this.onChange.bind(this);
        this.handleFormating = this.handleFormating.bind(this);
    }

    handleFormating(e, newFormat) {
        const { editorState } = this.state;
        this.onChange(RichUtils.toggleInlineStyle(editorState, newFormat));
    }

    onChange(editorState) {
        const { updateValue } = this.props;
        this.setState({ editorState });
        if (updateValue) {
            const options = {
                inlineStyles: {
                    BOLD: { element: 'b' },
                    ITALIC: { element: 'i' },
                },
            };
            //console.log(stateToHTML(editorState.getCurrentContent(), options).toString());
            updateValue(stateToHTML(editorState.getCurrentContent(), options).toString());
        }
    }

    render() {
        const { classes } = this.props;
        const { editorState } = this.state;
        const currentStyle = editorState.getCurrentInlineStyle();

        return (
            <div>
                <ToggleButtonGroup size="small" value={currentStyle.toArray()}>
                    <ToggleButton onClick={this.handleFormating} value="BOLD"><BoldIcon /></ToggleButton>
                    <ToggleButton onClick={this.handleFormating} value="ITALIC"><ItalicIcon /></ToggleButton>
                </ToggleButtonGroup>
                <div className={classes.editorRoot}>
                    <Editor editorState={editorState} onChange={this.onChange} />
                </div>
            </div>
        )
    }
}

AnnotationTextEditorItem.propTypes = {
    value: PropTypes.string,
    classes: PropTypes.shape({ editorRoot: PropTypes.string, }).isRequired,
    updateBodyValue: PropTypes.func,
};

AnnotationTextEditorItem.defaultProps = {
    value: '',
    updateBodyValue: () => {},
};

export default AnnotationTextEditorItem;
