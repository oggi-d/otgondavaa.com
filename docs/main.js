(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "./src/$$_lazy_route_resource lazy recursive":
/*!**********************************************************!*\
  !*** ./src/$$_lazy_route_resource lazy namespace object ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error('Cannot find module "' + req + '".');
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "./src/$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "./src/app/aboutme/aboutme.component.html":
/*!************************************************!*\
  !*** ./src/app/aboutme/aboutme.component.html ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"pa-15\">\n  <div class=\"jscode\">\n    <span class=\"jsline\">(<span class=\"kw-def\">function</span>&nbsp;<span class=\"kw-func\">AboutMe</span>(){{\"{\"}}</span>\n    <span class=\"jsline tab\"><span class=\"kw-def\">const</span>&nbsp;<span class=\"kw-var\">oggi</span> = {{\"{\"}}</span>\n    <span class=\"jsline tab2\"><span class=\"kw-str\">\"Location\"</span>: {{\"{\"}}</span>\n    <span class=\"jsline tab3\"><span class=\"kw-str\">\"Galaxy\"</span>: <span class=\"kw-str\">\"The Milky Way\"</span>,</span>\n    <span class=\"jsline tab3\"><span class=\"kw-str\">\"Star\"</span>: <span class=\"kw-str\">\"The Sun in the Orion Arm\"</span>,</span>\n    <span class=\"jsline tab3\"><span class=\"kw-str\">\"Planet\"</span>: <span class=\"kw-str\">\"The Earth\"</span>,</span>\n    <span class=\"jsline tab3\"><span class=\"kw-str\">\"Country\"</span>: <span class=\"kw-str\">\"USA\"</span>,</span>\n    <span class=\"jsline tab2\">{{\"}\"}},</span>\n    <span class=\"jsline tab2\"><span class=\"kw-str\">\"Tags\"</span>: {{\"{\"}}</span>\n    <span class=\"jsline tab3\"><span class=\"kw-str\">\"Web\"</span>: <span class=\"kw-str\">\"JavaScript, HTML, CSS\"</span>,</span>\n    <span class=\"jsline tab3\"><span class=\"kw-str\">\"Tech\"</span>: <span class=\"kw-str\">\"ASP.NET MVC C#, AngularJS, LESS\"</span>,</span>\n    <span class=\"jsline tab3\"><span class=\"kw-str\">\"DB\"</span>: <span class=\"kw-str\">\"Oracle, MSSQL, MySQL, MongoDB<i class=\"material-icons help\" style=\"font-size: 16px; vertical-align: middle;\" matTooltip=\"Academic knowledge\">help_outline</i>\"</span>,</span>\n    <span class=\"jsline tab3\"><span class=\"kw-str\">\"Tools\"</span>: <span class=\"kw-str\">\"GIT, Agile Scrum\"</span>,</span>\n    <span class=\"jsline tab3\"><span class=\"kw-str\">\"Web Services\"</span>: <span class=\"kw-str\">\"REST, SOAP\"</span></span>\n    <span class=\"jsline tab2\">{{\"}\"}},</span>\n    <span class=\"jsline tab2\"><span class=\"kw-str\">\"Advantages\"</span>: <span class=\"kw-str\">\"Quick Learner, Good Team Player\"</span></span>\n    <span class=\"jsline tab\">{{\"}\"}};</span>\n    <span class=\"jsline tab\"><span class=\"kw-ret\">return</span>&nbsp;<span class=\"kw-var\">oggi</span>;</span>\n    <span class=\"jsline\">{{\"}\"}})();</span>\n  </div>\n</div>"

/***/ }),

/***/ "./src/app/aboutme/aboutme.component.less":
/*!************************************************!*\
  !*** ./src/app/aboutme/aboutme.component.less ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/aboutme/aboutme.component.ts":
/*!**********************************************!*\
  !*** ./src/app/aboutme/aboutme.component.ts ***!
  \**********************************************/
