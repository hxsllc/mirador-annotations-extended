import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Album } from '@material-ui/icons';

import { getNameByValue } from '../../utils/category-util';

import './annotationitem.css'

class AnnotationItem extends Component {
    /** */
    constructor(props) {
        super(props);

        this.state = {
            isFocused: false
        };

        this.my_refs = {};

        this.handleClick = this.handleClick.bind(this);
        this.handleHover = this.handleHover.bind(this);
        this.getCategoryNames = this.getCategoryNames.bind(this)
    }

    /** */
    handleClick() {
        const { item, changeDetailWindow } = this.props;

        changeDetailWindow(item?.id);
    }

    handleHover(isHover) {
        const { hoverAnnotation, item } = this.props;

        if (isHover)
            hoverAnnotation([item?.id]);
        else
            hoverAnnotation([]);
    }

    getCategoryNames(item) {
        let category = "";
        if (item != null && item.category != null) {
            let categoryCnt = item.category.length;
            let cnt = 0;
            for (let i = 0; i < categoryCnt; i++) {
                if (item.category[i].checked) {
                    if (cnt > 0)
                        category += ", ";
                    category += getNameByValue(item.category[i].value);
                    cnt++;
                }
            }
        }

        return category;
    }

    /** */
    render() {
        const { item, viewAnnotationDetail } = this.props;
        const { isFocused } = this.state;

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
                    <span className='title'>{this.getCategoryNames(item)}</span>
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