const PolarClock = (() =>{
  const canvas = document.querySelector('#myCanvas');
  const ctx = canvas.getContext('2d');

  const clock = [];

  let days = { 1:'Sunday', 2:'Monday', 3:'Tuesday', 4:'Wednesday', 5:'Thursday', 6:'Friday', 7:'Saturday' };
  let months = { 1:'January', 2:'February', 3:'March', 4:'April', 5:'May', 6:'June', 7:'July', 8:'August', 9:'September', 10:'October', 11:'November', 12:'December' };

  const canvasCords = () => {
    const width = 600;
    const height= 600;

    const xCenter = width / 2;
    const yCenter = height / 2;
    
    const top = ((height / 2) - height);
    const left = ((width / 2) - width);
    const right = (width / 2);
    const bottom = (height / 2);

    return { width, height, top, bottom, left, right, xCenter, yCenter };
  };

  const reset = () => {
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, canvasCords().width, canvasCords().height);
  };

  const time = () => {
    let now = new Date();
    let seconds = now.getSeconds();
    let milliseconds = now.getMilliseconds();
    let minutes = now.getMinutes();
    let hours = now.getHours();
    let day = now.getDay() + 1;
    let date = now.getDate();
    let dateFull = days[date];
    let month = now.getMonth() + 1;
    let monthFull = months[month];

    return {
      now, seconds, milliseconds, minutes, hours, day, date, dateFull, month, monthFull
    }
  };

  const drawText = () => {
    let fontSize = canvasCords().width - (canvasCords().width * .95);
    console.log(fontSize);

    // take font size into consideration    
    let top = canvasCords().top + (fontSize - (fontSize * .25));
    let right = canvasCords().right - (fontSize - (fontSize * .50));

    ctx.save();
    ctx.fillStyle = "#fff";
    ctx.translate(canvasCords().xCenter, canvasCords().yCenter);
    ctx.font= `${fontSize}px Arial Rounded MT Bold`;

    // value, x -300 is top, y -300 is top
    // ctx.fillText('Time: ' + time().now , -290, y-y-280);
    // ctx.fillText('Seconds: ' + time().seconds, -290, -260);
    // ctx.fillText('Minutes: ' + time().minutes, -290, -240);
    // ctx.fillText('Hours: ' + time().hours, -290, -220);
    // ctx.fillText(`Day: ${time().day} (${days[time().day]})`, -290, -200);
    // ctx.fillText('Day of Month: ' + time().date, -290, -180);
    // ctx.fillText(`Month: ${time().month} (${time().monthFull})`, -290, -160);

    // ctx.font = "12px Arial"
    // ctx.fillText("seconds", left, bottom);
    // ctx.fillText("minutes", 252, 63);
    // ctx.fillText("hours", 264, 98);
    // ctx.fillText("day", 274, 134);
    // ctx.fillText("date", 270, 168);
    // ctx.fillText("month", 260, 203);

    // document.querySelector('#myCanvas').title = time().seconds;
    
    ctx.fillText(time().seconds, 0 - (fontSize / 2), 0 + (fontSize / 4));
    ctx.restore();
  };

  const setupClock = () => {

  };

  const drawArc = (x, y, radius, start, end, color) => {
    ctx.lineWidth = canvasCords().width - (canvasCords().width * .975);
    ctx.lineCap = 'round';

    ctx.beginPath();
    ctx.strokeStyle = "hsla(" + (end *(180 / Math.PI) + color) + ",60%,50%,1)";
    ctx.arc(x, y, radius, start, end, false);
    ctx.stroke();
  };

  const draw = () => {
    let usr_color = 160;
    let xCenter = canvasCords().xCenter;
    let yCenter = canvasCords().yCenter;
    let radius = (canvasCords().width / 2) * .9;
    let angleStart = (Math.PI/(2/3));
    let angleEnd = '';

    reset();
    time();

    drawText(xCenter, yCenter);
    
    // seconds
    angleEnd = ((time().seconds/60)*(Math.PI*2) - (Math.PI/2)) + ((time().milliseconds/60000)*(Math.PI*2));
    drawArc(xCenter, yCenter, radius, angleStart, angleEnd, usr_color);

    // minutes
    angleEnd = ((time().minutes/60)*(Math.PI*2) - (Math.PI/2)) + ((time().seconds/3600)*(Math.PI*2));
    drawArc(xCenter, yCenter, radius - (radius * .1), angleStart, angleEnd, usr_color - 10);

    // hours
    angleEnd = ((time().hours/24)*(Math.PI*2) - (Math.PI/2)) + ((time().minutes/3600)*(Math.PI*2));
    drawArc(xCenter, yCenter, radius - (radius * .2), angleStart, angleEnd, usr_color - 20);

    // day
    angleEnd = ((time().day/7)*(Math.PI*2) - (Math.PI/2));
    drawArc(xCenter, yCenter, radius - (radius * .4), angleStart, angleEnd, usr_color - 30);

    // date
    angleEnd = ((time().date/31)*(Math.PI*2) - (Math.PI/2));
    drawArc(xCenter, yCenter, radius - (radius * .5), angleStart, angleEnd, usr_color - 40);

    // month
    angleEnd = ((time().month/12)*(Math.PI*2) - (Math.PI/2));
    drawArc(xCenter, yCenter, radius - (radius * .6), angleStart, angleEnd, usr_color - 50);
  };

  // public methods
  return {
    init: () => {
      console.log(canvasCords());
      canvas.width = canvasCords().width;
      canvas.height = canvasCords().height;
      
      setInterval(draw, 1000);
    }
  }
 })();

 PolarClock.init();