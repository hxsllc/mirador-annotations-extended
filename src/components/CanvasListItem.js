import React from 'react';
import PropTypes from 'prop-types';
import flatten from 'lodash/flatten';
import AnnotationActionsContext from '../AnnotationActionsContext';
import CanvasListItemTools from '../containers/CanvasListItemTools';

/** */
class CanvasListItem extends React.Component {

    constructor(props) {
        super(props);
    }

    editable() {
        const { annotationsOnCanvases, canvases } = this.context;
        const { annotationid } = this.props;
        const annoIds = canvases.map((canvas) => {
            if (annotationsOnCanvases[canvas.id]) {
                return flatten(Object.entries(annotationsOnCanvases[canvas.id]).map(([key, value], i) => {
                    if (value.json && value.json.items) {
                        return value.json.items.map((item) => item.id);
                    }
                    return [];
                }));
            }
            return [];
        });
        return flatten(annoIds).includes(annotationid);
    }

    render() {
        const { children, t } = this.props;
        return (
            <div>
                {this.editable() && (<CanvasListItemTools {...this.props} />)}
                <li
                    {...this.props} // eslint-disable-line react/jsx-props-no-spreading
                >
                    {children}
                </li>
            </div>
        );
    }
}

CanvasListItem.propTypes = {
    annotationid: PropTypes.string.isRequired,
    children: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.node,
    ]).isRequired,
    t: PropTypes.func,
};

CanvasListItem.contextType = AnnotationActionsContext;

export default CanvasListItem;
