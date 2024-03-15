let inputUpload = document.getElementById('image_uploads');
let selectSection = document.querySelector('.select_section');
let cropSection = document.querySelector('.crop_section');
let cropCont = document.querySelector('.crop_cont');
let cropBtnSection = document.querySelector('.crop_btn_cont');
let backBtn = document.getElementById('back_btn');
let selectBtn = document.getElementById('select_btn');
let imageEl = document.getElementById('image');
let fileTypes = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/gif',
  'image/heic',
]
let cropImage
// let tg = window.Telegram.WebApp
// let queryId = tg.initDataUnsafe?.query_id

// console.log(queryId);
// 46.148.228.152:8000

function validFileType(file) {
  return fileTypes.includes(file.type)
}

function updateImageDisplay() {
  let curFile = inputUpload.files[0]

  if (validFileType(curFile)) {
    imageEl.src = URL.createObjectURL(curFile)
    imageEl.alt = image.title = curFile.name
    
    addToCroppie()
    selectSection.style.display = 'none'
    cropSection.style.display = 'block'
    cropCont.appendChild(cropBtnSection)
  } else {
    alert('File is not valid.')
  }
}

function addToCroppie() {
  cropImage = new Croppie(imageEl, {
    viewport: { width: 168, height: 168, type: 'circle' },
    boundary: { width: 306, height: 222 },
    showZoomer: true,
  });
}

inputUpload.addEventListener('change', updateImageDisplay)
backBtn.addEventListener('click', () => {
  selectSection.style.display = 'block'
  cropSection.style.display = 'none'
})
selectBtn.addEventListener('click', () => {
  cropImage.result({type: 'blob', size: 'viewport'})
    .then((result) => {
      // let imgEl = document.createElement('img')
      // imgEl.src = URL.createObjectURL(result)
      // cropCont.innerHTML = ''
      // cropCont.append(imgEl)
      // cropCont.classList.add('flex')

      const reader = new FileReader();
      reader.onload = function(event) {
        const base64Image = event.target.result;
        fetch('http://localhost:3000/submit', {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({image: base64Image, filename: 'cropped-image.png'})
        })
      }

      reader.readAsDataURL(result);
      // console.log(result);

      // const formData = new FormData();
      // formData.append('image', result, 'image.png')

      // console.log(formData);
      
      // fetch('http://localhost:3000/submit', {
      //   method: 'POST',
      //   headers: {'Content-Type': 'application/json'},
      //   body: JSON.stringify(formData)
      // })
    })
    .catch(error => console.log(error))
  
  // fetch('http://localhost:3000/submit', {
  //   method: 'POST',
  //   headers: {'Content-Type': 'application/json'},
  //   body: JSON.stringify({title: 'Hello, World!'})
  // })
})


// To convert a blob image in code to an image file like "image.png," you can follow these general steps:

// Decode the Blob: Convert the blob data into a format that represents the image.

// Save the Image: Write the decoded image data to a file with the desired format, such as PNG.

// Below is an example in JavaScript using a browser environment:

// Assume 'blob' is the Blob object containing the image data
// Assume 'fileName' is the desired name of the image file, e.g., 'image.png'

