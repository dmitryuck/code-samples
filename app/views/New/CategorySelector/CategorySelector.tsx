import React from 'react';
import { Category } from '../../../../glob';

interface State {
    firstLevelCategories: Category[];
    secondLevelCategory: Category[];
    thirdLevelCategory: Category[];
}

interface Props {
    categories: Category[];
    onCategorySelect: Function;
}

export class CategorySelector extends React.Component<Props, State> {
    constructor(props) {
        super(props);

        this.state = {
            firstLevelCategories: [],
            secondLevelCategory: [],
            thirdLevelCategory: []
        };
    }

    componentDidMount() {
        const categories = this.props.categories;

        if (categories) {
            this.getLevelCategories(null);
        }
    }

    getLevelCategories(category: Category) {
        const categories = this.props.categories;

        if (!category) {
            this.setState({
                firstLevelCategories: categories.filter(cat => cat.path.length === 0),
                secondLevelCategory: [],
                thirdLevelCategory: []
            });
            return;
        }

        switch (category.path.length) {
            case 0: {
                this.setState({
                    secondLevelCategory: categories.filter(cat => cat.path[cat.path.length - 1] === category.index),
                    thirdLevelCategory: []
                });
                break;
            }
            case 1: {
                this.setState({
                    thirdLevelCategory: categories.filter(cat => cat.path[cat.path.length - 1] === category.index)
                });
                break;
            }
            case 2: {
                this.props.onCategorySelect(category);
                break;
            }
        }
    }

    drawLevelCategories = (categories: Category[]) => {
        return categories.map((category: Category, index: number) => {
            return (
                <li key={index} onClick={this.getLevelCategories.bind(this, category)}>{category.name}</li>
            );
        });
    };

    render() {
        const {firstLevelCategories, secondLevelCategory, thirdLevelCategory} = this.state;
        const {categories} = this.props;

        return(
            <div className='category-selector-container'>
                <ul className='category-selector-level'>{this.drawLevelCategories(firstLevelCategories)}</ul>
                <ul className='category-selector-level'>{this.drawLevelCategories(secondLevelCategory)}</ul>
                <ul className='category-selector-level'>{this.drawLevelCategories(thirdLevelCategory)}</ul>
            </div>
        );
    }
}
