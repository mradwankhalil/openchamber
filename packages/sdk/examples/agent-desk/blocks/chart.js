(()=>{var P="openchamber.sdk",D=1;var pS=`
:root {
  /* Quiet at rest like the app's own thumbs; hover gives a clear grab target. */
  --oc-scrollbar-thumb: color-mix(in srgb, var(--oc-muted, currentColor) 18%, transparent);
  --oc-scrollbar-thumb-hover: color-mix(in srgb, var(--oc-muted, currentColor) 36%, transparent);
  scrollbar-gutter: stable;
}
* {
  scrollbar-width: thin;
  scrollbar-color: transparent transparent;
}
:hover, [data-oc-scrolling] {
  scrollbar-color: var(--oc-scrollbar-thumb) transparent;
}
/* Chromium's standard scrollbar properties otherwise override its pseudo-elements. */
@supports selector(::-webkit-scrollbar) {
  *, :hover, [data-oc-scrolling] { scrollbar-width: auto; scrollbar-color: auto; }
  ::-webkit-scrollbar { width: 6px; height: 6px; background: transparent; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb {
    background: transparent;
    border-radius: 999px;
    min-width: 24px;
    min-height: 24px;
  }
  :hover::-webkit-scrollbar-thumb, [data-oc-scrolling]::-webkit-scrollbar-thumb { background: var(--oc-scrollbar-thumb); }
  ::-webkit-scrollbar-thumb:hover { background: var(--oc-scrollbar-thumb-hover); }
  ::-webkit-scrollbar-corner { background: transparent; }
  ::-webkit-scrollbar-button { display: none; width: 0; height: 0; }
}
@media (forced-colors: active) {
  *, :hover, [data-oc-scrolling] { scrollbar-color: auto; }
  ::-webkit-scrollbar-thumb, ::-webkit-scrollbar-thumb:hover { background: CanvasText; }
}
`;function c_(S){let E=S.documentElement;if(E.hasAttribute("data-oc-scrollbar-activity"))return;E.setAttribute("data-oc-scrollbar-activity","");let G=new WeakMap;S.addEventListener("scroll",($)=>{let X=$.target===S?E:$.target;if(!(X instanceof Element))return;if(!X.hasAttribute("data-oc-scrolling"))X.setAttribute("data-oc-scrolling","");let Z=G.get(X);if(Z!==void 0)clearTimeout(Z);G.set(X,setTimeout(()=>{G.delete(X),X.removeAttribute("data-oc-scrolling")},1000))},{capture:!0,passive:!0})}var fT=`(${c_.toString()})(document);`;var lS=128,oS=65536;var WS=128;var FS=65536;var p_=/^[a-z][a-z0-9-]{0,39}$/;var v_=(S)=>Object(S)===S&&!Array.isArray(S),aS=(S,E)=>Object.keys(S).every((G)=>E.includes(G)),u_=(S)=>String(S)===S&&S.length>=1&&S.length<=60,d_=(S)=>String(S)===S&&S.length>=1&&S.length<=80,l_=(S)=>{if(!Array.isArray(S)||S.length>4)return!1;let E=new Set;for(let G of S){if(!v_(G)||!p_.test(G.id)||!u_(G.label))return!1;if(G.disabled!==void 0&&G.disabled!==!0&&G.disabled!==!1)return!1;if(E.has(G.id))return!1;if(E.add(G.id),G.kind==="button"){if(!aS(G,["kind","id","label","disabled"]))return!1;continue}if(G.kind!=="select"||!aS(G,["kind","id","label","value","options","disabled"]))return!1;if(!d_(G.value)||!Array.isArray(G.options)||G.options.length<1||G.options.length>16)return!1;let $=new Set;for(let X of G.options){if(!v_(X)||!aS(X,["value","label"])||!d_(X.value)||!u_(X.label)||$.has(X.value))return!1;$.add(X.value)}if(!$.has(G.value))return!1}return!0};var o_=["{id}","{segment}","{segments+}"];var EE=new Set(o_);var a_=["turn-finished","turn-failed","permission-asked","question-asked","turn-started","session-created","session-archived","session-deleted"];var RE=new Set(a_);var QS=20000000,LS=256;var rS=(S)=>("bytes"in S)?S.bytes.byteLength:S.content.length,r_=(S,E)=>{if(S.path!==E.path||S.readOnly!==E.readOnly)return!1;if(S.encoding==="text"||E.encoding==="text")return S.encoding==="text"&&E.encoding==="text"&&S.content===E.content;if(S.bytes.byteLength!==E.bytes.byteLength)return!1;for(let G=0;G<S.bytes.byteLength;G+=1)if(S.bytes[G]!==E.bytes[G])return!1;return!0};var i_=/^[A-Za-z0-9_-]{1,80}$/;var n_=["left","right","top","bottom"];var s_=(S,E=0,G={remaining:16000})=>{if(--G.remaining<0||E>=32)return!1;if(S===null)return!0;let $=Array.isArray(S)?S:Object(S)===S?Object.values(S):[];for(let X of $)if(!s_(X,E+1,G))return!1;return!0},iS=(S)=>{if(S===null||S===!0||S===!1)return!0;if(Array.isArray(S))return Object.keys(S).every((E)=>/^(0|[1-9]\d*)$/.test(E)&&Number(E)<S.length)&&S.every(iS);if(Object(S)===S){let E=Object.getPrototypeOf(S);return(E===null||E===Object.prototype)&&Object.values(S).every(iS)}return String(S)===S||Number.isFinite(S)},nS=(S)=>{try{if(String(S.id)!==S.id||!i_.test(S.id)||!Number.isFinite(S.anchor.x)||Math.abs(S.anchor.x)>1e5||!Number.isFinite(S.anchor.y)||Math.abs(S.anchor.y)>1e5||!Number.isFinite(S.anchor.width)||!Number.isFinite(S.anchor.height)||S.anchor.width<=0||S.anchor.height<=0||S.anchor.width>1e5||S.anchor.height>1e5||!Number.isInteger(S.width)||S.width<160||S.width>640||!Number.isInteger(S.height)||S.height<48||S.height>480||S.side!==void 0&&!n_.includes(S.side)||S.focus!==void 0&&S.focus!==!0&&S.focus!==!1||!s_(S.data)||!iS(S.data))return!1;return JSON.stringify(S.data).length<=16000}catch{return!1}};var tS=2000;var e_=["file","directory","other","missing"],eS=(S)=>Boolean(S&&"sessionId"in S),S_=(S)=>Boolean(S&&"sent"in S&&!("sessionId"in S));var ST=/^[0-9a-f]{7,64}$/i,__=(S)=>ST.test(S),YS=500,$S=32000,_T=16000,TT=128,ET=200,OT=2000,RT=16000,MT=80,GT=200,UT=16000;var AT=2000;var T_=20000,ZS=1024,zS=2000000;var KS=64000,JS=8000,E_=4000;var O_=960000;var CT=999,PT=1e4,GS=500,DT=["HOST_UNAVAILABLE","HOST_TIMEOUT","HOST_REJECTED","DISCONNECTED","DISABLED","BAD_PATH","NO_INTEGRATION","NO_SERVICE","SERVICE_FAILED","REQUEST_FAILED","RESPONSE_TOO_LARGE","NO_SESSION","SESSION_BUSY","NOT_GRANTED","NO_DIRECTORY","NOT_FOUND","FILE_TOO_LARGE","DENIED","NO_MODEL","MODEL_FAILED","UNSUPPORTED"],XT=["stopped","starting","ready","failed"],kT=new Set(DT),IT=(S)=>kT.has(S),VT=(S)=>S&&IT(S)?S:"HOST_REJECTED",r=(S)=>{if(S===void 0)return!1;if(S===null||S===!0||S===!1)return!0;if(String(S)===S)return!0;if(Number(S)===S)return Number.isFinite(S);if(Array.isArray(S))return S.every(r);if(Object(S)===S)return Object.values(S).every(r);return!1},NT=(S)=>r(S)&&JSON.stringify(S).length<=UT,t_=(S)=>S?.trim().slice(0,GT)??"",i=(S)=>{let E=S.id.trim().slice(0,TT),G=S.title.trim().slice(0,ET),$=S.url.trim().slice(0,OT),X=S.text?.trim().slice(0,RT),Z=S.author?.trim().slice(0,MT),H=S.kind==="pull"?"pull":"issue",J={providerId:S.providerId.trim(),id:E,title:G||E,url:$,kind:H};if(X)J.text=X;if(Z)J.author=Z;if(H==="pull"){let b=t_(S.branches?.head),v=t_(S.branches?.base);if(b&&v)J.branches={head:b,base:v}}if(NT(S.data))J.data=S.data;return J},R_=(S)=>{let E=i(S);if(S.projectId)E.projectId=S.projectId;if(S.navigation)E.navigation=S.navigation;if(S.worktree)E.worktree=S.worktree;return E},M_=(S)=>{let E={text:S.text.trim().slice(0,_T)};if(S.send)E.send=!0;return E},G_=(S)=>{if(S===null||!Number.isFinite(S))return null;return Math.min(CT,Math.max(0,Math.round(S)))},U_=(S)=>{if(!Number.isFinite(S))return 0;return Math.min(PT,Math.max(0,Math.ceil(S)))};var n=(S)=>S.length>0&&S.length<=ZS&&!S.includes("\x00")&&!S.includes("\\");var fS=(S)=>{if(!S.startsWith("/")||S.includes("\x00")||S.includes("\\")||S.includes("://"))return!1;if(S.length>AT)return!1;return!S.split("/").some((G)=>G==="."||G==="..")},HT=new Set(XT),A_=(S)=>Boolean(S&&"status"in S&&HT.has(String(S.status))&&!("body"in S)),jS=(S)=>Boolean(S&&"status"in S&&"body"in S&&Number.isInteger(S.status)),C_=(S)=>Boolean(S&&"content"in S&&String(S.content)===S.content),P_=(S)=>Boolean(S&&"written"in S&&S.written===!0),D_=(S)=>Boolean(S&&"entries"in S&&Array.isArray(S.entries)),xT=new Set(e_),X_=(S)=>Boolean(S&&"kind"in S&&"size"in S&&xT.has(String(S.kind))&&Number.isFinite(S.size)),I_=(S)=>Boolean(S&&"text"in S&&String(S.text)===S.text&&!("status"in S)),wT=new Set(["workspace","shells","ready","directory","session","connection","settings","session-lifecycle","item","resolve","action","service-event","status-control-event","popover-closed","file-open","file-snapshot","file-saved","generate-late"]),bT=(S)=>Object(S)===S?S:null,sS=(S)=>String(S)===S&&S.length>0,qT=(S)=>{if(!sS(S.id))return null;if(S.ok===!0){let E={channel:P,v:D,type:"result",id:S.id,ok:!0};if(Object(S.payload)===S.payload)E.payload=S.payload;return E}if(S.ok===!1&&sS(S.error))return{channel:P,v:D,type:"result",id:S.id,ok:!1,error:S.error,code:VT(sS(S.code)?S.code:void 0)};return null},V_=(S)=>{let E=bT(S);if(!E||E.channel!==P||E.v!==D)return null;if(E.type==="result")return qT(E);if(!wT.has(String(E.type))||Object(E.payload)!==E.payload)return null;return E};var BT=(S)=>("key"in S)&&("metaKey"in S)&&("ctrlKey"in S),yT=(S)=>(S.metaKey||S.ctrlKey)&&!S.altKey&&!S.shiftKey&&S.key.toLowerCase()==="s";class U extends Error{code;constructor(S,E){super(E);this.name="HostRequestError",this.code=S}}var WT=()=>Promise.reject(new U("BAD_PATH",'Request path must start with "/" and stay on the declared origin.')),kS=()=>Promise.reject(new U("BAD_PATH",`File path must be 1 to ${ZS} characters without NUL or backslash.`)),HS=(S)=>{if(S===void 0)return;if(Object(S)!==S||Array.isArray(S)||S.scope!==void 0&&S.scope!=="instance"&&S.scope!=="device")throw new U("HOST_REJECTED",'Storage scope must be "instance" or "device".');return S.scope==="device"?"device":void 0},C=(S)=>{return S.value+=1,`oc-${S.value}`},N_=(S={})=>{let E=S.target??("window"in globalThis?window:null);if(!E)throw new U("HOST_UNAVAILABLE","No window. connectHost runs in a browser frame.");let G=S.acceptSource??((_)=>_===E.parent),$=S.requestTimeoutMs??T_,X=new Set,Z=new Set,H=new Set,J=new Set,b=new Set,v=new Set,SS=new Set,AS=new Set,CS=new Set,PS=new Set,DS=new Set,p=new Set,mS=[],_S=null,TS=null,XS=new Set,IS=new Set,ES=null,OS=null,cS=!1,l=new Map,o=new Map,a=new Map,y=!1,A={value:0},M=null,g=null,RS=!1,MS=!1,f_=null,j_=(_)=>{if(!_)return null;return{sessionId:_.id,phase:_.busy?"started":"completed"}},x=(_)=>{E.parent.postMessage(_,"*")},k_=()=>{if(y||E.parent===E||p.size===0||M?.features?.lateGenerateResults!==!0)return;x({channel:P,v:D,type:"generate-late-listen"})},B=(_,T)=>{for(let O of _)try{O(T)}catch(R){console.error(R)}},H_=(_)=>{if(!(_ instanceof MessageEvent))return;if(!G(_.source))return;let T=V_(_.data);if(!T)return;if(T.type==="workspace"){let R=o.get(T.payload.subscriptionId);if(R)B([R],T.payload.snapshot);return}if(T.type==="shells"){let R=a.get(T.payload.subscriptionId);if(R)B([R],T.payload.snapshot);return}if(T.type==="ready"){if(M=T.payload,g=j_(T.payload.session),B(X,T.payload),B(Z,T.payload.directory),B(H,T.payload.session),g)B(J,g);if(B(b,T.payload.connection),B(v,T.payload.settings),B(SS,T.payload.item),T.payload.block)B(AS,T.payload.block);k_();return}if(T.type==="service-event"){B(CS,T.payload);return}if(T.type==="generate-late"){if(p.size===0)mS.push(T.payload);else B(p,T.payload);return}if(T.type==="directory"){if(M)M={...M,directory:T.payload.directory};B(Z,T.payload.directory);return}if(T.type==="session"){if(M)M={...M,session:T.payload.session};if(!T.payload.session)g=null;else if(g?.sessionId!==T.payload.session.id)g=j_(T.payload.session);B(H,T.payload.session);return}if(T.type==="session-lifecycle"){g=T.payload,B(J,T.payload);return}if(T.type==="connection"){if(M)M={...M,connection:T.payload.connection};B(b,T.payload.connection);return}if(T.type==="settings"){if(M)M={...M,settings:T.payload.settings};B(v,T.payload.settings);return}if(T.type==="item"){if(M)M={...M,item:T.payload.item};B(SS,T.payload.item);return}if(T.type==="status-control-event"){B(PS,T.payload);return}if(T.type==="popover-closed"){B(DS,T.payload);return}if(T.type==="action"){let R=(I)=>{if(!y)x({channel:P,v:D,type:"action-result",id:T.id,payload:I})},V=TS;if(!V){R({ok:!1,error:"This extension does not handle background actions."});return}Promise.resolve().then(()=>V(T.payload)).then(()=>R({ok:!0}),(I)=>{let Y=(I instanceof Error?I.message:String(I)).trim();R({ok:!1,error:(Y||"Action failed.").slice(0,GS)})});return}if(T.type==="file-open"){let R=T.payload;if(OS&&r_(OS,R))return;OS=R,B(XS,T.payload);return}if(T.type==="file-saved"){B(IS,T.payload.version);return}if(T.type==="file-snapshot"){let R=(Y)=>{if(!y)x({channel:P,v:D,type:"file-snapshot-result",id:T.id,payload:Y})},V=(Y)=>R({error:(Y.trim()||"Could not read the edited file.").slice(0,GS)}),I=ES;if(!I){V("This extension does not edit files.");return}Promise.resolve().then(()=>I(T.payload.purpose)).then((Y)=>{if(rS(Y)>QS){V(`The file is over ${QS} ${"bytes"in Y?"bytes":"characters"}.`);return}if(Y.version.length>LS){V(`The snapshot version is over ${LS} characters.`);return}R({snapshot:"bytes"in Y?{bytes:Y.bytes,version:Y.version}:{content:Y.content,version:Y.version}})},(Y)=>V(Y instanceof Error?Y.message:String(Y)));return}if(T.type==="resolve"){let R=(I)=>{x({channel:P,v:D,type:"resolve-result",id:T.id,payload:I})},V=_S;if(!V){R({error:"This extension does not resolve commands."});return}Promise.resolve().then(()=>V(T.payload)).then((I)=>R({item:I?i(I):null}),(I)=>{let Y=(I instanceof Error?I.message:String(I)).trim();R({error:(Y||"Command failed.").slice(0,GS)})});return}let O=l.get(T.id);if(!O)return;if(clearTimeout(O.timer),l.delete(T.id),T.ok){O.resolve(T.payload);return}O.reject(new U(T.code,T.error))};E.addEventListener("message",H_),x({channel:P,v:D,type:"hello"});let z=(_,T=$)=>{if(y||E.parent===E)return Promise.reject(new U("HOST_UNAVAILABLE","No host frame. This page is not in an iframe."));return new Promise((O,R)=>{let V=setTimeout(()=>{l.delete(_.id),R(new U("HOST_TIMEOUT","Host did not answer in time."))},T);l.set(_.id,{resolve:O,reject:R,timer:V}),x(_)})},Q=(_)=>z(_).then(()=>{return}),L={channel:P,v:D},vS=(_)=>{if(!y&&E.parent!==E)x(_)},x_=()=>vS({...L,type:"file-save"}),w_=(_)=>{if(!BT(_)||!yT(_))return;_.preventDefault(),x_()},b_=(_)=>{if(!BT(_)||_.key!=="Escape"||M?.surface!=="popover"||!M.popover)return;_.preventDefault(),h_(M.popover.id,"escape").catch(()=>{return})},VS=()=>{let _=M?.surface==="popover"?M.popover:void 0;if(!_)return;let T=RS||MS;if(f_===T)return;f_=T,m_(_.id,T).catch(()=>{return})},NS=()=>{if(M?.surface!=="popover"||RS)return;RS=!0,VS()},q_=(_)=>{if(M?.surface!=="popover"||_.relatedTarget!==null||!RS)return;RS=!1,VS()},y_=()=>{if(M?.surface!=="popover"||MS)return;MS=!0,VS()},g_=()=>{if(M?.surface!=="popover"||!MS)return;MS=!1,VS()},q=(_,T=1024)=>{if(!_.trim()||_.length>T)throw new U("HOST_REJECTED",`Identity must contain 1 to ${T} characters.`)},uS=async(_)=>{if(_.kind!=="projects")q(_.projectId);let T=await z({...L,type:"workspace-read",id:C(A),payload:_});if(!T||!("kind"in T)||!("state"in T)||T.kind!==_.kind)throw new U("HOST_REJECTED","Host did not return workspace data.");return T},dS=async(_,T)=>{if(_.kind!=="projects")q(_.projectId);let O=C(A);o.set(O,T);try{await Q({...L,type:"workspace-subscribe",id:C(A),payload:{subscriptionId:O,query:_}})}catch(R){if(o.delete(O),!y)x({...L,type:"workspace-unsubscribe",id:C(A),payload:{subscriptionId:O}});throw R}return()=>{if(!o.delete(O)||y)return;x({...L,type:"workspace-unsubscribe",id:C(A),payload:{subscriptionId:O}})}},JT=async(_,T)=>{if(_.kind==="session")q(_.sessionId);if(_.kind==="project")q(_.projectId);let O=C(A);a.set(O,T);try{await Q({...L,type:"shells-subscribe",id:C(A),payload:{subscriptionId:O,scope:_}})}catch(R){if(a.delete(O),!y)x({...L,type:"shells-unsubscribe",id:C(A),payload:{subscriptionId:O}});throw R}return()=>{if(!a.delete(O)||y)return;x({...L,type:"shells-unsubscribe",id:C(A),payload:{subscriptionId:O}})}},BS=async(_)=>{if("key"in _&&(_.key.length===0||_.key.length>lS))throw new U("HOST_REJECTED","Storage key must contain 1 to 128 characters.");if(_.op==="set"&&!r(_.value))throw new U("HOST_REJECTED","Storage values must be JSON.");if(_.op==="set"&&new TextEncoder().encode(JSON.stringify(_.value)).length>oS)throw new U("HOST_REJECTED","Storage value exceeds 64 KiB.");if(_.scope==="device"&&M?.features?.deviceStorage!==!0)throw new U("UNSUPPORTED","This host does not support device storage.");let T=await z({...L,type:"storage",id:C(A),payload:_});if(!T||!("storage"in T)||T.op!==_.op)throw new U("HOST_REJECTED","Host did not return storage data.");return T},h_=(_,T)=>M?.features?.popovers!==!0&&!(M?.surface==="popover"&&M.popover?.id===_)?Promise.reject(new U("UNSUPPORTED","This host does not support popovers.")):Q({...L,type:"popover-close",id:C(A),payload:T?{id:_,reason:T}:{id:_}}),m_=(_,T)=>M?.features?.popovers!==!0&&!(M?.surface==="popover"&&M.popover?.id===_)?Promise.reject(new U("UNSUPPORTED","This host does not support popovers.")):Q({...L,type:"popover-anchor",id:C(A),payload:{id:_,active:T}});return E.addEventListener("keydown",b_,!0),E.addEventListener("pointerover",NS),E.addEventListener("pointermove",NS),E.addEventListener("pointerout",q_),E.addEventListener("focus",y_),E.addEventListener("blur",g_),{onAction:(_)=>{return TS=_,()=>{if(TS===_)TS=null}},listProjects:async()=>{let _=await uS({kind:"projects"});if(_.kind!=="projects")throw new U("HOST_REJECTED","Expected projects.");return _},listWorktrees:async(_)=>{let T=await uS({kind:"worktrees",projectId:_});if(T.kind!=="worktrees")throw new U("HOST_REJECTED","Expected worktrees.");return T},listSessions:async(_)=>{let T=await uS({kind:"sessions",projectId:_});if(T.kind!=="sessions")throw new U("HOST_REJECTED","Expected sessions.");return T},onProjects:(_)=>dS({kind:"projects"},(T)=>{if(T.kind==="projects")_(T)}),onWorktrees:(_,T)=>dS({kind:"worktrees",projectId:_},(O)=>{if(O.kind==="worktrees")T(O)}),onSessions:(_,T)=>dS({kind:"sessions",projectId:_},(O)=>{if(O.kind==="sessions")T(O)}),onRunningShells:(_,T)=>JT(_,T),readShellOutput:async(_,T)=>{q(_,WS);let O=T?.cursor;if(O!==void 0&&(!Number.isInteger(O)||O<0))throw new U("HOST_REJECTED","Shell output cursor must be a non-negative integer.");let R=T?.tailBytes;if(R!==void 0&&(!Number.isInteger(R)||R<1||R>FS))throw new U("HOST_REJECTED",`Shell output tailBytes must be an integer between 1 and ${FS}.`);let I=await z({...L,type:"shell-output",id:C(A),payload:{shellId:_,cursor:O,tailBytes:R}});if(!I||typeof I.output!=="string"||!Number.isFinite(I.cursor))throw new U("HOST_REJECTED","Host did not return shell output.");return I},stopShell:async(_)=>{if(q(_,WS),(await z({...L,type:"shell-stop",id:C(A),payload:{shellId:_}}))?.stopped!==!0)throw new U("HOST_REJECTED","Host did not stop the shell.");return{stopped:!0}},openSession:async(_)=>{q(_),await Q({...L,type:"open-session",id:C(A),payload:{sessionId:_}})},storage:{get:async(_,T)=>{let O=HS(T),R={op:"get",key:_};if(O)R.scope=O;let V=await BS(R);return V.op==="get"&&V.found?V.value:void 0},set:async(_,T,O)=>{let R=HS(O),V={op:"set",key:_,value:T};if(R)V.scope=R;await BS(V)},delete:async(_,T)=>{let O=HS(T),R={op:"delete",key:_};if(O)R.scope=O;await BS(R)},keys:async(_)=>{let T=HS(_),O={op:"keys"};if(T)O.scope=T;let R=await BS(O);if(R.op!=="keys")throw new U("HOST_REJECTED","Expected storage keys.");return R.keys}},onReady:(_)=>{if(X.add(_),M)_(M);return()=>{X.delete(_)}},onDirectory:(_)=>{if(Z.add(_),M)_(M.directory);return()=>{Z.delete(_)}},onSession:(_)=>{if(H.add(_),M)_(M.session);return()=>{H.delete(_)}},onSessionLifecycle:(_)=>{if(J.add(_),g)_(g);return()=>{J.delete(_)}},onConnection:(_)=>{if(b.add(_),M)_(M.connection);return()=>{b.delete(_)}},onSettings:(_)=>{if(v.add(_),M)_(M.settings);return()=>{v.delete(_)}},onItem:(_)=>{if(SS.add(_),M)_(M.item);return()=>{SS.delete(_)}},onBlock:(_)=>{if(AS.add(_),M?.block)_(M.block);return()=>{AS.delete(_)}},onServiceEvent:(_)=>{return CS.add(_),()=>{CS.delete(_)}},onStatusControl:(_)=>{return PS.add(_),()=>{PS.delete(_)}},onPopoverClosed:(_)=>{return DS.add(_),()=>{DS.delete(_)}},setStatusControls:(_)=>{if(M?.features?.statusControls!==!0)return Promise.reject(new U("UNSUPPORTED","This host does not support status controls."));if(!l_(_))return Promise.reject(new U("HOST_REJECTED","Status controls must have unique bounded ids and valid selected options."));return Q({...L,type:"status-controls",id:C(A),payload:{controls:_}})},openPopover:(_)=>{if(M?.features?.popovers!==!0)return Promise.reject(new U("UNSUPPORTED","This host does not support popovers."));if(!nS(_))return Promise.reject(new U("HOST_REJECTED","Popover requests need bounded geometry and JSON data."));return Q({...L,type:"popover-open",id:C(A),payload:_})},closePopover:h_,setPopoverAnchorActive:m_,onResolve:(_)=>{return _S=_,()=>{if(_S===_)_S=null}},toast:(_)=>{let T=_.message.trim();if(!T||T.length>YS)return Promise.reject(new U("HOST_REJECTED",`Toast message must contain 1 to ${YS} characters.`));if(_.copy&&_.copy!==!0&&(!_.copy.text.length||_.copy.text.length>$S))return Promise.reject(new U("HOST_REJECTED",`Toast copy text must contain 1 to ${$S} characters.`));return Q({channel:P,v:D,type:"toast",id:C(A),payload:{..._,message:T}})},openUrl:(_)=>Q({channel:P,v:D,type:"open-url",id:C(A),payload:{url:_}}),openCommit:(_)=>__(_)?Q({channel:P,v:D,type:"open-commit",id:C(A),payload:{sha:_}}):Promise.reject(new U("HOST_REJECTED","Commit id must be 7 to 64 hex characters.")),answerBlock:(_)=>Q({channel:P,v:D,type:"block-answer",id:C(A),payload:{text:_.trim().slice(0,tS)}}),openSurface:(_,T)=>Q({channel:P,v:D,type:"open-surface",id:C(A),payload:T?.tab===void 0?{surfaceId:_}:{surfaceId:_,tab:T.tab}}),writeClipboard:(_)=>Q({channel:P,v:D,type:"clipboard-write",id:C(A),payload:{text:_}}),compose:(_)=>Q({channel:P,v:D,type:"compose",id:C(A),payload:_}),attach:(_)=>Q({channel:P,v:D,type:"attach",id:C(A),payload:i(_)}),startSession:async(_)=>{if(_.projectId!==void 0)q(_.projectId);let T=_.worktree;if(T&&T!==!0)if(T.kind==="existing")q(T.directory);else{if(T.name!==void 0)q(T.name,200);if(T.baseBranch!==void 0)q(T.baseBranch,200)}let O=await z({channel:P,v:D,type:"start-session",id:C(A),payload:R_(_)},S.requestTimeoutMs??180000);if(!eS(O))throw new U("HOST_REJECTED","Host did not return a session.");return O},prompt:(_)=>z({channel:P,v:D,type:"prompt",id:C(A),payload:M_(_)}).then((T)=>{if(!S_(T))throw new U("HOST_REJECTED","Host did not return a prompt result.");return T}),sessionLink:(_)=>Q({channel:P,v:D,type:"session-link",id:C(A),payload:i(_)}),close:()=>Q({channel:P,v:D,type:"close",id:C(A)}),oauthStart:()=>Q({channel:P,v:D,type:"oauth-start",id:C(A)}),oauthDisconnect:()=>Q({channel:P,v:D,type:"oauth-disconnect",id:C(A)}),request:(_)=>(fS(_.path)?z({channel:P,v:D,type:"request",id:C(A),payload:_}):WT()).then((T)=>{if(!jS(T))throw new U("HOST_REJECTED","Host request result was empty.");return T}),serviceRequest:(_)=>(fS(_.path)?z({channel:P,v:D,type:"service-request",id:C(A),payload:_}):WT()).then((T)=>{if(!jS(T))throw new U("HOST_REJECTED","Host service request result was empty.");return T}),serviceStatus:()=>z({channel:P,v:D,type:"service-status",id:C(A)}).then((_)=>{if(!A_(_))throw new U("HOST_REJECTED","Host did not return service status.");return _}),readFile:(_)=>(n(_)?z({channel:P,v:D,type:"file-read",id:C(A),payload:{path:_}}):kS()).then((T)=>{if(!C_(T))throw new U("HOST_REJECTED","Host did not return file content.");return T}),writeFile:(_,T)=>{if(!n(_))return kS();if(T.length>zS)return Promise.reject(new U("FILE_TOO_LARGE",`Content is over ${zS} characters.`));return z({channel:P,v:D,type:"file-write",id:C(A),payload:{path:_,content:T}}).then((O)=>{if(!P_(O))throw new U("HOST_REJECTED","Host did not confirm the write.");return O})},listDir:(_)=>(n(_)?z({channel:P,v:D,type:"file-list",id:C(A),payload:{path:_}}):kS()).then((T)=>{if(!D_(T))throw new U("HOST_REJECTED","Host did not return directory entries.");return T}),stat:(_)=>(n(_)?z({channel:P,v:D,type:"file-stat",id:C(A),payload:{path:_}}):kS()).then((T)=>{if(!X_(T))throw new U("HOST_REJECTED","Host did not return file status.");return T}),generate:(_)=>{let T=_.prompt.trim(),O=_.system?.trim();if(T.length===0||T.length>KS)return Promise.reject(new U("HOST_REJECTED",`Prompt must be 1 to ${KS} characters.`));if(O!==void 0&&(O.length===0||O.length>JS))return Promise.reject(new U("HOST_REJECTED",`System prompt must be 1 to ${JS} characters.`));let R=_.maxOutputTokens===void 0?void 0:Math.min(E_,Math.max(1,Math.floor(_.maxOutputTokens)));if(R!==void 0&&!Number.isFinite(R))return Promise.reject(new U("HOST_REJECTED","maxOutputTokens must be a number."));let V={prompt:T};if(O!==void 0)V.system=O;if(R!==void 0)V.maxOutputTokens=R;return z({channel:P,v:D,type:"generate",id:C(A),payload:V},S.requestTimeoutMs??O_).then((I)=>{if(!I_(I))throw new U("HOST_REJECTED","Host did not return generated text.");return I})},onLateGenerateResult:(_)=>{p.add(_);for(let T of mS.splice(0))B([_],T);return k_(),()=>{p.delete(_)}},setBadge:(_)=>Q({channel:P,v:D,type:"badge",id:C(A),payload:{count:G_(_)}}),setHeight:(_)=>Q({channel:P,v:D,type:"resize",id:C(A),payload:{height:U_(_)}}),onFileOpen:(_)=>{if(XS.add(_),!cS)cS=!0,E.addEventListener("keydown",w_,!0);if(OS)_(OS);return()=>{XS.delete(_)}},onFileSnapshot:(_)=>{return ES=_,()=>{if(ES===_)ES=null}},onFileSaved:(_)=>{return IS.add(_),()=>{IS.delete(_)}},reportFileChange:(_)=>vS({...L,type:"file-change",payload:{dirty:_.dirty,edited:_.edited}}),requestFileSave:x_,reportFileUnsupported:()=>vS({...L,type:"file-unsupported"}),dispose:()=>{for(let _ of o.keys())x({...L,type:"workspace-unsubscribe",id:C(A),payload:{subscriptionId:_}});o.clear();for(let _ of a.keys())x({...L,type:"shells-unsubscribe",id:C(A),payload:{subscriptionId:_}});if(a.clear(),y=!0,_S=null,TS=null,ES=null,XS.clear(),IS.clear(),cS)E.removeEventListener("keydown",w_,!0);E.removeEventListener("message",H_),E.removeEventListener("keydown",b_,!0),E.removeEventListener("pointerover",NS),E.removeEventListener("pointermove",NS),E.removeEventListener("pointerout",q_),E.removeEventListener("focus",y_),E.removeEventListener("blur",g_);for(let _ of l.values())clearTimeout(_.timer),_.reject(new U("HOST_UNAVAILABLE","Host client was disposed."));l.clear(),X.clear(),Z.clear(),H.clear(),J.clear(),b.clear(),v.clear(),SS.clear(),AS.clear(),CS.clear(),PS.clear(),DS.clear(),p.clear(),mS.length=0}}};var FT=["browser.open","browser.snapshot","browser.click","browser.type","browser.select","browser.scroll","browser.back","browser.forward","browser.inspect","browser.capture","browser.resize","browser.close"];var QE=new Set(FT);var QT=["none","agent","user"];var YE=new Set(QT);var gT=[["--oc-bg","background"],["--oc-elevated","elevated"],["--oc-fg","foreground"],["--oc-muted","muted"],["--oc-subtle","subtle"],["--oc-border","border"],["--oc-hover","hover"],["--oc-selection","selection"],["--oc-focus","focus"],["--oc-primary","primary"],["--oc-muted-surface","mutedSurface"],["--oc-elevated-fg","elevatedForeground"],["--oc-active","active"],["--oc-selection-fg","selectionForeground"],["--oc-primary-fg","primaryForeground"],["--oc-primary-text","primaryText"],["--oc-success-text","successText"],["--oc-warning-text","warningText"],["--oc-error-text","errorText"],["--oc-info-text","infoText"],["--oc-success","success"],["--oc-warning","warning"],["--oc-error","error"],["--oc-info","info"],["--oc-font","font"],["--oc-mono","mono"],["--oc-radius","radius"],["--surface-background","background"],["--surface-elevated","elevated"],["--surface-foreground","foreground"],["--surface-muted-foreground","muted"],["--surface-subtle","subtle"],["--interactive-border","border"],["--interactive-hover","hover"],["--interactive-selection","selection"],["--interactive-focus-ring","focus"],["--primary","primary"],["--surface-muted","mutedSurface"],["--surface-elevated-foreground","elevatedForeground"],["--interactive-active","active"],["--interactive-selection-foreground","selectionForeground"],["--primary-foreground","primaryForeground"],["--primary-text","primaryText"],["--success-text","successText"],["--warning-text","warningText"],["--error-text","errorText"],["--info-text","infoText"],["--status-success","success"],["--status-warning","warning"],["--status-error","error"],["--status-info","info"],["--font-sans","font"],["--font-mono","mono"],["--radius","radius"]],hT=[["--oc-syntax-keyword","--syntax-keyword","syntaxKeyword"],["--oc-syntax-string","--syntax-string","syntaxString"],["--oc-syntax-number","--syntax-number","syntaxNumber"],["--oc-syntax-function","--syntax-function","syntaxFunction"],["--oc-syntax-type","--syntax-type","syntaxType"],["--oc-syntax-comment","--syntax-comment","syntaxComment"],["--oc-syntax-variable","--syntax-variable","syntaxVariable"],["--oc-syntax-operator","--syntax-operator","syntaxOperator"]],LT=(S,E)=>{E.style.colorScheme=S.mode;for(let[G,$]of gT)E.style.setProperty(G,S.tokens[$]);for(let[G,$,X]of hT){let Z=S.tokens[X]??"";E.style.setProperty(G,Z),E.style.setProperty($,Z)}E.style.setProperty("font-family",S.tokens.font),E.style.setProperty("font-size","0.875rem"),E.style.setProperty("line-height","1.45"),E.style.setProperty("color",S.tokens.foreground)},B_=(S,E)=>{if(LT(S.theme,E),E.dataset)E.dataset.ocSurface=S.surface,E.dataset.ocTheme=S.theme.mode};var mT={"surface-background":"bg","surface-elevated":"elevated","surface-elevated-foreground":"elevated-fg","surface-foreground":"fg","surface-muted-foreground":"muted","surface-muted":"muted-surface","surface-subtle":"subtle","interactive-border":"border","interactive-hover":"hover","interactive-active":"active","interactive-selection":"selection","interactive-selection-foreground":"selection-fg","interactive-focus-ring":"focus",primary:"primary","primary-foreground":"primary-fg","primary-text":"primary-text","success-text":"success-text","warning-text":"warning-text","error-text":"error-text","info-text":"info-text","status-success":"success","status-warning":"warning","status-error":"error","status-info":"info","font-sans":"font","font-mono":"mono",radius:"radius"},N=(S,E)=>`var(--${S}, var(--oc-${mT[S]}, ${E}))`,m=N("surface-background","transparent"),wS=N("surface-elevated","transparent"),s=N("surface-elevated-foreground","inherit"),w=N("surface-foreground","inherit"),W=N("surface-muted-foreground","gray"),cT=N("surface-muted","transparent"),u=N("interactive-border","currentColor"),f=N("interactive-hover","transparent"),d=N("interactive-active","transparent"),W_=N("interactive-selection","transparent"),F_=N("interactive-selection-foreground","inherit"),h=N("primary","currentColor"),Q_=N("primary-text","inherit"),L_=N("error-text","inherit"),vT=N("font-sans","inherit"),Y_=N("font-mono","monospace"),zT=N("radius","9px"),$_=`calc(${zT} - 2px)`,YT=`calc(${zT} - 4px)`,F=(S,E,G="transparent")=>`color-mix(in srgb, ${S} ${E}%, ${G})`,$T=`background-image: linear-gradient(${f}, ${f});`,Z_=(S,E="0.5px")=>`box-shadow: inset 0 0 0 ${E} ${S}, var(--oc-sdk-field-lift);`,z_="border-color: var(--oc-sdk-edge); box-shadow: var(--oc-sdk-raised-lift);",ZT="box-shadow: var(--oc-sdk-lit);",K_=`inset 0 0.5px 0 0 ${F(w,8)}, 0 1px 2px 0 rgb(0 0 0 / 0.4)`,uT=`
:root {
  --oc-sdk-edge: ${F(w,16)};
  --oc-sdk-field-bg: ${wS};
  --oc-sdk-raised-bg: ${m};
  --oc-sdk-field-lift: inset 0 1px 2px 0 rgb(0 0 0 / 0.04);
  --oc-sdk-raised-lift: 0 1px 1.5px 0 rgb(0 0 0 / 0.08);
  --oc-sdk-lit: inset 0 1px 0 0 rgb(255 255 255 / 0.2), 0 1px 1.5px 0 rgb(0 0 0 / 0.1);
  --oc-sdk-float-edge: rgb(0 0 0 / 0.14);
  --oc-sdk-float: inset 0 1px 0 0 rgb(255 255 255 / 0.7), 0 1px 2px -0.5px rgb(0 0 0 / 0.06), 0 4px 8px -2px rgb(0 0 0 / 0.08), 0 12px 20px -4px rgb(0 0 0 / 0.06);
}
:root[data-oc-theme="dark"] {
  --oc-sdk-edge: ${F(w,14)};
  --oc-sdk-field-bg: ${F(m,50,wS)};
  --oc-sdk-raised-bg: ${wS};
  --oc-sdk-field-lift: ${K_};
  --oc-sdk-raised-lift: ${K_};
  --oc-sdk-lit: ${K_};
  --oc-sdk-float-edge: rgb(0 0 0 / 0.55);
  --oc-sdk-float: inset 0 1px 0 0 rgb(255 255 255 / 0.04), inset 0 0 0 0.5px rgb(255 255 255 / 0.08), 0 8px 16px 0 rgb(0 0 0 / 0.25), 0 4px 8px 0 rgb(0 0 0 / 0.25);
}`,xS=(S)=>{let E=N(`status-${S}`,"currentColor");return`
.oc-sdk[data-tone="${S}"], .oc-sdk [data-tone="${S}"] { --oc-sdk-tone: ${E}; --oc-sdk-tone-text: ${N(`${S}-text`,"inherit")}; }`},dT=`
.oc-sdk { box-sizing: border-box; font-size: 0.875rem; line-height: 1.45; }
.oc-sdk *, .oc-sdk *::before, .oc-sdk *::after { box-sizing: border-box; }
/* :where() keeps the reset at zero specificity so every primitive class below overrides it. */
:where(.oc-sdk) :where(button, input, textarea), :where(button.oc-sdk, input.oc-sdk, textarea.oc-sdk) { font: inherit; color: inherit; margin: 0; }
:where(.oc-sdk) :where(button), :where(button.oc-sdk) { cursor: pointer; background: none; border: 0; padding: 0; }
.oc-sdk button:disabled, button.oc-sdk:disabled, .oc-sdk[aria-disabled="true"], .oc-sdk [aria-disabled="true"] { opacity: .5; pointer-events: none; }

.oc-sdk-btn { display: inline-flex; align-items: center; justify-content: center; gap: 8px; height: 32px; padding: 0 12px; border: 1px solid transparent; font-size: 0.875rem; font-weight: 500; line-height: 1; white-space: nowrap; }
.oc-sdk-btn[data-size="sm"] { gap: 6px; height: 28px; padding: 0 10px; font-size: 0.8125rem; }
.oc-sdk-btn[data-size="xs"] { gap: 4px; height: 24px; padding: 0 8px; font-size: 0.75rem; }
.oc-sdk-btn[data-loading="true"] { opacity: .5; pointer-events: none; }
.oc-sdk-btn > .oc-sdk-spinner-ring { width: 14px; height: 14px; }

.oc-sdk-field { display: flex; flex-direction: column; gap: 4px; min-width: 0; }
.oc-sdk-field-label { font-size: 0.8125rem; font-weight: 500; }
.oc-sdk-field-note { font-size: 0.75rem; }
.oc-sdk-input { display: block; width: 100%; min-width: 0; height: 32px; padding: 0 10px; border: 0; font-size: 0.875rem; line-height: 1.45; appearance: none; }
textarea.oc-sdk-input { height: auto; padding: 8px 10px; resize: vertical; }

.oc-sdk-search { position: relative; min-width: 0; }
.oc-sdk-search .oc-sdk-input { padding-left: 34px; padding-right: 34px; }
.oc-sdk-search-icon { position: absolute; left: 11px; top: 50%; transform: translateY(-50%); pointer-events: none; }
.oc-sdk-search-clear { position: absolute; right: 6px; top: 50%; transform: translateY(-50%); display: none; align-items: center; justify-content: center; width: 24px; height: 24px; }
.oc-sdk-search[data-active="true"] .oc-sdk-search-clear { display: inline-flex; }

.oc-sdk-select { position: relative; display: flex; flex-direction: column; gap: 4px; min-width: 0; }
.oc-sdk-trigger { display: inline-flex; align-items: center; gap: 6px; align-self: flex-start; width: auto; max-width: 100%; min-width: 0; height: 28px; padding: 0 10px; border: 1px solid transparent; font-size: 0.8125rem; text-align: left; }
.oc-sdk-trigger-value { flex: 1 1 auto; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.oc-sdk-trigger-chevron { flex: 0 0 auto; }
.oc-sdk-popup { position: fixed; z-index: 50; display: flex; flex-direction: column; gap: 2px; min-width: 160px; max-width: calc(100vw - 16px); max-height: min(320px, calc(100vh - 16px)); overflow: auto; padding: 4px; border: 1px solid transparent; }
.oc-sdk-popup-search { flex: 0 0 auto; padding: 2px 2px 4px; }
.oc-sdk-popup-search .oc-sdk-input { height: 28px; font-size: 0.8125rem; }
.oc-sdk-option { display: flex; align-items: center; gap: 8px; width: 100%; padding: 6px 8px; font-size: 0.8125rem; text-align: left; }
.oc-sdk-option-label { flex: 1 1 auto; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.oc-sdk-option-hint { flex: 0 0 auto; font-size: 0.75rem; }
.oc-sdk-option-check { flex: 0 0 auto; display: inline-flex; width: 14px; visibility: hidden; }
.oc-sdk-option[aria-selected="true"] > .oc-sdk-option-check { visibility: visible; }
.oc-sdk-popup-empty { padding: 8px; font-size: 0.8125rem; }

.oc-sdk-check { display: inline-flex; align-items: flex-start; gap: 8px; width: 100%; text-align: left; }
.oc-sdk-check-box { flex: 0 0 auto; display: inline-flex; align-items: center; justify-content: center; width: 14px; height: 14px; margin-top: 3px; border: 1px solid transparent; }
.oc-sdk-check-box > svg { display: none; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-box > svg { display: block; }
.oc-sdk-check-thumb { flex: 0 0 auto; position: relative; width: 36px; height: 20px; }
.oc-sdk-check-thumb::after { content: ""; position: absolute; top: 2px; left: 2px; width: 16px; height: 16px; }
.oc-sdk-check-text { display: flex; flex-direction: column; min-width: 0; }
.oc-sdk-check-label { font-size: 0.875rem; }
.oc-sdk-check-desc { font-size: 0.75rem; }

.oc-sdk-tabs { display: inline-flex; gap: 2px; padding: 2px; max-width: 100%; overflow: auto; }
.oc-sdk-tab { display: inline-flex; align-items: center; gap: 6px; height: 28px; padding: 0 10px; border: 1px solid transparent; font-size: 0.8125rem; font-weight: 500; white-space: nowrap; }
.oc-sdk-tab-count { font-size: 0.75rem; font-variant-numeric: tabular-nums; }

.oc-sdk-badge { display: inline-flex; align-items: center; padding: 1px 6px; font-size: 11px; font-weight: 500; line-height: 16px; white-space: nowrap; }

.oc-sdk-list { display: flex; flex-direction: column; gap: 1px; min-width: 0; }
.oc-sdk-row { display: flex; align-items: center; gap: 8px; width: 100%; padding: 6px 8px; text-align: left; }
.oc-sdk-row-lead { flex: 0 0 auto; width: 64px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-size: 0.75rem; }
.oc-sdk-row-main { flex: 1 1 auto; min-width: 0; display: flex; flex-direction: column; }
.oc-sdk-row-title { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.oc-sdk-row-sub { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-size: 0.75rem; }
.oc-sdk-row-meta { flex: 0 0 auto; font-size: 0.75rem; font-variant-numeric: tabular-nums; }
.oc-sdk-list-empty { padding: 16px 8px; text-align: center; font-size: 0.8125rem; }

.oc-sdk-empty { display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 4px; padding: 40px 16px; text-align: center; }
.oc-sdk-empty-title { margin: 0; font-size: 0.8125rem; font-weight: 600; }
.oc-sdk-empty-body { margin: 0; max-width: 32rem; font-size: 0.8125rem; }
.oc-sdk-empty-action { margin-top: 12px; }

@keyframes oc-sdk-spin { to { transform: rotate(360deg); } }
.oc-sdk-spinner { display: inline-flex; align-items: center; gap: 8px; font-size: 0.8125rem; }
.oc-sdk-spinner-ring { width: 16px; height: 16px; border: 2px solid transparent; animation: oc-sdk-spin .8s linear infinite; }
.oc-sdk-spinner[data-size="sm"] .oc-sdk-spinner-ring { width: 12px; height: 12px; }

.oc-sdk-banner { display: flex; align-items: flex-start; gap: 12px; padding: 8px 12px; border: 1px solid transparent; }
.oc-sdk-banner-text { flex: 1 1 auto; min-width: 0; display: flex; flex-direction: column; gap: 2px; }
.oc-sdk-banner-title { font-size: 0.8125rem; font-weight: 500; }
.oc-sdk-banner-body { font-size: 0.8125rem; }
.oc-sdk-banner-action { flex: 0 0 auto; }

.oc-sdk-separator { display: flex; align-items: center; gap: 8px; width: 100%; margin: 8px 0; font-size: 0.75rem; }
.oc-sdk-separator::before, .oc-sdk-separator::after { content: ""; flex: 1 1 auto; height: 1px; }
.oc-sdk-separator[data-labeled="false"]::after { display: none; }
.oc-sdk-popup > .oc-sdk-separator { margin: 4px 0; }

.oc-sdk-progress { display: flex; flex-direction: column; gap: 4px; min-width: 0; }
.oc-sdk-progress-label { display: flex; justify-content: space-between; font-size: 0.75rem; font-variant-numeric: tabular-nums; }
.oc-sdk-progress-track { height: 6px; overflow: hidden; }
.oc-sdk-progress-fill { height: 100%; transform-origin: left; transition: transform 200ms ease-out; }
.oc-sdk-progress-value { display: inline-flex; align-items: center; gap: 2px; }
.oc-sdk-progress[data-done="true"] .oc-sdk-progress-value { font-weight: 600; }

.oc-sdk-menu { position: relative; display: inline-flex; }

.oc-sdk-text { white-space: pre-wrap; overflow-wrap: anywhere; }
.oc-sdk-text img { display: block; max-width: 100%; margin: 8px 0; }
`,KT=`${uT}
.oc-sdk { color: ${w}; font-family: ${vT}; }
.oc-sdk :focus-visible, .oc-sdk:focus-visible { outline: none; }
.oc-sdk :where(button, a[href], [role="button"], [role="tab"], [role="option"]):focus-visible, button.oc-sdk:focus-visible { ${$T} }
.oc-sdk-mono { font-family: ${Y_}; }
.oc-sdk-muted { color: ${W}; }
${xS("success")}${xS("warning")}${xS("error")}${xS("info")}
.oc-sdk[data-tone="primary"], .oc-sdk [data-tone="primary"] { --oc-sdk-tone: ${h}; --oc-sdk-tone-text: ${Q_}; }

.oc-sdk-btn { border-radius: ${$_}; transition: background 150ms ease-out, color 150ms ease-out; }
.oc-sdk-btn[data-size="xs"] { border-radius: ${YT}; }
.oc-sdk-btn[data-variant="default"] { color: ${Q_}; background: ${F(h,10,m)}; border-color: ${F(h,12)}; ${ZT} }
.oc-sdk-btn[data-variant="default"]:hover { background: ${F(h,16,m)}; }
.oc-sdk-btn[data-variant="default"]:active { background: ${F(h,22,m)}; box-shadow: none; }
.oc-sdk-btn[data-variant="secondary"] { background: ${cT}; color: var(--oc-fg); }
.oc-sdk-btn[data-variant="secondary"]:hover { background-image: linear-gradient(${f}, ${f}); }
.oc-sdk-btn[data-variant="secondary"]:active { background-image: linear-gradient(${d}, ${d}); }
.oc-sdk-btn[data-variant="outline"] { background: var(--oc-sdk-raised-bg); color: ${s}; ${z_} }
.oc-sdk-btn[data-variant="outline"]:hover { background-image: linear-gradient(${f}, ${f}); }
.oc-sdk-btn[data-variant="outline"]:active { background-image: linear-gradient(${d}, ${d}); box-shadow: none; }
.oc-sdk-btn[data-variant="ghost"] { background: transparent; }
.oc-sdk-btn[data-variant="ghost"]:hover { background: ${f}; }
.oc-sdk-btn[data-variant="ghost"]:active { background: ${d}; }
.oc-sdk-btn[data-variant="destructive"] { --oc-sdk-tone: ${N("status-error","red")}; color: ${L_}; background: ${F("var(--oc-sdk-tone)",7,m)}; border-color: ${F("var(--oc-sdk-tone)",12)}; ${ZT} }
.oc-sdk-btn[data-variant="destructive"]:hover { background: ${F("var(--oc-sdk-tone)",9,m)}; }
.oc-sdk-btn[data-variant="destructive"]:active { background: ${F("var(--oc-sdk-tone)",11,m)}; box-shadow: none; }

.oc-sdk-field-note { color: ${W}; }
.oc-sdk-field[data-invalid="true"] .oc-sdk-field-note { color: ${L_}; }
.oc-sdk-input { border-radius: ${$_}; background: var(--oc-sdk-field-bg); color: ${s}; ${Z_("var(--oc-sdk-edge)")} transition: background 150ms ease-out; }
.oc-sdk-input::placeholder { color: ${W}; }
.oc-sdk-input:hover:not(:focus) { background-image: linear-gradient(${f}, ${f}); }
.oc-sdk-input:focus, .oc-sdk-input:focus-visible { ${Z_(F(w,26),"1px")} }
.oc-sdk-field[data-invalid="true"] .oc-sdk-input, .oc-sdk-field[data-invalid="true"] .oc-sdk-input:focus { ${Z_(N("status-error","red"),"1px")} }
.oc-sdk-input[data-mono="true"] { font-family: ${Y_}; }

.oc-sdk-search-icon { color: ${W}; }
.oc-sdk-search[data-active="true"] .oc-sdk-search-icon { color: ${h}; }
.oc-sdk-search-clear { border-radius: ${YT}; color: ${W}; }
.oc-sdk-search-clear:hover { background: ${f}; color: ${w}; }

.oc-sdk-trigger { border-radius: ${$_}; background: var(--oc-sdk-raised-bg); color: ${s}; ${z_} transition: background 150ms ease-out; }
.oc-sdk-trigger:hover { background-image: linear-gradient(${f}, ${f}); }
.oc-sdk-trigger[aria-expanded="true"] { background-image: linear-gradient(${d}, ${d}); }
.oc-sdk-trigger-value[data-empty="true"] { color: ${W}; }
.oc-sdk-trigger-chevron { color: ${W}; }
/* The app's floating level: the glass edge (a hairline ring and a lit top line, dark outside and light inside in dark themes) over soft shadows. The outer ring is the border, over the page like the app's. */
.oc-sdk-popup { --surface-foreground: ${s}; border-color: var(--oc-sdk-float-edge); border-radius: 12px; background: ${wS}; background-clip: padding-box; color: ${s}; box-shadow: var(--oc-sdk-float); }
.oc-sdk-option { border-radius: 8px; }
.oc-sdk-option[data-active="true"] { background: ${f}; }
/* A selected option shows a check mark in the text colour, like the app's own pickers. Options without the mark come
   from bundles built before it existed and keep the selection fill as their only sign of the choice. */
.oc-sdk-option[aria-selected="true"]:not([data-mark]) { background: ${W_}; color: ${F_}; }
.oc-sdk-option-check { color: ${w}; }
.oc-sdk-option[data-destructive="true"] { color: ${L_}; }
.oc-sdk-option[data-destructive="true"][data-active="true"] { background: ${F(N("status-error","red"),10)}; }
.oc-sdk-option-hint { color: ${W}; }
.oc-sdk-popup-empty { color: ${W}; }

/* Checked stays neutral: the mark carries the state, and the primary colour stays with primary actions. */
.oc-sdk-check-box { border-color: ${u}; border-radius: 4px; color: ${w}; transition: border-color 150ms ease-out; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-box { border-color: ${F(w,60,u)}; }
.oc-sdk-check-thumb { border-radius: 9999px; background: ${u}; transition: background 150ms ease-out; }
.oc-sdk-check-thumb::after { border-radius: 9999px; background: ${m}; transition: transform 150ms ease-out; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-thumb { background: ${h}; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-thumb::after { transform: translateX(16px); }
.oc-sdk-check:focus-visible { box-shadow: none; }
.oc-sdk-check:focus-visible .oc-sdk-check-box, .oc-sdk-check:focus-visible .oc-sdk-check-thumb { ${$T} }
.oc-sdk-check-desc { color: ${W}; }

.oc-sdk-tabs { border-radius: 10px; }
.oc-sdk-tabs[data-track="true"] { background: ${F(w,4)}; box-shadow: inset 0 1px 2px 0 rgb(0 0 0 / 0.16); }
.oc-sdk-tab { border-radius: 8px; color: ${W}; transition: color 150ms ease-out, background 150ms ease-out; }
.oc-sdk-tab:hover { color: ${w}; }
.oc-sdk-tab[aria-selected="true"] { color: ${F_}; background: ${W_}; border-color: ${u}; }
.oc-sdk-tabs[data-track="true"] .oc-sdk-tab[aria-selected="true"] { color: ${s}; background: var(--oc-sdk-raised-bg); ${z_} }
.oc-sdk-tab-count { color: ${W}; }

/* The app's neutral badge: a step of the text colour, the same in every theme. */
.oc-sdk-badge { border-radius: 9999px; background: ${F(w,6)}; color: ${W}; }
.oc-sdk-badge[data-tone] { color: var(--oc-sdk-tone-text, var(--oc-sdk-tone)); background: ${F("var(--oc-sdk-tone)",15)}; }

.oc-sdk-row { border-radius: 6px; transition: background 120ms ease-out; }
.oc-sdk-row:hover, .oc-sdk-row[data-active="true"] { background: ${f}; }
.oc-sdk-row[aria-selected="true"] { background: ${W_}; color: ${F_}; }
.oc-sdk-row-lead { font-family: ${Y_}; color: ${W}; }
.oc-sdk-row-sub { color: ${W}; }
.oc-sdk-row-meta { color: ${W}; }
.oc-sdk-row[aria-selected="true"] .oc-sdk-row-lead, .oc-sdk-row[aria-selected="true"] .oc-sdk-row-sub, .oc-sdk-row[aria-selected="true"] .oc-sdk-row-meta { color: inherit; opacity: .75; }
.oc-sdk-list-empty { color: ${W}; }

.oc-sdk-empty-body { color: ${W}; }

.oc-sdk-spinner { color: ${W}; }
.oc-sdk-spinner-ring { border-color: ${u}; border-top-color: ${h}; border-radius: 9999px; }

/* Set apart by its tint alone, like the app's banners. */
.oc-sdk-banner { border-color: transparent; border-radius: 8px; background: ${F("var(--oc-sdk-tone)",10)}; }
.oc-sdk-banner-title { color: var(--oc-sdk-tone-text, var(--oc-sdk-tone)); }
.oc-sdk-banner-body { color: ${W}; }

.oc-sdk-separator { color: ${W}; }
.oc-sdk-separator::before, .oc-sdk-separator::after { background: ${F(u,40)}; }

.oc-sdk-progress-label { color: ${W}; }
/* The app's progress: a groove a step of the text colour, green once done. Older bundles mark done only through aria-valuenow. */
.oc-sdk-progress-track { border-radius: 9999px; background: ${F(w,6)}; }
.oc-sdk-progress-fill { border-radius: 9999px; background: var(--oc-sdk-tone, ${h}); }
.oc-sdk-progress-track[aria-valuenow="100"] > .oc-sdk-progress-fill:not([data-tone]) { background: ${N("status-success","currentColor")}; }
.oc-sdk-progress[data-done="true"] .oc-sdk-progress-value { color: ${N("success-text","inherit")}; }

.oc-sdk-text a { color: ${Q_}; text-decoration: underline; text-underline-offset: 2px; }
.oc-sdk-text img { border-radius: 8px; border: 1px solid ${F(u,60)}; }
`,K=`
${pS}
${dT}
${KT}`;var hS=N_(),e=document.querySelector("#root");if(!e)throw Error("DeskChart: missing root");e.style.padding="12px";hS.onReady((S)=>B_(S,document.documentElement));hS.onBlock(({args:S,answered:E})=>{let G=(S.values??"").split(",").map(Number).filter(Number.isFinite),$=Math.max(1,...G);e.replaceChildren();let X=document.createElement("div");X.textContent=S.title??"",X.style.font="600 13px var(--oc-font, system-ui)";let Z=document.createElement("div");Z.style.cssText="display:flex;align-items:flex-end;gap:6px;height:96px;margin-top:8px";for(let J of G){let b=document.createElement("div");b.style.cssText=`flex:1;height:${J/$*100}%;background:currentColor;opacity:.6;border-radius:3px 3px 0 0`,b.title=String(J),Z.append(b)}let H=document.createElement("button");H.textContent=E??"Explain this",H.disabled=E!==null,H.addEventListener("click",()=>{hS.answerBlock("Explain this chart")}),e.append(X,Z,H)});new ResizeObserver(()=>{hS.setHeight(Math.ceil(e.getBoundingClientRect().height))}).observe(e);})();
