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

  checkItem = e => {
    const { itemChecked } = this.state; 
    var checkboxes = document.getElementsByName('camera-checkbox');
    let selected = e.target.value;
    if (selected === 'select-all') {
     let output = {};
     for (let i = 0; i < checkboxes.length; i++) {
        checkboxes[i].checked = true; 
        output[checkboxes[i].value] = true; 
     }
     console.log('output', output); 
     this.setState({ itemChecked: output });
    } else if (selected === 'clear') {
      for (let i = 0; i < checkboxes.length; i++) {
        checkboxes[i].checked = false; 
      }
      this.setState({ itemChecked: {} })
    } else {
      itemChecked[selected] = e.target.checked;
      this.setState({ itemChecked }); 
    }
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

    return (
      <>
      <div className="buttons">
        <button value="select-all" className="select-all" onClick={this.checkItem}>Select All</button>
        <button value="clear" className="clear" onClick={this.checkItem}>Clear</button>
      </div>
        {cameras.map((item, index) =>
            <Checkbox camera={item} key={index} checkItem={this.checkItem} />
        )}
      </>
    )
  };

  render() {
    console.log('checklist', this.state.itemChecked);
    const { photos } = this.props;
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