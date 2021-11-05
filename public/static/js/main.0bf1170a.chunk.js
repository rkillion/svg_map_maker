(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[0],{176:function(e,t,n){},186:function(e,t,n){"use strict";n.r(t);var i=n(0),a=n(41),r=n.n(a),c=n(14),s=(n(176),n(37)),o=n(11),u=n(59),d=n(3),l=n(53),j=n(259),h=n(257),p=n(261),f=n(100),b=n(262),O=n(121),x=n.n(O),g=n(122),y=n.n(g),m=n(258),w=n(264),v=n(140),_=n(17),C=Object(_.c)({name:"user",initialState:{current:{},status:"idle"},reducers:{userUpdate:function(e,t){e.current=t.payload}},extraReducers:{}}),S=C.actions.userUpdate,T=C.reducer,k=n(1);function F(e){var t=e.toggleDrawer,n=i.useState(null),a=Object(o.a)(n,2),r=a[0],s=a[1],u=Object(c.c)((function(e){return e.user.current})),d=Object(c.b)();return Object(k.jsxs)(h.a,{sx:{flexGrow:1},children:[Object(k.jsx)(m.a,{}),Object(k.jsx)(j.a,{position:"fixed",children:Object(k.jsxs)(p.a,{children:[Object(k.jsx)(b.a,{size:"large",edge:"start",color:"inherit","aria-label":"menu",sx:{mr:2},onClick:t("left",!0),children:Object(k.jsx)(x.a,{})}),Object(k.jsx)(f.a,{variant:"h6",component:"div",sx:{flexGrow:1},children:"SVG Fantasy Mapmaker"}),u.id&&Object(k.jsxs)("div",{children:[Object(k.jsx)(b.a,{size:"large","aria-label":"account of current user","aria-controls":"menu-appbar","aria-haspopup":"true",onClick:function(e){s(e.currentTarget)},color:"inherit",children:Object(k.jsx)(y.a,{})}),Object(k.jsx)(v.a,{id:"menu-appbar",anchorEl:r,anchorOrigin:{vertical:"top",horizontal:"right"},keepMounted:!0,transformOrigin:{vertical:"top",horizontal:"right"},open:Boolean(r),onClose:function(){s(null)},children:Object(k.jsx)(w.a,{onClick:function(){fetch("api/logout",{method:"DELETE"}).then((function(e){e.ok&&(d(S({})),window.location.reload())}))},style:{color:"red"},children:"Logout"})})]})]})})]})}var M=n(20);function U(e,t,n,i){var a=e.tileSettings.tile_width_units,r=function(e,t,n){var i=e.tileSettings.tile_width_units,a=function(e,t){var n=e.tileFocus,i=e.dimensions,a=e.tileSettings,r=e.viewPortWidth;return{x:n.x-2*(i.width/2-t.clientX)*a.tile_width_units/r,y:n.y-2*(i.height/2-t.clientY)*a.tile_width_units/r}}(e,t),r={};return"center"!==n&&"north"!==n&&"south"!==n||(r.x=a.x),"center"!==n&&"east"!==n&&"west"!==n||(r.y=a.y),"north"!==n&&"northeast"!==n&&"northwest"!==n||(r.y=i+a.y),"south"!==n&&"southeast"!==n&&"southwest"!==n||(r.y=a.y-i),"east"!==n&&"southeast"!==n&&"northeast"!==n||(r.x=a.x-i),"west"!==n&&"southwest"!==n&&"northwest"!==n||(r.x=i+a.x),r}(e,t,n);return function(e,t){for(var n=[],i=Object(l.a)({},e);n.length<5;){var a=t/Math.pow(2,n.length+1);i.x>=a?(i.y>=a?(n.push(3),i.y=i.y-a):n.push(1),i.x=i.x-a):i.y>=a?(n.push(2),i.y=i.y-a):n.push(0)}return n}(r,a)}function W(e,t,n,i){var a=e?JSON.parse(JSON.stringify(e)):[];return 0===a.length&&(a=D("",n)),function e(t,a){var r=n/Math.pow(2,6-a.length);1===a.length?t[a[0]]=N(a[0],i,2*r):("string"===typeof t[a[0]]&&(t[a[0]]=D(t[a[0]],r)),e(t[a[0]],a.slice(1)))}(a,t),a}function D(e,t){var n=new RegExp("h").test(e);return[N(0,n,t),N(1,n,t),N(2,n,t),N(3,n,t)]}function N(e){var t=arguments.length>1&&void 0!==arguments[1]&&arguments[1],n=arguments.length>2?arguments[2]:void 0,i=n/2,a=["m 0 0","m ".concat(i," 0"),"m ".concat(-i," ").concat(i),"m ".concat(i," 0")],r="";return t&&(r=" h ".concat(i," v ").concat(i," h ").concat(-i," v ").concat(-i)),"".concat(a[e]).concat(r)}var E,J,P=function(e){var t=e.direction,n=e.tile,i=e.centerImageMCoord,a=e.handleMouseDown,r=e.handleMouseUp,s=e.handleMouseMove,o=Object(c.c)((function(e){return e.grids.primary.settings})),u={northeast:{x:-o.tile_width_units,y:-o.tile_width_units},north:{x:0,y:-o.tile_width_units},northwest:{x:o.tile_width_units,y:-o.tile_width_units},west:{x:-o.tile_width_units,y:0},center:{x:0,y:0},east:{x:o.tile_width_units,y:0},southwest:{x:-o.tile_width_units,y:o.tile_width_units},south:{x:0,y:o.tile_width_units},southeast:{x:o.tile_width_units,y:o.tile_width_units}},d=Object(c.c)((function(e){return e.shapeTypes.entities}));if(!n)return null;function l(e){var n;return n=e.path_array?function(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:[" "," "," "," "," "],i=JSON.parse(JSON.stringify(e)),a=Object(M.a)(n);function r(e,t,n){for(var i=arguments.length>3&&void 0!==arguments[3]?arguments[3]:"",a=["m 0 0","m ".concat(t," 0"),"m ".concat(-t," ").concat(t),"m ".concat(t," 0")],c="m ".concat(-t/2," ").concat(-t/2),s=0;s<4;s++)"string"!==typeof e[s]&&(e[s]=r(e[s],t/2,n.slice(1),s));return"number"!==typeof i?e.join(n[0]):"".concat(a[i]," ").concat(e.join(n[0])," ").concat(c)}return r(i,t,a)}(e.path_array,o.tile_width_units):"".concat(e.path_zero," ").concat(e.path_one," ").concat(e.path_two," ").concat(e.path_three),"M ".concat(i.x+u[t].x," ").concat(i.y+u[t].y," ").concat(n)}function j(e){return d.find((function(t){return t.id===e.shape_class})).shape_types.find((function(t){return t.id===e.shape_type})).color}return Object(k.jsx)("g",{children:n.shapes.map((function(e){return Object(k.jsx)("path",{d:l(e),fill:j(e),onMouseDown:a,onMouseUp:r,onMouseMove:s},e.id?e.id:e.feature.title)}))})},I=Object(_.c)({name:"view",initialState:{current:{},tileFocus:{},userFocus:{},status:"idle"},reducers:{changeView:function(e,t){e.current=t.payload},changeFocus:function(e,t){e.tileFocus=t.payload},changeUserFocus:function(e,t){e.userFocus=t.payload}},extraReducers:{}}),L=I.actions,z=L.changeView,A=L.changeFocus,R=L.changeUserFocus,G=I.reducer,V=Object(_.b)("grids/fetchGrids",(function(e){return fetch("api/grids/".concat(e)).then((function(e){return e.json()})).then((function(e){return e}))})),B=Object(_.b)("grids/postMapEdits",(function(e){return fetch("api/mapedits",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)}).then((function(e){return e.json()})).then((function(e){return e}))})),H=Object(_.c)({name:"grids",initialState:{primary:{},editingMode:{mode:null,featureTitle:null},pendingChanges:{add:[],edit:[]},status:"idle"},reducers:{changeEditingMode:function(e,t){e.editingMode=t.payload},addPendingChange:function(e,t){e.pendingChanges.find((function(e){return e.tileId===t.payload.tileId&&e.featureTitle===t.payload.featureTitle}))||e.pendingChanges.push(t.payload)},addShape:function(e,t){e.primary.tiles[t.payload.direction].shapes.push(t.payload.shape),e.pendingChanges.add.push(t.payload.shape)},changeShapeArray:function(e,t){var n=e.primary.tiles[t.payload.direction];e.primary.tiles[t.payload.direction].shapes.find((function(e){return e.feature.title===t.payload.feature})).path_array=t.payload.path_array;var i=e.pendingChanges.add.find((function(e){return e.tile_id===n.id&&e.feature.title===t.payload.feature}));if(i)i.path_array=t.payload.path_array;else{var a=e.pendingChanges.edit.find((function(e){return e.tile_id===n.id&&e.feature.title===t.payload.feature}));if(a)a.path_array=t.payload.path_array;else{var r=JSON.parse(JSON.stringify(n.shapes.find((function(e){return e.feature.title===t.payload.feature}))));r.path_array=t.payload.path_array,e.pendingChanges.edit.push(r)}}}},extraReducers:(E={},Object(d.a)(E,V.pending,(function(e){e.status="loading"})),Object(d.a)(E,V.fulfilled,(function(e,t){e.primary=t.payload,e.status="idle"})),Object(d.a)(E,B.pending,(function(e){e.status="loading"})),Object(d.a)(E,B.fulfilled,(function(e,t){e.status="idle"})),E)}),X=H.actions,Y=X.changeEditingMode,K=(X.addPendingChange,X.addShape),q=X.changeShapeArray,Q=H.reducer,Z=2e3;var $,ee,te,ne=u.a.svg(J||(J=Object(s.a)(["\n  width: ","px;\n  height: ","px;\n  position: fixed;\n  background: black;\n"])),Z,1e3),ie=function(){var e=Object(c.b)(),t=Object(i.useState)({height:Math.min(window.innerHeight,1e3),width:Math.min(window.innerWidth,Z)}),n=Object(o.a)(t,2),a=n[0],r=n[1],s=Object(i.useState)({}),u=Object(o.a)(s,2),d=u[0],l=u[1],j=Object(c.c)((function(e){return e.grids.primary.settings})),h=Object(c.c)((function(e){return e.grids.primary.tiles})),p=Object(c.c)((function(e){return e.view.current})),f=Object(c.c)((function(e){return e.view.tileFocus})),b=Object(c.c)((function(e){return e.view.userFocus})),O=Object(c.c)((function(e){return e.grids.editingMode})),x=Object(c.c)((function(e){return e.worlds.currentWorld.features})),g=j?{x:a.width*j.tile_width_units/Z,y:a.height*j.tile_width_units/Z}:null,y=j?{x:g.x-b.x,y:g.y-b.y}:null,m=j?{s:-j.tile_width_units+p.focus_y,n:p.focus_y,e:-j.tile_width_units+p.focus_x,w:p.focus_x}:null,w={northwest:1,north:2,northeast:3,west:4,center:5,east:6,southwest:7,south:8,southeast:9};Object(i.useEffect)((function(){var e=function(e,t){var n,i=arguments,a=this;return function(){clearTimeout(n),n=setTimeout((function(){n=null,e.apply(a,i)}),t)}}((function(){r({height:Math.min(window.innerHeight,1e3),width:Math.min(window.innerWidth,Z)})}),250);return window.addEventListener("resize",e),function(){window.removeEventListener("resize",e)}}));var v={dragPoint:d,tileSettings:j,tiles:h,currentView:p,tileFocus:f,userFocus:b,windowCenterUnit:g,centerImageMCoord:y,centerImageEdgeDistancesUnits:m,viewPortWidth:Z,dimensions:a};function _(e){l({x:e.clientX,y:e.clientY})}function C(t){if(d.x&&!O.mode){var n=f,i=function(e){var t=h.north?j.tile_width_units:0,n=h.south?j.tile_width_units:0,i={x:e.x,y:e.y};return g.y-e.y>0+t&&(i.y=g.y-t),g.y-e.y<2*g.y-j.tile_width_units-n&&(i.y=j.tile_width_units-g.y+n),i}({x:n.x+2*(d.x-t.clientX)*j.tile_width_units/Z,y:n.y+2*(d.y-t.clientY)*j.tile_width_units/Z});e(R(i))}}function S(t,n){if(l({}),f.x===b.x&&f.y===b.y){if(O.mode){var i=x.find((function(e){return e.title===O.featureTitle})),a=U(v,t,n,h[n]),r=h[n].shapes.find((function(e){return e.feature.title===O.featureTitle})),c="draw"===O.mode;e(r?q({direction:n,feature:O.featureTitle,path_array:W(r.path_array,a,j.tile_width_units,c)}):K({direction:n,shape:{tile_id:h[n].id,shape_class:i.shape_class_id,shape_type:i.shape_type_id,feature:i,path_array:W([],a,j.tile_width_units,c)}}))}}else e(A(b)),function(){var t,n=p.focus_x-b.x,i=p.focus_y-b.y,a={};if(i>m.n?(a.y=j.tile_width_units-(i-p.focus_y),n>m.w?(t="northwest",a.x=j.tile_width_units-(n-p.focus_x)):n<m.e?(t="northeast",a.x=-1*n-(j.tile_width_units-p.focus_x)):(t="north",a.x=p.focus_x-n)):i<m.s?(a.y=-1*i-(j.tile_width_units-p.focus_y),n>m.w?(t="southwest",a.x=j.tile_width_units-(n-p.focus_x)):n<m.e?(t="southeast",a.x=-1*n-(j.tile_width_units-p.focus_x)):(t="south",a.x=p.focus_x-n)):n>m.w?(t="west",a.x=j.tile_width_units-(n-p.focus_x),a.y=p.focus_y-i):n<m.e&&(t="east",a.x=-1*n-(j.tile_width_units-p.focus_x),a.y=p.focus_y-i),t){var r=h[t].id;e(V(r)).then((function(){e(z({focus_x:a.x,focus_y:a.y})),e(A({x:a.x,y:a.y})),e(R({x:a.x,y:a.y}))}))}}()}return j?Object(k.jsx)(ne,{viewBox:"0 0 ".concat(2*j.tile_width_units," ").concat(j.tile_width_units),xmlns:"http://www.w3.org/2000/svg",children:h&&Object.keys(h).map((function(e){return Object(k.jsx)(P,{direction:e,tile:h[e],centerImageMCoord:y,handleMouseDown:_,handleMouseUp:function(t){S(t,e)},handleMouseMove:C},w[e])}))}):null},ae=n(16),re=Object(_.b)("universes/fetchUniverses",(function(){return fetch("/api/universes").then((function(e){return e.json()})).then((function(e){return e}))})),ce=Object(_.b)("universes/postUniverse",(function(e){return fetch("/api/universes",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)}).then((function(e){return e.json()})).then((function(e){return e}))})),se=Object(_.c)({name:"universes",initialState:{entities:[],status:"idle"},reducers:{universeAdded:function(e,t){e.entities.push(t.payload)},universeUpdated:function(e,t){var n=e.entities.find((function(e){return e.id===t.payload.id}));Object.keys(t.payload.changes).forEach((function(e){n[e]=t.payload.change[e]}))}},extraReducers:($={},Object(d.a)($,re.pending,(function(e){e.status="loading"})),Object(d.a)($,re.fulfilled,(function(e,t){e.entities=t.payload,e.status="idle"})),Object(d.a)($,ce.pending,(function(e){e.status="loading"})),Object(d.a)($,ce.fulfilled,(function(e,t){e.entities.push(t.payload),e.status="idle"})),$)}),oe=se.actions,ue=(oe.universeAdded,oe.universeUpdated,se.reducer),de=Object(_.b)("worlds/fetchWorlds",(function(e){return fetch("/api/worlds/".concat(e)).then((function(e){return e.json()})).then((function(e){return e}))})),le=Object(_.b)("worlds/postWorld",(function(e){return fetch("/api/worlds",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)}).then((function(e){return e.json()})).then((function(e){return e}))})),je=Object(_.c)({name:"worlds",initialState:{entities:[],currentWorld:{},status:"idle"},reducers:{worldAdded:function(e,t){e.entities.push(t.payload)},worldUpdated:function(e,t){var n=e.currentWorld;console.log(n)},addFeatureToWorld:function(e,t){e.currentWorld.features.push(t.payload)}},extraReducers:(ee={},Object(d.a)(ee,de.pending,(function(e){e.status="loading"})),Object(d.a)(ee,de.fulfilled,(function(e,t){e.currentWorld=t.payload,e.status="idle"})),Object(d.a)(ee,le.pending,(function(e){e.status="loading"})),Object(d.a)(ee,le.fulfilled,(function(e,t){e.currentWorld=t.payload,e.status="idle"})),ee)}),he=je.actions,pe=(he.worldAdded,he.worldUpdated,he.addFeatureToWorld),fe=je.reducer,be=Object(_.b)("shapeTypes/fetchshapeTypes",(function(){return fetch("/api/shape_classes").then((function(e){return e.json()})).then((function(e){return e}))})),Oe=Object(_.c)({name:"shapeTypes",initialState:{entities:[],status:"idle"},reducers:{shapeClassToggle:function(e,t){var n=e.entities.find((function(e){return e.id===t.payload}));n.open=!n.open},shapeTypeToggle:function(e,t){var n=e.entities.find((function(e){return e.id===t.payload.shape_class})).shape_types.find((function(e){return e.id===t.payload.id}));n.open=!n.open}},extraReducers:(te={},Object(d.a)(te,be.pending,(function(e){e.status="loading"})),Object(d.a)(te,be.fulfilled,(function(e,t){e.entities=t.payload,e.entities.forEach((function(e){e.open=!1,e.shape_types.forEach((function(e){return e.open=!1}))})),e.status="idle"})),te)}),xe=Oe.actions,ge=xe.shapeClassToggle,ye=xe.shapeTypeToggle,me=Oe.reducer,we=n(254),ve=n(263),_e=n(246),Ce=n(253),Se=n(244),Te=n(245),ke=n(128),Fe=n.n(ke),Me=n(130),Ue=n.n(Me),We=n(129),De=n.n(We);function Ne(e){var t=e.toggleDrawer,n=e.sidebarState,a=e.setUniverseDialogueOpen,r=e.loadWorld,s=Object(c.c)((function(e){return e.universes.entities})),o=Object(ae.g)(),u=function(e){return Object(k.jsxs)(h.a,{sx:{width:"top"===e||"bottom"===e?"auto":250},role:"presentation",onClick:t(e,!1),onKeyDown:t(e,!1),children:[Object(k.jsx)(ve.a,{}),s.map((function(e){return Object(k.jsxs)(k.Fragment,{children:[Object(k.jsxs)(ve.a,{children:[Object(k.jsxs)(Ce.a,{button:!0,onClick:function(){return o.push("/universes/".concat(e.id))},children:[Object(k.jsx)(Se.a,{children:Object(k.jsx)(Fe.a,{})}),Object(k.jsx)(Te.a,{primary:e.title})]}),e.worlds.map((function(e){return Object(k.jsxs)(Ce.a,{button:!0,sx:{pl:4},onClick:function(){r(e.id),o.push("/viewer")},children:[Object(k.jsx)(Se.a,{children:Object(k.jsx)(De.a,{})}),Object(k.jsx)(Te.a,{primary:e.title})]},e.id)}))]},e.id),Object(k.jsx)(_e.a,{},"divider".concat(e.id))]})})),Object(k.jsx)(ve.a,{children:Object(k.jsxs)(Ce.a,{button:!0,onClick:function(){return a(!0)},children:[Object(k.jsx)(Se.a,{children:Object(k.jsx)(Ue.a,{})}),Object(k.jsx)(Te.a,{primary:"New Universe"})]})})]})};return Object(k.jsx)("div",{children:["left","right","top","bottom"].map((function(e){return Object(k.jsx)(i.Fragment,{children:Object(k.jsx)(we.a,{anchor:e,open:n[e],onClose:t(e,!1),children:u(e)})},e)}))})}var Ee=n(255),Je=n(272),Pe=n(273),Ie=n(72),Le=n.n(Ie),ze=n(274),Ae=n(277),Re=n(276),Ge=n(275),Ve=n(265);function Be(e){var t=e.world,n=e.loadWorld,i=Object(ae.g)();return Object(k.jsxs)(ze.a,{sx:{maxWidth:345},raised:!0,children:[Object(k.jsx)(Ge.a,{component:"img",height:"140",image:"https://cdn.pixabay.com/photo/2016/10/20/18/35/earth-1756274_960_720.jpg",alt:"earth"}),Object(k.jsx)(Re.a,{children:Object(k.jsx)(f.a,{gutterBottom:!0,variant:"h5",component:"div",children:t.title})}),Object(k.jsx)(Ae.a,{children:Object(k.jsx)(Ve.a,{size:"small",onClick:function(){n(t.id),i.push("/viewer")},children:"View"})})]})}var He,Xe,Ye=n(96),Ke=n.n(Ye),qe=n(251),Qe=n(266),Ze=n(271),$e=n(268),et=n(269),tt=n(267);function nt(e){var t=e.formDialogueOpen,n=e.setFormDialogueOpen,a=e.formDialogueObject,r=a.item,s=a.field,u=a.postConfig,d=a.action,l=Object(c.b)(),j=(Object(ae.g)(),Object(i.useState)(u)),h=Object(o.a)(j,2),p=h[0],f=h[1],b=function(){n(!1)};return Object(k.jsx)("div",{children:Object(k.jsxs)(Qe.a,{open:t,onClose:b,children:[Object(k.jsx)(tt.a,{children:"New ".concat(r[0].toUpperCase()+r.slice(1))}),Object(k.jsxs)($e.a,{children:[Object(k.jsx)(et.a,{children:"Enter a name for your new ".concat(r,".")}),Object(k.jsx)(qe.a,{autoFocus:!0,margin:"dense",id:"name",label:"".concat(r[0].toUpperCase()+r.slice(1)," Name"),type:"email",fullWidth:!0,variant:"standard",onChange:function(e){var t=JSON.parse(JSON.stringify(p));t[e.target.name]=e.target.value,f(t)},name:s,value:p[s]})]}),Object(k.jsxs)(Ze.a,{children:[Object(k.jsx)(Ve.a,{onClick:b,children:"Cancel"}),Object(k.jsx)(Ve.a,{onClick:function(){"postUniverse"===d&&l(ce(p)).then((function(){n(!1),window.location.reload()})),"postWorld"===d&&l(le(p)).then((function(){n(!1),window.location.reload()}))},children:"Create"})]})]})})}function it(e){var t=e.loadWorld,n=Object(ae.h)().id,a=Object(c.c)((function(e){return e.universes.entities})).find((function(e){return e.id===parseInt(n)})),r=Object(i.useState)(!1),s=Object(o.a)(r,2),u=s[0],d=s[1];return a?Object(k.jsxs)(at,{children:[Object(k.jsxs)(Ee.a,{children:[Object(k.jsx)(Je.a,{expandIcon:Object(k.jsx)(Le.a,{}),"aria-controls":"panel1a-content",id:"panel1a-header",children:Object(k.jsx)(f.a,{children:a.title})}),Object(k.jsxs)(Pe.a,{children:[Object(k.jsx)(ve.a,{children:Object(k.jsxs)(Ce.a,{button:!0,onClick:function(){d(!0)},children:[Object(k.jsx)(Se.a,{children:Object(k.jsx)(Ke.a,{})}),Object(k.jsx)(Te.a,{primary:"New World"})]})}),Object(k.jsx)(f.a,{})]})]}),Object(k.jsx)(rt,{children:a.worlds.map((function(e){return Object(k.jsx)(Be,{world:e,loadWorld:t},e.id)}))}),"Images courtesy of Pixabey",Object(k.jsx)(nt,{formDialogueOpen:u,setFormDialogueOpen:d,formDialogueObject:{item:"world",field:"title",postConfig:{title:"",universe_id:a.id,max_zoom_level:21},action:"postWorld"}})]}):Object(k.jsx)(at,{children:"Universe ".concat(n," not found.")})}var at=u.a.div(He||(He=Object(s.a)(["\n    display: flex;\n    width: auto;\n    padding: 120px;\n    flex-direction: column;\n    align-items: stretch;\n"]))),rt=u.a.div(Xe||(Xe=Object(s.a)(["\n    display: flex;\n    padding-top: 30px;\n    padding-bottom: 30px;\n    flex-direction: row;\n    flex-wrap: wrap;\n    justify-content: flex-start;\n    align-items: flex-start;\n"]))),ct=n(260),st=n(279),ot=n(249),ut=n(278),dt=n(113),lt=n.n(dt),jt=n(131),ht=n.n(jt),pt=n(132),ft=n.n(pt),bt=n(136),Ot=n.n(bt),xt=n(133),gt=n.n(xt),yt=n(134),mt=n.n(yt),wt=n(250),vt=n(137),_t=n.n(vt),Ct=n(138),St=n.n(Ct);function Tt(e){var t=e.formDialogueOpen,n=e.setFormDialogueOpen,i=e.featureStarterData,a=e.setFeatureStarterData,r=Object(c.b)(),s=(Object(ae.g)(),function(){n(!1)});return Object(k.jsx)("div",{children:Object(k.jsxs)(Qe.a,{open:t,onClose:s,children:[Object(k.jsx)(tt.a,{children:"New Feature"}),Object(k.jsxs)($e.a,{children:[Object(k.jsx)(et.a,{children:"Enter a name for your new feature."}),Object(k.jsx)(qe.a,{autoFocus:!0,margin:"dense",id:"name",label:"Feature Name",type:"text",fullWidth:!0,variant:"standard",onChange:function(e){var t=JSON.parse(JSON.stringify(i));t[e.target.name]=e.target.value,a(t)},name:"title",value:i.title})]}),Object(k.jsxs)(Ze.a,{children:[Object(k.jsx)(Ve.a,{onClick:s,children:"Cancel"}),Object(k.jsx)(Ve.a,{onClick:function(){fetch("api/features",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(i)}).then((function(e){return e.json()})).then((function(e){r(pe(e)),n(!1)}))},children:"Create"})]})]})})}var kt=n(135),Ft=n.n(kt);function Mt(){var e=Object(c.c)((function(e){return e.shapeTypes.entities})),t=Object(c.c)((function(e){return e.worlds.currentWorld})),n=Object(c.c)((function(e){return e.worlds.currentWorld.features})),a=Object(c.c)((function(e){return e.grids.editingMode})),r=Object(c.c)((function(e){return e.grids.pendingChanges})),s=Object(c.b)(),u=Object(i.useState)(!1),d=Object(o.a)(u,2),l=d[0],j=d[1],h=Object(i.useState)({}),p=Object(o.a)(h,2),f=p[0],O=p[1];function x(e){var t=e.classTitle;return"Geographical"===t||"Mountain"===t?Object(k.jsx)(Se.a,{children:Object(k.jsx)(ht.a,{style:{color:"purple"}})},t):"Political"===t?Object(k.jsx)(Se.a,{children:Object(k.jsx)(ft.a,{style:{color:"red"}})},t):"Sea"===t?Object(k.jsx)(Se.a,{children:Object(k.jsx)(gt.a,{style:{color:"blue"}})},t):"Land"===t?Object(k.jsx)(Se.a,{children:Object(k.jsx)(mt.a,{style:{color:"green"}})},t):"Forest"===t?Object(k.jsx)(Se.a,{children:Object(k.jsx)(Ft.a,{style:{color:"darkgreen"}})},t):Object(k.jsx)(Se.a,{children:Object(k.jsx)(Ot.a,{style:{color:"yellow"}})},t)}return Object(k.jsxs)(k.Fragment,{children:[Object(k.jsxs)(ve.a,{sx:{width:"100%",maxWidth:360,bgcolor:"background.paper"},component:"nav","aria-labelledby":"nested-list-subheader",subheader:Object(k.jsx)(st.a,{component:"div",id:"nested-list-subheader",children:"Features"}),children:[e.map((function(e){return Object(k.jsxs)(k.Fragment,{children:[Object(k.jsxs)(ot.a,{onClick:function(){return s(ge(e.id))},children:[Object(k.jsx)(x,{classTitle:e.title}),Object(k.jsx)(Te.a,{primary:e.title}),e.open?Object(k.jsx)(lt.a,{}):Object(k.jsx)(Le.a,{})]},e.id),Object(k.jsx)(ut.a,{in:e.open,timeout:"auto",unmountOnExit:!0,children:Object(k.jsx)(ve.a,{component:"div",disablePadding:!0,children:e.shape_types.map((function(i){return Object(k.jsxs)(k.Fragment,{children:[Object(k.jsxs)(Ce.a,{children:[Object(k.jsxs)(ot.a,{sx:{pl:4},onClick:function(){return s(ye({shape_class:e.id,id:i.id}))},children:[Object(k.jsx)(x,{classTitle:i.title}),Object(k.jsx)(Te.a,{primary:i.title}),i.open?Object(k.jsx)(lt.a,{}):Object(k.jsx)(Le.a,{})]}),Object(k.jsx)(wt.a,{title:"Add",children:Object(k.jsx)(b.a,{onClick:function(){return function(e,n){var i={shape_class_id:e,shape_type_id:n,world_id:t.id,title:"",color:""};O(i),j(!0)}(e.id,i.id)},children:Object(k.jsx)(Ke.a,{})})})]},i.id),Object(k.jsx)(ut.a,{in:i.open,timeout:"auto",unmountOnExit:!0,children:Object(k.jsx)(ve.a,{component:"div",disablePadding:!0,children:n?n.filter((function(t){return t.shape_class_id===e.id&&t.shape_type_id===i.id})).map((function(e){return Object(k.jsxs)(Ce.a,{children:[Object(k.jsx)(ot.a,{sx:{pl:8},children:Object(k.jsx)(Te.a,{primary:e.title})}),Object(k.jsx)(wt.a,{title:"Add To",children:Object(k.jsx)(b.a,{onClick:function(){return s(Y({mode:"draw",featureTitle:e.title}))},children:Object(k.jsx)(_t.a,{})})}),Object(k.jsx)(wt.a,{title:"Remove From",children:Object(k.jsx)(b.a,{onClick:function(){return s(Y({mode:"erase",featureTitle:e.title}))},children:Object(k.jsx)(St.a,{})})})]},e.id)})):null})},"".concat(i.id,"collapse"))]})}))})},"".concat(e.id,"collapse"))]})})),a.mode?Object(k.jsx)(Ve.a,{variant:"contained",onClick:function(){s(Y({mode:null,featureTitle:null})),s(B(r))},children:"Save Changes"}):null]}),Object(k.jsx)(Tt,{formDialogueOpen:l,setFormDialogueOpen:j,featureStarterData:f,setFeatureStarterData:O})]})}function Ut(){return Object(k.jsx)(ct.a,{elevation:3,sx:{display:"flex",width:"300px",marginTop:"90px",marginLeft:"20px",minHeight:"100px",position:"fixed"},children:Object(k.jsx)(Mt,{})})}var Wt=function(){var e=i.useState({top:!1,left:!1,bottom:!1,right:!1}),t=Object(o.a)(e,2),n=t[0],a=t[1],r=function(e,t){return function(i){("keydown"!==i.type||"Tab"!==i.key&&"Shift"!==i.key)&&a(Object(l.a)(Object(l.a)({},n),{},Object(d.a)({},e,t)))}},s=Object(i.useState)(!1),u=Object(o.a)(s,2),j=u[0],h=u[1],p=Object(c.b)(),f=Object(c.c)((function(e){return e.worlds.currentWorld})),b=Object(ae.g)();function O(e){p(de(e)).then((function(e){p(z(e.payload.views[0])),p(A({x:e.payload.views[0].focus_x,y:e.payload.views[0].focus_y})),p(R({x:e.payload.views[0].focus_x,y:e.payload.views[0].focus_y})),p(V(e.payload.views[0].tile_id))}))}return Object(i.useEffect)((function(){p(be()).then((function(){p(re()).then((function(e){0===e.payload.length?h(!0):0===e.payload[0].worlds.length?b.push("/universes/".concat(e.payload[0].id)):O(f.title?f.id:e.payload[0].worlds[0].id)}))}))}),[p]),Object(k.jsxs)("main",{children:[Object(k.jsx)(F,{toggleDrawer:r}),Object(k.jsx)(Ne,{toggleDrawer:r,sidebarState:n,setUniverseDialogueOpen:h,loadWorld:O}),Object(k.jsxs)(ae.d,{children:[Object(k.jsxs)(ae.b,{path:"/viewer",children:[Object(k.jsx)(ie,{}),Object(k.jsx)(Ut,{})]}),Object(k.jsx)(ae.b,{path:"/universes/:id",children:Object(k.jsx)(it,{loadWorld:O})}),Object(k.jsx)(ae.a,{to:"/viewer"})]}),Object(k.jsx)(nt,{formDialogueOpen:j,setFormDialogueOpen:h,formDialogueObject:{item:"universe",field:"title",postConfig:{title:""},action:"postUniverse"}})]})},Dt=n(47),Nt=n(248),Et=n(270);var Jt=function(){var e=Object(ae.g)(),t=Object(i.useState)(""),n=Object(o.a)(t,2),a=n[0],r=n[1],s=Object(i.useState)(""),u=Object(o.a)(s,2),d=u[0],l=u[1],j=Object(c.b)(),p=function(t){t.preventDefault(),fetch("/api/login",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({username:a,password:d})}).then((function(t){t.ok?t.json().then((function(t){j(S(t)),e.push("/viewer")})):t.json().then((function(e){console.error(e)}))}))};return Object(k.jsxs)(h.a,{sx:{display:"flex",flexWrap:"wrap",justifyContent:"center",padding:"10px",width:"auto",margin:"auto","& > :not(style)":{m:1}},width:"auto",children:[Object(k.jsx)(ae.a,{to:"/"}),Object(k.jsxs)(ct.a,{elevation:3,sx:{padding:"10px"},children:[Object(k.jsx)(f.a,{children:"SVG Fantasy Mapmaker"}),Object(k.jsxs)(Et.a,{onSubmit:p,children:[Object(k.jsx)(Nt.a,{htmlFor:"username",sx:{margin:"10px"},children:"Login"}),Object(k.jsx)(qe.a,{id:"outlined-basic",label:"Username",variant:"outlined",sx:{margin:"10px"},type:"text",name:"username",value:a,onChange:function(e){return r(e.target.value)}}),Object(k.jsx)(qe.a,{id:"outlined-basic",label:"Password",variant:"outlined",sx:{margin:"10px"},type:"password",name:"",value:d,onChange:function(e){return l(e.target.value)}}),Object(k.jsx)(Ve.a,{variant:"contained",onClick:p,children:"Log In"}),Object(k.jsx)("p",{children:Object(k.jsx)(Dt.b,{to:"/signup",children:"Sign Up"})})]})]})]})};var Pt=function(e){e.setCurrentUser,Object(ae.g)();var t=Object(i.useState)(""),n=Object(o.a)(t,2),a=n[0],r=n[1],s=Object(i.useState)(""),u=Object(o.a)(s,2),d=u[0],l=u[1],j=Object(i.useState)(""),p=Object(o.a)(j,2),b=p[0],O=p[1],x=Object(c.b)(),g=function(e){e.preventDefault(),fetch("api/signup",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({username:a,password:d,password_confirmation:b})}).then((function(e){e.ok?e.json().then((function(e){x(S(e))})):e.json().then((function(e){console.error(e)}))}))};return Object(k.jsx)("div",{className:"authForm",children:Object(k.jsx)(h.a,{sx:{display:"flex",flexWrap:"wrap",justifyContent:"center",padding:"10px",width:"auto",margin:"auto","& > :not(style)":{m:1}},width:"auto",children:Object(k.jsx)(ct.a,{elevation:3,sx:{padding:"10px"},children:Object(k.jsxs)(Et.a,{onSubmit:g,children:[Object(k.jsx)(f.a,{children:"SVG Fantasy Mapmaker"}),Object(k.jsx)(Nt.a,{htmlFor:"username",sx:{margin:"10px"},children:"Login"}),Object(k.jsx)(qe.a,{id:"outlined-basic",label:"Username",variant:"outlined",sx:{margin:"10px"},type:"text",name:"username",value:a,onChange:function(e){return r(e.target.value)}}),Object(k.jsx)(qe.a,{id:"outlined-basic",label:"Password",variant:"outlined",sx:{margin:"10px"},type:"password",name:"",value:d,onChange:function(e){return l(e.target.value)}}),Object(k.jsx)(qe.a,{id:"outlined-basic",label:"Retype Password",variant:"outlined",sx:{margin:"10px"},type:"password",name:"password_confirmation",value:b,onChange:function(e){return O(e.target.value)}}),Object(k.jsx)(Ve.a,{variant:"contained",onClick:g,children:"Sign Up"}),Object(k.jsx)("p",{children:Object(k.jsx)(Dt.b,{to:"/login",children:"Login"})})]})})})})};var It,Lt=function(e){var t=e.setCurrentUser;return Object(k.jsxs)(ae.d,{children:[Object(k.jsx)(ae.b,{exact:!0,path:"/",children:Object(k.jsx)(Jt,{setCurrentUser:t})}),Object(k.jsx)(ae.b,{exact:!0,path:"/signup",children:Object(k.jsx)(Pt,{setCurrentUser:t})}),Object(k.jsx)(ae.a,{to:"/"})]})};var zt=u.a.div(It||(It=Object(s.a)(["\n  height: 100%;\n  width: 100%\n"]))),At=function(){var e=Object(i.useState)(null),t=Object(o.a)(e,2),n=(t[0],t[1]),a=Object(i.useState)(!1),r=Object(o.a)(a,2),s=r[0],u=r[1],d=Object(c.c)((function(e){return e.user.current})),l=Object(c.b)();return Object(i.useEffect)((function(){fetch("/api/me",{credentials:"include"}).then((function(e){e.ok?e.json().then((function(e){l(S(e)),u(!0)})):u(!0)}))}),[]),s?Object(k.jsx)(zt,{className:"App",children:d.id?Object(k.jsx)(Wt,{}):Object(k.jsx)(Lt,{setCurrentUser:n})}):Object(k.jsx)("div",{})},Rt=Object(_.a)({reducer:{grids:Q,shapeTypes:me,universes:ue,user:T,view:G,worlds:fe}});r.a.render(Object(k.jsx)(Dt.a,{children:Object(k.jsx)(c.a,{store:Rt,children:Object(k.jsx)(At,{})})}),document.getElementById("root"))}},[[186,1,2]]]);
//# sourceMappingURL=main.0bf1170a.chunk.js.map