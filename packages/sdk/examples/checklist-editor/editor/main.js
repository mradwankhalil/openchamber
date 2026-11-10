(()=>{var X="openchamber.sdk",I=1;var nS=`
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
`;function sS(S){let E=S.documentElement;if(E.hasAttribute("data-oc-scrollbar-activity"))return;E.setAttribute("data-oc-scrollbar-activity","");let O=new WeakMap;S.addEventListener("scroll",(G)=>{let C=G.target===S?E:G.target;if(!(C instanceof Element))return;if(!C.hasAttribute("data-oc-scrolling"))C.setAttribute("data-oc-scrolling","");let V=O.get(C);if(V!==void 0)clearTimeout(V);O.set(C,setTimeout(()=>{O.delete(C),C.removeAttribute("data-oc-scrolling")},1000))},{capture:!0,passive:!0})}var uT=`(${sS.toString()})(document);`;var tS=128,eS=65536;var YS=128;var $S=65536;var e_=/^[a-z][a-z0-9-]{0,39}$/;var n_=(S)=>Object(S)===S&&!Array.isArray(S),S_=(S,E)=>Object.keys(S).every((O)=>E.includes(O)),s_=(S)=>String(S)===S&&S.length>=1&&S.length<=60,t_=(S)=>String(S)===S&&S.length>=1&&S.length<=80,ST=(S)=>{if(!Array.isArray(S)||S.length>4)return!1;let E=new Set;for(let O of S){if(!n_(O)||!e_.test(O.id)||!s_(O.label))return!1;if(O.disabled!==void 0&&O.disabled!==!0&&O.disabled!==!1)return!1;if(E.has(O.id))return!1;if(E.add(O.id),O.kind==="button"){if(!S_(O,["kind","id","label","disabled"]))return!1;continue}if(O.kind!=="select"||!S_(O,["kind","id","label","value","options","disabled"]))return!1;if(!t_(O.value)||!Array.isArray(O.options)||O.options.length<1||O.options.length>16)return!1;let G=new Set;for(let C of O.options){if(!n_(C)||!S_(C,["value","label"])||!t_(C.value)||!s_(C.label)||G.has(C.value))return!1;G.add(C.value)}if(!G.has(O.value))return!1}return!0};var _T=["{id}","{segment}","{segments+}"];var FE=new Set(_T);var TT=["turn-finished","turn-failed","permission-asked","question-asked","turn-started","session-created","session-archived","session-deleted"];var LE=new Set(TT);var ZS=20000000,zS=256;var __=(S)=>("bytes"in S)?S.bytes.byteLength:S.content.length,ET=(S,E)=>{if(S.path!==E.path||S.readOnly!==E.readOnly)return!1;if(S.encoding==="text"||E.encoding==="text")return S.encoding==="text"&&E.encoding==="text"&&S.content===E.content;if(S.bytes.byteLength!==E.bytes.byteLength)return!1;for(let O=0;O<S.bytes.byteLength;O+=1)if(S.bytes[O]!==E.bytes[O])return!1;return!0},KS=(S)=>{let E=S,O=S;return{observe:(G)=>{let C=G!==O;return O=G,{edited:C,dirty:G!==E}},markSaved:(G)=>{return E=G,O!==G}}};var OT=/^[A-Za-z0-9_-]{1,80}$/;var RT=["left","right","top","bottom"];var MT=(S,E=0,O={remaining:16000})=>{if(--O.remaining<0||E>=32)return!1;if(S===null)return!0;let G=Array.isArray(S)?S:Object(S)===S?Object.values(S):[];for(let C of G)if(!MT(C,E+1,O))return!1;return!0},T_=(S)=>{if(S===null||S===!0||S===!1)return!0;if(Array.isArray(S))return Object.keys(S).every((E)=>/^(0|[1-9]\d*)$/.test(E)&&Number(E)<S.length)&&S.every(T_);if(Object(S)===S){let E=Object.getPrototypeOf(S);return(E===null||E===Object.prototype)&&Object.values(S).every(T_)}return String(S)===S||Number.isFinite(S)},E_=(S)=>{try{if(String(S.id)!==S.id||!OT.test(S.id)||!Number.isFinite(S.anchor.x)||Math.abs(S.anchor.x)>1e5||!Number.isFinite(S.anchor.y)||Math.abs(S.anchor.y)>1e5||!Number.isFinite(S.anchor.width)||!Number.isFinite(S.anchor.height)||S.anchor.width<=0||S.anchor.height<=0||S.anchor.width>1e5||S.anchor.height>1e5||!Number.isInteger(S.width)||S.width<160||S.width>640||!Number.isInteger(S.height)||S.height<48||S.height>480||S.side!==void 0&&!RT.includes(S.side)||S.focus!==void 0&&S.focus!==!0&&S.focus!==!1||!MT(S.data)||!T_(S.data))return!1;return JSON.stringify(S.data).length<=16000}catch{return!1}};var R_=2000;var UT=["file","directory","other","missing"],M_=(S)=>Boolean(S&&"sessionId"in S),G_=(S)=>Boolean(S&&"sent"in S&&!("sessionId"in S));var AT=/^[0-9a-f]{7,64}$/i,U_=(S)=>AT.test(S),JS=500,jS=32000,CT=16000,PT=128,DT=200,XT=2000,IT=16000,VT=80,NT=200,BT=16000;var WT=2000;var A_=20000,fS=1024,HS=2000000;var kS=64000,wS=8000,C_=4000;var P_=960000;var FT=999,QT=1e4,PS=500,LT=["HOST_UNAVAILABLE","HOST_TIMEOUT","HOST_REJECTED","DISCONNECTED","DISABLED","BAD_PATH","NO_INTEGRATION","NO_SERVICE","SERVICE_FAILED","REQUEST_FAILED","RESPONSE_TOO_LARGE","NO_SESSION","SESSION_BUSY","NOT_GRANTED","NO_DIRECTORY","NOT_FOUND","FILE_TOO_LARGE","DENIED","NO_MODEL","MODEL_FAILED","UNSUPPORTED"],YT=["stopped","starting","ready","failed"],pT=new Set(LT),$T=(S)=>pT.has(S),ZT=(S)=>S&&$T(S)?S:"HOST_REJECTED",e=(S)=>{if(S===void 0)return!1;if(S===null||S===!0||S===!1)return!0;if(String(S)===S)return!0;if(Number(S)===S)return Number.isFinite(S);if(Array.isArray(S))return S.every(e);if(Object(S)===S)return Object.values(S).every(e);return!1},zT=(S)=>e(S)&&JSON.stringify(S).length<=BT,GT=(S)=>S?.trim().slice(0,NT)??"",SS=(S)=>{let E=S.id.trim().slice(0,PT),O=S.title.trim().slice(0,DT),G=S.url.trim().slice(0,XT),C=S.text?.trim().slice(0,IT),V=S.author?.trim().slice(0,VT),W=S.kind==="pull"?"pull":"issue",N={providerId:S.providerId.trim(),id:E,title:O||E,url:G,kind:W};if(C)N.text=C;if(V)N.author=V;if(W==="pull"){let j=GT(S.branches?.head),x=GT(S.branches?.base);if(j&&x)N.branches={head:j,base:x}}if(zT(S.data))N.data=S.data;return N},D_=(S)=>{let E=SS(S);if(S.projectId)E.projectId=S.projectId;if(S.navigation)E.navigation=S.navigation;if(S.worktree)E.worktree=S.worktree;return E},X_=(S)=>{let E={text:S.text.trim().slice(0,CT)};if(S.send)E.send=!0;return E},I_=(S)=>{if(S===null||!Number.isFinite(S))return null;return Math.min(FT,Math.max(0,Math.round(S)))},V_=(S)=>{if(!Number.isFinite(S))return 0;return Math.min(QT,Math.max(0,Math.ceil(S)))};var _S=(S)=>S.length>0&&S.length<=fS&&!S.includes("\x00")&&!S.includes("\\");var xS=(S)=>{if(!S.startsWith("/")||S.includes("\x00")||S.includes("\\")||S.includes("://"))return!1;if(S.length>WT)return!1;return!S.split("/").some((O)=>O==="."||O==="..")},lT=new Set(YT),N_=(S)=>Boolean(S&&"status"in S&&lT.has(String(S.status))&&!("body"in S)),bS=(S)=>Boolean(S&&"status"in S&&"body"in S&&Number.isInteger(S.status)),B_=(S)=>Boolean(S&&"content"in S&&String(S.content)===S.content),W_=(S)=>Boolean(S&&"written"in S&&S.written===!0),F_=(S)=>Boolean(S&&"entries"in S&&Array.isArray(S.entries)),oT=new Set(UT),Q_=(S)=>Boolean(S&&"kind"in S&&"size"in S&&oT.has(String(S.kind))&&Number.isFinite(S.size)),L_=(S)=>Boolean(S&&"text"in S&&String(S.text)===S.text&&!("status"in S)),aT=new Set(["workspace","shells","ready","directory","session","connection","settings","session-lifecycle","item","resolve","action","service-event","status-control-event","popover-closed","file-open","file-snapshot","file-saved","generate-late"]),rT=(S)=>Object(S)===S?S:null,O_=(S)=>String(S)===S&&S.length>0,iT=(S)=>{if(!O_(S.id))return null;if(S.ok===!0){let E={channel:X,v:I,type:"result",id:S.id,ok:!0};if(Object(S.payload)===S.payload)E.payload=S.payload;return E}if(S.ok===!1&&O_(S.error))return{channel:X,v:I,type:"result",id:S.id,ok:!1,error:S.error,code:ZT(O_(S.code)?S.code:void 0)};return null},Y_=(S)=>{let E=rT(S);if(!E||E.channel!==X||E.v!==I)return null;if(E.type==="result")return iT(E);if(!aT.has(String(E.type))||Object(E.payload)!==E.payload)return null;return E};var KT=(S)=>("key"in S)&&("metaKey"in S)&&("ctrlKey"in S),nT=(S)=>(S.metaKey||S.ctrlKey)&&!S.altKey&&!S.shiftKey&&S.key.toLowerCase()==="s";class A extends Error{code;constructor(S,E){super(E);this.name="HostRequestError",this.code=S}}var JT=()=>Promise.reject(new A("BAD_PATH",'Request path must start with "/" and stay on the declared origin.')),qS=()=>Promise.reject(new A("BAD_PATH",`File path must be 1 to ${fS} characters without NUL or backslash.`)),yS=(S)=>{if(S===void 0)return;if(Object(S)!==S||Array.isArray(S)||S.scope!==void 0&&S.scope!=="instance"&&S.scope!=="device")throw new A("HOST_REJECTED",'Storage scope must be "instance" or "device".');return S.scope==="device"?"device":void 0},D=(S)=>{return S.value+=1,`oc-${S.value}`},$_=(S={})=>{let E=S.target??("window"in globalThis?window:null);if(!E)throw new A("HOST_UNAVAILABLE","No window. connectHost runs in a browser frame.");let O=S.acceptSource??((_)=>_===E.parent),G=S.requestTimeoutMs??A_,C=new Set,V=new Set,W=new Set,N=new Set,j=new Set,x=new Set,OS=new Set,XS=new Set,IS=new Set,VS=new Set,NS=new Set,i=new Set,lS=[],RS=null,MS=null,BS=new Set,WS=new Set,GS=null,US=null,oS=!1,n=new Map,s=new Map,t=new Map,h=!1,P={value:0},U=null,m=null,AS=!1,CS=!1,h_=null,m_=(_)=>{if(!_)return null;return{sessionId:_.id,phase:_.busy?"started":"completed"}},b=(_)=>{E.parent.postMessage(_,"*")},c_=()=>{if(h||E.parent===E||i.size===0||U?.features?.lateGenerateResults!==!0)return;b({channel:X,v:I,type:"generate-late-listen"})},L=(_,T)=>{for(let R of _)try{R(T)}catch(M){console.error(M)}},v_=(_)=>{if(!(_ instanceof MessageEvent))return;if(!O(_.source))return;let T=Y_(_.data);if(!T)return;if(T.type==="workspace"){let M=s.get(T.payload.subscriptionId);if(M)L([M],T.payload.snapshot);return}if(T.type==="shells"){let M=t.get(T.payload.subscriptionId);if(M)L([M],T.payload.snapshot);return}if(T.type==="ready"){if(U=T.payload,m=m_(T.payload.session),L(C,T.payload),L(V,T.payload.directory),L(W,T.payload.session),m)L(N,m);if(L(j,T.payload.connection),L(x,T.payload.settings),L(OS,T.payload.item),T.payload.block)L(XS,T.payload.block);c_();return}if(T.type==="service-event"){L(IS,T.payload);return}if(T.type==="generate-late"){if(i.size===0)lS.push(T.payload);else L(i,T.payload);return}if(T.type==="directory"){if(U)U={...U,directory:T.payload.directory};L(V,T.payload.directory);return}if(T.type==="session"){if(U)U={...U,session:T.payload.session};if(!T.payload.session)m=null;else if(m?.sessionId!==T.payload.session.id)m=m_(T.payload.session);L(W,T.payload.session);return}if(T.type==="session-lifecycle"){m=T.payload,L(N,T.payload);return}if(T.type==="connection"){if(U)U={...U,connection:T.payload.connection};L(j,T.payload.connection);return}if(T.type==="settings"){if(U)U={...U,settings:T.payload.settings};L(x,T.payload.settings);return}if(T.type==="item"){if(U)U={...U,item:T.payload.item};L(OS,T.payload.item);return}if(T.type==="status-control-event"){L(VS,T.payload);return}if(T.type==="popover-closed"){L(NS,T.payload);return}if(T.type==="action"){let M=(B)=>{if(!h)b({channel:X,v:I,type:"action-result",id:T.id,payload:B})},F=MS;if(!F){M({ok:!1,error:"This extension does not handle background actions."});return}Promise.resolve().then(()=>F(T.payload)).then(()=>M({ok:!0}),(B)=>{let K=(B instanceof Error?B.message:String(B)).trim();M({ok:!1,error:(K||"Action failed.").slice(0,PS)})});return}if(T.type==="file-open"){let M=T.payload;if(US&&ET(US,M))return;US=M,L(BS,T.payload);return}if(T.type==="file-saved"){L(WS,T.payload.version);return}if(T.type==="file-snapshot"){let M=(K)=>{if(!h)b({channel:X,v:I,type:"file-snapshot-result",id:T.id,payload:K})},F=(K)=>M({error:(K.trim()||"Could not read the edited file.").slice(0,PS)}),B=GS;if(!B){F("This extension does not edit files.");return}Promise.resolve().then(()=>B(T.payload.purpose)).then((K)=>{if(__(K)>ZS){F(`The file is over ${ZS} ${"bytes"in K?"bytes":"characters"}.`);return}if(K.version.length>zS){F(`The snapshot version is over ${zS} characters.`);return}M({snapshot:"bytes"in K?{bytes:K.bytes,version:K.version}:{content:K.content,version:K.version}})},(K)=>F(K instanceof Error?K.message:String(K)));return}if(T.type==="resolve"){let M=(B)=>{b({channel:X,v:I,type:"resolve-result",id:T.id,payload:B})},F=RS;if(!F){M({error:"This extension does not resolve commands."});return}Promise.resolve().then(()=>F(T.payload)).then((B)=>M({item:B?SS(B):null}),(B)=>{let K=(B instanceof Error?B.message:String(B)).trim();M({error:(K||"Command failed.").slice(0,PS)})});return}let R=n.get(T.id);if(!R)return;if(clearTimeout(R.timer),n.delete(T.id),T.ok){R.resolve(T.payload);return}R.reject(new A(T.code,T.error))};E.addEventListener("message",v_),b({channel:X,v:I,type:"hello"});let k=(_,T=G)=>{if(h||E.parent===E)return Promise.reject(new A("HOST_UNAVAILABLE","No host frame. This page is not in an iframe."));return new Promise((R,M)=>{let F=setTimeout(()=>{n.delete(_.id),M(new A("HOST_TIMEOUT","Host did not answer in time."))},T);n.set(_.id,{resolve:R,reject:M,timer:F}),b(_)})},Z=(_)=>k(_).then(()=>{return}),z={channel:X,v:I},aS=(_)=>{if(!h&&E.parent!==E)b(_)},u_=()=>aS({...z,type:"file-save"}),d_=(_)=>{if(!KT(_)||!nT(_))return;_.preventDefault(),u_()},p_=(_)=>{if(!KT(_)||_.key!=="Escape"||U?.surface!=="popover"||!U.popover)return;_.preventDefault(),r_(U.popover.id,"escape").catch(()=>{return})},FS=()=>{let _=U?.surface==="popover"?U.popover:void 0;if(!_)return;let T=AS||CS;if(h_===T)return;h_=T,i_(_.id,T).catch(()=>{return})},QS=()=>{if(U?.surface!=="popover"||AS)return;AS=!0,FS()},l_=(_)=>{if(U?.surface!=="popover"||_.relatedTarget!==null||!AS)return;AS=!1,FS()},o_=()=>{if(U?.surface!=="popover"||CS)return;CS=!0,FS()},a_=()=>{if(U?.surface!=="popover"||!CS)return;CS=!1,FS()},g=(_,T=1024)=>{if(!_.trim()||_.length>T)throw new A("HOST_REJECTED",`Identity must contain 1 to ${T} characters.`)},rS=async(_)=>{if(_.kind!=="projects")g(_.projectId);let T=await k({...z,type:"workspace-read",id:D(P),payload:_});if(!T||!("kind"in T)||!("state"in T)||T.kind!==_.kind)throw new A("HOST_REJECTED","Host did not return workspace data.");return T},iS=async(_,T)=>{if(_.kind!=="projects")g(_.projectId);let R=D(P);s.set(R,T);try{await Z({...z,type:"workspace-subscribe",id:D(P),payload:{subscriptionId:R,query:_}})}catch(M){if(s.delete(R),!h)b({...z,type:"workspace-unsubscribe",id:D(P),payload:{subscriptionId:R}});throw M}return()=>{if(!s.delete(R)||h)return;b({...z,type:"workspace-unsubscribe",id:D(P),payload:{subscriptionId:R}})}},vT=async(_,T)=>{if(_.kind==="session")g(_.sessionId);if(_.kind==="project")g(_.projectId);let R=D(P);t.set(R,T);try{await Z({...z,type:"shells-subscribe",id:D(P),payload:{subscriptionId:R,scope:_}})}catch(M){if(t.delete(R),!h)b({...z,type:"shells-unsubscribe",id:D(P),payload:{subscriptionId:R}});throw M}return()=>{if(!t.delete(R)||h)return;b({...z,type:"shells-unsubscribe",id:D(P),payload:{subscriptionId:R}})}},LS=async(_)=>{if("key"in _&&(_.key.length===0||_.key.length>tS))throw new A("HOST_REJECTED","Storage key must contain 1 to 128 characters.");if(_.op==="set"&&!e(_.value))throw new A("HOST_REJECTED","Storage values must be JSON.");if(_.op==="set"&&new TextEncoder().encode(JSON.stringify(_.value)).length>eS)throw new A("HOST_REJECTED","Storage value exceeds 64 KiB.");if(_.scope==="device"&&U?.features?.deviceStorage!==!0)throw new A("UNSUPPORTED","This host does not support device storage.");let T=await k({...z,type:"storage",id:D(P),payload:_});if(!T||!("storage"in T)||T.op!==_.op)throw new A("HOST_REJECTED","Host did not return storage data.");return T},r_=(_,T)=>U?.features?.popovers!==!0&&!(U?.surface==="popover"&&U.popover?.id===_)?Promise.reject(new A("UNSUPPORTED","This host does not support popovers.")):Z({...z,type:"popover-close",id:D(P),payload:T?{id:_,reason:T}:{id:_}}),i_=(_,T)=>U?.features?.popovers!==!0&&!(U?.surface==="popover"&&U.popover?.id===_)?Promise.reject(new A("UNSUPPORTED","This host does not support popovers.")):Z({...z,type:"popover-anchor",id:D(P),payload:{id:_,active:T}});return E.addEventListener("keydown",p_,!0),E.addEventListener("pointerover",QS),E.addEventListener("pointermove",QS),E.addEventListener("pointerout",l_),E.addEventListener("focus",o_),E.addEventListener("blur",a_),{onAction:(_)=>{return MS=_,()=>{if(MS===_)MS=null}},listProjects:async()=>{let _=await rS({kind:"projects"});if(_.kind!=="projects")throw new A("HOST_REJECTED","Expected projects.");return _},listWorktrees:async(_)=>{let T=await rS({kind:"worktrees",projectId:_});if(T.kind!=="worktrees")throw new A("HOST_REJECTED","Expected worktrees.");return T},listSessions:async(_)=>{let T=await rS({kind:"sessions",projectId:_});if(T.kind!=="sessions")throw new A("HOST_REJECTED","Expected sessions.");return T},onProjects:(_)=>iS({kind:"projects"},(T)=>{if(T.kind==="projects")_(T)}),onWorktrees:(_,T)=>iS({kind:"worktrees",projectId:_},(R)=>{if(R.kind==="worktrees")T(R)}),onSessions:(_,T)=>iS({kind:"sessions",projectId:_},(R)=>{if(R.kind==="sessions")T(R)}),onRunningShells:(_,T)=>vT(_,T),readShellOutput:async(_,T)=>{g(_,YS);let R=T?.cursor;if(R!==void 0&&(!Number.isInteger(R)||R<0))throw new A("HOST_REJECTED","Shell output cursor must be a non-negative integer.");let M=T?.tailBytes;if(M!==void 0&&(!Number.isInteger(M)||M<1||M>$S))throw new A("HOST_REJECTED",`Shell output tailBytes must be an integer between 1 and ${$S}.`);let B=await k({...z,type:"shell-output",id:D(P),payload:{shellId:_,cursor:R,tailBytes:M}});if(!B||typeof B.output!=="string"||!Number.isFinite(B.cursor))throw new A("HOST_REJECTED","Host did not return shell output.");return B},stopShell:async(_)=>{if(g(_,YS),(await k({...z,type:"shell-stop",id:D(P),payload:{shellId:_}}))?.stopped!==!0)throw new A("HOST_REJECTED","Host did not stop the shell.");return{stopped:!0}},openSession:async(_)=>{g(_),await Z({...z,type:"open-session",id:D(P),payload:{sessionId:_}})},storage:{get:async(_,T)=>{let R=yS(T),M={op:"get",key:_};if(R)M.scope=R;let F=await LS(M);return F.op==="get"&&F.found?F.value:void 0},set:async(_,T,R)=>{let M=yS(R),F={op:"set",key:_,value:T};if(M)F.scope=M;await LS(F)},delete:async(_,T)=>{let R=yS(T),M={op:"delete",key:_};if(R)M.scope=R;await LS(M)},keys:async(_)=>{let T=yS(_),R={op:"keys"};if(T)R.scope=T;let M=await LS(R);if(M.op!=="keys")throw new A("HOST_REJECTED","Expected storage keys.");return M.keys}},onReady:(_)=>{if(C.add(_),U)_(U);return()=>{C.delete(_)}},onDirectory:(_)=>{if(V.add(_),U)_(U.directory);return()=>{V.delete(_)}},onSession:(_)=>{if(W.add(_),U)_(U.session);return()=>{W.delete(_)}},onSessionLifecycle:(_)=>{if(N.add(_),m)_(m);return()=>{N.delete(_)}},onConnection:(_)=>{if(j.add(_),U)_(U.connection);return()=>{j.delete(_)}},onSettings:(_)=>{if(x.add(_),U)_(U.settings);return()=>{x.delete(_)}},onItem:(_)=>{if(OS.add(_),U)_(U.item);return()=>{OS.delete(_)}},onBlock:(_)=>{if(XS.add(_),U?.block)_(U.block);return()=>{XS.delete(_)}},onServiceEvent:(_)=>{return IS.add(_),()=>{IS.delete(_)}},onStatusControl:(_)=>{return VS.add(_),()=>{VS.delete(_)}},onPopoverClosed:(_)=>{return NS.add(_),()=>{NS.delete(_)}},setStatusControls:(_)=>{if(U?.features?.statusControls!==!0)return Promise.reject(new A("UNSUPPORTED","This host does not support status controls."));if(!ST(_))return Promise.reject(new A("HOST_REJECTED","Status controls must have unique bounded ids and valid selected options."));return Z({...z,type:"status-controls",id:D(P),payload:{controls:_}})},openPopover:(_)=>{if(U?.features?.popovers!==!0)return Promise.reject(new A("UNSUPPORTED","This host does not support popovers."));if(!E_(_))return Promise.reject(new A("HOST_REJECTED","Popover requests need bounded geometry and JSON data."));return Z({...z,type:"popover-open",id:D(P),payload:_})},closePopover:r_,setPopoverAnchorActive:i_,onResolve:(_)=>{return RS=_,()=>{if(RS===_)RS=null}},toast:(_)=>{let T=_.message.trim();if(!T||T.length>JS)return Promise.reject(new A("HOST_REJECTED",`Toast message must contain 1 to ${JS} characters.`));if(_.copy&&_.copy!==!0&&(!_.copy.text.length||_.copy.text.length>jS))return Promise.reject(new A("HOST_REJECTED",`Toast copy text must contain 1 to ${jS} characters.`));return Z({channel:X,v:I,type:"toast",id:D(P),payload:{..._,message:T}})},openUrl:(_)=>Z({channel:X,v:I,type:"open-url",id:D(P),payload:{url:_}}),openCommit:(_)=>U_(_)?Z({channel:X,v:I,type:"open-commit",id:D(P),payload:{sha:_}}):Promise.reject(new A("HOST_REJECTED","Commit id must be 7 to 64 hex characters.")),answerBlock:(_)=>Z({channel:X,v:I,type:"block-answer",id:D(P),payload:{text:_.trim().slice(0,R_)}}),openSurface:(_,T)=>Z({channel:X,v:I,type:"open-surface",id:D(P),payload:T?.tab===void 0?{surfaceId:_}:{surfaceId:_,tab:T.tab}}),writeClipboard:(_)=>Z({channel:X,v:I,type:"clipboard-write",id:D(P),payload:{text:_}}),compose:(_)=>Z({channel:X,v:I,type:"compose",id:D(P),payload:_}),attach:(_)=>Z({channel:X,v:I,type:"attach",id:D(P),payload:SS(_)}),startSession:async(_)=>{if(_.projectId!==void 0)g(_.projectId);let T=_.worktree;if(T&&T!==!0)if(T.kind==="existing")g(T.directory);else{if(T.name!==void 0)g(T.name,200);if(T.baseBranch!==void 0)g(T.baseBranch,200)}let R=await k({channel:X,v:I,type:"start-session",id:D(P),payload:D_(_)},S.requestTimeoutMs??180000);if(!M_(R))throw new A("HOST_REJECTED","Host did not return a session.");return R},prompt:(_)=>k({channel:X,v:I,type:"prompt",id:D(P),payload:X_(_)}).then((T)=>{if(!G_(T))throw new A("HOST_REJECTED","Host did not return a prompt result.");return T}),sessionLink:(_)=>Z({channel:X,v:I,type:"session-link",id:D(P),payload:SS(_)}),close:()=>Z({channel:X,v:I,type:"close",id:D(P)}),oauthStart:()=>Z({channel:X,v:I,type:"oauth-start",id:D(P)}),oauthDisconnect:()=>Z({channel:X,v:I,type:"oauth-disconnect",id:D(P)}),request:(_)=>(xS(_.path)?k({channel:X,v:I,type:"request",id:D(P),payload:_}):JT()).then((T)=>{if(!bS(T))throw new A("HOST_REJECTED","Host request result was empty.");return T}),serviceRequest:(_)=>(xS(_.path)?k({channel:X,v:I,type:"service-request",id:D(P),payload:_}):JT()).then((T)=>{if(!bS(T))throw new A("HOST_REJECTED","Host service request result was empty.");return T}),serviceStatus:()=>k({channel:X,v:I,type:"service-status",id:D(P)}).then((_)=>{if(!N_(_))throw new A("HOST_REJECTED","Host did not return service status.");return _}),readFile:(_)=>(_S(_)?k({channel:X,v:I,type:"file-read",id:D(P),payload:{path:_}}):qS()).then((T)=>{if(!B_(T))throw new A("HOST_REJECTED","Host did not return file content.");return T}),writeFile:(_,T)=>{if(!_S(_))return qS();if(T.length>HS)return Promise.reject(new A("FILE_TOO_LARGE",`Content is over ${HS} characters.`));return k({channel:X,v:I,type:"file-write",id:D(P),payload:{path:_,content:T}}).then((R)=>{if(!W_(R))throw new A("HOST_REJECTED","Host did not confirm the write.");return R})},listDir:(_)=>(_S(_)?k({channel:X,v:I,type:"file-list",id:D(P),payload:{path:_}}):qS()).then((T)=>{if(!F_(T))throw new A("HOST_REJECTED","Host did not return directory entries.");return T}),stat:(_)=>(_S(_)?k({channel:X,v:I,type:"file-stat",id:D(P),payload:{path:_}}):qS()).then((T)=>{if(!Q_(T))throw new A("HOST_REJECTED","Host did not return file status.");return T}),generate:(_)=>{let T=_.prompt.trim(),R=_.system?.trim();if(T.length===0||T.length>kS)return Promise.reject(new A("HOST_REJECTED",`Prompt must be 1 to ${kS} characters.`));if(R!==void 0&&(R.length===0||R.length>wS))return Promise.reject(new A("HOST_REJECTED",`System prompt must be 1 to ${wS} characters.`));let M=_.maxOutputTokens===void 0?void 0:Math.min(C_,Math.max(1,Math.floor(_.maxOutputTokens)));if(M!==void 0&&!Number.isFinite(M))return Promise.reject(new A("HOST_REJECTED","maxOutputTokens must be a number."));let F={prompt:T};if(R!==void 0)F.system=R;if(M!==void 0)F.maxOutputTokens=M;return k({channel:X,v:I,type:"generate",id:D(P),payload:F},S.requestTimeoutMs??P_).then((B)=>{if(!L_(B))throw new A("HOST_REJECTED","Host did not return generated text.");return B})},onLateGenerateResult:(_)=>{i.add(_);for(let T of lS.splice(0))L([_],T);return c_(),()=>{i.delete(_)}},setBadge:(_)=>Z({channel:X,v:I,type:"badge",id:D(P),payload:{count:I_(_)}}),setHeight:(_)=>Z({channel:X,v:I,type:"resize",id:D(P),payload:{height:V_(_)}}),onFileOpen:(_)=>{if(BS.add(_),!oS)oS=!0,E.addEventListener("keydown",d_,!0);if(US)_(US);return()=>{BS.delete(_)}},onFileSnapshot:(_)=>{return GS=_,()=>{if(GS===_)GS=null}},onFileSaved:(_)=>{return WS.add(_),()=>{WS.delete(_)}},reportFileChange:(_)=>aS({...z,type:"file-change",payload:{dirty:_.dirty,edited:_.edited}}),requestFileSave:u_,reportFileUnsupported:()=>aS({...z,type:"file-unsupported"}),dispose:()=>{for(let _ of s.keys())b({...z,type:"workspace-unsubscribe",id:D(P),payload:{subscriptionId:_}});s.clear();for(let _ of t.keys())b({...z,type:"shells-unsubscribe",id:D(P),payload:{subscriptionId:_}});if(t.clear(),h=!0,RS=null,MS=null,GS=null,BS.clear(),WS.clear(),oS)E.removeEventListener("keydown",d_,!0);E.removeEventListener("message",v_),E.removeEventListener("keydown",p_,!0),E.removeEventListener("pointerover",QS),E.removeEventListener("pointermove",QS),E.removeEventListener("pointerout",l_),E.removeEventListener("focus",o_),E.removeEventListener("blur",a_);for(let _ of n.values())clearTimeout(_.timer),_.reject(new A("HOST_UNAVAILABLE","Host client was disposed."));n.clear(),C.clear(),V.clear(),W.clear(),N.clear(),j.clear(),x.clear(),OS.clear(),XS.clear(),IS.clear(),VS.clear(),NS.clear(),i.clear(),lS.length=0}}};var jT=["browser.open","browser.snapshot","browser.click","browser.type","browser.select","browser.scroll","browser.back","browser.forward","browser.inspect","browser.capture","browser.resize","browser.close"];var yE=new Set(jT);var fT=["none","agent","user"];var hE=new Set(fT);var sT=[["--oc-bg","background"],["--oc-elevated","elevated"],["--oc-fg","foreground"],["--oc-muted","muted"],["--oc-subtle","subtle"],["--oc-border","border"],["--oc-hover","hover"],["--oc-selection","selection"],["--oc-focus","focus"],["--oc-primary","primary"],["--oc-muted-surface","mutedSurface"],["--oc-elevated-fg","elevatedForeground"],["--oc-active","active"],["--oc-selection-fg","selectionForeground"],["--oc-primary-fg","primaryForeground"],["--oc-primary-text","primaryText"],["--oc-success-text","successText"],["--oc-warning-text","warningText"],["--oc-error-text","errorText"],["--oc-info-text","infoText"],["--oc-success","success"],["--oc-warning","warning"],["--oc-error","error"],["--oc-info","info"],["--oc-font","font"],["--oc-mono","mono"],["--oc-radius","radius"],["--surface-background","background"],["--surface-elevated","elevated"],["--surface-foreground","foreground"],["--surface-muted-foreground","muted"],["--surface-subtle","subtle"],["--interactive-border","border"],["--interactive-hover","hover"],["--interactive-selection","selection"],["--interactive-focus-ring","focus"],["--primary","primary"],["--surface-muted","mutedSurface"],["--surface-elevated-foreground","elevatedForeground"],["--interactive-active","active"],["--interactive-selection-foreground","selectionForeground"],["--primary-foreground","primaryForeground"],["--primary-text","primaryText"],["--success-text","successText"],["--warning-text","warningText"],["--error-text","errorText"],["--info-text","infoText"],["--status-success","success"],["--status-warning","warning"],["--status-error","error"],["--status-info","info"],["--font-sans","font"],["--font-mono","mono"],["--radius","radius"]],tT=[["--oc-syntax-keyword","--syntax-keyword","syntaxKeyword"],["--oc-syntax-string","--syntax-string","syntaxString"],["--oc-syntax-number","--syntax-number","syntaxNumber"],["--oc-syntax-function","--syntax-function","syntaxFunction"],["--oc-syntax-type","--syntax-type","syntaxType"],["--oc-syntax-comment","--syntax-comment","syntaxComment"],["--oc-syntax-variable","--syntax-variable","syntaxVariable"],["--oc-syntax-operator","--syntax-operator","syntaxOperator"]],HT=(S,E)=>{E.style.colorScheme=S.mode;for(let[O,G]of sT)E.style.setProperty(O,S.tokens[G]);for(let[O,G,C]of tT){let V=S.tokens[C]??"";E.style.setProperty(O,V),E.style.setProperty(G,V)}E.style.setProperty("font-family",S.tokens.font),E.style.setProperty("font-size","0.875rem"),E.style.setProperty("line-height","1.45"),E.style.setProperty("color",S.tokens.foreground)},Z_=(S,E)=>{if(HT(S.theme,E),E.dataset)E.dataset.ocSurface=S.surface,E.dataset.ocTheme=S.theme.mode};var eT={"surface-background":"bg","surface-elevated":"elevated","surface-elevated-foreground":"elevated-fg","surface-foreground":"fg","surface-muted-foreground":"muted","surface-muted":"muted-surface","surface-subtle":"subtle","interactive-border":"border","interactive-hover":"hover","interactive-active":"active","interactive-selection":"selection","interactive-selection-foreground":"selection-fg","interactive-focus-ring":"focus",primary:"primary","primary-foreground":"primary-fg","primary-text":"primary-text","success-text":"success-text","warning-text":"warning-text","error-text":"error-text","info-text":"info-text","status-success":"success","status-warning":"warning","status-error":"error","status-info":"info","font-sans":"font","font-mono":"mono",radius:"radius"},Q=(S,E)=>`var(--${S}, var(--oc-${eT[S]}, ${E}))`,v=Q("surface-background","transparent"),hS=Q("surface-elevated","transparent"),TS=Q("surface-elevated-foreground","inherit"),q=Q("surface-foreground","inherit"),Y=Q("surface-muted-foreground","gray"),SE=Q("surface-muted","transparent"),l=Q("interactive-border","currentColor"),w=Q("interactive-hover","transparent"),o=Q("interactive-active","transparent"),z_=Q("interactive-selection","transparent"),K_=Q("interactive-selection-foreground","inherit"),c=Q("primary","currentColor"),J_=Q("primary-text","inherit"),j_=Q("error-text","inherit"),_E=Q("font-sans","inherit"),f_=Q("font-mono","monospace"),bT=Q("radius","9px"),H_=`calc(${bT} - 2px)`,kT=`calc(${bT} - 4px)`,$=(S,E,O="transparent")=>`color-mix(in srgb, ${S} ${E}%, ${O})`,wT=`background-image: linear-gradient(${w}, ${w});`,k_=(S,E="0.5px")=>`box-shadow: inset 0 0 0 ${E} ${S}, var(--oc-sdk-field-lift);`,w_="border-color: var(--oc-sdk-edge); box-shadow: var(--oc-sdk-raised-lift);",xT="box-shadow: var(--oc-sdk-lit);",x_=`inset 0 0.5px 0 0 ${$(q,8)}, 0 1px 2px 0 rgb(0 0 0 / 0.4)`,TE=`
:root {
  --oc-sdk-edge: ${$(q,16)};
  --oc-sdk-field-bg: ${hS};
  --oc-sdk-raised-bg: ${v};
  --oc-sdk-field-lift: inset 0 1px 2px 0 rgb(0 0 0 / 0.04);
  --oc-sdk-raised-lift: 0 1px 1.5px 0 rgb(0 0 0 / 0.08);
  --oc-sdk-lit: inset 0 1px 0 0 rgb(255 255 255 / 0.2), 0 1px 1.5px 0 rgb(0 0 0 / 0.1);
  --oc-sdk-float-edge: rgb(0 0 0 / 0.14);
  --oc-sdk-float: inset 0 1px 0 0 rgb(255 255 255 / 0.7), 0 1px 2px -0.5px rgb(0 0 0 / 0.06), 0 4px 8px -2px rgb(0 0 0 / 0.08), 0 12px 20px -4px rgb(0 0 0 / 0.06);
}
:root[data-oc-theme="dark"] {
  --oc-sdk-edge: ${$(q,14)};
  --oc-sdk-field-bg: ${$(v,50,hS)};
  --oc-sdk-raised-bg: ${hS};
  --oc-sdk-field-lift: ${x_};
  --oc-sdk-raised-lift: ${x_};
  --oc-sdk-lit: ${x_};
  --oc-sdk-float-edge: rgb(0 0 0 / 0.55);
  --oc-sdk-float: inset 0 1px 0 0 rgb(255 255 255 / 0.04), inset 0 0 0 0.5px rgb(255 255 255 / 0.08), 0 8px 16px 0 rgb(0 0 0 / 0.25), 0 4px 8px 0 rgb(0 0 0 / 0.25);
}`,gS=(S)=>{let E=Q(`status-${S}`,"currentColor");return`
.oc-sdk[data-tone="${S}"], .oc-sdk [data-tone="${S}"] { --oc-sdk-tone: ${E}; --oc-sdk-tone-text: ${Q(`${S}-text`,"inherit")}; }`},EE=`
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
`,qT=`${TE}
.oc-sdk { color: ${q}; font-family: ${_E}; }
.oc-sdk :focus-visible, .oc-sdk:focus-visible { outline: none; }
.oc-sdk :where(button, a[href], [role="button"], [role="tab"], [role="option"]):focus-visible, button.oc-sdk:focus-visible { ${wT} }
.oc-sdk-mono { font-family: ${f_}; }
.oc-sdk-muted { color: ${Y}; }
${gS("success")}${gS("warning")}${gS("error")}${gS("info")}
.oc-sdk[data-tone="primary"], .oc-sdk [data-tone="primary"] { --oc-sdk-tone: ${c}; --oc-sdk-tone-text: ${J_}; }

.oc-sdk-btn { border-radius: ${H_}; transition: background 150ms ease-out, color 150ms ease-out; }
.oc-sdk-btn[data-size="xs"] { border-radius: ${kT}; }
.oc-sdk-btn[data-variant="default"] { color: ${J_}; background: ${$(c,10,v)}; border-color: ${$(c,12)}; ${xT} }
.oc-sdk-btn[data-variant="default"]:hover { background: ${$(c,16,v)}; }
.oc-sdk-btn[data-variant="default"]:active { background: ${$(c,22,v)}; box-shadow: none; }
.oc-sdk-btn[data-variant="secondary"] { background: ${SE}; color: var(--oc-fg); }
.oc-sdk-btn[data-variant="secondary"]:hover { background-image: linear-gradient(${w}, ${w}); }
.oc-sdk-btn[data-variant="secondary"]:active { background-image: linear-gradient(${o}, ${o}); }
.oc-sdk-btn[data-variant="outline"] { background: var(--oc-sdk-raised-bg); color: ${TS}; ${w_} }
.oc-sdk-btn[data-variant="outline"]:hover { background-image: linear-gradient(${w}, ${w}); }
.oc-sdk-btn[data-variant="outline"]:active { background-image: linear-gradient(${o}, ${o}); box-shadow: none; }
.oc-sdk-btn[data-variant="ghost"] { background: transparent; }
.oc-sdk-btn[data-variant="ghost"]:hover { background: ${w}; }
.oc-sdk-btn[data-variant="ghost"]:active { background: ${o}; }
.oc-sdk-btn[data-variant="destructive"] { --oc-sdk-tone: ${Q("status-error","red")}; color: ${j_}; background: ${$("var(--oc-sdk-tone)",7,v)}; border-color: ${$("var(--oc-sdk-tone)",12)}; ${xT} }
.oc-sdk-btn[data-variant="destructive"]:hover { background: ${$("var(--oc-sdk-tone)",9,v)}; }
.oc-sdk-btn[data-variant="destructive"]:active { background: ${$("var(--oc-sdk-tone)",11,v)}; box-shadow: none; }

.oc-sdk-field-note { color: ${Y}; }
.oc-sdk-field[data-invalid="true"] .oc-sdk-field-note { color: ${j_}; }
.oc-sdk-input { border-radius: ${H_}; background: var(--oc-sdk-field-bg); color: ${TS}; ${k_("var(--oc-sdk-edge)")} transition: background 150ms ease-out; }
.oc-sdk-input::placeholder { color: ${Y}; }
.oc-sdk-input:hover:not(:focus) { background-image: linear-gradient(${w}, ${w}); }
.oc-sdk-input:focus, .oc-sdk-input:focus-visible { ${k_($(q,26),"1px")} }
.oc-sdk-field[data-invalid="true"] .oc-sdk-input, .oc-sdk-field[data-invalid="true"] .oc-sdk-input:focus { ${k_(Q("status-error","red"),"1px")} }
.oc-sdk-input[data-mono="true"] { font-family: ${f_}; }

.oc-sdk-search-icon { color: ${Y}; }
.oc-sdk-search[data-active="true"] .oc-sdk-search-icon { color: ${c}; }
.oc-sdk-search-clear { border-radius: ${kT}; color: ${Y}; }
.oc-sdk-search-clear:hover { background: ${w}; color: ${q}; }

.oc-sdk-trigger { border-radius: ${H_}; background: var(--oc-sdk-raised-bg); color: ${TS}; ${w_} transition: background 150ms ease-out; }
.oc-sdk-trigger:hover { background-image: linear-gradient(${w}, ${w}); }
.oc-sdk-trigger[aria-expanded="true"] { background-image: linear-gradient(${o}, ${o}); }
.oc-sdk-trigger-value[data-empty="true"] { color: ${Y}; }
.oc-sdk-trigger-chevron { color: ${Y}; }
/* The app's floating level: the glass edge (a hairline ring and a lit top line, dark outside and light inside in dark themes) over soft shadows. The outer ring is the border, over the page like the app's. */
.oc-sdk-popup { --surface-foreground: ${TS}; border-color: var(--oc-sdk-float-edge); border-radius: 12px; background: ${hS}; background-clip: padding-box; color: ${TS}; box-shadow: var(--oc-sdk-float); }
.oc-sdk-option { border-radius: 8px; }
.oc-sdk-option[data-active="true"] { background: ${w}; }
/* A selected option shows a check mark in the text colour, like the app's own pickers. Options without the mark come
   from bundles built before it existed and keep the selection fill as their only sign of the choice. */
.oc-sdk-option[aria-selected="true"]:not([data-mark]) { background: ${z_}; color: ${K_}; }
.oc-sdk-option-check { color: ${q}; }
.oc-sdk-option[data-destructive="true"] { color: ${j_}; }
.oc-sdk-option[data-destructive="true"][data-active="true"] { background: ${$(Q("status-error","red"),10)}; }
.oc-sdk-option-hint { color: ${Y}; }
.oc-sdk-popup-empty { color: ${Y}; }

/* Checked stays neutral: the mark carries the state, and the primary colour stays with primary actions. */
.oc-sdk-check-box { border-color: ${l}; border-radius: 4px; color: ${q}; transition: border-color 150ms ease-out; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-box { border-color: ${$(q,60,l)}; }
.oc-sdk-check-thumb { border-radius: 9999px; background: ${l}; transition: background 150ms ease-out; }
.oc-sdk-check-thumb::after { border-radius: 9999px; background: ${v}; transition: transform 150ms ease-out; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-thumb { background: ${c}; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-thumb::after { transform: translateX(16px); }
.oc-sdk-check:focus-visible { box-shadow: none; }
.oc-sdk-check:focus-visible .oc-sdk-check-box, .oc-sdk-check:focus-visible .oc-sdk-check-thumb { ${wT} }
.oc-sdk-check-desc { color: ${Y}; }

.oc-sdk-tabs { border-radius: 10px; }
.oc-sdk-tabs[data-track="true"] { background: ${$(q,4)}; box-shadow: inset 0 1px 2px 0 rgb(0 0 0 / 0.16); }
.oc-sdk-tab { border-radius: 8px; color: ${Y}; transition: color 150ms ease-out, background 150ms ease-out; }
.oc-sdk-tab:hover { color: ${q}; }
.oc-sdk-tab[aria-selected="true"] { color: ${K_}; background: ${z_}; border-color: ${l}; }
.oc-sdk-tabs[data-track="true"] .oc-sdk-tab[aria-selected="true"] { color: ${TS}; background: var(--oc-sdk-raised-bg); ${w_} }
.oc-sdk-tab-count { color: ${Y}; }

/* The app's neutral badge: a step of the text colour, the same in every theme. */
.oc-sdk-badge { border-radius: 9999px; background: ${$(q,6)}; color: ${Y}; }
.oc-sdk-badge[data-tone] { color: var(--oc-sdk-tone-text, var(--oc-sdk-tone)); background: ${$("var(--oc-sdk-tone)",15)}; }

.oc-sdk-row { border-radius: 6px; transition: background 120ms ease-out; }
.oc-sdk-row:hover, .oc-sdk-row[data-active="true"] { background: ${w}; }
.oc-sdk-row[aria-selected="true"] { background: ${z_}; color: ${K_}; }
.oc-sdk-row-lead { font-family: ${f_}; color: ${Y}; }
.oc-sdk-row-sub { color: ${Y}; }
.oc-sdk-row-meta { color: ${Y}; }
.oc-sdk-row[aria-selected="true"] .oc-sdk-row-lead, .oc-sdk-row[aria-selected="true"] .oc-sdk-row-sub, .oc-sdk-row[aria-selected="true"] .oc-sdk-row-meta { color: inherit; opacity: .75; }
.oc-sdk-list-empty { color: ${Y}; }

.oc-sdk-empty-body { color: ${Y}; }

.oc-sdk-spinner { color: ${Y}; }
.oc-sdk-spinner-ring { border-color: ${l}; border-top-color: ${c}; border-radius: 9999px; }

/* Set apart by its tint alone, like the app's banners. */
.oc-sdk-banner { border-color: transparent; border-radius: 8px; background: ${$("var(--oc-sdk-tone)",10)}; }
.oc-sdk-banner-title { color: var(--oc-sdk-tone-text, var(--oc-sdk-tone)); }
.oc-sdk-banner-body { color: ${Y}; }

.oc-sdk-separator { color: ${Y}; }
.oc-sdk-separator::before, .oc-sdk-separator::after { background: ${$(l,40)}; }

.oc-sdk-progress-label { color: ${Y}; }
/* The app's progress: a groove a step of the text colour, green once done. Older bundles mark done only through aria-valuenow. */
.oc-sdk-progress-track { border-radius: 9999px; background: ${$(q,6)}; }
.oc-sdk-progress-fill { border-radius: 9999px; background: var(--oc-sdk-tone, ${c}); }
.oc-sdk-progress-track[aria-valuenow="100"] > .oc-sdk-progress-fill:not([data-tone]) { background: ${Q("status-success","currentColor")}; }
.oc-sdk-progress[data-done="true"] .oc-sdk-progress-value { color: ${Q("success-text","inherit")}; }

.oc-sdk-text a { color: ${J_}; text-decoration: underline; text-underline-offset: 2px; }
.oc-sdk-text img { border-radius: 8px; border: 1px solid ${$(l,60)}; }
`,f=`
${nS}
${EE}
${qT}`;var yT="oc-sdk-ui-style";var H=(S)=>{let E=document.getElementById(yT);if(E instanceof HTMLStyleElement){if(E.textContent!==S)E.textContent=S;return}sS(document);let O=document.createElement("style");O.id=yT,O.textContent=S,document.head.appendChild(O)},J=(S,E)=>{let O=document.createElement(S);if(E)O.className=E;return O},u=(S)=>{let E=J("button",S);return E.type="button",E},y=(S,E)=>{let O=E??"";if(S.textContent!==O)S.textContent=O};var OE=()=>{let S=document.createElement("span");return S.className="oc-sdk-spinner-ring",S.setAttribute("aria-hidden","true"),S},d=(S,E)=>{H(f);let O=E,G=u("oc-sdk oc-sdk-btn"),C=OE(),V=document.createElement("span");G.append(V),S.append(G);let W=()=>{if(G.dataset.variant=O.variant??"default",G.dataset.size=O.size??"default",G.disabled=Boolean(O.disabled)||Boolean(O.loading),G.dataset.loading=O.loading?"true":"false",G.setAttribute("aria-busy",O.loading?"true":"false"),O.loading&&C.parentNode!==G)G.prepend(C);else if(!O.loading&&C.parentNode===G)C.remove();y(V,O.label)},N=()=>{if(O.disabled||O.loading)return;O.onClick()};return G.addEventListener("click",N),W(),{update:(j)=>{O={...O,...j},W()},dispose:()=>{G.removeEventListener("click",N),G.remove()}}};var b_=(S,E)=>{H(f);let O=E,G=J("div","oc-sdk oc-sdk-empty"),C=J("h2","oc-sdk-empty-title"),V=J("p","oc-sdk-empty-body"),W=J("div","oc-sdk-empty-action");G.append(C,V,W),S.append(G);let N=null,j=()=>{if(y(C,O.title),y(V,O.body),V.hidden=!O.body,W.hidden=!O.action,!O.action){N?.dispose(),N=null;return}let x={label:O.action.label,onClick:O.action.onClick};if(N)N.update(x);else N=d(W,{...x,variant:"outline",size:"sm"})};return j(),{update:(x)=>{O={...O,...x},j()},dispose:()=>{N?.dispose(),N=null,G.remove()}}};var AE=/^(\s*[-*+] )\[( |x|X)\] ?(.*)$/,gT=(S)=>S.split(`
`).map((E)=>{let O=AE.exec(E);return O?{kind:"item",prefix:O[1]??"- ",done:O[2]!==" ",text:O[3]??""}:{kind:"text",text:E}}),hT=(S)=>S.map((E)=>E.kind==="text"?E.text:`${E.prefix}[${E.done?"x":" "}] ${E.text}`).join(`
`),dS=(S)=>{let E=2166136261;for(let O=0;O<S.length;O+=1)E^=S.charCodeAt(O),E=Math.imul(E,16777619);return`${S.length}:${(E>>>0).toString(16)}`},mT=(S,E)=>{let O=-1,G="- ";S.forEach((N,j)=>{if(N.kind!=="item")return;O=j,G=N.prefix});let C={kind:"item",prefix:G,done:!1,text:E};if(O>=0)return[...S.slice(0,O+1),C,...S.slice(O+1)];return[...S.at(-1)?.kind==="text"&&S.at(-1)?.text===""?S.slice(0,-1):[...S],C,{kind:"text",text:""}]};var r=$_(),a=document.querySelector("#root");if(!a)throw Error("Missing root");var cT=document.createElement("style");cT.textContent=`
  html, body { margin: 0; height: 100%; background: var(--oc-bg); color: var(--oc-fg); font-family: var(--oc-font); font-size: 13px; }
  #root { box-sizing: border-box; height: 100%; overflow: auto; padding: 16px 20px; }
  .note { margin: 2px 0; color: var(--oc-muted); white-space: pre-wrap; min-height: 1em; }
  .item { display: flex; align-items: center; gap: 8px; margin: 2px 0; }
  .item input[type="checkbox"] { width: 16px; height: 16px; margin: 0; accent-color: var(--oc-primary); }
  .item input[type="text"] { flex: 1; min-width: 0; border: 1px solid transparent; border-radius: var(--oc-radius); padding: 4px 6px;
    background: transparent; color: inherit; font: inherit; }
  .item input[type="text"]:hover { border-color: var(--oc-border); }
  .item input[type="text"]:focus { outline: none; border-color: var(--oc-focus); background: var(--oc-elevated); }
  .item.done input[type="text"] { color: var(--oc-muted); text-decoration: line-through; }
  .item .remove { visibility: hidden; }
  .item:hover .remove, .item:focus-within .remove { visibility: visible; }
  .actions { margin-top: 12px; }
`;document.head.append(cT);r.onReady((S)=>Z_(S,document.documentElement));var p=[],ES=!1,y_=KS(null),g_=()=>hT(p),pS=()=>{r.reportFileChange(y_.observe(dS(g_())))},q_=()=>{if(a.replaceChildren(),!p.some((E)=>E.kind==="item")&&ES){b_(a,{title:"No items",body:"This checklist is empty."});return}if(p.forEach((E,O)=>{if(E.kind==="text"){let W=document.createElement("p");W.className="note",W.textContent=E.text,a.append(W);return}let G=document.createElement("div");G.className=E.done?"item done":"item";let C=document.createElement("input");C.type="checkbox",C.checked=E.done,C.disabled=ES,C.addEventListener("change",()=>{E.done=C.checked,G.className=E.done?"item done":"item",pS()});let V=document.createElement("input");if(V.type="text",V.value=E.text,V.readOnly=ES,V.setAttribute("aria-label","Item"),V.addEventListener("input",()=>{E.text=V.value,pS()}),G.append(C,V),!ES){let W=document.createElement("span");W.className="remove",d(W,{label:"Remove",variant:"ghost",size:"xs",onClick:()=>{p=p.filter((N,j)=>j!==O),pS(),q_()}}),G.append(W)}a.append(G)}),ES)return;let S=document.createElement("div");S.className="actions",d(S,{label:"Add item",variant:"secondary",size:"sm",onClick:()=>{p=mT(p,""),pS(),q_();let E=a.querySelectorAll('.item input[type="text"]');E.item(E.length-1)?.focus()}}),a.append(S)};r.onFileOpen((S)=>{if(S.encoding!=="text"){r.reportFileUnsupported();return}p=gT(S.content),ES=S.readOnly,y_=KS(dS(g_())),q_()});r.onFileSnapshot(()=>{let S=g_();return{content:S,version:dS(S)}});r.onFileSaved((S)=>{r.reportFileChange({dirty:y_.markSaved(S),edited:!1})});})();
