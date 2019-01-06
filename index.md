<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>B52 Web App</title>
    <link rel="stylesheet" href="style.css">

    <script src="./tracking/tracking-min.js"></script>
    <script src="./tracking/data/face-min.js"></script>
  </head>
<body>  
  <div class="container">
    <div class="header">
      <h1>💣💣💣 B52 💣💣💣</h1>
    </div>
    <div class="buttons">
      <button id="glasses">Glass 😎</button>
      <button id="flower-crown">Flower crown 🌷</button>
      <button id="bunny-ears">Bunny ears 🐰</button> 
      <button id="party-mask">Party mask 🎭</button>     
    </div>      
    <a id="download" download="myImage.jpg" href="" onclick="download_img(this);">Take a photo 📷</a>
    <div class="webcam">
      <video id="video" width="500" height="375" preload autoplay loop muted></video>
      <canvas id="canvas" width="500" height="375"></canvas>
    </div>  
  </div>
  <script src="script.js"></script>    
</body>
</html>
