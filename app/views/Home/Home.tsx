import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getRequest, ServerApi } from '../../../glob';
import { AppState } from '../../common';

interface State {
}

interface Props {
    app?: AppState
}

@connect(state => ({
    app: state.appState
}), dispatch => bindActionCreators({
}, dispatch))
export class Home extends React.Component<Props, State> {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
    }

    render() {
        return (
            <div>
                <h2>App Home</h2>
            </div>
        );
    }
}
