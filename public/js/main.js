/** @jsx React.DOM */

var EbayAPI = {
  "appid": "Klymyshy-f7e6-4c94-bada-1bce624b13a9",
  "url": "http://svcs.ebay.com/services/"
};

var Ebay = {
  search: function (term, perPage) {
    var params = {
    	"OPERATION-NAME": "findItemsAdvanced",
	"SERVICE-VERSION": "1.0.0",
	"SECURITY-APPNAME": EbayAPI.appid,
	"RESPONSE-DATA-FORMAT": "JSON",
	"REST-PAYLOAD": "true",
	"paginationInput.entriesPerPage": perPage || 40,
	"keywords": term
    };
    return $.ajax({
      dataType: "jsonp",
      url: [
    	   EbayAPI.url, "search/FindingService/v1", "?",
	   $.map(params, function (val, key) {
	     return encodeURIComponent(key) + "=" + encodeURIComponent(val); }).join("&")].join("")});
  }
}

Ebay.search("apple").done(function (r){ console.log(r); })