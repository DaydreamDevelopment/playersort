webpackJsonp([0],{

/***/ 107:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 107;

/***/ }),

/***/ 148:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 148;

/***/ }),

/***/ 193:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_storage__ = __webpack_require__(188);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var HomePage = (function () {
    function HomePage(navCtrl, alertCtrl, storage) {
        this.navCtrl = navCtrl;
        this.alertCtrl = alertCtrl;
        this.storage = storage;
        this.phoneticAlpha = [
            'Alpha',
            'Bravo',
            'Charlie',
            'Delta',
            'Echo',
            'Foxtrot',
            'Golf',
            'Hotel',
            'India',
            'Juliet',
            'Kilo',
            'Lima',
            'Mike',
            'November',
            'Oscar',
            'Papa',
            'Quebec',
            'Romeo',
            'Sierra',
            'Tango',
            'Uniform',
            'Victor',
            'Whiskey',
            'X-ray',
            'Yankee',
            'Zulu'
        ];
        this.group = { name: "", players: [] };
        this.weight = 0;
        this.name = "";
        this.teams = [];
        this.weightValues = [{ value: 1, label: '1' },
            { value: 2, label: '2' },
            { value: 3, label: '3' },
            { value: 4, label: '4' },
            { value: 5, label: '5' }];
    }
    HomePage.prototype.ngOnInit = function () {
        var _this = this;
        this.storage.get('group').then(function (group) {
            if (group) {
                _this.group = group;
            }
        });
    };
    HomePage.prototype.addPlayer = function () {
        if (this.weight !== 0 && this.name !== "") {
            for (var i = 0; i < this.group.players.length; i++) {
                if (this.group.players[i].name.trim() === this.name.trim()) {
                    this.showError('Duplicate Player', 'A player with this name already exists');
                    return;
                }
            }
            this.group.players.push({ name: this.name, weight: this.weight, active: true });
            this.weight = 0;
            this.name = "";
            this.storage.set('group', this.group);
        }
        else {
            this.showError('Missing Information', 'You must enter a name and select a weight.');
        }
    };
    HomePage.prototype.removePlayer = function (name) {
        var updatedPlayers = [];
        for (var i = 0; i < this.group.players.length; i++) {
            if (this.group.players[i].name.trim() !== name.trim()) {
                updatedPlayers.push(this.group.players[i]);
            }
        }
        this.group.players = updatedPlayers;
        this.storage.set('group', this.group);
    };
    HomePage.prototype.showError = function (title, text) {
        var alert = this.alertCtrl.create({
            title: title,
            subTitle: text,
            buttons: ['OK']
        });
        alert.present();
    };
    HomePage.prototype.showTeamPrompt = function () {
        var _this = this;
        var activePlayers = 0;
        for (var i = 0; i < this.group.players.length; i++) {
            if (this.group.players[i].active) {
                activePlayers++;
            }
        }
        if (activePlayers < 1) {
            this.showError('No Active Players', 'You must have at least one active player to generate teams.');
            return;
        }
        var pluralText = activePlayers > 1 ? ' active players.' : ' active player.';
        var message = "Your group has " + activePlayers + pluralText;
        var prompt = this.alertCtrl.create({
            title: 'GENERATE TEAMS',
            message: message,
            inputs: [
                {
                    name: 'numberOfTeams',
                    placeholder: '# of teams'
                },
            ],
            buttons: [
                {
                    text: 'Cancel',
                    handler: function (data) {
                    }
                },
                {
                    text: 'Generate',
                    handler: function (data) {
                        if (data.numberOfTeams > activePlayers) {
                            _this.showError('Not Enough Active Players', 'You can not generate more teams than active players.');
                            return;
                        }
                        _this.generateTeams(data.numberOfTeams);
                    }
                }
            ]
        });
        prompt.present();
    };
    HomePage.prototype.generateTeams = function (numberOfTeams) {
        var teamPlayers = [];
        for (var y = 0; y < this.group.players.length; y++) {
            if (this.group.players[y].active) {
                teamPlayers.push(this.group.players[y]);
            }
        }
        teamPlayers.sort(this.randomSort);
        teamPlayers.sort(this.orderPlayersBestToWorest);
        this.teams = [];
        for (var i = 0; i < numberOfTeams; i++) {
            this.teams.push({ name: this.phoneticAlpha[i], players: [] });
        }
        for (var j = 0; j < teamPlayers.length; j++) {
            this.teams[0].players.push(teamPlayers[j]);
            this.teams.sort(this.orderTeamsByWeightLowestToHeighest);
        }
        for (var k = 0; k < this.teams.length; k++) {
            this.teams[k].players.sort(this.randomSort);
        }
        this.teams.sort(this.orderAlphabetically);
    };
    HomePage.prototype.randomSort = function (a, b) {
        return 0.5 - Math.random();
    };
    HomePage.prototype.orderAlphabetically = function (a, b) {
        var textA = a.name;
        var textB = b.name;
        return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
    };
    HomePage.prototype.orderPlayersBestToWorest = function (a, b) {
        if (a.weight > b.weight)
            return -1;
        if (a.weight < b.weight)
            return 1;
        return 0;
    };
    HomePage.prototype.orderTeamsByWeightLowestToHeighest = function (a, b) {
        function getTeamWeight(team) {
            var weight = 0;
            for (var i = 0; i < team.players.length; i++) {
                weight = team.players[i].weight + weight;
            }
            return weight;
        }
        if (getTeamWeight(a) < getTeamWeight(b))
            return -1;
        if (getTeamWeight(a) > getTeamWeight(b))
            return 1;
        return 0;
    };
    return HomePage;
}());
HomePage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-home',template:/*ion-inline-start:"/Users/braydengirard/Development/playersort/src/pages/home/home.html"*/'<ion-header no-border>\n  <!--\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>Home</ion-title>\n  </ion-navbar>\n-->\n  <ion-grid>\n    <ion-row>\n      <ion-col>\n        <h1>Player Sort</h1>\n      </ion-col>\n      <ion-col>\n        <button ion-button float-right color="secondary">Register</button>\n        <button ion-button color="light" outline float-right>Login</button>\n      </ion-col>\n    </ion-row>\n  </ion-grid>\n</ion-header>\n\n<ion-content>\n  <ion-grid>\n    <ion-row>\n      <ion-col col-12 col-sm-5>\n        <ion-card>\n          <ion-card-header text-center>\n            Add New Player\n          </ion-card-header>\n          <ion-card-content>\n            <ion-list>\n              <ion-item>\n                <ion-input [(ngModel)]="name" type="text" placeholder="Player Name"></ion-input>\n              </ion-item>\n              <ion-item>\n                <ion-label>Player Weight</ion-label>\n                <ion-select [(ngModel)]="weight">\n                  <ion-option *ngFor="let val of weightValues" [value]="val.value">{{ val.label }}</ion-option>\n                </ion-select>\n              </ion-item>\n            </ion-list>\n            <button ion-button color="secondary" block (click)="addPlayer()">Add Player</button>\n          </ion-card-content>\n        </ion-card>\n      </ion-col>\n      <ion-col col-12 col-sm-7>\n        <ion-card>\n          <ion-card-header text-center>\n            Your Players\n          </ion-card-header>\n          <ion-card-content>\n            <ion-scroll style="height:300px" scrollY="true">\n              <ion-list scroll="true">\n                <ion-card *ngIf="group.players.length === 0" color="dark">\n                  <ion-card-content color="dark">\n                    <ion-item color="dark">\n                      <ion-label>You have not added any players.</ion-label>\n                    </ion-item>\n                  </ion-card-content>\n                </ion-card>\n                <ion-card *ngFor="let player of group.players" color="dark">\n                  <ion-card-content color="dark">\n                    <ion-item color="dark">\n                      <ion-label>{{ player.name }}</ion-label>\n                      <ion-icon class="hidden-md" name="star" color="primary" item-end></ion-icon>\n                      <ion-icon *ngIf="player.weight > 1" class="hidden-md" name="star" color="primary" item-end></ion-icon>\n                      <ion-icon *ngIf="player.weight > 2" class="hidden-md" name="star" color="primary" item-end></ion-icon>\n                      <ion-icon *ngIf="player.weight > 3" class="hidden-md" name="star" color="primary" item-end></ion-icon>\n                      <ion-icon *ngIf="player.weight > 4" class="hidden-md" name="star" color="primary" item-end></ion-icon>\n                      <ion-icon *ngIf="player.weight < 5" class="hidden-md" name="star-outline" color="primary" item-end></ion-icon>\n                      <ion-icon *ngIf="player.weight < 4" class="hidden-md" name="star-outline" color="primary" item-end></ion-icon>\n                      <ion-icon *ngIf="player.weight < 3" class="hidden-md" name="star-outline" color="primary" item-end></ion-icon>\n                      <ion-icon *ngIf="player.weight < 2" class="hidden-md" name="star-outline" color="primary" item-end></ion-icon>\n                      <ion-icon class="show-md" name="star" color="primary" item-end>{{ player.weight }}</ion-icon>\n                      <ion-toggle [(ngModel)]="player.active"></ion-toggle>\n                      <button class="close-button" ion-button (click)="removePlayer(player.name)" icon-only clear item-end>\n                          <ion-icon name="close" color="danger"></ion-icon>\n                      </button>\n                    </ion-item>\n                  </ion-card-content>\n                </ion-card>\n              </ion-list>\n            </ion-scroll>\n            <button *ngIf="teams.length === 0" ion-button color="secondary" block (click)="showTeamPrompt()">Generate Teams</button>\n            <button *ngIf="teams.length > 0" ion-button color="secondary" block (click)="showTeamPrompt()">Regenerate Teams</button>\n          </ion-card-content>\n        </ion-card>\n      </ion-col>\n    </ion-row>\n    <ion-row>\n      <ion-col col-12 col-sm-6 *ngFor="let team of teams">\n        <ion-card>\n          <ion-card-header text-center>\n            Team {{ team.name }}\n          </ion-card-header>\n          <ion-card-content>\n            <ion-scroll style="height:300px" scrollY="true">\n              <ion-list scroll="true">\n                <ion-card *ngFor="let player of team.players" color="dark">\n                  <ion-card-content color="dark">\n                    <ion-item color="dark" text-center>\n                      <ion-label>{{ player.name }}</ion-label>\n                    </ion-item>\n                  </ion-card-content>\n                </ion-card>\n              </ion-list>\n            </ion-scroll>\n          </ion-card-content>\n        </ion-card>\n      </ion-col>\n    </ion-row>\n  </ion-grid>\n</ion-content>\n'/*ion-inline-end:"/Users/braydengirard/Development/playersort/src/pages/home/home.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */], __WEBPACK_IMPORTED_MODULE_2__ionic_storage__["b" /* Storage */]])
], HomePage);

