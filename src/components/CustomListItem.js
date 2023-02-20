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
                    <ListItemText primary={primary} primaryTypographyProps={{ variant: 'body1' }} secondary={secondary} secondaryTypographyProps={{ variant: "body2" }}/>
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
