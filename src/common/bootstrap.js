import $ from 'miaoxing';
import './http';
import './msg';

$.req = (name) => {
  const pages = getCurrentPages();
  const curPage = pages[pages.length - 1];
  
  // dont convert undefined object to "undefined" string
  if (typeof curPage.options[name] === 'undefined') {
    return curPage.options[name];
  }
  return decodeURIComponent(curPage.options[name]);
};