import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Segment, Container, Grid, Form, TextArea, Button, Image } from 'semantic-ui-react';
import { AppThunks, LotThunks } from '../../thunks';
import { AppActions } from '../../actions';
import { isBrowser, Category, ServerResponse } from '../../../glob';
import { AppRootState, AppState, AuthState, transformCatsToShow } from '../../common';
import { CategorySelector } from './CategorySelector';

interface State {
    categorySelectorShow: boolean;
    lotCategory: Category;
    lotCaption: string;
    lotDescription: string;
    lotPrice: number;
    lotImage: any;
}

interface Props {
    app?: AppState;
    auth?: AuthState;
    dispatch?: Function;
    getCategories?: Function;
    addLot?: Function;
}

@connect((state: AppRootState) => ({
    app: state.appState,
    auth: state.authState
}), dispatch => bindActionCreators({
    dispatch: dispatch,
    getCategories: AppThunks.getCategories,
    addLot: LotThunks.addLot
}, dispatch))
export class New extends React.Component<Props, State> {
    constructor(props) {
        super(props);

        this.state = {
            categorySelectorShow: false,
            lotCategory: null,
            lotCaption: '',
            lotDescription: '',
            lotPrice: 0,
            lotImage: null
        };
    }

    componentDidMount() {
        if (isBrowser) {
            this.props.getCategories().then((res: ServerResponse) => {
                if (res.success) {
                    const categories = transformCatsToShow(res.data);
                    this.props.dispatch(AppActions.setCategories(categories));
                }
            });
        }
    }

    formSubmit = () => {
        const {lotCaption, lotDescription, lotCategory, lotPrice} = this.state;

        const lot = {
            userId: this.props.auth.user._id,
            caption: lotCaption,
            description: lotDescription,
            categoryId: 'lotCategory._id',
            price: lotPrice,
            photosIds: [],
            link: 'my-first-lot',
            myImage: this.state.lotImage
        };

        this.props.addLot(lot).then((res: ServerResponse) => {
            console.log(res);
        });
    }

    onCaptionChange = (e, {value}) => {
        this.setState({lotCaption: value});
    }

    onDescriptionChange = (e, {value}) => {
        this.setState({lotDescription: value});
    }

    onPriceChange = (e, {value}) => {
        this.setState({lotPrice: value});
    }

    onImageChange = (e) => {
        const selectorFiles = e.target.files;
        console.log(e.target.value);
        this.setState({lotImage: selectorFiles});
        
        const fileReader = new FileReader();
        fileReader.readAsDataURL(selectorFiles[0]);
        fileReader.onload = (evt: any) => {
            // this.setState({lotImage: evt.target.result});
        };
    }

    onCategorySelect = (category) => {
        this.setState({lotCategory: category});
        this.toggleCategorySelector();
    }

    toggleCategorySelector = () => {
        this.setState({categorySelectorShow: !this.state.categorySelectorShow});
    }

    render() {
        const {categorySelectorShow} = this.state;
        const {app} = this.props;

        return (
            <Segment>
                <Container>
                    <Grid columns={1}>
                        <Grid.Row>
                            <Grid.Column>
                                <Form error={true}>
                                    <Form.Input label='Caption'
                                                placeholder='Caption'
                                                onChange={this.onCaptionChange} />
                                    <Grid columns='equal'>
                                        <Grid.Row>
                                            <Grid.Column width={4}>
                                                <div className='category-selector-section'>
                                                    <Button className='category-selector-button'
                                                            onClick={this.toggleCategorySelector}
                                                            basic>Category
                                                    </Button>
                                                    {categorySelectorShow && <CategorySelector categories={app.categories}
                                                                                               onCategorySelect={this.onCategorySelect}/>}
                                                </div>
                                            </Grid.Column>

                                            <Grid.Column width={2}>
                                                <Form.Input onChange={this.onPriceChange} placeholder='Price' />
                                            </Grid.Column>

                                            <Grid.Column width={6}>
                                                <Image id='uploadPreview' src={this.state.lotImage} size='small' />
                                                <Form.Input onChange={this.onImageChange} type='file' />
                                            </Grid.Column>
                                        </Grid.Row>
                                    </Grid>
                                    <TextArea style={{ minHeight: 400 }}
                                              placeholder='Description'
                                              onChange={this.onDescriptionChange} />
                                    <Button onClick={this.formSubmit} basic>Create</Button>
                                </Form>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Container>
            </Segment>
        );
    }
}
