
/**
 * custom PAGE service
 */
app.service('pageservice', ['$log', function($log){
    $log.log("service pagnation is instantiating...");

    this.pagenate = function(datasource, limit) {
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

        return pages;
    }
}]);

/**
 * custome PAGE directive
 */
app.directive('page',function(){
    return {
        restrict: 'AE',
        scope: {
            pages: '=',
            beginat: '=',
            current: '=',
            limit: '='
        },
        //replace: true,
        templateUrl: 'page-template.html',
        link: function (scope, elem, attrs) {
            scope.prevPage = function() {
                if (scope.current > 1) {
                    scope.toPage(scope.current - 1);
                }
            };

            scope.nextPage = function() {
                if (scope.current < scope.pages.length) {
                    scope.toPage(scope.current + 1);
                }
            };

            scope.toPage = function(pn) {
                scope.current = pn;
                scope.beginat = scope.current*scope.limit - scope.limit;
                alert(scope.beginat);
            }
        }
    };
});
