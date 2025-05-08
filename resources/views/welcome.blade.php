<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>testFlow</title>
    <!-- <link rel="icon" type="image/x-icon" href="{{ asset('favicon.ico') }}"> -->
    <link rel="icon" type="image/x-icon" href="{{ asset('favicon_blue.ico') }}">


    <!-- Bootstrap CSS CDN without integrity -->
    <!-- <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet" crossorigin="anonymous"> -->

    @vite(['resources/js/master.jsx', 'resources/css/app.css'])
    <!-- <base href="/" /> -->

</head>
<body>
    <div id="app"></div>

    <!-- Bootstrap JS and Popper.js CDN -->
    <!-- <script src="{{ asset('js/app.jsx') }}"></script> or vite if you use it -->

    <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.6/dist/umd/popper.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.min.js"></script>
</body>
</html>


