/**
 * Backbone webStorage Adapter
 * Version 0.2.0
 *
 * https://github.com/glensomerville/Backbone.webStorage
 */(function(a,b){typeof exports=="object"&&typeof require=="function"?module.exports=b(require("backbone")):typeof define=="function"&&define.amd?define(["backbone"],function(c){return b(c||a.Backbone)}):b(Backbone)})(this,function(a){function b(){return((1+Math.random())*65536|0).toString(16).substring(1)}function c(){return b()+b()+"-"+b()+"-"+b()+"-"+b()+"-"+b()+b()+b()}function d(a){return a===Object(a)}function e(a,b){var c=a.length;while(c--)if(a[c]===b)return!0;return!1}function f(a,b){for(var c in b)a[c]=b[c];return a}function g(a,b){if(a==null)return void 0;var c=a[b];return typeof c=="function"?a[b]():c}return a.WebStorage=window.Store=function(a,b){if(!b)throw"Backbone.webStorage: Storage type not defined.";if(!this[b])throw"Backbone."+b+": Environment does not support "+b+".";this.name=a,this.storage=b,this.serializer={serialize:function(a){return d(a)?JSON.stringify(a):a},deserialize:function(a){return a&&JSON.parse(a)}};var c=this[this.storage]().getItem(this.name);this.records=c&&c.split(",")||[]},f(a.WebStorage.prototype,{save:function(){this[this.storage]().setItem(this.name,this.records.join(","))},create:function(a){return!a.id&&a.id!==0&&(a.id=c(),a.set(a.idAttribute,a.id)),this[this.storage]().setItem(this._itemName(a.id),this.serializer.serialize(a)),this.records.push(a.id.toString()),this.save(),this.find(a)},update:function(a){this[this.storage]().setItem(this._itemName(a.id),this.serializer.serialize(a));var b=a.id.toString();return e(this.records,b)||(this.records.push(b),this.save()),this.find(a)},find:function(a){return this.serializer.deserialize(this[this.storage]().getItem(this._itemName(a.id)))},findAll:function(){var a=[];for(var b=0,c,d;b<this.records.length;b++)c=this.records[b],d=this.serializer.deserialize(this[this.storage]().getItem(this._itemName(c))),d!=null&&a.push(d);return a},destroy:function(a){this[this.storage]().removeItem(this._itemName(a.id));var b=a.id.toString();for(var c=0,d;c<this.records.length;c++)this.records[c]===b&&this.records.splice(c,1);return this.save(),a},localStorage:function(){return localStorage},sessionStorage:function(){return sessionStorage},_clear:function(){var a=this[this.storage](),b=new RegExp("^"+this.name+"-");a.removeItem(this.name);for(var c in a)b.test(c)&&a.removeItem(c);this.records.length=0},_storageSize:function(){return this[this.storage]().length},_itemName:function(a){return this.name+"-"+a}}),a.WebStorage.sync=window.Store.sync=a.localSync=function(b,c,d){var e=g(c,"localStorage")||g(c.collection,"localStorage")||g(c,"sessionStorage")||g(c.collection,"sessionStorage"),f,h,i=a.$?a.$.Deferred&&a.$.Deferred():a.Deferred&&a.Deferred();try{switch(b){case"read":f=c.id!=undefined?e.find(c):e.findAll();break;case"create":f=e.create(c);break;case"update":f=e.update(c);break;case"delete":f=e.destroy(c)}}catch(j){j.code===22&&e._storageSize()===0?h="Private browsing is unsupported":h=j.message}return f?(d&&d.success&&(a.VERSION==="0.9.10"?d.success(c,f,d):d.success(f)),i&&i.resolve(f)):(h=h?h:"Record Not Found",d&&d.error&&(a.VERSION==="0.9.10"?d.error(c,h,d):d.error(h)),i&&i.reject(h)),d&&d.complete&&d.complete(f),i&&i.promise()},a.ajaxSync=a.sync,a.getSyncMethod=function(b,c){var d=c&&c.ajaxSync;return!d&&(g(b,"localStorage")||g(b.collection,"localStorage")||g(b,"sessionStorage")||g(b.collection,"sessionStorage"))?a.localSync:a.ajaxSync},a.sync=function(b,c,d){return a.getSyncMethod(c,d).apply(this,[b,c,d])},a.WebStorage});