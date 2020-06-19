import React from 'react';
import './Form.css';

class UploadForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false
    }
  }
  // function performs If condition when called second time
  isUploaded = () => {
    if (this.state.loaded) {
      setTimeout(() => {
        this.props.toggleUploadModal();
        window.location.reload(false);
      }, 3000)
    }
    this.setState({
      loaded: true
    })
  }

  render() {
    const { toggleUploadModal, user } = this.props;
    return (
      <div className="upload-modal">
        <article className="br3 ba b--black-10 mv4 w-50 w-30-m w-25-l mw6 shadow-5 center bg-white">
          <main className="pa4 black-80 w-30">
            <form ref='uploadForm'
              id='uploadForm'
              action={`http://localhost:3000/upload/${user.id}`}
              method='post'
              encType="multipart/form-data">
              <input type="file" name="profileImage" required />
              <input type='submit' formTarget="upload" value='Upload' />
              <iframe id='uploadStatus' onLoad={this.isUploaded} name="upload" title="uploadStatus" frameBorder="0" scrolling="no"></iframe>
            </form>
          </main>
          <div
            className="modal-upload-close"
            onClick={toggleUploadModal}>&times;</div>
        </article>
      </div>
    )
  }
}

export default UploadForm;