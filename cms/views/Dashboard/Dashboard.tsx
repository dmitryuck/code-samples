import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
// import { AppActions } from '../../actions';
// import { AuthThunk } from '../../thunks';
import { getRequest } from '../../../glob';
import { CmsState } from '../../common';

interface State {
    // loaded: boolean;
}

interface Props {
    // cms: CmsState
}

@connect(state => ({
    // cms: state.cmsState
}), dispatch => bindActionCreators({
    // isBrowser: AppActions.isBrowser,
    // localLogin: AuthThunk.localLogin
}, dispatch))
export class Dashboard extends React.Component<Props, State> {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
    }

    render() {
        return (
            <div>
                <h2>Dashboard works</h2>
            </div>
        );
    }
}
