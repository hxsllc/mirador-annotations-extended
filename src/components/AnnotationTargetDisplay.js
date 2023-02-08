import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { OSDReferences } from 'mirador/dist/es/src/plugins/OSDReferences';
import { renderWithPaperScope, PaperContainer } from '@psychobolt/react-paperjs';
import { Point } from 'paper';
import flatten from 'lodash/flatten';
import { mapChildren } from '../utils';

class AnnotationTargetDisplay extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const { windowId } =this.props;
        this.OSDReference = OSDReferences.get(windowId);
    }

    paperThing() {
        const { svgs } = this.props;
        const viewportZoom = this.OSDReference.viewport.getZoom(true);
        const image1 = this.OSDReference.world.getItemAt(0);
        const center = image1.viewportToImageCoordinates(
            this.OSDReference.viewport.getCenter(true),
        );
        const flipped = this.OSDReference.viewport.getFlip();

        const viewProps = {
            center: new Point(center.x, center.y),
            rotation: this.OSDReference.viewport.getRotation(),
            scaling: new Point(flipped ? -1 : 1, 1),
            zoom: image1.viewportToImageZoom(viewportZoom),
        };
        return(
            <div style={{ height: '100%', left: 0, position: 'absolute', top: 0, width: '100%' }}>
                <PaperContainer canvasProps={{ style: { height: '100%', width: '100%' }}} viewProps={viewProps} >
                    {renderWithPaperScope((paper) => {
                        const paths = flatten(paper.project.layers.map((layer)=>(
                            flatten(mapChildren(layer)).map(aPath => aPath)
                        )));
                        if(svgs || paths.length ===0) {
                            if(Array.isArray(svgs)) {
                                svgs.forEach(svg => paper.project.importSVG(svg.value))
                            } else {
                                paper.project.importSVG(svgs.value);
                            }
                        }
                        paper.settings.handleSize = 10;
                        paper.settings.hitTolerance = 10;
                    })}
                </PaperContainer>
            </div>
        )
    }

    render() {
        const { windowId } = this.props;
        this.OSDReference = OSDReferences.get(windowId).current;
        return( ReactDOM.createPortal(this.paperThing(), this.OSDReference.element));
    }
}

export default AnnotationTargetDisplay;

