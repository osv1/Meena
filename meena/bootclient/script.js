var routerApp = angular.module('myApp', ['ui.router', 'ng-sweet-alert', 'isteven-multi-select', 'ngBootbox', 'ngResource', 'toastr', 'ngFileUpload', 'ngMessages', 'angularUtils.directives.dirPagination']);
routerApp.constant('URL_VALUE', {
    'API': 'http://172.10.1.7:4051'
});
routerApp.factory('httpRequestInterceptor', function($q, $rootScope, $location) {
    return {
        request: function(config) {
            config.headers.authorization = "Bearer " + localStorage.getItem('webToken');
            return config;
        },
        response: function(response) {
            var curPath = $location.path();
            $rootScope.curPage = curPath;
            if (response.data.code == 200) {
                $rootScope.isLoading = true;
            } else {
                $rootScope.isLoading = false;
            }
            return response || $q.when(response);
        }
    };
});
routerApp.factory('productService', ['$resource', '$stateParams', 'URL_VALUE', function($resource, $stateParams, URL_VALUE) {
    return {
        listProducts: function() {
            return $resource('http://172.10.1.7:4051/product');

        },
        createProduct: function(product) {
            return $resource(URL_VALUE.API + '/product', product);
        },
        deleteProduct: function(id) {
            return $resource(URL_VALUE.API + '/product/' + id);
        },
        Product: function() {
            return $resource(URL_VALUE.API + '/product/' + $stateParams.id);

        },
        updateProduct: function(id, product) {
            return $resource(URL_VALUE.API + '/product/' + $stateParams.id, product);

        },
        productOffer: function(id, product) {
            return $resource(URL_VALUE.API + '/product/' + $stateParams.id, product);

        },
        createUser: function(user) {
            return $resource(URL_VALUE.API + '/userInformation/');
        },
        productComplaint: function(id, product) {
            return $resource(URL_VALUE.API + '/product/complaint/' + $stateParams.id, product);
        },
        userLogin: function() {
            return $resource(URL_VALUE.API + '/userInformation/login'); // Note the full endpoint address
        },
        loggedUserInf: function() {
            return $resource(URL_VALUE.API + '/userInformation/loggedUser/'); // Note the full endpoint address
        },
        createUserCartDetails: function(product) {
            return $resource(URL_VALUE.API + '/userInformation/addCart/'); // Note the full endpoint address
        },
        getUserCartDetails: function() {
            return $resource(URL_VALUE.API + '/userInformation/getCartDetails/'); // Note the full endpoint address
        },
        getUserBuyCart: function(id) {
            return $resource(URL_VALUE.API + '/userInformation/userCart/' + $stateParams.id); // Note the full endpoint address
        },
        deleteCartProduct: function(id) {
            return $resource(URL_VALUE.API + '/userInformation/deleteCart/' + id);
        },
        cartProductFeedback: function(id, product) {

            return $resource(URL_VALUE.API + '/product/addFeedback/' + $stateParams.id, product);
        },
        getAllUsers: function() {

            return $resource(URL_VALUE.API + '/userInformation');
        },
        electronicProductsList: function() {
            return $resource(URL_VALUE.API + '/product/getAllElectronicProduct');

        },
        cosmeticProductsList: function() {
            return $resource(URL_VALUE.API + '/product/getAllCosmeticProduct');
        },
        productComplaintList: function() {
            return $resource(URL_VALUE.API + '/product/getAllComplaints');

        },
        womenClothProductsList: function() {
            return $resource(URL_VALUE.API + '/product/getAllWomenClothProduct');
        },
        menClothProductsList: function() {
            return $resource(URL_VALUE.API + '/product/getMenClothProduct');
        },
        cartDetails: function() {
            return $resource(URL_VALUE.API + '/userInformation/cartDetail');
        },
        getProductFeedback: function() {
            return $resource(URL_VALUE.API + '/product/getComment');
        },
        showFeedback: function() {
            return $resource(URL_VALUE.API + '/product/getComment');
        },
        updateProductQty: function(id, product) {
            return $resource(URL_VALUE.API + '/product/' + id, product);
        },
        updateCartProductQty: function(id, product) {
            return $resource(URL_VALUE.API + '/userInformation/cart/' + id, product);
        },
        createCategory: function(product) {
            return $resource(URL_VALUE.API + '/product/addcategory' + product);
        },
        getCategory: function() {
            return $resource(URL_VALUE.API + '/product/allCategory');
        },
        populateCategory: function(id, category) {
            return $resource(URL_VALUE.API + '/product/' + id + '/category');
        },
        ProductCategory: function(id, category) {
            return $resource(URL_VALUE.API + '/product/category');
        },
        ProductCategoryInfo: function(id) {
            return $resource(URL_VALUE.API + '/product/' + $stateParams.id + '/productCategory');
        }
    }
}]);

