//dev_tools_utils
log 	= console.log.bind(console) 
error 	= console.error.bind(console) 
assert 	= console.assert.bind(console)
group 	= console.group.bind(console)
table 	= console.table.bind(console)
groupEnd 	= console.groupEnd.bind(console)

function log_table(raw,data,name){
    log(arguments.callee.name,arguments)
	group(name)
	log(raw)
  	table(data)
  	groupEnd(name)
}
// Print out response headers for current URL.
function show_headers(){
  log(arguments.callee.name,arguments)
    
  var request = new XMLHttpRequest()
  request.open('HEAD',window.location,false)
  request.send(null)

  var headers = request.getAllResponseHeaders()
  var tab  	  = headers.split("\n").map(function(h) {
    return { "Key": h.split(": ")[0], "Value": h.split(": ")[1] }
  }).filter(function(h) { return h.Value !== undefined })

  log_table(raw,tab,"Request Headers")
}
function get_query() {
  var url = location;
  var querystring = location.search.slice(1);
  var tab = querystring.split("&").map(function(qs) {
  key =  qs.split("=")[0]
  value =qs.split("=")[1]
  pretty = decodeURIComponent(qs.split("=")[1]).replace(/\ /g," ")
    return { 
            "Key"          : key 
            ,"Value"       : value
            ,"Pretty Value": pretty
            }
  })
  raw = ("URL: "+url+"\nQS:  "+querystring);
  log_table(raw,tab,"Querystring Values")