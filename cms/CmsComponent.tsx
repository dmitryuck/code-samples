import React from 'react';
import { Provider } from 'react-redux';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { cmsConfig } from './CmsConfig';
import { isBrowser } from '../glob';
import { Header, Footer, Body } from './views/Shared';
import { CmsActions } from './actions';
import { CmsRootState } from './common';

interface State {
}

interface Props {
    store: any;
    url?: string;
    target: string;
    history?: any;
    isBrowser?: Function;
    setConfig?: Function;
}

@connect((state: CmsRootState) => ({

}), dispatch => bindActionCreators({
    isBrowser: CmsActions.isBrowser,
    setConfig: CmsActions.setConfig,
}, dispatch))
export class CmsComponent extends React.Component<Props, State> {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        console.log('HELLO FROM CMS COMPONENT');

        this.props.setConfig(cmsConfig);
    }

    render() {
        const { store, url, target, history } = this.props;

        return (
            <Provider store={store}>
                <div>
                    <Header />
                    <Body target={target} url={url} history={history} />
                    <Footer />
                </div>
            </Provider>
        );
    }
}
