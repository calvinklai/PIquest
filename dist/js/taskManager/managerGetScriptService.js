define(["require"],function(e){function t(t){function s(n,r,s){var o=t.defer(),u="";return r||(r=""),/^\/|:/.test(n)?u=n:u+=i+"/"+r+"/"+n,s&&(u="text!"+u),e([u],function(e){o.resolve(e)},function(e){o.reject(e)}),o.promise}var i=n(r());return s}function n(e){return e.substring(0,e.lastIndexOf("/"))}function r(){var e;return"BaseURI"in document?document.baseURI:(e=document.getElementsByTagName("base"),e.length>0?e[0].href:window.location.href)}return t.$inject=["$q"],t});