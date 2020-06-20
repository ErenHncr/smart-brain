import React from 'react';
import './Form.css';
import axios from 'axios';

class UploadForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedFile: null
    }
  }

  fileSelectedHandler = (event) => {
    this.setState({
      selectedFile: event.target.files[0]
    })
    document.getElementById('status').innerHTML = event.target.files[0].name;
    console.log(event.target.files[0])

    if (event.target.files[0].type === 'image/jpeg') {
      const reader = new FileReader();
      const preview = document.getElementById('imageToUpload');
      reader.onloadend = function () {
        preview.src = reader.result;
      }
      reader.readAsDataURL(event.target.files[0]);
    }

  }

  fileUploadHandler = (id) => {
    const token = window.localStorage.getItem('token');
    const { getProfileImage } = this.props;
    if (this.state.selectedFile !== null && token) {
      document.getElementById('status').innerHTML = 'Loading..';
      const formData = new FormData();
      formData.append('profileImage', this.state.selectedFile, `${id}.jpg`)
      axios.post(`http://localhost:3000/upload/${id}`, formData, {
        headers: {
          'Authorization': token
        }
      }, {
        onUploadProgress: progressEvent => {
          document.getElementById('status').innerHTML = 'Upload In Progress..'
        }
      })
        .then((res) => {
          document.getElementById('status').innerHTML = "Upload Completed!";
          getProfileImage(id);
        })
        .catch(err => {
          document.getElementById('status').innerHTML = 'Upload Error!';
        });
    }
    else {
      document.getElementById('status').innerHTML = 'Please pick an image';
    }

  }

  render() {
    const { toggleUploadModal, user } = this.props;
    return (
      <div className="upload-modal">
        <article className="br3 ba b--black-10 mv4 w-50 w-30-m w-25-l mw6 shadow-5 center bg-white">
          <main className="pa4 black-80 w-30">

            <div id='uploadForm'>
              <img id='imageToUpload' alt='preview' />
              <input
                style={{ display: 'none' }}
                type="file"
                onChange={this.fileSelectedHandler}
                ref={fileInput => this.fileInput = fileInput}
                name="profileImage" required />
              <button onClick={() => this.fileInput.click()}>Pick Image</button>
              <input type='submit' onClick={() => this.fileUploadHandler(user.id)} value='Upload' />
              <h5 id='status'>.</h5>
            </div>
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