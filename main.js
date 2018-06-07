 const PolarClock = (() =>{
   const canvas = document.querySelector('#myCanvas');
   const ctx = canvas.getContext('2d');
   const canvasWidth = 600;
   const canvasHeight = 600;

   const setUpCanvas = () => {
     canvas.width = canvasWidth;
     canvas.height = canvasHeight;
   };

   const reset = () => {
     ctx.fillStyle = '#fff';
     ctx.fillRect(0, 0, canvasWidth, canvasHeight)
   };

  // public methods
  return {
    init: () => {
      setUpCanvas();

      reset();
         
      
      ctx.arc(300,300,100,(Math.PI/(2/3)),1.5707963267948966,false)
      ctx.stroke();
    }
  }
 })();

 PolarClock.init();
 
//  let positions = { 7:0.285, 12:0.166, 24:0.083, 31:0.064, 60:0.033 };
//     let position7 = { 0:1.785, 1:0.07, 2:0.355, 3:0.64, 4:0.925, 5:1.21, 6:1.5 };
//     let position12 = { 0:-0.332, 1:-0.166, 2:0.0, 3:0.166,4:0.332, 5:0.5, 6:0.666, 7:0.832, 8:1.0, 9:1.116, 10:1.132, 11:1.5 };
//     let position24 = { 0:1.5, 1:1.583, 2:1.666, 3:1.749, 4:1.832, 5:1.915, 6: 0.0, 7:0.083, 8:0.166, 9:0.249, 10:0.332, 11:0.415, 12:0.5, 13:0.583, 14:0.666, 15:0.749, 16:0.832, 17:0.915, 18: 1.0, 19:1.083, 20:1.166, 21:1.249, 22:1.332, 23:1.415 };
//     let position31 = { 1:1.564, 2:1.628, 3:1.692, 4:1.756, 5:1.82, 6:1.884, 7:1.948, 8:0.012, 9:0.076, 10:0.14, 11:0.204, 12:0.268, 13:0.332, 14:0.396, 15:0.46, 16:0.524, 17:0.588, 18:0.652, 19:0.716, 20:0.78, 21:0.844, 22:0.908, 23:0.972, 24:1.036, 25:1.1, 26:1.164, 27:1.228, 28:1.292,29:1.356, 30:1.42, 31:1.5 };
//     let position60 = { 1:1.533, 2:1.566, 3:1.599, 4:1.632, 5:1.665, 6:1.698, 7:1.731, 8:1.764, 9:1.797, 10:1.83, 11:1.863, 12:1.896, 13:1.929, 14:1.962, 15:1.995, 16:0.028, 17:0.061, 18:0.094, 19:0.097, 20:0.13, 21:0.163, 22:0.196, 23:0.229, 24:0.262, 25:0.295, 26:0.328, 27:0.361, 28:0.394, 29:0.427, 30:0.46, 31:0.493, 32:0.526, 33:0.559, 34:0.592, 35:0.625, 36:0.658, 37:0.691, 38:0.694, 39:0.727, 40:0.76, 41:0.793, 42:0.826, 43:0.859, 44:0.892, 45:0.925, 46:0.958, 47:0.991, 48:1.024, 49:1.057, 50:1.09, 51:1.123, 52:1.156, 53:1.189, 54:1.222, 55:1.255, 56:1.288, 57:1.321, 58:1.354, 59:1.387, 60:1.5 };

//     let days = { 0:'Sunday', 1:'Monday', 2:'Tuesday', 3:'Wednesday', 4:'Thursday', 5:'Friday', 6:'Saturday' };
//     let months = { 0:'January', 1:'February', 2:'March', 3:'April', 4:'May', 5:'June', 6:'July', 7:'August', 8:'September', 9:'October', 10:'November', 11:'December' };

//     let now = new Date();
//     let seconds = now.getSeconds();
//     let minutes = now.getMinutes();
//     let hours = now.getHours();
//     let day = now.getDay();
//     let calendarDay = now.getDate();
//     let month = now.getMonth();
    
//     let html = `
//       now: ${ now }<br />
//       seconds: ${ seconds }<br />
//       minutes: ${ minutes }<br />
//       hours: ${ hours }<br />
//       day: ${ day } ${ days[day] }<br />
//       dayOfMonth: ${ calendarDay }<br />
//       month: ${ month } ${ months[month] }
//     `;
    
//     document.querySelector('.date').innerHTML = html;

//     let canvas = document.querySelector('#myCanvas');
//     let ctxSeconds = canvas.getContext('2d');
//     let ctxMinutes = canvas.getContext('2d');
//     let ctxHours = canvas.getContext('2d');
//     let ctxDays = canvas.getContext('2d');
//     let ctxDayofMonth = canvas.getContext('2d');
//     let ctxMonths = canvas.getContext('2d');

//     ctxSeconds.beginPath();
//     ctxSeconds.arc(300, 300, 275, 1.5*Math.PI, position60[seconds]*Math.PI);
//     ctxSeconds.lineWidth = 10;
//     ctxSeconds.lineCap = "round";
//     ctxSeconds.strokeStyle = 'purple';
//     ctxSeconds.stroke();

//     ctxMinutes.beginPath();
//     // ctxMinutes.arc(300, 300, 250, 1.5*Math.PI, position60[minutes]*Math.PI);
//     ctxSeconds.lineWidth = 10;
//     ctxSeconds.lineCap = "round";
//     ctxSeconds.strokeStyle = 'yellow';
//     ctxSeconds.stroke();

//     ctxHours.beginPath();
//     // ctxHours.arc(300, 300, 225, 1.5*Math.PI, position24[hours]*Math.PI);
//     ctxHours.lineWidth = 10;
//     ctxHours.lineCap = "round";
//     ctxHours.strokeStyle = 'green';
//     ctxHours.stroke();

//     ctxDayofMonth.beginPath();
//     // ctxDayofMonth.arc(300, 300, 150, 1.5*Math.PI, position31[calendarDay]*Math.PI);
//     ctxDayofMonth.lineWidth = 10;
//     ctxDayofMonth.lineCap = "round";
//     ctxDayofMonth.strokeStyle = 'red';
//     ctxDayofMonth.stroke();

//     ctxDays.beginPath();
//     // ctxDays.arc(300, 300, 125, 1.5*Math.PI, position7[day]*Math.PI);
//     ctxDays.lineWidth = 10;
//     ctxDays.lineCap = "round";
//     ctxDays.strokeStyle = 'orange';
//     ctxDays.stroke();

//     ctxMonths.beginPath();
//     // ctxMonths.arc(300, 300, 100, 1.5*Math.PI, position12[month]*Math.PI);
//     ctxMonths.lineWidth = 10;
//     ctxMonths.lineCap = "round";
//     ctxMonths.strokeStyle = 'blue';
//     ctxMonths.stroke();

//     function drawClock() {
//       console.log('tick');
//     };

//     window.setInterval(drawClock, 1000);