/*! exports provided: AboutmeComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AboutmeComponent", function() { return AboutmeComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var AboutmeComponent = /** @class */ (function () {
    function AboutmeComponent() {
    }
    AboutmeComponent.prototype.ngOnInit = function () {
    };
    AboutmeComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-aboutme',
            template: __webpack_require__(/*! ./aboutme.component.html */ "./src/app/aboutme/aboutme.component.html"),
            styles: [__webpack_require__(/*! ./aboutme.component.less */ "./src/app/aboutme/aboutme.component.less")]
        }),
        __metadata("design:paramtypes", [])
    ], AboutmeComponent);
    return AboutmeComponent;
}());



/***/ }),

/***/ "./src/app/app.component.html":
/*!************************************!*\
  !*** ./src/app/app.component.html ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<mat-toolbar color=\"primary\" class=\"main-toolbar\">\n  <span>\n    <a [routerLink]=\"'aboutme'\"><img [src]=\"'/assets/favicon-96x96.png'\" /></a>\n  </span>\n\n  <a mat-button [routerLink]=\"menu.routerLink\" fxHide.lt-sm *ngFor=\"let menu of Menus\">\n    <i class=\"material-icons\">{{menu.icon}}</i>\n    <span>{{menu.text}}</span>\n  </a>\n  <span fxFlex=\"1 0 0\"></span>\n  <button mat-button [matMenuTriggerFor]=\"dropdownMenu\" fxHide.gt-xs>\n    <i class=\"material-icons\">menu</i>\n  </button>\n  <mat-menu #dropdownMenu=\"matMenu\" color=\"primary\">\n    <button mat-menu-item *ngFor=\"let menu of Menus\" [routerLink]=\"menu.routerLink\">\n      <i class=\"material-icons\">{{menu.icon}}</i>\n      <span>{{menu.text}}</span>\n    </button>\n  </mat-menu>\n</mat-toolbar>\n<div class=\"pa-15 main-container\">\n  <mat-card class=\"main-card main-card-content\">\n    <mat-card-header>\n      <div mat-card-avatar class=\"main-header-image\"></div>\n      <mat-card-title>Otgondavaa Dashnyam</mat-card-title>\n      <mat-card-subtitle>A\n        <span class=\"specific\">Proactive Efficient</span> Full Stack Web Developer</mat-card-subtitle>\n    </mat-card-header>\n    <mat-divider></mat-divider>\n    <mat-card-content>\n      <router-outlet></router-outlet>\n    </mat-card-content>\n  </mat-card>\n</div>"

/***/ }),

/***/ "./src/app/app.component.less":
/*!************************************!*\
  !*** ./src/app/app.component.less ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "img {\n  width: 32px;\n  height: auto;\n  vertical-align: middle;\n}\nspan {\n  padding: 0 5px;\n}\ni {\n  vertical-align: middle;\n  display: inline-block;\n}\n"

/***/ }),

/***/ "./src/app/app.component.ts":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var AppComponent = /** @class */ (function () {
    function AppComponent() {
        this.Menus = [{
                routerLink: 'aboutme',
                icon: 'sentiment_satisfied_alt',
                text: 'About Me'
            }, {
                routerLink: 'works',
                icon: 'dashboard',
                text: 'Works'
            }, {
                routerLink: 'skills',
                icon: 'school',
                text: 'What I Can Do'
            }, {
                routerLink: 'contacts',
                icon: 'email',
                text: 'Contact Me'
            }];
    }
    AppComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-root',
            template: __webpack_require__(/*! ./app.component.html */ "./src/app/app.component.html"),
            styles: [__webpack_require__(/*! ./app.component.less */ "./src/app/app.component.less")]
        })
    ], AppComponent);
    return AppComponent;
}());



/***/ }),

/***/ "./src/app/app.module.ts":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm5/platform-browser.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app.component */ "./src/app/app.component.ts");
/* harmony import */ var _material_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./material.module */ "./src/app/material.module.ts");
/* harmony import */ var _routing_module__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./routing.module */ "./src/app/routing.module.ts");
/* harmony import */ var _aboutme_aboutme_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./aboutme/aboutme.component */ "./src/app/aboutme/aboutme.component.ts");
/* harmony import */ var _skills_skills_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./skills/skills.component */ "./src/app/skills/skills.component.ts");
/* harmony import */ var _works_works_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./works/works.component */ "./src/app/works/works.component.ts");
/* harmony import */ var _contacts_contacts_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./contacts/contacts.component */ "./src/app/contacts/contacts.component.ts");
/* harmony import */ var _angular_flex_layout__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/flex-layout */ "./node_modules/@angular/flex-layout/esm5/flex-layout.es5.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};










