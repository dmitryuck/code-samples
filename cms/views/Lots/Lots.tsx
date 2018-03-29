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
export class Lots extends React.Component<Props, State> {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
    }

    render() {
        return (
            <div>
                <h2>Lots</h2>
            </div>
        );
    }
}
