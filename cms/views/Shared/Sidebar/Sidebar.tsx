import React from 'react';
import { Fragment } from 'react';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';
import { Menu, Label, Input, Dropdown, SemanticCOLORS } from 'semantic-ui-react';
import { sidebarData } from './SidebarData';
import { Config } from '../../../../glob';
import { CmsState } from '../../../common';

interface State {
}

interface Props {
    cms?: CmsState;
    dispatch?: Function;
}

@connect(state => ({
    cms: state.cmsState
}), dispatch => ({
    dispatch: dispatch
}))
export class Sidebar extends React.Component<Props, State> {
    state = { activeItem: sidebarData[0].text };

    constructor(props) {
        super(props);

        this.handleItemClick = this.handleItemClick.bind(this);
        this.handleDropdownClick = this.handleDropdownClick.bind(this);
    }

    componentDidMount() {
    }

    navigate(route: string) {
        if (route === '/logout') {
            console.log('LOGGED OUT');
            route = '/';
        }

        this.props.dispatch(push(Config.cmsRoot + route));
    }

    handleItemClick(e, { name, route }) {
        this.setState(() => ({ activeItem: name }));
        this.navigate(route);
    }

    handleDropdownClick(e, { href }) {
        console.log(href);
    }

    dropdownItem = (item) => (
        <Dropdown item text={item.text} pointing='left'>
            <Dropdown.Menu>
                {item.child.map((child, childIndex) => (
                    child.icon ? (
                        <Dropdown.Item key={childIndex} icon={child.icon} text={child.text} route={item.href}
                                       onClick={this.handleDropdownClick}/>
                    ) : (
                        <Dropdown.Item key={childIndex} text={child.text}
                                       onClick={this.handleDropdownClick}/>
                    )
                ))}
            </Dropdown.Menu>
        </Dropdown>
    );

    menuItem = (item) => (
        <Menu.Item name={item.text} active={this.state.activeItem === item.text} route={item.href}
                   onClick={this.handleItemClick}>
            {item.color ? (
                <Label color={item.color as SemanticCOLORS}>1</Label>
            ) : (
                <Label>1</Label>
            )}
            {item.text}
        </Menu.Item>
    );

    sidebarMenu = () => (
        sidebarData.map((item, index) => {
            return (
                <Fragment key={index}>
                    {item.child ? this.dropdownItem(item) : this.menuItem(item)}
                </Fragment>
            );
        })
    )

    render() {
        const { activeItem } = this.state;

        return (
            <Menu size='large' vertical>
                {this.sidebarMenu()}
            </Menu>
        );
    }
}