var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            declarations: [
                _app_component__WEBPACK_IMPORTED_MODULE_2__["AppComponent"],
                _aboutme_aboutme_component__WEBPACK_IMPORTED_MODULE_5__["AboutmeComponent"],
                _skills_skills_component__WEBPACK_IMPORTED_MODULE_6__["SkillsComponent"],
                _works_works_component__WEBPACK_IMPORTED_MODULE_7__["WorksComponent"],
                _contacts_contacts_component__WEBPACK_IMPORTED_MODULE_8__["ContactsComponent"],
            ],
            imports: [
                _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"],
                _angular_flex_layout__WEBPACK_IMPORTED_MODULE_9__["FlexLayoutModule"],
                _material_module__WEBPACK_IMPORTED_MODULE_3__["MaterialModule"],
                _routing_module__WEBPACK_IMPORTED_MODULE_4__["RoutingModule"]
            ],
            providers: [],
            bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_2__["AppComponent"]]
        })
    ], AppModule);
    return AppModule;
}());



/***/ }),

/***/ "./src/app/contacts/contacts.component.html":
/*!**************************************************!*\
  !*** ./src/app/contacts/contacts.component.html ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"pa-15\">\n  <div class=\"jscode\">\n    <span class=\"jsline\"><span class=\"kw-def\">const</span>&nbsp;<span class=\"kw-var\">global</span> = {{\"{}\"}};</span>\n    <span class=\"jsline\">(<span class=\"kw-def\">function</span>&nbsp;<span class=\"kw-func\">ContactMe</span>(<span class=\"kw-var\">g</span>) {{\"{\"}}</span>\n    <span class=\"jsline tab\"><span class=\"kw-var\">g.Email</span> = <a href=\"mailto:da.otgondavaa@gmail.com\"><span class=\"kw-str\">\"da.otgondavaa@gmail.com\"</span></a>;</span>\n    <span class=\"jsline tab\"><span class=\"kw-var\">g.Phone</span> = <a href=\"tel:3127852468\"><span class=\"kw-str\">\"(+1)312-785-2468\"</span></a>;</span>\n    <span class=\"jsline tab\"><span class=\"kw-var\">g.Web</span> = <a href=\"http://otgondavaa.com\"><span class=\"kw-str\">\"www.otgondavaa.com\"</span></a>;</span>\n    <span class=\"jsline tab\"><span class=\"kw-var\">g.Location</span> = <a href=\"https://goo.gl/66urav\"><span class=\"kw-str\">\"Chicago, IL\"</span></a>;</span>\n    <span class=\"jsline tab\"><span class=\"kw-var\">g.LinkedIn</span> = <a href=\"https://www.linkedin.com/in/otgondavaa-dashnyam/\"><span class=\"kw-str\">\"linkedin.com/in/otgondavaa-dashnyam\"</span></a>;</span>\n    <span class=\"jsline tab\"><span class=\"kw-var\">g.GitHub</span> = <a href=\"https://github.com/oogii1\"><span class=\"kw-str\">\"github.com/oogii1\"</span></a>;</span>\n    <span class=\"jsline tab\"><span class=\"kw-var\">g.</span><span class=\"kw-func\">CanRelocate</span> = <span class=\"kw-def\">function</span> () {{\"{\"}}</span>\n    <span class=\"jsline tab2\"><span class=\"kw-ret\">return</span>&nbsp;<span class=\"kw-def\">true</span>;</span>\n    <span class=\"jsline tab\">{{\"}\"}};</span>\n    <span class=\"jsline tab\"><span class=\"kw-var\">g.</span><span class=\"kw-func\">DownloadResume</span> = <span class=\"kw-def\">function</span> () {{\"{\"}}</span>\n    <span class=\"jsline tab2\"><span class=\"kw-ret\">return</span>&nbsp;<a href=\"/assets/OggiResume.pdf\"><span class=\"kw-str\">\"OggiResume.pdf\"</span></a>;</span>\n    <span class=\"jsline tab\">{{\"}\"}};</span>\n    <span class=\"jsline\">{{\"}\"}})(<span class=\"kw-var\">global</span>);</span>\n  </div>\n</div>"

/***/ }),

