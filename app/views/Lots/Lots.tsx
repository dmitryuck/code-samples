import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { AppState } from '../../common';

interface State {
}

interface Props {
    app?: AppState;
    buySell: string;
}

@connect((state, ownProps) => ({
    app: state.appState,
    buySell: ownProps.match.params.bs
}), dispatch => bindActionCreators({

}, dispatch))
export class Lots extends React.Component<Props, State> {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
    }

    render() {
        return (
            <div>
                Lots works!
                <span>{this.props.app.location && this.props.app.location.pathname}</span>
            </div>
        );
    }
}
