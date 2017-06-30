import Promise from 'promise-polyfill';
import fetch from 'isomorphic-fetch';
import URLSearchParams from 'url-search-params';
import APIS from '../../Configs/Apis';
import Envs from '../..//Configs/Envs';


var env = process.env.NODE_ENV;

function getUrl(path, params = {},mode = false) {

    let server = Envs[env] || '';

    var url = APIS[path].url;

    if(!url){
      return ;
    }

    if(url.indexOf('mockjsdata') !==-1){
    	 server='';
    }

    if(url.indexOf('http') !== -1){
      server='';
    }
     if(url.indexOf('apis') !== -1){
      server='';
    }

    try {
      server += APIS[path].url;
    } catch(err) {
      return false;
    }


    if(Object.keys(params).length){
      for (let item in params) {
        if (params.hasOwnProperty(item)) {
          server = server.replace('{' + item + '}', encodeURI(params[item]));
          delete params[item];
        }
      }
    }

    if(!mode){

      var searchParams = new URLSearchParams();

      for (let item in params) {
        if (params.hasOwnProperty(item)) {
          searchParams.set(item,params[item]);
        }
      }

      if(server.indexOf('?') !== -1){
        server +='&'+searchParams.toString();
      }else{
        server +='?'+searchParams.toString();
      }
    }

    //去除多余参数
    server = server.replace(/={.*?}/gi,'=');

    return server;
  }



  function getMethod(path) {

    const apiConfig = APIS[path];
    return apiConfig.method;
  }

  function check401(res) {
    if (res.code ===-4011) {
      window.location.href = '/new/login.html';
    } else if (res.code ===-4033) {
    }
    return res;
  }

  function jsonParse(res) {
    return res.json();
  }

  const http = {

    request:(path='demo', params,payload,method)=>{

      const url = getUrl(path, params);

      method = method || getMethod(path);
      var promise = '';

      if (!url) {
        return;
      }

      switch(method){
        case 'get':{

          promise = http.get(url,params);
          break;
        }
        case 'post':{
          promise = http.post(url,params,payload);
          break;
        }

        case 'put':{
          promise = http.update(url,params,payload);
          break;
        }
        case 'delete':{
          promise = http.remove(url,params,payload);
          break;
        }
        default:{
          promise = http.get(url,params,payload);
          break;
        }
      }
      return promise;
    },
    transformPreResponse(response){
      var data = response;
      //处理mock 数据
      if(Object.prototype.toString.call(response) === '[object Array]'){
        data = response.pop();
      }
      return data;
    },
    transformResponse:function(response){
      return response.data;
    },
    get: (url, params) => new Promise((resolve, reject) => {

      if (!url) {
        return;
      }

      fetch(url, {
        method: 'GET',
        headers: {
          'Accept': '*',
          //'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
        },
        mode:'cors',
        credentials: 'include',
      })
      .then(jsonParse)
      .then(check401)
      .then(http.transformPreResponse)
      .then(json => {
        if(parseInt(json.code)>0){
          //处理数据格式
          resolve(http.transformResponse(json));
        }else{
          reject(json);
        }
      })
      .catch(function(err){
        if(err == 'TypeError: Failed to fetch'){
            return ;
        }
        reject(err)
      });
    }),

    post: (url, params, payload) => new Promise((resolve, reject) => {

      if (!url) {
        return
      }

      var bodyParams = [];
      for (var p in payload){
        bodyParams.push(encodeURIComponent(p) + "=" + encodeURIComponent(payload[p]));
      }

      fetch(url, {
        method: 'POST',
        credentials: 'include',
        mode:'cors',
        headers: {
          'Accept': '*',
          'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
          "Cookie": document.cookie
        },
        body:bodyParams.join('&')
      })

      .then(jsonParse)
      .then(check401)
      .then(http.transformPreResponse)
      .then(json => {

        if(parseInt(json.code)>0){
          //处理数据格式
          resolve(http.transformResponse(json));
        }else{
          reject(json);
        }
      })
      .catch(err => reject(err));
    }),

    update: (url, params, payload) => new Promise((resolve, reject) => {
      const searchParams = new URLSearchParams();

      if (!url) {
        return
      }

      for (const prop in payload) {
        searchParams.set(prop, payload[prop])
      }

      fetch(url, {
        method: 'PUT',
        credentials: 'include',
        mode:'cors',
        headers: {
          'Accept': '*',
          'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
        },
        body: searchParams
      })
      .then(jsonParse)
      .then(check401)
      .then(http.transformPreResponse)
      .then(json => {
        if(parseInt(json.code)>0){
          //处理数据格式
          resolve(http.transformResponse(json));
        }else{
          reject(json);
        }
      })
      .catch(err => reject(err));
    }),

    remove: (url, params, payload) => new Promise((resolve, reject) => {
      const searchParams = new URLSearchParams();

      if (!url) {
        return
      }

      for (const prop in payload) {
        searchParams.set(prop, payload[prop])
      }

      return fetch(url, {
        method: 'DELETE',
        credentials: 'include',
        mode:'cors',
        headers: {
          'Accept': '*',
          'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
        },
        body: searchParams
      })
      .then(jsonParse)
      .then(check401)
      .then(http.transformPreResponse)
      .then(json => {
        if(parseInt(json.code)>0){
          //处理数据格式
          resolve(http.transformResponse(json))
        }else{
          reject(json)
        }
      })
      .catch(err => reject(err));
    }),
  }


module.exports = http;