/***/ "./src/app/contacts/contacts.component.less":
/*!**************************************************!*\
  !*** ./src/app/contacts/contacts.component.less ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "a {\n  color: #ce9178;\n}\n"

/***/ }),

/***/ "./src/app/contacts/contacts.component.ts":
/*!************************************************!*\
  !*** ./src/app/contacts/contacts.component.ts ***!
  \************************************************/
/*! exports provided: ContactsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ContactsComponent", function() { return ContactsComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var ContactsComponent = /** @class */ (function () {
    function ContactsComponent() {
    }
    ContactsComponent.prototype.ngOnInit = function () {
    };
    ContactsComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-contacts',
            template: __webpack_require__(/*! ./contacts.component.html */ "./src/app/contacts/contacts.component.html"),
            styles: [__webpack_require__(/*! ./contacts.component.less */ "./src/app/contacts/contacts.component.less")]
        }),
        __metadata("design:paramtypes", [])
    ], ContactsComponent);
    return ContactsComponent;
}());



/***/ }),

/***/ "./src/app/material.module.ts":
/*!************************************!*\
  !*** ./src/app/material.module.ts ***!
  \************************************/
/*! exports provided: MaterialModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MaterialModule", function() { return MaterialModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser/animations */ "./node_modules/@angular/platform-browser/fesm5/animations.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var MaterialModule = /** @class */ (function () {
    function MaterialModule() {
    }
    MaterialModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [
                _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_1__["BrowserAnimationsModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_3__["MatButtonModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_3__["MatMenuModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_3__["MatToolbarModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_3__["MatIconModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_3__["MatCardModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_3__["MatDividerModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_3__["MatTooltipModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_3__["MatChipsModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_3__["MatCheckboxModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_3__["MatTableModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_3__["MatBadgeModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_3__["MatTabsModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormsModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_2__["ReactiveFormsModule"]
            ],
            exports: [
                _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_1__["BrowserAnimationsModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_3__["MatButtonModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_3__["MatMenuModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_3__["MatToolbarModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_3__["MatIconModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_3__["MatCardModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_3__["MatDividerModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_3__["MatTooltipModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_3__["MatChipsModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_3__["MatCheckboxModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_3__["MatTableModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_3__["MatBadgeModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_3__["MatTabsModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormsModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_2__["ReactiveFormsModule"]
            ]
        })
    ], MaterialModule);
    return MaterialModule;
}());



/***/ }),

/***/ "./src/app/routing.module.ts":
/*!***********************************!*\
  !*** ./src/app/routing.module.ts ***!
  \***********************************/
/*! exports provided: RoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RoutingModule", function() { return RoutingModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _aboutme_aboutme_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./aboutme/aboutme.component */ "./src/app/aboutme/aboutme.component.ts");
/* harmony import */ var _works_works_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./works/works.component */ "./src/app/works/works.component.ts");
/* harmony import */ var _skills_skills_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./skills/skills.component */ "./src/app/skills/skills.component.ts");
/* harmony import */ var _contacts_contacts_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./contacts/contacts.component */ "./src/app/contacts/contacts.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};






var routes = [
    { path: '', redirectTo: 'aboutme', pathMatch: 'full' },
    { path: 'aboutme', component: _aboutme_aboutme_component__WEBPACK_IMPORTED_MODULE_2__["AboutmeComponent"] },
    { path: 'works', component: _works_works_component__WEBPACK_IMPORTED_MODULE_3__["WorksComponent"] },
    { path: 'skills', component: _skills_skills_component__WEBPACK_IMPORTED_MODULE_4__["SkillsComponent"] },
    { path: 'contacts', component: _contacts_contacts_component__WEBPACK_IMPORTED_MODULE_5__["ContactsComponent"] },
];
var RoutingModule = /** @class */ (function () {
    function RoutingModule() {
    }
    RoutingModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [
                _angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forRoot(routes, { useHash: true })
            ],
            exports: [
                _angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]
            ],
            declarations: [],
            providers: []
        })
    ], RoutingModule);
    return RoutingModule;
}());



