import React from 'react';
import {
    Segment,
    Container,
    Grid as SemanticGrid
} from 'semantic-ui-react';
import { CmsRoutes } from '../../../CmsRoutes';
import { Sidebar } from '../Sidebar';
// import { Row, Col } from 'react-simple-flex-grid';
import {
    Box,
    Item
} from 'react-polymer-layout';

interface State {

}

interface Props {
    url?: string;
    target: string;
    history?: any;
}

const styles = {
    menu: {
        marginRight: '20px'
    },
    body: {
        display: 'flex'
    }
}

export class Body extends React.Component<Props, State> {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
    }

    render() {
        const { url, target, history } = this.props;

        return (
            <Segment>
                <Container fluid>
                    <SemanticGrid>
                        <SemanticGrid.Row>
                            <SemanticGrid.Column>
                                <Box horizontal style={styles.body}>
                                    <Item style={styles.menu}>
                                        <Sidebar />
                                    </Item>

                                    <Item flex>
                                        <Segment>
                                            <CmsRoutes target={target} url={url} history={history} />
                                        </Segment>
                                    </Item>
                                </Box>
                            </SemanticGrid.Column>
                        </SemanticGrid.Row>
                    </SemanticGrid>
                </Container>
            </Segment>
        );
    }
}
