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
import {
    Home,
    New,
    Lot,
    Lots,
    Deals,
    Favors,
    Nots,
    Sets
} from './views';

export interface TemplateProps {
    url?: string;
    history?: any;
    target: string;
}

const RoutesData = [
    { path: '/', component: Home, exact: true },
    { path: '/new', component: New, exact: false },
    { path: '/lot', component: Lot, exact: false },
    { path: '/lots/:bs', component: Lots, exact: false },
    { path: '/deals', component: Deals, exact: false },
    { path: '/favors', component: Favors, exact: false },
    { path: '/nots', component: Nots, exact: false },
    { path: '/sets', component: Sets, exact: false }
];

export class AppRoutes extends React.Component<TemplateProps, any> {

    constructor(props: any) {
        super(props);
    }

    componentDidMount() {
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
        return (this.createRoutes(this.props.target));
    }
}
