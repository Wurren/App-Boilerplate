exports.index = function(req, res){
	res.send('user index');
};

exports.new = function(req, res){
	res.send('new user');
};

exports.create = function(req, res){
	res.send('create user');
};

exports.show = function(req, res){
	res.send('show user ' + req.params.id);
};

exports.edit = function(req, res){
	res.send('edit user ' + req.params.id);
};

exports.update = function(req, res){
	res.send('update user ' + req.params.id);
};

exports.destroy = function(req, res){
	res.send('destroy user ' + req.params.id);
};