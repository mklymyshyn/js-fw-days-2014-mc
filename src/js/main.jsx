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
var SearchResult = React.createClass({
  render: function () {
    var renderProduct = function (item) {
      return (<div className="col-md-2">
          <div className="thumbnail">
            <div className="caption">
              <h4>{item.title[0]}</h4>
              <p><a href={item.viewItemURL[0]} target="_blank" className="btn btn-primary" role="button">Open</a></p>
            </div>
          </div>
        </div>)
    };

    var items = this.props.data.findItemsAdvancedResponse[0].searchResult[0].item;
    return (
      <div className="row">
      {items.map(renderProduct)}
      </div>)
  }
});

var Search = React.createClass({
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
      <div>
      <nav className="navbar navbar-default" role="navigation">
        <div className="container-fluid">
          <div className="navbar-header">
             <a className="navbar-brand" href="#">eBay Search</a>
          </div>

          <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            <form className="navbar-form navbar-left" role="search">
              <div className="form-group">
                <input onChange={this.updateTerm} type="text" className="form-control" placeholder="Search" />
              </div>
              <button onClick={this.performSearch} className="btn btn-default">Submit</button>
            </form>
          </div>
        </div>
      </nav>
      <SearchResult data={this.state.data} />
      </div>
    )
  }
});

React.renderComponent(
  <Search />,
  document.getElementById('root-node')
);
