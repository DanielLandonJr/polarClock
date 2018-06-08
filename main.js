const PolarClock = (() =>{
  const canvas = document.querySelector('#myCanvas');
  const ctx = canvas.getContext('2d');
  let canvasSize = 0;

  const daysFull = { 1:'Sunday', 2:'Monday', 3:'Tuesday', 4:'Wednesday', 5:'Thursday', 6:'Friday', 7:'Saturday' };
  const daysShort = { 1:'Sun', 2:'Mon', 3:'Tue', 4:'Wed', 5:'Thu', 6:'Fri', 7:'Sat' };
  const monthsFull = { 1:'January', 2:'February', 3:'March', 4:'April', 5:'May', 6:'June', 7:'July', 8:'August', 9:'September', 10:'October', 11:'November', 12:'December' };
  const monthsShort = { 1:'Jan', 2:'Feb', 3:'Mar', 4:'Apr', 5:'May', 6:'Jun', 7:'Jul', 8:'Aug', 9:'Sep', 10:'Oct', 11:'Nov', 12:'Dec' };
  const dateST = [ 1, 21, 31 ];
  const dateND = [ 2, 22 ];
  const dateRD = [ 3, 23 ];

  const canvasCords = () => {
    // limit minimum size  
    if (canvasSize < 50) {
      canvasSize = 50;
    };

    const width = canvasSize;
    const height= canvasSize;

    const xCenter = width / 2;
    const yCenter = height / 2;
    
    // calculate positions for later use
    const top = ((height / 2) - height);
    const left = ((width / 2) - width);
    const right = (width / 2);
    const bottom = (height / 2);

    return { canvasSize, width, height, top, bottom, left, right, xCenter, yCenter };
  };

  const reset = () => {
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, canvasCords().width, canvasCords().height);
  };

  const time = () => {
    let now = new Date();
    
    // add leading 0 to seconds/minutes/hours if less than 10
    let seconds = now.getSeconds();
    if (seconds < 10) { seconds = '0' + seconds };
    let milliseconds = now.getMilliseconds();
    let minutes = now.getMinutes();
    if (minutes < 10) { minutes = '0' + minutes };
    let hours = now.getHours();
    if (hours < 10) { hours = '0' + hours };
    
    let day = now.getDay() + 1;
    let dayFull = daysFull[day];
    let dayShort = daysShort[day];

    let date = now.getDate();
    let dateFull = '';
    // add suffix to date
    if(dateST.includes(date)) { 
      dateFull = date + 'st';
    } else if(dateND.includes(date)) { 
      dateFull = date + 'nd';
    } else if(dateRD.includes(date)) { 
      dateFull = date + 'rd';
    } else {
      dateFull = date + 'th';
    };
    
    let month = now.getMonth() + 1;
    let monthFull = monthsFull[month];
    let monthShort = monthsShort[month];

    return {
      now, seconds, milliseconds, minutes, hours, day, dayFull, dayShort, date, dateFull, month, monthFull, monthShort
    }
  };

  const drawStaticText = () => {
    // scale font size based on canvas size, roughly 24 point at canvas size of 600
    let fontSize = canvasCords().canvasSize - (canvasCords().canvasSize * .96);

    let timeString = `${time().hours}${time().minutes}.${time().seconds}`;
    let dateString = `${time().dayFull} ${time().monthFull} ${time().dateFull}`;

    ctx.save();
    ctx.fillStyle = "#fff";
    // put canvas coords in upper left corner 
    ctx.translate(0, 0);
    ctx.font= `${fontSize}px Arial Rounded MT Bold`;
    
    // second counter in middle
    ctx.fillText(timeString, canvasCords().xCenter * .84, canvasCords().yCenter * 1.05);
    ctx.fillText(dateString, 5, canvasCords().height - 5);

    if (canvasCords().canvasSize <= 500) {
      document.querySelector('#myCanvas').title = `${timeString}, ${dateString}`;
    }
  };

  const drawRotatingText = (whatToDraw, radius, start, end) => {
    // displayed text on arcs starts getting wonky below 500...will fix later
    if (canvasCords().canvasSize > 500) {
      // scale font size based on canvas size, roughly 12 point at canvas size of 600
      let fontSize = canvasCords().canvasSize - (canvasCords().canvasSize * .975);

      ctx.save();
      ctx.fillStyle = "#fff";
      // put canvas coords in center of canvas
      ctx.translate(canvasCords().xCenter, canvasCords().yCenter);
      ctx.rotate(start);
      ctx.rotate(end);
      ctx.font= `${fontSize}px Arial Rounded MT Bold`;

      switch(String(whatToDraw).toLowerCase()) {
        case 'seconds':
          ctx.fillText(time().seconds, start -  8, radius + 5);
          break;
        case 'minutes':
          ctx.fillText(time().minutes, start - 8, radius + 5);
          break;
        case 'hours':
          ctx.fillText(time().hours, start - 8, radius + 5);
          break;
        case 'day':
          ctx.fillText(time().dayShort, start - 8, radius + 5);
          break;
        case 'date':
          ctx.fillText(time().dateFull, start - 8, radius + 5);
          break;
        case 'month':
          ctx.fillText(time().monthShort, start - 8, radius + 5);
          break;
      }

      ctx.restore();
    }
  };

  const randomRGBAColor =  () => {
    // return `
    //   rgba(
    //     ${Math.round(Math.random() * 256)}, 
    //     ${Math.round(Math.random() * 256)}, 
    //     ${Math.round(Math.random() * 256)}, 
    //     ${Math.random().toFixed(1)})
    // `;
    return `
      rgba(
        ${Math.round(Math.random() * 256)}, 
        ${Math.round(Math.random() * 256)}, 
        ${Math.round(Math.random() * 256)}, 
        .9)
    `;
  }

  const drawArc = (x, y, radius, start, end, color) => {
    // scale line width based on canvas size
    ctx.lineWidth = canvasCords().canvasSize - (canvasCords().canvasSize * .975);
    ctx.lineCap = 'round';

    ctx.beginPath();
    // change color of seconds hand
    ctx.strokeStyle = "hsla(" + (end *(180 / Math.PI) + color) + ",60%,50%,1)";
    // ctx.strokeStyle = randomRGBAColor();
    ctx.arc(x, y, radius, start, end, false);
    ctx.stroke();
  };

  const draw = () => {
    let usr_color = 100;
    let xCenter = canvasCords().xCenter;
    let yCenter = canvasCords().yCenter;
    // scale initial radius of seconds indicator based on canvas size
    let radius = (canvasCords().canvasSize / 2) * .9;
    let angleStart = (Math.PI/(2/3));
    let angleEnd = '';

    reset();
    time();
    
    // radius for each arc is scaled down from initial radius set above
    // seconds
    angleEnd = ((time().seconds/60)*(Math.PI*2) - (Math.PI/2)) + ((time().milliseconds/60000)*(Math.PI*2));
    drawArc(xCenter, yCenter, radius, angleStart, angleEnd, usr_color);
    drawRotatingText('seconds', radius, angleStart, angleEnd);

    // minutes
    angleEnd = ((time().minutes/60)*(Math.PI*2) - (Math.PI/2)) + ((time().seconds/3600)*(Math.PI*2));
    drawArc(xCenter, yCenter, radius - (radius * .1), angleStart, angleEnd, usr_color - 10);
    drawRotatingText('minutes', radius - (radius * .1), angleStart, angleEnd);

    // hours
    angleEnd = ((time().hours/24)*(Math.PI*2) - (Math.PI/2)) + ((time().minutes/3600)*(Math.PI*2));
    drawArc(xCenter, yCenter, radius - (radius * .2), angleStart, angleEnd, usr_color - 20);
    drawRotatingText('hours', radius - (radius * .2), angleStart, angleEnd);

    // day
    angleEnd = ((time().day/7)*(Math.PI*2) - (Math.PI/2));
    drawArc(xCenter, yCenter, radius - (radius * .4), angleStart, angleEnd, usr_color - 30);
    drawRotatingText('day', radius - (radius * .4), angleStart, angleEnd);

    // date
    angleEnd = ((time().date/31)*(Math.PI*2) - (Math.PI/2));
    drawArc(xCenter, yCenter, radius - (radius * .5), angleStart, angleEnd, usr_color - 40);
    drawRotatingText('date', radius - (radius * .5), angleStart, angleEnd);

    // month
    angleEnd = ((time().month/12)*(Math.PI*2) - (Math.PI/2));
    drawArc(xCenter, yCenter, radius - (radius * .6), angleStart, angleEnd, usr_color - 50);
    drawRotatingText('month', radius - (radius * .6), angleStart, angleEnd);

    drawStaticText();
  };

  // public methods
  return {
    init: (canvas_Size) => {
      canvasSize = canvas_Size;

      canvas.width = canvasCords().width;
      canvas.height = canvasCords().height;
      
      setInterval(draw, 1000);
    }
  }
 })();

//  set initial size of canvas
 PolarClock.init(600);