/**
 * @copyright
 */
sap.ui.define(['jquery.sap.global','sap/ui/core/IconPool'],function(q,I){"use strict";var O={};O._isEmptyObject=function(o){if(!o){return true;}if((!o._isEmpty||!o._isEmpty())&&(!o.getVisible||o.getVisible())){return false;}return true;};O._isEmptyArray=function(a){if(a){for(var i=0;i<a.length;i++){if(!O._isEmptyObject(a[i])){return false;}}}return true;};O._isEmptyRow=function(l,r){return O._isEmptyObject(l)&&O._isEmptyArray(r);};O._renderObjects=function(r,o,a){for(var i=0;i<o.length;i++){if(o[i]instanceof sap.ui.core.Control){this._renderChildControl(r,a,o[i]);}}};O._computeChildControlsToBeRendered=function(o){o.__controlsToBeRendered={};var c=o.getAttributes();for(var i=0;i<c.length;i++){o.__controlsToBeRendered[c[i].getId()]=c[i];}c=o.getStatuses();for(var i=0;i<c.length;i++){o.__controlsToBeRendered[c[i].getId()]=c[i];}var C=o.getFirstStatus();if(C){o.__controlsToBeRendered[C.getId()]=C;}C=o.getSecondStatus();if(C){o.__controlsToBeRendered[C.getId()]=C;}C=o.getAggregation("_objectNumber");if(C){o.__controlsToBeRendered[C.getId()]=C;}};O._cleanupNotRenderedChildControls=function(r,o){for(var i in o.__controlsToBeRendered){r.cleanupControlWithoutRendering(o.__controlsToBeRendered[i]);}delete o.__controlsToBeRendered;};O._renderMarkersAria=function(r,c){var a="",l=sap.ui.getCore().getLibraryResourceBundle("sap.m");if(c.getMarkFlagged()){a+=(l.getText("ARIA_FLAG_MARK_VALUE")+" ");}if(c.getMarkFavorite()){a+=(l.getText("ARIA_FAVORITE_MARK_VALUE")+" ");}if(a!==""){r.write("<div");r.writeAttribute("id",c.getId()+"-markers-aria");r.writeAttribute("aria-hidden","false");r.addClass("sapUiHidden");r.writeClasses();r.write(">");r.writeEscaped(a);r.write("</div>");}};O._getIcons=function(o){var i=[];if(o.getShowMarkers()){o._oFavIcon.setVisible(o.getMarkFavorite());o._oFlagIcon.setVisible(o.getMarkFlagged());i.push(o._oPlaceholderIcon);i.push(o._oFavIcon);i.push(o._oFlagIcon);}return i;};O._renderIntro=function(r,o,i,s){if(o.getIntroActive()){o._introText=new sap.m.Link(o.getId()+"-intro");o._introText.setText(o.getIntro());o._introText.setHref(o.getIntroHref());o._introText.setTarget(o.getIntroTarget());o._introText.press=o.introPress;}else{o._introText=new sap.m.Text(o.getId()+"-intro");o._introText.setText(o.getIntro());o._introText.setMaxLines(3);}o._introText.setTextDirection(o.getIntroTextDirection());r.write("<div");r.addClass(i);if(o.getIntroActive()){r.addClass(s);}r.writeClasses();r.write(">");this._renderChildControl(r,o,o._introText);r.write("</div>");};O._renderAttribute=function(r,o,a,f){r.write("<div");r.addClass("sapMOHAttr");r.writeClasses();if(f){r.addStyle("width","100%");r.writeStyles();}r.write(">");this._renderChildControl(r,o,a);r.write("</div>");};O._getVisibleStatuses=function(o){var v=[];if(o.getFirstStatus()&&o.getFirstStatus().getVisible()){v.push([o.getFirstStatus()]);}if(o.getSecondStatus()&&o.getSecondStatus().getVisible()){v.push([o.getSecondStatus()]);}if(o.getStatuses()){var s=o.getStatuses();for(var i=0;i<s.length;i++){if(!s[i].getVisible||s[i].getVisible()){if(s[i]instanceof sap.m.ObjectStatus||s[i]instanceof sap.m.ProgressIndicator){v.push([s[i]]);}else{q.sap.log.warning("Only sap.m.ObjectStatus or sap.m.ProgressIndicator are allowed in \"sap.m.ObjectHeader.statuses\" aggregation."+" Current object is "+s[i].constructor.getMetadata().getName()+" with id \""+s[i].getId()+"\"");}}}}return v;};O._getVisibleAttribsAndStatuses=function(o){var r=[],a=o.getAttributes(),v=[];for(var j=0;j<a.length;j++){if(a[j].getVisible()){v.push(a[j]);}}var V=this._getVisibleStatuses(o);r[0]=v;r[1]=V;return r;};O._renderRow=function(r,o,l,R){if(O._isEmptyRow(l,R)){return;}r.write("<div");r.addClass("sapMOHAttrRow");r.writeClasses();r.write(">");if(!O._isEmptyObject(l)){this._renderAttribute(r,o,l,O._isEmptyArray(R));}else if(O._isEmptyObject(l)&&!O._isEmptyArray(R)){if(R[0]instanceof sap.m.ProgressIndicator){r.write("<div");r.addClass("sapMOHAttr");r.writeClasses();r.write(">");r.write("</div>");}}if(!O._isEmptyArray(R)){r.write("<div");if(R[0]instanceof sap.m.ProgressIndicator){r.addClass("sapMOHStatusFixedWidth");}else if(R[0]instanceof sap.ui.core.Icon){r.addClass("sapMOHStatusFixedWidth");r.addClass("sapMObjStatusMarker");r.writeAttribute("aria-describedby",o.getId()+"-markers-aria");}else{r.addClass("sapMOHStatus");}r.writeClasses();r.write(">");O._renderObjects(r,R,o);r.write("</div>");}r.write("</div>");};O._renderAttributesAndStatuses=function(r,o){var a=o.getAttributes();var v=[];for(var j=0;j<a.length;j++){if(a[j].getVisible()){v.push(a[j]);}}var A=v.length;var i=[];var b=O._getIcons(o);if(!o.getResponsive()&&!O._isEmptyArray(b)){i.push(b);}var V=this._getVisibleStatuses(o);i=i.concat(V);var c=i.length;var n=A>c?A:c;if(!o.getResponsive()){if(o.getShowMarkers()){this._renderMarkersAria(r,o);}for(var C=0;C<n;C++){this._renderRow(r,o,v[C],i[C]);}}};O._renderNumber=function(r,o){if(!o.getNumber()){return;}r.write("<div");r.writeAttribute("id",o.getId()+"-numberdiv");r.addClass("sapMOHNumberDiv");r.writeClasses();r.write(">");var a=o.getAggregation("_objectNumber");if(a&&a.getNumber()){a.setTextDirection(o.getNumberTextDirection());this._renderChildControl(r,o,a);}r.write("</div>");};O._renderTitle=function(r,o){o._oTitleArrowIcon.setVisible(o.getShowTitleSelector());if(o.getShowTitleSelector()&&o._oTitleArrowIcon.getVisible()){r.write("<div");r.addClass("sapMOHTitleAndArrow");r.writeClasses();r.write(">");}if(o.getTitle()){o._titleText.setText(o.getTitle());o._titleText.setTextDirection(o.getTitleTextDirection());if(o.getTitleActive()){r.write("<a");if(o.getTitleHref()){r.writeAttributeEscaped("href",o.getTitleHref());if(o.getTitleTarget()){r.writeAttributeEscaped("target",o.getTitleTarget());}}else{r.writeAttribute("href","#");}r.writeAccessibilityState({role:"link",haspopup:!o.getTitleHref()});}else{r.write("<span");}r.writeAttribute("id",o.getId()+"-title");r.addClass("sapMOHTitle");if(o.getTitleActive()){r.writeAttribute("tabindex","0");r.addClass("sapMOHTitleActive");}if(o.getShowTitleSelector()){r.addClass("sapMOHTitleFollowArrow");}r.writeClasses();r.write(">");r.write("<h1>");this._renderChildControl(r,o,o._titleText);r.write("</h1>");if(o.getTitleActive()){r.write("</a>");}else{r.write("</span>");}}if(o.getShowTitleSelector()){r.write("<span");r.addClass("sapMOHTitleArrow");r.writeClasses();r.write(">");this._renderChildControl(r,o,o._oTitleArrowIcon);r.write("</span>");}if(o.getShowTitleSelector()&&o._oTitleArrowIcon.getVisible()){r.write("</div>");}};O._renderFullTitle=function(r,o){if(!o.getNumber()){r.addClass("sapMOHTitleDivFull");}};O._renderFullOH=function(r,o){var l=sap.ui.getCore().getLibraryResourceBundle("sap.m");if(o.getIntro()){this._renderIntro(r,o,"sapMOHIntro","sapMOHIntroActive");}r.write("<div");r.addClass("sapMOHTopRow");r.writeClasses();r.write(">");r.write("<div");r.writeAttribute("id",o.getId()+"-titlediv");r.addClass("sapMOHTitleDiv");if(o._hasIcon()){r.addClass("sapMOHTitleIcon");}this._renderFullTitle(r,o);r.writeClasses();r.write(">");if(o._hasIcon()){r.write("<div");r.addClass("sapMOHIcon");if(o.getIconActive()){r.writeAttribute("tabindex","0");r.addClass("sapMPointer");r.writeAccessibilityState({role:"link",haspopup:true,label:l.getText("OH_ARIA_ICON")});}r.writeClasses();r.write(">");this._renderChildControl(r,o,o._getImageControl());r.write("</div>");}this._renderTitle(r,o);r.write("</div>");this._renderNumber(r,o);r.write("<div class=\"sapMOHDivider\"/>");r.write("</div>");if(o._hasBottomContent()){r.write("<div");r.addClass("sapMOHBottomRow");r.writeClasses();r.write(">");this._renderAttributesAndStatuses(r,o);r.write("<div class=\"sapMOHDivider\"/>");r.write("</div>");}};O._renderCondensedOH=function(r,o){r.write("<div");r.writeAttribute("id",o.getId()+"-titlediv");r.addClass("sapMOHTitleDiv");this._renderFullTitle(r,o);r.writeClasses();r.write(">");this._renderTitle(r,o);r.write("</div>");this._renderNumber(r,o);var f=o.getAttributes()[0];if(f&&!f._isEmpty()){this._renderAttribute(r,o,f);}};O.render=function(r,o){if(o.getResponsive()){this._renderResponsive(r,o);return;}this._computeChildControlsToBeRendered(o);var c=o.getCondensed();r.write("<div");r.writeControlData(o);r.addClass("sapMOH");if(c){r.addClass("sapMOHC");r.addClass("sapMOHBg"+o.getBackgroundDesign());}r.writeClasses();var t=o.getTooltip_AsString();if(t){r.writeAttributeEscaped("title",t);}r.writeAccessibilityState({role:"region",labelledby:{value:o.getId()+"-titleText-inner",append:true}});r.write(">");if(c){this._renderCondensedOH(r,o);}else{this._renderFullOH(r,o);}r.write("<div class=\"sapMOHLastDivider\"/>");r.write("</div>");this._cleanupNotRenderedChildControls(r,o);};O._renderChildControl=function(r,o,c){r.renderControl(c);};O._renderResponsive=function(r,o){var s=this._hasResponsiveStates(o),t=this._hasResponsiveTabs(o),h=o.getHeaderContainer();r.write("<div");r.addClass("sapMOHROuter");r.writeClasses();r.writeAccessibilityState({role:"region",labelledby:{value:o.getId()+"-txt",append:true}});r.writeControlData(o);r.write(">");r.write("<div");r.addClass("sapMOHR");r.writeClasses();r.write(">");r.write("<div");r.addClass("sapMOHRBg"+o.getBackgroundDesign());if(sap.ui.Device.system.desktop&&q('html').hasClass("sapUiMedia-Std-Desktop")&&o.getFullScreenOptimized()&&o._iCountVisAttrStat>=1&&o._iCountVisAttrStat<=3){r.addClass("sapMOHRStatesOneOrThree");}r.writeClasses();r.write(">");this._renderResponsiveTitleBlock(r,o);if(s){this._renderResponsiveStates(r,o);}r.write("</div>");if(t){this._renderResponsiveTabs(r,o);}r.write("</div>");if(h&&h instanceof sap.m.IconTabBar){this._renderChildControl(r,o,h);}r.write("</div>");if(!o.getTitle()){if(!o.getBinding("title")){q.sap.log.warning("The title shouldn't be empty!");}}};O._renderResponsiveTitleBlock=function(r,c){var l=sap.ui.getCore().getLibraryResourceBundle("sap.m");r.write("<div");r.writeAttribute("id",c.getId()+"-titlenumdiv");r.addClass("sapMOHRTitleNumberDiv");r.writeClasses();r.write(">");r.write("<div");r.writeAttribute("id",c.getId()+"-titlediv");r.addClass("sapMOHRTitleDiv");if(c._hasIcon()){if(sap.ui.Device.system.phone||q('html').hasClass("sapUiMedia-Std-Phone")){if(sap.ui.Device.orientation.landscape||(q('html').hasClass("sapUiMedia-Std-Phone")&&!sap.ui.Device.system.phone)){r.addClass("sapMOHRTitleIcon");}}else{r.addClass("sapMOHRTitleIcon");}}if(!c.getAggregation("_objectNumber")){r.addClass("sapMOHRTitleDivFull");}r.writeClasses();r.write(">");this._renderResponsiveTitle(r,c);if(c._hasIcon()){r.write("<div");r.writeAttribute("id",c.getId()+"-titleIcon");r.addClass("sapMOHRIcon");if((sap.ui.Device.system.phone&&sap.ui.Device.orientation.portrait)){r.addClass("sapMOHRHideIcon");}if(c.getIconActive()){r.addClass("sapMPointer");r.writeAttribute("tabindex","0");r.writeAccessibilityState({role:"link",haspopup:true,label:l.getText("OH_ARIA_ICON")});}r.writeClasses();r.write(">");this._renderChildControl(r,c,c._getImageControl());r.write("</div>");}r.write("</div>");this._renderResponsiveNumber(r,c);r.write("</div>");};O._renderResponsiveStates=function(r,c){r.write("<div");r.writeAttribute("id",c.getId()+"-states");r.addClass("sapMOHRStates");r.writeClasses();r.write("\">");this._renderResponsiveRow(r,c);r.write("</div>");};O._renderResponsiveRow=function(r,o){var v=[];v=this._getVisibleAttribsAndStatuses(o);var V=v[0].concat(v[1]),c=v[0].length,C=V.length,R=1,s='';if(C===0){return;}if(sap.ui.Device.system.desktop){if(!o.getFullScreenOptimized()){if(C>=1&&C<=4){R=2;s='sapMOHRTwoCols';}if(C>=5){R=3;s='sapMOHRThreeCols';}}else{if(C>=1&&C<=3){R=1;s='sapMOHROneCols';}if(C>=4){R=4;s='sapMOHRFourCols';}}}if(sap.ui.Device.system.tablet||(sap.ui.Device.system.desktop&&q('html').hasClass("sapUiMedia-Std-Tablet"))){if(!o.getFullScreenOptimized()||(sap.ui.Device.orientation.portrait&&o.getFullScreenOptimized())){R=2;s='sapMOHRTwoCols';}else{if(o.getFullScreenOptimized()&&(sap.ui.Device.orientation.landscape||(sap.ui.Device.system.desktop&&q('html').hasClass("sapUiMedia-Std-Tablet")))){if(C>=1&&C<=2){R=2;s='sapMOHRTwoCols';}if(C>=3){R=3;s='sapMOHRThreeCols';}}}}if(sap.ui.Device.system.phone||(sap.ui.Device.system.desktop&&q('html').hasClass("sapUiMedia-Std-Phone"))){R=1;s='sapMOHROneCols';}this._renderResponsiveStatesColumn(r,o,R,V,c,s);};O._renderResponsiveStatesColumn=function(r,o,R,v,c,C){var a=Math.floor(v.length/R);var b=v.length%R;var d=0;var e=1;for(var i=0;i<v.length;i++){if(d==0){r.write("<div");r.addClass("sapMOHRStatesCont"+e);r.addClass(C);r.writeClasses();r.write(">");}if(i<c){this._renderResponsiveAttribute(r,o,v[i]);}else{this._renderResponsiveStatus(r,o,v[i]);}d++;if((d==a&&e>b)||(d==(a+1)&&e<=b)||i==v.length-1){r.write("</div>");d=0;e++;}}};O._renderResponsiveAttribute=function(r,o,a){r.write("<div");r.addClass("sapMOHRAttr");r.writeClasses();r.write(">");this._renderChildControl(r,o,a);r.write("</div>");};O._renderResponsiveStatus=function(r,o,s){r.write("<div");r.addClass("sapMOHRStatus");r.writeClasses();r.write(">");this._renderChildControl(r,o,s[0]);r.write("</div>");};O._renderResponsiveMarkers=function(r,c){var a=[],t=c.getTitleTextDirection(),p=sap.ui.getCore().getConfiguration().getRTL();if(c.getShowMarkers()){c._oFavIcon.setVisible(c.getMarkFavorite());c._oFlagIcon.setVisible(c.getMarkFlagged());a.push(c._oFavIcon);a.push(c._oFlagIcon);this._renderMarkersAria(r,c);r.write("<span");r.addClass("sapMObjStatusMarker");if((t===sap.ui.core.TextDirection.LTR&&p)||(t===sap.ui.core.TextDirection.RTL&&!p)){r.addClass("sapMObjStatusMarkerOpposite");}r.writeClasses();r.writeAttribute("id",c.getId()+"-markers");r.writeAttribute("aria-describedby",c.getId()+"-markers-aria");r.write(">");for(var i=0;i<a.length;i++){this._renderChildControl(r,c,a[i]);}r.write("</span>");}};O._renderResponsiveNumber=function(r,c){var o=c.getAggregation("_objectNumber");if(o&&o.getNumber()){o.setTextDirection(c.getNumberTextDirection());this._renderChildControl(r,c,o);}};O._hasResponsiveStates=function(c){var a=c.getAttributes(),v=[];if(!(c._hasAttributes()||c._hasStatus())){c._iCountVisAttrStat=0;return false;}for(var j=0;j<a.length;j++){if(a[j].getVisible()){v.push(a[j]);}}var V=this._getVisibleStatuses(c);c._iCountVisAttrStat=v.length+V.length;return!!(v.length+V.length);};O._hasResponsiveTabs=function(c){var h=c.getHeaderContainer(),i;if(h){if(h instanceof sap.m.IconTabBar){i=h._getIconTabHeader();if(i.getVisible()){c._iCountVisTabs=i.getItems().length;return!!i.getItems().length;}}else if(sap.suite&&sap.suite.ui&&sap.suite.ui.commons&&h instanceof sap.suite.ui.commons.HeaderContainer){return!!h.getItems().length;}}return false;};O._renderResponsiveTabs=function(r,c){var h=c.getHeaderContainer(),i;r.write("<div class=\"sapMOHRTabs"+(h instanceof sap.m.IconTabBar?" sapMOHRTabsITB":"")+"\">");if(h){if(h instanceof sap.m.IconTabBar){i=h._getIconTabHeader();this._renderChildControl(r,c,i);h._bHideHeader=true;}else if(sap.suite&&sap.suite.ui&&sap.suite.ui.commons&&h instanceof sap.suite.ui.commons.HeaderContainer){this._renderChildControl(r,c,h);}else{q.sap.log.warning("The control "+h+" is not supported for aggregation \"headerContainer\"");}}r.write("</div>");};O._renderResponsiveTitle=function(r,o){var n;o._oTitleArrowIcon.setVisible(o.getShowTitleSelector());r.write("<div");r.writeAttribute("id",o.getId()+"-title");r.addClass("sapMOHRTitle");if(o.getTitleActive()){r.addClass("sapMOHRTitleActive");}if(o.getShowTitleSelector()){r.addClass("sapMOHRTitleFollowArrow");}r.writeClasses();r.write(">");if((sap.ui.Device.system.phone&&sap.ui.Device.orientation.portrait)){n=50;}else{n=80;}r.write("<span");r.writeAttribute("id",o.getId()+"-title-arrow");r.write(">");this._renderResponsiveTitleAndArrow(r,o,n);r.write("</span>");if(o.getIntro()){this._renderIntro(r,o,"sapMOHRIntro","sapMOHRIntroActive");}r.write("</div>");};O._rerenderTitle=function(r,o,n){var i=o.getId();this._renderResponsiveTitleAndArrow(r,o,n);r.flush(q.sap.byId(i+"-title-arrow"));};O._renderResponsiveTitleAndArrow=function(r,o,n){var s,e='',t=o.getTitleTextDirection();var m=(o.getShowMarkers()&&(o.getMarkFavorite()||o.getMarkFlagged()));r.write("<h1>");r.write("<span");r.addClass("sapMOHRTitleTextContainer");r.writeClasses();if(t!=sap.ui.core.TextDirection.Inherit){r.writeAttribute("dir",t.toLowerCase());}r.write(">");if(o.getTitleActive()){r.write("<a");if(o.getTitleHref()){r.writeAttributeEscaped("href",o.getTitleHref());if(o.getTitleTarget()){r.writeAttributeEscaped("target",o.getTitleTarget());}}else{r.writeAttribute("href","#");}r.writeAttribute("tabindex","0");r.writeAccessibilityState({role:"link",haspopup:!o.getTitleHref()});}else{r.write("<span");}r.writeAttribute("id",o.getId()+"-txt");r.addClass("sapMOHRTitleText");r.writeClasses();r.write(">");r.write("<span");r.addClass("sapMOHRTitleTextWrappable");r.writeClasses();r.write(">");if(o.getTitle().length>n){s=o.getTitle().substr(0,n).trim();e='...';}else{s=o.getTitle();}if(m){var a=s.substr(s.lastIndexOf(" ")+1);var b=s.substr(0,s.lastIndexOf(" ")+1);if(a.length===1){a=s;b='';}r.writeEscaped(b);r.write("</span>");r.writeEscaped(a);r.write(e);if(o.getTitleActive()){r.write("</a>");}else{r.write("</span>");}this._renderResponsiveMarkers(r,o);r.write("</span>");}else{if(!e){r.writeEscaped(s);}else{r.writeEscaped(s+e);}if(o.getTitleActive()){r.write("</span></a></span>");}else{r.write("</span></span></span>");}}if(o.getShowTitleSelector()){r.write("<span");r.addClass("sapMOHRTitleArrow");r.writeClasses();r.write(">");this._renderChildControl(r,o,o._oTitleArrowIcon);r.write("</span>");}r.write("</h1>");};O._rerenderResponsiveStates=function(r,o){var i=o.getId(),v=this._getVisibleAttribsAndStatuses(o),V=v[0].concat(v[1]),c=v[0].length,C=V.length,R=1,s='';if(C===0){return;}if(sap.ui.Device.orientation.portrait){R=2;s='sapMOHRTwoCols';}else{if(C>=1&&C<=2){R=2;s='sapMOHRTwoCols';}if(C>=3){R=3;s='sapMOHRThreeCols';}}this._renderResponsiveStatesColumn(r,o,R,V,c,s);r.flush(q.sap.byId(i+"-states")[0]);};return O;},true);
