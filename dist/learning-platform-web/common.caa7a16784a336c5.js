"use strict";(self.webpackChunklearning_platform_web=self.webpackChunklearning_platform_web||[]).push([[592],{7639:(f,s,o)=>{o.d(s,{G:()=>v});var i=o(3327),n=o(5e3),_=o(6696),u=o(6959),d=o(4594),l=o(9808),p=o(6699),g=o(3677),c=o(4219),M=o(2683);function m(e,a){1&e&&(n.TgZ(0,"div",12)(1,"div",13),n._uU(2,"\u767b\u9646"),n.qZA()())}const O=function(){return{"background-color":"#7265e6"}};function C(e,a){if(1&e&&(n.TgZ(0,"div"),n._UZ(1,"nz-avatar",14),n.qZA()),2&e){const t=n.oxw(),r=n.MAs(10);n.xp6(1),n.Q6J("nzGap",4)("nzText",t.nickName)("ngStyle",n.DdM(4,O))("nzDropdownMenu",r)}}const P=function(){return["/"]};let v=(()=>{class e{constructor(t,r){this.router=t,this.userService=r}ngOnInit(){}get isLogin(){return(0,i.jJ)()}loginOut(){this.userService.loginOut().subscribe(()=>{localStorage.clear(),this.router.navigate(["/login"])})}get nickName(){var t;return null===(t=(0,i.bG)())||void 0===t?void 0:t.nickname}}return e.\u0275fac=function(t){return new(t||e)(n.Y36(_.F0),n.Y36(u.K))},e.\u0275cmp=n.Xpm({type:e,selectors:[["app-header"]],decls:16,vars:4,consts:[["color","primary",1,"mat-elevation-z6","toolbar"],[1,"header-left",3,"routerLink"],[1,"logo"],["src","assets/logo/logo.svg","alt","logo"],[1,"title"],["class","login-box",4,"ngIf"],[4,"ngIf"],[1,"toolbar-empty-box"],["menu","nzDropdownMenu"],["nz-menu",""],["nz-menu-item","","routerLink","/system/userManager"],["nz-menu-item","",3,"click"],[1,"login-box"],["routerLink","/login"],["nzSize","large","nz-dropdown","","nzTrigger","click",1,"avatar",2,"vertical-align","middle",3,"nzGap","nzText","ngStyle","nzDropdownMenu"]],template:function(t,r){1&t&&(n.TgZ(0,"mat-toolbar",0)(1,"div",1)(2,"div",2),n._UZ(3,"img",3),n.qZA(),n.TgZ(4,"div",4),n._uU(5,"\u6bcf\u65e5\u4e00\u5b66"),n.qZA()(),n.YNc(6,m,3,0,"div",5),n.YNc(7,C,2,5,"div",6),n.qZA(),n._UZ(8,"div",7),n.TgZ(9,"nz-dropdown-menu",null,8)(11,"ul",9)(12,"li",10),n._uU(13,"\u540e\u53f0\u7ba1\u7406"),n.qZA(),n.TgZ(14,"li",11),n.NdJ("click",function(){return r.loginOut()}),n._uU(15,"\u6ce8\u9500"),n.qZA()()()),2&t&&(n.xp6(1),n.Q6J("routerLink",n.DdM(3,P)),n.xp6(5),n.Q6J("ngIf",!r.isLogin),n.xp6(1),n.Q6J("ngIf",r.isLogin))},directives:[d.Ye,_.rH,l.O5,p.Dz,g.cm,l.PC,g.RR,c.wO,M.w,c.r9],styles:[".mat-toolbar-single-row[_ngcontent-%COMP%]{height:56px;padding:8px 16px}.toolbar[_ngcontent-%COMP%]{position:fixed;top:0;left:0;right:0;color:#fff;z-index:5;font-size:.9rem;display:flex;justify-content:space-between}.toolbar[_ngcontent-%COMP%]   .header-left[_ngcontent-%COMP%]{display:flex;align-items:center;cursor:pointer}.toolbar[_ngcontent-%COMP%]   .header-left[_ngcontent-%COMP%]   .logo[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{width:35px;height:35px}.toolbar[_ngcontent-%COMP%]   .header-left[_ngcontent-%COMP%]   .title[_ngcontent-%COMP%]{margin-left:10px}.toolbar[_ngcontent-%COMP%]   .login-box[_ngcontent-%COMP%]{cursor:pointer}.toolbar[_ngcontent-%COMP%]   .login-box[_ngcontent-%COMP%]:hover{color:#21d4fd}.toolbar[_ngcontent-%COMP%]   .avatar[_ngcontent-%COMP%]{cursor:pointer}.toolbar-empty-box[_ngcontent-%COMP%]{height:56px;width:100%}.header-box[_ngcontent-%COMP%]{display:flex;justify-content:space-between;flex:1}"]}),e})()}}]);