import React from 'react';
import './Form.css';
import axios from 'axios';

class UploadForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedFile: null,
      status: null
    }
  }

  fileSelectedHandler = (event) => {
    this.setState({
      selectedFile: event.target.files[0]
    })
    try {
      this.setState({
        status: event.target.files[0].name
      })
      if (event.target.files[0].type === 'image/jpeg') {
        const reader = new FileReader();
        const preview = document.getElementById('imageToUpload');
        reader.onloadend = () => {
          preview.src = reader.result;
        }
        reader.readAsDataURL(event.target.files[0]);
      }
    } catch (error) {
      this.setState({
        status: 'Please pick an image'
      })
    }


  }

  fileUploadHandler = (id) => {
    const token = window.localStorage.getItem('token');
    const { getProfileImage } = this.props;
    if (this.state.selectedFile !== null && token) {

      try {
        this.setState({
          status: 'Loading..'
        })
        const formData = new FormData();
        formData.append('profileImage', this.state.selectedFile, `${id}.jpg`)
        axios.post(`http://localhost:3000/upload/${id}`, formData, {
          headers: {
            'Authorization': token
          }
        }, {
          onUploadProgress: progressEvent => {
            this.setState({
              status: 'Upload In Progress..'
            })
          }
        })
          .then((res) => {
            this.setState({
              status: 'Upload Completed!'
            })
            getProfileImage(id);
          })
          .catch(err => {
            this.setState({
              status: 'Upload Error! Only jpg/jpeg files are allowed.'
            })
          });
      } catch (error) {
        this.setState({
          status: 'Please pick an image.'
        })
      }

    }
    else {
      this.setState({
        status: 'Please pick an image.'
      })
    }

  }

  render() {
    const { toggleUploadModal, user } = this.props;
    return (
      <div className="upload-modal">
        <article className="br3 ba b--black-10 mv4 w-50 w-30-m w-25-l mw6 shadow-5 center bg-white">
          <main className="pa4 black-80 w-30">

            <div id='uploadForm'>
              <img id='imageToUpload' alt='preview'
                src='data:image/jpeg;base64,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' />
              <input
                style={{ display: 'none' }}
                type="file"
                accept="image/jpeg"
                onChange={this.fileSelectedHandler}
                ref={fileInput => this.fileInput = fileInput}
                name="profileImage" required />
              <button onClick={() => this.fileInput.click()}>Pick Image</button>
              <input type='submit' onClick={() => this.fileUploadHandler(user.id)} value='Upload' />
              <h5 id='status'>{this.state.status}</h5>
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