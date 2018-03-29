import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getRequest, isBrowser, ServerResponse } from '../../../glob';
import { SortableTree } from './SortableTree';
import { CategoryThunks } from '../../thunks';
import { CategoryActions } from '../../actions';

interface State {
}

interface Props {
    dispatch?: Function;
    getCategories?: Function;
}

@connect(state => ({

}), dispatch => bindActionCreators({
    dispatch: dispatch,
    getCategories: CategoryThunks.getCategories
}, dispatch))
export class Categories extends React.Component<Props, State> {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        if (isBrowser) {
            this.props.getCategories().then((res: ServerResponse) => {
                if (res.success) {
                    const categories = this.transformCatsToShow(res.data);
                    this.props.dispatch(CategoryActions.setCategories(categories));
                }
            });
        }
    }

    transformCatsToShow(items: any[]): any[] {
        return items.map((cat, index) => {
            cat.id = cat.index;
            return cat;
        }).sort((a, b) => a.id - b.id);
    }

    render() {
        return (
            <div>
                <SortableTree />
            </div>
        );
    }
}
