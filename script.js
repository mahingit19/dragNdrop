// declaring all variables for shorthand
const uploadButton = document.getElementById('uploadButton');
const fileInput = document.getElementById('fileInput');
const messageInput = document.getElementById('messageInput');
const preview = document.getElementById('preview');
const fileArray = [];

// for upload button to work as a input
uploadButton.addEventListener('click', function () {
    fileInput.click();
});

// for updating each changes
fileInput.addEventListener('change', handleFiles);

// for clipboard paste
messageInput.addEventListener('paste', handlePaste);

// adding styles when dragover
document.addEventListener('dragover', function (event) {
    event.preventDefault();
    document.querySelector('.chat-container').classList.add('drag-over');
});

// removing the files when drag leaves the area
document.addEventListener('dragleave', function () {
    document.querySelector('.chat-container').classList.remove('drag-over');
});

// when files dropped handle function will be called
document.addEventListener('drop', function (event) {
    event.preventDefault();
    document.querySelector('.chat-container').classList.remove('drag-over');
    handleFiles(event);
});

// making function for handiling the files
function handleFiles(event) {

    // if files dropped file should transfer to input
    const files = event.type === 'drop' ? event.dataTransfer.files : event.target.files;

    // for loop until the files end
    for (let i = 0; i < files.length; i++) {
        const file = files[i];

        // using file reader api
        const reader = new FileReader();

        // if reader loads function will execute
        reader.onload = function (e) {
            // a div will create inside parent
            const previewItem = document.createElement('div');
            previewItem.classList.add('preview-item');

            // an img tag will create and scr will set from files source
            const img = document.createElement('img');
            img.src = e.target.result;

            // for every img a remove button will generate and onclick it will remove from the input
            const removeButton = document.createElement('button');
            removeButton.textContent = 'Remove';
            removeButton.classList.add('remove-button');
            removeButton.addEventListener('click', function () {
                preview.removeChild(previewItem);
                fileArray.splice(fileArray.indexOf(file), 1);
                updateFileInput();
            });

            previewItem.appendChild(img);
            previewItem.appendChild(removeButton);
            preview.appendChild(previewItem);

            // files will be pushed inside the input
            fileArray.push(file);
            updateFileInput();
        };

        // it will read files path
        reader.readAsDataURL(file);
    }
}

// this fucntion will work when clipboard paste happens
function handlePaste(event) {
    const items = (event.clipboardData || event.originalEvent.clipboardData).items;

    for (let i = 0; i < items.length; i++) {
        if (items[i].kind === 'file') {
            const file = items[i].getAsFile();
            const reader = new FileReader();

            reader.onload = function (e) {
                const previewItem = document.createElement('div');
                previewItem.classList.add('preview-item');

                const img = document.createElement('img');
                img.src = e.target.result;

                const removeButton = document.createElement('button');
                removeButton.textContent = 'Remove';
                removeButton.classList.add('remove-button');
                removeButton.addEventListener('click', function () {
                    preview.removeChild(previewItem);
                    fileArray.splice(fileArray.indexOf(file), 1);
                    updateFileInput();
                });

                previewItem.appendChild(img);
                previewItem.appendChild(removeButton);
                preview.appendChild(previewItem);

                fileArray.push(file);
                updateFileInput();
            };

            reader.readAsDataURL(file);
        }
    }
}

// transfering dataTransfer files into input tag
function updateFileInput() {
    const dataTransfer = new DataTransfer();
    
    fileArray.forEach(file => {
        dataTransfer.items.add(file);
    });
    
    fileInput.files = dataTransfer.files;
}
