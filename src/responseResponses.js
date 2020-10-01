const User = {};

const respondJSON = (request, response, status, object) => {
  response.writeHead(status, { 'Content-Type': 'application/json' });
  response.write(JSON.stringify(object));
  response.end();
};

const respondJSONMeta = (request, response, status, object) => {
  response.writeHead(status, { 'Content-Type': 'application/json' });
  response.write(JSON.stringify(object));
  response.end();
};

const getUser = (request, response) => {
  const responseJSON = {
    User,
    message: 'This is a successful response',
  };
  respondJSON(request, response, 200, responseJSON);
};

const getUserMeta = (request, response) => {
  const responseJSON = {
    User,
    message: 'This is a successful response',
  };
  respondJSON(request, response, 200, responseJSON);
};

const addUser = (request, response, type) => {
  const responseJSON = {
    message: 'Name and age are both required',
  };
  if (!type.name || !type.age) {
    responseJSON.id = 'missingParams';
    return respondJSON(request, response, 400, responseJSON);
  }

  let responseCode = 201;

  if (User[type.name]) {
    responseCode = 204;
  } else {
    User[type.name] = {};
  }

  User[type.name].name = type.name;
  User[type.name].age = type.age;

  if (responseCode === 201) {
    responseJSON.message = 'Created Successfully';
    return respondJSON(request, response, responseCode, responseJSON);
  }

  return respondJSONMeta(request, response, responseCode);
};

const notFound = (request, response) => {
  const responseJSON = {
    message: 'The page you are looking for was not found.',
    id: 'notFound',
  };

  respondJSON(request, response, 404, responseJSON);
};

const notFoundMeta = (request, response, type) => respondJSONMeta(request, response, 404);

module.exports = {
  getUserMeta,
  notFound,
  notFoundMeta,
  getUser,
  addUser,
};
