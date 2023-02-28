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
            <ListItem
                divider
                className={classes.container}
                {...this.props}
            >
                <div className={classes.main}>
                    <ListItemText
                        className={classes.lineText}
                        primary={primary}
                        primaryTypographyProps={{
                            variant: 'body1'
                        }}
                        secondary={secondary}
                        secondaryTypographyProps={{
                            variant: "body2"
                        }}
                    />
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

CustomListItem.propTypes = {
    buttons: PropTypes.node,
    children: PropTypes.node,
    classes: PropTypes.objectOf(PropTypes.string),
    primary: PropTypes.string,
    secondary: PropTypes.string,
}
CustomListItem.defaultProps = {
    buttons: null,
    children: null,
    classes: {},
    primary: '',
    secondary: '',
}

export default CustomListItem;
