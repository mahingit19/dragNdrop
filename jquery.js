$(document).ready(function (e) {
    $('#uploadForm').on('submit', function(e) {
        e.preventDefault();
        var formData = new FormData(this);
        $.ajax({
            type: 'POST',
            url: 'upload.php',
            data: formData,
            contentType: false,
            processData: false,
            success: function(response) {
                alert(response);
            },
            error: function(response) {
                alert('Error: ' + response);
            }
        });
    });
});
