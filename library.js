const times = {};
times.timeNum = function(hour,min,sec,ms) {
  if(arguments.length == 0) hour = times.getHr();
  if(arguments.length <= 1) {
    ms = hour[3];
    sec = hour[2];
    min = hour[1];
    hour = hour[0];
  }
  if(!ms) ms = 0;
  if(!sec) sec = 0;
  return ms/1000+sec+min*60+hour*3600;
}
times.getHr = function(t) {
  let hr,min,sec,ms;
  if(arguments.length==0) {
    t = new Date();
    hr = t.getHours();
    min = t.getMinutes();
    sec = t.getSeconds();
    ms = t.getMilliseconds();
  } else {
    ms = (t%1)*1000;
    t-=ms/1000;
    sec = (t%60);
    t-=sec;
    min = (t%3600)/60;
    t-=min*60;
    hr = (t)/3600;
    t-=hr*3600;
  }
  return [hr,min,sec,ms];
}
times.getDay = function() {
  return new Date().toLocaleDateString();
}
times.timeSheet = {normal:[
  {name:"Homeroom",startTime:times.timeNum(8,20),endTime:times.timeNum(8,27)},
  {name:"1",  startTime:times.timeNum(8,30),endTime:times.timeNum(9,27)},
  {name:"2",  startTime:times.timeNum(9,30),endTime:times.timeNum(10,19)},
  {name:"3",  startTime:times.timeNum(10,22),endTime:times.timeNum(11,11)},
  {name:"4-5",startTime:times.timeNum(11,14),endTime:times.timeNum(12,4)},
  {name:"6-7",startTime:times.timeNum(12,7),endTime:times.timeNum(12,57)},
  {name:"8",  startTime:times.timeNum(13,0),endTime:times.timeNum(13,30)},
  {name:"9",  startTime:times.timeNum(13,33),endTime:times.timeNum(14,23)},
  {name:"10", startTime:times.timeNum(14,26),endTime:times.timeNum(15,15)}
],set:[
  {}
],half:[
  {}
]};

times.days = {};
//{normal,set,half}
//{name, startTime, endTime}

times.getData = function(time,day,schedule) {
  if(arguments.length==0||time=="") time = times.timeNum();
  if(arguments.length<2||day=="") day = times.days[times.getDay()] || "normal";
  if(arguments.length<3||schedule=="") schedule = times.timeSheet[day];
  let pd = null;
  let t = times.timeNum();
  schedule.forEach((e,i)=>{
    if(t>=e.startTime && t<=e.endTime) pd = i;
  });
  if(pd == null) return {name:"Transition"};
  let e = schedule[pd];
  return {name:e.name,timeLeft:e.endTime-t,timeIn:t-e.startTime};
}
/*  Example Usage:
updateTimes();
setInterval(updateTimes,500);
function updateTimes() {
  let t = times.getHr(times.getData().timeLeft);
  let res = [t[0].toString(),t[1].toString(),t[2].toString()];
  if(res[2].length==1) res[2] = `0${res[2]}`;
  if(res[1].length==1) res[1] = `0${res[1]}`;
  document.getElementById("time").innerHTML = res.join(":");
}
*/
