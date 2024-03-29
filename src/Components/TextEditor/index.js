import React, { Component } from "react";
import ReactQuill from "react-quill";
import Quill from "quill";
import "react-quill/dist/quill.snow.css";
import ImageResize from 'quill-image-resize-module-react'; // Add this line
import './index.css'
// Get the alignment attribute
let AlignStyle = Quill.import('attributors/style/align');

// Register the alignment style
Quill.register(AlignStyle, true);
Quill.register('modules/imageResize', ImageResize); // Add this line

class ImageUploader {
  constructor(quill, options) {
    this.quill = quill;
    this.options = options;
    this.handleImageUpload = this.handleImageUpload.bind(this);
    this.quill.getModule('toolbar').addHandler('image', this.handleImageUpload);
  }

  handleImageUpload() {
    let fileInput = document.createElement('input');
    fileInput.setAttribute('type', 'file');
    fileInput.click();

    fileInput.onchange = () => {
      let file = fileInput.files[0];
      this.options.upload(file).then((imageUrl) => {
        let range = this.quill.getSelection(true);
        this.quill.insertEmbed(range.index, 'image', imageUrl);
      });
    };
  }
}

Quill.register('modules/imageUploader', ImageUploader);

export default class CustomQuillEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: props.value || "", // Initialize editor state with the provided value
    };
    this.uploadImageCallBack = this.uploadImageCallBack.bind(this);
    this.modules = {
      toolbar: [
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        ["bold", "italic", "underline"],
        [{ list: "ordered" }, { list: "bullet" }],
        [{ align: ['', 'center', 'right', 'justify'] }], // updated
        ["link", "image"],
        ["clean"],
        [{ color: [] }],
      ],
      clipboard: {
        matchVisual: false,
      },
      imageUploader: {
        upload: this.uploadImageCallBack,
      },
      imageResize: {
        parchment: Quill.import('parchment'),
        modules: ['Resize', 'DisplaySize']
      }   
    };
    this.formats = [
      "header",
      "bold",
      "italic",
      "underline",
      "strike",
      "blockquote",
      "list",
      "bullet",
      "link",
      "indent",
      "image",
      "code-block",
      "color",
      "align"
    ];
  }
  componentDidMount() {
    // Use MutationObserver to detect changes in the DOM
    this.observer = new MutationObserver(() => {
      // Handle DOM changes here, if needed
    });
  
    if (this.editor) {
      this.observer.observe(this.editor, { childList: true, subtree: true });
    }
  }
  
  onContentChange = (content) => {
    this.setState({ editorState: content });
    if (this.props.onContentChange) {
      this.props.onContentChange(content);
    }
  };

  uploadImageCallBack(file) {
    let formData = new FormData();
    formData.append("image", file);

    return fetch("https://englishforum.zeabur.app/api/v1/file/upload", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.text())
      .then((link) => {
        return link;
      })
      .catch((error) => {
        console.error("Error uploading image:", error);
        // Handle error if needed
      });
  }

  render() {
    const { editorState } = this.state;
    return (
      <ReactQuill
        className="border border-black  "
        theme="snow"
        value={editorState}
        onChange={this.onContentChange}
        modules={this.modules}
        formats={this.formats}
       
      />
    );
  }
}
