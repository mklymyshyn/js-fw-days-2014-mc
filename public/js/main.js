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

//Ebay.search("apple").done(function (r){ console.log(r); })
var SearchResult = React.createClass({displayName: 'SearchResult',
  render: function () {
    var renderProduct = function (item) {
      return (React.DOM.div( {className:"col-md-2"}, 
          React.DOM.div( {className:"thumbnail"}, 
            React.DOM.div( {className:"caption"}, 
              React.DOM.h4(null, item.title[0]),
              React.DOM.p(null, React.DOM.a( {href:item.viewItemURL[0], target:"_blank", className:"btn btn-primary", role:"button"}, "Open"))
            )
          )
        ))
    };

    var items = this.props.data.findItemsAdvancedResponse[0].searchResult[0].item;
    return (
      React.DOM.div( {className:"row"}, 
      items.map(renderProduct)
      ))
  }
});

var Search = React.createClass({displayName: 'Search',
  getInitialState: function () {
    return {data: {findItemsAdvancedResponse: [{"searchResult": [{item: []}]}]},
            term: ""};
  },
  updateTerm: function (e) {
    this.setState({term: e.target.value});
  },
  performSearch: function () {
    var self = this;
    Ebay.search(this.state.term).done(function (r){ 
      self.setState({data: r})
    });
    return false;
  },
  render: function () {
    return (
      React.DOM.div(null, 
      React.DOM.nav( {className:"navbar navbar-default", role:"navigation"}, 
        React.DOM.div( {className:"container-fluid"}, 
          React.DOM.div( {className:"navbar-header"}, 
             React.DOM.a( {className:"navbar-brand", href:"#"}, "eBay Search")
          ),

          React.DOM.div( {className:"collapse navbar-collapse", id:"bs-example-navbar-collapse-1"}, 
            React.DOM.form( {className:"navbar-form navbar-left", role:"search"}, 
              React.DOM.div( {className:"form-group"}, 
                React.DOM.input( {onChange:this.updateTerm, type:"text", className:"form-control", placeholder:"Search"} )
              ),
              React.DOM.button( {onClick:this.performSearch, className:"btn btn-default"}, "Submit")
            )
          )
        )
      ),
      SearchResult( {data:this.state.data} )
      )
    )
  }
});

React.renderComponent(
  Search(null ),
  document.getElementById('root-node')
);
