import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Album } from '@material-ui/icons';

import { getNameByValue } from '../../utils/category-util';

import './annotationitem.css'

class AnnotationItem extends Component {
    /** */
    constructor(props) {
        super(props);

        const { item } = this.props;

        this.state = {
            isFocused: false
        };

        this.my_refs = {};

        this.handleClick = this.handleClick.bind(this);
        this.handleHover = this.handleHover.bind(this);
        this.focusById = this.focusById.bind(this);

        let category = "";
        if (item != null && item.category != null) {
            let categoryCnt = item.category.length;
            let cnt = 0;
            for (let i = 0; i < categoryCnt; i++) {
                if (item.category[i].checked) {
                    if (cnt > 0)
                        category += ", ";
                    category += getNameByValue(item.category[i].value);
                    cnt ++;
                }
            }
        }

        this.state = {
            category: category
        };
    }

    /** */
    handleClick() {
        const { addCompanionWindow, selectAnnotation, item, viewAnnotationDetail } = this.props;

        if (viewAnnotationDetail) {
            addCompanionWindow('annotationDetailViewer', {
                annotationid: item?.id,
                position: 'right'
            })
        }

        selectAnnotation(item?.id);

        this.focusById(`annotationCard${item.id}`);
    }

    handleHover(isHover) {
        const { hoverAnnotation, item } = this.props;

        if (isHover) {
            hoverAnnotation([item?.id]);
        } else {
            hoverAnnotation([]);
        }
    }

    focusById(id) {
        let myRef = this.my_refs[id];
        if (myRef) {
            console.log('focusing on ', id, myRef);
            myRef.focus();
        }
    }

    /** */
    render() {
        const { item, viewAnnotationDetail } = this.props;
        const { isFocused, category } = this.state;

        return <>
            <div
                id={`annotationCard${item.id}`}
                className={`annotation-item-card ${isFocused ? `annotation-item-card-open` : ``}`}
                ref={(input) => this.my_refs[`annotationCard${item.id}`] = input}
                onClick={() => this.handleClick()}
                onMouseEnter={() => this.handleHover(true)}
                onMouseLeave={() => this.handleHover(false)}
                disabled={!viewAnnotationDetail}>
                <div className='header'>
                    <Album />
                    <span className='title'>{category}</span>
                </div>
                <main>
                    {
                        item?.body?.map(body => (
                            body?.purpose == "describing" && <div className='format-html' dangerouslySetInnerHTML={{ __html: body?.value }}></div>
                        ))
                    }
                </main>
            </div>
        </>;
    }
}

AnnotationItem.propTypes = {
    addCompanionWindow: PropTypes.func.isRequired,
    switchToSingleCanvasView: PropTypes.func.isRequired,
    viewAnnotationDetail: PropTypes.bool.isRequired
}

export default AnnotationItem;