/***/ }),

/***/ "./src/app/skills/skills.component.html":
/*!**********************************************!*\
  !*** ./src/app/skills/skills.component.html ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"pa-15\">\n  <div fxLayout=\"column\" fxLayout.gt-xs=\"row\" fxLayoutAlign=\"start stretch\" fxLayoutGap=\"10px\" fxLayoutGap.gt-xs=\"15px\">\n    <div fxLayout=\"row\" fxLayoutGap=\"10px\" fxLayoutGap.gt-xs=\"15px\">\n      <mat-checkbox fxFlex.xs=\"50\" [(ngModel)]=\"Filter.VeryGood\" color=\"primary\" (change)=\"applyFilter()\">Very good</mat-checkbox>\n      <mat-checkbox fxFlex.xs=\"50\" [(ngModel)]=\"Filter.Good\" color=\"primary\" (change)=\"applyFilter()\">Good</mat-checkbox>\n    </div>\n    <div fxLayout=\"row\" fxLayoutGap=\"10px\" fxLayoutGap.gt-xs=\"15px\">\n      <mat-checkbox fxFlex.xs=\"50\" [(ngModel)]=\"Filter.Academic\" color=\"warn\" (change)=\"applyFilter()\">Academic</mat-checkbox>\n      <mat-checkbox fxFlex.xs=\"50\" [(ngModel)]=\"Filter.NotBad\" (change)=\"applyFilter()\">Not bad</mat-checkbox>\n    </div>\n  </div>\n</div>\n\n<table mat-table [dataSource]=\"Skills\">\n\n  <ng-container matColumnDef=\"Name\">\n    <th mat-header-cell *matHeaderCellDef style=\"padding-left: 12px;\"> Skill <span fxHide.gt-xs>(Exp years)</span> </th>\n    <td mat-cell *matCellDef=\"let element\" style=\"padding-left: 12px;\">\n      {{element.Name}}\n      <span class=\"mybadge\" fxHide.gt-xs>{{element.Experience}} y</span>\n    </td>\n  </ng-container>\n\n  <ng-container matColumnDef=\"Experience\">\n    <th mat-header-cell *matHeaderCellDef fxHide.lt-sm> Exp </th>\n    <td mat-cell *matCellDef=\"let element\" fxHide.lt-sm>\n      <span class=\"mybadge big\">{{element.Experience}} years</span>\n    </td>\n  </ng-container>\n\n  <ng-container matColumnDef=\"Point\">\n    <th mat-header-cell *matHeaderCellDef style=\"padding-right: 12px;\"> Prof </th>\n    <td mat-cell *matCellDef=\"let element\" style=\"padding-right: 12px;\">\n      <span [style.color]=\"profColorPicker(element)\"> {{profPicker(element)}} </span>\n    </td>\n  </ng-container>\n\n  <tr mat-header-row *matHeaderRowDef=\"DisplayedColumns\"></tr>\n  <tr mat-row *matRowDef=\"let row; columns: DisplayedColumns;\" style=\"height: 36px;\"></tr>\n</table>"

/***/ }),

/***/ "./src/app/skills/skills.component.less":
/*!**********************************************!*\
  !*** ./src/app/skills/skills.component.less ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/skills/skills.component.ts":
/*!********************************************!*\
  !*** ./src/app/skills/skills.component.ts ***!
  \********************************************/
