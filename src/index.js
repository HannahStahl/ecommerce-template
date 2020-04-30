import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter, withRouter, Route, Switch,
} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import * as serviceWorker from './serviceWorker';
import Home from './components/Home';
import About from './components/About';
import Items from './components/Items';
import Item from './components/Item';
import Contact from './components/Contact';
import Cart from './components/Cart';
import NotFound from './components/NotFound';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import config from './config';

const Routes = ({ items, cart, updateCart }) => (
  <Switch>
    <Route path="/" exact component={Home} />
    <Route path="/about" exact component={About} />
    <Route path="/items" exact render={() => <Items items={items} />} />
    <Route path="/items/:itemName" exact render={(props) => <Item match={props.match} items={items} updateCart={updateCart} />} />
    <Route path="/contact" exact component={Contact} />
    <Route path="/cart" exact render={() => <Cart items={items} cart={cart} updateCart={updateCart} />} />
    <Route component={NotFound} />
  </Switch>
);

const App = withRouter(() => {
  const [items, setItems] = useState([]);
  const [cart, setCart] = useState([]);

  const updateCart = (newCart) => {
    if (newCart) localStorage.setItem('cart', JSON.stringify(newCart));
    const cartStr = localStorage.getItem('cart');
    setCart(cartStr ? JSON.parse(cartStr) : []);
  };

  useEffect(() => {
    Promise.all([
      fetch(`${config.apiURL}/publishedItems/${config.userID}`).then((res) => res.json()),
      fetch(`${config.apiURL}/itemsToPhotos/${config.userID}`).then((res) => res.json()),
      fetch(`${config.apiURL}/photos/${config.userID}`).then((res) => res.json()),
    ]).then((results) => {
      const [itemsList, itemsToPhotos, photos] = results;
      itemsList.forEach((item, index) => {
        const itemPhotoIds = itemsToPhotos
          .filter((row) => row.itemId === item.itemId)
          .map((row) => row.photoId);
        itemsList[index].itemPhotos = photos.filter(
          (photo) => itemPhotoIds.includes(photo.photoId),
        );
      });
      setItems(itemsList);
    });
    updateCart();
  }, []);

  return (
    <>
      <NavBar cart={cart} />
      <div className="page-content">
        <Routes items={items} cart={cart} updateCart={updateCart} />
      </div>
      {window.location.pathname !== '/' && <Footer />}
    </>
  );
});

ReactDOM.render(<BrowserRouter><App /></BrowserRouter>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
