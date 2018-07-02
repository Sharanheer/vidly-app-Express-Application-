
const asyncMiddleware = require('../middleware/asyncMiddleware');
const authorization = require('../middleware/auth');
const admin = require('../middleware/admin');
const { GenreModel, validate} = require('../models/genre');
const express = require('express');
const route = express.Router();

//MongoDB
const mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost/Vidly')
//     .then( () => console.log('Connected to the database'))
//     .catch( err => console.log('Something went wrong', err.message));


const Genre =  GenreModel;

// const genres = [ 
//     {id : 1 , name : 'Action'},
//     {id : 2 , name : 'Romance'},
//     {id : 3 , name : 'Sci-Fi'},
//     {id : 4 , name : 'Drama'},
//     {id : 5 , name : 'Adventure'},
//     {id : 6 , name : 'Biography'},
//     {id : 7 , name : 'Comedy'},
//     {id : 8 , name : 'Crime'},
//     {id : 9 , name : 'Animation'},
//     {id : 10 , name : 'Horror'},
//     {id : 11 , name : 'Sports'},
//     {id : 12 , name : 'Documentary'},
//     {id : 13 , name : 'Thriller'},
//  ];

// async function getGenres(){
//     return await Genre.find();
// }

// async function deleteGenre(tempid){
//     return await Genre.findOneAndRemove({
//         id: tempid
//     });
// }

// async function addGenre(tempname){

//     return await Genre.find().sort('-id')
//         .then( async function(result){
//             let genre = new Genre({
//                 id: result[0].id+1,
//                 name: tempname
//             });
//             return await genre.save();
//         })
//         .catch( (err) => {
//             console.log('Something wrong while calculating count' , err);
//         });
// }

// async function updateGenre(tempid , tempname){

//     return await Genre.findOneAndUpdate({
//         id: tempid
//     }, 
//     { $set:{
//         id : tempid,
//         name: tempname
//     } },
//     {
//         new: true
//     });
// }

//My way
// route.get('/', (req, res) => {
//     getGenres()
//         .then( (genre) => {
//             res.send(genre);
//             res.end();
//         })
//         .catch( () => {
//             res.send(null);
//             res.end();
//         });    
//  });

//Prof way



route.get('/', asyncMiddleware(async (req, res) => {
        //throw new Error('Could not get the genres');
        
        res.send(await Genre.find());
        res.end();
 }));

//  route.delete('/:id', (req, res) => {
//     //res.send(req.params.id);
//     const genre = genres.find(g => g.id === parseInt(req.params.id));
//     if(!genre) return res.status(404).send('Not found');
//     genres.splice(genre.id-1, 1);
//     res.send(genre);
//  });

// route.delete('/:id', (req, res) => {
  
//My way
//     deleteGenre(parseInt(req.params.id))
//         .then( (genre) => {
//             console.log('Deleted', genre);
//             res.send(genre);
//             res.end();
//         })
//         .catch( () => {
//             console.log('Some Error');
//             res.send(null);
//             res.end();
//         });
           
// });

//Prof way
route.delete('/:id', [authorization, admin], async (req, res) => {

        const genre = await Genre.findByIdAndRemove({ _id : req.params.id })
        if(!genre) return res.status(404).send('Not found');
        res.send(genre);
        res.end();
     });

//  route.post('/', (req, res) => {
    
//     if(result = validation(req.body)) return res.send(result.details[0].message);
    
//     const gen = genres.find(g => g.name === req.body.name);
//     if(gen) return res.send('Genre Already exist');

//     const genre = {
//         id: genres.length+1,
//         name: req.body.name
//     };
//     genres.push(genre);
//     res.send(genre);

//  });


//My way
// route.post('/', (req, res) => {
    
//     if(result = validation(req.body)) return res.send(result.details[0].message);

//     addGenre(req.body.name)
//     .then( (genre) => {
//         res.send(genre);
//         console.log('Genre added...!');
//     })
//     .catch( () => {
//         res.send(null);
//         console.log(Error);
//     });
   
//  });

//Prof way
 route.post('/', authorization, async (req, res) => {
    
    if(result = validate(req.body)) return res.send(result.details[0].message);
    
    const gen = await Genre.find({name: req.body.name});
    if(gen.length>0) return res.send('Genre Already exist');

    let genre = new Genre({
        name: req.body.name
    });

    res.send(await genre.save());
    res.end();
 });

//  route.put('/:id', (req, res) => {
    
//     if(result = validation(req.body)) return res.send(result.details[0].message);

//     const gen = genres.find(g => g.id === parseInt(req.params.id));
//     if(!gen) return res.send('Wrong ID Entered');    

//     const index = genres.indexOf(gen);
//     genres[index].name = req.body.name;

//     res.send(req.body.name);
//  });

//My way
// route.put('/:id', (req, res) => {
    
//     if(result = validation(req.body)) return res.send(result.details[0].message);

//     updateGenre(parseInt(req.params.id),req.body.name)
//         .then( (genre) => {
//             res.send(genre);
//             console.log('successfully updated the genre');
//         })
//         .catch( (err) => {
//             res.send(null);
//             console.log('Trouble updating the genre', err.message);
//         });
    
//  });

//Prof way
 route.put('/:id', authorization, async (req, res) => {
    
    if(result = validate(req.body)) return res.send(result.details[0].message);

    const gen = await Genre.find({ _id : req.params.id })
    if(gen.length === 0) return res.send('Wrong ID Entered');    

    const newGenre = await Genre.findByIdAndUpdate( 
        { _id : req.params.id } , { name: req.body.name }, { new: true } );

    res.send(newGenre);
    res.end();
 });

 module.exports = route;