import React from 'react';
import {
    Route as ServerRoute,
    Switch as ServerSwitch,
    StaticRouter,
    Router as ServerRouter
} from 'react-router';
import {
    Route as BrowserRoute,
    Switch as BrowserSwitch
} from 'react-router-dom';
import {
    ConnectedRouter
} from 'react-router-redux';
import { Config } from '../glob';
import {
    Home,
    Dashboard,
    Categories,
    Lots
} from './views';

interface State {

}

interface Props {
    url?: string;
    history?: any;
    target: string;
}

let RoutesData = [
    { path: '/', component: Dashboard, exact: true },
    { path: '/dashboard', component: Dashboard, exact: false },
    { path: '/categories', component: Categories, exact: false },
    { path: '/lots', component: Lots, exact: false }
];

export class CmsRoutes extends React.Component<Props, State> {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
    }

    initRoutesData() {
        RoutesData = RoutesData.map(route => {
            route.path = Config.cmsRoot + route.path;
            return route;
        });
    }

    createRoutes(target) {
        switch (target) {
            case 'server': {
                return (
                    <StaticRouter location={this.props.url} context={{}}>
                        <ServerSwitch>
                            {RoutesData.map((route, index) =>
                                <ServerRoute path={route.path} component={route.component} exact={route.exact} key={index}/>)}
                        </ServerSwitch>
                    </StaticRouter>
                );
            }
            case 'browser': {
                return (
                    <ConnectedRouter history={this.props.history}>
                        <BrowserSwitch>
                            {RoutesData.map((route, index) =>
                                <BrowserRoute path={route.path} component={route.component} exact={route.exact} key={index}/>)}
                        </BrowserSwitch>
                    </ConnectedRouter>
                );
            }
        }
    }

    render() {
        this.initRoutesData();

        return (<>{this.createRoutes(this.props.target)}</>);
    }
}
