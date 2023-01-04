import React from 'react';
import PropTypes from 'prop-types';
import DeleteIcon from '@material-ui/icons/DeleteForever';
import EditIcon from '@material-ui/icons/Edit';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import AnnotationActionsContext from '../AnnotationActionsContext';


/** */
class CanvasListItemTools extends React.Component {

    constructor(props) {
        super(props);

        this.handleDelete = this.handleDelete.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
    }

    handleDelete() {
        const { canvases, receiveAnnotation, storageAdapter } = this.context;
        const { annotationid } = this.props;
        canvases.forEach((canvas) => {
            const adapter = storageAdapter(canvas.id);
            adapter.delete(annotationid).then((annoPage) => {
                receiveAnnotation(canvas.id, adapter.annotationPageId, annoPage);
            });
        });
    }

    handleEdit() {
        const {
            addCompanionWindow, canvases, annotationsOnCanvases,
        } = this.context;
        const { annotationid } = this.props;
        let annotation;
        canvases.some((canvas) => {
            if (annotationsOnCanvases[canvas.id]) {
                Object.entries(annotationsOnCanvases[canvas.id]).forEach(([key, value], i) => {
                    if (value.json && value.json.items) {
                        annotation = value.json.items.find((anno) => anno.id === annotationid);
                    }
                });
            }
            return (annotation);
        });
        addCompanionWindow('annotationCreation', {
            annotationid,
            position: 'right',
        });
    }

    render() {
        const { t } = this.props;
        const { windowViewType, toggleSingleCanvasDialogOpen } = this.context;
        return (
            <div
                style={{
                    position: 'relative',
                    top: -20,
                    zIndex: 10000,
                }}
            >
                <ToggleButtonGroup
                    aria-label={t('canvasAnnotationTools')}
                    size="small"
                    style={{
                        position: 'absolute',
                        right: 0,
                    }}
                >
                    <ToggleButton
                        aria-label={t('canvasAnnotationToolsEdit')}
                        onClick={windowViewType === 'single' ? this.handleEdit : toggleSingleCanvasDialogOpen}
                        value="edit"
                    >
                        <EditIcon />
                    </ToggleButton>
                    <ToggleButton
                        aria-label={t('canvasAnnotationToolsDelete')}
                        onClick={this.handleDelete}
                        value="delete"
                    >
                        <DeleteIcon />
                    </ToggleButton>
                </ToggleButtonGroup>
            </div>
        );
    }
}

CanvasListItemTools.propTypes = {
    annotationid: PropTypes.string.isRequired,
    children: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.node,
    ]).isRequired,
    t: PropTypes.func,
};

CanvasListItemTools.contextType = AnnotationActionsContext;

export default CanvasListItemTools;
