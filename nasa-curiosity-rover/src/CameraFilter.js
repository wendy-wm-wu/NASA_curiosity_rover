import React, { Component } from 'react';
import './style.css';
import Checkbox from './Checkbox';
import Card from './Card';

class CameraFilter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false,
      itemChecked: {},
    }
  }

  toggleExpanded = () => {
    const { expanded } = this.state;
    this.setState({
      expanded: !expanded,
    });
  };

  checkItem = (e, camera) => {
    console.log('onchange'); 
    let { itemChecked } = this.state; 
    itemChecked[camera] = e.target.checked;
    this.setState({
      itemChecked,
    });
  };

  renderSelected = () => {
    const { expanded, itemChecked } = this.state;
    const { cameras } = this.props;
    let labelContent = ''; 
    let count = 0;
    for (let boolean of Object.values(itemChecked)) {
      if (boolean) count++; 
    }
    if (count === 0) {
      labelContent = "0 Selected";
    } else if (count === cameras.length) {
      labelContent = `${cameras.length} Selected`;
    } else {
      labelContent = `${count} Selected`;
    }
    const activeClass = expanded ? "drop-down-expanded" : "";
    return (
      <button className={`drop-down-button ${activeClass}`} onClick={this.toggleExpanded}>
        <span>{labelContent}</span>
        <span className="drop-down-icon">▼</span>
      </button>
    );
  };

  renderDropDown = () => {
    const { cameras } = this.props; 

    return cameras.map((item, index) => {
      return (
        <Checkbox camera={item} key={index} checkItem={this.checkItem} />
      );
    });
  };

  render() {
    console.log('checklist', this.state.itemChecked);
    const { photos, cameras } = this.props;
    const { itemChecked } = this.state; 

    return(
      <div>
      <div className="new-drop-down" ref={wrapper => (this.wrapper = wrapper)}>
        {this.renderSelected()}
        {this.state.expanded && (
          <div className="drop-down-list-wrapper">
            {this.renderDropDown()}
          </div>
        )}
      </div>
      <div className="grid">
          {Object.keys(itemChecked).filter((item) => itemChecked[item] === true).map((camera, index) => <Card key={index} camera={camera} photos={photos} />)}
      </div>
      </div>
    );
  }
};

export default CameraFilter;