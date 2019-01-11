document.addEventListener('DOMContentLoaded', function(){
  var vid = document.getElementById('cartoon');
  var cvs = document.getElementById('canvas');
  var ctx = cvs.getContext('2d');
  var back = document.createElement('canvas');
  var backcontext = back.getContext('2d')


  var cw, ch

  vid.addEventListener('play', function(){
    cw = vid.clientWidth;
    ch = vid.clientHeight;
    cvs.width = cw;
    cvs.height = ch;
    back.width = cw;
    back.height = ch;     
      draw(vid, ctx, backcontext, cw, ch);
  },false);
}, false);

function draw(v, ctx, bctx, cw, ch) {
  if(v.paused || v.ended) return false;
  // First, draw it into the canvas
  bctx.drawImage(v, 0, 0, cw, ch);

  // Grab the pixel data from the canvas
  var idata = bctx.getImageData(0,0,cw,ch);
 
  // Loop through the pixels, turning them grayscale
  for(var i = 0; i < idata.data.length; i+=4) {
      var r = idata.data[i];
      var g = idata.data[i+1];
      var b = idata.data[i+2];
      var brightness = (3*r+4*g+b)>>>3;
      idata.data[i] = brightness;
      idata.data[i+1] = brightness;
      idata.data[i+2] = brightness;
  }
  var kernel_x = [+1, 0, -1, +2, 0, -2, +1, 0, -1];
  var kernel_y = [+1, +2, +1, 0, 0, 0, -1, -2, -1];
  var data = [];
  convolution(data,idata.data,cw,kernel_x, kernel_y);

  for (var i = 0; i < idata.data.length; i++) {
            idata.data[i] = data[i];
}
  // Draw the pixels onto the visible canvas
  c.putImageData(idata,0,0);
  // Start over!
  setTimeout(function(){ draw(v,c,bc,w,h); }, 0);
}

function convolution(data, idata, w, kernel_x,kernel_y, opaque=true, threshold=0){

  var kernel_size = Math.sqrt(kernel_x.length); 
  var kernel_step = [-1, -1, -1,0,0,0,1,1,1];
  for(var i = 0; i < idata.length; i++) {
    //   if(i%4==3) continue;
      var alphaFac = opaque ? 1 : 0;

      var g_x = 0;
      var g_y = 0;

      for(var k = 0; k < kernel_x.length; k+=1) {    
        var widthstep = w*kernel_step[k]*4;
        var i_local = i + widthstep + kernel_step[k]*4;
        if(( i_local >= 0) && (i_local < idata.length)){
            var x = idata[i_local];
            var y_x = kernel_x[k];
            var y_y = kernel_y[k];
            g_x += x*y_x;
            g_y += x*y_y;
        }   
      } 
    g_x = Math.abs(g_x);
    g_y = Math.abs(g_y);
    if(i%4==3) {
        g_x += alphaFac * (255 - g_x);
        g_y += alphaFac * (255 - g_y);
    }
        
    var g = Math.sqrt(g_x*g_x + g_y*g_y);
    if(g > 255) {
        g = 255;
    }

    if(g < threshold) {
        g = 0;
    }
    data[i] = g;
      
  }
} 
