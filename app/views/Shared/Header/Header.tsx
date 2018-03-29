import React from 'react';
import {
    Segment,
    Container,
    Grid
} from 'semantic-ui-react';
import { HeaderButton } from './HeaderButton';
import { buttonsData } from './ButtonsData';

interface State {
}

interface Props {
}

export class Header extends React.Component<Props, State> {
    headerButtons = buttonsData.map((button, index) => (
        <HeaderButton key={index} icon={button.icon} href={button.href} />
    ));

    constructor(props) {
        super(props);
    }

    componentDidMount() {
    }

    render() {
        return (
            <Segment>
                <Container>
                    <Grid columns={2}>
                        <Grid.Row>
                            <Grid.Column verticalAlign='middle'>
                                <h1>AuxPlay</h1>
                            </Grid.Column>

                            <Grid.Column>
                                <Segment floated='right'>
                                    {this.headerButtons}
                                </Segment>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Container>
            </Segment>
        );
    }
}
