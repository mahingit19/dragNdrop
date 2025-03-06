let filesArray = [];

//shorten the objects
const dropArea = document.getElementById('drop-area');
const fileInput = document.getElementById('file-input');

//prevent browser default behaviors
function preventDefaults(e) {
    e.preventDefault();
    e.stopPropagation();
}

//prevent defaults for dragging over a area
dropArea.addEventListener('dragover', preventDefaults);
dropArea.addEventListener('dragenter', preventDefaults);
dropArea.addEventListener('dragleave', preventDefaults);

//enhance UI when dropping
dropArea.addEventListener('dragover', () => {
    dropArea.classList.add('drag-over');
});

dropArea.addEventListener('dragleave', () => {
    dropArea.classList.remove('drag-over');
});

//file dropping handling
dropArea.addEventListener('drop', handleDrop);

function handleDrop(e) {
    e.preventDefault();

    //getting list of dragging files
    const files = e.dataTransfer.files;

    //check for files
    if (files.length) {
        //assinging files to hidden input
        fileInput.files = files;

        //process the files for preview
        handleFiles(files);
    }
}

function handleFiles(files) {
    for (const file of files) {
        //initializing fileReader API and reading the file
        const reader = new FileReader();
        reader.readAsDataURL(file);

        //if file loaded , fire the process
        reader.onloadend = function (e) {

            const fileDiv = document.createElement('div');
            fileDiv.className = 'file';

            const preview = document.createElement('img');

            if (isValidFileType(file)) {
                preview.src = e.target.result;
            }

            //apply the styles
            preview.classList.add('preview-image');
            const previewContainer = document.getElementById('preview-container');
            fileDiv.appendChild(preview);

            const removeBtn = document.createElement('button');
            removeBtn.className = 'remove-btn';
            removeBtn.textContent = 'X';
            removeBtn.onclick = function() {
                previewContainer.removeChild(fileDiv);
            };
            fileDiv.appendChild(removeBtn);

            previewContainer.appendChild(fileDiv);
        }
    }
}

//allowing files type
function isValidFileType(file) {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
    return allowedTypes.includes(file.type);
}


//allowing input from clipboard paste
document.getElementById('drop-area').addEventListener('paste', function(event) {
    const clipboardItems = event.clipboardData.items;
    for (const item of clipboardItems) {
        if (item.type.startsWith('image/')) {
            const file = item.getAsFile();
            handleFiles([file]);
        }
    }
});

document.getElementById('drop-area').addEventListener('input', function(event) {
    if (event.inputType === 'insertText' || event.inputType === 'insertParagraph') {
        event.preventDefault();
    }
});

document.getElementById('drop-area').addEventListener('click', function () {
    document.getElementById('file-input').click(function (item) {
        const file = item.getAsFile();
        handleFiles([file]);
    });
});
