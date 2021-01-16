const db = require('./models/freshModel.js');

const listController = {
    //Sign-up - Add to users table
    //Login - Query users table to confirm name & password, return user_id & household_id (if any)
    // getList - Query items table & return items associated w user (_id, names, priority, shared?, location)
    getList (req, res, next) {
      const query = `
        SELECT _id, name, priority, location, shared
        FROM items
        WHERE user_id = $1`
      const id = [req.query.id]; //the user_id comes in on a query in the url
      db.query(query, id, (err, data) => {
        if(err) {
          return next({
            log: `Express error handler caught in getList ERROR: ${err}`,
            message: { 'err': 'An error occurred in getList' }})
        } 
        else {
          res.locals.items = data.rows
          return next();
        }
      });
    },
    //addItem - Insert into items table based on userid, priority, shareable?, location... next getList
    addItem (req, res, next) {
      const query = `
        INSERT INTO items (name, priority, location, shared, user_id)
        VALUES ($1, $2, $3, $4, $5)`
      const entries = [...req.body, req.query.id];
        db.query(query, entries, (err, data) => {
          if(err) {
            return next({
              log: `Express error handler caught in addItem ERROR: ${err}`,
              message: { 'err': 'An error occurred in addItem' }})
          } 
          else {
            return next();
          }
        })
    },
    //removeitem - Delete from items table based on item_id.... next getList
    deleteItem (req, res, next) {
      const query = `
        DELETE FROM items
        WHERE _id = $1`
      const id = [req.body.id];
      db.query(query, entries, (err, data) => {
        if(err) {
          return next({
            log: `Express error handler caught in deleteItem ERROR: ${err}`,
            message: { 'err': 'An error occurred in deleteItem' }})
        } 
        else {
            return next();
        }
      });
    },
    
    //updateItem - based on column to update & new value, item_id.... next getList
    //$1 = location/priority/shared, $2 = updated value, $3 = _id of the item
    updateItem (req, res, next) {
        const query =`
        UPDATE items
        SET $1 = $2 
        WHERE _id = $3`
        const columnInfo = [...req.body];
        db.query(query, columnInfo, (err, data) => {
            if(err) {
                return next({
                  log: `Express error handler caught in updateItem ERROR: ${err}`,
                  message: { 'err': 'An error occurred in updateItem' }})
              } 
              else {
                  return next();
              } 
        });
    }
    //moving is just updating location
}

module.exports = listController;