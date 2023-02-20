import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ListItem, ListItemText } from '@material-ui/core';

class CustomListItem extends Component {

    render() {
        const {
            classes,
            primary,
            secondary,
            children,
            buttons
        } = this.props;

        return (
            <ListItem divider className={classes.container} {...this.props}>
                <div className={classes.main}>
                    <ListItemText primary={primary} secondary={secondary}/>
                    <div className={classes.buttons}>
                        {buttons}
                    </div>
                </div>
                <div className={classes.content}>
                    {children}
                </div>
            </ListItem>
        )
    }
}

export default CustomListItem;
