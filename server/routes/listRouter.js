const express = require('express');
const { getList, addItem, deleteItem, updateItem } = require('../controllers/listController')


const router = express.Router();

//retrieve list on page login
router.get('/', getList, (req, res) => {
  res.status(200).json([...res.locals.items])  
});

//add item to list and retrieve list
router.put('/', addItem, getList, (req, res) => {
  res.status(200).json([...res.locals.items])
});

//remove item from list and retrieve list
router.delete('/', deleteItem, getList, (req, res) => {
  res.status(200).json([...res.locals.items])
});

//move item from one list to another and retrieve list
router.patch('/', 
  updateItem, 
  getList,
  (req, res) => res.status(200).json([...res.locals.items])
);

module.exports = router; 