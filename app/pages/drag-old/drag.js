import React from 'react';
import {Jumbotron, Button, Grid, Row, Col, ListGroup, ListGroupItem, PageHeader} from 'react-bootstrap';
import {extend, isString, isObject, isArray} from '../../scripts/toolbox.js';
import {SortableContainer, SortableElement, arrayMove} from 'react-sortable-hoc';

import {sprintf} from 'yow';
import {Letter} from '../../components/letter.js';
require('./drag.less');



const SortableItem = SortableElement(function({value}) {

	return <Letter size='2em' letter={value}></Letter>;
});



const SortableList = SortableContainer(function({items}){
	var nodes = items.map(function(value, index) {
		return (
			<SortableItem key={`item-${index}`} index={index} value={value} />
		);
	});

    return (
        <div>
            {nodes}
        </div>
    );

});



class SortableComponent extends React.Component {
    state = {
        items: 'ÄIIIPCDDNNNSLM'.split('')
		//['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5', 'Item 6']
    }
    onSortEnd = ({oldIndex, newIndex}) => {
        this.setState({
            items: arrayMove(this.state.items, oldIndex, newIndex)
        });
    };
    render() {
        return (
            <SortableList axis='x' items={this.state.items} onSortEnd={this.onSortEnd} />
        )
    }
}

/*
class Letter extends React.Component {

	constructor(...args) {
		super(...args);
	};

	render() {
		var style = {};
		var innerStyle = {};

		style.border = '0.12em solid hsl(212, 50% , 75%)';
		style.display = 'inline-block';
		style.borderRadius = '0.3em';
		style.width = '1.5em';
		style.height = '1.5em';
		style.fontSize = '30px';
		//style.fontSize = '150%';
		style.textAlign = 'center';
		//style.background = 'hsl(212,50%,90%)';
		style.margin = '0.1em 0.1em 0.1em 0.1em';

		innerStyle.position = 'relative';
		innerStyle.top = '50%';
		innerStyle.transform = 'translateY(-50%)';
		//innerStyle.color = 'hsl(212,50%,0%)';

		return(
			<div className='letter' style={style}>
				<div style={innerStyle}>
					{this.props.letter}
				</div>
			</div>
		);

	};
};
*/

class Word extends React.Component {

	constructor(...args) {
		super(...args);
	};

	render() {
		var style = {};

		var letters = this.props.word.split('');
		var nodes = [];

		letters.forEach(function(letter, index) {
			nodes.push(
				<Letter letter={letter} key={index}/>
			);
		});
		return(
			<div style={style}>
				{nodes}
			</div>
		);

	};
};

module.exports = class Page extends React.Component {


	constructor(...args) {

		super(...args);
	};




	render() {

		return (
			<Grid className='drag' style={{textAlign:'center'}}>
				<SortableComponent/>
				<Button >Spelregler</Button>

			</Grid>
		);
	}

};
