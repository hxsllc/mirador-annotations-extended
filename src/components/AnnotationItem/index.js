import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Album } from '@material-ui/icons';

import './annotationitem.css'

class AnnotationItem extends Component {
    /** */
    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
        this.openAnnotationDetailCompanionWindow = this.openAnnotationDetailCompanionWindow.bind(this);
    }

    /** */
    handleClick() {
        this.openAnnotationDetailCompanionWindow();
    }

    /** */
    openAnnotationDetailCompanionWindow(e) {
        const { addCompanionWindow } = this.props;

        addCompanionWindow('annotationDetailViewer', {
            position: 'right'
        })
    }

    /** */
    render() {
        return <>
            <div className='annotation-item-card' onClick={() => this.handleClick()}>
                <div className='header'>
                    <Album />
                    <span className='title'>Story Arcs</span>
                </div>
                <main>
                    <div className='format-html'>
                        <p className='description'>Verzen over de heilige Audomarus, bisschop der MorinenVerzen over de heilige Audomarus, bisschop der MorinenVerzen over de heilige Audomarus, bisschop der MorinenVerzen over de heilige Audomarus, bisschop der MorinenVerzen over de heilige Audomarus, bisschop der Morinen.</p>
                    </div>
                </main>
            </div>
        </>;
    }
}

AnnotationItem.propTypes = {
    addCompanionWindow: PropTypes.func.isRequired,
    switchToSingleCanvasView: PropTypes.func.isRequired,
}

export default AnnotationItem;