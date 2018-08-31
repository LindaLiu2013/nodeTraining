const express=require('express');
const hbs=require('hbs');
const fs=require('fs');

var app=express();

hbs.registerPartials(__dirname+'/views/partials');

app.set('view engine','hbs');

hbs.registerHelper('getCurrentYear',()=>{
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt',(text)=>{
  return text.toUpperCase();
})

app.use((req,res,next)=>
{
  var now=new Date().toString();
  var log=`${now}: ${req.method}, ${req.url}`;

  fs.appendFile('server.log',log+"\n",(err)=>{
    if (err)
    {
      console.log(err);
    }
  });
  next();

});

// app.use((req,res,next)=>{
//     res.render('maintaine.hbs');
// });

app.use(express.static(__dirname+'/public'));

app.get('/',(req,res)=>{
  //res.send({name: 'Linda',Likes:['Food','Book']});

  res.render('home.hbs',{
    pageTitle:'Home page',
    welcomeText:'Welcome to my site'
  })
});

app.get('/about',(req,res)=>{
  res.render('about.hbs',{
    pageTitle:'Abut Page123'
  });
});

app.get('/error',(req,res)=>
{
  res.send({errorMesage:'Unable to handle request'});
})

app.listen(3000,()=>{console.log('Server is up on 3000')});
