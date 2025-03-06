const uploadButton = document.getElementById('uploadButton');
const fileInput = document.getElementById('fileInput');
const messageInput = document.getElementById('messageInput');
const preview = document.getElementById('preview');
const fileArray = [];

uploadButton.addEventListener('click', function () {
    fileInput.click();
});

fileInput.addEventListener('change', handleFiles);

messageInput.addEventListener('paste', handlePaste);

document.addEventListener('dragover', function (event) {
    event.preventDefault();
    document.querySelector('.chat-container').classList.add('drag-over');
});

document.addEventListener('dragleave', function () {
    document.querySelector('.chat-container').classList.remove('drag-over');
});

document.addEventListener('drop', function (event) {
    event.preventDefault();
    document.querySelector('.chat-container').classList.remove('drag-over');
    handleFiles(event);
});

function handleFiles(event) {
    const files = event.type === 'drop' ? event.dataTransfer.files : event.target.files;

    for (let i = 0; i < files.length; i++) {
        const file = files[i];
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

function updateFileInput() {
    const dataTransfer = new DataTransfer();
    
    fileArray.forEach(file => {
        dataTransfer.items.add(file);
    });
    
    fileInput.files = dataTransfer.files;
}