/*! exports provided: SkillsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SkillsComponent", function() { return SkillsComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var SkillsComponent = /** @class */ (function () {
    function SkillsComponent() {
        this.SkillsData = [
            { Name: "JS, HTML, CSS", Experience: 6, Point: 4 },
            { Name: "ASP.NET MVC C#", Experience: 6, Point: 4 },
            { Name: "MSSQL, Oracle", Experience: 6, Point: 4 },
            { Name: "AngularJS 1.x", Experience: 3, Point: 4 },
            { Name: "LESS, GIT", Experience: 4, Point: 4 },
            { Name: "Angular 5.x+", Experience: 0, Point: 2 },
            { Name: "NodeJS, ExpressJS", Experience: 0, Point: 2 },
            { Name: "MongoDB", Experience: 0, Point: 2 },
            { Name: "REST, SOAP", Experience: 4, Point: 3 },
            { Name: "jQuery", Experience: 6, Point: 4 },
            { Name: "Bootstrap", Experience: 6, Point: 4 },
            { Name: "Java, PHP", Experience: 0, Point: 1 },
            { Name: "iOS, Android", Experience: 0, Point: 1 },
            { Name: "MySQL", Experience: 1, Point: 3 },
        ];
        this.Skills = [];
        this.DisplayedColumns = ['Name', 'Experience', 'Point'];
        this.Filter = {
            VeryGood: true,
            Good: true,
            Academic: true,
            NotBad: false
        };
    }
    SkillsComponent.prototype.ngOnInit = function () {
        this.applyFilter();
    };
    SkillsComponent.prototype.colorPicker = function (item) {
        switch (item.Point) {
            case 4: return "primary";
            case 3: return "accent";
            case 2: return "warn";
            case 1:
            default: return "";
        }
    };
    SkillsComponent.prototype.profPicker = function (item) {
        switch (item.Point) {
            case 4: return "Very Good";
            case 3: return "Good";
            case 2: return "Academic";
            case 1:
            default: return "Not bad";
        }
    };
    SkillsComponent.prototype.profColorPicker = function (item) {
        switch (item.Point) {
            case 4:
            case 3: return "#01ff2c";
            case 2: return "#fbff09";
            case 1:
            default: return "Not bad";
        }
    };
    SkillsComponent.prototype.rowFilter = function (item) {
        if (item.Point == 4 && this.Filter.VeryGood)
            return true;
        else if (item.Point == 3 && this.Filter.Good)
            return true;
        else if (item.Point == 2 && this.Filter.Academic)
            return true;
        else if (item.Point == 1 && this.Filter.NotBad)
            return true;
        return false;
    };
    SkillsComponent.prototype.applyFilter = function () {
        this.Skills = [];
        for (var _i = 0, _a = this.SkillsData; _i < _a.length; _i++) {
            var skill = _a[_i];
            if (this.rowFilter(skill))
                this.Skills.push(skill);
        }
    };
    SkillsComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-skills',
            template: __webpack_require__(/*! ./skills.component.html */ "./src/app/skills/skills.component.html"),
            styles: [__webpack_require__(/*! ./skills.component.less */ "./src/app/skills/skills.component.less")]
        }),
        __metadata("design:paramtypes", [])
    ], SkillsComponent);
    return SkillsComponent;
}());



/***/ }),

