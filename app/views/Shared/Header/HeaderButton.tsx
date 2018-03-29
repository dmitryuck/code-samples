import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { Image } from 'semantic-ui-react';

import { AppState } from '../../../common';

interface State {
}

interface Props {
    app?: AppState;
    icon: string;
    href: string;
    dispatch?: Function;
}

const styles = {
    headerButtons: {
        width: '32px',
        height: '32px',
        cursor: 'pointer',
        display: 'inline-block',
        margin: '0 4px'
    }
};

@connect(state => ({
    app: state.appState
}), dispatch => ({
    dispatch: dispatch
}))
export class HeaderButton extends React.Component<Props, State> {
    constructor(props) {
        super(props);

        this.navigate = this.navigate.bind(this);
    }

    navigate() {
        let href = this.props.href;

        if (href === '/logout') {
            console.log('LOGGED OUT');
            href = '/';
        }

        this.props.dispatch(push(href));
    }

    render() {
        const { dispatch, href, icon } = this.props;

        return (
            <div style={styles.headerButtons}>
                <Image onClick={this.navigate} src={icon} />
            </div>
        );
    }
}
