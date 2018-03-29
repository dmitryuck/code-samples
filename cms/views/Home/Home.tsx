import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getRequest, ServerApi } from '../../../glob';
import { CmsState } from '../../common';

interface State {
}

interface Props {
    cms?: CmsState;
}

@connect(state => ({
    // cms: state.cmsState
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
                <h2>Cms Home</h2>
            </div>
        );
    }
}
