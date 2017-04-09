/**
 * Created by yangwei on 10/3/15.
 */
var app = angular.module('companyApp', []);

/**
 * controller
 */
app.controller('companyController',[ '$http', function($http){

    var ds = this;
    var entries = 6;
    ds.companies = [];
    ds.company = {};
    ds.recordLength = 0;
    ds.limit = entries;
    ds.currentPageNumber = 1;
    ds.begin = 0;
    // ds.status = "waiting";
    // ds.skype = "";
    // ds.qq = "";
    ds.usertype=1;

    //fetch all incomes
    $http.get("http://localhost:8080/wyd/company")
        .success(function(data) {
            if(data != "null") {
                ds.companies = data;
            }
            // ds.pagenate(ds.companies);
        });

    ds.switchUserType = function (status) {
        // ds.usertype = ds.usertype * -1;
        console.log(status);
        ds.company.vip = status;
        console.log(ds.company);

    }

    ds.save = function(username) {
        console.log(ds.company.username);
        console.log("42 save");
        ds.company.payment = 0;
        // var ret = ds.getUser(ds.company.username);

        var sting = "http://localhost:8080/wyd/company/"+username;
        $http.get(sting)
            .success(function(data) {
                console.log("49-data'" + data + "'");
                // if(data != "null") {
                //     ds.company = data;
                //     console.log("kkk"+ds.company);
                // }
                if(!data) {

                    console.log("11111"+ds.company.username);
                    console.log("57-add");

                    $http.post("http://localhost:8080/wyd/company", ds.company)
                        .then(function(response){
                            console.log(response);
                            if(response.data.success) {
                                alert("User " + ds.company.username + " has been added.");
                                ds.companies.push(ds.company);
                                //ds.companies.unshift(ds.company);
                                // ds.pagenate(ds.companies);
                            }else {
                                //alert(response.data);
                                alert(response.data.message);
                            }
                        }, function(){
                            console.log('add http request failed');
                        });
                }else {
                    //ds.company = data;
                    console.log(ds.company);
                    console.log("75-update");
                    ds.update();
                }
                // ds.pagenate(ds.companies);
            });
    }
    ds.getUser = function (username) {
        console.log("username"+username);
        if(username){
            console.log("84-if")
            var sting = "http://localhost:8080/wyd/company/"+username;
            $http.get(sting)
                .success(function(data) {
                    console.log("88-data'" + data + "'");
                    // if(data != "null") {
                    //     ds.company = data;
                    //     console.log("kkk"+ds.company);
                    // }
                    if(!data) {
                        ds.company = {};
                        console.log("82-yyy");
                    }else {
                        ds.company = data;
                        console.log(ds.company);
                    }
                    // ds.pagenate(ds.companies);
                });
        }else{
            console.log("else");
            ds.company = {};
        }
    }
    ds.update = function () {

        console.log(ds.company);

        //ajax submit to php

        $http.put("http://localhost:8080/wyd/company/"+ds.company.username, ds.company)
            .then(function(response){
                console.log(response);
                if(response.data.success) {
                    alert("User " + ds.company.username + " has been updated.");
                }else {
                    //alert(response.data);
                    alert(response.data.message);
                }
            }, function(){
                console.log('update http request failed');
            });
    }
    ds.deleteUser = function (username) {

        //ajax submit to php
        $http.delete("http://localhost:8080/wyd/company/" + username)
            .then(function(response){
                console.log(response);
                if(response.data.success) {
                    alert("User " + username + " has been deleted.");
                }else {
                    //alert(response.data);
                    alert(response.data.message);
                }
            }, function(){
                console.log('delete http request failed');
            });

    }

}]);



