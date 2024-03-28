const http =require('http');
const fs=require('fs');
var requests=require("requests");
const { json } = require('express');
const { log } = require('console');

const homefile=fs.readFileSync("home.html","utf-8");
const replaceval=(tempVal,orgVal)=>{
    let temprature=tempVal.replace("{%tempval%}",orgVal.main.temp);
    temprature=temprature.replace("{%tempmin%}",orgVal.main.temp_min);
    temprature=temprature.replace("{%tempmax%}",orgVal.main.temp_max);
    temprature=temprature.replace("{%location%}",orgVal.name);
    temprature=temprature.replace("{%country%}",orgVal.sys.country);
    temprature=temprature.replace("{%tempstatus%}",orgVal.weather[0].main);
    return temprature;
}
const server=http.createServer((req,res)=>{
    if(req.url=="/")
    {
        requests('https://api.openweathermap.org/data/2.5/weather?q=Uttar Pradesh&appid=17d75324e1699e1854e32e193d9d1855')
        .on('data',  (chunk)=> {
            const objdata=JSON.parse(chunk);
            const arrdata=[objdata];
            //console.log(arrdata);
            const realTimesData=arrdata.map(val=> replaceval(homefile,val)).join("");
                //console.log(val.main);
                res.write(realTimesData);
                console.log(realTimesData);
     })
    .on('end',  (err) =>{
        if (err) return console.log('connection closed due to errors', err);
            res.end();
    console.log('end');
    });
    }
});
server.listen(3000,"127.0.0.1");