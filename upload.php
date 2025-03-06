<?php
$uploadDir = 'uploads/';
$errors = [];
$uploadedFiles = [];

foreach ($_FILES['files']['name'] as $key => $name) {
    if ($_FILES['files']['error'][$key] == UPLOAD_ERR_OK && is_uploaded_file($_FILES['files']['tmp_name'][$key])) {
        $uniqueName = uniqid() . '-' . basename($name);
        $uploadFile = $uploadDir . $uniqueName;

        if (move_uploaded_file($_FILES['files']['tmp_name'][$key], $uploadFile)) {
            $uploadedFiles[] = $uniqueName;
        } else {
            $errors[] = "Failed to upload {$name}.";
        }
    } else {
        $errors[] = "No file uploaded or invalid file for {$name}.";
    }
}

if (count($uploadedFiles) > 0) {
    echo "Files successfully uploaded: " . implode(", ", $uploadedFiles);
} else {
    echo implode(", ", $errors);
}
?>