/***/ "./src/app/works/works.component.html":
/*!********************************************!*\
  !*** ./src/app/works/works.component.html ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"pa-15\">\n  <div class=\"jscode\">\n    <span class=\"jsline\">(<span class=\"kw-def\">function</span>&nbsp;<span class=\"kw-func\">LoadWorks</span>() {{\"{\"}}</span>\n    <span class=\"jsline tab\"><span class=\"kw-def\">const</span>&nbsp;<span class=\"kw-var\">works</span> = [{{\"{\"}} </span>\n    <span class=\"jsline tab2\"><span class=\"kw-str\">\"Company\"</span>: <span class=\"kw-def\">undefined</span>,</span>\n    <span class=\"jsline tab2\"><span class=\"kw-str\">\"Title\"</span>: <span class=\"kw-def\">undefined</span>,</span>\n    <span class=\"jsline tab2\"><span class=\"kw-str\">\"Duration\"</span>: <span class=\"kw-def\">undefined</span>,</span>\n    <span class=\"jsline tab2\"><span class=\"kw-str\">\"Location\"</span>: <span class=\"kw-str\">\"USA\"</span></span>\n    <span class=\"jsline tab\">{{\"}\"}}, {{\"{\"}}</span>\n    <span class=\"jsline tab2\"><span class=\"kw-str\">\"Company\"</span>: <span class=\"kw-str\">\"Z24 LLC\"</span>,</span>\n    <span class=\"jsline tab2\"><span class=\"kw-str\">\"Title\"</span>: <span class=\"kw-str\">\"Senior Software Engineer\"</span>,</span>\n    <span class=\"jsline tab2\"><span class=\"kw-str\">\"Duration\"</span>: <span class=\"kw-str\">\"Apr 2014 - Aug 2017\"</span>,</span>\n    <span class=\"jsline tab2\"><span class=\"kw-str\">\"Location\"</span>: <span class=\"kw-str\">\"Mongolia\"</span></span>\n    <span class=\"jsline tab\">{{\"}\"}}, {{\"{\"}}</span>\n    <span class=\"jsline tab2\"><span class=\"kw-str\">\"Company\"</span>: <span class=\"kw-str\">\"GrapeCity Mongolia\"</span>,</span>\n    <span class=\"jsline tab2\"><span class=\"kw-str\">\"Title\"</span>: <span class=\"kw-str\">\"Software Engineer\"</span>,</span>\n    <span class=\"jsline tab2\"><span class=\"kw-str\">\"Duration\"</span>: <span class=\"kw-str\">\"Jan 2012 - Apr 2014\"</span>,</span>\n    <span class=\"jsline tab2\"><span class=\"kw-str\">\"Location\"</span>: <span class=\"kw-str\">\"Mongolia\"</span></span>\n    <span class=\"jsline tab\">{{\"}\"}}, {{\"{\"}}</span>\n    <span class=\"jsline tab2\"><span class=\"kw-str\">\"Company\"</span>: <span class=\"kw-str\">\"International University of Ulaanbaatar\"</span>,</span>\n    <span class=\"jsline tab2\"><span class=\"kw-str\">\"Title\"</span>: <span class=\"kw-str\">\"Assistant in Computer Science Department\"</span>,</span>\n    <span class=\"jsline tab2\"><span class=\"kw-str\">\"Duration\"</span>: <span class=\"kw-str\">\"Sep 2010 - Jan 2012\"</span>,</span>\n    <span class=\"jsline tab2\"><span class=\"kw-str\">\"Location\"</span>: <span class=\"kw-str\">\"Mongolia\"</span></span>\n    <span class=\"jsline tab\">{{\"}\"}}];</span>\n    <span class=\"jsline tab\"><span class=\"kw-ret\">return</span>&nbsp;<span class=\"kw-var\">works</span>;</span>\n    <span class=\"jsline\">{{\"}\"}})();</span>\n  </div>\n</div>"

/***/ }),

/***/ "./src/app/works/works.component.less":
/*!********************************************!*\
  !*** ./src/app/works/works.component.less ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/works/works.component.ts":
/*!******************************************!*\
  !*** ./src/app/works/works.component.ts ***!
  \******************************************/
/*! exports provided: WorksComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WorksComponent", function() { return WorksComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var WorksComponent = /** @class */ (function () {
    function WorksComponent() {
    }
    WorksComponent.prototype.ngOnInit = function () {
    };
    WorksComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-works',
            template: __webpack_require__(/*! ./works.component.html */ "./src/app/works/works.component.html"),
            styles: [__webpack_require__(/*! ./works.component.less */ "./src/app/works/works.component.less")]
        }),
        __metadata("design:paramtypes", [])
    ], WorksComponent);
    return WorksComponent;
}());



/***/ }),

/***/ "./src/environments/environment.ts":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
var environment = {
    production: false
};
/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.


/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser-dynamic */ "./node_modules/@angular/platform-browser-dynamic/fesm5/platform-browser-dynamic.js");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/app.module */ "./src/app/app.module.ts");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./environments/environment */ "./src/environments/environment.ts");




if (_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["enableProdMode"])();
}
Object(_angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__["platformBrowserDynamic"])().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"])
    .catch(function (err) { return console.log(err); });


/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! D:\Products\Joy\otgondavaa.com\my-app\src\main.ts */"./src/main.ts");


/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map