//# sourceMappingURL=home.js.map

/***/ }),

/***/ 194:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(195);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(213);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 213:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_storage__ = __webpack_require__(188);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_component__ = __webpack_require__(257);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_home_home__ = __webpack_require__(193);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_status_bar__ = __webpack_require__(189);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_splash_screen__ = __webpack_require__(192);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};








var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["L" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_4__app_component__["a" /* MyApp */],
            __WEBPACK_IMPORTED_MODULE_5__pages_home_home__["a" /* HomePage */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["d" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_4__app_component__["a" /* MyApp */], {}, {
                links: []
            }),
            __WEBPACK_IMPORTED_MODULE_3__ionic_storage__["a" /* IonicStorageModule */].forRoot()
        ],
        bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["b" /* IonicApp */]],
        entryComponents: [
            __WEBPACK_IMPORTED_MODULE_4__app_component__["a" /* MyApp */],
            __WEBPACK_IMPORTED_MODULE_5__pages_home_home__["a" /* HomePage */]
        ],
        providers: [
            __WEBPACK_IMPORTED_MODULE_6__ionic_native_status_bar__["a" /* StatusBar */],
            __WEBPACK_IMPORTED_MODULE_7__ionic_native_splash_screen__["a" /* SplashScreen */],
            { provide: __WEBPACK_IMPORTED_MODULE_1__angular_core__["v" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["c" /* IonicErrorHandler */] }
        ]
    })
], AppModule);

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 257:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(189);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(192);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_home_home__ = __webpack_require__(193);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var MyApp = (function () {
    function MyApp(platform, statusBar, splashScreen) {
        this.platform = platform;
        this.statusBar = statusBar;
        this.splashScreen = splashScreen;
        this.rootPage = __WEBPACK_IMPORTED_MODULE_4__pages_home_home__["a" /* HomePage */];
        this.initializeApp();
        // used for an example of ngFor and navigation
        this.pages = [
            { title: 'Home', component: __WEBPACK_IMPORTED_MODULE_4__pages_home_home__["a" /* HomePage */] }
        ];
    }
    MyApp.prototype.initializeApp = function () {
        var _this = this;
        this.platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            _this.statusBar.styleDefault();
            _this.splashScreen.hide();
        });
    };
    MyApp.prototype.openPage = function (page) {
        // Reset the content nav to have just this page
        // we wouldn't want the back button to show in this scenario
        this.nav.setRoot(page.component);
    };
    return MyApp;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_14" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* Nav */]),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* Nav */])
], MyApp.prototype, "nav", void 0);
MyApp = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({template:/*ion-inline-start:"/Users/braydengirard/Development/playersort/src/app/app.html"*/'<ion-menu [content]="content">\n  <ion-header>\n    <ion-toolbar>\n      <ion-title>Menu</ion-title>\n    </ion-toolbar>\n  </ion-header>\n\n  <ion-content>\n    <ion-list>\n      <button menuClose ion-item *ngFor="let p of pages" (click)="openPage(p)">\n        {{p.title}}\n      </button>\n    </ion-list>\n  </ion-content>\n\n</ion-menu>\n\n<!-- Disable swipe-to-go-back because it\'s poor UX to combine STGB with side menus -->\n<ion-nav [root]="rootPage" #content swipeBackEnabled="false"></ion-nav>'/*ion-inline-end:"/Users/braydengirard/Development/playersort/src/app/app.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */]])
], MyApp);

//# sourceMappingURL=app.component.js.map

/***/ })

},[194]);
//# sourceMappingURL=main.js.map