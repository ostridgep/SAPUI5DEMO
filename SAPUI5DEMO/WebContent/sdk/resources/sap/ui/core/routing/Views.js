/*!
 * SAP UI development toolkit for HTML5 (SAPUI5/OpenUI5)
 * (c) Copyright 2009-2015 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','sap/ui/base/EventProvider','sap/ui/core/UIComponent'],function($,E,U){"use strict";return E.extend("sap.ui.core.routing.Views",{constructor:function(o){if(!o){o={};}this._oViews={};this._oComponent=o.component;if(this._oComponent){}E.apply(this,arguments);},metadata:{publicMethods:["getView","setView"]},getView:function(o){return new Promise(function(s){s(this._getView(o));}.bind(this));},setView:function(v,V){this._checkViewName(v);this._oViews[v]=V;return this;},destroy:function(){var p;E.prototype.destroy.apply(this);for(p in this._oViews){if(this._oViews.hasOwnProperty(p)){this._oViews[p].destroy();}}this._oViews=undefined;this.bIsDestroyed=true;return this;},attachCreated:function(d,f,l){return this.attachEvent("created",d,f,l);},detachCreated:function(f,l){return this.detachEvent("created",f,l);},fireCreated:function(a){return this.fireEvent("created",a);},_getView:function(o){if(this._oComponent&&o.id){o=$.extend({},o,{id:this._oComponent.createId(o.id)});}return this._getViewWithGlobalId(o);},_getViewWithGlobalId:function(o){function c(){return sap.ui.view(o);}if(!o){$.sap.log.error("the oOptions parameter of getView is mandatory",this);}var v,V=o.viewName;this._checkViewName(V);v=this._oViews[V];if(v){return v;}if(this._oComponent){v=this._oComponent.runAsOwner(c);}else{v=c();}this._oViews[V]=v;this.fireCreated({view:v,viewOptions:o});return v;},_checkViewName:function(v){if(!v){$.sap.log.error("A name for the view has to be defined",this);}}});},true);
