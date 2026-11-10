(()=>{var X="openchamber.sdk",I=1;var pS=`
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
`;function lS(S){let E=S.documentElement;if(E.hasAttribute("data-oc-scrollbar-activity"))return;E.setAttribute("data-oc-scrollbar-activity","");let O=new WeakMap;S.addEventListener("scroll",(A)=>{let D=A.target===S?E:A.target;if(!(D instanceof Element))return;if(!D.hasAttribute("data-oc-scrolling"))D.setAttribute("data-oc-scrolling","");let L=O.get(D);if(L!==void 0)clearTimeout(L);O.set(D,setTimeout(()=>{O.delete(D),D.removeAttribute("data-oc-scrolling")},1000))},{capture:!0,passive:!0})}var bT=`(${lS.toString()})(document);`;var oS=128,aS=65536;var FS=128;var QS=65536;var o_=/^[a-z][a-z0-9-]{0,39}$/;var d_=(S)=>Object(S)===S&&!Array.isArray(S),rS=(S,E)=>Object.keys(S).every((O)=>E.includes(O)),p_=(S)=>String(S)===S&&S.length>=1&&S.length<=60,l_=(S)=>String(S)===S&&S.length>=1&&S.length<=80,a_=(S)=>{if(!Array.isArray(S)||S.length>4)return!1;let E=new Set;for(let O of S){if(!d_(O)||!o_.test(O.id)||!p_(O.label))return!1;if(O.disabled!==void 0&&O.disabled!==!0&&O.disabled!==!1)return!1;if(E.has(O.id))return!1;if(E.add(O.id),O.kind==="button"){if(!rS(O,["kind","id","label","disabled"]))return!1;continue}if(O.kind!=="select"||!rS(O,["kind","id","label","value","options","disabled"]))return!1;if(!l_(O.value)||!Array.isArray(O.options)||O.options.length<1||O.options.length>16)return!1;let A=new Set;for(let D of O.options){if(!d_(D)||!rS(D,["value","label"])||!l_(D.value)||!p_(D.label)||A.has(D.value))return!1;A.add(D.value)}if(!A.has(O.value))return!1}return!0};var r_=["{id}","{segment}","{segments+}"];var DE=new Set(r_);var n_=["turn-finished","turn-failed","permission-asked","question-asked","turn-started","session-created","session-archived","session-deleted"];var IE=new Set(n_);var LS=20000000,$S=256;var nS=(S)=>("bytes"in S)?S.bytes.byteLength:S.content.length,i_=(S,E)=>{if(S.path!==E.path||S.readOnly!==E.readOnly)return!1;if(S.encoding==="text"||E.encoding==="text")return S.encoding==="text"&&E.encoding==="text"&&S.content===E.content;if(S.bytes.byteLength!==E.bytes.byteLength)return!1;for(let O=0;O<S.bytes.byteLength;O+=1)if(S.bytes[O]!==E.bytes[O])return!1;return!0};var s_=/^[A-Za-z0-9_-]{1,80}$/;var t_=["left","right","top","bottom"];var e_=(S,E=0,O={remaining:16000})=>{if(--O.remaining<0||E>=32)return!1;if(S===null)return!0;let A=Array.isArray(S)?S:Object(S)===S?Object.values(S):[];for(let D of A)if(!e_(D,E+1,O))return!1;return!0},iS=(S)=>{if(S===null||S===!0||S===!1)return!0;if(Array.isArray(S))return Object.keys(S).every((E)=>/^(0|[1-9]\d*)$/.test(E)&&Number(E)<S.length)&&S.every(iS);if(Object(S)===S){let E=Object.getPrototypeOf(S);return(E===null||E===Object.prototype)&&Object.values(S).every(iS)}return String(S)===S||Number.isFinite(S)},sS=(S)=>{try{if(String(S.id)!==S.id||!s_.test(S.id)||!Number.isFinite(S.anchor.x)||Math.abs(S.anchor.x)>1e5||!Number.isFinite(S.anchor.y)||Math.abs(S.anchor.y)>1e5||!Number.isFinite(S.anchor.width)||!Number.isFinite(S.anchor.height)||S.anchor.width<=0||S.anchor.height<=0||S.anchor.width>1e5||S.anchor.height>1e5||!Number.isInteger(S.width)||S.width<160||S.width>640||!Number.isInteger(S.height)||S.height<48||S.height>480||S.side!==void 0&&!t_.includes(S.side)||S.focus!==void 0&&S.focus!==!0&&S.focus!==!1||!e_(S.data)||!iS(S.data))return!1;return JSON.stringify(S.data).length<=16000}catch{return!1}};var eS=2000;var _T=["file","directory","other","missing"],S_=(S)=>Boolean(S&&"sessionId"in S),__=(S)=>Boolean(S&&"sent"in S&&!("sessionId"in S));var TT=/^[0-9a-f]{7,64}$/i,T_=(S)=>TT.test(S),YS=500,ZS=32000,ET=16000,OT=128,RT=200,MT=2000,GT=16000,UT=80,AT=200,CT=16000;var PT=2000;var E_=20000,zS=1024,fS=2000000;var JS=64000,KS=8000,O_=4000;var R_=960000;var DT=999,XT=1e4,US=500,IT=["HOST_UNAVAILABLE","HOST_TIMEOUT","HOST_REJECTED","DISCONNECTED","DISABLED","BAD_PATH","NO_INTEGRATION","NO_SERVICE","SERVICE_FAILED","REQUEST_FAILED","RESPONSE_TOO_LARGE","NO_SESSION","SESSION_BUSY","NOT_GRANTED","NO_DIRECTORY","NOT_FOUND","FILE_TOO_LARGE","DENIED","NO_MODEL","MODEL_FAILED","UNSUPPORTED"],VT=["stopped","starting","ready","failed"],qT=new Set(IT),NT=(S)=>qT.has(S),BT=(S)=>S&&NT(S)?S:"HOST_REJECTED",n=(S)=>{if(S===void 0)return!1;if(S===null||S===!0||S===!1)return!0;if(String(S)===S)return!0;if(Number(S)===S)return Number.isFinite(S);if(Array.isArray(S))return S.every(n);if(Object(S)===S)return Object.values(S).every(n);return!1},WT=(S)=>n(S)&&JSON.stringify(S).length<=CT,ST=(S)=>S?.trim().slice(0,AT)??"",i=(S)=>{let E=S.id.trim().slice(0,OT),O=S.title.trim().slice(0,RT),A=S.url.trim().slice(0,MT),D=S.text?.trim().slice(0,GT),L=S.author?.trim().slice(0,UT),N=S.kind==="pull"?"pull":"issue",V={providerId:S.providerId.trim(),id:E,title:O||E,url:A,kind:N};if(D)V.text=D;if(L)V.author=L;if(N==="pull"){let q=ST(S.branches?.head),v=ST(S.branches?.base);if(q&&v)V.branches={head:q,base:v}}if(WT(S.data))V.data=S.data;return V},M_=(S)=>{let E=i(S);if(S.projectId)E.projectId=S.projectId;if(S.navigation)E.navigation=S.navigation;if(S.worktree)E.worktree=S.worktree;return E},G_=(S)=>{let E={text:S.text.trim().slice(0,ET)};if(S.send)E.send=!0;return E},U_=(S)=>{if(S===null||!Number.isFinite(S))return null;return Math.min(DT,Math.max(0,Math.round(S)))},A_=(S)=>{if(!Number.isFinite(S))return 0;return Math.min(XT,Math.max(0,Math.ceil(S)))};var s=(S)=>S.length>0&&S.length<=zS&&!S.includes("\x00")&&!S.includes("\\");var jS=(S)=>{if(!S.startsWith("/")||S.includes("\x00")||S.includes("\\")||S.includes("://"))return!1;if(S.length>PT)return!1;return!S.split("/").some((O)=>O==="."||O==="..")},gT=new Set(VT),C_=(S)=>Boolean(S&&"status"in S&&gT.has(String(S.status))&&!("body"in S)),kS=(S)=>Boolean(S&&"status"in S&&"body"in S&&Number.isInteger(S.status)),P_=(S)=>Boolean(S&&"content"in S&&String(S.content)===S.content),D_=(S)=>Boolean(S&&"written"in S&&S.written===!0),X_=(S)=>Boolean(S&&"entries"in S&&Array.isArray(S.entries)),hT=new Set(_T),I_=(S)=>Boolean(S&&"kind"in S&&"size"in S&&hT.has(String(S.kind))&&Number.isFinite(S.size)),V_=(S)=>Boolean(S&&"text"in S&&String(S.text)===S.text&&!("status"in S)),mT=new Set(["workspace","shells","ready","directory","session","connection","settings","session-lifecycle","item","resolve","action","service-event","status-control-event","popover-closed","file-open","file-snapshot","file-saved","generate-late"]),cT=(S)=>Object(S)===S?S:null,tS=(S)=>String(S)===S&&S.length>0,vT=(S)=>{if(!tS(S.id))return null;if(S.ok===!0){let E={channel:X,v:I,type:"result",id:S.id,ok:!0};if(Object(S.payload)===S.payload)E.payload=S.payload;return E}if(S.ok===!1&&tS(S.error))return{channel:X,v:I,type:"result",id:S.id,ok:!1,error:S.error,code:BT(tS(S.code)?S.code:void 0)};return null},N_=(S)=>{let E=cT(S);if(!E||E.channel!==X||E.v!==I)return null;if(E.type==="result")return vT(E);if(!mT.has(String(E.type))||Object(E.payload)!==E.payload)return null;return E};var FT=(S)=>("key"in S)&&("metaKey"in S)&&("ctrlKey"in S),uT=(S)=>(S.metaKey||S.ctrlKey)&&!S.altKey&&!S.shiftKey&&S.key.toLowerCase()==="s";class U extends Error{code;constructor(S,E){super(E);this.name="HostRequestError",this.code=S}}var QT=()=>Promise.reject(new U("BAD_PATH",'Request path must start with "/" and stay on the declared origin.')),HS=()=>Promise.reject(new U("BAD_PATH",`File path must be 1 to ${zS} characters without NUL or backslash.`)),wS=(S)=>{if(S===void 0)return;if(Object(S)!==S||Array.isArray(S)||S.scope!==void 0&&S.scope!=="instance"&&S.scope!=="device")throw new U("HOST_REJECTED",'Storage scope must be "instance" or "device".');return S.scope==="device"?"device":void 0},P=(S)=>{return S.value+=1,`oc-${S.value}`},B_=(S={})=>{let E=S.target??("window"in globalThis?window:null);if(!E)throw new U("HOST_UNAVAILABLE","No window. connectHost runs in a browser frame.");let O=S.acceptSource??((_)=>_===E.parent),A=S.requestTimeoutMs??E_,D=new Set,L=new Set,N=new Set,V=new Set,q=new Set,v=new Set,_S=new Set,CS=new Set,PS=new Set,DS=new Set,XS=new Set,l=new Set,mS=[],TS=null,ES=null,IS=new Set,VS=new Set,OS=null,RS=null,cS=!1,o=new Map,a=new Map,r=new Map,g=!1,C={value:0},G=null,h=null,MS=!1,GS=!1,H_=null,w_=(_)=>{if(!_)return null;return{sessionId:_.id,phase:_.busy?"started":"completed"}},w=(_)=>{E.parent.postMessage(_,"*")},x_=()=>{if(g||E.parent===E||l.size===0||G?.features?.lateGenerateResults!==!0)return;w({channel:X,v:I,type:"generate-late-listen"})},Q=(_,T)=>{for(let R of _)try{R(T)}catch(M){console.error(M)}},b_=(_)=>{if(!(_ instanceof MessageEvent))return;if(!O(_.source))return;let T=N_(_.data);if(!T)return;if(T.type==="workspace"){let M=a.get(T.payload.subscriptionId);if(M)Q([M],T.payload.snapshot);return}if(T.type==="shells"){let M=r.get(T.payload.subscriptionId);if(M)Q([M],T.payload.snapshot);return}if(T.type==="ready"){if(G=T.payload,h=w_(T.payload.session),Q(D,T.payload),Q(L,T.payload.directory),Q(N,T.payload.session),h)Q(V,h);if(Q(q,T.payload.connection),Q(v,T.payload.settings),Q(_S,T.payload.item),T.payload.block)Q(CS,T.payload.block);x_();return}if(T.type==="service-event"){Q(PS,T.payload);return}if(T.type==="generate-late"){if(l.size===0)mS.push(T.payload);else Q(l,T.payload);return}if(T.type==="directory"){if(G)G={...G,directory:T.payload.directory};Q(L,T.payload.directory);return}if(T.type==="session"){if(G)G={...G,session:T.payload.session};if(!T.payload.session)h=null;else if(h?.sessionId!==T.payload.session.id)h=w_(T.payload.session);Q(N,T.payload.session);return}if(T.type==="session-lifecycle"){h=T.payload,Q(V,T.payload);return}if(T.type==="connection"){if(G)G={...G,connection:T.payload.connection};Q(q,T.payload.connection);return}if(T.type==="settings"){if(G)G={...G,settings:T.payload.settings};Q(v,T.payload.settings);return}if(T.type==="item"){if(G)G={...G,item:T.payload.item};Q(_S,T.payload.item);return}if(T.type==="status-control-event"){Q(DS,T.payload);return}if(T.type==="popover-closed"){Q(XS,T.payload);return}if(T.type==="action"){let M=(B)=>{if(!g)w({channel:X,v:I,type:"action-result",id:T.id,payload:B})},W=ES;if(!W){M({ok:!1,error:"This extension does not handle background actions."});return}Promise.resolve().then(()=>W(T.payload)).then(()=>M({ok:!0}),(B)=>{let f=(B instanceof Error?B.message:String(B)).trim();M({ok:!1,error:(f||"Action failed.").slice(0,US)})});return}if(T.type==="file-open"){let M=T.payload;if(RS&&i_(RS,M))return;RS=M,Q(IS,T.payload);return}if(T.type==="file-saved"){Q(VS,T.payload.version);return}if(T.type==="file-snapshot"){let M=(f)=>{if(!g)w({channel:X,v:I,type:"file-snapshot-result",id:T.id,payload:f})},W=(f)=>M({error:(f.trim()||"Could not read the edited file.").slice(0,US)}),B=OS;if(!B){W("This extension does not edit files.");return}Promise.resolve().then(()=>B(T.payload.purpose)).then((f)=>{if(nS(f)>LS){W(`The file is over ${LS} ${"bytes"in f?"bytes":"characters"}.`);return}if(f.version.length>$S){W(`The snapshot version is over ${$S} characters.`);return}M({snapshot:"bytes"in f?{bytes:f.bytes,version:f.version}:{content:f.content,version:f.version}})},(f)=>W(f instanceof Error?f.message:String(f)));return}if(T.type==="resolve"){let M=(B)=>{w({channel:X,v:I,type:"resolve-result",id:T.id,payload:B})},W=TS;if(!W){M({error:"This extension does not resolve commands."});return}Promise.resolve().then(()=>W(T.payload)).then((B)=>M({item:B?i(B):null}),(B)=>{let f=(B instanceof Error?B.message:String(B)).trim();M({error:(f||"Command failed.").slice(0,US)})});return}let R=o.get(T.id);if(!R)return;if(clearTimeout(R.timer),o.delete(T.id),T.ok){R.resolve(T.payload);return}R.reject(new U(T.code,T.error))};E.addEventListener("message",b_),w({channel:X,v:I,type:"hello"});let k=(_,T=A)=>{if(g||E.parent===E)return Promise.reject(new U("HOST_UNAVAILABLE","No host frame. This page is not in an iframe."));return new Promise((R,M)=>{let W=setTimeout(()=>{o.delete(_.id),M(new U("HOST_TIMEOUT","Host did not answer in time."))},T);o.set(_.id,{resolve:R,reject:M,timer:W}),w(_)})},Z=(_)=>k(_).then(()=>{return}),z={channel:X,v:I},vS=(_)=>{if(!g&&E.parent!==E)w(_)},y_=()=>vS({...z,type:"file-save"}),q_=(_)=>{if(!FT(_)||!uT(_))return;_.preventDefault(),y_()},g_=(_)=>{if(!FT(_)||_.key!=="Escape"||G?.surface!=="popover"||!G.popover)return;_.preventDefault(),v_(G.popover.id,"escape").catch(()=>{return})},NS=()=>{let _=G?.surface==="popover"?G.popover:void 0;if(!_)return;let T=MS||GS;if(H_===T)return;H_=T,u_(_.id,T).catch(()=>{return})},BS=()=>{if(G?.surface!=="popover"||MS)return;MS=!0,NS()},h_=(_)=>{if(G?.surface!=="popover"||_.relatedTarget!==null||!MS)return;MS=!1,NS()},m_=()=>{if(G?.surface!=="popover"||GS)return;GS=!0,NS()},c_=()=>{if(G?.surface!=="popover"||!GS)return;GS=!1,NS()},b=(_,T=1024)=>{if(!_.trim()||_.length>T)throw new U("HOST_REJECTED",`Identity must contain 1 to ${T} characters.`)},uS=async(_)=>{if(_.kind!=="projects")b(_.projectId);let T=await k({...z,type:"workspace-read",id:P(C),payload:_});if(!T||!("kind"in T)||!("state"in T)||T.kind!==_.kind)throw new U("HOST_REJECTED","Host did not return workspace data.");return T},dS=async(_,T)=>{if(_.kind!=="projects")b(_.projectId);let R=P(C);a.set(R,T);try{await Z({...z,type:"workspace-subscribe",id:P(C),payload:{subscriptionId:R,query:_}})}catch(M){if(a.delete(R),!g)w({...z,type:"workspace-unsubscribe",id:P(C),payload:{subscriptionId:R}});throw M}return()=>{if(!a.delete(R)||g)return;w({...z,type:"workspace-unsubscribe",id:P(C),payload:{subscriptionId:R}})}},xT=async(_,T)=>{if(_.kind==="session")b(_.sessionId);if(_.kind==="project")b(_.projectId);let R=P(C);r.set(R,T);try{await Z({...z,type:"shells-subscribe",id:P(C),payload:{subscriptionId:R,scope:_}})}catch(M){if(r.delete(R),!g)w({...z,type:"shells-unsubscribe",id:P(C),payload:{subscriptionId:R}});throw M}return()=>{if(!r.delete(R)||g)return;w({...z,type:"shells-unsubscribe",id:P(C),payload:{subscriptionId:R}})}},WS=async(_)=>{if("key"in _&&(_.key.length===0||_.key.length>oS))throw new U("HOST_REJECTED","Storage key must contain 1 to 128 characters.");if(_.op==="set"&&!n(_.value))throw new U("HOST_REJECTED","Storage values must be JSON.");if(_.op==="set"&&new TextEncoder().encode(JSON.stringify(_.value)).length>aS)throw new U("HOST_REJECTED","Storage value exceeds 64 KiB.");if(_.scope==="device"&&G?.features?.deviceStorage!==!0)throw new U("UNSUPPORTED","This host does not support device storage.");let T=await k({...z,type:"storage",id:P(C),payload:_});if(!T||!("storage"in T)||T.op!==_.op)throw new U("HOST_REJECTED","Host did not return storage data.");return T},v_=(_,T)=>G?.features?.popovers!==!0&&!(G?.surface==="popover"&&G.popover?.id===_)?Promise.reject(new U("UNSUPPORTED","This host does not support popovers.")):Z({...z,type:"popover-close",id:P(C),payload:T?{id:_,reason:T}:{id:_}}),u_=(_,T)=>G?.features?.popovers!==!0&&!(G?.surface==="popover"&&G.popover?.id===_)?Promise.reject(new U("UNSUPPORTED","This host does not support popovers.")):Z({...z,type:"popover-anchor",id:P(C),payload:{id:_,active:T}});return E.addEventListener("keydown",g_,!0),E.addEventListener("pointerover",BS),E.addEventListener("pointermove",BS),E.addEventListener("pointerout",h_),E.addEventListener("focus",m_),E.addEventListener("blur",c_),{onAction:(_)=>{return ES=_,()=>{if(ES===_)ES=null}},listProjects:async()=>{let _=await uS({kind:"projects"});if(_.kind!=="projects")throw new U("HOST_REJECTED","Expected projects.");return _},listWorktrees:async(_)=>{let T=await uS({kind:"worktrees",projectId:_});if(T.kind!=="worktrees")throw new U("HOST_REJECTED","Expected worktrees.");return T},listSessions:async(_)=>{let T=await uS({kind:"sessions",projectId:_});if(T.kind!=="sessions")throw new U("HOST_REJECTED","Expected sessions.");return T},onProjects:(_)=>dS({kind:"projects"},(T)=>{if(T.kind==="projects")_(T)}),onWorktrees:(_,T)=>dS({kind:"worktrees",projectId:_},(R)=>{if(R.kind==="worktrees")T(R)}),onSessions:(_,T)=>dS({kind:"sessions",projectId:_},(R)=>{if(R.kind==="sessions")T(R)}),onRunningShells:(_,T)=>xT(_,T),readShellOutput:async(_,T)=>{b(_,FS);let R=T?.cursor;if(R!==void 0&&(!Number.isInteger(R)||R<0))throw new U("HOST_REJECTED","Shell output cursor must be a non-negative integer.");let M=T?.tailBytes;if(M!==void 0&&(!Number.isInteger(M)||M<1||M>QS))throw new U("HOST_REJECTED",`Shell output tailBytes must be an integer between 1 and ${QS}.`);let B=await k({...z,type:"shell-output",id:P(C),payload:{shellId:_,cursor:R,tailBytes:M}});if(!B||typeof B.output!=="string"||!Number.isFinite(B.cursor))throw new U("HOST_REJECTED","Host did not return shell output.");return B},stopShell:async(_)=>{if(b(_,FS),(await k({...z,type:"shell-stop",id:P(C),payload:{shellId:_}}))?.stopped!==!0)throw new U("HOST_REJECTED","Host did not stop the shell.");return{stopped:!0}},openSession:async(_)=>{b(_),await Z({...z,type:"open-session",id:P(C),payload:{sessionId:_}})},storage:{get:async(_,T)=>{let R=wS(T),M={op:"get",key:_};if(R)M.scope=R;let W=await WS(M);return W.op==="get"&&W.found?W.value:void 0},set:async(_,T,R)=>{let M=wS(R),W={op:"set",key:_,value:T};if(M)W.scope=M;await WS(W)},delete:async(_,T)=>{let R=wS(T),M={op:"delete",key:_};if(R)M.scope=R;await WS(M)},keys:async(_)=>{let T=wS(_),R={op:"keys"};if(T)R.scope=T;let M=await WS(R);if(M.op!=="keys")throw new U("HOST_REJECTED","Expected storage keys.");return M.keys}},onReady:(_)=>{if(D.add(_),G)_(G);return()=>{D.delete(_)}},onDirectory:(_)=>{if(L.add(_),G)_(G.directory);return()=>{L.delete(_)}},onSession:(_)=>{if(N.add(_),G)_(G.session);return()=>{N.delete(_)}},onSessionLifecycle:(_)=>{if(V.add(_),h)_(h);return()=>{V.delete(_)}},onConnection:(_)=>{if(q.add(_),G)_(G.connection);return()=>{q.delete(_)}},onSettings:(_)=>{if(v.add(_),G)_(G.settings);return()=>{v.delete(_)}},onItem:(_)=>{if(_S.add(_),G)_(G.item);return()=>{_S.delete(_)}},onBlock:(_)=>{if(CS.add(_),G?.block)_(G.block);return()=>{CS.delete(_)}},onServiceEvent:(_)=>{return PS.add(_),()=>{PS.delete(_)}},onStatusControl:(_)=>{return DS.add(_),()=>{DS.delete(_)}},onPopoverClosed:(_)=>{return XS.add(_),()=>{XS.delete(_)}},setStatusControls:(_)=>{if(G?.features?.statusControls!==!0)return Promise.reject(new U("UNSUPPORTED","This host does not support status controls."));if(!a_(_))return Promise.reject(new U("HOST_REJECTED","Status controls must have unique bounded ids and valid selected options."));return Z({...z,type:"status-controls",id:P(C),payload:{controls:_}})},openPopover:(_)=>{if(G?.features?.popovers!==!0)return Promise.reject(new U("UNSUPPORTED","This host does not support popovers."));if(!sS(_))return Promise.reject(new U("HOST_REJECTED","Popover requests need bounded geometry and JSON data."));return Z({...z,type:"popover-open",id:P(C),payload:_})},closePopover:v_,setPopoverAnchorActive:u_,onResolve:(_)=>{return TS=_,()=>{if(TS===_)TS=null}},toast:(_)=>{let T=_.message.trim();if(!T||T.length>YS)return Promise.reject(new U("HOST_REJECTED",`Toast message must contain 1 to ${YS} characters.`));if(_.copy&&_.copy!==!0&&(!_.copy.text.length||_.copy.text.length>ZS))return Promise.reject(new U("HOST_REJECTED",`Toast copy text must contain 1 to ${ZS} characters.`));return Z({channel:X,v:I,type:"toast",id:P(C),payload:{..._,message:T}})},openUrl:(_)=>Z({channel:X,v:I,type:"open-url",id:P(C),payload:{url:_}}),openCommit:(_)=>T_(_)?Z({channel:X,v:I,type:"open-commit",id:P(C),payload:{sha:_}}):Promise.reject(new U("HOST_REJECTED","Commit id must be 7 to 64 hex characters.")),answerBlock:(_)=>Z({channel:X,v:I,type:"block-answer",id:P(C),payload:{text:_.trim().slice(0,eS)}}),openSurface:(_,T)=>Z({channel:X,v:I,type:"open-surface",id:P(C),payload:T?.tab===void 0?{surfaceId:_}:{surfaceId:_,tab:T.tab}}),writeClipboard:(_)=>Z({channel:X,v:I,type:"clipboard-write",id:P(C),payload:{text:_}}),compose:(_)=>Z({channel:X,v:I,type:"compose",id:P(C),payload:_}),attach:(_)=>Z({channel:X,v:I,type:"attach",id:P(C),payload:i(_)}),startSession:async(_)=>{if(_.projectId!==void 0)b(_.projectId);let T=_.worktree;if(T&&T!==!0)if(T.kind==="existing")b(T.directory);else{if(T.name!==void 0)b(T.name,200);if(T.baseBranch!==void 0)b(T.baseBranch,200)}let R=await k({channel:X,v:I,type:"start-session",id:P(C),payload:M_(_)},S.requestTimeoutMs??180000);if(!S_(R))throw new U("HOST_REJECTED","Host did not return a session.");return R},prompt:(_)=>k({channel:X,v:I,type:"prompt",id:P(C),payload:G_(_)}).then((T)=>{if(!__(T))throw new U("HOST_REJECTED","Host did not return a prompt result.");return T}),sessionLink:(_)=>Z({channel:X,v:I,type:"session-link",id:P(C),payload:i(_)}),close:()=>Z({channel:X,v:I,type:"close",id:P(C)}),oauthStart:()=>Z({channel:X,v:I,type:"oauth-start",id:P(C)}),oauthDisconnect:()=>Z({channel:X,v:I,type:"oauth-disconnect",id:P(C)}),request:(_)=>(jS(_.path)?k({channel:X,v:I,type:"request",id:P(C),payload:_}):QT()).then((T)=>{if(!kS(T))throw new U("HOST_REJECTED","Host request result was empty.");return T}),serviceRequest:(_)=>(jS(_.path)?k({channel:X,v:I,type:"service-request",id:P(C),payload:_}):QT()).then((T)=>{if(!kS(T))throw new U("HOST_REJECTED","Host service request result was empty.");return T}),serviceStatus:()=>k({channel:X,v:I,type:"service-status",id:P(C)}).then((_)=>{if(!C_(_))throw new U("HOST_REJECTED","Host did not return service status.");return _}),readFile:(_)=>(s(_)?k({channel:X,v:I,type:"file-read",id:P(C),payload:{path:_}}):HS()).then((T)=>{if(!P_(T))throw new U("HOST_REJECTED","Host did not return file content.");return T}),writeFile:(_,T)=>{if(!s(_))return HS();if(T.length>fS)return Promise.reject(new U("FILE_TOO_LARGE",`Content is over ${fS} characters.`));return k({channel:X,v:I,type:"file-write",id:P(C),payload:{path:_,content:T}}).then((R)=>{if(!D_(R))throw new U("HOST_REJECTED","Host did not confirm the write.");return R})},listDir:(_)=>(s(_)?k({channel:X,v:I,type:"file-list",id:P(C),payload:{path:_}}):HS()).then((T)=>{if(!X_(T))throw new U("HOST_REJECTED","Host did not return directory entries.");return T}),stat:(_)=>(s(_)?k({channel:X,v:I,type:"file-stat",id:P(C),payload:{path:_}}):HS()).then((T)=>{if(!I_(T))throw new U("HOST_REJECTED","Host did not return file status.");return T}),generate:(_)=>{let T=_.prompt.trim(),R=_.system?.trim();if(T.length===0||T.length>JS)return Promise.reject(new U("HOST_REJECTED",`Prompt must be 1 to ${JS} characters.`));if(R!==void 0&&(R.length===0||R.length>KS))return Promise.reject(new U("HOST_REJECTED",`System prompt must be 1 to ${KS} characters.`));let M=_.maxOutputTokens===void 0?void 0:Math.min(O_,Math.max(1,Math.floor(_.maxOutputTokens)));if(M!==void 0&&!Number.isFinite(M))return Promise.reject(new U("HOST_REJECTED","maxOutputTokens must be a number."));let W={prompt:T};if(R!==void 0)W.system=R;if(M!==void 0)W.maxOutputTokens=M;return k({channel:X,v:I,type:"generate",id:P(C),payload:W},S.requestTimeoutMs??R_).then((B)=>{if(!V_(B))throw new U("HOST_REJECTED","Host did not return generated text.");return B})},onLateGenerateResult:(_)=>{l.add(_);for(let T of mS.splice(0))Q([_],T);return x_(),()=>{l.delete(_)}},setBadge:(_)=>Z({channel:X,v:I,type:"badge",id:P(C),payload:{count:U_(_)}}),setHeight:(_)=>Z({channel:X,v:I,type:"resize",id:P(C),payload:{height:A_(_)}}),onFileOpen:(_)=>{if(IS.add(_),!cS)cS=!0,E.addEventListener("keydown",q_,!0);if(RS)_(RS);return()=>{IS.delete(_)}},onFileSnapshot:(_)=>{return OS=_,()=>{if(OS===_)OS=null}},onFileSaved:(_)=>{return VS.add(_),()=>{VS.delete(_)}},reportFileChange:(_)=>vS({...z,type:"file-change",payload:{dirty:_.dirty,edited:_.edited}}),requestFileSave:y_,reportFileUnsupported:()=>vS({...z,type:"file-unsupported"}),dispose:()=>{for(let _ of a.keys())w({...z,type:"workspace-unsubscribe",id:P(C),payload:{subscriptionId:_}});a.clear();for(let _ of r.keys())w({...z,type:"shells-unsubscribe",id:P(C),payload:{subscriptionId:_}});if(r.clear(),g=!0,TS=null,ES=null,OS=null,IS.clear(),VS.clear(),cS)E.removeEventListener("keydown",q_,!0);E.removeEventListener("message",b_),E.removeEventListener("keydown",g_,!0),E.removeEventListener("pointerover",BS),E.removeEventListener("pointermove",BS),E.removeEventListener("pointerout",h_),E.removeEventListener("focus",m_),E.removeEventListener("blur",c_);for(let _ of o.values())clearTimeout(_.timer),_.reject(new U("HOST_UNAVAILABLE","Host client was disposed."));o.clear(),D.clear(),L.clear(),N.clear(),V.clear(),q.clear(),v.clear(),_S.clear(),CS.clear(),PS.clear(),DS.clear(),XS.clear(),l.clear(),mS.length=0}}};var LT=["browser.open","browser.snapshot","browser.click","browser.type","browser.select","browser.scroll","browser.back","browser.forward","browser.inspect","browser.capture","browser.resize","browser.close"];var jE=new Set(LT);var $T=["none","agent","user"];var HE=new Set($T);var dT=[["--oc-bg","background"],["--oc-elevated","elevated"],["--oc-fg","foreground"],["--oc-muted","muted"],["--oc-subtle","subtle"],["--oc-border","border"],["--oc-hover","hover"],["--oc-selection","selection"],["--oc-focus","focus"],["--oc-primary","primary"],["--oc-muted-surface","mutedSurface"],["--oc-elevated-fg","elevatedForeground"],["--oc-active","active"],["--oc-selection-fg","selectionForeground"],["--oc-primary-fg","primaryForeground"],["--oc-primary-text","primaryText"],["--oc-success-text","successText"],["--oc-warning-text","warningText"],["--oc-error-text","errorText"],["--oc-info-text","infoText"],["--oc-success","success"],["--oc-warning","warning"],["--oc-error","error"],["--oc-info","info"],["--oc-font","font"],["--oc-mono","mono"],["--oc-radius","radius"],["--surface-background","background"],["--surface-elevated","elevated"],["--surface-foreground","foreground"],["--surface-muted-foreground","muted"],["--surface-subtle","subtle"],["--interactive-border","border"],["--interactive-hover","hover"],["--interactive-selection","selection"],["--interactive-focus-ring","focus"],["--primary","primary"],["--surface-muted","mutedSurface"],["--surface-elevated-foreground","elevatedForeground"],["--interactive-active","active"],["--interactive-selection-foreground","selectionForeground"],["--primary-foreground","primaryForeground"],["--primary-text","primaryText"],["--success-text","successText"],["--warning-text","warningText"],["--error-text","errorText"],["--info-text","infoText"],["--status-success","success"],["--status-warning","warning"],["--status-error","error"],["--status-info","info"],["--font-sans","font"],["--font-mono","mono"],["--radius","radius"]],pT=[["--oc-syntax-keyword","--syntax-keyword","syntaxKeyword"],["--oc-syntax-string","--syntax-string","syntaxString"],["--oc-syntax-number","--syntax-number","syntaxNumber"],["--oc-syntax-function","--syntax-function","syntaxFunction"],["--oc-syntax-type","--syntax-type","syntaxType"],["--oc-syntax-comment","--syntax-comment","syntaxComment"],["--oc-syntax-variable","--syntax-variable","syntaxVariable"],["--oc-syntax-operator","--syntax-operator","syntaxOperator"]],YT=(S,E)=>{E.style.colorScheme=S.mode;for(let[O,A]of dT)E.style.setProperty(O,S.tokens[A]);for(let[O,A,D]of pT){let L=S.tokens[D]??"";E.style.setProperty(O,L),E.style.setProperty(A,L)}E.style.setProperty("font-family",S.tokens.font),E.style.setProperty("font-size","0.875rem"),E.style.setProperty("line-height","1.45"),E.style.setProperty("color",S.tokens.foreground)},W_=(S,E)=>{if(YT(S.theme,E),E.dataset)E.dataset.ocSurface=S.surface,E.dataset.ocTheme=S.theme.mode};var lT={"surface-background":"bg","surface-elevated":"elevated","surface-elevated-foreground":"elevated-fg","surface-foreground":"fg","surface-muted-foreground":"muted","surface-muted":"muted-surface","surface-subtle":"subtle","interactive-border":"border","interactive-hover":"hover","interactive-active":"active","interactive-selection":"selection","interactive-selection-foreground":"selection-fg","interactive-focus-ring":"focus",primary:"primary","primary-foreground":"primary-fg","primary-text":"primary-text","success-text":"success-text","warning-text":"warning-text","error-text":"error-text","info-text":"info-text","status-success":"success","status-warning":"warning","status-error":"error","status-info":"info","font-sans":"font","font-mono":"mono",radius:"radius"},F=(S,E)=>`var(--${S}, var(--oc-${lT[S]}, ${E}))`,c=F("surface-background","transparent"),bS=F("surface-elevated","transparent"),t=F("surface-elevated-foreground","inherit"),x=F("surface-foreground","inherit"),$=F("surface-muted-foreground","gray"),oT=F("surface-muted","transparent"),d=F("interactive-border","currentColor"),H=F("interactive-hover","transparent"),p=F("interactive-active","transparent"),F_=F("interactive-selection","transparent"),Q_=F("interactive-selection-foreground","inherit"),m=F("primary","currentColor"),L_=F("primary-text","inherit"),$_=F("error-text","inherit"),aT=F("font-sans","inherit"),Y_=F("font-mono","monospace"),JT=F("radius","9px"),Z_=`calc(${JT} - 2px)`,ZT=`calc(${JT} - 4px)`,Y=(S,E,O="transparent")=>`color-mix(in srgb, ${S} ${E}%, ${O})`,zT=`background-image: linear-gradient(${H}, ${H});`,z_=(S,E="0.5px")=>`box-shadow: inset 0 0 0 ${E} ${S}, var(--oc-sdk-field-lift);`,f_="border-color: var(--oc-sdk-edge); box-shadow: var(--oc-sdk-raised-lift);",fT="box-shadow: var(--oc-sdk-lit);",J_=`inset 0 0.5px 0 0 ${Y(x,8)}, 0 1px 2px 0 rgb(0 0 0 / 0.4)`,rT=`
:root {
  --oc-sdk-edge: ${Y(x,16)};
  --oc-sdk-field-bg: ${bS};
  --oc-sdk-raised-bg: ${c};
  --oc-sdk-field-lift: inset 0 1px 2px 0 rgb(0 0 0 / 0.04);
  --oc-sdk-raised-lift: 0 1px 1.5px 0 rgb(0 0 0 / 0.08);
  --oc-sdk-lit: inset 0 1px 0 0 rgb(255 255 255 / 0.2), 0 1px 1.5px 0 rgb(0 0 0 / 0.1);
  --oc-sdk-float-edge: rgb(0 0 0 / 0.14);
  --oc-sdk-float: inset 0 1px 0 0 rgb(255 255 255 / 0.7), 0 1px 2px -0.5px rgb(0 0 0 / 0.06), 0 4px 8px -2px rgb(0 0 0 / 0.08), 0 12px 20px -4px rgb(0 0 0 / 0.06);
}
:root[data-oc-theme="dark"] {
  --oc-sdk-edge: ${Y(x,14)};
  --oc-sdk-field-bg: ${Y(c,50,bS)};
  --oc-sdk-raised-bg: ${bS};
  --oc-sdk-field-lift: ${J_};
  --oc-sdk-raised-lift: ${J_};
  --oc-sdk-lit: ${J_};
  --oc-sdk-float-edge: rgb(0 0 0 / 0.55);
  --oc-sdk-float: inset 0 1px 0 0 rgb(255 255 255 / 0.04), inset 0 0 0 0.5px rgb(255 255 255 / 0.08), 0 8px 16px 0 rgb(0 0 0 / 0.25), 0 4px 8px 0 rgb(0 0 0 / 0.25);
}`,xS=(S)=>{let E=F(`status-${S}`,"currentColor");return`
.oc-sdk[data-tone="${S}"], .oc-sdk [data-tone="${S}"] { --oc-sdk-tone: ${E}; --oc-sdk-tone-text: ${F(`${S}-text`,"inherit")}; }`},nT=`
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
`,KT=`${rT}
.oc-sdk { color: ${x}; font-family: ${aT}; }
.oc-sdk :focus-visible, .oc-sdk:focus-visible { outline: none; }
.oc-sdk :where(button, a[href], [role="button"], [role="tab"], [role="option"]):focus-visible, button.oc-sdk:focus-visible { ${zT} }
.oc-sdk-mono { font-family: ${Y_}; }
.oc-sdk-muted { color: ${$}; }
${xS("success")}${xS("warning")}${xS("error")}${xS("info")}
.oc-sdk[data-tone="primary"], .oc-sdk [data-tone="primary"] { --oc-sdk-tone: ${m}; --oc-sdk-tone-text: ${L_}; }

.oc-sdk-btn { border-radius: ${Z_}; transition: background 150ms ease-out, color 150ms ease-out; }
.oc-sdk-btn[data-size="xs"] { border-radius: ${ZT}; }
.oc-sdk-btn[data-variant="default"] { color: ${L_}; background: ${Y(m,10,c)}; border-color: ${Y(m,12)}; ${fT} }
.oc-sdk-btn[data-variant="default"]:hover { background: ${Y(m,16,c)}; }
.oc-sdk-btn[data-variant="default"]:active { background: ${Y(m,22,c)}; box-shadow: none; }
.oc-sdk-btn[data-variant="secondary"] { background: ${oT}; color: var(--oc-fg); }
.oc-sdk-btn[data-variant="secondary"]:hover { background-image: linear-gradient(${H}, ${H}); }
.oc-sdk-btn[data-variant="secondary"]:active { background-image: linear-gradient(${p}, ${p}); }
.oc-sdk-btn[data-variant="outline"] { background: var(--oc-sdk-raised-bg); color: ${t}; ${f_} }
.oc-sdk-btn[data-variant="outline"]:hover { background-image: linear-gradient(${H}, ${H}); }
.oc-sdk-btn[data-variant="outline"]:active { background-image: linear-gradient(${p}, ${p}); box-shadow: none; }
.oc-sdk-btn[data-variant="ghost"] { background: transparent; }
.oc-sdk-btn[data-variant="ghost"]:hover { background: ${H}; }
.oc-sdk-btn[data-variant="ghost"]:active { background: ${p}; }
.oc-sdk-btn[data-variant="destructive"] { --oc-sdk-tone: ${F("status-error","red")}; color: ${$_}; background: ${Y("var(--oc-sdk-tone)",7,c)}; border-color: ${Y("var(--oc-sdk-tone)",12)}; ${fT} }
.oc-sdk-btn[data-variant="destructive"]:hover { background: ${Y("var(--oc-sdk-tone)",9,c)}; }
.oc-sdk-btn[data-variant="destructive"]:active { background: ${Y("var(--oc-sdk-tone)",11,c)}; box-shadow: none; }

.oc-sdk-field-note { color: ${$}; }
.oc-sdk-field[data-invalid="true"] .oc-sdk-field-note { color: ${$_}; }
.oc-sdk-input { border-radius: ${Z_}; background: var(--oc-sdk-field-bg); color: ${t}; ${z_("var(--oc-sdk-edge)")} transition: background 150ms ease-out; }
.oc-sdk-input::placeholder { color: ${$}; }
.oc-sdk-input:hover:not(:focus) { background-image: linear-gradient(${H}, ${H}); }
.oc-sdk-input:focus, .oc-sdk-input:focus-visible { ${z_(Y(x,26),"1px")} }
.oc-sdk-field[data-invalid="true"] .oc-sdk-input, .oc-sdk-field[data-invalid="true"] .oc-sdk-input:focus { ${z_(F("status-error","red"),"1px")} }
.oc-sdk-input[data-mono="true"] { font-family: ${Y_}; }

.oc-sdk-search-icon { color: ${$}; }
.oc-sdk-search[data-active="true"] .oc-sdk-search-icon { color: ${m}; }
.oc-sdk-search-clear { border-radius: ${ZT}; color: ${$}; }
.oc-sdk-search-clear:hover { background: ${H}; color: ${x}; }

.oc-sdk-trigger { border-radius: ${Z_}; background: var(--oc-sdk-raised-bg); color: ${t}; ${f_} transition: background 150ms ease-out; }
.oc-sdk-trigger:hover { background-image: linear-gradient(${H}, ${H}); }
.oc-sdk-trigger[aria-expanded="true"] { background-image: linear-gradient(${p}, ${p}); }
.oc-sdk-trigger-value[data-empty="true"] { color: ${$}; }
.oc-sdk-trigger-chevron { color: ${$}; }
/* The app's floating level: the glass edge (a hairline ring and a lit top line, dark outside and light inside in dark themes) over soft shadows. The outer ring is the border, over the page like the app's. */
.oc-sdk-popup { --surface-foreground: ${t}; border-color: var(--oc-sdk-float-edge); border-radius: 12px; background: ${bS}; background-clip: padding-box; color: ${t}; box-shadow: var(--oc-sdk-float); }
.oc-sdk-option { border-radius: 8px; }
.oc-sdk-option[data-active="true"] { background: ${H}; }
/* A selected option shows a check mark in the text colour, like the app's own pickers. Options without the mark come
   from bundles built before it existed and keep the selection fill as their only sign of the choice. */
.oc-sdk-option[aria-selected="true"]:not([data-mark]) { background: ${F_}; color: ${Q_}; }
.oc-sdk-option-check { color: ${x}; }
.oc-sdk-option[data-destructive="true"] { color: ${$_}; }
.oc-sdk-option[data-destructive="true"][data-active="true"] { background: ${Y(F("status-error","red"),10)}; }
.oc-sdk-option-hint { color: ${$}; }
.oc-sdk-popup-empty { color: ${$}; }

/* Checked stays neutral: the mark carries the state, and the primary colour stays with primary actions. */
.oc-sdk-check-box { border-color: ${d}; border-radius: 4px; color: ${x}; transition: border-color 150ms ease-out; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-box { border-color: ${Y(x,60,d)}; }
.oc-sdk-check-thumb { border-radius: 9999px; background: ${d}; transition: background 150ms ease-out; }
.oc-sdk-check-thumb::after { border-radius: 9999px; background: ${c}; transition: transform 150ms ease-out; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-thumb { background: ${m}; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-thumb::after { transform: translateX(16px); }
.oc-sdk-check:focus-visible { box-shadow: none; }
.oc-sdk-check:focus-visible .oc-sdk-check-box, .oc-sdk-check:focus-visible .oc-sdk-check-thumb { ${zT} }
.oc-sdk-check-desc { color: ${$}; }

.oc-sdk-tabs { border-radius: 10px; }
.oc-sdk-tabs[data-track="true"] { background: ${Y(x,4)}; box-shadow: inset 0 1px 2px 0 rgb(0 0 0 / 0.16); }
.oc-sdk-tab { border-radius: 8px; color: ${$}; transition: color 150ms ease-out, background 150ms ease-out; }
.oc-sdk-tab:hover { color: ${x}; }
.oc-sdk-tab[aria-selected="true"] { color: ${Q_}; background: ${F_}; border-color: ${d}; }
.oc-sdk-tabs[data-track="true"] .oc-sdk-tab[aria-selected="true"] { color: ${t}; background: var(--oc-sdk-raised-bg); ${f_} }
.oc-sdk-tab-count { color: ${$}; }

/* The app's neutral badge: a step of the text colour, the same in every theme. */
.oc-sdk-badge { border-radius: 9999px; background: ${Y(x,6)}; color: ${$}; }
.oc-sdk-badge[data-tone] { color: var(--oc-sdk-tone-text, var(--oc-sdk-tone)); background: ${Y("var(--oc-sdk-tone)",15)}; }

.oc-sdk-row { border-radius: 6px; transition: background 120ms ease-out; }
.oc-sdk-row:hover, .oc-sdk-row[data-active="true"] { background: ${H}; }
.oc-sdk-row[aria-selected="true"] { background: ${F_}; color: ${Q_}; }
.oc-sdk-row-lead { font-family: ${Y_}; color: ${$}; }
.oc-sdk-row-sub { color: ${$}; }
.oc-sdk-row-meta { color: ${$}; }
.oc-sdk-row[aria-selected="true"] .oc-sdk-row-lead, .oc-sdk-row[aria-selected="true"] .oc-sdk-row-sub, .oc-sdk-row[aria-selected="true"] .oc-sdk-row-meta { color: inherit; opacity: .75; }
.oc-sdk-list-empty { color: ${$}; }

.oc-sdk-empty-body { color: ${$}; }

.oc-sdk-spinner { color: ${$}; }
.oc-sdk-spinner-ring { border-color: ${d}; border-top-color: ${m}; border-radius: 9999px; }

/* Set apart by its tint alone, like the app's banners. */
.oc-sdk-banner { border-color: transparent; border-radius: 8px; background: ${Y("var(--oc-sdk-tone)",10)}; }
.oc-sdk-banner-title { color: var(--oc-sdk-tone-text, var(--oc-sdk-tone)); }
.oc-sdk-banner-body { color: ${$}; }

.oc-sdk-separator { color: ${$}; }
.oc-sdk-separator::before, .oc-sdk-separator::after { background: ${Y(d,40)}; }

.oc-sdk-progress-label { color: ${$}; }
/* The app's progress: a groove a step of the text colour, green once done. Older bundles mark done only through aria-valuenow. */
.oc-sdk-progress-track { border-radius: 9999px; background: ${Y(x,6)}; }
.oc-sdk-progress-fill { border-radius: 9999px; background: var(--oc-sdk-tone, ${m}); }
.oc-sdk-progress-track[aria-valuenow="100"] > .oc-sdk-progress-fill:not([data-tone]) { background: ${F("status-success","currentColor")}; }
.oc-sdk-progress[data-done="true"] .oc-sdk-progress-value { color: ${F("success-text","inherit")}; }

.oc-sdk-text a { color: ${L_}; text-decoration: underline; text-underline-offset: 2px; }
.oc-sdk-text img { border-radius: 8px; border: 1px solid ${Y(d,60)}; }
`,K=`
${pS}
${nT}
${KT}`;var jT="oc-sdk-ui-style",e=(S)=>{while(S.firstChild)S.removeChild(S.firstChild)},j=(S)=>{let E=document.getElementById(jT);if(E instanceof HTMLStyleElement){if(E.textContent!==S)E.textContent=S;return}lS(document);let O=document.createElement("style");O.id=jT,O.textContent=S,document.head.appendChild(O)},J=(S,E)=>{let O=document.createElement(S);if(E)O.className=E;return O},u=(S)=>{let E=J("button",S);return E.type="button",E},y=(S,E)=>{let O=E??"";if(S.textContent!==O)S.textContent=O};var iT=()=>{let S=document.createElement("span");return S.className="oc-sdk-spinner-ring",S.setAttribute("aria-hidden","true"),S},SS=(S,E)=>{j(K);let O=E,A=u("oc-sdk oc-sdk-btn"),D=iT(),L=document.createElement("span");A.append(L),S.append(A);let N=()=>{if(A.dataset.variant=O.variant??"default",A.dataset.size=O.size??"default",A.disabled=Boolean(O.disabled)||Boolean(O.loading),A.dataset.loading=O.loading?"true":"false",A.setAttribute("aria-busy",O.loading?"true":"false"),O.loading&&D.parentNode!==A)A.prepend(D);else if(!O.loading&&D.parentNode===A)D.remove();y(L,O.label)},V=()=>{if(O.disabled||O.loading)return;O.onClick()};return A.addEventListener("click",V),N(),{update:(q)=>{O={...O,...q},N()},dispose:()=>{A.removeEventListener("click",V),A.remove()}}};var _E=/(!?)\[([^\]]*)\]\((https?:\/\/[^)\s]+)\)/g,TE=(S)=>{try{let E=new URL(S);return E.protocol==="http:"||E.protocol==="https:"}catch{return!1}},kT=(S)=>{let E=[],O=0;for(let A of S.matchAll(_E)){let D=A.index??0;if(D>O)E.push({kind:"text",text:S.slice(O,D)});let L=A[1]??"",N=(A[2]??"").trim(),V=A[3]??"";if(!TE(V))E.push({kind:"text",text:A[0]});else if(L==="!")E.push({kind:"image",src:V,alt:N});else E.push({kind:"link",href:V,label:N||V});O=D+A[0].length}if(O<S.length)E.push({kind:"text",text:S.slice(O)});return E},K_=(S,E)=>{j(K);let O=E,A=J("div","oc-sdk oc-sdk-text");S.append(A);let D=(N)=>{if(!(N.target instanceof HTMLAnchorElement)||!O.onOpenUrl)return;N.preventDefault(),O.onOpenUrl(N.target.href)},L=()=>{e(A);for(let N of kT(O.text))if(N.kind==="text")A.append(document.createTextNode(N.text));else if(N.kind==="link"){let V=J("a");V.href=N.href,V.rel="noopener noreferrer",V.target="_blank",V.textContent=N.label,A.append(V)}else{let V=J("img");V.src=N.src,V.alt=N.alt,V.loading="lazy",V.referrerPolicy="no-referrer",A.append(V)}};return A.addEventListener("click",D),L(),{update:(N)=>{O={...O,...N},L()},dispose:()=>{A.removeEventListener("click",D),A.remove()}}};var j_=B_(),hS=document.querySelector("#root");if(!hS)throw Error("Agent Desk: missing root");var wT=document.createElement("div"),k_=(S)=>{let E=document.createElement("div");E.textContent=S,wT.prepend(E)},HT=!1;j_.onReady((S)=>{if(W_(S,document.documentElement),HT)return;HT=!0,K_(hS,{text:"Agent Desk"}),SS(hS,{label:"Start a session",onClick:()=>{j_.serviceRequest({method:"POST",path:"/start",body:JSON.stringify({directory:S.directory})}).then((E)=>k_(E.body)).catch(()=>k_("The service did not answer."))}}),hS.append(wT)});j_.onServiceEvent(({topic:S,data:E})=>k_(`${S}: ${JSON.stringify(E)}`));})();
