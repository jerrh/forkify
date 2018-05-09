/* Catch errors() = Catch any errors thrown and pass to express middleware with next() */

exports.catchErrors = (fn) => {
  return function(req, res, next) {
    return fn(req, res, next).catch(next);
  };
};

/* Not found = if route not found, mark as 404 and pass to next error handler to display */
exports.notFound = (req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
};

/* Detect if there are mongodb validation errors that we can nicely show via flash messages
*/

exports.flashValidationErrors = (err, req, res, next) => {
  // if there are no errors to show for flashes, skip it
  if (!err.errors) return next(err);
  // validation errors 
  const errorKeys = Object.keys(err.errors);
  errorKeys.forEach(key => req.flash('error', err.errors[key].message));
  res.redirect('back');
};


/* Show syntac errors in dev */
exports.developmentErrors = (err, req, res, next) => {
  err.stack = err.stack || '';
  const errorDetails = {
    message: err.message,
    status: err.status,
    stackHighlighted: err.stack.replace(/[a-z_-\d]+.js:\d+:\d+/gi, '<mark>$&</mark>')
  };
  res.status(err.status || 500);
  res.format({
    // Based on `Accept` http header
    'text/html': () => {
      res.render('error', errorDetails);
    }, // Form submit, reload page
    'application/json': () => res.json(errorDetails) // Ajax call, send JSON back
  });
};


/*
  production error = no stacktraces are leaked to user
*/
exports.productionErrors = (err, req, res, next) => {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
};
