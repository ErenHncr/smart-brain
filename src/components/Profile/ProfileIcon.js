import React from 'react';
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';

class ProfileIcon extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      dropdownOpen: false
    }
  }

  toggle = () => {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }))
  }

  render() {
    return (
      <div className="pa4 tc" >
        <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
          <DropdownToggle
            tag="span"
            data-toggle="dropdown"
            aria-expanded={this.state.dropdownOpen}>
            <img
              id="avatar1"
              src="http://tachyons.io/img/logo.jpg"
              className="br-100 ba h3 w3 dib" alt="avatar" />
          </DropdownToggle>
          <DropdownMenu
            className="b--transparent shadow-5"
            style={{
              width: '240px',
              marginLeft: '-180px',
              marginTop: '-8px',
              backgroundColor: "rgba(255,255,255,0.5)",
              right: "0px !important"
            }}>
            <DropdownItem onClick={this.props.toggleModal}>View Profile</DropdownItem>
            <DropdownItem onClick={this.props.toggleUploadModal}>Upload Profile Image</DropdownItem>
            <DropdownItem onClick={() => this.props.onRouteChange('signout')}>Sign Out</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
    )
  }
}

export default ProfileIcon;