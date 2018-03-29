import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { CategoryThunks } from '../../../../thunks';
import { CategoryActions } from '../../../../actions';
import { ServerResponse } from '../../../../../glob';

interface State {
}

interface Props {
    addCategory?: Function;
    dispatch?: Function;
}

@connect(state => ({

}), dispatch => bindActionCreators({
    dispatch: dispatch,
    addCategory: CategoryThunks.addCategory
}, dispatch))
export class SortableHeader extends React.Component<Props, State> {
    constructor(props) {
        super(props);

        this.addCategory = this.addCategory.bind(this);
    }

    componentDidMount() {
    }

    transformCatsToShow(items: any[]): any[] {
        return items.map((cat, index) => {
            cat.id = cat.index;
            return cat;
        }).sort((a, b) => a.id - b.id);
    }

    addCategory() {
        this.props.addCategory().then((res: ServerResponse) => {
            if (res.success) {
                const categories = this.transformCatsToShow(res.data);
                this.props.dispatch(CategoryActions.setCategories(categories));
            }
        });
    }

    render() {
        return (
            <div className='sortable-header-container'>
                <button onClick={this.addCategory}>Add category</button>
            </div>
        );
    }
}
