module.exports.route = function(app, animalModel){

  app.get('/', function(req,res){

    animalModel.find({}, function(error, animals){
      if (error) {
        console.log("Couldn't find animals.");
      }else{
        var data = {};
        data['animals'] = animals;
        res.render('index', data);
      }
    });

  });

  app.get('/animal/:id', function(req,res){

    animalModel.find({ _id : req.params.id }, function(error, animal){
      if (error) {
        console.log("Couldn't find the animal");
      }else{
        var data = {};
        data['animal'] = animal;
        res.render('showanimal', data);
      }
    });

  });

  app.get('/new', function(req,res){
    res.render('addanimal');
  });

  app.post('/animal', function(req,res){

    var animal = new animalModel({name: req.body.name, info : req.body.info});

    animal.save(function(error){
      if (error) {
        console.log("There was a error saving the animal.");
      }else{
        console.log("Success the animal was saved.");
      }
    });

    res.redirect('/');

  });

  app.get('/animal/edit/:id', function(req,res){

    animalModel.find({ _id : req.params.id }, function(error, animal){
      if (error) {
        console.log("Couldn't find the animal");
      }else{
        var data = {};
        data['animal'] = animal;
        res.render('editanimal', data);
      }
    });

  });

  app.post('/animal/:id', function(req,res){

    animalModel.update({ _id : req.params.id} , {name : req.body.name , info : req.body.info}, function(error){
      if (error) {
        console.log("There was an error updating the animal.");
      }else{
        res.redirect('/');
      }
    });

  });

  app.get('/animal/destroy/:id', function(req,res){

    animalModel.remove({ _id : req.params.id }, function(error){
      if (error) {
        console.log("There was an error remove the animal.");
        res.redirect('/');
      }else{
        res.redirect('/');
      }
    });

  });

}
