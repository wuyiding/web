/**
 * Created by yangwei on 03/01/16.
 */
/**
 * custom service
 */
app.service('pageservice', ['$log', function($log){
    $log.log("service pagnation is instantiating...");

    this.pagenate = function(datasource, limit, callback) {
        $log.log("limit is " + limit);
        var recordLength = datasource.length;
        var pNumber = Math.round(recordLength/limit);
        var MPI = Math.round(limit/2) + 1; //MPI stands for MorePageIndicator
        if (Math.round(recordLength % limit) < MPI) {
            pNumber = pNumber + 1;
        }
        var pages = [];
        for (var i=0; i<pNumber; i++) {
            pages.push( i+1 );
        }
        callback(pages);
    }
}]);