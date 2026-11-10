(()=>{var X="openchamber.sdk",I=1;var dS=`
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
`;function pS(S){let E=S.documentElement;if(E.hasAttribute("data-oc-scrollbar-activity"))return;E.setAttribute("data-oc-scrollbar-activity","");let O=new WeakMap;S.addEventListener("scroll",(P)=>{let D=P.target===S?E:P.target;if(!(D instanceof Element))return;if(!D.hasAttribute("data-oc-scrolling"))D.setAttribute("data-oc-scrolling","");let V=O.get(D);if(V!==void 0)clearTimeout(V);O.set(D,setTimeout(()=>{O.delete(D),D.removeAttribute("data-oc-scrolling")},1000))},{capture:!0,passive:!0})}var HT=`(${pS.toString()})(document);`;var lS=128,oS=65536;var WS=128;var FS=65536;var p_=/^[a-z][a-z0-9-]{0,39}$/;var v_=(S)=>Object(S)===S&&!Array.isArray(S),aS=(S,E)=>Object.keys(S).every((O)=>E.includes(O)),u_=(S)=>String(S)===S&&S.length>=1&&S.length<=60,d_=(S)=>String(S)===S&&S.length>=1&&S.length<=80,l_=(S)=>{if(!Array.isArray(S)||S.length>4)return!1;let E=new Set;for(let O of S){if(!v_(O)||!p_.test(O.id)||!u_(O.label))return!1;if(O.disabled!==void 0&&O.disabled!==!0&&O.disabled!==!1)return!1;if(E.has(O.id))return!1;if(E.add(O.id),O.kind==="button"){if(!aS(O,["kind","id","label","disabled"]))return!1;continue}if(O.kind!=="select"||!aS(O,["kind","id","label","value","options","disabled"]))return!1;if(!d_(O.value)||!Array.isArray(O.options)||O.options.length<1||O.options.length>16)return!1;let P=new Set;for(let D of O.options){if(!v_(D)||!aS(D,["value","label"])||!d_(D.value)||!u_(D.label)||P.has(D.value))return!1;P.add(D.value)}if(!P.has(O.value))return!1}return!0};var o_=["{id}","{segment}","{segments+}"];var GE=new Set(o_);var a_=["turn-finished","turn-failed","permission-asked","question-asked","turn-started","session-created","session-archived","session-deleted"];var AE=new Set(a_);var QS=20000000,LS=256;var rS=(S)=>("bytes"in S)?S.bytes.byteLength:S.content.length,r_=(S,E)=>{if(S.path!==E.path||S.readOnly!==E.readOnly)return!1;if(S.encoding==="text"||E.encoding==="text")return S.encoding==="text"&&E.encoding==="text"&&S.content===E.content;if(S.bytes.byteLength!==E.bytes.byteLength)return!1;for(let O=0;O<S.bytes.byteLength;O+=1)if(S.bytes[O]!==E.bytes[O])return!1;return!0};var i_=/^[A-Za-z0-9_-]{1,80}$/;var n_=["left","right","top","bottom"];var s_=(S,E=0,O={remaining:16000})=>{if(--O.remaining<0||E>=32)return!1;if(S===null)return!0;let P=Array.isArray(S)?S:Object(S)===S?Object.values(S):[];for(let D of P)if(!s_(D,E+1,O))return!1;return!0},iS=(S)=>{if(S===null||S===!0||S===!1)return!0;if(Array.isArray(S))return Object.keys(S).every((E)=>/^(0|[1-9]\d*)$/.test(E)&&Number(E)<S.length)&&S.every(iS);if(Object(S)===S){let E=Object.getPrototypeOf(S);return(E===null||E===Object.prototype)&&Object.values(S).every(iS)}return String(S)===S||Number.isFinite(S)},nS=(S)=>{try{if(String(S.id)!==S.id||!i_.test(S.id)||!Number.isFinite(S.anchor.x)||Math.abs(S.anchor.x)>1e5||!Number.isFinite(S.anchor.y)||Math.abs(S.anchor.y)>1e5||!Number.isFinite(S.anchor.width)||!Number.isFinite(S.anchor.height)||S.anchor.width<=0||S.anchor.height<=0||S.anchor.width>1e5||S.anchor.height>1e5||!Number.isInteger(S.width)||S.width<160||S.width>640||!Number.isInteger(S.height)||S.height<48||S.height>480||S.side!==void 0&&!n_.includes(S.side)||S.focus!==void 0&&S.focus!==!0&&S.focus!==!1||!s_(S.data)||!iS(S.data))return!1;return JSON.stringify(S.data).length<=16000}catch{return!1}};var tS=2000;var e_=["file","directory","other","missing"],eS=(S)=>Boolean(S&&"sessionId"in S),S_=(S)=>Boolean(S&&"sent"in S&&!("sessionId"in S));var ST=/^[0-9a-f]{7,64}$/i,__=(S)=>ST.test(S),YS=500,$S=32000,_T=16000,TT=128,ET=200,OT=2000,RT=16000,MT=80,GT=200,UT=16000;var AT=2000;var T_=20000,ZS=1024,zS=2000000;var KS=64000,JS=8000,E_=4000;var O_=960000;var CT=999,PT=1e4,US=500,DT=["HOST_UNAVAILABLE","HOST_TIMEOUT","HOST_REJECTED","DISCONNECTED","DISABLED","BAD_PATH","NO_INTEGRATION","NO_SERVICE","SERVICE_FAILED","REQUEST_FAILED","RESPONSE_TOO_LARGE","NO_SESSION","SESSION_BUSY","NOT_GRANTED","NO_DIRECTORY","NOT_FOUND","FILE_TOO_LARGE","DENIED","NO_MODEL","MODEL_FAILED","UNSUPPORTED"],XT=["stopped","starting","ready","failed"],xT=new Set(DT),IT=(S)=>xT.has(S),VT=(S)=>S&&IT(S)?S:"HOST_REJECTED",s=(S)=>{if(S===void 0)return!1;if(S===null||S===!0||S===!1)return!0;if(String(S)===S)return!0;if(Number(S)===S)return Number.isFinite(S);if(Array.isArray(S))return S.every(s);if(Object(S)===S)return Object.values(S).every(s);return!1},NT=(S)=>s(S)&&JSON.stringify(S).length<=UT,t_=(S)=>S?.trim().slice(0,GT)??"",t=(S)=>{let E=S.id.trim().slice(0,TT),O=S.title.trim().slice(0,ET),P=S.url.trim().slice(0,OT),D=S.text?.trim().slice(0,RT),V=S.author?.trim().slice(0,MT),J=S.kind==="pull"?"pull":"issue",Q={providerId:S.providerId.trim(),id:E,title:O||E,url:P,kind:J};if(D)Q.text=D;if(V)Q.author=V;if(J==="pull"){let f=t_(S.branches?.head),x=t_(S.branches?.base);if(f&&x)Q.branches={head:f,base:x}}if(NT(S.data))Q.data=S.data;return Q},R_=(S)=>{let E=t(S);if(S.projectId)E.projectId=S.projectId;if(S.navigation)E.navigation=S.navigation;if(S.worktree)E.worktree=S.worktree;return E},M_=(S)=>{let E={text:S.text.trim().slice(0,_T)};if(S.send)E.send=!0;return E},G_=(S)=>{if(S===null||!Number.isFinite(S))return null;return Math.min(CT,Math.max(0,Math.round(S)))},U_=(S)=>{if(!Number.isFinite(S))return 0;return Math.min(PT,Math.max(0,Math.ceil(S)))};var e=(S)=>S.length>0&&S.length<=ZS&&!S.includes("\x00")&&!S.includes("\\");var fS=(S)=>{if(!S.startsWith("/")||S.includes("\x00")||S.includes("\\")||S.includes("://"))return!1;if(S.length>AT)return!1;return!S.split("/").some((O)=>O==="."||O==="..")},bT=new Set(XT),A_=(S)=>Boolean(S&&"status"in S&&bT.has(String(S.status))&&!("body"in S)),jS=(S)=>Boolean(S&&"status"in S&&"body"in S&&Number.isInteger(S.status)),C_=(S)=>Boolean(S&&"content"in S&&String(S.content)===S.content),P_=(S)=>Boolean(S&&"written"in S&&S.written===!0),D_=(S)=>Boolean(S&&"entries"in S&&Array.isArray(S.entries)),qT=new Set(e_),X_=(S)=>Boolean(S&&"kind"in S&&"size"in S&&qT.has(String(S.kind))&&Number.isFinite(S.size)),I_=(S)=>Boolean(S&&"text"in S&&String(S.text)===S.text&&!("status"in S)),yT=new Set(["workspace","shells","ready","directory","session","connection","settings","session-lifecycle","item","resolve","action","service-event","status-control-event","popover-closed","file-open","file-snapshot","file-saved","generate-late"]),gT=(S)=>Object(S)===S?S:null,sS=(S)=>String(S)===S&&S.length>0,hT=(S)=>{if(!sS(S.id))return null;if(S.ok===!0){let E={channel:X,v:I,type:"result",id:S.id,ok:!0};if(Object(S.payload)===S.payload)E.payload=S.payload;return E}if(S.ok===!1&&sS(S.error))return{channel:X,v:I,type:"result",id:S.id,ok:!1,error:S.error,code:VT(sS(S.code)?S.code:void 0)};return null},V_=(S)=>{let E=gT(S);if(!E||E.channel!==X||E.v!==I)return null;if(E.type==="result")return hT(E);if(!yT.has(String(E.type))||Object(E.payload)!==E.payload)return null;return E};var BT=(S)=>("key"in S)&&("metaKey"in S)&&("ctrlKey"in S),mT=(S)=>(S.metaKey||S.ctrlKey)&&!S.altKey&&!S.shiftKey&&S.key.toLowerCase()==="s";class U extends Error{code;constructor(S,E){super(E);this.name="HostRequestError",this.code=S}}var WT=()=>Promise.reject(new U("BAD_PATH",'Request path must start with "/" and stay on the declared origin.')),kS=()=>Promise.reject(new U("BAD_PATH",`File path must be 1 to ${ZS} characters without NUL or backslash.`)),HS=(S)=>{if(S===void 0)return;if(Object(S)!==S||Array.isArray(S)||S.scope!==void 0&&S.scope!=="instance"&&S.scope!=="device")throw new U("HOST_REJECTED",'Storage scope must be "instance" or "device".');return S.scope==="device"?"device":void 0},C=(S)=>{return S.value+=1,`oc-${S.value}`},N_=(S={})=>{let E=S.target??("window"in globalThis?window:null);if(!E)throw new U("HOST_UNAVAILABLE","No window. connectHost runs in a browser frame.");let O=S.acceptSource??((_)=>_===E.parent),P=S.requestTimeoutMs??T_,D=new Set,V=new Set,J=new Set,Q=new Set,f=new Set,x=new Set,u=new Set,AS=new Set,CS=new Set,PS=new Set,DS=new Set,a=new Set,hS=[],TS=null,ES=null,XS=new Set,IS=new Set,OS=null,RS=null,mS=!1,r=new Map,i=new Map,n=new Map,h=!1,A={value:0},G=null,m=null,MS=!1,GS=!1,j_=null,k_=(_)=>{if(!_)return null;return{sessionId:_.id,phase:_.busy?"started":"completed"}},b=(_)=>{E.parent.postMessage(_,"*")},H_=()=>{if(h||E.parent===E||a.size===0||G?.features?.lateGenerateResults!==!0)return;b({channel:X,v:I,type:"generate-late-listen"})},F=(_,T)=>{for(let R of _)try{R(T)}catch(M){console.error(M)}},w_=(_)=>{if(!(_ instanceof MessageEvent))return;if(!O(_.source))return;let T=V_(_.data);if(!T)return;if(T.type==="workspace"){let M=i.get(T.payload.subscriptionId);if(M)F([M],T.payload.snapshot);return}if(T.type==="shells"){let M=n.get(T.payload.subscriptionId);if(M)F([M],T.payload.snapshot);return}if(T.type==="ready"){if(G=T.payload,m=k_(T.payload.session),F(D,T.payload),F(V,T.payload.directory),F(J,T.payload.session),m)F(Q,m);if(F(f,T.payload.connection),F(x,T.payload.settings),F(u,T.payload.item),T.payload.block)F(AS,T.payload.block);H_();return}if(T.type==="service-event"){F(CS,T.payload);return}if(T.type==="generate-late"){if(a.size===0)hS.push(T.payload);else F(a,T.payload);return}if(T.type==="directory"){if(G)G={...G,directory:T.payload.directory};F(V,T.payload.directory);return}if(T.type==="session"){if(G)G={...G,session:T.payload.session};if(!T.payload.session)m=null;else if(m?.sessionId!==T.payload.session.id)m=k_(T.payload.session);F(J,T.payload.session);return}if(T.type==="session-lifecycle"){m=T.payload,F(Q,T.payload);return}if(T.type==="connection"){if(G)G={...G,connection:T.payload.connection};F(f,T.payload.connection);return}if(T.type==="settings"){if(G)G={...G,settings:T.payload.settings};F(x,T.payload.settings);return}if(T.type==="item"){if(G)G={...G,item:T.payload.item};F(u,T.payload.item);return}if(T.type==="status-control-event"){F(PS,T.payload);return}if(T.type==="popover-closed"){F(DS,T.payload);return}if(T.type==="action"){let M=(N)=>{if(!h)b({channel:X,v:I,type:"action-result",id:T.id,payload:N})},B=ES;if(!B){M({ok:!1,error:"This extension does not handle background actions."});return}Promise.resolve().then(()=>B(T.payload)).then(()=>M({ok:!0}),(N)=>{let K=(N instanceof Error?N.message:String(N)).trim();M({ok:!1,error:(K||"Action failed.").slice(0,US)})});return}if(T.type==="file-open"){let M=T.payload;if(RS&&r_(RS,M))return;RS=M,F(XS,T.payload);return}if(T.type==="file-saved"){F(IS,T.payload.version);return}if(T.type==="file-snapshot"){let M=(K)=>{if(!h)b({channel:X,v:I,type:"file-snapshot-result",id:T.id,payload:K})},B=(K)=>M({error:(K.trim()||"Could not read the edited file.").slice(0,US)}),N=OS;if(!N){B("This extension does not edit files.");return}Promise.resolve().then(()=>N(T.payload.purpose)).then((K)=>{if(rS(K)>QS){B(`The file is over ${QS} ${"bytes"in K?"bytes":"characters"}.`);return}if(K.version.length>LS){B(`The snapshot version is over ${LS} characters.`);return}M({snapshot:"bytes"in K?{bytes:K.bytes,version:K.version}:{content:K.content,version:K.version}})},(K)=>B(K instanceof Error?K.message:String(K)));return}if(T.type==="resolve"){let M=(N)=>{b({channel:X,v:I,type:"resolve-result",id:T.id,payload:N})},B=TS;if(!B){M({error:"This extension does not resolve commands."});return}Promise.resolve().then(()=>B(T.payload)).then((N)=>M({item:N?t(N):null}),(N)=>{let K=(N instanceof Error?N.message:String(N)).trim();M({error:(K||"Command failed.").slice(0,US)})});return}let R=r.get(T.id);if(!R)return;if(clearTimeout(R.timer),r.delete(T.id),T.ok){R.resolve(T.payload);return}R.reject(new U(T.code,T.error))};E.addEventListener("message",w_),b({channel:X,v:I,type:"hello"});let H=(_,T=P)=>{if(h||E.parent===E)return Promise.reject(new U("HOST_UNAVAILABLE","No host frame. This page is not in an iframe."));return new Promise((R,M)=>{let B=setTimeout(()=>{r.delete(_.id),M(new U("HOST_TIMEOUT","Host did not answer in time."))},T);r.set(_.id,{resolve:R,reject:M,timer:B}),b(_)})},$=(_)=>H(_).then(()=>{return}),z={channel:X,v:I},cS=(_)=>{if(!h&&E.parent!==E)b(_)},x_=()=>cS({...z,type:"file-save"}),b_=(_)=>{if(!BT(_)||!mT(_))return;_.preventDefault(),x_()},q_=(_)=>{if(!BT(_)||_.key!=="Escape"||G?.surface!=="popover"||!G.popover)return;_.preventDefault(),m_(G.popover.id,"escape").catch(()=>{return})},VS=()=>{let _=G?.surface==="popover"?G.popover:void 0;if(!_)return;let T=MS||GS;if(j_===T)return;j_=T,c_(_.id,T).catch(()=>{return})},NS=()=>{if(G?.surface!=="popover"||MS)return;MS=!0,VS()},y_=(_)=>{if(G?.surface!=="popover"||_.relatedTarget!==null||!MS)return;MS=!1,VS()},g_=()=>{if(G?.surface!=="popover"||GS)return;GS=!0,VS()},h_=()=>{if(G?.surface!=="popover"||!GS)return;GS=!1,VS()},g=(_,T=1024)=>{if(!_.trim()||_.length>T)throw new U("HOST_REJECTED",`Identity must contain 1 to ${T} characters.`)},vS=async(_)=>{if(_.kind!=="projects")g(_.projectId);let T=await H({...z,type:"workspace-read",id:C(A),payload:_});if(!T||!("kind"in T)||!("state"in T)||T.kind!==_.kind)throw new U("HOST_REJECTED","Host did not return workspace data.");return T},uS=async(_,T)=>{if(_.kind!=="projects")g(_.projectId);let R=C(A);i.set(R,T);try{await $({...z,type:"workspace-subscribe",id:C(A),payload:{subscriptionId:R,query:_}})}catch(M){if(i.delete(R),!h)b({...z,type:"workspace-unsubscribe",id:C(A),payload:{subscriptionId:R}});throw M}return()=>{if(!i.delete(R)||h)return;b({...z,type:"workspace-unsubscribe",id:C(A),payload:{subscriptionId:R}})}},kT=async(_,T)=>{if(_.kind==="session")g(_.sessionId);if(_.kind==="project")g(_.projectId);let R=C(A);n.set(R,T);try{await $({...z,type:"shells-subscribe",id:C(A),payload:{subscriptionId:R,scope:_}})}catch(M){if(n.delete(R),!h)b({...z,type:"shells-unsubscribe",id:C(A),payload:{subscriptionId:R}});throw M}return()=>{if(!n.delete(R)||h)return;b({...z,type:"shells-unsubscribe",id:C(A),payload:{subscriptionId:R}})}},BS=async(_)=>{if("key"in _&&(_.key.length===0||_.key.length>lS))throw new U("HOST_REJECTED","Storage key must contain 1 to 128 characters.");if(_.op==="set"&&!s(_.value))throw new U("HOST_REJECTED","Storage values must be JSON.");if(_.op==="set"&&new TextEncoder().encode(JSON.stringify(_.value)).length>oS)throw new U("HOST_REJECTED","Storage value exceeds 64 KiB.");if(_.scope==="device"&&G?.features?.deviceStorage!==!0)throw new U("UNSUPPORTED","This host does not support device storage.");let T=await H({...z,type:"storage",id:C(A),payload:_});if(!T||!("storage"in T)||T.op!==_.op)throw new U("HOST_REJECTED","Host did not return storage data.");return T},m_=(_,T)=>G?.features?.popovers!==!0&&!(G?.surface==="popover"&&G.popover?.id===_)?Promise.reject(new U("UNSUPPORTED","This host does not support popovers.")):$({...z,type:"popover-close",id:C(A),payload:T?{id:_,reason:T}:{id:_}}),c_=(_,T)=>G?.features?.popovers!==!0&&!(G?.surface==="popover"&&G.popover?.id===_)?Promise.reject(new U("UNSUPPORTED","This host does not support popovers.")):$({...z,type:"popover-anchor",id:C(A),payload:{id:_,active:T}});return E.addEventListener("keydown",q_,!0),E.addEventListener("pointerover",NS),E.addEventListener("pointermove",NS),E.addEventListener("pointerout",y_),E.addEventListener("focus",g_),E.addEventListener("blur",h_),{onAction:(_)=>{return ES=_,()=>{if(ES===_)ES=null}},listProjects:async()=>{let _=await vS({kind:"projects"});if(_.kind!=="projects")throw new U("HOST_REJECTED","Expected projects.");return _},listWorktrees:async(_)=>{let T=await vS({kind:"worktrees",projectId:_});if(T.kind!=="worktrees")throw new U("HOST_REJECTED","Expected worktrees.");return T},listSessions:async(_)=>{let T=await vS({kind:"sessions",projectId:_});if(T.kind!=="sessions")throw new U("HOST_REJECTED","Expected sessions.");return T},onProjects:(_)=>uS({kind:"projects"},(T)=>{if(T.kind==="projects")_(T)}),onWorktrees:(_,T)=>uS({kind:"worktrees",projectId:_},(R)=>{if(R.kind==="worktrees")T(R)}),onSessions:(_,T)=>uS({kind:"sessions",projectId:_},(R)=>{if(R.kind==="sessions")T(R)}),onRunningShells:(_,T)=>kT(_,T),readShellOutput:async(_,T)=>{g(_,WS);let R=T?.cursor;if(R!==void 0&&(!Number.isInteger(R)||R<0))throw new U("HOST_REJECTED","Shell output cursor must be a non-negative integer.");let M=T?.tailBytes;if(M!==void 0&&(!Number.isInteger(M)||M<1||M>FS))throw new U("HOST_REJECTED",`Shell output tailBytes must be an integer between 1 and ${FS}.`);let N=await H({...z,type:"shell-output",id:C(A),payload:{shellId:_,cursor:R,tailBytes:M}});if(!N||typeof N.output!=="string"||!Number.isFinite(N.cursor))throw new U("HOST_REJECTED","Host did not return shell output.");return N},stopShell:async(_)=>{if(g(_,WS),(await H({...z,type:"shell-stop",id:C(A),payload:{shellId:_}}))?.stopped!==!0)throw new U("HOST_REJECTED","Host did not stop the shell.");return{stopped:!0}},openSession:async(_)=>{g(_),await $({...z,type:"open-session",id:C(A),payload:{sessionId:_}})},storage:{get:async(_,T)=>{let R=HS(T),M={op:"get",key:_};if(R)M.scope=R;let B=await BS(M);return B.op==="get"&&B.found?B.value:void 0},set:async(_,T,R)=>{let M=HS(R),B={op:"set",key:_,value:T};if(M)B.scope=M;await BS(B)},delete:async(_,T)=>{let R=HS(T),M={op:"delete",key:_};if(R)M.scope=R;await BS(M)},keys:async(_)=>{let T=HS(_),R={op:"keys"};if(T)R.scope=T;let M=await BS(R);if(M.op!=="keys")throw new U("HOST_REJECTED","Expected storage keys.");return M.keys}},onReady:(_)=>{if(D.add(_),G)_(G);return()=>{D.delete(_)}},onDirectory:(_)=>{if(V.add(_),G)_(G.directory);return()=>{V.delete(_)}},onSession:(_)=>{if(J.add(_),G)_(G.session);return()=>{J.delete(_)}},onSessionLifecycle:(_)=>{if(Q.add(_),m)_(m);return()=>{Q.delete(_)}},onConnection:(_)=>{if(f.add(_),G)_(G.connection);return()=>{f.delete(_)}},onSettings:(_)=>{if(x.add(_),G)_(G.settings);return()=>{x.delete(_)}},onItem:(_)=>{if(u.add(_),G)_(G.item);return()=>{u.delete(_)}},onBlock:(_)=>{if(AS.add(_),G?.block)_(G.block);return()=>{AS.delete(_)}},onServiceEvent:(_)=>{return CS.add(_),()=>{CS.delete(_)}},onStatusControl:(_)=>{return PS.add(_),()=>{PS.delete(_)}},onPopoverClosed:(_)=>{return DS.add(_),()=>{DS.delete(_)}},setStatusControls:(_)=>{if(G?.features?.statusControls!==!0)return Promise.reject(new U("UNSUPPORTED","This host does not support status controls."));if(!l_(_))return Promise.reject(new U("HOST_REJECTED","Status controls must have unique bounded ids and valid selected options."));return $({...z,type:"status-controls",id:C(A),payload:{controls:_}})},openPopover:(_)=>{if(G?.features?.popovers!==!0)return Promise.reject(new U("UNSUPPORTED","This host does not support popovers."));if(!nS(_))return Promise.reject(new U("HOST_REJECTED","Popover requests need bounded geometry and JSON data."));return $({...z,type:"popover-open",id:C(A),payload:_})},closePopover:m_,setPopoverAnchorActive:c_,onResolve:(_)=>{return TS=_,()=>{if(TS===_)TS=null}},toast:(_)=>{let T=_.message.trim();if(!T||T.length>YS)return Promise.reject(new U("HOST_REJECTED",`Toast message must contain 1 to ${YS} characters.`));if(_.copy&&_.copy!==!0&&(!_.copy.text.length||_.copy.text.length>$S))return Promise.reject(new U("HOST_REJECTED",`Toast copy text must contain 1 to ${$S} characters.`));return $({channel:X,v:I,type:"toast",id:C(A),payload:{..._,message:T}})},openUrl:(_)=>$({channel:X,v:I,type:"open-url",id:C(A),payload:{url:_}}),openCommit:(_)=>__(_)?$({channel:X,v:I,type:"open-commit",id:C(A),payload:{sha:_}}):Promise.reject(new U("HOST_REJECTED","Commit id must be 7 to 64 hex characters.")),answerBlock:(_)=>$({channel:X,v:I,type:"block-answer",id:C(A),payload:{text:_.trim().slice(0,tS)}}),openSurface:(_,T)=>$({channel:X,v:I,type:"open-surface",id:C(A),payload:T?.tab===void 0?{surfaceId:_}:{surfaceId:_,tab:T.tab}}),writeClipboard:(_)=>$({channel:X,v:I,type:"clipboard-write",id:C(A),payload:{text:_}}),compose:(_)=>$({channel:X,v:I,type:"compose",id:C(A),payload:_}),attach:(_)=>$({channel:X,v:I,type:"attach",id:C(A),payload:t(_)}),startSession:async(_)=>{if(_.projectId!==void 0)g(_.projectId);let T=_.worktree;if(T&&T!==!0)if(T.kind==="existing")g(T.directory);else{if(T.name!==void 0)g(T.name,200);if(T.baseBranch!==void 0)g(T.baseBranch,200)}let R=await H({channel:X,v:I,type:"start-session",id:C(A),payload:R_(_)},S.requestTimeoutMs??180000);if(!eS(R))throw new U("HOST_REJECTED","Host did not return a session.");return R},prompt:(_)=>H({channel:X,v:I,type:"prompt",id:C(A),payload:M_(_)}).then((T)=>{if(!S_(T))throw new U("HOST_REJECTED","Host did not return a prompt result.");return T}),sessionLink:(_)=>$({channel:X,v:I,type:"session-link",id:C(A),payload:t(_)}),close:()=>$({channel:X,v:I,type:"close",id:C(A)}),oauthStart:()=>$({channel:X,v:I,type:"oauth-start",id:C(A)}),oauthDisconnect:()=>$({channel:X,v:I,type:"oauth-disconnect",id:C(A)}),request:(_)=>(fS(_.path)?H({channel:X,v:I,type:"request",id:C(A),payload:_}):WT()).then((T)=>{if(!jS(T))throw new U("HOST_REJECTED","Host request result was empty.");return T}),serviceRequest:(_)=>(fS(_.path)?H({channel:X,v:I,type:"service-request",id:C(A),payload:_}):WT()).then((T)=>{if(!jS(T))throw new U("HOST_REJECTED","Host service request result was empty.");return T}),serviceStatus:()=>H({channel:X,v:I,type:"service-status",id:C(A)}).then((_)=>{if(!A_(_))throw new U("HOST_REJECTED","Host did not return service status.");return _}),readFile:(_)=>(e(_)?H({channel:X,v:I,type:"file-read",id:C(A),payload:{path:_}}):kS()).then((T)=>{if(!C_(T))throw new U("HOST_REJECTED","Host did not return file content.");return T}),writeFile:(_,T)=>{if(!e(_))return kS();if(T.length>zS)return Promise.reject(new U("FILE_TOO_LARGE",`Content is over ${zS} characters.`));return H({channel:X,v:I,type:"file-write",id:C(A),payload:{path:_,content:T}}).then((R)=>{if(!P_(R))throw new U("HOST_REJECTED","Host did not confirm the write.");return R})},listDir:(_)=>(e(_)?H({channel:X,v:I,type:"file-list",id:C(A),payload:{path:_}}):kS()).then((T)=>{if(!D_(T))throw new U("HOST_REJECTED","Host did not return directory entries.");return T}),stat:(_)=>(e(_)?H({channel:X,v:I,type:"file-stat",id:C(A),payload:{path:_}}):kS()).then((T)=>{if(!X_(T))throw new U("HOST_REJECTED","Host did not return file status.");return T}),generate:(_)=>{let T=_.prompt.trim(),R=_.system?.trim();if(T.length===0||T.length>KS)return Promise.reject(new U("HOST_REJECTED",`Prompt must be 1 to ${KS} characters.`));if(R!==void 0&&(R.length===0||R.length>JS))return Promise.reject(new U("HOST_REJECTED",`System prompt must be 1 to ${JS} characters.`));let M=_.maxOutputTokens===void 0?void 0:Math.min(E_,Math.max(1,Math.floor(_.maxOutputTokens)));if(M!==void 0&&!Number.isFinite(M))return Promise.reject(new U("HOST_REJECTED","maxOutputTokens must be a number."));let B={prompt:T};if(R!==void 0)B.system=R;if(M!==void 0)B.maxOutputTokens=M;return H({channel:X,v:I,type:"generate",id:C(A),payload:B},S.requestTimeoutMs??O_).then((N)=>{if(!I_(N))throw new U("HOST_REJECTED","Host did not return generated text.");return N})},onLateGenerateResult:(_)=>{a.add(_);for(let T of hS.splice(0))F([_],T);return H_(),()=>{a.delete(_)}},setBadge:(_)=>$({channel:X,v:I,type:"badge",id:C(A),payload:{count:G_(_)}}),setHeight:(_)=>$({channel:X,v:I,type:"resize",id:C(A),payload:{height:U_(_)}}),onFileOpen:(_)=>{if(XS.add(_),!mS)mS=!0,E.addEventListener("keydown",b_,!0);if(RS)_(RS);return()=>{XS.delete(_)}},onFileSnapshot:(_)=>{return OS=_,()=>{if(OS===_)OS=null}},onFileSaved:(_)=>{return IS.add(_),()=>{IS.delete(_)}},reportFileChange:(_)=>cS({...z,type:"file-change",payload:{dirty:_.dirty,edited:_.edited}}),requestFileSave:x_,reportFileUnsupported:()=>cS({...z,type:"file-unsupported"}),dispose:()=>{for(let _ of i.keys())b({...z,type:"workspace-unsubscribe",id:C(A),payload:{subscriptionId:_}});i.clear();for(let _ of n.keys())b({...z,type:"shells-unsubscribe",id:C(A),payload:{subscriptionId:_}});if(n.clear(),h=!0,TS=null,ES=null,OS=null,XS.clear(),IS.clear(),mS)E.removeEventListener("keydown",b_,!0);E.removeEventListener("message",w_),E.removeEventListener("keydown",q_,!0),E.removeEventListener("pointerover",NS),E.removeEventListener("pointermove",NS),E.removeEventListener("pointerout",y_),E.removeEventListener("focus",g_),E.removeEventListener("blur",h_);for(let _ of r.values())clearTimeout(_.timer),_.reject(new U("HOST_UNAVAILABLE","Host client was disposed."));r.clear(),D.clear(),V.clear(),J.clear(),Q.clear(),f.clear(),x.clear(),u.clear(),AS.clear(),CS.clear(),PS.clear(),DS.clear(),a.clear(),hS.length=0}}};var FT=["browser.open","browser.snapshot","browser.click","browser.type","browser.select","browser.scroll","browser.back","browser.forward","browser.inspect","browser.capture","browser.resize","browser.close"];var ZE=new Set(FT);var QT=["none","agent","user"];var KE=new Set(QT);var cT=[["--oc-bg","background"],["--oc-elevated","elevated"],["--oc-fg","foreground"],["--oc-muted","muted"],["--oc-subtle","subtle"],["--oc-border","border"],["--oc-hover","hover"],["--oc-selection","selection"],["--oc-focus","focus"],["--oc-primary","primary"],["--oc-muted-surface","mutedSurface"],["--oc-elevated-fg","elevatedForeground"],["--oc-active","active"],["--oc-selection-fg","selectionForeground"],["--oc-primary-fg","primaryForeground"],["--oc-primary-text","primaryText"],["--oc-success-text","successText"],["--oc-warning-text","warningText"],["--oc-error-text","errorText"],["--oc-info-text","infoText"],["--oc-success","success"],["--oc-warning","warning"],["--oc-error","error"],["--oc-info","info"],["--oc-font","font"],["--oc-mono","mono"],["--oc-radius","radius"],["--surface-background","background"],["--surface-elevated","elevated"],["--surface-foreground","foreground"],["--surface-muted-foreground","muted"],["--surface-subtle","subtle"],["--interactive-border","border"],["--interactive-hover","hover"],["--interactive-selection","selection"],["--interactive-focus-ring","focus"],["--primary","primary"],["--surface-muted","mutedSurface"],["--surface-elevated-foreground","elevatedForeground"],["--interactive-active","active"],["--interactive-selection-foreground","selectionForeground"],["--primary-foreground","primaryForeground"],["--primary-text","primaryText"],["--success-text","successText"],["--warning-text","warningText"],["--error-text","errorText"],["--info-text","infoText"],["--status-success","success"],["--status-warning","warning"],["--status-error","error"],["--status-info","info"],["--font-sans","font"],["--font-mono","mono"],["--radius","radius"]],vT=[["--oc-syntax-keyword","--syntax-keyword","syntaxKeyword"],["--oc-syntax-string","--syntax-string","syntaxString"],["--oc-syntax-number","--syntax-number","syntaxNumber"],["--oc-syntax-function","--syntax-function","syntaxFunction"],["--oc-syntax-type","--syntax-type","syntaxType"],["--oc-syntax-comment","--syntax-comment","syntaxComment"],["--oc-syntax-variable","--syntax-variable","syntaxVariable"],["--oc-syntax-operator","--syntax-operator","syntaxOperator"]],LT=(S,E)=>{E.style.colorScheme=S.mode;for(let[O,P]of cT)E.style.setProperty(O,S.tokens[P]);for(let[O,P,D]of vT){let V=S.tokens[D]??"";E.style.setProperty(O,V),E.style.setProperty(P,V)}E.style.setProperty("font-family",S.tokens.font),E.style.setProperty("font-size","0.875rem"),E.style.setProperty("line-height","1.45"),E.style.setProperty("color",S.tokens.foreground)},B_=(S,E)=>{if(LT(S.theme,E),E.dataset)E.dataset.ocSurface=S.surface,E.dataset.ocTheme=S.theme.mode};var uT={"surface-background":"bg","surface-elevated":"elevated","surface-elevated-foreground":"elevated-fg","surface-foreground":"fg","surface-muted-foreground":"muted","surface-muted":"muted-surface","surface-subtle":"subtle","interactive-border":"border","interactive-hover":"hover","interactive-active":"active","interactive-selection":"selection","interactive-selection-foreground":"selection-fg","interactive-focus-ring":"focus",primary:"primary","primary-foreground":"primary-fg","primary-text":"primary-text","success-text":"success-text","warning-text":"warning-text","error-text":"error-text","info-text":"info-text","status-success":"success","status-warning":"warning","status-error":"error","status-info":"info","font-sans":"font","font-mono":"mono",radius:"radius"},W=(S,E)=>`var(--${S}, var(--oc-${uT[S]}, ${E}))`,v=W("surface-background","transparent"),xS=W("surface-elevated","transparent"),SS=W("surface-elevated-foreground","inherit"),q=W("surface-foreground","inherit"),L=W("surface-muted-foreground","gray"),dT=W("surface-muted","transparent"),p=W("interactive-border","currentColor"),w=W("interactive-hover","transparent"),l=W("interactive-active","transparent"),W_=W("interactive-selection","transparent"),F_=W("interactive-selection-foreground","inherit"),c=W("primary","currentColor"),Q_=W("primary-text","inherit"),L_=W("error-text","inherit"),pT=W("font-sans","inherit"),Y_=W("font-mono","monospace"),zT=W("radius","9px"),$_=`calc(${zT} - 2px)`,YT=`calc(${zT} - 4px)`,Y=(S,E,O="transparent")=>`color-mix(in srgb, ${S} ${E}%, ${O})`,$T=`background-image: linear-gradient(${w}, ${w});`,Z_=(S,E="0.5px")=>`box-shadow: inset 0 0 0 ${E} ${S}, var(--oc-sdk-field-lift);`,z_="border-color: var(--oc-sdk-edge); box-shadow: var(--oc-sdk-raised-lift);",ZT="box-shadow: var(--oc-sdk-lit);",K_=`inset 0 0.5px 0 0 ${Y(q,8)}, 0 1px 2px 0 rgb(0 0 0 / 0.4)`,lT=`
:root {
  --oc-sdk-edge: ${Y(q,16)};
  --oc-sdk-field-bg: ${xS};
  --oc-sdk-raised-bg: ${v};
  --oc-sdk-field-lift: inset 0 1px 2px 0 rgb(0 0 0 / 0.04);
  --oc-sdk-raised-lift: 0 1px 1.5px 0 rgb(0 0 0 / 0.08);
  --oc-sdk-lit: inset 0 1px 0 0 rgb(255 255 255 / 0.2), 0 1px 1.5px 0 rgb(0 0 0 / 0.1);
  --oc-sdk-float-edge: rgb(0 0 0 / 0.14);
  --oc-sdk-float: inset 0 1px 0 0 rgb(255 255 255 / 0.7), 0 1px 2px -0.5px rgb(0 0 0 / 0.06), 0 4px 8px -2px rgb(0 0 0 / 0.08), 0 12px 20px -4px rgb(0 0 0 / 0.06);
}
:root[data-oc-theme="dark"] {
  --oc-sdk-edge: ${Y(q,14)};
  --oc-sdk-field-bg: ${Y(v,50,xS)};
  --oc-sdk-raised-bg: ${xS};
  --oc-sdk-field-lift: ${K_};
  --oc-sdk-raised-lift: ${K_};
  --oc-sdk-lit: ${K_};
  --oc-sdk-float-edge: rgb(0 0 0 / 0.55);
  --oc-sdk-float: inset 0 1px 0 0 rgb(255 255 255 / 0.04), inset 0 0 0 0.5px rgb(255 255 255 / 0.08), 0 8px 16px 0 rgb(0 0 0 / 0.25), 0 4px 8px 0 rgb(0 0 0 / 0.25);
}`,wS=(S)=>{let E=W(`status-${S}`,"currentColor");return`
.oc-sdk[data-tone="${S}"], .oc-sdk [data-tone="${S}"] { --oc-sdk-tone: ${E}; --oc-sdk-tone-text: ${W(`${S}-text`,"inherit")}; }`},oT=`
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
`,KT=`${lT}
.oc-sdk { color: ${q}; font-family: ${pT}; }
.oc-sdk :focus-visible, .oc-sdk:focus-visible { outline: none; }
.oc-sdk :where(button, a[href], [role="button"], [role="tab"], [role="option"]):focus-visible, button.oc-sdk:focus-visible { ${$T} }
.oc-sdk-mono { font-family: ${Y_}; }
.oc-sdk-muted { color: ${L}; }
${wS("success")}${wS("warning")}${wS("error")}${wS("info")}
.oc-sdk[data-tone="primary"], .oc-sdk [data-tone="primary"] { --oc-sdk-tone: ${c}; --oc-sdk-tone-text: ${Q_}; }

.oc-sdk-btn { border-radius: ${$_}; transition: background 150ms ease-out, color 150ms ease-out; }
.oc-sdk-btn[data-size="xs"] { border-radius: ${YT}; }
.oc-sdk-btn[data-variant="default"] { color: ${Q_}; background: ${Y(c,10,v)}; border-color: ${Y(c,12)}; ${ZT} }
.oc-sdk-btn[data-variant="default"]:hover { background: ${Y(c,16,v)}; }
.oc-sdk-btn[data-variant="default"]:active { background: ${Y(c,22,v)}; box-shadow: none; }
.oc-sdk-btn[data-variant="secondary"] { background: ${dT}; color: var(--oc-fg); }
.oc-sdk-btn[data-variant="secondary"]:hover { background-image: linear-gradient(${w}, ${w}); }
.oc-sdk-btn[data-variant="secondary"]:active { background-image: linear-gradient(${l}, ${l}); }
.oc-sdk-btn[data-variant="outline"] { background: var(--oc-sdk-raised-bg); color: ${SS}; ${z_} }
.oc-sdk-btn[data-variant="outline"]:hover { background-image: linear-gradient(${w}, ${w}); }
.oc-sdk-btn[data-variant="outline"]:active { background-image: linear-gradient(${l}, ${l}); box-shadow: none; }
.oc-sdk-btn[data-variant="ghost"] { background: transparent; }
.oc-sdk-btn[data-variant="ghost"]:hover { background: ${w}; }
.oc-sdk-btn[data-variant="ghost"]:active { background: ${l}; }
.oc-sdk-btn[data-variant="destructive"] { --oc-sdk-tone: ${W("status-error","red")}; color: ${L_}; background: ${Y("var(--oc-sdk-tone)",7,v)}; border-color: ${Y("var(--oc-sdk-tone)",12)}; ${ZT} }
.oc-sdk-btn[data-variant="destructive"]:hover { background: ${Y("var(--oc-sdk-tone)",9,v)}; }
.oc-sdk-btn[data-variant="destructive"]:active { background: ${Y("var(--oc-sdk-tone)",11,v)}; box-shadow: none; }

.oc-sdk-field-note { color: ${L}; }
.oc-sdk-field[data-invalid="true"] .oc-sdk-field-note { color: ${L_}; }
.oc-sdk-input { border-radius: ${$_}; background: var(--oc-sdk-field-bg); color: ${SS}; ${Z_("var(--oc-sdk-edge)")} transition: background 150ms ease-out; }
.oc-sdk-input::placeholder { color: ${L}; }
.oc-sdk-input:hover:not(:focus) { background-image: linear-gradient(${w}, ${w}); }
.oc-sdk-input:focus, .oc-sdk-input:focus-visible { ${Z_(Y(q,26),"1px")} }
.oc-sdk-field[data-invalid="true"] .oc-sdk-input, .oc-sdk-field[data-invalid="true"] .oc-sdk-input:focus { ${Z_(W("status-error","red"),"1px")} }
.oc-sdk-input[data-mono="true"] { font-family: ${Y_}; }

.oc-sdk-search-icon { color: ${L}; }
.oc-sdk-search[data-active="true"] .oc-sdk-search-icon { color: ${c}; }
.oc-sdk-search-clear { border-radius: ${YT}; color: ${L}; }
.oc-sdk-search-clear:hover { background: ${w}; color: ${q}; }

.oc-sdk-trigger { border-radius: ${$_}; background: var(--oc-sdk-raised-bg); color: ${SS}; ${z_} transition: background 150ms ease-out; }
.oc-sdk-trigger:hover { background-image: linear-gradient(${w}, ${w}); }
.oc-sdk-trigger[aria-expanded="true"] { background-image: linear-gradient(${l}, ${l}); }
.oc-sdk-trigger-value[data-empty="true"] { color: ${L}; }
.oc-sdk-trigger-chevron { color: ${L}; }
/* The app's floating level: the glass edge (a hairline ring and a lit top line, dark outside and light inside in dark themes) over soft shadows. The outer ring is the border, over the page like the app's. */
.oc-sdk-popup { --surface-foreground: ${SS}; border-color: var(--oc-sdk-float-edge); border-radius: 12px; background: ${xS}; background-clip: padding-box; color: ${SS}; box-shadow: var(--oc-sdk-float); }
.oc-sdk-option { border-radius: 8px; }
.oc-sdk-option[data-active="true"] { background: ${w}; }
/* A selected option shows a check mark in the text colour, like the app's own pickers. Options without the mark come
   from bundles built before it existed and keep the selection fill as their only sign of the choice. */
.oc-sdk-option[aria-selected="true"]:not([data-mark]) { background: ${W_}; color: ${F_}; }
.oc-sdk-option-check { color: ${q}; }
.oc-sdk-option[data-destructive="true"] { color: ${L_}; }
.oc-sdk-option[data-destructive="true"][data-active="true"] { background: ${Y(W("status-error","red"),10)}; }
.oc-sdk-option-hint { color: ${L}; }
.oc-sdk-popup-empty { color: ${L}; }

/* Checked stays neutral: the mark carries the state, and the primary colour stays with primary actions. */
.oc-sdk-check-box { border-color: ${p}; border-radius: 4px; color: ${q}; transition: border-color 150ms ease-out; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-box { border-color: ${Y(q,60,p)}; }
.oc-sdk-check-thumb { border-radius: 9999px; background: ${p}; transition: background 150ms ease-out; }
.oc-sdk-check-thumb::after { border-radius: 9999px; background: ${v}; transition: transform 150ms ease-out; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-thumb { background: ${c}; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-thumb::after { transform: translateX(16px); }
.oc-sdk-check:focus-visible { box-shadow: none; }
.oc-sdk-check:focus-visible .oc-sdk-check-box, .oc-sdk-check:focus-visible .oc-sdk-check-thumb { ${$T} }
.oc-sdk-check-desc { color: ${L}; }

.oc-sdk-tabs { border-radius: 10px; }
.oc-sdk-tabs[data-track="true"] { background: ${Y(q,4)}; box-shadow: inset 0 1px 2px 0 rgb(0 0 0 / 0.16); }
.oc-sdk-tab { border-radius: 8px; color: ${L}; transition: color 150ms ease-out, background 150ms ease-out; }
.oc-sdk-tab:hover { color: ${q}; }
.oc-sdk-tab[aria-selected="true"] { color: ${F_}; background: ${W_}; border-color: ${p}; }
.oc-sdk-tabs[data-track="true"] .oc-sdk-tab[aria-selected="true"] { color: ${SS}; background: var(--oc-sdk-raised-bg); ${z_} }
.oc-sdk-tab-count { color: ${L}; }

/* The app's neutral badge: a step of the text colour, the same in every theme. */
.oc-sdk-badge { border-radius: 9999px; background: ${Y(q,6)}; color: ${L}; }
.oc-sdk-badge[data-tone] { color: var(--oc-sdk-tone-text, var(--oc-sdk-tone)); background: ${Y("var(--oc-sdk-tone)",15)}; }

.oc-sdk-row { border-radius: 6px; transition: background 120ms ease-out; }
.oc-sdk-row:hover, .oc-sdk-row[data-active="true"] { background: ${w}; }
.oc-sdk-row[aria-selected="true"] { background: ${W_}; color: ${F_}; }
.oc-sdk-row-lead { font-family: ${Y_}; color: ${L}; }
.oc-sdk-row-sub { color: ${L}; }
.oc-sdk-row-meta { color: ${L}; }
.oc-sdk-row[aria-selected="true"] .oc-sdk-row-lead, .oc-sdk-row[aria-selected="true"] .oc-sdk-row-sub, .oc-sdk-row[aria-selected="true"] .oc-sdk-row-meta { color: inherit; opacity: .75; }
.oc-sdk-list-empty { color: ${L}; }

.oc-sdk-empty-body { color: ${L}; }

.oc-sdk-spinner { color: ${L}; }
.oc-sdk-spinner-ring { border-color: ${p}; border-top-color: ${c}; border-radius: 9999px; }

/* Set apart by its tint alone, like the app's banners. */
.oc-sdk-banner { border-color: transparent; border-radius: 8px; background: ${Y("var(--oc-sdk-tone)",10)}; }
.oc-sdk-banner-title { color: var(--oc-sdk-tone-text, var(--oc-sdk-tone)); }
.oc-sdk-banner-body { color: ${L}; }

.oc-sdk-separator { color: ${L}; }
.oc-sdk-separator::before, .oc-sdk-separator::after { background: ${Y(p,40)}; }

.oc-sdk-progress-label { color: ${L}; }
/* The app's progress: a groove a step of the text colour, green once done. Older bundles mark done only through aria-valuenow. */
.oc-sdk-progress-track { border-radius: 9999px; background: ${Y(q,6)}; }
.oc-sdk-progress-fill { border-radius: 9999px; background: var(--oc-sdk-tone, ${c}); }
.oc-sdk-progress-track[aria-valuenow="100"] > .oc-sdk-progress-fill:not([data-tone]) { background: ${W("status-success","currentColor")}; }
.oc-sdk-progress[data-done="true"] .oc-sdk-progress-value { color: ${W("success-text","inherit")}; }

.oc-sdk-text a { color: ${Q_}; text-decoration: underline; text-underline-offset: 2px; }
.oc-sdk-text img { border-radius: 8px; border: 1px solid ${Y(p,60)}; }
`,j=`
${dS}
${oT}
${KT}`;var JT="oc-sdk-ui-style";var k=(S)=>{let E=document.getElementById(JT);if(E instanceof HTMLStyleElement){if(E.textContent!==S)E.textContent=S;return}pS(document);let O=document.createElement("style");O.id=JT,O.textContent=S,document.head.appendChild(O)},Z=(S,E)=>{let O=document.createElement(S);if(E)O.className=E;return O},d=(S)=>{let E=Z("button",S);return E.type="button",E},y=(S,E)=>{let O=E??"";if(S.textContent!==O)S.textContent=O},o=(S,E,O)=>{if(O===void 0||O===null||O==="")S.removeAttribute(E);else if(S.getAttribute(E)!==O)S.setAttribute(E,O)};var aT=()=>{let S=document.createElement("span");return S.className="oc-sdk-spinner-ring",S.setAttribute("aria-hidden","true"),S},_S=(S,E)=>{k(j);let O=E,P=d("oc-sdk oc-sdk-btn"),D=aT(),V=document.createElement("span");P.append(V),S.append(P);let J=()=>{if(P.dataset.variant=O.variant??"default",P.dataset.size=O.size??"default",P.disabled=Boolean(O.disabled)||Boolean(O.loading),P.dataset.loading=O.loading?"true":"false",P.setAttribute("aria-busy",O.loading?"true":"false"),O.loading&&D.parentNode!==P)P.prepend(D);else if(!O.loading&&D.parentNode===P)D.remove();y(V,O.label)},Q=()=>{if(O.disabled||O.loading)return;O.onClick()};return P.addEventListener("click",Q),J(),{update:(f)=>{O={...O,...f},J()},dispose:()=>{P.removeEventListener("click",Q),P.remove()}}};var J_=(S,E)=>{k(j);let O=E,P=Z("label","oc-sdk oc-sdk-field"),D=Z("span","oc-sdk-field-label"),V=O.multiline?Z("textarea","oc-sdk-input"):Z("input","oc-sdk-input"),J=Z("span","oc-sdk-field-note");P.append(D,V,J),S.append(P);let Q=()=>{if(y(D,O.label),D.hidden=!O.label,V instanceof HTMLInputElement)V.type=O.password?"password":"text";else V.rows=O.rows??3;if(V.value!==O.value)V.value=O.value;V.disabled=Boolean(O.disabled),o(V,"placeholder",O.placeholder),V.dataset.mono=O.mono?"true":"false";let x=Boolean(O.error);P.dataset.invalid=x?"true":"false",V.setAttribute("aria-invalid",x?"true":"false");let u=O.error??O.helper??"";y(J,u),J.hidden=u===""},f=()=>{O.onChange(V.value)};return V.addEventListener("input",f),Q(),{update:(x)=>{O={...O,...x},Q()},dispose:()=>{V.removeEventListener("input",f),P.remove()}}};var f_=N_(),jT=document.querySelector("#root");if(!jT)throw Error("Missing root");var fT=!1;f_.onReady((S)=>{if(B_(S,document.documentElement),fT)return;fT=!0;let E=document.createElement("div");E.style.cssText="display:flex;align-items:center;gap:8px;height:100%;padding:0 8px;box-sizing:border-box;",jT.append(E);let O="",P=document.createElement("div");P.style.flex="1",E.append(P);let D=J_(P,{value:O,placeholder:"https://example.com",mono:!0,onChange:(Q)=>{O=Q,D.update({value:Q})}}),V=_S(E,{label:"Go",size:"sm",onClick:()=>{if(!O.trim())return;V.update({loading:!0}),f_.serviceRequest({method:"POST",path:"/navigate",body:JSON.stringify({url:O.trim()})}).then(()=>J()).finally(()=>V.update({loading:!1}))}}),J=async()=>{try{let Q=await f_.serviceRequest({method:"GET",path:"/state"}),f=JSON.parse(Q.body);if(String(f.url)===f.url&&f.url!==O)O=f.url==="about:blank"?"":f.url,D.update({value:O})}catch{}};J(),setInterval(()=>{J()},2000)});})();
