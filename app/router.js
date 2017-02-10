import Ember from 'ember';
import config from './config/environment';
import sections from './sections';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('index',{ path: '/' });
  sections.forEach((section) => {
    const opts = section.opts || {};
    if (section.route !== 'index') {
      this.route(section.route, opts);
    }
  });
  this.route('products',{
    path: '/products'
  }, function() {
    this.route('pinless');
    this.route('topup');
  });
  // this.route('login');
  // this.route('logout');
  this.route('users',{
    path: '/users'
  }, function() {
    this.route('signout');
    this.route('profile', { path: '/profile/:account_id/' });
    this.route('payment');
    this.route('report');
    this.route('register');
    this.route('signin');
  });
  this.route('order');
  this.route('confirmation');
});
export default Router;