routerApp.config(function($stateProvider, $urlRouterProvider, $httpProvider) {

    var checkLoggedin = function($q, $timeout, $http, $location, $rootScope) {
        var deferred = $q.defer();
        $http.get('/userInformation/logincheck').success(function(response) {
            deferred.resolve();
        });
        return deferred.promise;
    };
    $httpProvider.interceptors.push('httpRequestInterceptor');
    $urlRouterProvider.otherwise('/home');
    $stateProvider
        .state('home', {
            url: '/home',
            views: {
                "header": {
                    templateUrl: 'app/html/header.html'
                },
                "content": {
                    templateUrl: 'app/html/caurosel.html'
                },
                "footer": {
                    templateUrl: 'app/html/footer.html'
                }
            }
        })
        .state('aboutus', {
            url: '/aboutus',
            views: {
                "header": {
                    templateUrl: 'app/html/header.html',
                    controller: 'productCtlr'
                },
                "content": {
                    templateUrl: 'app/html/about.html'
                },
                "footer": {
                    templateUrl: 'app/html/footer.html'
                }
            },
            resolve: {
                checklogin: checkLoggedin
            }
        })
        .state('login', {
            url: '/login',
            views: {
                "header": {
                    templateUrl: 'app/html/header.html'
                },
                "content": {
                    templateUrl: 'app/html/login.html',
                    controller: 'productCtlr'
                },
                "footer": {
                    templateUrl: 'app/html/footer.html'
                }
            }
        })
        .state('categoryProduct', {
            url: '/admin/product/addCategory',
            views: {
                "header": {
                    templateUrl: 'app/html/header.html'
                },
                "content": {
                    templateUrl: 'app/html/addCategory.html',
                    controller: 'productCtlr'
                },
                "footer": {
                    templateUrl: 'app/html/footer.html'
                }
            }
        })
        .state('register', {
            url: '/register',
            views: {
                "header": {
                    templateUrl: 'app/html/header.html'
                },
                "content": {
                    templateUrl: 'app/html/registrationForm.html',
                    controller: 'regController'
                },
                "footer": {
                    templateUrl: 'app/html/footer.html'
                }
            }
        })
        .state('add', {
            url: '/admin/product/addProduct',
            views: {
                "header": {
                    templateUrl: 'app/html/header.html'
                },
                "content": {
                    templateUrl: 'app/html/productForm.html',
                    controller: 'productCtlr'
                },
                "footer": {
                    templateUrl: 'app/html/footer.html'
                }
            }
        })
        .state('edit', {
            url: '/admin/product/edit/:id',
            views: {
                "header": {
                    templateUrl: 'app/html/header.html'
                },
                "content": {
                    templateUrl: 'app/html/updateProduct.html',
                    controller: 'productCtlr'
                },
                "footer": {
                    templateUrl: 'app/html/footer.html'
                }
            },
            resolve: {
                checklogin: checkLoggedin
            }
        })
        .state('addtoCart', {
            url: '/category/addtoCart',
            views: {
                "header": {
                    templateUrl: 'app/html/header.html'
                },
                "content": {
                    templateUrl: 'app/html/cartBilling.html',
                    controller: 'productCtlr'
                },
                "footer": {
                    // templateUrl: 'app/html/footer.html'
                }
            },
            resolve: {
                checklogin: checkLoggedin
            }
        })

    .state('complaintToAdmin', {
            url: '/admin/complaint',
            views: {
                "header": {
                    templateUrl: 'app/html/header.html'
                },
                "content": {
                    templateUrl: 'app/html/complaintAdmin.html',
                    controller: 'productCtlr'
                },
                "footer": {
                    templateUrl: 'app/html/footer.html'
                }
            },
            resolve: {
                checklogin: checkLoggedin
            }
        })
        .state('offer', {
            url: '/admin/product/addOffer/:id',
            views: {
                "header": {
                    templateUrl: 'app/html/header.html'
                },
                "content": {
                    templateUrl: 'app/html/offer.html',
                    controller: 'productCtlr'
                },
                "footer": {
                    templateUrl: 'app/html/footer.html'
                }
            },
            resolve: {
                checklogin: checkLoggedin
            }
        })
        .state('complaint', {
            url: '/category/complaint/:id',
            views: {
                "header": {
                    templateUrl: 'app/html/header.html'
                },
                "content": {
                    templateUrl: 'app/html/complaint.html',
                    controller: 'productCtlr'
                },
                "footer": {
                    templateUrl: 'app/html/footer.html'
                }
            }
        })
        .state('profile', {
            url: '/profile',
            views: {
                "header": {
                    templateUrl: 'app/html/header.html'
                },
                "content": {
                    templateUrl: 'app/html/image.html',
                    controller: 'productCtlr'
                },
                "footer": {
                    templateUrl: 'app/html/footer.html'
                }
            }
        })
        .state('electonicProduct', {
            url: '/category/electronicProduct',
            views: {
                "header": {
                    templateUrl: 'app/html/header.html'

                },
                "content": {
                    templateUrl: 'app/html/electronicProduct.html',
                    controller: 'productCtlr'

                },
                "footer": {
                    templateUrl: 'app/html/footer.html'

                }
            },
            resolve: {
                checklogin: checkLoggedin
            }
        })
        .state('cosmeticProduct', {
            url: '/category/cosmeticProduct',
            views: {
                "header": {
                    templateUrl: 'app/html/header.html'

                },
                "content": {
                    templateUrl: 'app/html/cosmeticProduct.html',
                    controller: 'productCtlr'

                },
                "footer": {
                    templateUrl: 'app/html/footer.html'

                }
            },
            resolve: {
                checklogin: checkLoggedin
            }
        })
        .state('womenCloth', {
            url: '/category/womenCloth',
            views: {
                "header": {
                    templateUrl: 'app/html/header.html'

                },
                "content": {
                    templateUrl: 'app/html/womencloth.html',
                    controller: 'productCtlr'

                },
                "footer": {
                    templateUrl: 'app/html/footer.html'

                }
            },
            resolve: {
                checklogin: checkLoggedin
            }
        })
        .state('getProductFeedback', {
            url: '/admin/getfeedback',
            views: {
                "header": {
                    templateUrl: 'app/html/header.html'

                },
                "content": {
                    templateUrl: 'app/html/getFeedback.html',
                    controller: 'productCtlr'

                },
                "footer": {
                    //templateUrl: 'app/html/footer.html'

                }
            },
            resolve: {
                checklogin: checkLoggedin
            }
        })
        .state('menCloth', {
            url: '/category/menCloth',
            views: {
                "header": {
                    templateUrl: 'app/html/header.html'

                },
                "content": {
                    templateUrl: 'app/html/menCloth.html',
                    controller: 'productCtlr'

                },
                "footer": {
                    templateUrl: 'app/html/footer.html'

                }
            },
            resolve: {
                checklogin: checkLoggedin
            }
        })
        .state('category', {
            url: '/category',
            views: {
                "header": {
                    templateUrl: 'app/html/header.html'

                },
                "content": {
                    templateUrl: 'app/html/category.html',
                    controller: 'productCtlr'

                },
                "footer": {
                    templateUrl: 'app/html/footer.html'

                }
            },
            resolve: {
                checklogin: checkLoggedin
            }
        })
        .state('pay', {
            url: '/category/addtoCart/pay/:id',
            views: {
                "header": {
                    templateUrl: 'app/html/header.html'

                },
                "content": {
                    templateUrl: 'app/html/payment.html',
                    controller: 'productCtlr'

                },
                "footer": {
                    templateUrl: 'app/html/footer.html'

                }
            },
            resolve: {
                checklogin: checkLoggedin
            }
        })
        .state('notification', {
            url: '/category/addtoCart/payment/notification',
            views: {
                "header": {
                    templateUrl: 'app/html/header.html'
                },
                "content": {
                    templateUrl: 'app/html/notification.html',
                    controller: 'productCtlr'
                },
                "footer": {
                    templateUrl: 'app/html/footer.html'
                }
            },
            resolve: {
                checklogin: checkLoggedin
            }
        })
        .state('feedback', {
            url: '/category/addtoCart/feedback/:id',
            views: {
                "header": {
                    templateUrl: 'app/html/header.html'
                },
                "content": {
                    templateUrl: 'app/html/feedback.html',
                    controller: 'productCtlr'
                },
                "footer": {
                    templateUrl: 'app/html/footer.html'
                }
            },
            resolve: {
                checklogin: checkLoggedin
            }
        })
        .state('product', {
            url: '/admin',
            views: {
                "header": {
                    templateUrl: 'app/html/header.html'

                },
                "content": {
                    templateUrl: 'app/html/admin.html',
                    controller: 'productCtlr'
                },
                "footer": {
                    templateUrl: 'app/html/footer.html'
                }
            },
            resolve: {
                checklogin: checkLoggedin
            }
        })
        .state('admin', {
            url: '/admin/product',
            views: {
                "header": {
                    templateUrl: 'app/html/header.html'

                },
                "content": {
                    templateUrl: 'app/html/productList.html',
                    controller: 'productCtlr'
                },
                "footer": {
                    templateUrl: 'app/html/footer.html'
                }
            },
            resolve: {
                checklogin: checkLoggedin
            }
        })
        .state('billing', {
            url: '/category/addtoCart/billing',
            views: {
                "header": {
                    templateUrl: 'app/html/header.html'

                },
                "content": {
                    templateUrl: 'app/html/addtocart.html',
                    controller: 'productCtlr'
                },
                "footer": {
                    templateUrl: 'app/html/footer.html'
                }
            },
            resolve: {
                checklogin: checkLoggedin
            }
        })
        .state('users', {
            url: '/admin/user',
            views: {
                "header": {
                    templateUrl: 'app/html/header.html'

                },
                "content": {
                    templateUrl: 'app/html/userInfo.html',
                    controller: 'productCtlr'
                },
                "footer": {
                    templateUrl: 'app/html/footer.html'
                }
            },
            resolve: {
                checklogin: checkLoggedin
            }
        })
});
routerApp.controller('productCtlr', function($scope, $rootScope, Upload, $ngBootbox, SweetAlert, $state, $window, $http, $stateParams, toastr, $resource, $location, productService, $state) {
    $scope.pattern = new RegExp("([1|2][0|9][0|1|9][0-9])-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])");
    $scope.need = true;
    $rootScope.list = [];
    $rootScope.isDisabled = false;
    // $scope.names = ["Clothing", "Electronic", "Shoes","Toys","Beauty"];
    $scope.getProducts = function() {
        $scope.sorting = {
            predicate: 'name',
            asc: true
        };
        $scope.sorting = {
            predicate: 'price',
            asc: true
        };
        productService.listProducts().get(function(response) {
            console.log('response', response);
            if (response.code == 200) {
                $scope.products = response.data;
                // $scope.offer = $scope.products.offer;
                console.log($scope.products);
                // console.log($scope.offer);
                productService.ProductCategory().get(function(response) {
                    if (response.code == 200) {
                        $scope.prodData = response.data;
                        console.log($scope.prodData);
                        toastr.success('Successfully get product data', 'List');

                    } else {
                        toastr.error('unsuccessful in adding record', 'Add');
                        console.log("err");
                    }
                });

            } else {
                console.log("err");
            }
        });
    }
    $scope.getComplaintList = function() {
        productService.productComplaintList().get(function(response) {
            console.log('response', response);
            $scope.complaints = [];
            if (response.code == 200) {
                $scope.products = response.data;
                console.log($scope.products);
                console.log($scope.products[3].complaint);
                console.log($scope.products.length);
                for ($scope.i = 0; $scope.i <= $scope.products.length; $scope.i++) {
                    console.log("checking");
                    if ($scope.products[$scope.i].complaint.length >= 1) {
                        $scope.products[$scope.i].complaint = $scope.products[$scope.i].complaint.toString();
                        $scope.complaints.push($scope.products[$scope.i]);
                        console.log("checking");
                    }
                    console.log($scope.complaints);
                }
                console.log($scope.complaints);
            } else {
                console.log("err");
            }
        });
    }
    $scope.generateBill = function() {
        $location.path('/category/addtoCart/billing');
    }
    $scope.backToCategory = function() {
        $location.path('/category');
    }
    $scope.backToBuyProduct = function() {
        $location.path('/category');
    }
    $scope.backToViewCart = function() {
        $location.path('/category/addtoCart');
    }
    $scope.addProduct = function() {
        $location.path('/admin/product/addProduct');
    }
    $scope.addCategory = function() {
        $location.path('/admin/product/addCategory');

    }
    $scope.back = function() {
        $location.path('product');
    }
    $scope.complaint = function(id) {
        $location.path('/category/complaint/' + id);
    }
    $scope.cartFeedback = function(id) {
        $location.path('/category/addtoCart/feedback/' + id);
    }
    $scope.editProduct = function(id) {
        $location.path('/admin/product/edit/' + id);
    }
    $scope.sale = function() {
        $location.path('product');
    }
    $scope.createUser = function() {
        $location.path('login');
    }
    $scope.addOffer = function(id) {
        $location.path('/admin/product/addOffer/' + id);
    }

    $scope.show = function() {
        $location.path('/category/addtoCart');
    }
    $scope.purchase = function(id) {
        console.log('inside purchase function');
        console.log($rootScope.list.length);
        //if($rootScope.list.length)
        console.log('inside purchase list function')
        $location.path('/category/addtoCart/pay/' + id);
    }
    $scope.getCategory = function() {
        console.log('category');
        $scope.countries = [{
            "name": "USA",
            "id": 1
        }, {
            "name": "Canada",
            "id": 2
        }];
        productService.getCategory().get(function(response) {
            console.log('getting');
            $rootScope.category = [];
            console.log('response', response);
            if (response.code == 200) {
                $scope.categories = response.data;
                // $rootScope.names = response.data;
                // console.log($rootScope.names);
                // console.log($rootScope.names.length);
                // $rootScope.j = $rootScope.names.length;
                // for ($rootScope.i = 0; $rootScope.i < $rootScope.j; $rootScope.i++) {
                //     console.log("fgv");
                //     if ($rootScope.category.indexOf($rootScope.names[$rootScope.i].categoryName) === -1) {
                //         $rootScope.category.push($rootScope.names[$rootScope.i].categoryName);
                //         //$rootScope.category = $rootScope.names[$rootScope.i].categoryName;
                //     }
                // }
                // console.log($rootScope.category);
                // console.log($rootScope.names[0].categoryName);
                // toastr.success('Successfully get product data', 'List');

            } else {
                toastr.error('unsuccessful in adding record', 'Add');
                console.log("err");
            }
        });
    }

    $scope.done = function(product, quan) {
        if ((product[0].quantity > 0) && ((quan < product[0].quantity)) || (quan === product[0].quantity)) {
            console.log(product);
            console.log(product[0]._id);
            console.log(quan);
            $scope.product[0].quantity = $scope.product[0].quantity - $scope.quan;
            console.log(product[0].quantity);
            $ngBootbox.confirm('Are you sure to buy Product from your cart? ')
                .then(function() {
                        SweetAlert.success("Successful in buying product");
                        productService.updateProductQty(product[0]._id).save(product[0], function(response) {
                            console.log(product[0]);
                            if (response.code == 200) {
                                SweetAlert.success('Successfully updated product');

                            } else {
                                SweetAlert.error('Unsuccessful in updating product');
                                console.log("err");
                            }
                            console.log("response", response);
                        })
                        productService.updateCartProductQty(product[0]._id).save(product[0], function(response) {
                            console.log(product[0]);
                            if (response.code == 200) {
                                SweetAlert.success('Successfully updated product');

                            } else {
                                SweetAlert.error('Unsuccessful in updating product');
                                console.log("err");
                            }
                            console.log("response", response);
                        })
                        $state.go('notification');
                    },
                    function() {
                        SweetAlert.info("Confirmation was cancelled!!!");
                        console.log('Confirm was cancelled');
                    });
        } else {
            SweetAlert.error("Out of stock product:" + "  " + product[0].name + " " + "is !!!");
        }
    }
    $scope.date = function() {
        $('#check-out').datepicker();
    }
    $scope.backToadmin = function() {
        $location.path('/admin');
    }
    $scope.createProduct = function(product) {
        console.log(product);

        $ngBootbox.confirm('Are you sure  to add Product:' + $scope.product.name + '? ')
            .then(function() {
                    productService.createProduct().save(product, function(response) {
                        if (response.code == 200) {
                            SweetAlert.success('Successfully added product');
                            $location.path('/admin/product');
                        } else {
                            SweetAlert.error('Unsuccessful in adding product');
                            console.log("err");
                        }

                        console.log("response", response);
                    })

                },
                function() {
                    SweetAlert.info("Confirm was cancelled!!!");
                    console.log('Confirm was cancelled');
                });
    }
    $scope.createProductCategory = function(product) {
        console.log(product);
        // $rootScope.removed = [];
        // $scope.id;
        // $rootScope.i = 0;
        // $rootScope.category = [];
        // // $scope.len;
        // // $scope.catProduct=[];
        // $rootScope.category = Array.prototype.slice.call(product);
        // angular.forEach(product, function(element) {
        // $rootScope.category.push(element);
        // });
        //  console.log($rootScope.category);

        // $rootScope.removed = $rootScope.category.splice(0,1);
        // console.log($rootScope.removed);
        // delete product.category; 
        console.log(product);
        $ngBootbox.confirm('Are you sure  to add Product:' + $scope.product.name + '? ')
            .then(function() {
                    productService.createProduct().save(product, function(response) {
                        if (response.code == 200) {
                            SweetAlert.success('Successfully added product');
                            //     productService.listProducts().get(function(response) {
                            //     // console.log('response', response);
                            //     if (response.code == 200) {
                            //         $scope.products = response.data;
                            //         console.log($scope.products);
                            //         $scope.len=$scope.products.length;
                            //         console.log($scope.len);
                            //         $scope.catProduct=$scope.products[$scope.len-1];
                            //         console.log($scope.catProduct);
                            //         $rootScope.category=[];
                            //         angular.forEach($scope.catProduct, function(element) {
                            //         $rootScope.category.push(element);
                            //         });
                            //         console.log($rootScope.category);
                            //         $scope.id=$rootScope.category[0];
                            //         console.log( $scope.id);
                            //     } else {
                            //         console.log("err");
                            //     }
                            // });
                            // $location.path('/admin/product');
                            $scope.products = response.data;
                            console.log($scope.products);
                            $scope.id = $scope.products._id;
                            console.log($scope.id);
                            // productService.ProductCategory.get(function(response) {

                            //     if (response.code == 200) {
                            //         toastr.success('Successfully get product data', 'List');

                            //     } else {
                            //         toastr.error('unsuccessful in adding record', 'Add');
                            //         console.log("err");
                            //     }
                            // });
                            productService.populateCategory($scope.id).save(category, function(response) {
                                console.log(category);
                                if (response.code == 200) {
                                    SweetAlert.success('Successfully updated product');

                                } else {
                                    SweetAlert.error('Unsuccessful in updating product');
                                    console.log("err");
                                }
                                console.log("response", response);
                            })

                        }
                    })
                },
                function() {
                    SweetAlert.info("Confirm was cancelled!!!");
                    console.log('Confirm was cancelled');
                });


    }
    $scope.deleteProduct = function(id) {

        $ngBootbox.confirm('Are you sure  to delete Product? ')
            .then(function() {
                    productService.deleteProduct(id).delete(function(response) {
                        console.log('response', response);
                        if (response.code == 200) {
                            SweetAlert.success('Successfully deleted ', 'delete');
                        } else {
                            SweetAlert.error('unsuccessful in deleting ', 'delete');
                            console.log("err");
                        }
                    });

                    $scope.getProducts();

                },
                function() {
                    SweetAlert.info("Confirmation was cancelled!!!");
                    console.log('Confirm was cancelled');
                    $scope.getProducts();
                });

    }
    $scope.deleteCart = function(id) {
        $ngBootbox.confirm('Are you sure  to delete Product from your cart? ')
            .then(function() {
                    console.log(id);
                    productService.deleteCartProduct(id).delete(function(response) {
                        console.log('response', response);
                        if (response.code == 200) {
                            console.log("inside delete cart product");
                            SweetAlert.success("Product is deleted from your cart successfully");
                        } else {
                            SweetAlert.success("Product is not deleted from your cart successfully");
                            console.log("err");
                        }
                    });
                    $scope.getCartProduct();

                },
                function() {
                    SweetAlert.info("Confirmation was cancelled!!!");
                    console.log('Confirm was cancelled');

                    $scope.getCartProduct();
                });
    }
    $scope.getComments = function() {
        console.log("hello");
        productService.getProductFeedback().get(function(response) {
            console.log('getting');
            $scope.comments = [];
            $scope.feedbacks = [];
            console.log('response', response);
            if (response.code == 200) {
                $scope.product = response.data;
                console.log($scope.product);
                console.log($scope.product.length);
                console.log($scope.product[0].comment.length);
                toastr.success('Successfully get product data', 'List');
                for ($scope.i = 0; $scope.i <= $scope.product.length; $scope.i++) {
                    console.log("checking");
                    if ($scope.product[$scope.i].comment.length > 0) {
                        console.log("Hello");
                        $scope.product[$scope.i].comment = _.pluck($scope.product[$scope.i].comment, "feedback");
                        $scope.product[$scope.i].comment = _.map($scope.product[$scope.i].comment, function(obj) {
                            return obj[0]
                        }).toString();
                        $scope.comments.push($scope.product[$scope.i]);
                        console.log("checking", $scope.product[$scope.i]);
                    }
                    console.log($scope.comments);
                    console.log($scope.feedbacks);
                }

            } else {
                toastr.error('unsuccessful in adding record', 'Add');
                console.log("err");
            }
        });
    }
    $scope.getProduct = function() {
        console.log($stateParams.id);
        productService.ProductCategoryInfo($stateParams.id).get(function(response) {
            $scope.productData = response.data;
            if (response.code == 200) {
                toastr.success('Successfully get product data', 'List');
                productService.getCategory().get(function(response) {
                    console.log('getting');
                    $rootScope.category = [];
                    console.log('response', response);
                    if (response.code == 200) {
                        $scope.categories = response.data;
                    } else {
                        toastr.error('unsuccessful in adding record', 'Add');
                        console.log("err");
                    }
                });
                console.log($scope.productData);
            } else {
                toastr.error('unsuccessful in adding record', 'Add');
                console.log("err");
            }
        });

    }
    $scope.getBuyCart = function(id) {
        console.log("inside buy cart");
        productService.getUserBuyCart(id).get(function(response) {
            console.log('getting')
            console.log('response', response);
            if (response.code == 200) {
                $scope.product = response.data;

                toastr.success('Successfully get product data', 'List');

            } else {
                toastr.error('unsuccessful in adding record', 'Add');
                console.log("err");
            }
        });
    }
    $scope.loggedUserInfo = function() {
        console.log("i m in loggeduserinfo");
        productService.loggedUserInf().get(function(response) {
            console.log('getting');
            console.log('response', response);
            if (response.code == 200) {
                $scope.user = response.data;
                toastr.success('Successfully get your profile data', 'List');
            } else {
                toastr.error('unsuccessful in finding your profile data', 'Add');
                console.log("err");
            }
            console.log(response.data);
        });

    }
    $scope.upload = function(file) {
        Upload.upload({
            url: 'http://172.10.1.7:4051/userInformation/uploadImage',
            data: {
                file: file
            }
        }).then(function(resp) {
            console.log('Success ' + resp.config.data.file.name + 'uploaded. Response: ' + resp.data.filename);
            $scope.loggedUserInfo();
        }, function(evt) {
            var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
            console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
            $window.location.reload();
        });

    };
    $scope.uploadProductImage = function(file) {
        Upload.upload({
            url: 'http://172.10.1.7:4051/product/uploadProductImage',
            data: {
                file: file
            }
        }).then(function(resp) {
            console.log('Success ' + resp.config.data.file.name + 'uploaded. Response: ' + resp.data.filename);
            $scope.loggedUserInfo();
        }, function(evt) {
            var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
            console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
            $window.location.reload();
        });

    };
    $scope.productComplaint = function(id, product) {
        console.log(product);
        $ngBootbox.confirm('Are you sure to register complaint for' + ' ' + product.name + '?')
            .then(function() {
                    productService.productComplaint($stateParams.id).save(product, function(response) {
                        SweetAlert.success('Successfully added complaint', 'complaint');
                        if (response.code == 200) {
                            console.log("response", response);
                            $scope.products = response.data;
                        } else {
                            console.log(response);
                        }
                    });
                },
                function() {
                    SweetAlert.info("Confirmation was cancelled!!!");
                    console.log('Confirm was cancelled');
                });

    }
    $scope.cartProductFeedback = function(id, product) {
        console.log(product);
        $ngBootbox.confirm('Are you sure to register feedback for' + ' ' + product.name + '?')
            .then(function() {
                    productService.cartProductFeedback($stateParams.id).save(product, function(response) {
                        SweetAlert.success('Successfully added feedback');
                        console.log("response", response);
                        if (response.code == 200) {
                            $scope.products = response.data;
                        } else {
                            console.log(response);
                        }
                    })
                },
                function() {
                    SweetAlert.info("Confirmation was cancelled!!!");
                    console.log('Confirm was cancelled');
                });
    }
    $scope.login = function(user) {
        console.log(user);
        productService.userLogin().save(user, function(response) {
            console.log(response);
            if (response.code == 200) {
                toastr.success(response.message);
                console.log(response);
                console.log(user.username);
                localStorage.setItem('checkAdmin', JSON.stringify(user));
                localStorage.setItem('webToken', response.data.token);
                if (user.username === "mina" && user.password === "mina231") {
                    console.log("admin");
                    $rootScope.isadminlogin = false;
                }
                window.location = '/';
            } else {
                console.log(response);
                SweetAlert.error('Sorry try again');
            }
        })
    }
    $scope.productOffer = function(product) {
        console.log(product);
        $ngBootbox.confirm('Are you sure  to add offer:' + product.offer)
            .then(function() {
                    productService.productOffer($stateParams.id).save(product, function(response) {
                        console.log("response", response);
                        if (response.code == 200) {
                            $scope.products = response.data;
                            SweetAlert.success('Successfully added Offer');
                            $location.path('/admin/product');
                        } else {
                            console.log(response);
                        }
                    });
                },
                function() {
                    SweetAlert.info("Confirm was cancelled!!!");
                    console.log('Confirm was cancelled');
                });
    }
    $scope.editProductss = function(product) {
        console.log(product);
        $ngBootbox.confirm('Are you sure to edit product:' + product.name + '???')
            .then(function() {
                    productService.updateProduct($stateParams.id).save(product, function(response) {
                        SweetAlert.success('Successfully updated');
                        console.log("response", response);
                        if (response.code == 200) {
                            $scope.products = response.data;
                            $location.path('/admin/product');
                        } else {
                            console.log(response);
                        }
                    });
                },
                function() {
                    SweetAlert.info("Confirmation was cancelled!!!");
                    console.log('Confirm was cancelled');
                });
    }
    $scope.addtoCart = function() {

        console.log($rootScope.list);
        $scope.isCart = true;
        $scope.products = $rootScope.list;
        console.log($scope.products);
    }
    $scope.electronicProducts = function() {
        productService.electronicProductsList().get(function(response) {
            console.log('response', response);
            if (response.code == 200) {
                $scope.products = response.data;
            } else {
                console.log("err");
            }
        });
    }
    $scope.cosmeticProducts = function() {
        productService.cosmeticProductsList().get(function(response) {
            console.log('response', response);
            if (response.code == 200) {
                $scope.products = response.data;
            } else {
                console.log("err");
            }
        });
    }
    $scope.buyAll = function(product) {
        console.log(product);
        $rootScope.j = product.length;
        $rootScope.total = 0;
        $rootScope.id = [];
        $rootScope.price = [];
        $rootScope.qty = [];
        $rootScope.available_qty = [];
        for ($rootScope.i = 0; $rootScope.i < $rootScope.j; $rootScope.i++) {
            $rootScope.id = _.pluck(product, "_id");
            $rootScope.price = _.pluck(product, "price");
            $rootScope.quantity = _.pluck(product, "quantity");
            $rootScope.qty = _.pluck(product, "selectedqty");
            console.log("quantity",product[$rootScope.i].quantity);
            // product[$rootScope.i].quantity = product[$rootScope.i].quantity - $rootScope.qty[$rootScope.i];
            // console.log("quantity",product[$rootScope.i].quantity);
        }
        console.log("id", $rootScope.id);
        console.log("price", $rootScope.price);
         $rootScope.quantity[$rootScope.i]
        console.log("qty", $rootScope.qty);
        for ($rootScope.i = 0; $rootScope.i < $rootScope.j; $rootScope.i++) {
            $rootScope.total = $rootScope.total + ($rootScope.price[$rootScope.i] * $rootScope.qty[$rootScope.i]);
            console.log($rootScope.quantity[$rootScope.i]);
            console.log("product[$rootScope.i]", product[$rootScope.i]);
            // $rootScope.quantity[$rootScope.i] = $rootScope.quantity[$rootScope.i] - $rootScope.qty[$rootScope.i];
            // console.log($rootScope.quantity[$rootScope.i]);
        }
        $rootScope.gtotal = $rootScope.total;
        for ($rootScope.i = 0; $rootScope.i < $rootScope.j; $rootScope.i++) {
            console.log("id", $rootScope.id[$rootScope.i]);
            // console.log("product quantity", $rootScope.product[$rootScope.i].quantity);
            productService.updateCartProductQty($rootScope.id[$rootScope.i]).save(product[$rootScope.i], function(response) {
                // console.log("product[$rootScope.i]._id", product[$rootScope.i]._id);
                if (response.code == 200) {
                    SweetAlert.success('Successfully updated product');

                } else {
                    SweetAlert.error('Unsuccessful in updating product');
                    console.log("err");
                }
                console.log("response", response);
            })
        }
    }
    $scope.womenClothProducts = function() {
        productService.womenClothProductsList().get(function(response) {
            console.log('response', response);
            if (response.code == 200) {
                $scope.products = response.data;
            } else {
                console.log("err");
            }
        });
    }
    $scope.menClothProducts = function() {
        productService.menClothProductsList().get(function(response) {
            console.log('response', response);
            if (response.code == 200) {
                $scope.products = response.data;
            } else {
                console.log("err");
            }
        });
    }
    $scope.cancelAll = function() {
        $ngBootbox.confirm('Are you sure to cancel billing? ')
            .then(function() {
                    SweetAlert.success('Billing is cancelled');
                    $location.path('/category/addtoCart');
                },
                function() {
                    SweetAlert.info("Confirmation was cancelled!!!");
                    console.log('Confirm was cancelled');
                });
    }
    $scope.buyProduct = function(cart) {
        console.log(cart);
        $rootScope.available_qty = [];
        $rootScope.selectedqty = [];
        $rootScope.id = [];
        for ($rootScope.i = 0; $rootScope.i < $rootScope.j; $rootScope.i++) {
            $rootScope.available_qty = _.pluck(cart, "quantity");
            $rootScope.id = _.pluck(cart, "_id");
            $rootScope.selectedqty = _.pluck(cart, "selectedqty");
        }
        $rootScope.quantity;
        console.log("qty", $rootScope.id);
        console.log("sold qty", $rootScope.selectedqty);
        console.log("available_qty", $rootScope.available_qty);
        $ngBootbox.confirm('Are you sure to buy Products from your cart? ')
            .then(function() {
                SweetAlert.success("Successful in buying product");
                for ($rootScope.i = 0; $rootScope.i < $rootScope.id.length; $rootScope.i++) {
                    $rootScope.available_qty[$rootScope.i] = $rootScope.available_qty[$rootScope.i] - $rootScope.selectedqty[$rootScope.i];
                    console.log($rootScope.id[$rootScope.i]);
                    console.log($rootScope.id[$rootScope.quantity]);
                    productService.updateProductQty($rootScope.id[$rootScope.i]).save($rootScope.quantity, function(response) {
                            console.log(id[$rootScope.i]);
                            if (response.code == 200) {
                                SweetAlert.success('Successfully updated product');

                            } else {
                                SweetAlert.error('Unsuccessful in updating product');
                                console.log("err");
                            }
                            console.log("response", response);
                        })
                        //     productService.updateCartProductQty(product[0]._id).save(product[0], function(response) {
                        //         console.log(product[0]);
                        //         if (response.code == 200) {
                        //             SweetAlert.success('Successfully updated product');

                    //         } else {
                    //             SweetAlert.error('Unsuccessful in updating product');
                    //             console.log("err");
                    //         }
                    //         console.log("response", response);
                    //     })
                    //     $state.go('notification');
                    // },
                    // function() {
                    //     SweetAlert.info("Confirmation was cancelled!!!");
                    //     console.log('Confirm was cancelled');
                    // });
                }
            });
        $state.go('notification');
    }
    $scope.getCartProduct = function() {
        productService.getUserCartDetails().get(function(response) {
            console.log('response', response);
            if (response.code == 200) {
                $scope.products = response.data;
                console.log($scope.products);
            } else {
                console.log("err");
            }
        });
    }
    $scope.getAllUsers = function() {
        productService.getAllUsers().get(function(response) {
            console.log('response', response);
            if (response.code == 200) {
                $scope.users = response.data;
                console.log($scope.users);
            } else {
                console.log("err");
            }
        });

    }
    $scope.isActive = function(item) {
        return $scope.disable = true;
    };
    $scope.cart = function(product) {
        $rootScope.color = "{'background-color':'red'}";
        $rootScope.cartDetails = [];
        productService.getUserCartDetails().get(function(response) {
            console.log('response', response);
            if (response.code == 200) {
                $rootScope.products = response.data;
                console.log($rootScope.products);
                for ($rootScope.i = 0; $rootScope.i < $rootScope.products.cart.length; $rootScope.i++) {
                    $rootScope.cartDetails.push($rootScope.products.cart[$rootScope.i]);
                    // $rootScope.cartDetails[$rootScope.i] = _.pluck($rootScope.cartDetails[$rootScope.i], "name");
                }
                console.log($rootScope.cartDetails);
                for ($rootScope.i = 0; $rootScope.i < $rootScope.cartDetails.length; $rootScope.i++) {
                    if ($rootScope.cartDetails[$rootScope.i]._id === product._id) {
                        $rootScope.i = -1;
                        break;
                    }
                }
                if (product.quantity !== 0) {
                    if ($rootScope.i !== -1) {
                        productService.createUserCartDetails().save(product, function(response) {
                            console.log("inside cart");
                            if (response.code == 200) {
                                toastr.success('Successfully added record', 'Add');
                                console.log("inside cart");
                            } else {
                                toastr.error('unsuccessful in adding record', 'Add');
                                console.log("err");
                                console.log("inside cart");
                            }
                            console.log("response", response);

                        });
                    } else {
                        console.log("err");
                        SweetAlert.info('Already in your cart: Product ' + ' ' + product.name + ' ' + 'is !!!');
                    }
                } else {
                    SweetAlert.info('Not in stock: Product ' + ' ' + product.name + ' ' + 'is !!!');
                }
            } else {
                console.log("err");
            }
        });
    }

});
routerApp.controller('regController', function($scope, productService, $ngBootbox, SweetAlert, toastr) {
    $scope.createUser = function(user) {
        console.log("response", user);
        $ngBootbox.confirm('Are you sure ' + user.firstName + ' ' + 'to get register?')
            .then(function() {
                    productService.createUser().save(user, function(response) {
                        if (response.code == 200) {
                            SweetAlert.success('Successfully added you');
                        } else {
                            SweetAlert.error('unsuccessful in adding you');
                            console.log("err");
                        }
                        console.log("response", response);
                    })
                },
                function() {
                    SweetAlert.info("Confirmation was cancelled!!!");
                    console.log('Confirm was cancelled');
                });
    }
});
routerApp.controller('mainController', function($scope, toastr, $ngBootbox, SweetAlert, $rootScope) {
    var token = localStorage.getItem('webToken');
    if (token != null) {
        $rootScope.isuserlogin = true;
        $rootScope.isadminlogin = true;
    } else {
        $scope.admin = [];
        $scope.adminResult = [];
        $scope.admin = localStorage.getItem('checkAdmin');
        $scope.adminResult = JSON.parse($scope.admin);
        console.log($scope.admin);
        $rootScope.isuserlogin = false;
        $rootScope.isadminlogin = true;
    }
    $scope.admin = function() {
        $rootScope.isadminlogin = true;
        $scope.admin = [];
        $scope.adminResult = [];
        $scope.admin = localStorage.getItem('checkAdmin');
        $scope.adminResult = JSON.parse($scope.admin);
        console.log($scope.admin);
        $scope.authAdmin = {
            username: "mina",
            password: "mina231"
        };
        if (angular.equals($scope.authAdmin, $scope.adminResult)) {
            console.log("admin");
            $rootScope.isadminlogin = false;
        } else {
            console.log(" not an admin");
        }
    };

    $scope.logout = function() {
        $ngBootbox.confirm('Are you sure to get logout?')
            .then(function() {
                    SweetAlert.success('Successfully logout');
                    localStorage.removeItem('webToken');
                    window.location = '/';
                },
                function() {
                    SweetAlert.info("Confirmation was cancelled!!! you are still logged in");
                    console.log('Confirm was cancelled');
                });

    };
});
/*routerApp.directive('ngFiles', ['$parse', function ($parse) {

            function fn_link(scope, element, attrs) {
                var onChange = $parse(attrs.ngFiles);
                element.on('change', function (event) {
                    onChange(scope, { $files: event.target.files });
                });
            };

            return {
                link: fn_link
            }
        } ])
       routerApp .controller('fupController', function ($scope, $http) {

            var formdata = new FormData();
            $scope.getTheFiles = function ($files) {
                angular.forEach($files, function (value, key) {
                    formdata.append(key, value);
                });
            };

            // NOW UPLOAD THE FILES.
            $scope.uploadFiles = function () {

                var request = {
                    method: 'POST',
                    url: '/userInformation/fileupload',
                    data: formdata,
                    headers: {
                        'Content-Type': undefined
                    }
                };

                // SEND THE FILES.
                $http(request)
                    .success(function (request) {
                        alert(request);
                    })
                    .error(function () {
                        console.log('not able to upload')
                        console.log(request);
                    });
            }
        });*/