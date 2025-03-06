<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Drag and Drop File Upload</title>
    <link rel="stylesheet" href="styles.css">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
</head>
<body>
    <div class="chat-container">
        <div id="preview" class="preview"></div>
        <div class="input-container">
            <img src="profile-picture.png" alt="Profile Picture" class="profile-pic">
            <textarea id="messageInput" placeholder="Type a message..."></textarea>
            <form id="uploadForm" enctype="multipart/form-data">
                <input type="file" id="fileInput" name="files[]" multiple hidden required>
                <button id="uploadButton">Upload</button>
                <input type="submit" class="btn btn-success">
            </form>
        </div>
    </div>
    <script src="script.js"></script>
    <script src="jquery.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
</body>
</html>
