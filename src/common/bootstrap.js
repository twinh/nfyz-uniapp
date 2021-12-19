import $ from 'miaoxing';
import './http';
import './msg';

$.req = (name) => {
  const pages = getCurrentPages();
  const curPage = pages[pages.length - 1];
  return curPage.options[name];
};