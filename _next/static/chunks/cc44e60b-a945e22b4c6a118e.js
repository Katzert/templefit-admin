"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[972],{8208:function(e,t,r){r.d(t,{$:function(){return tw},A:function(){return uc},B:function(){return r3},C:function(){return tO},D:function(){return nC},F:function(){return uo},H:function(){return uh},N:function(){return i8},P:function(){return ap},Q:function(){return nV},R:function(){return Q},S:function(){return rn},T:function(){return P},Y:function(){return x},Z:function(){return n$},_:function(){return g},a:function(){return k},a0:function(){return r4},a1:function(){return nz},a2:function(){return nq},a5:function(){return ur},a9:function(){return nD},a_:function(){return uu},af:function(){return un},aq:function(){return tG},b:function(){return O},c:function(){return eU},d:function(){return I},e:function(){return S},f:function(){return t9},g:function(){return nF},h:function(){return nQ},i:function(){return tU},j:function(){return nW},k:function(){return t5},l:function(){return t8},n:function(){return t7},o:function(){return re},p:function(){return X},q:function(){return t4},r:function(){return eJ},s:function(){return eC},t:function(){return tD},u:function(){return t3},v:function(){return G},w:function(){return Y},y:function(){return J},z:function(){return ul}});var n,s,i,a,o=r(1480),u=r(9074),l=r(6552),c=r(3693),h=r(4575),d=r(834);r(9792);var m=r(8262).lW;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class f{constructor(e){this.uid=e}isAuthenticated(){return null!=this.uid}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(e){return e.uid===this.uid}}f.UNAUTHENTICATED=new f(null),f.GOOGLE_CREDENTIALS=new f("google-credentials-uid"),f.FIRST_PARTY=new f("first-party-uid"),f.MOCK_USER=new f("mock-user");/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let p="12.15.0";function g(e){p=e}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let y=new c.Yd("@firebase/firestore");function w(){return y.logLevel}function v(e,...t){if(y.logLevel<=c.in.DEBUG){let r=t.map(T);y.debug(`Firestore (${p}): ${e}`,...r)}}function _(e,...t){if(y.logLevel<=c.in.ERROR){let r=t.map(T);y.error(`Firestore (${p}): ${e}`,...r)}}function E(e,...t){if(y.logLevel<=c.in.WARN){let r=t.map(T);y.warn(`Firestore (${p}): ${e}`,...r)}}function T(e){if("string"==typeof e)return e;try{return JSON.stringify(e)}catch(t){return e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function x(e,t,r){let n="Unexpected state";"string"==typeof t?n=t:r=t,N(e,n,r)}function N(e,t,r){let n=`FIRESTORE (${p}) INTERNAL ASSERTION FAILED: ${t} (ID: ${e.toString(16)})`;if(void 0!==r)try{n+=" CONTEXT: "+JSON.stringify(r)}catch(e){n+=" CONTEXT: "+r}throw _(n),Error(n)}function b(e,t,r,n){let s="Unexpected state";"string"==typeof r?s=r:n=r,e||N(t,s,n)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let S={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class I extends u.ZR{constructor(e,t){super(e,t),this.code=e,this.message=t,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class V{constructor(){this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class C{constructor(e,t){this.user=t,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${e}`)}}class A{getToken(){return Promise.resolve(null)}invalidateToken(){}start(e,t){e.enqueueRetryable(()=>t(f.UNAUTHENTICATED))}shutdown(){}}class D{constructor(e){this.token=e,this.changeListener=null}getToken(){return Promise.resolve(this.token)}invalidateToken(){}start(e,t){this.changeListener=t,e.enqueueRetryable(()=>t(this.token.user))}shutdown(){this.changeListener=null}}class k{constructor(e){this.t=e,this.currentUser=f.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(e,t){b(void 0===this.o,42304);let r=this.i,n=e=>this.i!==r?(r=this.i,t(e)):Promise.resolve(),s=new V;this.o=()=>{this.i++,this.currentUser=this.u(),s.resolve(),s=new V,e.enqueueRetryable(()=>n(this.currentUser))};let i=()=>{let t=s;e.enqueueRetryable(async()=>{await t.promise,await n(this.currentUser)})},a=e=>{v("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=e,this.o&&(this.auth.addAuthTokenListener(this.o),i())};this.t.onInit(e=>a(e)),setTimeout(()=>{if(!this.auth){let e=this.t.getImmediate({optional:!0});e?a(e):(v("FirebaseAuthCredentialsProvider","Auth not yet detected"),s.resolve(),s=new V)}},0),i()}getToken(){let e=this.i,t=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(t).then(t=>this.i!==e?(v("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):t?(b("string"==typeof t.accessToken,31837,{l:t}),new C(t.accessToken,this.currentUser)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.o&&this.auth.removeAuthTokenListener(this.o),this.o=void 0}u(){let e=this.auth&&this.auth.getUid();return b(null===e||"string"==typeof e,2055,{h:e}),new f(e)}}class L{constructor(e,t,r){this.T=e,this.P=t,this.R=r,this.type="FirstParty",this.user=f.FIRST_PARTY,this.I=new Map}A(){return this.R?this.R():null}get headers(){this.I.set("X-Goog-AuthUser",this.T);let e=this.A();return e&&this.I.set("Authorization",e),this.P&&this.I.set("X-Goog-Iam-Authorization-Token",this.P),this.I}}class R{constructor(e,t,r){this.T=e,this.P=t,this.R=r}getToken(){return Promise.resolve(new L(this.T,this.P,this.R))}start(e,t){e.enqueueRetryable(()=>t(f.FIRST_PARTY))}shutdown(){}invalidateToken(){}}class U{constructor(e){this.value=e,this.type="AppCheck",this.headers=new Map,e&&e.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class O{constructor(e,t){this.V=t,this.forceRefresh=!1,this.appCheck=null,this.m=null,this.p=null,(0,o.rh)(e)&&e.settings.appCheckToken&&(this.p=e.settings.appCheckToken)}start(e,t){b(void 0===this.o,3512);let r=e=>{null!=e.error&&v("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${e.error.message}`);let r=e.token!==this.m;return this.m=e.token,v("FirebaseAppCheckTokenProvider",`Received ${r?"new":"existing"} token.`),r?t(e.token):Promise.resolve()};this.o=t=>{e.enqueueRetryable(()=>r(t))};let n=e=>{v("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=e,this.o&&this.appCheck.addTokenListener(this.o)};this.V.onInit(e=>n(e)),setTimeout(()=>{if(!this.appCheck){let e=this.V.getImmediate({optional:!0});e?n(e):v("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}},0)}getToken(){if(this.p)return Promise.resolve(new U(this.p));let e=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(e).then(e=>e?(b("string"==typeof e.token,44558,{tokenResult:e}),this.m=e.token,new U(e.token)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.o&&this.appCheck.removeTokenListener(this.o),this.o=void 0}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class P{static newId(){let e=62*Math.floor(256/62),t="";for(;t.length<20;){let r=/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function(e){let t="undefined"!=typeof self&&(self.crypto||self.msCrypto),r=new Uint8Array(40);if(t&&"function"==typeof t.getRandomValues)t.getRandomValues(r);else for(let e=0;e<40;e++)r[e]=Math.floor(256*Math.random());return r}(0);for(let n=0;n<r.length;++n)t.length<20&&r[n]<e&&(t+="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789".charAt(r[n]%62))}return t}}function M(e,t){return e<t?-1:e>t?1:0}function F(e,t){let r=Math.min(e.length,t.length);for(let n=0;n<r;n++){let r=e.charAt(n),s=t.charAt(n);if(r!==s)return $(r)===$(s)?M(r,s):$(r)?1:-1}return M(e.length,t.length)}function $(e){let t=e.charCodeAt(0);return t>=55296&&t<=57343}function B(e,t,r){return e.length===t.length&&e.every((e,n)=>r(e,t[n]))}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let q="__name__";class z{constructor(e,t,r){void 0===t?t=0:t>e.length&&x(637,{offset:t,range:e.length}),void 0===r?r=e.length-t:r>e.length-t&&x(1746,{length:r,range:e.length-t}),this.segments=e,this.offset=t,this.len=r}get length(){return this.len}isEqual(e){return 0===z.comparator(this,e)}child(e){let t=this.segments.slice(this.offset,this.limit());return e instanceof z?e.forEach(e=>{t.push(e)}):t.push(e),this.construct(t)}limit(){return this.offset+this.length}popFirst(e){return e=void 0===e?1:e,this.construct(this.segments,this.offset+e,this.length-e)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(e){return this.segments[this.offset+e]}isEmpty(){return 0===this.length}isPrefixOf(e){if(e.length<this.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}isImmediateParentOf(e){if(this.length+1!==e.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}forEach(e){for(let t=this.offset,r=this.limit();t<r;t++)e(this.segments[t])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(e,t){let r=Math.min(e.length,t.length);for(let n=0;n<r;n++){let r=z.compareSegments(e.get(n),t.get(n));if(0!==r)return r}return M(e.length,t.length)}static compareSegments(e,t){let r=z.isNumericId(e),n=z.isNumericId(t);return r&&!n?-1:!r&&n?1:r&&n?z.extractNumericId(e).compare(z.extractNumericId(t)):F(e,t)}static isNumericId(e){return e.startsWith("__id")&&e.endsWith("__")}static extractNumericId(e){return l.z8.fromString(e.substring(4,e.length-2))}}class Q extends z{construct(e,t,r){return new Q(e,t,r)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}toStringWithLeadingSlash(){return`/${this.canonicalString()}`}toUriEncodedString(){return this.toArray().map(encodeURIComponent).join("/")}static fromString(...e){let t=[];for(let r of e){if(r.indexOf("//")>=0)throw new I(S.INVALID_ARGUMENT,`Invalid segment (${r}). Paths must not contain // in them.`);t.push(...r.split("/").filter(e=>e.length>0))}return new Q(t)}static emptyPath(){return new Q([])}}let j=/^[_a-zA-Z][_a-zA-Z0-9]*$/;class K extends z{construct(e,t,r){return new K(e,t,r)}static isValidIdentifier(e){return j.test(e)}canonicalString(){return this.toArray().map(e=>(e=e.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),K.isValidIdentifier(e)||(e="`"+e+"`"),e)).join(".")}toString(){return this.canonicalString()}isKeyField(){return 1===this.length&&this.get(0)===q}static keyField(){return new K([q])}static fromServerFormat(e){let t=[],r="",n=0,s=()=>{if(0===r.length)throw new I(S.INVALID_ARGUMENT,`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);t.push(r),r=""},i=!1;for(;n<e.length;){let t=e[n];if("\\"===t){if(n+1===e.length)throw new I(S.INVALID_ARGUMENT,"Path has trailing escape character: "+e);let t=e[n+1];if("\\"!==t&&"."!==t&&"`"!==t)throw new I(S.INVALID_ARGUMENT,"Path has invalid escape sequence: "+e);r+=t,n+=2}else"`"===t?i=!i:"."!==t||i?r+=t:s(),n++}if(s(),i)throw new I(S.INVALID_ARGUMENT,"Unterminated ` in path: "+e);return new K(t)}static emptyPath(){return new K([])}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class G{constructor(e){this.path=e}static fromPath(e){return new G(Q.fromString(e))}static fromName(e){return new G(Q.fromString(e).popFirst(5))}static empty(){return new G(Q.emptyPath())}get collectionGroup(){return this.path.popLast().lastSegment()}hasCollectionId(e){return this.path.length>=2&&this.path.get(this.path.length-2)===e}getCollectionGroup(){return this.path.get(this.path.length-2)}getCollectionPath(){return this.path.popLast()}isEqual(e){return null!==e&&0===Q.comparator(this.path,e.path)}toString(){return this.path.toString()}static comparator(e,t){return Q.comparator(e.path,t.path)}static isDocumentKey(e){return e.length%2==0}static fromSegments(e){return new G(new Q(e.slice()))}}function H(e){if(!G.isDocumentKey(e))throw new I(S.INVALID_ARGUMENT,`Invalid document reference. Document references must have an even number of segments, but ${e} has ${e.length}.`)}function W(e){return"object"==typeof e&&null!==e&&(Object.getPrototypeOf(e)===Object.prototype||null===Object.getPrototypeOf(e))}function Y(e){if(void 0===e)return"undefined";if(null===e)return"null";if("string"==typeof e)return e.length>20&&(e=`${e.substring(0,20)}...`),JSON.stringify(e);if("number"==typeof e||"boolean"==typeof e)return""+e;if("object"==typeof e){if(e instanceof Array)return"an array";{var t;let r=(t=e).constructor?t.constructor.name:null;return r?`a custom ${r} object`:"an object"}}return"function"==typeof e?"a function":x(12329,{type:typeof e})}function J(e,t){if("_delegate"in e&&(e=e._delegate),!(e instanceof t)){if(t.name===e.constructor.name)throw new I(S.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{let r=Y(e);throw new I(S.INVALID_ARGUMENT,`Expected type '${t.name}', but it was: ${r}`)}}return e}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function X(e,t){let r={typeString:e};return t&&(r.value=t),r}function Z(e,t){let r;if(!W(e))throw new I(S.INVALID_ARGUMENT,"JSON must be an object");for(let n in t)if(t[n]){let s=t[n].typeString,i="value"in t[n]?{value:t[n].value}:void 0;if(!(n in e)){r=`JSON missing required field: '${n}'`;break}let a=e[n];if(s&&typeof a!==s){r=`JSON field '${n}' must be a ${s}.`;break}if(void 0!==i&&a!==i.value){r=`Expected '${n}' field to equal '${i.value}'`;break}}if(r)throw new I(S.INVALID_ARGUMENT,r);return!0}class ee{static now(){return ee.fromMillis(Date.now())}static fromDate(e){return ee.fromMillis(e.getTime())}static fromMillis(e){let t=Math.floor(e/1e3);return new ee(t,Math.floor((e-1e3*t)*1e6))}constructor(e,t){if(this.seconds=e,this.nanoseconds=t,t<0||t>=1e9)throw new I(S.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(e<-62135596800||e>=253402300800)throw new I(S.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/1e6}_compareTo(e){return this.seconds===e.seconds?M(this.nanoseconds,e.nanoseconds):M(this.seconds,e.seconds)}isEqual(e){return e.seconds===this.seconds&&e.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{type:ee._jsonSchemaVersion,seconds:this.seconds,nanoseconds:this.nanoseconds}}static fromJSON(e){if(Z(e,ee._jsonSchema))return new ee(e.seconds,e.nanoseconds)}valueOf(){return String(this.seconds- -62135596800).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}}ee._jsonSchemaVersion="firestore/timestamp/1.0",ee._jsonSchema={type:X("string",ee._jsonSchemaVersion),seconds:X("number"),nanoseconds:X("number")};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class et{static fromTimestamp(e){return new et(e)}static min(){return new et(new ee(0,0))}static max(){return new et(new ee(253402300799,999999999))}constructor(e){this.timestamp=e}compareTo(e){return this.timestamp._compareTo(e.timestamp)}isEqual(e){return this.timestamp.isEqual(e.timestamp)}toMicroseconds(){return 1e6*this.timestamp.seconds+this.timestamp.nanoseconds/1e3}toString(){return"SnapshotVersion("+this.timestamp.toString()+")"}toTimestamp(){return this.timestamp}}class er{constructor(e,t,r,n){this.indexId=e,this.collectionGroup=t,this.fields=r,this.indexState=n}}er.UNKNOWN_ID=-1;class en{constructor(e,t,r){this.readTime=e,this.documentKey=t,this.largestBatchId=r}static min(){return new en(et.min(),G.empty(),-1)}static max(){return new en(et.max(),G.empty(),-1)}}class es{constructor(){this.onCommittedListeners=[]}addOnCommittedListener(e){this.onCommittedListeners.push(e)}raiseOnCommittedEvent(){this.onCommittedListeners.forEach(e=>e())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function ei(e){if(e.code!==S.FAILED_PRECONDITION||"The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab."!==e.message)throw e;v("LocalStore","Unexpectedly lost primary lease")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ea{constructor(e){this.nextCallback=null,this.catchCallback=null,this.result=void 0,this.error=void 0,this.isDone=!1,this.callbackAttached=!1,e(e=>{this.isDone=!0,this.result=e,this.nextCallback&&this.nextCallback(e)},e=>{this.isDone=!0,this.error=e,this.catchCallback&&this.catchCallback(e)})}catch(e){return this.next(void 0,e)}next(e,t){return this.callbackAttached&&x(59440),this.callbackAttached=!0,this.isDone?this.error?this.wrapFailure(t,this.error):this.wrapSuccess(e,this.result):new ea((r,n)=>{this.nextCallback=t=>{this.wrapSuccess(e,t).next(r,n)},this.catchCallback=e=>{this.wrapFailure(t,e).next(r,n)}})}toPromise(){return new Promise((e,t)=>{this.next(e,t)})}wrapUserFunction(e){try{let t=e();return t instanceof ea?t:ea.resolve(t)}catch(e){return ea.reject(e)}}wrapSuccess(e,t){return e?this.wrapUserFunction(()=>e(t)):ea.resolve(t)}wrapFailure(e,t){return e?this.wrapUserFunction(()=>e(t)):ea.reject(t)}static resolve(e){return new ea((t,r)=>{t(e)})}static reject(e){return new ea((t,r)=>{r(e)})}static waitFor(e){return new ea((t,r)=>{let n=0,s=0,i=!1;e.forEach(e=>{++n,e.next(()=>{++s,i&&s===n&&t()},e=>r(e))}),i=!0,s===n&&t()})}static or(e){let t=ea.resolve(!1);for(let r of e)t=t.next(e=>e?ea.resolve(e):r());return t}static forEach(e,t){let r=[];return e.forEach((e,n)=>{r.push(t.call(this,e,n))}),this.waitFor(r)}static mapArray(e,t){return new ea((r,n)=>{let s=e.length,i=Array(s),a=0;for(let o=0;o<s;o++){let u=o;t(e[u]).next(e=>{i[u]=e,++a===s&&r(i)},e=>n(e))}})}static doWhile(e,t){return new ea((r,n)=>{let s=()=>{!0===e()?t().next(()=>{s()},n):r()};s()})}}function eo(e){return"IndexedDbTransactionError"===e.name}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class eu{constructor(e,t){this.previousValue=e,t&&(t.sequenceNumberHandler=e=>this.ae(e),this.ue=e=>t.writeSequenceNumber(e))}ae(e){return this.previousValue=Math.max(e,this.previousValue),this.previousValue}next(){let e=++this.previousValue;return this.ue&&this.ue(e),e}}function el(e){return 0===e&&1/e==-1/0}eu.ce=-1;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ec{constructor(e,t){this.comparator=e,this.root=t||ed.EMPTY}insert(e,t){return new ec(this.comparator,this.root.insert(e,t,this.comparator).copy(null,null,ed.BLACK,null,null))}remove(e){return new ec(this.comparator,this.root.remove(e,this.comparator).copy(null,null,ed.BLACK,null,null))}get(e){let t=this.root;for(;!t.isEmpty();){let r=this.comparator(e,t.key);if(0===r)return t.value;r<0?t=t.left:r>0&&(t=t.right)}return null}indexOf(e){let t=0,r=this.root;for(;!r.isEmpty();){let n=this.comparator(e,r.key);if(0===n)return t+r.left.size;n<0?r=r.left:(t+=r.left.size+1,r=r.right)}return -1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(e){return this.root.inorderTraversal(e)}forEach(e){this.inorderTraversal((t,r)=>(e(t,r),!1))}toString(){let e=[];return this.inorderTraversal((t,r)=>(e.push(`${t}:${r}`),!1)),`{${e.join(", ")}}`}reverseTraversal(e){return this.root.reverseTraversal(e)}getIterator(){return new eh(this.root,null,this.comparator,!1)}getIteratorFrom(e){return new eh(this.root,e,this.comparator,!1)}getReverseIterator(){return new eh(this.root,null,this.comparator,!0)}getReverseIteratorFrom(e){return new eh(this.root,e,this.comparator,!0)}}class eh{constructor(e,t,r,n){this.isReverse=n,this.nodeStack=[];let s=1;for(;!e.isEmpty();)if(s=t?r(e.key,t):1,t&&n&&(s*=-1),s<0)e=this.isReverse?e.left:e.right;else{if(0===s){this.nodeStack.push(e);break}this.nodeStack.push(e),e=this.isReverse?e.right:e.left}}getNext(){let e=this.nodeStack.pop(),t={key:e.key,value:e.value};if(this.isReverse)for(e=e.left;!e.isEmpty();)this.nodeStack.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack.push(e),e=e.left;return t}hasNext(){return this.nodeStack.length>0}peek(){if(0===this.nodeStack.length)return null;let e=this.nodeStack[this.nodeStack.length-1];return{key:e.key,value:e.value}}}class ed{constructor(e,t,r,n,s){this.key=e,this.value=t,this.color=null!=r?r:ed.RED,this.left=null!=n?n:ed.EMPTY,this.right=null!=s?s:ed.EMPTY,this.size=this.left.size+1+this.right.size}copy(e,t,r,n,s){return new ed(null!=e?e:this.key,null!=t?t:this.value,null!=r?r:this.color,null!=n?n:this.left,null!=s?s:this.right)}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,t,r){let n=this,s=r(e,n.key);return(n=s<0?n.copy(null,null,null,n.left.insert(e,t,r),null):0===s?n.copy(null,t,null,null,null):n.copy(null,null,null,null,n.right.insert(e,t,r))).fixUp()}removeMin(){if(this.left.isEmpty())return ed.EMPTY;let e=this;return e.left.isRed()||e.left.left.isRed()||(e=e.moveRedLeft()),(e=e.copy(null,null,null,e.left.removeMin(),null)).fixUp()}remove(e,t){let r,n=this;if(0>t(e,n.key))n.left.isEmpty()||n.left.isRed()||n.left.left.isRed()||(n=n.moveRedLeft()),n=n.copy(null,null,null,n.left.remove(e,t),null);else{if(n.left.isRed()&&(n=n.rotateRight()),n.right.isEmpty()||n.right.isRed()||n.right.left.isRed()||(n=n.moveRedRight()),0===t(e,n.key)){if(n.right.isEmpty())return ed.EMPTY;r=n.right.min(),n=n.copy(r.key,r.value,null,null,n.right.removeMin())}n=n.copy(null,null,null,null,n.right.remove(e,t))}return n.fixUp()}isRed(){return this.color}fixUp(){let e=this;return e.right.isRed()&&!e.left.isRed()&&(e=e.rotateLeft()),e.left.isRed()&&e.left.left.isRed()&&(e=e.rotateRight()),e.left.isRed()&&e.right.isRed()&&(e=e.colorFlip()),e}moveRedLeft(){let e=this.colorFlip();return e.right.left.isRed()&&(e=(e=(e=e.copy(null,null,null,null,e.right.rotateRight())).rotateLeft()).colorFlip()),e}moveRedRight(){let e=this.colorFlip();return e.left.left.isRed()&&(e=(e=e.rotateRight()).colorFlip()),e}rotateLeft(){let e=this.copy(null,null,ed.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight(){let e=this.copy(null,null,ed.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip(){let e=this.left.copy(null,null,!this.left.color,null,null),t=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,t)}checkMaxDepth(){return Math.pow(2,this.check())<=this.size+1}check(){if(this.isRed()&&this.left.isRed())throw x(43730,{key:this.key,value:this.value});if(this.right.isRed())throw x(14113,{key:this.key,value:this.value});let e=this.left.check();if(e!==this.right.check())throw x(27949);return e+(this.isRed()?0:1)}}ed.EMPTY=null,ed.RED=!0,ed.BLACK=!1,ed.EMPTY=new class{constructor(){this.size=0}get key(){throw x(57766)}get value(){throw x(16141)}get color(){throw x(16727)}get left(){throw x(29726)}get right(){throw x(36894)}copy(e,t,r,n,s){return this}insert(e,t,r){return new ed(e,t)}remove(e,t){return this}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class em{constructor(e){this.comparator=e,this.data=new ec(this.comparator)}has(e){return null!==this.data.get(e)}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(e){return this.data.indexOf(e)}forEach(e){this.data.inorderTraversal((t,r)=>(e(t),!1))}forEachInRange(e,t){let r=this.data.getIteratorFrom(e[0]);for(;r.hasNext();){let n=r.getNext();if(this.comparator(n.key,e[1])>=0)return;t(n.key)}}forEachWhile(e,t){let r;for(r=void 0!==t?this.data.getIteratorFrom(t):this.data.getIterator();r.hasNext();)if(!e(r.getNext().key))return}firstAfterOrEqual(e){let t=this.data.getIteratorFrom(e);return t.hasNext()?t.getNext().key:null}getIterator(){return new ef(this.data.getIterator())}getIteratorFrom(e){return new ef(this.data.getIteratorFrom(e))}add(e){return this.copy(this.data.remove(e).insert(e,!0))}delete(e){return this.has(e)?this.copy(this.data.remove(e)):this}isEmpty(){return this.data.isEmpty()}unionWith(e){let t=this;return t.size<e.size&&(t=e,e=this),e.forEach(e=>{t=t.add(e)}),t}isEqual(e){if(!(e instanceof em)||this.size!==e.size)return!1;let t=this.data.getIterator(),r=e.data.getIterator();for(;t.hasNext();){let e=t.getNext().key,n=r.getNext().key;if(0!==this.comparator(e,n))return!1}return!0}toArray(){let e=[];return this.forEach(t=>{e.push(t)}),e}toString(){let e=[];return this.forEach(t=>e.push(t)),"SortedSet("+e.toString()+")"}copy(e){let t=new em(this.comparator);return t.data=e,t}}class ef{constructor(e){this.iter=e}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ep{constructor(e){this.fields=e,e.sort(K.comparator)}static empty(){return new ep([])}unionWith(e){let t=new em(K.comparator);for(let e of this.fields)t=t.add(e);for(let r of e)t=t.add(r);return new ep(t.toArray())}covers(e){for(let t of this.fields)if(t.isPrefixOf(e))return!0;return!1}isEqual(e){return B(this.fields,e.fields,(e,t)=>e.isEqual(t))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function eg(e){let t=0;for(let r in e)Object.prototype.hasOwnProperty.call(e,r)&&t++;return t}function ey(e,t){for(let r in e)Object.prototype.hasOwnProperty.call(e,r)&&t(r,e[r])}function ew(e){for(let t in e)if(Object.prototype.hasOwnProperty.call(e,t))return!1;return!0}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ev extends Error{constructor(){super(...arguments),this.name="Base64DecodeError"}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class e_{constructor(e){this.binaryString=e}static fromBase64String(e){return new e_(function(e){try{return atob(e)}catch(e){throw"undefined"!=typeof DOMException&&e instanceof DOMException?new ev("Invalid base64 string: "+e):e}}(e))}static fromUint8Array(e){return new e_(function(e){let t="";for(let r=0;r<e.length;++r)t+=String.fromCharCode(e[r]);return t}(e))}[Symbol.iterator](){let e=0;return{next:()=>e<this.binaryString.length?{value:this.binaryString.charCodeAt(e++),done:!1}:{value:void 0,done:!0}}}toBase64(){return btoa(this.binaryString)}toUint8Array(){return function(e){let t=new Uint8Array(e.length);for(let r=0;r<e.length;r++)t[r]=e.charCodeAt(r);return t}(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(e){return M(this.binaryString,e.binaryString)}isEqual(e){return this.binaryString===e.binaryString}}e_.EMPTY_BYTE_STRING=new e_("");let eE=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function eT(e){if(b(!!e,39018),"string"==typeof e){let t=0,r=eE.exec(e);if(b(!!r,46558,{timestamp:e}),r[1]){let e=r[1];t=Number(e=(e+"000000000").substr(0,9))}return{seconds:Math.floor(new Date(e).getTime()/1e3),nanos:t}}return{seconds:ex(e.seconds),nanos:ex(e.nanos)}}function ex(e){return"number"==typeof e?e:"string"==typeof e?Number(e):0}function eN(e){return"string"==typeof e?e_.fromBase64String(e):e_.fromUint8Array(e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let eb="server_timestamp",eS="__type__",eI="__previous_value__",eV="__local_write_time__";function eC(e){return(e?.mapValue?.fields||{})[eS]?.stringValue===eb}function eA(e){let t=e.mapValue.fields[eI];return eC(t)?eA(t):t}function eD(e){let t=eT(e.mapValue.fields[eV].timestampValue);return new ee(t.seconds,t.nanos)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ek{constructor(e,t,r,n,s,i,a,o,u,l,c){this.databaseId=e,this.appId=t,this.persistenceKey=r,this.host=n,this.ssl=s,this.forceLongPolling=i,this.autoDetectLongPolling=a,this.longPollingOptions=o,this.useFetchStreams=u,this.isUsingEmulator=l,this.apiKey=c}}let eL="(default)";class eR{constructor(e,t){this.projectId=e,this.database=t||eL}static empty(){return new eR("","")}get isDefaultDatabase(){return this.database===eL}isEqual(e){return e instanceof eR&&e.projectId===this.projectId&&e.database===this.database}}function eU(e,t){if(!Object.prototype.hasOwnProperty.apply(e.options,["projectId"]))throw new I(S.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new eR(e.options.projectId,t)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let eO="__type__",eP="__max__",eM={mapValue:{fields:{__type__:{stringValue:eP}}}},eF="__vector__",e$="value",eB={nullValue:"NULL_VALUE"},eq={booleanValue:!0},ez={booleanValue:!1};function eQ(e){return"nullValue"in e?0:"booleanValue"in e?1:"integerValue"in e||"doubleValue"in e?2:"timestampValue"in e?3:"stringValue"in e?5:"bytesValue"in e?6:"referenceValue"in e?7:"geoPointValue"in e?8:"arrayValue"in e?9:"mapValue"in e?eC(e)?4:e8(e)?9007199254740991:e6(e)?10:11:x(28295,{value:e})}function ej(e,t,r){if(e===t)return!0;let n=eQ(e);if(n!==eQ(t))return!1;switch(n){case 0:case 9007199254740991:return!0;case 1:return e.booleanValue===t.booleanValue;case 4:return eD(e).isEqual(eD(t));case 3:return function(e,t){if("string"==typeof e.timestampValue&&"string"==typeof t.timestampValue&&e.timestampValue.length===t.timestampValue.length)return e.timestampValue===t.timestampValue;let r=eT(e.timestampValue),n=eT(t.timestampValue);return r.seconds===n.seconds&&r.nanos===n.nanos}(e,t);case 5:return e.stringValue===t.stringValue;case 6:return eN(e.bytesValue).isEqual(eN(t.bytesValue));case 7:return e.referenceValue===t.referenceValue;case 8:return ex(e.geoPointValue.latitude)===ex(t.geoPointValue.latitude)&&ex(e.geoPointValue.longitude)===ex(t.geoPointValue.longitude);case 2:return function(e,t,r){let n,s;if("integerValue"in e&&"integerValue"in t)return ex(e.integerValue)===ex(t.integerValue);if("doubleValue"in e&&"doubleValue"in t)n=ex(e.doubleValue),s=ex(t.doubleValue);else{if(!r?.Ee)return!1;n=ex(e.integerValue??e.doubleValue),s=ex(t.integerValue??t.doubleValue)}return n===s?!!r?.he||el(n)===el(s):!!(void 0===r||r.Te)&&isNaN(n)&&isNaN(s)}(e,t,r);case 9:return B(e.arrayValue.values||[],t.arrayValue.values||[],(e,t)=>ej(e,t,r));case 10:case 11:return function(e,t,r){let n=e.mapValue.fields||{},s=t.mapValue.fields||{};if(eg(n)!==eg(s))return!1;for(let e in n)if(n.hasOwnProperty(e)&&(void 0===s[e]||!ej(n[e],s[e],r)))return!1;return!0}(e,t,r);default:return x(52216,{left:e})}}function eK(e,t){return void 0!==(e.values||[]).find(e=>ej(e,t))}function eG(e,t){if(e===t)return 0;let r=eQ(e),n=eQ(t);if(r!==n)return M(r,n);switch(r){case 0:case 9007199254740991:return 0;case 1:return M(e.booleanValue,t.booleanValue);case 2:return function(e,t){let r=ex(e.integerValue||e.doubleValue),n=ex(t.integerValue||t.doubleValue);return r<n?-1:r>n?1:r===n?0:isNaN(r)?isNaN(n)?0:-1:1}(e,t);case 3:return eH(e.timestampValue,t.timestampValue);case 4:return eH(eD(e),eD(t));case 5:return F(e.stringValue,t.stringValue);case 6:return function(e,t){let r=eN(e),n=eN(t);return r.compareTo(n)}(e.bytesValue,t.bytesValue);case 7:return function(e,t){let r=e.split("/"),n=t.split("/");for(let e=0;e<r.length&&e<n.length;e++){let t=M(r[e],n[e]);if(0!==t)return t}return M(r.length,n.length)}(e.referenceValue,t.referenceValue);case 8:return function(e,t){let r=M(ex(e.latitude),ex(t.latitude));return 0!==r?r:M(ex(e.longitude),ex(t.longitude))}(e.geoPointValue,t.geoPointValue);case 9:return eW(e.arrayValue,t.arrayValue);case 10:return function(e,t){let r=e.fields||{},n=t.fields||{},s=r[e$]?.arrayValue,i=n[e$]?.arrayValue,a=M(s?.values?.length||0,i?.values?.length||0);return 0!==a?a:eW(s,i)}(e.mapValue,t.mapValue);case 11:return function(e,t){if(e===eM.mapValue&&t===eM.mapValue)return 0;if(e===eM.mapValue)return 1;if(t===eM.mapValue)return -1;let r=e.fields||{},n=Object.keys(r),s=t.fields||{},i=Object.keys(s);n.sort(),i.sort();for(let e=0;e<n.length&&e<i.length;++e){let t=F(n[e],i[e]);if(0!==t)return t;let a=eG(r[n[e]],s[i[e]]);if(0!==a)return a}return M(n.length,i.length)}(e.mapValue,t.mapValue);default:throw x(23264,{Pe:r})}}function eH(e,t){if("string"==typeof e&&"string"==typeof t&&e.length===t.length)return M(e,t);let r=eT(e),n=eT(t),s=M(r.seconds,n.seconds);return 0!==s?s:M(r.nanos,n.nanos)}function eW(e,t){let r=e.values||[],n=t.values||[];for(let e=0;e<r.length&&e<n.length;++e){let t=eG(r[e],n[e]);if(void 0!==t&&0!==t)return t}return M(r.length,n.length)}function eY(e){var t,r;return"nullValue"in e?"null":"booleanValue"in e?""+e.booleanValue:"integerValue"in e?""+e.integerValue:"doubleValue"in e?""+e.doubleValue:"timestampValue"in e?function(e){let t=eT(e);return`time(${t.seconds},${t.nanos})`}(e.timestampValue):"stringValue"in e?e.stringValue:"bytesValue"in e?eN(e.bytesValue).toBase64():"referenceValue"in e?(t=e.referenceValue,G.fromName(t).toString()):"geoPointValue"in e?(r=e.geoPointValue,`geo(${r.latitude},${r.longitude})`):"arrayValue"in e?function(e){let t="[",r=!0;for(let n of e.values||[])r?r=!1:t+=",",t+=eY(n);return t+"]"}(e.arrayValue):"mapValue"in e?function(e){let t=Object.keys(e.fields||{}).sort(),r="{",n=!0;for(let s of t)n?n=!1:r+=",",r+=`${s}:${eY(e.fields[s])}`;return r+"}"}(e.mapValue):x(61005,{value:e})}function eJ(e,t){return{referenceValue:`projects/${e.projectId}/databases/${e.database}/documents/${t.path.canonicalString()}`}}function eX(e){return!!e&&"integerValue"in e}function eZ(e){return!!e&&"doubleValue"in e}function e0(e){return eX(e)||eZ(e)}function e1(e){return!!e&&"arrayValue"in e}function e2(e){return!!e&&"nullValue"in e}function e3(e){return!!e&&"doubleValue"in e&&isNaN(Number(e.doubleValue))}function e4(e){return!!e&&"mapValue"in e}function e6(e){return(e?.mapValue?.fields||{})[eO]?.stringValue===eF}function e9(e){return(e?.mapValue?.fields||{})[e$]?.arrayValue}function e5(e){if(e.geoPointValue)return{geoPointValue:{...e.geoPointValue}};if(e.timestampValue&&"object"==typeof e.timestampValue)return{timestampValue:{...e.timestampValue}};if(e.mapValue){let t={mapValue:{fields:{}}};return ey(e.mapValue.fields,(e,r)=>t.mapValue.fields[e]=e5(r)),t}if(e.arrayValue){let t={arrayValue:{values:[]}};for(let r=0;r<(e.arrayValue.values||[]).length;++r)t.arrayValue.values[r]=e5(e.arrayValue.values[r]);return t}return{...e}}function e8(e){return(((e.mapValue||{}).fields||{}).__type__||{}).stringValue===eP}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class e7{constructor(e){this.value=e}static empty(){return new e7({mapValue:{}})}field(e){if(e.isEmpty())return this.value;{let t=this.value;for(let r=0;r<e.length-1;++r)if(!e4(t=(t.mapValue.fields||{})[e.get(r)]))return null;return(t=(t.mapValue.fields||{})[e.lastSegment()])||null}}set(e,t){this.getFieldsMap(e.popLast())[e.lastSegment()]=e5(t)}setAll(e){let t=K.emptyPath(),r={},n=[];e.forEach((e,s)=>{if(!t.isImmediateParentOf(s)){let e=this.getFieldsMap(t);this.applyChanges(e,r,n),r={},n=[],t=s.popLast()}e?r[s.lastSegment()]=e5(e):n.push(s.lastSegment())});let s=this.getFieldsMap(t);this.applyChanges(s,r,n)}delete(e){let t=this.field(e.popLast());e4(t)&&t.mapValue.fields&&delete t.mapValue.fields[e.lastSegment()]}isEqual(e){return ej(this.value,e.value)}getFieldsMap(e){let t=this.value;t.mapValue.fields||(t.mapValue={fields:{}});for(let r=0;r<e.length;++r){let n=t.mapValue.fields[e.get(r)];e4(n)&&n.mapValue.fields||(n={mapValue:{fields:{}}},t.mapValue.fields[e.get(r)]=n),t=n}return t.mapValue.fields}applyChanges(e,t,r){for(let n of(ey(t,(t,r)=>e[t]=r),r))delete e[n]}clone(){return new e7(e5(this.value))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function te(e,t){if(e.useProto3Json){if(isNaN(t))return{doubleValue:"NaN"};if(t===1/0)return{doubleValue:"Infinity"};if(t===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:el(t)?"-0":t}}function tt(e){return{integerValue:""+e}}function tr(e,t,r){return Number.isInteger(t)&&r?.preferIntegers||"number"==typeof t&&Number.isInteger(t)&&!el(t)&&t<=Number.MAX_SAFE_INTEGER&&t>=Number.MIN_SAFE_INTEGER?tt(t):te(e,t)}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tn{constructor(){this._=void 0}}function ts(e,t){return e instanceof th?e0(t)?t:{integerValue:0}:null}class ti extends tn{}class ta extends tn{constructor(e){super(),this.elements=e}}function to(e,t){let r=tg(t);for(let t of e.elements)r.some(e=>ej(e,t))||r.push(t);return{arrayValue:{values:r}}}class tu extends tn{constructor(e){super(),this.elements=e}}function tl(e,t){let r=tg(t);for(let t of e.elements)r=r.filter(e=>!ej(e,t));return{arrayValue:{values:r}}}class tc extends tn{constructor(e,t){super(),this.serializer=e,this.Re=t}}class th extends tc{}class td extends tc{}class tm extends tc{}function tf(e,t,r){if(!e0(t))return e.Re;let n=r(tp(t),tp(e.Re));return eX(t)&&eX(e.Re)?tt(n):te(e.serializer,n)}function tp(e){return ex(e.integerValue||e.doubleValue)}function tg(e){return e1(e)&&e.arrayValue.values?e.arrayValue.values.slice():[]}class ty{constructor(e,t){this.version=e,this.transformResults=t}}class tw{constructor(e,t){this.updateTime=e,this.exists=t}static none(){return new tw}static exists(e){return new tw(void 0,e)}static updateTime(e){return new tw(e)}get isNone(){return void 0===this.updateTime&&void 0===this.exists}isEqual(e){return this.exists===e.exists&&(this.updateTime?!!e.updateTime&&this.updateTime.isEqual(e.updateTime):!e.updateTime)}}function tv(e,t){return void 0!==e.updateTime?t.isFoundDocument()&&t.version.isEqual(e.updateTime):void 0===e.exists||e.exists===t.isFoundDocument()}class t_{}function tE(e,t){if(!e.hasLocalMutations||t&&0===t.fields.length)return null;if(null===t)return e.isNoDocument()?new tC(e.key,tw.none()):new tN(e.key,e.data,tw.none());{let r=e.data,n=e7.empty(),s=new em(K.comparator);for(let e of t.fields)if(!s.has(e)){let t=r.field(e);null===t&&e.length>1&&(e=e.popLast(),t=r.field(e)),null===t?n.delete(e):n.set(e,t),s=s.add(e)}return new tb(e.key,n,new ep(s.toArray()),tw.none())}}function tT(e,t,r,n){return e instanceof tN?function(e,t,r,n){if(!tv(e.precondition,t))return r;let s=e.value.clone(),i=tV(e.fieldTransforms,n,t);return s.setAll(i),t.convertToFoundDocument(t.version,s).setHasLocalMutations(),null}(e,t,r,n):e instanceof tb?function(e,t,r,n){if(!tv(e.precondition,t))return r;let s=tV(e.fieldTransforms,n,t),i=t.data;return(i.setAll(tS(e)),i.setAll(s),t.convertToFoundDocument(t.version,i).setHasLocalMutations(),null===r)?null:r.unionWith(e.fieldMask.fields).unionWith(e.fieldTransforms.map(e=>e.field))}(e,t,r,n):tv(e.precondition,t)?(t.convertToNoDocument(t.version).setHasLocalMutations(),null):r}function tx(e,t){var r,n;return e.type===t.type&&!!e.key.isEqual(t.key)&&!!e.precondition.isEqual(t.precondition)&&(r=e.fieldTransforms,n=t.fieldTransforms,!!(void 0===r&&void 0===n||!(!r||!n)&&B(r,n,(e,t)=>{var r,n;return e.field.isEqual(t.field)&&(r=e.transform,n=t.transform,r instanceof ta&&n instanceof ta||r instanceof tu&&n instanceof tu?B(r.elements,n.elements,ej):r instanceof th&&n instanceof th||r instanceof td&&n instanceof td||r instanceof tm&&n instanceof tm?ej(r.Re,n.Re):r instanceof ti&&n instanceof ti)})))&&(0===e.type?e.value.isEqual(t.value):1!==e.type||e.data.isEqual(t.data)&&e.fieldMask.isEqual(t.fieldMask))}class tN extends t_{constructor(e,t,r,n=[]){super(),this.key=e,this.value=t,this.precondition=r,this.fieldTransforms=n,this.type=0}getFieldMask(){return null}}class tb extends t_{constructor(e,t,r,n,s=[]){super(),this.key=e,this.data=t,this.fieldMask=r,this.precondition=n,this.fieldTransforms=s,this.type=1}getFieldMask(){return this.fieldMask}}function tS(e){let t=new Map;return e.fieldMask.fields.forEach(r=>{if(!r.isEmpty()){let n=e.data.field(r);t.set(r,n)}}),t}function tI(e,t,r){let n=new Map;b(e.length===r.length,32656,{Ie:r.length,Ae:e.length});for(let i=0;i<r.length;i++){var s;let a=e[i],o=a.transform,u=t.data.field(a.field);n.set(a.field,(s=r[i],o instanceof ta?to(o,u):o instanceof tu?tl(o,u):s))}return n}function tV(e,t,r){let n=new Map;for(let s of e){let e=s.transform,i=r.data.field(s.field);n.set(s.field,e instanceof ti?function(e,t){let r={fields:{[eS]:{stringValue:eb},[eV]:{timestampValue:{seconds:e.seconds,nanos:e.nanoseconds}}}};return t&&eC(t)&&(t=eA(t)),t&&(r.fields[eI]=t),{mapValue:r}}(t,i):e instanceof ta?to(e,i):e instanceof tu?tl(e,i):e instanceof th?function(e,t){let r=ts(e,t),n=tp(r)+tp(e.Re);return eX(r)&&eX(e.Re)?tt(n):te(e.serializer,n)}(e,i):e instanceof td?tf(e,i,Math.min):e instanceof tm?tf(e,i,Math.max):void 0)}return n}class tC extends t_{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=2,this.fieldTransforms=[]}getFieldMask(){return null}}class tA extends t_{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=3,this.fieldTransforms=[]}getFieldMask(){return null}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tD{constructor(e,t){this.position=e,this.inclusive=t}}function tk(e,t,r){let n=0;for(let s=0;s<e.position.length;s++){let i=t[s],a=e.position[s];if(n=i.field.isKeyField()?G.comparator(G.fromName(a.referenceValue),r.key):eG(a,r.data.field(i.field)),"desc"===i.dir&&(n*=-1),0!==n)break}return n}function tL(e,t){if(null===e)return null===t;if(null===t||e.inclusive!==t.inclusive||e.position.length!==t.position.length)return!1;for(let r=0;r<e.position.length;r++)if(!ej(e.position[r],t.position[r]))return!1;return!0}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tR{}class tU extends tR{constructor(e,t,r){super(),this.field=e,this.op=t,this.value=r}static create(e,t,r){return e.isKeyField()?"in"===t||"not-in"===t?this.createKeyFieldInFilter(e,t,r):new tF(e,t,r):"array-contains"===t?new tz(e,r):"in"===t?new tQ(e,r):"not-in"===t?new tj(e,r):"array-contains-any"===t?new tK(e,r):new tU(e,t,r)}static createKeyFieldInFilter(e,t,r){return"in"===t?new t$(e,r):new tB(e,r)}matches(e){let t=e.data.field(this.field);return"!="===this.op?null!==t&&void 0===t.nullValue&&this.matchesComparison(eG(t,this.value)):null!==t&&eQ(this.value)===eQ(t)&&this.matchesComparison(eG(t,this.value))}matchesComparison(e){switch(this.op){case"<":return e<0;case"<=":return e<=0;case"==":return 0===e;case"!=":return 0!==e;case">":return e>0;case">=":return e>=0;default:return x(47266,{operator:this.op})}}isInequality(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}getFlattenedFilters(){return[this]}getFilters(){return[this]}}class tO extends tR{constructor(e,t){super(),this.filters=e,this.op=t,this.Ve=null}static create(e,t){return new tO(e,t)}matches(e){return tP(this)?void 0===this.filters.find(t=>!t.matches(e)):void 0!==this.filters.find(t=>t.matches(e))}getFlattenedFilters(){return null!==this.Ve||(this.Ve=this.filters.reduce((e,t)=>e.concat(t.getFlattenedFilters()),[])),this.Ve}getFilters(){return Object.assign([],this.filters)}}function tP(e){return"and"===e.op}function tM(e){for(let t of e.filters)if(t instanceof tO)return!1;return!0}class tF extends tU{constructor(e,t,r){super(e,t,r),this.key=G.fromName(r.referenceValue)}matches(e){let t=G.comparator(e.key,this.key);return this.matchesComparison(t)}}class t$ extends tU{constructor(e,t){super(e,"in",t),this.keys=tq("in",t)}matches(e){return this.keys.some(t=>t.isEqual(e.key))}}class tB extends tU{constructor(e,t){super(e,"not-in",t),this.keys=tq("not-in",t)}matches(e){return!this.keys.some(t=>t.isEqual(e.key))}}function tq(e,t){return(t.arrayValue?.values||[]).map(e=>G.fromName(e.referenceValue))}class tz extends tU{constructor(e,t){super(e,"array-contains",t)}matches(e){let t=e.data.field(this.field);return e1(t)&&eK(t.arrayValue,this.value)}}class tQ extends tU{constructor(e,t){super(e,"in",t)}matches(e){let t=e.data.field(this.field);return null!==t&&eK(this.value.arrayValue,t)}}class tj extends tU{constructor(e,t){super(e,"not-in",t)}matches(e){if(eK(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;let t=e.data.field(this.field);return null!==t&&void 0===t.nullValue&&!eK(this.value.arrayValue,t)}}class tK extends tU{constructor(e,t){super(e,"array-contains-any",t)}matches(e){let t=e.data.field(this.field);return!(!e1(t)||!t.arrayValue.values)&&t.arrayValue.values.some(e=>eK(this.value.arrayValue,e))}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tG{constructor(e,t="asc"){this.field=e,this.dir=t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tH{constructor(e,t,r,n,s,i,a){this.key=e,this.documentType=t,this.version=r,this.readTime=n,this.createTime=s,this.data=i,this.documentState=a}static newInvalidDocument(e){return new tH(e,0,et.min(),et.min(),et.min(),e7.empty(),0)}static newFoundDocument(e,t,r,n){return new tH(e,1,t,et.min(),r,n,0)}static newNoDocument(e,t){return new tH(e,2,t,et.min(),et.min(),e7.empty(),0)}static newUnknownDocument(e,t){return new tH(e,3,t,et.min(),et.min(),e7.empty(),2)}convertToFoundDocument(e,t){return this.createTime.isEqual(et.min())&&(2===this.documentType||0===this.documentType)&&(this.createTime=e),this.version=e,this.documentType=1,this.data=t,this.documentState=0,this}convertToNoDocument(e){return this.version=e,this.documentType=2,this.data=e7.empty(),this.documentState=0,this}convertToUnknownDocument(e){return this.version=e,this.documentType=3,this.data=e7.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this.version=et.min(),this}setReadTime(e){return this.readTime=e,this}get hasLocalMutations(){return 1===this.documentState}get hasCommittedMutations(){return 2===this.documentState}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return 0!==this.documentType}isFoundDocument(){return 1===this.documentType}isNoDocument(){return 2===this.documentType}isUnknownDocument(){return 3===this.documentType}isEqual(e){return e instanceof tH&&this.key.isEqual(e.key)&&this.version.isEqual(e.version)&&this.documentType===e.documentType&&this.documentState===e.documentState&&this.data.isEqual(e.data)}mutableCopy(){return new tH(this.key,this.documentType,this.version,this.readTime,this.createTime,this.data.clone(),this.documentState)}toString(){return`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {createTime: ${this.createTime}}), {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tW{constructor(e,t=null,r=[],n=[],s=null,i=null,a=null){this.path=e,this.collectionGroup=t,this.orderBy=r,this.filters=n,this.limit=s,this.startAt=i,this.endAt=a,this.de=null}}function tY(e,t=null,r=[],n=[],s=null,i=null,a=null){return new tW(e,t,r,n,s,i,a)}function tJ(e){if(null===e.de){let t=e.path.canonicalString();null!==e.collectionGroup&&(t+="|cg:"+e.collectionGroup),t+="|f:"+e.filters.map(e=>(function e(t){if(t instanceof tU)return t.field.canonicalString()+t.op.toString()+eY(t.value);if(tM(t)&&tP(t))return t.filters.map(t=>e(t)).join(",");{let r=t.filters.map(t=>e(t)).join(",");return`${t.op}(${r})`}})(e)).join(",")+"|ob:"+e.orderBy.map(e=>e.field.canonicalString()+e.dir).join(","),null==e.limit||(t+="|l:"+e.limit),e.startAt&&(t+="|lb:"+(e.startAt.inclusive?"b:":"a:")+e.startAt.position.map(e=>eY(e)).join(",")),e.endAt&&(t+="|ub:"+(e.endAt.inclusive?"a:":"b:")+e.endAt.position.map(e=>eY(e)).join(",")),e.de=t}return e.de}function tX(e,t){if(e.limit!==t.limit||e.orderBy.length!==t.orderBy.length)return!1;for(let s=0;s<e.orderBy.length;s++){var r,n;if(r=e.orderBy[s],n=t.orderBy[s],!(r.dir===n.dir&&r.field.isEqual(n.field)))return!1}if(e.filters.length!==t.filters.length)return!1;for(let r=0;r<e.filters.length;r++)if(!function e(t,r){return t instanceof tU?r instanceof tU&&t.op===r.op&&t.field.isEqual(r.field)&&ej(t.value,r.value):t instanceof tO?r instanceof tO&&t.op===r.op&&t.filters.length===r.filters.length&&t.filters.reduce((t,n,s)=>t&&e(n,r.filters[s]),!0):void x(19439)}(e.filters[r],t.filters[r]))return!1;return e.collectionGroup===t.collectionGroup&&!!e.path.isEqual(t.path)&&!!tL(e.startAt,t.startAt)&&tL(e.endAt,t.endAt)}function tZ(e){return!!e.isCorePipeline}function t0(e){return!!e.path&&G.isDocumentKey(e.path)&&null===e.collectionGroup&&0===e.filters.length}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class t1{constructor(e,t=null,r=[],n=[],s=null,i="F",a=null,o=null){this.path=e,this.collectionGroup=t,this.explicitOrderBy=r,this.filters=n,this.limit=s,this.limitType=i,this.startAt=a,this.endAt=o,this.fe=null,this.me=null,this.pe=null,this.startAt,this.endAt}}function t2(e){return 0===e.filters.length&&null===e.limit&&null==e.startAt&&null==e.endAt&&(0===e.explicitOrderBy.length||1===e.explicitOrderBy.length&&e.explicitOrderBy[0].field.isKeyField())}function t3(e){return null!==e.collectionGroup}function t4(e){if(null===e.fe){let t;e.fe=[];let r=new Set;for(let t of e.explicitOrderBy)e.fe.push(t),r.add(t.field.canonicalString());let n=e.explicitOrderBy.length>0?e.explicitOrderBy[e.explicitOrderBy.length-1].dir:"asc";(t=new em(K.comparator),e.filters.forEach(e=>{e.getFlattenedFilters().forEach(e=>{e.isInequality()&&(t=t.add(e.field))})}),t).forEach(t=>{r.has(t.canonicalString())||t.isKeyField()||e.fe.push(new tG(t,n))}),r.has(K.keyField().canonicalString())||e.fe.push(new tG(K.keyField(),n))}return e.fe}function t6(e){return e.me||(e.me=function(e,t){if("F"===e.limitType)return tY(e.path,e.collectionGroup,t,e.filters,e.limit,e.startAt,e.endAt);{t=t.map(e=>{let t="desc"===e.dir?"asc":"desc";return new tG(e.field,t)});let r=e.endAt?new tD(e.endAt.position,e.endAt.inclusive):null,n=e.startAt?new tD(e.startAt.position,e.startAt.inclusive):null;return tY(e.path,e.collectionGroup,t,e.filters,e.limit,r,n)}}(e,t4(e))),e.me}function t9(e,t){let r=e.filters.concat([t]);return new t1(e.path,e.collectionGroup,e.explicitOrderBy.slice(),r,e.limit,e.limitType,e.startAt,e.endAt)}function t5(e,t){let r=e.explicitOrderBy.concat([t]);return new t1(e.path,e.collectionGroup,r,e.filters.slice(),e.limit,e.limitType,e.startAt,e.endAt)}function t8(e,t,r){return new t1(e.path,e.collectionGroup,e.explicitOrderBy.slice(),e.filters.slice(),t,r,e.startAt,e.endAt)}function t7(e,t){return new t1(e.path,e.collectionGroup,e.explicitOrderBy.slice(),e.filters.slice(),e.limit,e.limitType,t,e.endAt)}function re(e,t){return new t1(e.path,e.collectionGroup,e.explicitOrderBy.slice(),e.filters.slice(),e.limit,e.limitType,e.startAt,t)}function rt(e){var t;let r;return`Query(target=${r=(t=t6(e)).path.canonicalString(),null!==t.collectionGroup&&(r+=" collectionGroup="+t.collectionGroup),t.filters.length>0&&(r+=`, filters: [${t.filters.map(e=>(function e(t){return t instanceof tU?`${t.field.canonicalString()} ${t.op} ${eY(t.value)}`:t instanceof tO?t.op.toString()+" {"+t.getFilters().map(e).join(" ,")+"}":"Filter"})(e)).join(", ")}]`),null==t.limit||(r+=", limit: "+t.limit),t.orderBy.length>0&&(r+=`, orderBy: [${t.orderBy.map(e=>`${e.field.canonicalString()} (${e.dir})`).join(", ")}]`),t.startAt&&(r+=", startAt: "+(t.startAt.inclusive?"b:":"a:")+t.startAt.position.map(e=>eY(e)).join(",")),t.endAt&&(r+=", endAt: "+(t.endAt.inclusive?"a:":"b:")+t.endAt.position.map(e=>eY(e)).join(",")),`Target(${r})`}; limitType=${e.limitType})`}function rr(e,t){return t.isFoundDocument()&&function(e,t){let r=t.key.path;return null!==e.collectionGroup?t.key.hasCollectionId(e.collectionGroup)&&e.path.isPrefixOf(r):G.isDocumentKey(e.path)?e.path.isEqual(r):e.path.isImmediateParentOf(r)}(e,t)&&function(e,t){for(let r of t4(e))if(!r.field.isKeyField()&&null===t.data.field(r.field))return!1;return!0}(e,t)&&function(e,t){for(let r of e.filters)if(!r.matches(t))return!1;return!0}(e,t)&&(!e.startAt||!!function(e,t,r){let n=tk(e,t,r);return e.inclusive?n<=0:n<0}(e.startAt,t4(e),t))&&(!e.endAt||!!function(e,t,r){let n=tk(e,t,r);return e.inclusive?n>=0:n>0}(e.endAt,t4(e),t))}function rn(e){return(t,r)=>{let n=!1;for(let s of t4(e)){let e=function(e,t,r){let n=e.field.isKeyField()?G.comparator(t.key,r.key):function(e,t,r){let n=t.data.field(e),s=r.data.field(e);return null!==n&&null!==s?eG(n,s):x(42886)}(e.field,t,r);switch(e.dir){case"asc":return n;case"desc":return -1*n;default:return x(19790,{direction:e.dir})}}(s,t,r);if(0!==e)return e;n=n||s.field.isKeyField()}return 0}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rs{constructor(e,t){this.count=e,this.unchangedNames=t}}function ri(e){if(void 0===e)return _("GRPC error has no .code"),S.UNKNOWN;switch(e){case s.OK:return S.OK;case s.CANCELLED:return S.CANCELLED;case s.UNKNOWN:return S.UNKNOWN;case s.DEADLINE_EXCEEDED:return S.DEADLINE_EXCEEDED;case s.RESOURCE_EXHAUSTED:return S.RESOURCE_EXHAUSTED;case s.INTERNAL:return S.INTERNAL;case s.UNAVAILABLE:return S.UNAVAILABLE;case s.UNAUTHENTICATED:return S.UNAUTHENTICATED;case s.INVALID_ARGUMENT:return S.INVALID_ARGUMENT;case s.NOT_FOUND:return S.NOT_FOUND;case s.ALREADY_EXISTS:return S.ALREADY_EXISTS;case s.PERMISSION_DENIED:return S.PERMISSION_DENIED;case s.FAILED_PRECONDITION:return S.FAILED_PRECONDITION;case s.ABORTED:return S.ABORTED;case s.OUT_OF_RANGE:return S.OUT_OF_RANGE;case s.UNIMPLEMENTED:return S.UNIMPLEMENTED;case s.DATA_LOSS:return S.DATA_LOSS;default:return x(39323,{code:e})}}(i=s||(s={}))[i.OK=0]="OK",i[i.CANCELLED=1]="CANCELLED",i[i.UNKNOWN=2]="UNKNOWN",i[i.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",i[i.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",i[i.NOT_FOUND=5]="NOT_FOUND",i[i.ALREADY_EXISTS=6]="ALREADY_EXISTS",i[i.PERMISSION_DENIED=7]="PERMISSION_DENIED",i[i.UNAUTHENTICATED=16]="UNAUTHENTICATED",i[i.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",i[i.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",i[i.ABORTED=10]="ABORTED",i[i.OUT_OF_RANGE=11]="OUT_OF_RANGE",i[i.UNIMPLEMENTED=12]="UNIMPLEMENTED",i[i.INTERNAL=13]="INTERNAL",i[i.UNAVAILABLE=14]="UNAVAILABLE",i[i.DATA_LOSS=15]="DATA_LOSS";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ra{constructor(e,t){this.mapKeyFn=e,this.equalsFn=t,this.inner={},this.innerSize=0}get(e){let t=this.mapKeyFn(e),r=this.inner[t];if(void 0!==r){for(let[t,n]of r)if(this.equalsFn(t,e))return n}}has(e){return void 0!==this.get(e)}set(e,t){let r=this.mapKeyFn(e),n=this.inner[r];if(void 0===n)return this.inner[r]=[[e,t]],void this.innerSize++;for(let r=0;r<n.length;r++)if(this.equalsFn(n[r][0],e))return void(n[r]=[e,t]);n.push([e,t]),this.innerSize++}delete(e){let t=this.mapKeyFn(e),r=this.inner[t];if(void 0===r)return!1;for(let n=0;n<r.length;n++)if(this.equalsFn(r[n][0],e))return 1===r.length?delete this.inner[t]:r.splice(n,1),this.innerSize--,!0;return!1}forEach(e){ey(this.inner,(t,r)=>{for(let[t,n]of r)e(t,n)})}isEmpty(){return ew(this.inner)}size(){return this.innerSize}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let ro=new ec(G.comparator),ru=new ec(G.comparator);function rl(...e){let t=ru;for(let r of e)t=t.insert(r.key,r);return t}function rc(e){let t=ru;return e.forEach((e,r)=>t=t.insert(e,r.overlayedDocument)),t}function rh(){return new ra(e=>e.toString(),(e,t)=>e.isEqual(t))}let rd=new ec(G.comparator),rm=new em(G.comparator);function rf(...e){let t=rm;for(let r of e)t=t.add(r);return t}let rp=new em(M),rg=new l.z8([4294967295,4294967295],0);function ry(e){let t=(new TextEncoder).encode(e),r=new l.V8;return r.update(t),new Uint8Array(r.digest())}function rw(e){let t=new DataView(e.buffer),r=t.getUint32(0,!0),n=t.getUint32(4,!0),s=t.getUint32(8,!0),i=t.getUint32(12,!0);return[new l.z8([r,n],0),new l.z8([s,i],0)]}class rv{constructor(e,t,r){if(this.bitmap=e,this.padding=t,this.hashCount=r,t<0||t>=8)throw new r_(`Invalid padding: ${t}`);if(r<0||e.length>0&&0===this.hashCount)throw new r_(`Invalid hash count: ${r}`);if(0===e.length&&0!==t)throw new r_(`Invalid padding when bitmap length is 0: ${t}`);this.ge=8*e.length-t,this.ye=l.z8.fromNumber(this.ge)}we(e,t,r){let n=e.add(t.multiply(l.z8.fromNumber(r)));return 1===n.compare(rg)&&(n=new l.z8([n.getBits(0),n.getBits(1)],0)),n.modulo(this.ye).toNumber()}be(e){return!!(this.bitmap[Math.floor(e/8)]&1<<e%8)}mightContain(e){if(0===this.ge)return!1;let[t,r]=rw(ry(e));for(let e=0;e<this.hashCount;e++){let n=this.we(t,r,e);if(!this.be(n))return!1}return!0}static create(e,t,r){let n=new rv(new Uint8Array(Math.ceil(e/8)),e%8==0?0:8-e%8,t);return r.forEach(e=>n.insert(e)),n}insert(e){if(0===this.ge)return;let[t,r]=rw(ry(e));for(let e=0;e<this.hashCount;e++){let n=this.we(t,r,e);this.ve(n)}}ve(e){this.bitmap[Math.floor(e/8)]|=1<<e%8}}class r_ extends Error{constructor(){super(...arguments),this.name="BloomFilterError"}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rE{constructor(e,t,r,n,s,i){this.snapshotVersion=e,this.targetChanges=t,this.targetMismatches=r,this.documentUpdates=n,this.augmentedDocumentUpdates=s,this.resolvedLimboDocuments=i}static createSynthesizedRemoteEventForCurrentChange(e,t,r){let n=new Map;return n.set(e,rT.createSynthesizedTargetChangeForCurrentChange(e,t,r)),new rE(et.min(),n,new ec(M),ro,ro,rf())}}class rT{constructor(e,t,r,n,s){this.resumeToken=e,this.current=t,this.addedDocuments=r,this.modifiedDocuments=n,this.removedDocuments=s}static createSynthesizedTargetChangeForCurrentChange(e,t,r){return new rT(r,t,rf(),rf(),rf())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rx{constructor(e,t,r,n){this.Se=e,this.removedTargetIds=t,this.key=r,this.De=n}}class rN{constructor(e,t){this.targetId=e,this.xe=t}}class rb{constructor(e,t,r=e_.EMPTY_BYTE_STRING,n=null){this.state=e,this.targetIds=t,this.resumeToken=r,this.cause=n}}class rS{constructor(e){this.targetId=e,this.Ce=0,this.Fe=rA(),this.Oe=e_.EMPTY_BYTE_STRING,this.Me=!1,this.Ne=!0}get current(){return this.Me}get resumeToken(){return this.Oe}get Le(){return 0!==this.Ce}get Be(){return this.Ne}Ue(e){e.approximateByteSize()>0&&(this.Ne=!0,this.Oe=e)}ke(){let e=rf(),t=rf(),r=rf();return this.Fe.forEach((n,s)=>{switch(s){case 0:e=e.add(n);break;case 2:t=t.add(n);break;case 1:r=r.add(n);break;default:x(38017,{changeType:s})}}),new rT(this.Oe,this.Me,e,t,r)}qe(){this.Ne=!1,this.Fe=rA()}$e(e,t){this.Ne=!0,this.Fe=this.Fe.insert(e,t)}Ke(e){this.Ne=!0,this.Fe=this.Fe.remove(e)}We(){this.Ce+=1}Qe(){this.Ce-=1,b(this.Ce>=0,3241,{Ce:this.Ce,targetId:this.targetId})}Ge(){this.Ne=!0,this.Me=!0}}let rI="WatchChangeAggregator";class rV{constructor(e){this.ze=e,this.je=new Map,this.He=ro,this.Je=rC(),this.Ye=ro,this.Ze=rC(),this.Xe=new ec(M)}et(e){for(let t of e.Se)e.De&&e.De.isFoundDocument()?this.tt(t,e.De):this.nt(t,e.key,e.De);for(let t of e.removedTargetIds)this.nt(t,e.key,e.De)}rt(e){this.forEachTarget(e,t=>{let r=this.je.get(t);if(r)switch(e.state){case 0:this.it(t)&&r.Ue(e.resumeToken);break;case 1:r.Qe(),r.Le||r.qe(),r.Ue(e.resumeToken);break;case 2:r.Qe(),r.Le||this.removeTarget(t);break;case 3:this.it(t)&&(r.Ge(),r.Ue(e.resumeToken));break;case 4:this.it(t)&&(this.st(t),r.Ue(e.resumeToken));break;default:x(56790,{state:e.state})}else v(rI,`handleTargetChange received targetChange for untracked target ID (${t}) with state (${e.state})`)})}forEachTarget(e,t){e.targetIds.length>0?e.targetIds.forEach(t):this.je.forEach((e,r)=>{this.it(r)&&t(r)})}_t(e){return tZ(e)?"documents"===e.getPipelineSourceType()&&1===e.getPipelineDocuments()?.length:t0(e)}ot(e){let t=e.targetId,r=e.xe.count,n=this.ut(t);if(n){let s=n.target;if(this._t(s)){if(0===r){let e=new G(tZ(s)?Q.fromString(s.getPipelineDocuments()[0]):s.path);this.nt(t,e,tH.newNoDocument(e,et.min()))}else b(1===r,20013,"Single document existence filter with count: "+r)}else{let n=this.ct(t);if(n!==r){let r=this.lt(e),s=r?this.Et(r,e,n):1;0!==s&&(this.st(t),this.Xe=this.Xe.insert(t,2===s?"TargetPurposeExistenceFilterMismatchBloom":"TargetPurposeExistenceFilterMismatch"))}}}}lt(e){let t,r;let n=e.xe.unchangedNames;if(!n||!n.bits)return null;let{bits:{bitmap:s="",padding:i=0},hashCount:a=0}=n;try{t=eN(s).toUint8Array()}catch(e){if(e instanceof ev)return E("Decoding the base64 bloom filter in existence filter failed ("+e.message+"); ignoring the bloom filter and falling back to full re-query."),null;throw e}try{r=new rv(t,i,a)}catch(e){return E(e instanceof r_?"BloomFilter error: ":"Applying bloom filter failed: ",e),null}return 0===r.ge?null:r}Et(e,t,r){return t.xe.count===r-this.Pt(e,t.targetId)?0:2}Pt(e,t){let r=this.ze.getRemoteKeysForTarget(t),n=0;return r.forEach(r=>{let s=this.ze.Tt(),i=`projects/${s.projectId}/databases/${s.database}/documents/${r.path.canonicalString()}`;e.mightContain(i)||(this.nt(t,r,null),n++)}),n}Rt(e){let t=new Map;this.je.forEach((r,n)=>{let s=this.ut(n);if(s){if(r.current&&this._t(s.target)){let t=new G(tZ(s.target)?Q.fromString(s.target.getPipelineDocuments()[0]):s.target.path);this.It(t).has(n)||this.At(n,t)||this.nt(n,t,tH.newNoDocument(t,e))}r.Be&&(t.set(n,r.ke()),r.qe())}});let r=rf();this.Ze.forEach((e,t)=>{let n=!0;t.forEachWhile(e=>{let t=this.ut(e);return!t||"TargetPurposeLimboResolution"===t.purpose||(n=!1,!1)}),n&&(r=r.add(e))}),this.He.forEach((t,r)=>r.setReadTime(e)),this.Ye.forEach((t,r)=>r.setReadTime(e));let n=new rE(e,t,this.Xe,this.He,this.Ye,r);return this.He=ro,this.Je=rC(),this.Ye=ro,this.Ze=rC(),this.Xe=new ec(M),n}tt(e,t){let r=this.je.get(e);if(!r||!this.it(e))return void v(rI,`addDocumentToTarget received document for unknown inactive target (${e})`);let n=this.At(e,t.key)?2:0;r.$e(t.key,n),tZ(this.ut(e).target)&&"exact"!==this.ut(e).target.getPipelineFlavor()?this.Ye=this.Ye.insert(t.key,t):this.He=this.He.insert(t.key,t),this.Je=this.Je.insert(t.key,this.It(t.key).add(e)),this.Ze=this.Ze.insert(t.key,this.Vt(t.key).add(e))}nt(e,t,r){let n=this.je.get(e);n&&this.it(e)?(this.At(e,t)?n.$e(t,1):n.Ke(t),this.Ze=this.Ze.insert(t,this.Vt(t).delete(e)),this.Ze=this.Ze.insert(t,this.Vt(t).add(e)),r&&(tZ(this.ut(e).target)&&"exact"!==this.ut(e).target.getPipelineFlavor()?this.Ye=this.Ye.insert(t,r):this.He=this.He.insert(t,r))):v(rI,`removeDocumentFromTarget received document for unknown or inactive target (${e})`)}removeTarget(e){this.je.delete(e)}ct(e){let t=this.je.get(e);if(!t)return 0;let r=t.ke();return this.ze.getRemoteKeysForTarget(e).size+r.addedDocuments.size-r.removedDocuments.size}We(e){let t=this.je.get(e);t||(v(rI,`recordPendingTargetRequest set up tracking for target ID ${e}`),t=new rS(e),this.je.set(e,t)),t.We()}Vt(e){let t=this.Ze.get(e);return t||(t=new em(M),this.Ze=this.Ze.insert(e,t)),t}It(e){let t=this.Je.get(e);return t||(t=new em(M),this.Je=this.Je.insert(e,t)),t}it(e){let t=null!==this.ut(e);return t||v(rI,"Detected inactive target",e),t}ut(e){let t=this.je.get(e);return void 0===t||t.Le?null:this.ze.dt(e)}st(e){this.je.set(e,new rS(e)),this.ze.getRemoteKeysForTarget(e).forEach(t=>{this.nt(e,t,null)})}At(e,t){return this.ze.getRemoteKeysForTarget(e).has(t)}}function rC(){return new ec(G.comparator)}function rA(){return new ec(G.comparator)}let rD={asc:"ASCENDING",desc:"DESCENDING"},rk={"<":"LESS_THAN","<=":"LESS_THAN_OR_EQUAL",">":"GREATER_THAN",">=":"GREATER_THAN_OR_EQUAL","==":"EQUAL","!=":"NOT_EQUAL","array-contains":"ARRAY_CONTAINS",in:"IN","not-in":"NOT_IN","array-contains-any":"ARRAY_CONTAINS_ANY"},rL={and:"AND",or:"OR"};class rR{constructor(e,t){this.databaseId=e,this.useProto3Json=t}}function rU(e,t){return e.useProto3Json||null==t?t:{value:t}}function rO(e,t){return e.useProto3Json?`${new Date(1e3*t.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+t.nanoseconds).slice(-9)}Z`:{seconds:""+t.seconds,nanos:t.nanoseconds}}function rP(e){let t=eT(e);return new ee(t.seconds,t.nanos)}function rM(e,t){return e.useProto3Json?t.toBase64():t.toUint8Array()}function rF(e,t){return rO(e,t.toTimestamp())}function r$(e){return b(!!e,49232),et.fromTimestamp(rP(e))}function rB(e,t){return rq(e,t).canonicalString()}function rq(e,t){let r=new Q(["projects",e.projectId,"databases",e.database]).child("documents");return void 0===t?r:r.child(t)}function rz(e){let t=Q.fromString(e);return b(rX(t),10190,{key:t.toString()}),t}function rQ(e,t){return rB(e.databaseId,t.path)}function rj(e,t){let r=rz(t);if(r.get(1)!==e.databaseId.projectId)throw new I(S.INVALID_ARGUMENT,"Tried to deserialize key from different project: "+r.get(1)+" vs "+e.databaseId.projectId);if(r.get(3)!==e.databaseId.database)throw new I(S.INVALID_ARGUMENT,"Tried to deserialize key from different database: "+r.get(3)+" vs "+e.databaseId.database);return new G(rH(r))}function rK(e,t){return rB(e.databaseId,t)}function rG(e){return new Q(["projects",e.databaseId.projectId,"databases",e.databaseId.database]).canonicalString()}function rH(e){return b(e.length>4&&"documents"===e.get(4),29091,{key:e.toString()}),e.popFirst(5)}function rW(e,t,r){return{name:rQ(e,t),fields:r.value.mapValue.fields}}function rY(e){return{fieldPath:e.canonicalString()}}function rJ(e){return K.fromServerFormat(e.fieldPath)}function rX(e){return e.length>=4&&"projects"===e.get(0)&&"databases"===e.get(2)}function rZ(e){return!!e&&"function"==typeof e._toProto&&"ProtoValue"===e._protoValueType}function r0(e,t){let r={fields:{}};return t.forEach((t,n)=>{if("string"!=typeof n)throw Error(`Cannot encode map with non-string key: ${n}`);r.fields[n]=t._toProto(e)}),{mapValue:r}}function r1(e){return{stringValue:e}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function r2(e){return new rR(e,!0)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class r3{constructor(e){this._byteString=e}static fromBase64String(e){try{return new r3(e_.fromBase64String(e))}catch(e){throw new I(S.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+e)}}static fromUint8Array(e){return new r3(e_.fromUint8Array(e))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(e){return this._byteString.isEqual(e._byteString)}toJSON(){return{type:r3._jsonSchemaVersion,bytes:this.toBase64()}}static fromJSON(e){if(Z(e,r3._jsonSchema))return r3.fromBase64String(e.bytes)}}r3._jsonSchemaVersion="firestore/bytes/1.0",r3._jsonSchema={type:X("string",r3._jsonSchemaVersion),bytes:X("string")};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class r4{constructor(...e){for(let t=0;t<e.length;++t)if(0===e[t].length)throw new I(S.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new K(e)}isEqual(e){return this._internalPath.isEqual(e._internalPath)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class r6{constructor(e){this._methodName=e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class r9{constructor(e,t){if(!isFinite(e)||e<-90||e>90)throw new I(S.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+e);if(!isFinite(t)||t<-180||t>180)throw new I(S.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+t);this._lat=e,this._long=t}get latitude(){return this._lat}get longitude(){return this._long}isEqual(e){return this._lat===e._lat&&this._long===e._long}_compareTo(e){return M(this._lat,e._lat)||M(this._long,e._long)}toJSON(){return{latitude:this._lat,longitude:this._long,type:r9._jsonSchemaVersion}}static fromJSON(e){if(Z(e,r9._jsonSchema))return new r9(e.latitude,e.longitude)}}function r5(e){let t={};return void 0!==e.timeoutSeconds&&(t.timeoutSeconds=e.timeoutSeconds),t}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */r9._jsonSchemaVersion="firestore/geoPoint/1.0",r9._jsonSchema={type:X("string",r9._jsonSchemaVersion),latitude:X("number"),longitude:X("number")};class r8{bt(e){}shutdown(){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let r7="ConnectivityMonitor";class ne{constructor(){this.vt=()=>this.St(),this.Dt=()=>this.xt(),this.Ct=[],this.Ft()}bt(e){this.Ct.push(e)}shutdown(){window.removeEventListener("online",this.vt),window.removeEventListener("offline",this.Dt)}Ft(){window.addEventListener("online",this.vt),window.addEventListener("offline",this.Dt)}St(){for(let e of(v(r7,"Network connectivity changed: AVAILABLE"),this.Ct))e(0)}xt(){for(let e of(v(r7,"Network connectivity changed: UNAVAILABLE"),this.Ct))e(1)}static C(){return"undefined"!=typeof window&&void 0!==window.addEventListener&&void 0!==window.removeEventListener}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let nt=null;function nr(){return null===nt?nt=268435456+Math.round(2147483648*Math.random()):nt++,"0x"+nt.toString(16)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let nn="RestConnection",ns={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery",RunAggregationQuery:"runAggregationQuery",ExecutePipeline:"executePipeline"};class ni{get Ot(){return!1}constructor(e){this.databaseInfo=e,this.databaseId=e.databaseId;let t=e.ssl?"https":"http",r=encodeURIComponent(this.databaseId.projectId),n=encodeURIComponent(this.databaseId.database);this.Mt=t+"://"+e.host,this.Nt=`projects/${r}/databases/${n}`,this.Lt=this.databaseId.database===eL?`project_id=${r}`:`project_id=${r}&database_id=${n}`}Bt(e,t,r,n,s){let i=nr(),a=this.Ut(e,t.toUriEncodedString());v(nn,`Sending RPC '${e}' ${i}:`,a,r);let o={"google-cloud-resource-prefix":this.Nt,"x-goog-request-params":this.Lt};this.kt(o,n,s);let{host:l}=new URL(a),c=(0,u.Xx)(l);return this.qt(e,a,o,r,c).then(t=>(v(nn,`Received RPC '${e}' ${i}: `,t),t),t=>{throw E(nn,`RPC '${e}' ${i} failed with error: `,t,"url: ",a,"request:",r),t})}$t(e,t,r,n,s,i){return this.Bt(e,t,r,n,s)}kt(e,t,r){e["X-Goog-Api-Client"]="gl-js/ fire/"+p,e["Content-Type"]="text/plain",this.databaseInfo.appId&&(e["X-Firebase-GMPID"]=this.databaseInfo.appId),t&&t.headers.forEach((t,r)=>e[r]=t),r&&r.headers.forEach((t,r)=>e[r]=t)}Ut(e,t){let r=ns[e],n=`${this.Mt}/v1/${t}:${r}`;return this.databaseInfo.apiKey&&(n=`${n}?key=${encodeURIComponent(this.databaseInfo.apiKey)}`),n}terminate(){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class na{constructor(e){this.Kt=e.Kt,this.Wt=e.Wt}Qt(e){this.Gt=e}zt(e){this.jt=e}Ht(e){this.Jt=e}onMessage(e){this.Yt=e}close(){this.Wt()}send(e){this.Kt(e)}Zt(){this.Gt()}Xt(){this.jt()}en(e){this.Jt(e)}tn(e){this.Yt(e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let no="WebChannelConnection",nu=(e,t,r)=>{e.listen(t,e=>{try{r(e)}catch(e){setTimeout(()=>{throw e},0)}})};class nl extends ni{constructor(e){super(e),this.nn=[],this.forceLongPolling=e.forceLongPolling,this.autoDetectLongPolling=e.autoDetectLongPolling,this.useFetchStreams=e.useFetchStreams,this.longPollingOptions=e.longPollingOptions}static rn(){nl.sn||(nu((0,h.FJ)(),h.ju.STAT_EVENT,e=>{e.stat===h.kN.PROXY?v(no,"STAT_EVENT: detected buffering proxy"):e.stat===h.kN.NOPROXY&&v(no,"STAT_EVENT: detected no buffering proxy")}),nl.sn=!0)}qt(e,t,r,n,s){let i=nr();return new Promise((s,a)=>{let o=new h.JJ;o.setWithCredentials(!0),o.listenOnce(h.tw.COMPLETE,()=>{try{switch(o.getLastErrorCode()){case h.jK.NO_ERROR:let t=o.getResponseJson();v(no,`XHR for RPC '${e}' ${i} received:`,JSON.stringify(t)),s(t);break;case h.jK.TIMEOUT:v(no,`RPC '${e}' ${i} timed out`),a(new I(S.DEADLINE_EXCEEDED,"Request time out"));break;case h.jK.HTTP_ERROR:let r=o.getStatus();if(v(no,`RPC '${e}' ${i} failed with status:`,r,"response text:",o.getResponseText()),r>0){let e=o.getResponseJson();Array.isArray(e)&&(e=e[0]);let t=e?.error;if(t&&t.status&&t.message){let e=function(e){let t=e.toLowerCase().replace(/_/g,"-");return Object.values(S).indexOf(t)>=0?t:S.UNKNOWN}(t.status);a(new I(e,t.message))}else a(new I(S.UNKNOWN,"Server responded with status "+o.getStatus()))}else a(new I(S.UNAVAILABLE,"Connection failed."));break;default:x(9055,{_n:e,streamId:i,an:o.getLastErrorCode(),un:o.getLastError()})}}finally{v(no,`RPC '${e}' ${i} completed.`)}});let u=JSON.stringify(n);v(no,`RPC '${e}' ${i} sending request:`,n),o.send(t,"POST",u,r,15)})}cn(e,t,r){let n=nr(),i=[this.Mt,"/","google.firestore.v1.Firestore","/",e,"/channel"],a=this.createWebChannelTransport(),o={httpSessionIdParam:"gsessionid",initMessageHeaders:{},messageUrlParams:{database:`projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`},sendRawJson:!0,supportsCrossDomainXhr:!0,internalChannelParams:{forwardChannelRequestTimeoutMs:6e5},forceLongPolling:this.forceLongPolling,detectBufferingProxy:this.autoDetectLongPolling},u=this.longPollingOptions.timeoutSeconds;void 0!==u&&(o.longPollingTimeout=Math.round(1e3*u)),this.useFetchStreams&&(o.useFetchStreams=!0),this.kt(o.initMessageHeaders,t,r),o.encodeInitMessageHeaders=!0;let l=i.join("");v(no,`Creating RPC '${e}' stream ${n}: ${l}`,o);let c=a.createWebChannel(l,o);this.En(c);let d=!1,m=!1,f=new na({Kt:t=>{m?v(no,`Not sending because RPC '${e}' stream ${n} is closed:`,t):(d||(v(no,`Opening RPC '${e}' stream ${n} transport.`),c.open(),d=!0),v(no,`RPC '${e}' stream ${n} sending:`,t),c.send(t))},Wt:()=>c.close()});return nu(c,h.ii.EventType.OPEN,()=>{m||(v(no,`RPC '${e}' stream ${n} transport opened.`),f.Zt())}),nu(c,h.ii.EventType.CLOSE,()=>{m||(m=!0,v(no,`RPC '${e}' stream ${n} transport closed`),f.en(),this.hn(c))}),nu(c,h.ii.EventType.ERROR,t=>{m||(m=!0,E(no,`RPC '${e}' stream ${n} transport errored. Name:`,t.name,"Message:",t.message),f.en(new I(S.UNAVAILABLE,"The operation could not be completed")))}),nu(c,h.ii.EventType.MESSAGE,t=>{if(!m){let r=t.data[0];b(!!r,16349);let i=r?.error||r[0]?.error;if(i){v(no,`RPC '${e}' stream ${n} received error:`,i);let t=i.status,r=function(e){let t=s[e];if(void 0!==t)return ri(t)}(t),a=i.message;"NOT_FOUND"===t&&a.includes("database")&&a.includes("does not exist")&&a.includes(this.databaseId.database)&&E(`Database '${this.databaseId.database}' not found. Please check your project configuration.`),void 0===r&&(r=S.INTERNAL,a="Unknown error status: "+t+" with message "+i.message),m=!0,f.en(new I(r,a)),c.close()}else v(no,`RPC '${e}' stream ${n} received:`,r),f.tn(r)}}),nl.rn(),setTimeout(()=>{f.Xt()},0),f}terminate(){this.nn.forEach(e=>e.close()),this.nn=[]}En(e){this.nn.push(e)}hn(e){this.nn=this.nn.filter(t=>t===e)}kt(e,t,r){super.kt(e,t,r),this.databaseInfo.apiKey&&(e["x-goog-api-key"]=this.databaseInfo.apiKey)}createWebChannelTransport(){return(0,h.UE)()}}nl.sn=!1;class nc{constructor(e,t,r=1e3,n=1.5,s=6e4){this.Tn=e,this.timerId=t,this.Pn=r,this.Rn=n,this.In=s,this.An=0,this.Vn=null,this.dn=Date.now(),this.reset()}reset(){this.An=0}fn(){this.An=this.In}mn(e){this.cancel();let t=Math.floor(this.An+this.pn()),r=Math.max(0,Date.now()-this.dn),n=Math.max(0,t-r);n>0&&v("ExponentialBackoff",`Backing off for ${n} ms (base delay: ${this.An} ms, delay with jitter: ${t} ms, last attempt: ${r} ms ago)`),this.Vn=this.Tn.enqueueAfterDelay(this.timerId,n,()=>(this.dn=Date.now(),e())),this.An*=this.Rn,this.An<this.Pn&&(this.An=this.Pn),this.An>this.In&&(this.An=this.In)}gn(){null!==this.Vn&&(this.Vn.skipDelay(),this.Vn=null)}cancel(){null!==this.Vn&&(this.Vn.cancel(),this.Vn=null)}pn(){return(Math.random()-.5)*this.An}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let nh="PersistentStream";class nd{constructor(e,t,r,n,s,i,a,o){this.Tn=e,this.yn=r,this.wn=n,this.connection=s,this.authCredentialsProvider=i,this.appCheckCredentialsProvider=a,this.listener=o,this.state=0,this.bn=0,this.vn=null,this.Sn=null,this.stream=null,this.Dn=0,this.xn=new nc(e,t)}Cn(){return 1===this.state||5===this.state||this.Fn()}Fn(){return 2===this.state||3===this.state}start(){this.Dn=0,4!==this.state?this.auth():this.On()}async stop(){this.Cn()&&await this.close(0)}Mn(){this.state=0,this.xn.reset()}Nn(){this.Fn()&&null===this.vn&&(this.vn=this.Tn.enqueueAfterDelay(this.yn,6e4,()=>this.Ln()))}Bn(e){this.Un(),this.stream.send(e)}async Ln(){if(this.Fn())return this.close(0)}Un(){this.vn&&(this.vn.cancel(),this.vn=null)}kn(){this.Sn&&(this.Sn.cancel(),this.Sn=null)}async close(e,t){this.Un(),this.kn(),this.xn.cancel(),this.bn++,4!==e?this.xn.reset():t&&t.code===S.RESOURCE_EXHAUSTED?(_(t.toString()),_("Using maximum backoff delay to prevent overloading the backend."),this.xn.fn()):t&&t.code===S.UNAUTHENTICATED&&3!==this.state&&(this.authCredentialsProvider.invalidateToken(),this.appCheckCredentialsProvider.invalidateToken()),null!==this.stream&&(this.qn(),this.stream.close(),this.stream=null),this.state=e,await this.listener.Ht(t)}qn(){}auth(){this.state=1;let e=this.$n(this.bn),t=this.bn;Promise.all([this.authCredentialsProvider.getToken(),this.appCheckCredentialsProvider.getToken()]).then(([e,r])=>{this.bn===t&&this.Kn(e,r)},t=>{e(()=>{let e=new I(S.UNKNOWN,"Fetching auth token failed: "+t.message);return this.Wn(e)})})}Kn(e,t){let r=this.$n(this.bn);this.stream=this.Qn(e,t),this.stream.Qt(()=>{r(()=>this.listener.Qt())}),this.stream.zt(()=>{r(()=>(this.state=2,this.Sn=this.Tn.enqueueAfterDelay(this.wn,1e4,()=>(this.Fn()&&(this.state=3),Promise.resolve())),this.listener.zt()))}),this.stream.Ht(e=>{r(()=>this.Wn(e))}),this.stream.onMessage(e=>{r(()=>1==++this.Dn?this.Gn(e):this.onNext(e))})}On(){this.state=5,this.xn.mn(async()=>{this.state=0,this.start()})}Wn(e){return v(nh,`close with error: ${e}`),this.stream=null,this.close(4,e)}$n(e){return t=>{this.Tn.enqueueAndForget(()=>this.bn===e?t():(v(nh,"stream callback skipped by getCloseGuardedDispatcher."),Promise.resolve()))}}}class nm extends nd{constructor(e,t,r,n,s,i){super(e,"listen_stream_connection_backoff","listen_stream_idle","health_check_timeout",t,r,n,i),this.serializer=s}Qn(e,t){return this.connection.cn("Listen",e,t)}Gn(e){return this.onNext(e)}onNext(e){this.xn.reset();let t=function(e,t){let r;if("targetChange"in t){var n,s;t.targetChange;let i="NO_CHANGE"===(n=t.targetChange.targetChangeType||"NO_CHANGE")?0:"ADD"===n?1:"REMOVE"===n?2:"CURRENT"===n?3:"RESET"===n?4:x(39313,{state:n}),a=t.targetChange.targetIds||[],o=(s=t.targetChange.resumeToken,e.useProto3Json?(b(void 0===s||"string"==typeof s,58123),e_.fromBase64String(s||"")):(b(void 0===s||s instanceof m||s instanceof Uint8Array,16193),e_.fromUint8Array(s||new Uint8Array))),u=t.targetChange.cause;r=new rb(i,a,o,u&&new I(void 0===u.code?S.UNKNOWN:ri(u.code),u.message||"")||null)}else if("documentChange"in t){t.documentChange;let n=t.documentChange;n.document,n.document.name,n.document.updateTime;let s=rj(e,n.document.name),i=r$(n.document.updateTime),a=n.document.createTime?r$(n.document.createTime):et.min(),o=new e7({mapValue:{fields:n.document.fields}}),u=tH.newFoundDocument(s,i,a,o);r=new rx(n.targetIds||[],n.removedTargetIds||[],u.key,u)}else if("documentDelete"in t){t.documentDelete;let n=t.documentDelete;n.document;let s=rj(e,n.document),i=n.readTime?r$(n.readTime):et.min(),a=tH.newNoDocument(s,i);r=new rx([],n.removedTargetIds||[],a.key,a)}else if("documentRemove"in t){t.documentRemove;let n=t.documentRemove;n.document;let s=rj(e,n.document);r=new rx([],n.removedTargetIds||[],s,null)}else{if(!("filter"in t))return x(11601,{ft:t});{t.filter;let e=t.filter;e.targetId;let{count:n=0,unchangedNames:s}=e,i=new rs(n,s);r=new rN(e.targetId,i)}}return r}(this.serializer,e),r=function(e){if(!("targetChange"in e))return et.min();let t=e.targetChange;return t.targetIds&&t.targetIds.length?et.min():t.readTime?r$(t.readTime):et.min()}(e);return this.listener.zn(t,r)}jn(e){let t={};t.database=rG(this.serializer),t.addTarget=function(e,t){let r;let n=t.target;if((r=tZ(n)?{pipelineQuery:{structuredPipeline:{pipeline:{stages:n.stages.map(t=>t._toProto(e))}}}}:t0(n)?{documents:{documents:[rK(e,n.path)]}}:{query:function(e,t){var r,n;let s;let i={structuredQuery:{}},a=t.path;null!==t.collectionGroup?(s=a,i.structuredQuery.from=[{collectionId:t.collectionGroup,allDescendants:!0}]):(s=a.popLast(),i.structuredQuery.from=[{collectionId:a.lastSegment()}]),i.parent=rK(e,s);let o=function(e){if(0!==e.length)return function e(t){return t instanceof tU?function(e){if("=="===e.op){if(e3(e.value))return{unaryFilter:{field:rY(e.field),op:"IS_NAN"}};if(e2(e.value))return{unaryFilter:{field:rY(e.field),op:"IS_NULL"}}}else if("!="===e.op){if(e3(e.value))return{unaryFilter:{field:rY(e.field),op:"IS_NOT_NAN"}};if(e2(e.value))return{unaryFilter:{field:rY(e.field),op:"IS_NOT_NULL"}}}return{fieldFilter:{field:rY(e.field),op:rk[e.op],value:e.value}}}(t):t instanceof tO?function(t){let r=t.getFilters().map(t=>e(t));return 1===r.length?r[0]:{compositeFilter:{op:rL[t.op],filters:r}}}(t):x(54877,{filter:t})}(tO.create(e,"and"))}(t.filters);o&&(i.structuredQuery.where=o);let u=function(e){if(0!==e.length)return e.map(e=>({field:rY(e.field),direction:rD[e.dir]}))}(t.orderBy);u&&(i.structuredQuery.orderBy=u);let l=rU(e,t.limit);return null!==l&&(i.structuredQuery.limit=l),t.startAt&&(i.structuredQuery.startAt={before:(r=t.startAt).inclusive,values:r.position}),t.endAt&&(i.structuredQuery.endAt={before:!(n=t.endAt).inclusive,values:n.position}),{yt:i,parent:s}}(e,n).yt}).targetId=t.targetId,t.resumeToken.approximateByteSize()>0){r.resumeToken=rM(e,t.resumeToken);let n=rU(e,t.expectedCount);null!==n&&(r.expectedCount=n)}else if(t.snapshotVersion.compareTo(et.min())>0){r.readTime=rO(e,t.snapshotVersion.toTimestamp());let n=rU(e,t.expectedCount);null!==n&&(r.expectedCount=n)}return r}(this.serializer,e);let r=function(e,t){let r=function(e){switch(e){case"TargetPurposeListen":return null;case"TargetPurposeExistenceFilterMismatch":return"existence-filter-mismatch";case"TargetPurposeExistenceFilterMismatchBloom":return"existence-filter-mismatch-bloom";case"TargetPurposeLimboResolution":return"limbo-document";default:return x(28987,{purpose:e})}}(t.purpose);return null==r?null:{"goog-listen-tags":r}}(this.serializer,e);r&&(t.labels=r),this.Bn(t)}Hn(e){let t={};t.database=rG(this.serializer),t.removeTarget=e,this.Bn(t)}}class nf extends nd{constructor(e,t,r,n,s,i){super(e,"write_stream_connection_backoff","write_stream_idle","health_check_timeout",t,r,n,i),this.serializer=s}get Jn(){return this.Dn>0}start(){this.lastStreamToken=void 0,super.start()}qn(){this.Jn&&this.Yn([])}Qn(e,t){return this.connection.cn("Write",e,t)}Gn(e){return b(!!e.streamToken,31322),this.lastStreamToken=e.streamToken,b(!e.writeResults||0===e.writeResults.length,55816),this.listener.Zn()}onNext(e){var t,r;b(!!e.streamToken,12678),this.lastStreamToken=e.streamToken,this.xn.reset();let n=(t=e.writeResults,r=e.commitTime,t&&t.length>0?(b(void 0!==r,14353),t.map(e=>{let t;return(t=e.updateTime?r$(e.updateTime):r$(r)).isEqual(et.min())&&(t=r$(r)),new ty(t,e.transformResults||[])})):[]),s=r$(e.commitTime);return this.listener.Xn(s,n)}er(){let e={};e.database=rG(this.serializer),this.Bn(e)}Yn(e){let t={streamToken:this.lastStreamToken,writes:e.map(e=>(function(e,t){var r;let n;if(t instanceof tN)n={update:rW(e,t.key,t.value)};else if(t instanceof tC)n={delete:rQ(e,t.key)};else if(t instanceof tb)n={update:rW(e,t.key,t.data),updateMask:function(e){let t=[];return e.fields.forEach(e=>t.push(e.canonicalString())),{fieldPaths:t}}(t.fieldMask)};else{if(!(t instanceof tA))return x(16599,{gt:t.type});n={verify:rQ(e,t.key)}}return t.fieldTransforms.length>0&&(n.updateTransforms=t.fieldTransforms.map(e=>(function(e,t){let r=t.transform;if(r instanceof ti)return{fieldPath:t.field.canonicalString(),setToServerValue:"REQUEST_TIME"};if(r instanceof ta)return{fieldPath:t.field.canonicalString(),appendMissingElements:{values:r.elements}};if(r instanceof tu)return{fieldPath:t.field.canonicalString(),removeAllFromArray:{values:r.elements}};if(r instanceof th)return{fieldPath:t.field.canonicalString(),increment:r.Re};if(r instanceof td)return{fieldPath:t.field.canonicalString(),minimum:r.Re};if(r instanceof tm)return{fieldPath:t.field.canonicalString(),maximum:r.Re};throw x(20930,{transform:t.transform})})(0,e))),t.precondition.isNone||(n.currentDocument=void 0!==(r=t.precondition).updateTime?{updateTime:rF(e,r.updateTime)}:void 0!==r.exists?{exists:r.exists}:x(27497)),n})(this.serializer,e))};this.Bn(t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class np{}class ng extends np{constructor(e,t,r,n){super(),this.authCredentials=e,this.appCheckCredentials=t,this.connection=r,this.serializer=n,this.tr=!1}nr(){if(this.tr)throw new I(S.FAILED_PRECONDITION,"The client has already been terminated.")}Bt(e,t,r,n){return this.nr(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([s,i])=>this.connection.Bt(e,rq(t,r),n,s,i)).catch(e=>{throw"FirebaseError"===e.name?(e.code===S.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),e):new I(S.UNKNOWN,e.toString())})}$t(e,t,r,n,s){return this.nr(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([i,a])=>this.connection.$t(e,rq(t,r),n,i,a,s)).catch(e=>{throw"FirebaseError"===e.name?(e.code===S.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),e):new I(S.UNKNOWN,e.toString())})}terminate(){this.tr=!0,this.connection.terminate()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let ny=new Map,nw={didRun:!1,sequenceNumbersCollected:0,targetsRemoved:0,documentsRemoved:0};class nv{static withCacheSize(e){return new nv(e,nv.DEFAULT_COLLECTION_PERCENTILE,nv.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT)}constructor(e,t,r){this.cacheSizeCollectionThreshold=e,this.percentileToCollect=t,this.maximumSequenceNumbersToCollect=r}}nv.DEFAULT_COLLECTION_PERCENTILE=10,nv.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT=1e3,nv.DEFAULT=new nv(41943040,nv.DEFAULT_COLLECTION_PERCENTILE,nv.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT),nv.DISABLED=new nv(-1,0,0);/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let n_="LruGarbageCollector";function nE([e,t],[r,n]){let s=M(e,r);return 0===s?M(t,n):s}class nT{constructor(e){this.rr=e,this.buffer=new em(nE),this.ir=0}sr(){return++this.ir}_r(e){let t=[e,this.sr()];if(this.buffer.size<this.rr)this.buffer=this.buffer.add(t);else{let e=this.buffer.last();0>nE(t,e)&&(this.buffer=this.buffer.delete(e).add(t))}}get maxValue(){return this.buffer.last()[0]}}class nx{constructor(e,t,r){this.garbageCollector=e,this.asyncQueue=t,this.localStore=r,this.ar=null}start(){-1!==this.garbageCollector.params.cacheSizeCollectionThreshold&&this.ur(6e4)}stop(){this.ar&&(this.ar.cancel(),this.ar=null)}get started(){return null!==this.ar}ur(e){v(n_,`Garbage collection scheduled in ${e}ms`),this.ar=this.asyncQueue.enqueueAfterDelay("lru_garbage_collection",e,async()=>{this.ar=null;try{await this.localStore.collectGarbage(this.garbageCollector)}catch(e){eo(e)?v(n_,"Ignoring IndexedDB error during garbage collection: ",e):await ei(e)}await this.ur(3e5)})}}class nN{constructor(e,t){this.cr=e,this.params=t}calculateTargetCount(e,t){return this.cr.lr(e).next(e=>Math.floor(t/100*e))}nthSequenceNumber(e,t){if(0===t)return ea.resolve(eu.ce);let r=new nT(t);return this.cr.forEachTarget(e,e=>r._r(e.sequenceNumber)).next(()=>this.cr.Er(e,e=>r._r(e))).next(()=>r.maxValue)}removeTargets(e,t,r){return this.cr.removeTargets(e,t,r)}removeOrphanedDocuments(e,t){return this.cr.removeOrphanedDocuments(e,t)}collect(e,t){return -1===this.params.cacheSizeCollectionThreshold?(v("LruGarbageCollector","Garbage collection skipped; disabled"),ea.resolve(nw)):this.getCacheSize(e).next(r=>r<this.params.cacheSizeCollectionThreshold?(v("LruGarbageCollector",`Garbage collection skipped; Cache size ${r} is lower than threshold ${this.params.cacheSizeCollectionThreshold}`),nw):this.hr(e,t))}getCacheSize(e){return this.cr.getCacheSize(e)}hr(e,t){let r,n,s,i,a,o,u;let l=Date.now();return this.calculateTargetCount(e,this.params.percentileToCollect).next(t=>(t>this.params.maximumSequenceNumbersToCollect?(v("LruGarbageCollector",`Capping sequence numbers to collect down to the maximum of ${this.params.maximumSequenceNumbersToCollect} from ${t}`),n=this.params.maximumSequenceNumbersToCollect):n=t,i=Date.now(),this.nthSequenceNumber(e,n))).next(n=>(r=n,a=Date.now(),this.removeTargets(e,r,t))).next(t=>(s=t,o=Date.now(),this.removeOrphanedDocuments(e,r))).next(e=>(u=Date.now(),w()<=c.in.DEBUG&&v("LruGarbageCollector",`LRU Garbage Collection
	Counted targets in ${i-l}ms
	Determined least recently used ${n} in `+(a-i)+"ms\n"+`	Removed ${s} targets in `+(o-a)+"ms\n"+`	Removed ${e} documents in `+(u-o)+"ms\n"+`Total Duration: ${u-l}ms`),ea.resolve({didRun:!0,sequenceNumbersCollected:n,targetsRemoved:s,documentsRemoved:e})))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let nb="firestore.googleapis.com";class nS{constructor(e){if(void 0===e.host){if(void 0!==e.ssl)throw new I(S.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host=nb,this.ssl=!0}else this.host=e.host,this.ssl=e.ssl??!0;if(this.isUsingEmulator=void 0!==e.emulatorOptions,this.credentials=e.credentials,this.ignoreUndefinedProperties=!!e.ignoreUndefinedProperties,this.localCache=e.localCache,void 0===e.cacheSizeBytes)this.cacheSizeBytes=41943040;else{if(-1!==e.cacheSizeBytes&&e.cacheSizeBytes<1048576)throw new I(S.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=e.cacheSizeBytes}(function(e,t,r,n){if(!0===t&&!0===n)throw new I(S.INVALID_ARGUMENT,`${e} and ${r} cannot be used together.`)})("experimentalForceLongPolling",e.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",e.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!e.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:void 0===e.experimentalAutoDetectLongPolling?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!e.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=r5(e.experimentalLongPollingOptions??{}),function(e){if(void 0!==e.timeoutSeconds){if(isNaN(e.timeoutSeconds))throw new I(S.INVALID_ARGUMENT,`invalid long polling timeout: ${e.timeoutSeconds} (must not be NaN)`);if(e.timeoutSeconds<5)throw new I(S.INVALID_ARGUMENT,`invalid long polling timeout: ${e.timeoutSeconds} (minimum allowed value is 5)`);if(e.timeoutSeconds>30)throw new I(S.INVALID_ARGUMENT,`invalid long polling timeout: ${e.timeoutSeconds} (maximum allowed value is 30)`)}}(this.experimentalLongPollingOptions),this.useFetchStreams=!!e.useFetchStreams}isEqual(e){var t,r;return this.host===e.host&&this.ssl===e.ssl&&this.credentials===e.credentials&&this.cacheSizeBytes===e.cacheSizeBytes&&this.experimentalForceLongPolling===e.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===e.experimentalAutoDetectLongPolling&&(t=this.experimentalLongPollingOptions,r=e.experimentalLongPollingOptions,t.timeoutSeconds===r.timeoutSeconds)&&this.ignoreUndefinedProperties===e.ignoreUndefinedProperties&&this.useFetchStreams===e.useFetchStreams}}class nI{constructor(e,t,r,n){this._authCredentials=e,this._appCheckCredentials=t,this._databaseId=r,this._app=n,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new nS({}),this._settingsFrozen=!1,this._emulatorOptions={},this._terminateTask="notTerminated"}get app(){if(!this._app)throw new I(S.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return"notTerminated"!==this._terminateTask}_setSettings(e){if(this._settingsFrozen)throw new I(S.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new nS(e),this._emulatorOptions=e.emulatorOptions||{},void 0!==e.credentials&&(this._authCredentials=function(e){if(!e)return new A;switch(e.type){case"firstParty":return new R(e.sessionIndex||"0",e.iamToken||null,e.authTokenFactory||null);case"provider":return e.client;default:throw new I(S.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}}(e.credentials))}_getSettings(){return this._settings}_getEmulatorOptions(){return this._emulatorOptions}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return"notTerminated"===this._terminateTask&&(this._terminateTask=this._terminate()),this._terminateTask}async _restart(){"notTerminated"===this._terminateTask?await this._terminate():this._terminateTask="notTerminated"}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return function(e){let t=ny.get(e);t&&(v("ComponentProvider","Removing Datastore"),ny.delete(e),t.terminate())}(this),Promise.resolve()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nV{constructor(e,t,r){this.converter=t,this._query=r,this.type="query",this.firestore=e}withConverter(e){return new nV(this.firestore,e,this._query)}}class nC{constructor(e,t,r){this.converter=t,this._key=r,this.type="document",this.firestore=e}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new nA(this.firestore,this.converter,this._key.path.popLast())}withConverter(e){return new nC(this.firestore,e,this._key)}toJSON(){return{type:nC._jsonSchemaVersion,referencePath:this._key.toString()}}static fromJSON(e,t,r){if(Z(t,nC._jsonSchema))return new nC(e,r||null,new G(Q.fromString(t.referencePath)))}}nC._jsonSchemaVersion="firestore/documentReference/1.0",nC._jsonSchema={type:X("string",nC._jsonSchemaVersion),referencePath:X("string")};class nA extends nV{constructor(e,t,r){super(e,t,new t1(r)),this._path=r,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){let e=this._path.popLast();return e.isEmpty()?null:new nC(this.firestore,null,new G(e))}withConverter(e){return new nA(this.firestore,e,this._path)}}function nD(e,t,...r){if(e=(0,u.m9)(e),1==arguments.length&&(t=P.newId()),/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function(e,t,r){if(!r)throw new I(S.INVALID_ARGUMENT,`Function doc() cannot be called with an empty ${t}.`)}(0,"path",t),e instanceof nI){let n=Q.fromString(t,...r);return H(n),new nC(e,null,new G(n))}{if(!(e instanceof nC||e instanceof nA))throw new I(S.INVALID_ARGUMENT,"Expected first argument to doc() to be a CollectionReference, a DocumentReference or FirebaseFirestore");let n=e._path.child(Q.fromString(t,...r));return H(n),new nC(e.firestore,e instanceof nA?e.converter:null,new G(n))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nk{constructor(e){this._values=(e||[]).map(e=>e)}toArray(){return this._values.map(e=>e)}isEqual(e){return function(e,t){if(e.length!==t.length)return!1;for(let r=0;r<e.length;++r)if(e[r]!==t[r])return!1;return!0}(this._values,e._values)}toJSON(){return{type:nk._jsonSchemaVersion,vectorValues:this._values}}static fromJSON(e){if(Z(e,nk._jsonSchema)){if(Array.isArray(e.vectorValues)&&e.vectorValues.every(e=>"number"==typeof e))return new nk(e.vectorValues);throw new I(S.INVALID_ARGUMENT,"Expected 'vectorValues' field to be a number array")}}}nk._jsonSchemaVersion="firestore/vectorValue/1.0",nk._jsonSchema={type:X("string",nk._jsonSchemaVersion),vectorValues:X("object")};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let nL=/^__.*__$/;class nR{constructor(e,t,r){this.data=e,this.fieldMask=t,this.fieldTransforms=r}toMutation(e,t){return null!==this.fieldMask?new tb(e,this.data,this.fieldMask,t,this.fieldTransforms):new tN(e,this.data,t,this.fieldTransforms)}}class nU{constructor(e,t,r){this.data=e,this.fieldMask=t,this.fieldTransforms=r}toMutation(e,t){return new tb(e,this.data,this.fieldMask,t,this.fieldTransforms)}}function nO(e){switch(e){case 0:case 2:case 1:return!0;case 3:case 4:return!1;default:throw x(40011,{dataSource:e})}}class nP{constructor(e,t,r,n,s,i){this.settings=e,this.databaseId=t,this.serializer=r,this.ignoreUndefinedProperties=n,void 0===s&&this.validatePath(),this.fieldTransforms=s||[],this.fieldMask=i||[]}get path(){return this.settings.path}get dataSource(){return this.settings.dataSource}contextWith(e){return new nP({...this.settings,...e},this.databaseId,this.serializer,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask)}childContextForField(e){let t=this.path?.child(e),r=this.contextWith({path:t,arrayElement:!1});return r.validatePathSegment(e),r}childContextForFieldPath(e){let t=this.path?.child(e),r=this.contextWith({path:t,arrayElement:!1});return r.validatePath(),r}childContextForArray(e){return this.contextWith({path:void 0,arrayElement:!0})}createError(e){return nX(e,this.settings.methodName,this.settings.hasConverter||!1,this.path,this.settings.targetDoc)}contains(e){return void 0!==this.fieldMask.find(t=>e.isPrefixOf(t))||void 0!==this.fieldTransforms.find(t=>e.isPrefixOf(t.field))}validatePath(){if(this.path)for(let e=0;e<this.path.length;e++)this.validatePathSegment(this.path.get(e))}validatePathSegment(e){if(0===e.length)throw this.createError("Document fields must not be empty");if(nO(this.dataSource)&&nL.test(e))throw this.createError('Document fields cannot begin and end with "__"')}}class nM{constructor(e,t,r){this.databaseId=e,this.ignoreUndefinedProperties=t,this.serializer=r||r2(e)}createContext(e,t,r,n=!1){return new nP({dataSource:e,methodName:t,targetDoc:r,path:K.emptyPath(),arrayElement:!1,hasConverter:n},this.databaseId,this.serializer,this.ignoreUndefinedProperties)}}function nF(e){let t=e._freezeSettings(),r=r2(e._databaseId);return new nM(e._databaseId,!!t.ignoreUndefinedProperties,r)}function n$(e,t,r,n,s,i={}){let a,o;let u=e.createContext(i.merge||i.mergeFields?2:0,t,r,s);nH("Data must be an object, but it was:",u,n);let l=nK(n,u);if(i.merge)a=new ep(u.fieldMask),o=u.fieldTransforms;else if(i.mergeFields){let e=[];for(let n of i.mergeFields){let s=nW(t,n,r);if(!u.contains(s))throw new I(S.INVALID_ARGUMENT,`Field '${s}' is specified in your field mask but missing from your input data.`);nZ(e,s)||e.push(s)}a=new ep(e),o=u.fieldTransforms.filter(e=>a.covers(e.field))}else a=null,o=u.fieldTransforms;return new nR(new e7(l),a,o)}class nB extends r6{_toFieldTransform(e){if(2!==e.dataSource)throw 1===e.dataSource?e.createError(`${this._methodName}() can only appear at the top level of your update data`):e.createError(`${this._methodName}() cannot be used with set() unless you pass {merge:true}`);return e.fieldMask.push(e.path),null}isEqual(e){return e instanceof nB}}function nq(e,t,r,n){let s=e.createContext(1,t,r);nH("Data must be an object, but it was:",s,n);let i=[],a=e7.empty();return ey(n,(e,n)=>{let o=nJ(t,e,r);n=(0,u.m9)(n);let l=s.childContextForFieldPath(o);if(n instanceof nB)i.push(o);else{let e=nj(n,l);null!=e&&(i.push(o),a.set(o,e))}}),new nU(a,new ep(i),s.fieldTransforms)}function nz(e,t,r,n,s,i){let a=e.createContext(1,t,r),o=[nW(t,n,r)],l=[s];if(i.length%2!=0)throw new I(S.INVALID_ARGUMENT,`Function ${t}() needs to be called with an even number of arguments that alternate between field names and values.`);for(let e=0;e<i.length;e+=2)o.push(nW(t,i[e])),l.push(i[e+1]);let c=[],h=e7.empty();for(let e=o.length-1;e>=0;--e)if(!nZ(c,o[e])){let t=o[e],r=l[e];r=(0,u.m9)(r);let n=a.childContextForFieldPath(t);if(r instanceof nB)c.push(t);else{let e=nj(r,n);null!=e&&(c.push(t),h.set(t,e))}}return new nU(h,new ep(c),a.fieldTransforms)}function nQ(e,t,r,n=!1){return nj(r,e.createContext(n?4:3,t))}function nj(e,t,r){if(nG(e=(0,u.m9)(e)))return nH("Unsupported field value:",t,e),nK(e,t);if(e instanceof r6)return function(e,t){if(!nO(t.dataSource))throw t.createError(`${e._methodName}() can only be used with update() and set()`);if(!t.path)throw t.createError(`${e._methodName}() is not currently supported inside arrays`);let r=e._toFieldTransform(t);r&&t.fieldTransforms.push(r)}(e,t),null;if(void 0===e&&t.ignoreUndefinedProperties)return null;if(t.path&&t.fieldMask.push(t.path),e instanceof Array){if(t.settings.arrayElement&&4!==t.dataSource)throw t.createError("Nested arrays are not supported");return function(e,t){let r=[],n=0;for(let s of e){let e=nj(s,t.childContextForArray(n));null==e&&(e={nullValue:"NULL_VALUE"}),r.push(e),n++}return{arrayValue:{values:r}}}(e,t)}return function(e,t,r){if(null===(e=(0,u.m9)(e)))return{nullValue:"NULL_VALUE"};if("number"==typeof e)return tr(t.serializer,e,r);if("boolean"==typeof e)return{booleanValue:e};if("string"==typeof e)return{stringValue:e};if(e instanceof Date){let r=ee.fromDate(e);return{timestampValue:rO(t.serializer,r)}}if(e instanceof ee){let r=new ee(e.seconds,1e3*Math.floor(e.nanoseconds/1e3));return{timestampValue:rO(t.serializer,r)}}if(e instanceof r9)return{geoPointValue:{latitude:e.latitude,longitude:e.longitude}};if(e instanceof r3)return{bytesValue:rM(t.serializer,e._byteString)};if(e instanceof nC){let r=t.databaseId,n=e.firestore._databaseId;if(!n.isEqual(r))throw t.createError(`Document reference is for database ${n.projectId}/${n.database} but should be for database ${r.projectId}/${r.database}`);return{referenceValue:rB(e.firestore._databaseId||t.databaseId,e._key.path)}}if(e instanceof nk){var n;return{mapValue:{fields:{[eO]:{stringValue:eF},[e$]:{arrayValue:{values:((n=e)instanceof nk?n.toArray():n).map(e=>{if("number"!=typeof e)throw t.createError("VectorValues must only contain numeric values.");return te(t.serializer,e)})}}}}}}if(rZ(e))return e._toProto(t.serializer);throw t.createError(`Unsupported field value: ${Y(e)}`)}(e,t,r)}function nK(e,t){let r={};return ew(e)?t.path&&t.path.length>0&&t.fieldMask.push(t.path):ey(e,(e,n)=>{let s=nj(n,t.childContextForField(e));null!=s&&(r[e]=s)}),{mapValue:{fields:r}}}function nG(e){return!("object"!=typeof e||null===e||e instanceof Array||e instanceof Date||e instanceof ee||e instanceof r9||e instanceof r3||e instanceof nC||e instanceof r6||e instanceof nk||rZ(e))}function nH(e,t,r){if(!nG(r)||!W(r)){let n=Y(r);throw"an object"===n?t.createError(e+" a custom object"):t.createError(e+" "+n)}}function nW(e,t,r){if((t=(0,u.m9)(t))instanceof r4)return t._internalPath;if("string"==typeof t)return nJ(e,t);throw nX("Field path arguments must be of type string or ",e,!1,void 0,r)}let nY=RegExp("[~\\*/\\[\\]]");function nJ(e,t,r){if(t.search(nY)>=0)throw nX(`Invalid field path (${t}). Paths must not contain '~', '*', '/', '[', or ']'`,e,!1,void 0,r);try{return new r4(...t.split("."))._internalPath}catch(n){throw nX(`Invalid field path (${t}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,e,!1,void 0,r)}}function nX(e,t,r,n,s){let i=n&&!n.isEmpty(),a=void 0!==s,o=`Function ${t}() called with invalid data`;r&&(o+=" (via `toFirestore()`)"),o+=". ";let u="";return(i||a)&&(u+=" (found",i&&(u+=` in field ${n}`),a&&(u+=` in document ${s}`),u+=")"),new I(S.INVALID_ARGUMENT,o+e+u)}function nZ(e,t){return e.some(e=>e.isEqual(t))}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class n0{constructor(e){this.optionDefinitions=e}_getKnownOptions(e,t){let r=e7.empty();for(let n in this.optionDefinitions)if(this.optionDefinitions.hasOwnProperty(n)){let s=this.optionDefinitions[n];if(n in e){let i;let a=e[n];s.nestedOptions&&W(a)?i={mapValue:{fields:new n0(s.nestedOptions).getOptionsProto(t,a)}}:a&&(i=nj(a,t)??void 0),i&&r.set(K.fromServerFormat(s.serverName),i)}}return r}getOptionsProto(e,t,r){let n=this._getKnownOptions(t,e);if(r){let t=new Map(function(e,t){let r=[];for(let n in e)Object.prototype.hasOwnProperty.call(e,n)&&r.push(t(e[n],n,e));return r}(r,(t,r)=>[K.fromServerFormat(r),void 0!==t?nj(t,e):null]));n.setAll(t)}return n.value.mapValue.fields??{}}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function n1(e){var t;return e instanceof n4?e:W(e)?function(e,t){let r=[];for(let t in e)if(Object.prototype.hasOwnProperty.call(e,t)){let n=e[t];r.push(st(t)),r.push(n1(n))}return new sn("map",r,"map")}(e):e instanceof Array?(t="array",new sn("array",e.map(e=>n1(e)),t)):sr(e,void 0)}function n2(e){if(e instanceof n4)return e;if(e instanceof nk)return st(e);if(Array.isArray(e))return st(new nk(e));throw Error("Unsupported value: "+typeof e)}function n3(e){var t;return"string"==typeof e?(t="field",new n7("string"==typeof e?q===e?new r4(q)._internalPath:nW("field",e):e._internalPath,t)):n1(e)}class n4{constructor(){this._protoValueType="ProtoValue"}add(e){return new sn("add",[this,n1(e)],"add")}asBoolean(){if(this instanceof ss)return this;if(this instanceof se)return new sa(this);if(this instanceof n7)return new so(this);if(this instanceof sn)return new si(this);throw new I("invalid-argument",`Conversion of type ${typeof this} to BooleanExpression not supported.`)}subtract(e){return new sn("subtract",[this,n1(e)],"subtract")}multiply(e){return new sn("multiply",[this,n1(e)],"multiply")}divide(e){return new sn("divide",[this,n1(e)],"divide")}mod(e){return new sn("mod",[this,n1(e)],"mod")}equal(e){return new sn("equal",[this,n1(e)],"equal").asBoolean()}notEqual(e){return new sn("not_equal",[this,n1(e)],"notEqual").asBoolean()}lessThan(e){return new sn("less_than",[this,n1(e)],"lessThan").asBoolean()}lessThanOrEqual(e){return new sn("less_than_or_equal",[this,n1(e)],"lessThanOrEqual").asBoolean()}greaterThan(e){return new sn("greater_than",[this,n1(e)],"greaterThan").asBoolean()}greaterThanOrEqual(e){return new sn("greater_than_or_equal",[this,n1(e)],"greaterThanOrEqual").asBoolean()}arrayConcat(e,...t){return new sn("array_concat",[this,...[e,...t].map(e=>n1(e))],"arrayConcat")}arrayContains(e){return new sn("array_contains",[this,n1(e)],"arrayContains").asBoolean()}arrayContainsAll(e){return new sn("array_contains_all",[this,Array.isArray(e)?new n8(e.map(n1),"arrayContainsAll"):e],"arrayContainsAll").asBoolean()}arrayContainsAny(e){return new sn("array_contains_any",[this,Array.isArray(e)?new n8(e.map(n1),"arrayContainsAny"):e],"arrayContainsAny").asBoolean()}arrayReverse(){return new sn("array_reverse",[this])}arrayLength(){return new sn("array_length",[this],"arrayLength")}equalAny(e){return new sn("equal_any",[this,Array.isArray(e)?new n8(e.map(n1),"equalAny"):e],"equalAny").asBoolean()}notEqualAny(e){return new sn("not_equal_any",[this,Array.isArray(e)?new n8(e.map(n1),"notEqualAny"):e],"notEqualAny").asBoolean()}exists(){return new sn("exists",[this],"exists").asBoolean()}charLength(){return new sn("char_length",[this],"charLength")}like(e){return new sn("like",[this,n1(e)],"like").asBoolean()}regexContains(e){return new sn("regex_contains",[this,n1(e)],"regexContains").asBoolean()}regexFind(e){return new sn("regex_find",[this,n1(e)],"regexFind")}regexFindAll(e){return new sn("regex_find_all",[this,n1(e)],"regexFindAll")}regexMatch(e){return new sn("regex_match",[this,n1(e)],"regexMatch").asBoolean()}stringContains(e){return new sn("string_contains",[this,n1(e)],"stringContains").asBoolean()}startsWith(e){return new sn("starts_with",[this,n1(e)],"startsWith").asBoolean()}endsWith(e){return new sn("ends_with",[this,n1(e)],"endsWith").asBoolean()}toLower(){return new sn("to_lower",[this],"toLower")}toUpper(){return new sn("to_upper",[this],"toUpper")}trim(e){let t=[this];return e&&t.push(n1(e)),new sn("trim",t,"trim")}ltrim(e){let t=[this];return e&&t.push(n1(e)),new sn("ltrim",t,"ltrim")}rtrim(e){let t=[this];return e&&t.push(n1(e)),new sn("rtrim",t,"rtrim")}type(){return new sn("type",[this])}isType(e){return new sn("is_type",[this,st(e)],"isType").asBoolean()}stringConcat(e,...t){return new sn("string_concat",[this,...[e,...t].map(n1)],"stringConcat")}stringIndexOf(e){return new sn("string_index_of",[this,n1(e)],"stringIndexOf")}stringRepeat(e){return new sn("string_repeat",[this,n1(e)],"stringRepeat")}stringReplaceAll(e,t){return new sn("string_replace_all",[this,n1(e),n1(t)],"stringReplaceAll")}stringReplaceOne(e,t){return new sn("string_replace_one",[this,n1(e),n1(t)],"stringReplaceOne")}concat(e,...t){return new sn("concat",[this,...[e,...t].map(n1)],"concat")}reverse(){return new sn("reverse",[this],"reverse")}arrayFilter(e,t){return new sn("array_filter",[this,n1(e),t],"arrayFilter")}arrayTransform(e,t){return new sn("array_transform",[this,n1(e),t],"arrayTransform")}arrayTransformWithIndex(e,t,r){return new sn("array_transform",[this,n1(e),n1(t),r],"arrayTransformWithIndex")}arraySlice(e,t){let r=[this,n1(e)];return void 0!==t&&r.push(n1(t)),new sn("array_slice",r,"arraySlice")}arrayFirst(){return new sn("array_first",[this],"arrayFirst")}arrayFirstN(e){return new sn("array_first_n",[this,n1(e)],"arrayFirstN")}arrayLast(){return new sn("array_last",[this],"arrayLast")}arrayLastN(e){return new sn("array_last_n",[this,n1(e)],"arrayLastN")}arrayMaximum(){return new sn("maximum",[this],"arrayMaximum")}arrayMaximumN(e){return new sn("maximum_n",[this,n1(e)],"arrayMaximumN")}arrayMinimum(){return new sn("minimum",[this],"arrayMinimum")}arrayMinimumN(e){return new sn("minimum_n",[this,n1(e)],"arrayMinimumN")}arrayIndexOf(e){return new sn("array_index_of",[this,n1(e),n1("first")],"arrayIndexOf")}arrayLastIndexOf(e){return new sn("array_index_of",[this,n1(e),n1("last")],"arrayLastIndexOf")}arrayIndexOfAll(e){return new sn("array_index_of_all",[this,n1(e)],"arrayIndexOfAll")}byteLength(){return new sn("byte_length",[this],"byteLength")}ceil(){return new sn("ceil",[this])}floor(){return new sn("floor",[this])}abs(){return new sn("abs",[this])}exp(){return new sn("exp",[this])}mapGet(e){return new sn("map_get",[this,st(e)],"mapGet")}mapSet(e,t,...r){return new sn("map_set",[this,n1(e),n1(t),...r.map(n1)],"mapSet")}mapKeys(){return new sn("map_keys",[this],"mapKeys")}mapValues(){return new sn("map_values",[this],"mapValues")}mapEntries(){return new sn("map_entries",[this],"mapEntries")}getField(e){return new sn("get_field",[this,n1(e)],"get_field")}count(){return n6._create("count",[this],"count")}sum(){return n6._create("sum",[this],"sum")}average(){return n6._create("average",[this],"average")}minimum(){return n6._create("minimum",[this],"minimum")}maximum(){return n6._create("maximum",[this],"maximum")}first(){return n6._create("first",[this],"first")}last(){return n6._create("last",[this],"last")}arrayAgg(){return n6._create("array_agg",[this],"arrayAgg")}arrayAggDistinct(){return n6._create("array_agg_distinct",[this],"arrayAggDistinct")}countDistinct(){return n6._create("count_distinct",[this],"countDistinct")}logicalMaximum(e,...t){return new sn("maximum",[this,...[e,...t].map(n1)],"logicalMaximum")}logicalMinimum(e,...t){return new sn("minimum",[this,...[e,...t].map(n1)],"minimum")}vectorLength(){return new sn("vector_length",[this],"vectorLength")}cosineDistance(e){return new sn("cosine_distance",[this,n2(e)],"cosineDistance")}dotProduct(e){return new sn("dot_product",[this,n2(e)],"dotProduct")}euclideanDistance(e){return new sn("euclidean_distance",[this,n2(e)],"euclideanDistance")}unixMicrosToTimestamp(){return new sn("unix_micros_to_timestamp",[this],"unixMicrosToTimestamp")}timestampToUnixMicros(){return new sn("timestamp_to_unix_micros",[this],"timestampToUnixMicros")}unixMillisToTimestamp(){return new sn("unix_millis_to_timestamp",[this],"unixMillisToTimestamp")}timestampToUnixMillis(){return new sn("timestamp_to_unix_millis",[this],"timestampToUnixMillis")}unixSecondsToTimestamp(){return new sn("unix_seconds_to_timestamp",[this],"unixSecondsToTimestamp")}timestampToUnixSeconds(){return new sn("timestamp_to_unix_seconds",[this],"timestampToUnixSeconds")}timestampAdd(e,t){return new sn("timestamp_add",[this,n1(e),n1(t)],"timestampAdd")}timestampSubtract(e,t){return new sn("timestamp_subtract",[this,n1(e),n1(t)],"timestampSubtract")}timestampDiff(e,t){return new sn("timestamp_diff",[this,n3(e),n1(t)],"timestampDiff")}timestampExtract(e,t){let r=[this,n1(e)];return t&&r.push(n1(t)),new sn("timestamp_extract",r,"timestampExtract")}documentId(){return new sn("document_id",[this],"documentId")}parent(){return new sn("parent",[this],"parent")}substring(e,t){let r=n1(e);return new sn("substring",void 0===t?[this,r]:[this,r,n1(t)],"substring")}arrayGet(e){return new sn("array_get",[this,n1(e)],"arrayGet")}isError(){return new sn("is_error",[this],"isError").asBoolean()}ifError(e){let t=new sn("if_error",[this,n1(e)],"ifError");return e instanceof ss?t.asBoolean():t}isAbsent(){return new sn("is_absent",[this],"isAbsent").asBoolean()}mapRemove(e){return new sn("map_remove",[this,n1(e)],"mapRemove")}mapMerge(e,...t){return new sn("map_merge",[this,n1(e),...t.map(n1)],"mapMerge")}pow(e){return new sn("pow",[this,n1(e)])}trunc(e){return void 0===e?new sn("trunc",[this]):new sn("trunc",[this,n1(e)],"trunc")}round(e){return void 0===e?new sn("round",[this]):new sn("round",[this,n1(e)],"round")}collectionId(){return new sn("collection_id",[this])}length(){return new sn("length",[this])}ln(){return new sn("ln",[this])}sqrt(){return new sn("sqrt",[this])}stringReverse(){return new sn("string_reverse",[this])}ifAbsent(e){return new sn("if_absent",[this,n1(e)],"ifAbsent")}ifNull(e){return new sn("if_null",[this,n1(e)],"ifNull")}coalesce(e,...t){return new sn("coalesce",[this,n1(e),...t.map(n1)],"coalesce")}join(e){return new sn("join",[this,n1(e)],"join")}log10(){return new sn("log10",[this])}arraySum(){return new sn("sum",[this])}split(e){return new sn("split",[this,n1(e)])}timestampTruncate(e,t){let r=[this,n1(e)];return t&&r.push(n1(t)),new sn("timestamp_trunc",r)}ascending(){return new su(n3(this),"ascending","ascending")}descending(){return new su(n3(this),"descending","descending")}as(e){return new n5(this,e,"as")}}class n6{constructor(e,t){this.name=e,this.params=t,this.exprType="AggregateFunction",this._protoValueType="ProtoValue"}static _create(e,t,r){let n=new n6(e,t);return n._methodName=r,n}as(e){return new n9(this,e,"as")}_toProto(e){return{functionValue:{name:this.name,args:this.params.map(t=>t._toProto(e))}}}_readUserData(e){e=this._methodName?e.contextWith({methodName:this._methodName}):e,this.params.forEach(t=>t._readUserData(e))}}class n9{constructor(e,t,r){this.aggregate=e,this.alias=t,this._methodName=r}_readUserData(e){this.aggregate._readUserData(e)}}class n5{constructor(e,t,r){this.expr=e,this.alias=t,this._methodName=r,this.exprType="AliasedExpression",this.selectable=!0}_readUserData(e){this.expr._readUserData(e)}}class n8 extends n4{constructor(e,t){super(),this.Rr=e,this._methodName=t,this.expressionType="ListOfExpressions"}_toProto(e){return{arrayValue:{values:this.Rr.map(t=>t._toProto(e))}}}_readUserData(e){this.Rr.forEach(t=>t._readUserData(e))}}class n7 extends n4{constructor(e,t){super(),this.fieldPath=e,this._methodName=t,this.expressionType="Field",this.selectable=!0}get _fieldPath(){return this.fieldPath}get fieldName(){return this.fieldPath.canonicalString()}get alias(){return this.fieldName}get expr(){return this}geoDistance(e){return new sn("geo_distance",[this,n1(e)],"geoDistance")}_toProto(e){return{fieldReferenceValue:this.fieldPath.canonicalString()}}_readUserData(e){}}class se extends n4{constructor(e,t){super(),this.value=e,this._methodName=t,this.expressionType="Constant"}static _fromProto(e){let t=new se(e,void 0);return t._protoValue=e,t}_toProto(e){return b(void 0!==this._protoValue,237),this._protoValue}_getValue(){return this._protoValue}_readUserData(e){var t,r,n,s,i,a,o;e=this._methodName?e.contextWith({methodName:this._methodName}):e,"object"==typeof(t=this._protoValue)&&null!==t&&("nullValue"in t&&(null===t.nullValue||"NULL_VALUE"===t.nullValue)||"booleanValue"in t&&(null===t.booleanValue||"boolean"==typeof t.booleanValue)||"integerValue"in t&&(null===t.integerValue||"number"==typeof t.integerValue||"string"==typeof t.integerValue)||"doubleValue"in t&&(null===t.doubleValue||"number"==typeof t.doubleValue)||"timestampValue"in t&&(null===t.timestampValue||"object"==typeof(r=t.timestampValue)&&null!==r&&"seconds"in r&&(null===r.seconds||"number"==typeof r.seconds||"string"==typeof r.seconds)&&"nanos"in r&&(null===r.nanos||"number"==typeof r.nanos))||"stringValue"in t&&(null===t.stringValue||"string"==typeof t.stringValue)||"bytesValue"in t&&(null===t.bytesValue||t.bytesValue instanceof Uint8Array)||"referenceValue"in t&&(null===t.referenceValue||"string"==typeof t.referenceValue)||"geoPointValue"in t&&(null===t.geoPointValue||"object"==typeof(n=t.geoPointValue)&&null!==n&&"latitude"in n&&(null===n.latitude||"number"==typeof n.latitude)&&"longitude"in n&&(null===n.longitude||"number"==typeof n.longitude))||"arrayValue"in t&&(null===t.arrayValue||"object"==typeof(s=t.arrayValue)&&null!==s&&!(!("values"in s)||null!==s.values&&!Array.isArray(s.values)))||"mapValue"in t&&(null===t.mapValue||"object"==typeof(i=t.mapValue)&&null!==i&&!(!("fields"in i)||null!==i.fields&&!W(i.fields)))||"fieldReferenceValue"in t&&(null===t.fieldReferenceValue||"string"==typeof t.fieldReferenceValue)||"functionValue"in t&&(null===t.functionValue||"object"==typeof(a=t.functionValue)&&null!==a&&!(!("name"in a)||null!==a.name&&"string"!=typeof a.name||!("args"in a)||null!==a.args&&!Array.isArray(a.args)))||"pipelineValue"in t&&(null===t.pipelineValue||"object"==typeof(o=t.pipelineValue)&&null!==o&&!(!("stages"in o)||null!==o.stages&&!Array.isArray(o.stages))))||(this._protoValue=nj(this.value,e))}}function st(e,t){return sr(e,"constant")}function sr(e,t){let r=new se(e,t);return"boolean"==typeof e?new sa(r):r}class sn extends n4{constructor(e,t,r,n){super(),this.name=e,this.params=t,this.expressionType="Function",this._optionsProto=void 0,void 0!==r&&(this._methodName=r),void 0!==n&&(this._options=n)}get _optionsUtil(){return new n0({})}_toProto(e){let t={functionValue:{name:this.name,args:this.params.map(t=>t._toProto(e))}};return this._optionsProto&&(t.functionValue.options=this._optionsProto),t}_readUserData(e){e=this._methodName?e.contextWith({methodName:this._methodName}):e,this.params.forEach(t=>t._readUserData(e)),this._options&&(this._optionsProto=this._optionsUtil.getOptionsProto(e,this._options))}}class ss extends n4{get _methodName(){return this._expr._methodName}countIf(){return n6._create("count_if",[this],"countIf")}not(){return new sn("not",[this],"not").asBoolean()}conditional(e,t){return new sn("conditional",[this,e,t],"conditional")}ifError(e){let t=n1(e),r=new sn("if_error",[this,t],"ifError");return t instanceof ss?r.asBoolean():r}_toProto(e){return this._expr._toProto(e)}_readUserData(e){this._expr._readUserData(e)}}class si extends ss{constructor(e){super(),this._expr=e,this.expressionType="Function"}}class sa extends ss{constructor(e){super(),this._expr=e,this.expressionType="Constant"}_getValue(){return this._expr._getValue()}}class so extends ss{constructor(e){super(),this._expr=e,this.expressionType="Field"}}class su{constructor(e,t,r){this.expr=e,this.direction=t,this._methodName=r,this._protoValueType="ProtoValue"}_toProto(e){return{mapValue:{fields:{direction:r1(this.direction),expression:this.expr._toProto(e)}}}}_readUserData(e){this.expr._readUserData(e)}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sl{constructor(e){this.optionsProto=void 0,{rawOptions:this.rawOptions,...this.knownOptions}=e}_readUserData(e){this.optionsProto=this._optionsUtil.getOptionsProto(e,this.knownOptions,this.rawOptions)}_toProto(e){return{name:this._name,options:this.optionsProto}}}class sc extends sl{get _name(){return"add_fields"}get _optionsUtil(){return new n0({})}constructor(e,t){super(t),this.fields=e}_toProto(e){return{...super._toProto(e),args:[r0(e,this.fields)]}}_readUserData(e){super._readUserData(e),sx(this.fields,e)}}class sh extends sl{get _name(){return"aggregate"}get _optionsUtil(){return new n0({})}constructor(e,t,r){super(r),this.groups=e,this.accumulators=t}_toProto(e){return{...super._toProto(e),args:[r0(e,this.accumulators),r0(e,this.groups)]}}_readUserData(e){super._readUserData(e),sx(this.groups,e),sx(this.accumulators,e)}}class sd extends sl{get _name(){return"distinct"}get _optionsUtil(){return new n0({})}constructor(e,t){super(t),this.groups=e}_toProto(e){return{...super._toProto(e),args:[r0(e,this.groups)]}}_readUserData(e){super._readUserData(e),sx(this.groups,e)}}class sm extends sl{get _name(){return"collection"}get _optionsUtil(){return new n0({forceIndex:{serverName:"force_index"}})}constructor(e,t){super(t),this.Vr=e.startsWith("/")?e:"/"+e}_toProto(e){return{...super._toProto(e),args:[{referenceValue:this.Vr}]}}_readUserData(e){super._readUserData(e)}}class sf extends sl{get _name(){return"collection_group"}get _optionsUtil(){return new n0({forceIndex:{serverName:"force_index"}})}constructor(e,t){super(t),this.collectionId=e}_toProto(e){return{...super._toProto(e),args:[{referenceValue:""},{stringValue:this.collectionId}]}}_readUserData(e){super._readUserData(e)}}class sp extends sl{get _name(){return"database"}get _optionsUtil(){return new n0({})}_toProto(e){return{...super._toProto(e)}}_readUserData(e){super._readUserData(e)}}class sg extends sl{get _name(){return"documents"}get _optionsUtil(){return new n0({})}constructor(e,t){if(super(t),!e||0===e.length)throw new I(S.INVALID_ARGUMENT,"Empty document paths are not allowed in DocumentsSource");let r=e.map(e=>e.startsWith("/")?e:"/"+e),n=new Set(r);if(n.size!==r.length)throw new I(S.INVALID_ARGUMENT,"Duplicate document paths are not allowed in DocumentsSource");this.dr=r,this.mr=n}_toProto(e){return{...super._toProto(e),args:this.dr.map(e=>({referenceValue:e}))}}_readUserData(e){super._readUserData(e)}}class sy extends sl{get _name(){return"where"}get _optionsUtil(){return new n0({})}constructor(e,t){super(t),this.condition=e}_toProto(e){return{...super._toProto(e),args:[this.condition._toProto(e)]}}_readUserData(e){super._readUserData(e),sx(this.condition,e)}}class sw extends sl{get _name(){return"limit"}get _optionsUtil(){return new n0({})}constructor(e,t){b(!isNaN(e)&&e!==1/0&&e!==-1/0,34860),super(t),this.limit=e}_toProto(e){return{...super._toProto(e),args:[tr(e,this.limit)]}}}class sv extends sl{get _name(){return"offset"}get _optionsUtil(){return new n0({})}constructor(e,t){super(t),this.offset=e}_toProto(e){return{...super._toProto(e),args:[tr(e,this.offset)]}}}class s_ extends sl{get _name(){return"select"}get _optionsUtil(){return new n0({})}constructor(e,t){super(t),this.selections=e}_toProto(e){return{...super._toProto(e),args:[r0(e,this.selections)]}}_readUserData(e){super._readUserData(e),sx(this.selections,e)}}class sE extends sl{get _name(){return"sort"}get _optionsUtil(){return new n0({})}constructor(e,t){super(t),this.orderings=e}_toProto(e){return{...super._toProto(e),args:this.orderings.map(t=>t._toProto(e))}}_readUserData(e){super._readUserData(e),sx(this.orderings,e)}}class sT extends sl{get _name(){return"replace_with"}get _optionsUtil(){return new n0({})}constructor(e,t){super(t),this.map=e}_toProto(e){return{...super._toProto(e),args:[this.map._toProto(e),r1(sT.pr)]}}_readUserData(e){super._readUserData(e),sx(this.map,e)}}function sx(e,t){return"function"==typeof e._readUserData?e._readUserData(t):Array.isArray(e)?e.forEach(e=>e._readUserData(t)):e instanceof Map?e.forEach(e=>e._readUserData(t)):Object.values(e).forEach(e=>e._readUserData(t)),e}sT.pr="full_replace";// Copyright 2024 Google LLC* @license
class sN{constructor(e,t,r){this.serializer=e,this.stages=t,this.listenOptions=r,this.isCorePipeline=!0}getPipelineCollection(){return sS(this)}getPipelineCollectionGroup(){return sI(this)}getPipelineCollectionId(){return function(e){switch(sb(e)){case"collection":return Q.fromString(sS(e)).lastSegment();case"collection_group":return sI(e);default:return}}(this)}getPipelineDocuments(){return sV(this)}getPipelineFlavor(){var e;let t;return e=this,t="exact",e.stages.forEach((r,n)=>{r._name!==sd.name&&r._name!==sh.name||(t="keyless"),r._name===s_.name&&"exact"===t&&(t="augmented"),r._name===sc.name&&n<e.stages.length-1&&"exact"===t&&(t="augmented")}),t}getPipelineSourceType(){return sb(this)}}function sb(e){let t=e.stages[0];return t instanceof sm||t instanceof sf||t instanceof sp||t instanceof sg?t._name:"unknown"}function sS(e){if("collection"===sb(e))return e.stages[0].Vr}function sI(e){if("collection_group"===sb(e))return e.stages[0].collectionId}function sV(e){if("documents"===sb(e))return e.stages[0].dr}// Copyright 2024 Google LLC* @license
class sC{constructor(e,t){this.type=e,this.value=t}static vr(){return new sC("ERROR",void 0)}static Sr(){return new sC("UNSET",void 0)}static Dr(){return new sC("NULL",eB)}static newValue(e){return e2(e)?new sC("NULL",eB):e&&"booleanValue"in e?new sC("BOOLEAN",e):eX(e)?new sC("INT",e):eZ(e)?new sC("DOUBLE",e):e&&"timestampValue"in e&&e.timestampValue?new sC("TIMESTAMP",e):e&&"stringValue"in e?new sC("STRING",e):e&&"bytesValue"in e?new sC("BYTES",e):e.referenceValue?new sC("REFERENCE",e):e.geoPointValue?new sC("GEO_POINT",e):e1(e)?new sC("ARRAY",e):e6(e)?new sC("VECTOR",e):e4(e)?new sC("MAP",e):new sC("ERROR",void 0)}Cr(){return"ERROR"===this.type||"UNSET"===this.type}Fr(){return"NULL"===this.type}}function sA(e){if(!e.Cr())return e.value}function sD(e){return e instanceof ss?e._expr:e}function sk(e){if((e=sD(e))instanceof n7)return new sL(e);if(e instanceof se)return new sR(e);if(e instanceof n8)return new sU(e);if(e instanceof sn){if("add"===e.name)return new sq(e);if("subtract"===e.name)return new sz(e);if("multiply"===e.name)return new sQ(e);if("divide"===e.name)return new sj(e);if("mod"===e.name)return new sK(e);if("and"===e.name)return new sG(e);if("equal"===e.name)return new s7(e);if("not_equal"===e.name)return new ie(e);if("less_than"===e.name)return new it(e);if("less_than_or_equal"===e.name)return new ir(e);if("greater_than"===e.name)return new is(e);if("greater_than_or_equal"===e.name)return new ii(e);if("array_concat"===e.name)return new ia(e);if("array_reverse"===e.name)return new io(e);if("array_contains"===e.name)return new iu(e);if("array_contains_all"===e.name)return new il(e);if("array_contains_any"===e.name)return new ic(e);if("array_length"===e.name)return new ih(e);if("array_element"===e.name)return new id(e);if("equal_any"===e.name)return new sJ(e);if("not_equal_any"===e.name)return new sX(e);if("is_nan"===e.name)return new sZ(e);if("is_not_nan"===e.name)return new s0(e);if("is_null"===e.name)return new s1(e);if("is_not_null"===e.name)return new s2(e);if("is_error"===e.name)return new s3(e);if("exists"===e.name)return new s4(e);if("not"===e.name)return new sH(e);if("or"===e.name)return new sW(e);if("xor"===e.name)return new sY(e);if("conditional"===e.name)return new s6(e);if("maximum"===e.name)return new s9(e);if("minimum"===e.name)return new s5(e);if("reverse"===e.name)return new im(e);if("replace_first"===e.name)return new ip(e);if("replace_all"===e.name)return new ig(e);if("char_length"===e.name)return new iy(e);if("byte_length"===e.name)return new iw(e);if("like"===e.name)return new i_(e);if("regex_contains"===e.name)return new iE(e);if("regex_match"===e.name)return new iT(e);if("string_contains"===e.name)return new ix(e);if("starts_with"===e.name)return new iN(e);if("ends_with"===e.name)return new ib(e);if("to_lower"===e.name)return new iS(e);if("to_upper"===e.name)return new iI(e);if("trim"===e.name)return new iV(e);if("string_concat"===e.name)return new iC(e);if("map_get"===e.name)return new iA(e);if("cosine_distance"===e.name)return new ik(e);if("dot_product"===e.name)return new iL(e);if("euclidean_distance"===e.name)return new iR(e);if("vector_length"===e.name)return new iU(e);if("unix_micros_to_timestamp"===e.name)return new iW(e);if("timestamp_to_unix_micros"===e.name)return new iZ(e);if("unix_millis_to_timestamp"===e.name)return new iY(e);if("timestamp_to_unix_millis"===e.name)return new i0(e);if("unix_seconds_to_timestamp"===e.name)return new iJ(e);if("timestamp_to_unix_seconds"===e.name)return new i1(e);if("timestamp_add"===e.name)return new i3(e);if("timestamp_subtract"===e.name)return new i4(e)}throw Error(`Unknown Expr : ${e}`)}class sL{constructor(e){this.expr=e}evaluate(e,t){if(this.expr.fieldName===q)return sC.newValue({referenceValue:rQ(e.serializer,t.key)});if("__update_time__"===this.expr.fieldName)return sC.newValue({timestampValue:rF(e.serializer,t.version)});if("__create_time__"===this.expr.fieldName)return sC.newValue({timestampValue:rF(e.serializer,t.createTime)});let r=t.data.field(this.expr._fieldPath);return r?eC(r)?sC.newValue(function(e,t){if("estimate"===e.serverTimestampBehavior)return{timestampValue:rF(e.serializer,et.fromTimestamp(eD(t)))};if("previous"===e.serverTimestampBehavior){let e=eA(t);if(e)return e}return{nullValue:"NULL_VALUE"}}(e,r)):sC.newValue(r):sC.Sr()}}class sR{constructor(e){this.expr=e}evaluate(e,t){return sC.newValue(this.expr._getValue())}}class sU{constructor(e){this.expr=e}evaluate(e,t){let r=this.expr.Rr.map(r=>sk(r).evaluate(e,t));return r.some(e=>e.Cr())?sC.vr():sC.newValue({arrayValue:{values:r.map(e=>e.value)}})}}function sO(e){return eZ(e)?Number(e.doubleValue):Number(e.integerValue)}function sP(e){return BigInt(e.integerValue)}let sM=BigInt("0x7fffffffffffffff"),sF=-BigInt("0x8000000000000000");class s${constructor(e){this.expr=e}evaluate(e,t){b(this.expr.params.length>=2,24778);let r=sk(this.expr.params[0]).evaluate(e,t),n=sk(this.expr.params[1]).evaluate(e,t),s=this.Or(r,n);for(let r of this.expr.params.slice(2)){let n=sk(r).evaluate(e,t);s=this.Or(s,n)}return s}Or(e,t){if(e.Cr()||t.Cr())return sC.vr();if(e.Fr()||t.Fr())return sC.Dr();let r=e.value,n=t.value;if(!eZ(r)&&!eX(r)||!eZ(n)&&!eX(n))return sC.vr();if(eZ(r)||eZ(n)){let e=this.Mr(r,n);return e?sC.newValue(e):sC.vr()}if(eX(r)&&eX(n)){let e=this.Nr(r,n);return void 0===e?sC.vr():"number"==typeof e?sC.newValue({doubleValue:e}):e<sF||e>sM?sC.vr():sC.newValue({integerValue:`${e}`})}return sC.vr()}}function sB(e,t){return eQ(e)!==eQ(t)?"TYPE_MISMATCH":e3(e)||e3(t)?"NOT_EQ":e2(e)&&e2(t)?"EQ":e2(e)||e2(t)?"NULL":e1(e)&&e1(t)?function(e,t){if(e.values?.length!==t.values?.length)return"NOT_EQ";let r=!1;for(let n=0;n<(e.values?.length??0);n++){let s=e.values[n],i=t.values[n];switch(sB(s,i)){case"EQ":break;case"NOT_EQ":case"TYPE_MISMATCH":return"NOT_EQ";case"NULL":r=!0;break;default:x(44609,{Lr:s,Br:i})}}return r?"NULL":"EQ"}(e.arrayValue,t.arrayValue):e6(e)&&e6(t)||e4(e)&&e4(t)?function(e,t){let r=e.fields||{},n=t.fields||{};if(eg(r)!==eg(n))return"NOT_EQ";let s=!1;for(let e in r)if(r.hasOwnProperty(e)){if(void 0===n[e])return"NOT_EQ";switch(sB(r[e],n[e])){case"NOT_EQ":case"TYPE_MISMATCH":return"NOT_EQ";case"NULL":s=!0}}return s?"NULL":"EQ"}(e.mapValue,t.mapValue):ej(e,t,{Te:!1,Ee:!0,he:!0})?"EQ":"NOT_EQ"}class sq extends s${Nr(e,t){return sP(e)+sP(t)}Mr(e,t){return{doubleValue:sO(e)+sO(t)}}}class sz extends s${constructor(e){super(e),this.expr=e}Nr(e,t){return sP(e)-sP(t)}Mr(e,t){return{doubleValue:sO(e)-sO(t)}}}class sQ extends s${constructor(e){super(e),this.expr=e}Nr(e,t){return sP(e)*sP(t)}Mr(e,t){return{doubleValue:sO(e)*sO(t)}}}class sj extends s${constructor(e){super(e),this.expr=e}Nr(e,t){let r=sP(t);if(r!==BigInt(0))return sP(e)/r}Mr(e,t){let r=sO(t);return 0===r?{doubleValue:el(r)?Number.NEGATIVE_INFINITY:Number.POSITIVE_INFINITY}:{doubleValue:sO(e)/r}}}class sK extends s${constructor(e){super(e),this.expr=e}Nr(e,t){let r=sP(t);if(r!==BigInt(0))return sP(e)%r}Mr(e,t){let r=sO(t);if(0!==r)return{doubleValue:sO(e)%r}}}class sG{constructor(e){this.expr=e}evaluate(e,t){let r=!1,n=!1;for(let s of this.expr.params){let i=sk(s).evaluate(e,t);switch(i.type){case"BOOLEAN":if(!i.value?.booleanValue)return sC.newValue(ez);break;case"NULL":n=!0;break;default:r=!0}}return r?sC.vr():n?sC.Dr():sC.newValue(eq)}}class sH{constructor(e){this.expr=e}evaluate(e,t){b(1===this.expr.params.length,9634);let r=sk(this.expr.params[0]).evaluate(e,t);switch(r.type){case"BOOLEAN":return sC.newValue({booleanValue:!r.value?.booleanValue});case"NULL":return sC.Dr();default:return sC.vr()}}}class sW{constructor(e){this.expr=e}evaluate(e,t){let r=!1,n=!1;for(let s of this.expr.params){let i=sk(s).evaluate(e,t);switch(i.type){case"BOOLEAN":if(i.value?.booleanValue)return sC.newValue(eq);break;case"NULL":n=!0;break;default:r=!0}}return r?sC.vr():n?sC.Dr():sC.newValue(ez)}}class sY{constructor(e){this.expr=e}evaluate(e,t){let r=!1,n=!1;for(let s of this.expr.params){let i=sk(s).evaluate(e,t);switch(i.type){case"BOOLEAN":r=sY.xor(r,!!i.value?.booleanValue);break;case"NULL":n=!0;break;default:return sC.vr()}}return n?sC.Dr():sC.newValue({booleanValue:r})}static xor(e,t){return(e||t)&&!(e&&t)}}class sJ{constructor(e){this.expr=e}evaluate(e,t){b(2===this.expr.params.length,55094);let r=!1,n=sk(this.expr.params[0]).evaluate(e,t);switch(n.type){case"NULL":r=!0;break;case"ERROR":case"UNSET":return sC.vr()}let s=sk(this.expr.params[1]).evaluate(e,t);switch(s.type){case"ARRAY":break;case"NULL":r=!0;break;default:return sC.vr()}if(r)return sC.Dr();for(let e of s.value?.arrayValue?.values??[])switch(e2(n.value)&&e2(e)?"EQ":sB(n.value,e)){case"EQ":return sC.newValue(eq);case"NOT_EQ":case"TYPE_MISMATCH":break;case"NULL":r=!0;break;default:x(44608,{value:n.value,candidate:e})}return r?sC.Dr():sC.newValue(ez)}}class sX{constructor(e){this.expr=e}evaluate(e,t){return new sH(new sn("not",[new sn("equal_any",this.expr.params)])).evaluate(e,t)}}class sZ{constructor(e){this.expr=e}evaluate(e,t){b(1===this.expr.params.length,23322);let r=sk(this.expr.params[0]).evaluate(e,t);switch(r.type){case"INT":return sC.newValue(ez);case"DOUBLE":return sC.newValue({booleanValue:isNaN(sO(r.value))});case"NULL":return sC.Dr();default:return sC.vr()}}}class s0{constructor(e){this.expr=e}evaluate(e,t){return b(1===this.expr.params.length,50406),new sH(new sn("not",[new sn("is_nan",this.expr.params)])).evaluate(e,t)}}class s1{constructor(e){this.expr=e}evaluate(e,t){switch(b(1===this.expr.params.length,23123),sk(this.expr.params[0]).evaluate(e,t).type){case"NULL":return sC.newValue(eq);case"UNSET":case"ERROR":return sC.vr();default:return sC.newValue(ez)}}}class s2{constructor(e){this.expr=e}evaluate(e,t){return b(1===this.expr.params.length,23167),new sH(new sn("not",[new sn("is_null",this.expr.params)])).evaluate(e,t)}}class s3{constructor(e){this.expr=e}evaluate(e,t){return b(1===this.expr.params.length,5228),"ERROR"===sk(this.expr.params[0]).evaluate(e,t).type?sC.newValue(eq):sC.newValue(ez)}}class s4{constructor(e){this.expr=e}evaluate(e,t){switch(b(1===this.expr.params.length,6877),sk(this.expr.params[0]).evaluate(e,t).type){case"ERROR":return sC.vr();case"UNSET":return sC.newValue(ez);default:return sC.newValue(eq)}}}class s6{constructor(e){this.expr=e}evaluate(e,t){b(3===this.expr.params.length,11706);let r=sk(this.expr.params[0]).evaluate(e,t);switch(r.type){case"BOOLEAN":return r.value?.booleanValue?sk(this.expr.params[1]).evaluate(e,t):sk(this.expr.params[2]).evaluate(e,t);case"NULL":return sk(this.expr.params[2]).evaluate(e,t);default:return sC.vr()}}}class s9{constructor(e){this.expr=e}evaluate(e,t){let r;for(let n of this.expr.params.map(r=>sk(r).evaluate(e,t)))switch(n.type){case"ERROR":case"UNSET":case"NULL":continue;default:r=void 0===r||eG(n.value,r.value)>0?n:r}return void 0===r?sC.Dr():r}}class s5{constructor(e){this.expr=e}evaluate(e,t){let r;for(let n of this.expr.params.map(r=>sk(r).evaluate(e,t)))switch(n.type){case"ERROR":case"UNSET":case"NULL":continue;default:r=void 0===r||0>eG(n.value,r.value)?n:r}return void 0===r?sC.Dr():r}}class s8{constructor(e){this.expr=e}evaluate(e,t){b(2===this.expr.params.length,31033,`${this.expr.name}() function should have exactly 2 params`);let r=sk(this.expr.params[0]).evaluate(e,t);switch(r.type){case"ERROR":case"UNSET":return sC.vr()}let n=sk(this.expr.params[1]).evaluate(e,t);switch(n.type){case"ERROR":case"UNSET":return sC.vr()}return this.Ur(r,n)}}class s7 extends s8{constructor(e){super(e),this.expr=e}Ur(e,t){if(e.Fr()&&t.Fr())return sC.newValue(eq);if(e.Fr()||t.Fr()||e3(e.value)||e3(t.value)||eQ(e.value)!==eQ(t.value))return sC.newValue(ez);switch(sB(e.value,t.value)){case"EQ":return sC.newValue(eq);case"NOT_EQ":return sC.newValue(ez);case"NULL":return sC.Dr();default:x(44615,{left:e,right:t})}}}class ie extends s8{constructor(e){super(e),this.expr=e}Ur(e,t){switch(sB(e.value,t.value)){case"EQ":return sC.newValue(ez);case"NOT_EQ":case"TYPE_MISMATCH":return sC.newValue(eq);case"NULL":return sC.Dr();default:x(44614,{left:e,right:t})}}}class it extends s8{constructor(e){super(e),this.expr=e}Ur(e,t){return eQ(e.value)!==eQ(t.value)||e3(e.value)||e3(t.value)?sC.newValue(ez):sC.newValue({booleanValue:0>eG(e.value,t.value)})}}class ir extends s8{constructor(e){super(e),this.expr=e}Ur(e,t){return eQ(e.value)!==eQ(t.value)||e3(e.value)||e3(t.value)?sC.newValue(ez):"EQ"===sB(e.value,t.value)?sC.newValue(eq):sC.newValue({booleanValue:0>eG(e.value,t.value)})}}class is extends s8{constructor(e){super(e),this.expr=e}Ur(e,t){return eQ(e.value)!==eQ(t.value)||e3(e.value)||e3(t.value)?sC.newValue(ez):sC.newValue({booleanValue:eG(e.value,t.value)>0})}}class ii extends s8{constructor(e){super(e),this.expr=e}Ur(e,t){return eQ(e.value)!==eQ(t.value)||e3(e.value)||e3(t.value)?sC.newValue(ez):"EQ"===sB(e.value,t.value)?sC.newValue(eq):sC.newValue({booleanValue:eG(e.value,t.value)>0})}}class ia{constructor(e){this.expr=e}evaluate(e,t){throw Error("Unimplemented")}}class io{constructor(e){this.expr=e}evaluate(e,t){b(1===this.expr.params.length,216);let r=sk(this.expr.params[0]).evaluate(e,t);switch(r.type){case"NULL":return sC.Dr();case"ARRAY":{let e=r.value.arrayValue?.values??[];return sC.newValue({arrayValue:{values:[...e].reverse()}})}default:return sC.vr()}}}class iu{constructor(e){this.expr=e}evaluate(e,t){return b(2===this.expr.params.length,52884),new sJ(new sn("eq_any",[this.expr.params[1],this.expr.params[0]])).evaluate(e,t)}}class il{constructor(e){this.expr=e}evaluate(e,t){b(2===this.expr.params.length,1392);let r=!1,n=sk(this.expr.params[0]).evaluate(e,t);switch(n.type){case"ARRAY":break;case"NULL":r=!0;break;default:return sC.vr()}let s=sk(this.expr.params[1]).evaluate(e,t);switch(s.type){case"ARRAY":break;case"NULL":r=!0;break;default:return sC.vr()}if(r)return sC.Dr();let i=s.value?.arrayValue?.values??[],a=n.value?.arrayValue?.values??[];for(let e of i){let t=!1;for(let n of(r=!1,a)){switch(e2(e)&&e2(n)?"EQ":sB(e,n)){case"EQ":t=!0;break;case"NOT_EQ":case"TYPE_MISMATCH":break;case"NULL":r=!0;break;default:x(44613,{value:n,search:e})}if(t)break}if(!t)return sC.newValue(ez)}return sC.newValue(eq)}}class ic{constructor(e){this.expr=e}evaluate(e,t){b(2===this.expr.params.length,2680);let r=!1,n=sk(this.expr.params[0]).evaluate(e,t);switch(n.type){case"ARRAY":break;case"NULL":r=!0;break;default:return sC.vr()}let s=sk(this.expr.params[1]).evaluate(e,t);switch(s.type){case"ARRAY":break;case"NULL":r=!0;break;default:return sC.vr()}if(r)return sC.Dr();let i=s.value?.arrayValue?.values??[];for(let e of n.value?.arrayValue?.values??[])for(let t of i)switch(e2(e)&&e2(t)?"EQ":sB(e,t)){case"EQ":return sC.newValue(eq);case"NOT_EQ":case"TYPE_MISMATCH":break;case"NULL":r=!0;break;default:x(44608,{value:e,search:t})}return r?sC.Dr():sC.newValue(ez)}}class ih{constructor(e){this.expr=e}evaluate(e,t){b(1===this.expr.params.length,38605);let r=sk(this.expr.params[0]).evaluate(e,t);switch(r.type){case"NULL":return sC.Dr();case"ARRAY":return sC.newValue({integerValue:`${r.value?.arrayValue?.values?.length??0}`});default:return sC.vr()}}}class id{constructor(e){this.expr=e}evaluate(e,t){throw Error("Unimplemented")}}class im{constructor(e){this.expr=e}evaluate(e,t){b(1===this.expr.params.length,1508);let r=sk(this.expr.params[0]).evaluate(e,t);switch(r.type){case"NULL":return sC.Dr();case"BYTES":{let e=r.value?.bytesValue;if("string"==typeof e){let t=e_.fromBase64String(e).toUint8Array();return t.reverse(),sC.newValue({bytesValue:e_.fromUint8Array(t).toBase64()})}return sC.newValue({bytesValue:new Uint8Array(e).reverse()})}case"STRING":{let e=r.value?.stringValue,t=Array.from(new Intl.__PRIVATE_Segmenter(void 0,{granularity:"grapheme"}).segment(e),e=>e.segment).reverse();return sC.newValue({stringValue:t.join("")})}default:return sC.vr()}}}class ip{constructor(e){this.expr=e}evaluate(e,t){throw Error("Unimplemented")}}class ig{constructor(e){this.expr=e}evaluate(e,t){throw Error("Unimplemented")}}class iy{constructor(e){this.expr=e}evaluate(e,t){b(1===this.expr.params.length,19400);let r=sk(this.expr.params[0]).evaluate(e,t);switch(r.type){case"NULL":return sC.Dr();case"STRING":{let e=function(e){let t=0;for(let r=0;r<e.length;r++){let n=e.codePointAt(r);if(void 0===n)return;if(n<=65535){if(n>=55296&&n<=57343){if(n<=56319){let n=e.codePointAt(r+1);void 0!==n&&n>=56320&&n<=57343?(t+=1,r++):t+=1}else t+=1}else t+=1}else{if(!(n<=1114111))return;t+=1,r++}}return t}(r.value.stringValue);return void 0===e?sC.vr():sC.newValue({integerValue:e})}default:return sC.vr()}}}class iw{constructor(e){this.expr=e}evaluate(e,t){b(1===this.expr.params.length,8486);let r=sk(this.expr.params[0]).evaluate(e,t);switch(r.type){case"BYTES":{let e=r.value?.bytesValue;return"string"==typeof e?sC.newValue({integerValue:e_.fromBase64String(e).toUint8Array().length}):sC.newValue({integerValue:new Uint8Array(e).length})}case"STRING":{let e=function(e){let t=0;for(let r=0;r<e.length;r++){let n=e.codePointAt(r);if(void 0===n)return;if(n>=55296&&n<=57343){if(!(n<=56319))return;{let n=e.codePointAt(r+1);if(void 0===n||!(n>=56320&&n<=57343))return;t+=4,r++}}else if(n<=127)t+=1;else if(n<=2047)t+=2;else if(n<=65535)t+=3;else{if(!(n<=1114111))return;t+=4,r++}}return t}(r.value?.stringValue);return void 0===e?sC.vr():sC.newValue({integerValue:e})}case"NULL":return sC.Dr();default:return sC.vr()}}}class iv{constructor(e){this.expr=e}evaluate(e,t){b(2===this.expr.params.length,39773,`${this.expr.name}() function should have exactly two parameters`);let r=!1,n=sk(this.expr.params[0]).evaluate(e,t);switch(n.type){case"STRING":break;case"NULL":r=!0;break;default:return sC.vr()}let s=sk(this.expr.params[1]).evaluate(e,t);switch(s.type){case"STRING":break;case"NULL":r=!0;break;default:return sC.vr()}return r?sC.Dr():this.kr(n.value?.stringValue,s.value?.stringValue)}}class i_ extends iv{kr(e,t){try{let r=function(e){let t="";for(let r=0;r<e.length;r++){let n=e.charAt(r);switch(n){case"_":t+=".";break;case"%":t+=".*";break;case"\\":case".":case"*":case"?":case"+":case"^":case"$":case"|":case"(":case")":case"[":case"]":case"{":case"}":t+="\\"+n;break;default:t+=n}}return"^"+t+"$"}(t),n=d.n_.compile(r);return sC.newValue({booleanValue:n.matches(e)})}catch(e){return E(`Invalid LIKE pattern converted to regex: ${t}, returning error. Error: ${e}`),sC.vr()}}}class iE extends iv{kr(e,t){try{let r=d.n_.compile(t);return sC.newValue({booleanValue:r.matcher(e).find()})}catch(e){return E(`Invalid regex pattern found in regex_contains: ${t}, returning error`),sC.vr()}}}class iT extends iv{kr(e,t){try{return sC.newValue({booleanValue:d.n_.compile(t).matches(e)})}catch(e){return E(`Invalid regex pattern found in regex_match: ${t}, returning error`),sC.vr()}}}class ix extends iv{kr(e,t){return sC.newValue({booleanValue:e.includes(t)})}}class iN extends iv{kr(e,t){return sC.newValue({booleanValue:e.startsWith(t)})}}class ib extends iv{kr(e,t){return sC.newValue({booleanValue:e.endsWith(t)})}}class iS{constructor(e){this.expr=e}evaluate(e,t){b(1===this.expr.params.length,29079);let r=sk(this.expr.params[0]).evaluate(e,t);switch(r.type){case"STRING":return sC.newValue({stringValue:r.value?.stringValue?.toLowerCase()});case"NULL":return sC.Dr();default:return sC.vr()}}}class iI{constructor(e){this.expr=e}evaluate(e,t){b(1===this.expr.params.length,60487);let r=sk(this.expr.params[0]).evaluate(e,t);switch(r.type){case"STRING":return sC.newValue({stringValue:r.value?.stringValue?.toUpperCase()});case"NULL":return sC.Dr();default:return sC.vr()}}}class iV{constructor(e){this.expr=e}evaluate(e,t){b(1===this.expr.params.length,28544);let r=sk(this.expr.params[0]).evaluate(e,t);switch(r.type){case"STRING":return sC.newValue({stringValue:r.value?.stringValue?.trim()});case"NULL":return sC.Dr();default:return sC.vr()}}}class iC{constructor(e){this.expr=e}evaluate(e,t){let r=this.expr.params.map(r=>sk(r).evaluate(e,t)),n="",s=!1;for(let e of r)switch(e.type){case"STRING":n+=e.value.stringValue;break;case"NULL":s=!0;break;default:return sC.vr()}return s?sC.Dr():sC.newValue({stringValue:n})}}class iA{constructor(e){this.expr=e}evaluate(e,t){b(2===this.expr.params.length,4483);let r=sk(this.expr.params[0]).evaluate(e,t);switch(r.type){case"UNSET":return sC.Sr();case"MAP":break;default:return sC.vr()}let n=sk(this.expr.params[1]).evaluate(e,t);if("STRING"!==n.type)return sC.vr();let s=r.value?.mapValue?.fields?.[n.value?.stringValue];return void 0===s?sC.Sr():sC.newValue(s)}}class iD{constructor(e){this.expr=e}evaluate(e,t){b(2===this.expr.params.length,25231,`${this.expr.name}() function should have exactly 2 params`);let r=!1,n=sk(this.expr.params[0]).evaluate(e,t);switch(n.type){case"VECTOR":break;case"NULL":r=!0;break;default:return sC.vr()}let s=sk(this.expr.params[1]).evaluate(e,t);switch(s.type){case"VECTOR":break;case"NULL":r=!0;break;default:return sC.vr()}if(r)return sC.Dr();let i=e9(n.value),a=e9(s.value);if(void 0===i||void 0===a||i.values?.length!==a.values?.length)return sC.vr();let o=this.qr(i,a);return void 0===o||isNaN(o)?sC.vr():sC.newValue({doubleValue:o})}}class ik extends iD{qr(e,t){let r=e?.values??[],n=t?.values??[];if(0===r.length)return;let s=0,i=0,a=0;for(let e=0;e<r.length;e++){if(!e0(r[e])||!e0(n[e]))return;let t=sO(r[e]),o=sO(n[e]);s+=t*o,i+=t*t,a+=o*o}let o=Math.sqrt(i)*Math.sqrt(a);if(0!==o)return 1-Math.max(-1,Math.min(1,s/o))}}class iL extends iD{qr(e,t){let r=e?.values??[],n=t?.values??[];if(0===r.length)return 0;let s=0;for(let e=0;e<r.length;e++){if(!e0(r[e])||!e0(n[e]))return;s+=sO(r[e])*sO(n[e])}return s}}class iR extends iD{qr(e,t){let r=e?.values??[],n=t?.values??[];if(0===r.length)return 0;let s=0;for(let e=0;e<r.length;e++){if(!e0(r[e])||!e0(n[e]))return;s+=Math.pow(sO(r[e])-sO(n[e]),2)}return Math.sqrt(s)}}class iU{constructor(e){this.expr=e}evaluate(e,t){b(1===this.expr.params.length,39044);let r=sk(this.expr.params[0]).evaluate(e,t);switch(r.type){case"VECTOR":{let e=e9(r.value);return sC.newValue({integerValue:e?.values?.length??0})}case"NULL":return sC.Dr();default:return sC.vr()}}}let iO=BigInt(-62135596800),iP=BigInt(253402300799),iM=BigInt(1e3),iF=BigInt(1e6),i$=iO*iM,iB=iP*iM+BigInt(999),iq=iO*iF,iz=iP*iF+BigInt(999999);function iQ(e){return e>=iq&&e<=iz}function ij(e,t){let r=BigInt(e);return!(r<iO||r>iP)&&!(t<0||t>=1e9)&&(r!==iO||0===t)&&!(r===iP&&t>999999999)}function iK(e,t){return t<0?{seconds:e-1,nanos:t+1e9}:{seconds:e,nanos:t}}function iG(e){return BigInt(e.seconds)*iF+BigInt(Math.trunc(e.nanoseconds/1e3))}class iH{constructor(e){this.expr=e}evaluate(e,t){b(1===this.expr.params.length,49262,`${this.expr.name}() function should have exactly one parameter`);let r=sk(this.expr.params[0]).evaluate(e,t);switch(r.type){case"INT":return this.toTimestamp(BigInt(r.value.integerValue));case"NULL":return sC.Dr();default:return sC.vr()}}}class iW extends iH{toTimestamp(e){if(!iQ(e))return sC.vr();let t=Number(e/iF),r=Number(e%iF*BigInt(1e3)),n=iK(t,r);return ij(t=n.seconds,r=n.nanos)?sC.newValue({timestampValue:{seconds:t,nanos:r}}):sC.vr()}}class iY extends iH{toTimestamp(e){if(!(e>=i$&&e<=iB))return sC.vr();let t=Number(e/iM),r=Number(e%iM*BigInt(1e6)),n=iK(t,r);return ij(t=n.seconds,r=n.nanos)?sC.newValue({timestampValue:{seconds:t,nanos:r}}):sC.vr()}}class iJ extends iH{toTimestamp(e){if(!(e>=iO&&e<=iP))return sC.vr();let t=Number(e);return sC.newValue({timestampValue:{seconds:t,nanos:0}})}}class iX{constructor(e){this.expr=e}evaluate(e,t){b(1===this.expr.params.length,1265,`${this.expr.name}() function should have exactly one parameter`);let r=sk(this.expr.params[0]).evaluate(e,t);switch(r.type){case"TIMESTAMP":break;case"NULL":return sC.Dr();default:return sC.vr()}let n=rP(r.value.timestampValue);return ij(n.seconds,n.nanoseconds)?this.$r(n):sC.vr()}}class iZ extends iX{$r(e){let t=iG(e);return iQ(t)?sC.newValue({integerValue:`${t.toString()}`}):sC.vr()}}class i0 extends iX{$r(e){let t=iG(e),r=t/BigInt(1e3),n=t%BigInt(1e3);return r>BigInt(0)||n===BigInt(0)?sC.newValue({integerValue:r.toString()}):sC.newValue({integerValue:(r-BigInt(1)).toString()})}}class i1 extends iX{$r(e){let t=BigInt(e.seconds);return t>=iO&&t<=iP?sC.newValue({integerValue:t.toString()}):sC.vr()}}class i2{constructor(e){this.expr=e}evaluate(e,t){let r,n;b(3===this.expr.params.length,2775,`${this.expr.name}() function should have exactly 3 parameters`);let s=!1,i=sk(this.expr.params[0]).evaluate(e,t);switch(i.type){case"TIMESTAMP":break;case"NULL":s=!0;break;default:return sC.vr()}let a=sk(this.expr.params[1]).evaluate(e,t);switch(a.type){case"STRING":if(void 0===(r=function(e){switch(e){case"microsecond":return"microsecond";case"millisecond":return"millisecond";case"second":return"second";case"minute":return"minute";case"hour":return"hour";case"day":return"day";default:return}}(a.value.stringValue)))return sC.vr();break;case"NULL":s=!0;break;default:return sC.vr()}let o=sk(this.expr.params[2]).evaluate(e,t);switch(o.type){case"INT":break;case"NULL":s=!0;break;default:return sC.vr()}if(s)return sC.Dr();let u=BigInt(o.value.integerValue);try{switch(r){case"microsecond":n=u;break;case"millisecond":n=u*BigInt(1e3);break;case"second":n=u*BigInt(1e6);break;case"minute":n=u*BigInt(6e7);break;case"hour":n=u*BigInt(36e8);break;case"day":n=u*BigInt(864e8);break;default:return sC.vr()}if("microsecond"!==r&&u!==BigInt(0)&&n/u!==BigInt(this.Kr(r)))return sC.vr()}catch(e){return E(`Error during timestamp arithmetic: ${e}`),sC.vr()}let l=rP(i.value.timestampValue);if(!ij(l.seconds,l.nanoseconds))return sC.vr();let c=iG(l),h=this.Wr(c,n);if(!iQ(h))return sC.vr();let d=Number(h/iF),m=h%iF,f=Number((m<0?m+iF:m)*BigInt(1e3)),p=m<0?d-1:d;return ij(p,f)?sC.newValue({timestampValue:{seconds:p,nanos:f}}):sC.vr()}Kr(e){switch(e){case"millisecond":return 1e3;case"second":return 1e6;case"minute":return 6e7;case"hour":return 36e8;case"day":return 864e8;default:return 1}}}class i3 extends i2{Wr(e,t){return e+t}}class i4 extends i2{Wr(e,t){return e-t}}function i6(e){if((e=sD(e))instanceof n7)return`fld(${e.fieldName})`;if(e instanceof se){var t;return`cst(${null===(t=e.value)?"null":"number"==typeof t?t.toString():"string"==typeof t?`"${t}"`:t instanceof nC?`ref(${t.path})`:t instanceof nk?`vec(${JSON.stringify(t)})`:JSON.stringify(t)})`}if(e instanceof sn)return`fn(${e.name},[${e.params.map(i6).join(",")}])`;if("ListOfExpressions"===e.expressionType)return`list([${e.Rr.map(i6).join(",")}])`;throw Error(`Unrecognized expr ${JSON.stringify(e,null,2)}`)}function i9(e){return`${Array.from(e.entries()).sort().map(([e,t])=>`${e}=${i6(t)}`).join(",")}`}function i5(e){return e.stages.map(e=>(function(e){if(e instanceof sc)return`${e._name}(${i9(e.fields)})`;if(e instanceof sh){let t=`${e._name}(${i9(e.accumulators)})`;return e.groups.size>0&&(t+=`grouping(${i9(e.groups)})`),t}if(e instanceof sd)return`${e._name}(${i9(e.groups)})`;if(e instanceof sm)return`${e._name}(${e.Vr})`;if(e instanceof sf)return`${e._name}(${e.collectionId})`;if(e instanceof sp)return`${e._name}()`;if(e instanceof sg)return`${e._name}(${e.dr.sort()})`;if(e instanceof sy)return`${e._name}(${i6(e.condition)})`;if(e instanceof sw)return`${e._name}(${e.limit})`;if(e instanceof sE)return`${e._name}(${e.orderings.map(e=>`${i6(e.expr)}${e.direction}`).join(",")})`;throw Error(`Unrecognized stage ${e._name}`)})(e)).join("|")}function i8(e){return e instanceof sN}function i7(e){return i8(e)?i5(e):rt(e)}function ae(e){return i8(e)?i5(e):`${tJ(t6(e))}|lt:${e.limitType}`}function at(e,t){return e instanceof sN&&t instanceof sN?i5(e)===i5(t):!(e instanceof sN&&!(t instanceof sN)||!(e instanceof sN)&&t instanceof sN)&&tX(t6(e),t6(t))&&e.limitType===t.limitType}function ar(e){return tZ(e)?i5(e):tJ(e)}function an(e,t){return e instanceof sN&&t instanceof sN?i5(e)===i5(t):!(e instanceof sN&&!(t instanceof sN)||!(e instanceof sN)&&t instanceof sN)&&tX(e,t)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class as{constructor(e,t,r,n){this.batchId=e,this.localWriteTime=t,this.baseMutations=r,this.mutations=n}applyToRemoteDocument(e,t){let r=t.mutationResults;for(let t=0;t<this.mutations.length;t++){let s=this.mutations[t];if(s.key.isEqual(e.key)){var n;n=r[t],s instanceof tN?function(e,t,r){let n=e.value.clone(),s=tI(e.fieldTransforms,t,r.transformResults);n.setAll(s),t.convertToFoundDocument(r.version,n).setHasCommittedMutations()}(s,e,n):s instanceof tb?function(e,t,r){if(!tv(e.precondition,t))return void t.convertToUnknownDocument(r.version);let n=tI(e.fieldTransforms,t,r.transformResults),s=t.data;s.setAll(tS(e)),s.setAll(n),t.convertToFoundDocument(r.version,s).setHasCommittedMutations()}(s,e,n):function(e,t,r){t.convertToNoDocument(r.version).setHasCommittedMutations()}(0,e,n)}}}applyToLocalView(e,t){for(let r of this.baseMutations)r.key.isEqual(e.key)&&(t=tT(r,e,t,this.localWriteTime));for(let r of this.mutations)r.key.isEqual(e.key)&&(t=tT(r,e,t,this.localWriteTime));return t}applyToLocalDocumentSet(e,t){let r=rh();return this.mutations.forEach(n=>{let s=e.get(n.key),i=s.overlayedDocument,a=this.applyToLocalView(i,s.mutatedFields),o=tE(i,a=t.has(n.key)?null:a);null!==o&&r.set(n.key,o),i.isValidDocument()||i.convertToNoDocument(et.min())}),r}keys(){return this.mutations.reduce((e,t)=>e.add(t.key),rf())}isEqual(e){return this.batchId===e.batchId&&B(this.mutations,e.mutations,(e,t)=>tx(e,t))&&B(this.baseMutations,e.baseMutations,(e,t)=>tx(e,t))}}class ai{constructor(e,t,r,n){this.batch=e,this.commitVersion=t,this.mutationResults=r,this.docVersions=n}static from(e,t,r){b(e.mutations.length===r.length,58842,{Qr:e.mutations.length,Gr:r.length});let n=rd,s=e.mutations;for(let e=0;e<s.length;e++)n=n.insert(s[e].key,r[e].version);return new ai(e,t,r,n)}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class aa{constructor(e,t){this.largestBatchId=e,this.mutation=t}getKey(){return this.mutation.key}isEqual(e){return null!==e&&this.mutation===e.mutation}toString(){return`Overlay{
      largestBatchId: ${this.largestBatchId},
      mutation: ${this.mutation.toString()}
    }`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ao{constructor(e,t,r,n,s=et.min(),i=et.min(),a=e_.EMPTY_BYTE_STRING,o=null){this.target=e,this.targetId=t,this.purpose=r,this.sequenceNumber=n,this.snapshotVersion=s,this.lastLimboFreeSnapshotVersion=i,this.resumeToken=a,this.expectedCount=o}withSequenceNumber(e){return new ao(this.target,this.targetId,this.purpose,e,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,this.expectedCount)}withResumeToken(e,t){return new ao(this.target,this.targetId,this.purpose,this.sequenceNumber,t,this.lastLimboFreeSnapshotVersion,e,null)}withExpectedCount(e){return new ao(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,e)}withLastLimboFreeSnapshotVersion(e){return new ao(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,e,this.resumeToken,this.expectedCount)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class au{constructor(e){this.zr=e}}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class al{constructor(){}Yr(e,t){this.Zr(e,t),t.Xr()}Zr(e,t){if("nullValue"in e)this.ei(t,5);else if("booleanValue"in e)this.ei(t,10),t.ti(e.booleanValue?1:0);else if("integerValue"in e)this.ei(t,15),t.ti(ex(e.integerValue));else if("doubleValue"in e){let r=ex(e.doubleValue);isNaN(r)?this.ei(t,13):(this.ei(t,15),el(r)?t.ti(0):t.ti(r))}else if("timestampValue"in e){let r=e.timestampValue;this.ei(t,20),"string"==typeof r&&(r=eT(r)),t.ni(`${r.seconds||""}`),t.ti(r.nanos||0)}else if("stringValue"in e)this.ri(e.stringValue,t),this.ii(t);else if("bytesValue"in e)this.ei(t,30),t.si(eN(e.bytesValue)),this.ii(t);else if("referenceValue"in e)this._i(e.referenceValue,t);else if("geoPointValue"in e){let r=e.geoPointValue;this.ei(t,45),t.ti(r.latitude||0),t.ti(r.longitude||0)}else"mapValue"in e?e8(e)?this.ei(t,Number.MAX_SAFE_INTEGER):e6(e)?this.oi(e.mapValue,t):(this.ai(e.mapValue,t),this.ii(t)):"arrayValue"in e?(this.ui(e.arrayValue,t),this.ii(t)):x(19022,{ci:e})}ri(e,t){this.ei(t,25),this.li(e,t)}li(e,t){t.ni(e)}ai(e,t){let r=e.fields||{};for(let e of(this.ei(t,55),Object.keys(r)))this.ri(e,t),this.Zr(r[e],t)}oi(e,t){let r=e.fields||{};this.ei(t,53);let n=r[e$].arrayValue?.values?.length||0;this.ei(t,15),t.ti(ex(n)),this.ri(e$,t),this.Zr(r[e$],t)}ui(e,t){let r=e.values||[];for(let e of(this.ei(t,50),r))this.Zr(e,t)}_i(e,t){this.ei(t,37),G.fromName(e).path.forEach(e=>{this.ei(t,60),this.li(e,t)})}ei(e,t){e.ti(t)}ii(e){e.ti(2)}}al.Ei=new al;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ac{constructor(){this.Hi=new ah}addToCollectionParentIndex(e,t){return this.Hi.add(t),ea.resolve()}getCollectionParents(e,t){return ea.resolve(this.Hi.getEntries(t))}addFieldIndex(e,t){return ea.resolve()}deleteFieldIndex(e,t){return ea.resolve()}deleteAllFieldIndexes(e){return ea.resolve()}createTargetIndexes(e,t){return ea.resolve()}getDocumentsMatchingTarget(e,t){return ea.resolve(null)}getIndexType(e,t){return ea.resolve(0)}getFieldIndexes(e,t){return ea.resolve([])}getNextCollectionGroupToUpdate(e){return ea.resolve(null)}getMinOffset(e,t){return ea.resolve(en.min())}getMinOffsetFromCollectionGroup(e,t){return ea.resolve(en.min())}updateCollectionGroup(e,t,r){return ea.resolve()}updateIndexEntries(e,t){return ea.resolve()}}class ah{constructor(){this.index={}}add(e){let t=e.lastSegment(),r=e.popLast(),n=this.index[t]||new em(Q.comparator),s=!n.has(r);return this.index[t]=n.add(r),s}has(e){let t=e.lastSegment(),r=e.popLast(),n=this.index[t];return n&&n.has(r)}getEntries(e){return(this.index[e]||new em(Q.comparator)).toArray()}}new Uint8Array(0);/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ad{constructor(e){this.Ds=e}next(){return this.Ds+=2,this.Ds}static xs(){return new ad(0)}static Cs(){return new ad(-1)}}// Copyright 2024 Google LLC* @license
function am(e,t){let r=t;for(let t of e.stages)r=function(e,t,r){if(t instanceof sm)return r.filter(e=>e.isFoundDocument()&&`/${e.key.getCollectionPath().canonicalString()}`===t.Vr);if(t instanceof sy)return r.filter(r=>{let n=sA(sk(t.condition).evaluate(e,r));return void 0!==n&&ej(n,eq)});if(t instanceof sf)return r.filter(e=>e.isFoundDocument()&&e.key.getCollectionPath().lastSegment()===t.collectionId);if(t instanceof sp)return r.filter(e=>e.isFoundDocument());if(t instanceof sg)return r.filter(e=>e.isFoundDocument()&&t.mr.has(e.key.path.toStringWithLeadingSlash()));if(t instanceof sw)return r.slice(0,t.limit);if(t instanceof sE)return function(e,t,r){let n=t.orderings.map(e=>({ks:sk(e.expr),direction:e.direction}));return[...r].sort((t,r)=>{for(let{ks:s,direction:i}of n){let n=eG(sA(s.evaluate(e,t))??eB,sA(s.evaluate(e,r))??eB);if(0!==n)return"ascending"===i?n:-n}return 0})}(e,t,r);throw Error(`Unknown stage: ${t._name}`)}({serializer:e.serializer,serverTimestampBehavior:e.listenOptions?.serverTimestampBehavior},t,r);return r}function af(e,t){return am(e,[t]).length>0}function ap(e){let t=function(e){for(let t=e.stages.length-1;t>=0;t--){let r=e.stages[t];if(r instanceof sE)return r.orderings}throw Error("Pipeline must contain at least one Sort stage")}(e);return(r,n)=>{for(let s of t){let t=eG(sA(sk(s.expr).evaluate({serializer:e.serializer},r))||eB,sA(sk(s.expr).evaluate({serializer:e.serializer},n))||eB);if(0!==t)return"ascending"===s.direction?t:-t}return 0}}function ag(e){for(let t=e.stages.length-1;t>=0;t--){let r=e.stages[t];if(r instanceof sw)return{limit:r.limit}}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ay{constructor(){this.changes=new ra(e=>e.toString(),(e,t)=>e.isEqual(t)),this.changesApplied=!1}addEntry(e){this.assertNotApplied(),this.changes.set(e.key,e)}removeEntry(e,t){this.assertNotApplied(),this.changes.set(e,tH.newInvalidDocument(e).setReadTime(t))}getEntry(e,t){this.assertNotApplied();let r=this.changes.get(t);return void 0!==r?ea.resolve(r):this.getFromCache(e,t)}getEntries(e,t){return this.getAllFromCache(e,t)}apply(e){return this.assertNotApplied(),this.changesApplied=!0,this.applyChanges(e)}assertNotApplied(){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class aw{constructor(e,t){this.overlayedDocument=e,this.mutatedFields=t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class av{constructor(e,t,r,n){this.remoteDocumentCache=e,this.mutationQueue=t,this.documentOverlayCache=r,this.indexManager=n}getDocument(e,t){let r=null;return this.documentOverlayCache.getOverlay(e,t).next(n=>(r=n,this.remoteDocumentCache.getEntry(e,t))).next(e=>(null!==r&&tT(r.mutation,e,ep.empty(),ee.now()),e))}getDocuments(e,t){return this.remoteDocumentCache.getEntries(e,t).next(t=>this.getLocalViewOfDocuments(e,t,rf()).next(()=>t))}getLocalViewOfDocuments(e,t,r=rf()){let n=rh();return this.populateOverlays(e,n,t).next(()=>this.computeViews(e,t,n,r).next(e=>{let t=rl();return e.forEach((e,r)=>{t=t.insert(e,r.overlayedDocument)}),t}))}getOverlayedDocuments(e,t){let r=rh();return this.populateOverlays(e,r,t).next(()=>this.computeViews(e,t,r,rf()))}populateOverlays(e,t,r){let n=[];return r.forEach(e=>{t.has(e)||n.push(e)}),this.documentOverlayCache.getOverlays(e,n).next(e=>{e.forEach((e,r)=>{t.set(e,r)})})}computeViews(e,t,r,n){let s=ro,i=rh(),a=rh();return t.forEach((e,t)=>{let a=r.get(t.key);n.has(t.key)&&(void 0===a||a.mutation instanceof tb)?s=s.insert(t.key,t):void 0!==a?(i.set(t.key,a.mutation.getFieldMask()),tT(a.mutation,t,a.mutation.getFieldMask(),ee.now())):i.set(t.key,ep.empty())}),this.recalculateAndSaveOverlays(e,s).next(e=>(e.forEach((e,t)=>i.set(e,t)),t.forEach((e,t)=>a.set(e,new aw(t,i.get(e)??null))),a))}recalculateAndSaveOverlays(e,t){let r=rh(),n=new ec((e,t)=>e-t),s=rf();return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(e,t).next(e=>{for(let s of e)s.keys().forEach(e=>{let i=t.get(e);if(null===i)return;let a=r.get(e)||ep.empty();a=s.applyToLocalView(i,a),r.set(e,a);let o=(n.get(s.batchId)||rf()).add(e);n=n.insert(s.batchId,o)})}).next(()=>{let i=[],a=n.getReverseIterator();for(;a.hasNext();){let n=a.getNext(),o=n.key,u=n.value,l=rh();u.forEach(e=>{if(!s.has(e)){let n=tE(t.get(e),r.get(e));null!==n&&l.set(e,n),s=s.add(e)}}),i.push(this.documentOverlayCache.saveOverlays(e,o,l))}return ea.waitFor(i)}).next(()=>r)}recalculateAndSaveOverlaysForDocumentKeys(e,t){return this.remoteDocumentCache.getEntries(e,t).next(t=>this.recalculateAndSaveOverlays(e,t))}getDocumentsMatchingQuery(e,t,r,n){return i8(t)?this.getDocumentsMatchingPipeline(e,t,r,n):G.isDocumentKey(t.path)&&null===t.collectionGroup&&0===t.filters.length?this.getDocumentsMatchingDocumentQuery(e,t.path):t3(t)?this.getDocumentsMatchingCollectionGroupQuery(e,t,r,n):this.getDocumentsMatchingCollectionQuery(e,t,r,n)}getNextDocuments(e,t,r,n){return this.remoteDocumentCache.getAllFromCollectionGroup(e,t,r,n).next(s=>{let i=n-s.size>0?this.documentOverlayCache.getOverlaysForCollectionGroup(e,t,r.largestBatchId,n-s.size):ea.resolve(rh()),a=-1,o=s;return i.next(t=>ea.forEach(t,(t,r)=>(a<r.largestBatchId&&(a=r.largestBatchId),s.get(t)?ea.resolve():this.remoteDocumentCache.getEntry(e,t).next(e=>{o=o.insert(t,e)}))).next(()=>this.populateOverlays(e,t,s)).next(()=>this.computeViews(e,o,t,rf())).next(e=>({batchId:a,changes:rc(e)})))})}getDocumentsMatchingDocumentQuery(e,t){return this.getDocument(e,new G(t)).next(e=>{let t=rl();return e.isFoundDocument()&&(t=t.insert(e.key,e)),t})}getDocumentsMatchingCollectionGroupQuery(e,t,r,n){let s=t.collectionGroup,i=rl();return this.indexManager.getCollectionParents(e,s).next(a=>ea.forEach(a,a=>{let o=new t1(a.child(s),null,t.explicitOrderBy.slice(),t.filters.slice(),t.limit,t.limitType,t.startAt,t.endAt);return this.getDocumentsMatchingCollectionQuery(e,o,r,n).next(e=>{e.forEach((e,t)=>{i=i.insert(e,t)})})}).next(()=>i))}getDocumentsMatchingCollectionQuery(e,t,r,n){let s;return this.documentOverlayCache.getOverlaysForCollection(e,t.path,r.largestBatchId).next(i=>(s=i,this.remoteDocumentCache.getDocumentsMatchingQuery(e,t,r,s,n))).next(e=>this.retrieveMatchingLocalDocuments(s,e,e=>rr(t,e)))}getDocumentsMatchingPipeline(e,t,r,n){if("collection_group"===sb(t)){let s=sI(t),i=rl();return this.indexManager.getCollectionParents(e,s).next(a=>ea.forEach(a,a=>{let o=function(e,t){let r=e.stages.map(e=>e instanceof sf?new sm(t.canonicalString(),{}):e);return new sN(e.serializer,r)}(t,a.child(s));return this.getDocumentsMatchingPipeline(e,o,r,n).next(e=>{e.forEach((e,t)=>{i=i.insert(e,t)})})}).next(()=>i))}{let s;return this.getOverlaysForPipeline(e,t,r.largestBatchId).next(i=>{switch(s=i,sb(t)){case"collection":return this.remoteDocumentCache.getDocumentsMatchingQuery(e,t,r,s,n);case"documents":let a=rf();for(let e of sV(t))a=a.add(G.fromPath(e));return this.remoteDocumentCache.getEntries(e,a);case"database":return this.remoteDocumentCache.getAllEntries(e);default:throw new I("invalid-argument",`Invalid pipeline source to execute offline: ${i5(t)}`)}}).next(e=>this.retrieveMatchingLocalDocuments(s,e,e=>af(t,e)))}}retrieveMatchingLocalDocuments(e,t,r){e.forEach((e,r)=>{let n=r.getKey();null===t.get(n)&&(t=t.insert(n,tH.newInvalidDocument(n)))});let n=rl();return t.forEach((t,s)=>{let i=e.get(t);void 0!==i&&tT(i.mutation,s,ep.empty(),ee.now()),r(s)&&(n=n.insert(t,s))}),n}getOverlaysForPipeline(e,t,r){switch(sb(t)){case"collection":return this.documentOverlayCache.getOverlaysForCollection(e,Q.fromString(sS(t)),r);case"collection_group":throw new I("invalid-argument",`Unexpected collection group pipeline: ${i5(t)}`);case"documents":return this.documentOverlayCache.getOverlays(e,sV(t).map(e=>G.fromPath(e)));case"database":return this.documentOverlayCache.getAllOverlays(e,r);default:throw new I("invalid-argument",`Failed to get overlays for pipeline: ${i5(t)}`)}}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class a_{constructor(e){this.serializer=e,this.Hs=new Map,this.Js=new Map}getBundleMetadata(e,t){return ea.resolve(this.Hs.get(t))}saveBundleMetadata(e,t){return this.Hs.set(t.id,{id:t.id,version:t.version,createTime:r$(t.createTime)}),ea.resolve()}getNamedQuery(e,t){return ea.resolve(this.Js.get(t))}saveNamedQuery(e,t){return this.Js.set(t.name,{name:t.name,query:function(e){let t=function(e){var t;let r,n=function(e){let t=rz(e);return 4===t.length?Q.emptyPath():rH(t)}(e.parent),s=e.structuredQuery,i=s.from?s.from.length:0,a=null;if(i>0){b(1===i,65062);let e=s.from[0];e.allDescendants?a=e.collectionId:n=n.child(e.collectionId)}let o=[];s.where&&(o=function(e){var t;let r=function e(t){return void 0!==t.unaryFilter?function(e){switch(e.unaryFilter.op){case"IS_NAN":let t=rJ(e.unaryFilter.field);return tU.create(t,"==",{doubleValue:NaN});case"IS_NULL":let r=rJ(e.unaryFilter.field);return tU.create(r,"==",{nullValue:"NULL_VALUE"});case"IS_NOT_NAN":let n=rJ(e.unaryFilter.field);return tU.create(n,"!=",{doubleValue:NaN});case"IS_NOT_NULL":let s=rJ(e.unaryFilter.field);return tU.create(s,"!=",{nullValue:"NULL_VALUE"});case"OPERATOR_UNSPECIFIED":return x(61313);default:return x(60726)}}(t):void 0!==t.fieldFilter?tU.create(rJ(t.fieldFilter.field),function(e){switch(e){case"EQUAL":return"==";case"NOT_EQUAL":return"!=";case"GREATER_THAN":return">";case"GREATER_THAN_OR_EQUAL":return">=";case"LESS_THAN":return"<";case"LESS_THAN_OR_EQUAL":return"<=";case"ARRAY_CONTAINS":return"array-contains";case"IN":return"in";case"NOT_IN":return"not-in";case"ARRAY_CONTAINS_ANY":return"array-contains-any";case"OPERATOR_UNSPECIFIED":return x(58110);default:return x(50506)}}(t.fieldFilter.op),t.fieldFilter.value):void 0!==t.compositeFilter?tO.create(t.compositeFilter.filters.map(t=>e(t)),function(e){switch(e){case"AND":return"and";case"OR":return"or";default:return x(1026)}}(t.compositeFilter.op)):x(30097,{filter:t})}(e);return r instanceof tO&&tM(t=r)&&tP(t)?r.getFilters():[r]}(s.where));let u=[];s.orderBy&&(u=s.orderBy.map(e=>new tG(rJ(e.field),function(e){switch(e){case"ASCENDING":return"asc";case"DESCENDING":return"desc";default:return}}(e.direction))));let l=null;s.limit&&(l=null==(r="object"==typeof(t=s.limit)?t.value:t)?null:r);let c=null;s.startAt&&(c=function(e){let t=!!e.before;return new tD(e.values||[],t)}(s.startAt));let h=null;return s.endAt&&(h=function(e){let t=!e.before;return new tD(e.values||[],t)}(s.endAt)),new t1(n,a,u,o,l,"F",c,h)}({parent:e.parent,structuredQuery:e.structuredQuery});return"LAST"===e.limitType?t8(t,t.limit,"L"):t}(t.bundledQuery),readTime:r$(t.readTime)}),ea.resolve()}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class aE{constructor(){this.overlays=new ec(G.comparator),this.Ys=new Map}getOverlay(e,t){return ea.resolve(this.overlays.get(t))}getOverlays(e,t){let r=rh();return ea.forEach(t,t=>this.getOverlay(e,t).next(e=>{null!==e&&r.set(t,e)})).next(()=>r)}getAllOverlays(e,t){let r=rh();return this.overlays.forEach((e,n)=>{n.largestBatchId>t&&r.set(e,n)}),ea.resolve(r)}saveOverlays(e,t,r){return r.forEach((r,n)=>{this.Hr(e,t,n)}),ea.resolve()}removeOverlaysForBatchId(e,t,r){let n=this.Ys.get(r);return void 0!==n&&(n.forEach(e=>this.overlays=this.overlays.remove(e)),this.Ys.delete(r)),ea.resolve()}getOverlaysForCollection(e,t,r){let n=rh(),s=t.length+1,i=new G(t.child("")),a=this.overlays.getIteratorFrom(i);for(;a.hasNext();){let e=a.getNext().value,i=e.getKey();if(!t.isPrefixOf(i.path))break;i.path.length===s&&e.largestBatchId>r&&n.set(e.getKey(),e)}return ea.resolve(n)}getOverlaysForCollectionGroup(e,t,r,n){let s=new ec((e,t)=>e-t),i=this.overlays.getIterator();for(;i.hasNext();){let e=i.getNext().value;if(e.getKey().getCollectionGroup()===t&&e.largestBatchId>r){let t=s.get(e.largestBatchId);null===t&&(t=rh(),s=s.insert(e.largestBatchId,t)),t.set(e.getKey(),e)}}let a=rh(),o=s.getIterator();for(;o.hasNext()&&(o.getNext().value.forEach((e,t)=>a.set(e,t)),!(a.size()>=n)););return ea.resolve(a)}Hr(e,t,r){let n=this.overlays.get(r.key);if(null!==n){let e=this.Ys.get(n.largestBatchId).delete(r.key);this.Ys.set(n.largestBatchId,e)}this.overlays=this.overlays.insert(r.key,new aa(t,r));let s=this.Ys.get(t);void 0===s&&(s=rf(),this.Ys.set(t,s)),this.Ys.set(t,s.add(r.key))}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class aT{constructor(){this.sessionToken=e_.EMPTY_BYTE_STRING}getSessionToken(e){return ea.resolve(this.sessionToken)}setSessionToken(e,t){return this.sessionToken=t,ea.resolve()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ax{constructor(){this.Zs=new em(aN.Xs),this.e_=new em(aN.t_)}isEmpty(){return this.Zs.isEmpty()}addReference(e,t){let r=new aN(e,t);this.Zs=this.Zs.add(r),this.e_=this.e_.add(r)}n_(e,t){e.forEach(e=>this.addReference(e,t))}removeReference(e,t){this.r_(new aN(e,t))}i_(e,t){e.forEach(e=>this.removeReference(e,t))}s_(e){let t=new G(new Q([])),r=new aN(t,e),n=new aN(t,e+1),s=[];return this.e_.forEachInRange([r,n],e=>{this.r_(e),s.push(e.key)}),s}__(){this.Zs.forEach(e=>this.r_(e))}r_(e){this.Zs=this.Zs.delete(e),this.e_=this.e_.delete(e)}o_(e){let t=new G(new Q([])),r=new aN(t,e),n=new aN(t,e+1),s=rf();return this.e_.forEachInRange([r,n],e=>{s=s.add(e.key)}),s}containsKey(e){let t=new aN(e,0),r=this.Zs.firstAfterOrEqual(t);return null!==r&&e.isEqual(r.key)}}class aN{constructor(e,t){this.key=e,this.a_=t}static Xs(e,t){return G.comparator(e.key,t.key)||M(e.a_,t.a_)}static t_(e,t){return M(e.a_,t.a_)||G.comparator(e.key,t.key)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ab{constructor(e,t){this.indexManager=e,this.referenceDelegate=t,this.mutationQueue=[],this.gs=1,this.u_=new em(aN.Xs)}checkEmpty(e){return ea.resolve(0===this.mutationQueue.length)}addMutationBatch(e,t,r,n){let s=this.gs;this.gs++,this.mutationQueue.length>0&&this.mutationQueue[this.mutationQueue.length-1];let i=new as(s,t,r,n);for(let t of(this.mutationQueue.push(i),n))this.u_=this.u_.add(new aN(t.key,s)),this.indexManager.addToCollectionParentIndex(e,t.key.path.popLast());return ea.resolve(i)}lookupMutationBatch(e,t){return ea.resolve(this.c_(t))}getNextMutationBatchAfterBatchId(e,t){let r=this.l_(t+1),n=r<0?0:r;return ea.resolve(this.mutationQueue.length>n?this.mutationQueue[n]:null)}getHighestUnacknowledgedBatchId(){return ea.resolve(0===this.mutationQueue.length?-1:this.gs-1)}getAllMutationBatches(e){return ea.resolve(this.mutationQueue.slice())}getAllMutationBatchesAffectingDocumentKey(e,t){let r=new aN(t,0),n=new aN(t,Number.POSITIVE_INFINITY),s=[];return this.u_.forEachInRange([r,n],e=>{let t=this.c_(e.a_);s.push(t)}),ea.resolve(s)}getAllMutationBatchesAffectingDocumentKeys(e,t){let r=new em(M);return t.forEach(e=>{let t=new aN(e,0),n=new aN(e,Number.POSITIVE_INFINITY);this.u_.forEachInRange([t,n],e=>{r=r.add(e.a_)})}),ea.resolve(this.E_(r))}getAllMutationBatchesAffectingQuery(e,t){let r=t.path,n=r.length+1,s=r;G.isDocumentKey(s)||(s=s.child(""));let i=new aN(new G(s),0),a=new em(M);return this.u_.forEachWhile(e=>{let t=e.key.path;return!!r.isPrefixOf(t)&&(t.length===n&&(a=a.add(e.a_)),!0)},i),ea.resolve(this.E_(a))}E_(e){let t=[];return e.forEach(e=>{let r=this.c_(e);null!==r&&t.push(r)}),t}removeMutationBatch(e,t){b(0===this.h_(t.batchId,"removed"),55003),this.mutationQueue.shift();let r=this.u_;return ea.forEach(t.mutations,n=>{let s=new aN(n.key,t.batchId);return r=r.delete(s),this.referenceDelegate.markPotentiallyOrphaned(e,n.key)}).next(()=>{this.u_=r})}bs(e){}containsKey(e,t){let r=new aN(t,0),n=this.u_.firstAfterOrEqual(r);return ea.resolve(t.isEqual(n&&n.key))}performConsistencyCheck(e){return this.mutationQueue.length,ea.resolve()}h_(e,t){return this.l_(e)}l_(e){return 0===this.mutationQueue.length?0:e-this.mutationQueue[0].batchId}c_(e){let t=this.l_(e);return t<0||t>=this.mutationQueue.length?null:this.mutationQueue[t]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class aS{constructor(e){this.T_=e,this.docs=new ec(G.comparator),this.size=0}setIndexManager(e){this.indexManager=e}addEntry(e,t){let r=t.key,n=this.docs.get(r),s=n?n.size:0,i=this.T_(t);return this.docs=this.docs.insert(r,{document:t.mutableCopy(),size:i}),this.size+=i-s,this.indexManager.addToCollectionParentIndex(e,r.path.popLast())}removeEntry(e){let t=this.docs.get(e);t&&(this.docs=this.docs.remove(e),this.size-=t.size)}getEntry(e,t){let r=this.docs.get(t);return ea.resolve(r?r.document.mutableCopy():tH.newInvalidDocument(t))}getEntries(e,t){let r=ro;return t.forEach(e=>{let t=this.docs.get(e);r=r.insert(e,t?t.document.mutableCopy():tH.newInvalidDocument(e))}),ea.resolve(r)}getAllEntries(e){let t=ro;return this.docs.forEach((e,r)=>{t=t.insert(e,r.document)}),ea.resolve(t)}getDocumentsMatchingQuery(e,t,r,n){let s,i;i8(t)?(s=Q.fromString(sS(t)),i=e=>af(t,e)):(s=t.path,i=e=>rr(t,e));let a=ro,o=new G(s.child("__id-9223372036854775808__")),u=this.docs.getIteratorFrom(o);for(;u.hasNext();){let{key:e,value:{document:t}}=u.getNext();if(!s.isPrefixOf(e.path))break;e.path.length>s.length+1||0>=function(e,t){let r=e.readTime.compareTo(t.readTime);return 0!==r?r:0!==(r=G.comparator(e.documentKey,t.documentKey))?r:M(e.largestBatchId,t.largestBatchId)}(new en(t.readTime,t.key,-1),r)||(n.has(t.key)||i(t))&&(a=a.insert(t.key,t.mutableCopy()))}return ea.resolve(a)}getAllFromCollectionGroup(e,t,r,n){x(9500)}P_(e,t){return ea.forEach(this.docs,e=>t(e))}newChangeBuffer(e){return new aI(this)}getSize(e){return ea.resolve(this.size)}}class aI extends ay{constructor(e){super(),this.zs=e}applyChanges(e){let t=[];return this.changes.forEach((r,n)=>{n.isValidDocument()?t.push(this.zs.addEntry(e,n)):this.zs.removeEntry(r)}),ea.waitFor(t)}getFromCache(e,t){return this.zs.getEntry(e,t)}getAllFromCache(e,t){return this.zs.getEntries(e,t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class aV{constructor(e){this.persistence=e,this.R_=new ra(e=>ar(e),an),this.lastRemoteSnapshotVersion=et.min(),this.highestTargetId=0,this.I_=0,this.A_=new ax,this.targetCount=0,this.V_=ad.xs()}forEachTarget(e,t){return this.R_.forEach((e,r)=>t(r)),ea.resolve()}getLastRemoteSnapshotVersion(e){return ea.resolve(this.lastRemoteSnapshotVersion)}getHighestSequenceNumber(e){return ea.resolve(this.I_)}allocateTargetId(e){return this.highestTargetId=this.V_.next(),ea.resolve(this.highestTargetId)}setTargetsMetadata(e,t,r){return r&&(this.lastRemoteSnapshotVersion=r),t>this.I_&&(this.I_=t),ea.resolve()}Ms(e){this.R_.set(e.target,e);let t=e.targetId;t>this.highestTargetId&&(this.V_=new ad(t),this.highestTargetId=t),e.sequenceNumber>this.I_&&(this.I_=e.sequenceNumber)}addTargetData(e,t){return this.Ms(t),this.targetCount+=1,ea.resolve()}updateTargetData(e,t){return this.Ms(t),ea.resolve()}removeTargetData(e,t){return this.R_.delete(t.target),this.A_.s_(t.targetId),this.targetCount-=1,ea.resolve()}removeTargets(e,t,r){let n=0,s=[];return this.R_.forEach((i,a)=>{a.sequenceNumber<=t&&null===r.get(a.targetId)&&(this.R_.delete(i),s.push(this.removeMatchingKeysForTargetId(e,a.targetId)),n++)}),ea.waitFor(s).next(()=>n)}getTargetCount(e){return ea.resolve(this.targetCount)}getTargetData(e,t){let r=this.R_.get(t)||null;return ea.resolve(r)}addMatchingKeys(e,t,r){return this.A_.n_(t,r),ea.resolve()}removeMatchingKeys(e,t,r){this.A_.i_(t,r);let n=this.persistence.referenceDelegate,s=[];return n&&t.forEach(t=>{s.push(n.markPotentiallyOrphaned(e,t))}),ea.waitFor(s)}removeMatchingKeysForTargetId(e,t){return this.A_.s_(t),ea.resolve()}getMatchingKeysForTargetId(e,t){let r=this.A_.o_(t);return ea.resolve(r)}containsKey(e,t){return ea.resolve(this.A_.containsKey(t))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class aC{constructor(e,t){this.d_={},this.overlays={},this.f_=new eu(0),this.m_=!1,this.m_=!0,this.p_=new aT,this.referenceDelegate=e(this),this.g_=new aV(this),this.indexManager=new ac,this.remoteDocumentCache=new aS(e=>this.referenceDelegate.y_(e)),this.serializer=new au(t),this.w_=new a_(this.serializer)}start(){return Promise.resolve()}shutdown(){return this.m_=!1,Promise.resolve()}get started(){return this.m_}setDatabaseDeletedListener(){}setNetworkEnabled(){}getIndexManager(e){return this.indexManager}getDocumentOverlayCache(e){let t=this.overlays[e.toKey()];return t||(t=new aE,this.overlays[e.toKey()]=t),t}getMutationQueue(e,t){let r=this.d_[e.toKey()];return r||(r=new ab(t,this.referenceDelegate),this.d_[e.toKey()]=r),r}getGlobalsCache(){return this.p_}getTargetCache(){return this.g_}getRemoteDocumentCache(){return this.remoteDocumentCache}getBundleCache(){return this.w_}runTransaction(e,t,r){v("MemoryPersistence","Starting transaction:",e);let n=new aA(this.f_.next());return this.referenceDelegate.b_(),r(n).next(e=>this.referenceDelegate.v_(n).next(()=>e)).toPromise().then(e=>(n.raiseOnCommittedEvent(),e))}S_(e,t){return ea.or(Object.values(this.d_).map(r=>()=>r.containsKey(e,t)))}}class aA extends es{constructor(e){super(),this.currentSequenceNumber=e}}class aD{constructor(e){this.persistence=e,this.D_=new ax,this.x_=null}static C_(e){return new aD(e)}get F_(){if(this.x_)return this.x_;throw x(60996)}addReference(e,t,r){return this.D_.addReference(r,t),this.F_.delete(r.toString()),ea.resolve()}removeReference(e,t,r){return this.D_.removeReference(r,t),this.F_.add(r.toString()),ea.resolve()}markPotentiallyOrphaned(e,t){return this.F_.add(t.toString()),ea.resolve()}removeTarget(e,t){this.D_.s_(t.targetId).forEach(e=>this.F_.add(e.toString()));let r=this.persistence.getTargetCache();return r.getMatchingKeysForTargetId(e,t.targetId).next(e=>{e.forEach(e=>this.F_.add(e.toString()))}).next(()=>r.removeTargetData(e,t))}b_(){this.x_=new Set}v_(e){let t=this.persistence.getRemoteDocumentCache().newChangeBuffer();return ea.forEach(this.F_,r=>{let n=G.fromPath(r);return this.O_(e,n).next(e=>{e||t.removeEntry(n,et.min())})}).next(()=>(this.x_=null,t.apply(e)))}updateLimboDocument(e,t){return this.O_(e,t).next(e=>{e?this.F_.delete(t.toString()):this.F_.add(t.toString())})}y_(e){return 0}O_(e,t){return ea.or([()=>ea.resolve(this.D_.containsKey(t)),()=>this.persistence.getTargetCache().containsKey(e,t),()=>this.persistence.S_(e,t)])}}class ak{constructor(e,t){this.persistence=e,this.M_=new ra(e=>(function(e){let t="";for(let r=0;r<e.length;r++)t.length>0&&(t+="\x01\x01"),t=function(e,t){let r=t,n=e.length;for(let t=0;t<n;t++){let n=e.charAt(t);switch(n){case"\0":r+="\x01\x10";break;case"\x01":r+="\x01\x11";break;default:r+=n}}return r}(e.get(r),t);return t+"\x01\x01"})(e.path),(e,t)=>e.isEqual(t)),this.garbageCollector=new nN(this,t)}static C_(e,t){return new ak(e,t)}b_(){}v_(e){return ea.resolve()}forEachTarget(e,t){return this.persistence.getTargetCache().forEachTarget(e,t)}lr(e){let t=this.Ls(e);return this.persistence.getTargetCache().getTargetCount(e).next(e=>t.next(t=>e+t))}Ls(e){let t=0;return this.Er(e,e=>{t++}).next(()=>t)}Er(e,t){return ea.forEach(this.M_,(r,n)=>this.Us(e,r,n).next(e=>e?ea.resolve():t(n)))}removeTargets(e,t,r){return this.persistence.getTargetCache().removeTargets(e,t,r)}removeOrphanedDocuments(e,t){let r=0,n=this.persistence.getRemoteDocumentCache(),s=n.newChangeBuffer();return n.P_(e,n=>this.Us(e,n,t).next(e=>{e||(r++,s.removeEntry(n,et.min()))})).next(()=>s.apply(e)).next(()=>r)}markPotentiallyOrphaned(e,t){return this.M_.set(t,e.currentSequenceNumber),ea.resolve()}removeTarget(e,t){let r=t.withSequenceNumber(e.currentSequenceNumber);return this.persistence.getTargetCache().updateTargetData(e,r)}addReference(e,t,r){return this.M_.set(r,e.currentSequenceNumber),ea.resolve()}removeReference(e,t,r){return this.M_.set(r,e.currentSequenceNumber),ea.resolve()}updateLimboDocument(e,t){return this.M_.set(t,e.currentSequenceNumber),ea.resolve()}y_(e){let t=e.key.toString().length;return e.isFoundDocument()&&(t+=function e(t){switch(eQ(t)){case 0:case 1:return 4;case 2:return 8;case 3:case 8:return 16;case 4:let r=eA(t);return r?16+e(r):16;case 5:return 2*t.stringValue.length;case 6:return eN(t.bytesValue).approximateByteSize();case 7:return t.referenceValue.length;case 9:return(t.arrayValue.values||[]).reduce((t,r)=>t+e(r),0);case 10:case 11:var n;let s;return n=t.mapValue,s=0,ey(n.fields,(t,r)=>{s+=t.length+e(r)}),s;default:throw x(13486,{value:t})}}(e.data.value)),t}Us(e,t,r){return ea.or([()=>this.persistence.S_(e,t),()=>this.persistence.getTargetCache().containsKey(e,t),()=>{let e=this.M_.get(t);return ea.resolve(void 0!==e&&e>r)}])}getCacheSize(e){return this.persistence.getRemoteDocumentCache().getSize(e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class aL{constructor(e,t,r,n){this.targetId=e,this.fromCache=t,this.wo=r,this.bo=n}static vo(e,t){let r=rf(),n=rf();for(let e of t.docChanges)switch(e.type){case 0:r=r.add(e.doc.key);break;case 1:n=n.add(e.doc.key)}return new aL(e,t.fromCache,r,n)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function aR(e,t){return G.comparator(e.key,t.key)}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class aU{constructor(){this._documentReadCount=0}get documentReadCount(){return this._documentReadCount}incrementDocumentReadCount(e){this._documentReadCount+=e}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class aO{constructor(){this.So=!1,this.Do=!1,this.xo=100,this.Co=(0,u.G6)()?8:function(e){let t=e.match(/Android ([\d.]+)/i);return Number(t?t[1].split(".").slice(0,2).join("."):"-1")}((0,u.z$)())>0?6:4}initialize(e,t){this.Fo=e,this.indexManager=t,this.So=!0}getDocumentsMatchingQuery(e,t,r,n){let s={result:null};return this.Oo(e,t).next(e=>{s.result=e}).next(()=>{if(!s.result)return this.Mo(e,t,n,r).next(e=>{s.result=e})}).next(()=>{if(s.result)return;let r=new aU;return this.No(e,t,r).next(n=>{if(s.result=n,this.Do)return this.Lo(e,t,r,n.size)})}).next(()=>s.result)}Lo(e,t,r,n){return i8(t)?ea.resolve():r.documentReadCount<this.xo?(w()<=c.in.DEBUG&&v("QueryEngine","SDK will not create cache indexes for query:",rt(t),"since it only creates cache indexes for collection contains","more than or equal to",this.xo,"documents"),ea.resolve()):(w()<=c.in.DEBUG&&v("QueryEngine","Query:",rt(t),"scans",r.documentReadCount,"local documents and returns",n,"documents as results."),r.documentReadCount>this.Co*n?(w()<=c.in.DEBUG&&v("QueryEngine","The SDK decides to create cache indexes for query:",rt(t),"as using cache indexes may help improve performance."),this.indexManager.createTargetIndexes(e,t6(t))):ea.resolve())}Oo(e,t){if(i8(t))return ea.resolve(null);let r=t;if(t2(r))return ea.resolve(null);let n=t6(r);return this.indexManager.getIndexType(e,n).next(t=>0===t?null:(null!==r.limit&&1===t&&(n=t6(r=t8(r,null,"F"))),this.indexManager.getDocumentsMatchingTarget(e,n).next(t=>{let s=rf(...t);return this.Fo.getDocuments(e,s).next(t=>this.indexManager.getMinOffset(e,n).next(n=>{let i=this.Bo(r,t);return this.Uo(r,i,s,n.readTime)?this.Oo(e,t8(r,null,"F")):this.ko(e,i,r,n)}))})))}Mo(e,t,r,n){return(i8(t)?function(e){for(let t of e.stages){if(t instanceof sw||t instanceof sv)return!1;if(t instanceof sy){if(t.condition instanceof si&&"exists"===t.condition._expr.name&&t.condition._expr.params[0]instanceof n7&&t.condition._expr.params[0].fieldName===q)continue;return!1}}return!0}(t):t2(t))||n.isEqual(et.min())?ea.resolve(null):this.Fo.getDocuments(e,r).next(s=>{let i=this.Bo(t,s);return this.Uo(t,i,r,n)?ea.resolve(null):(w()<=c.in.DEBUG&&v("QueryEngine","Re-using previous result from %s to execute query: %s",n.toString(),i7(t)),this.ko(e,i,t,function(e,t){let r=e.toTimestamp().seconds,n=e.toTimestamp().nanoseconds+1;return new en(et.fromTimestamp(1e9===n?new ee(r+1,0):new ee(r,n)),G.empty(),-1)}(n,0)).next(e=>e))})}Bo(e,t){let r,n;return i8(e)?(r=new em(aR),n=t=>af(e,t)):(r=new em(rn(e)),n=t=>rr(e,t)),t.forEach((e,t)=>{n(t)&&(r=r.add(t))}),r}Uo(e,t,r,n){if(i8(e))return e.stages.some(e=>e instanceof sw||e instanceof sv);if(null===e.limit)return!1;if(r.size!==t.size)return!0;let s="F"===e.limitType?t.last():t.first();return!!s&&(s.hasPendingWrites||s.version.compareTo(n)>0)}No(e,t,r){return w()<=c.in.DEBUG&&v("QueryEngine","Using full collection scan to execute query:",i7(t)),this.Fo.getDocumentsMatchingQuery(e,t,en.min(),r)}ko(e,t,r,n){return this.Fo.getDocumentsMatchingQuery(e,r,n).next(e=>(t.forEach(t=>{e=e.insert(t.key,t)}),e))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let aP="LocalStore";class aM{constructor(e,t,r,n){this.persistence=e,this.qo=t,this.serializer=n,this.$o=new ec(M),this.Ko=new ra(e=>ar(e),an),this.Wo=new Map,this.Qo=e.getRemoteDocumentCache(),this.g_=e.getTargetCache(),this.w_=e.getBundleCache(),this.Go(r)}Go(e){this.documentOverlayCache=this.persistence.getDocumentOverlayCache(e),this.indexManager=this.persistence.getIndexManager(e),this.mutationQueue=this.persistence.getMutationQueue(e,this.indexManager),this.localDocuments=new av(this.Qo,this.mutationQueue,this.documentOverlayCache,this.indexManager),this.Qo.setIndexManager(this.indexManager),this.qo.initialize(this.localDocuments,this.indexManager)}collectGarbage(e){return this.persistence.runTransaction("Collect garbage","readwrite-primary",t=>e.collect(t,this.$o))}}async function aF(e,t){return await e.persistence.runTransaction("Handle user change","readonly",r=>{let n;return e.mutationQueue.getAllMutationBatches(r).next(s=>(n=s,e.Go(t),e.mutationQueue.getAllMutationBatches(r))).next(t=>{let s=[],i=[],a=rf();for(let e of n)for(let t of(s.push(e.batchId),e.mutations))a=a.add(t.key);for(let e of t)for(let t of(i.push(e.batchId),e.mutations))a=a.add(t.key);return e.localDocuments.getDocuments(r,a).next(e=>({zo:e,removedBatchIds:s,addedBatchIds:i}))})})}function a$(e){return e.persistence.runTransaction("Get last remote snapshot version","readonly",t=>e.g_.getLastRemoteSnapshotVersion(t))}async function aB(e,t,r){let n=e.$o.get(t);try{r||await e.persistence.runTransaction("Release target",r?"readwrite":"readwrite-primary",t=>e.persistence.referenceDelegate.removeTarget(t,n))}catch(e){if(!eo(e))throw e;v(aP,`Failed to update sequence numbers for target ${t}: ${e}`)}e.$o=e.$o.remove(t),e.Ko.delete(n.target)}function aq(e,t,r){let n=et.min(),s=rf();return e.persistence.runTransaction("Execute query","readwrite",i=>(function(e,t,r){let n=e.Ko.get(r);return void 0!==n?ea.resolve(e.$o.get(n)):e.g_.getTargetData(t,r)})(e,i,i8(t)?t:t6(t)).next(t=>{if(t)return n=t.lastLimboFreeSnapshotVersion,e.g_.getMatchingKeysForTargetId(i,t.targetId).next(e=>{s=e})}).next(()=>e.qo.getDocumentsMatchingQuery(i,t,r?n:et.min(),r?s:rf())).next(t=>((function(e,t){t.forEach((t,r)=>{let n=r.key.getCollectionGroup(),s=e.Wo.get(n)||et.min();r.readTime.compareTo(s)>0&&e.Wo.set(n,r.readTime)})})(e,t),{documents:t,Jo:s})))}class az{constructor(){this.activeTargetIds=rp}na(e){this.activeTargetIds=this.activeTargetIds.add(e)}ra(e){this.activeTargetIds=this.activeTargetIds.delete(e)}ta(){return JSON.stringify({activeTargetIds:this.activeTargetIds.toArray(),updateTimeMs:Date.now()})}}class aQ{constructor(){this.Ua=new az,this.ka={},this.onlineStateHandler=null,this.sequenceNumberHandler=null}addPendingMutation(e){}updateMutationState(e,t,r){}addLocalQueryTarget(e,t=!0){return t&&this.Ua.na(e),this.ka[e]||"not-current"}updateQueryState(e,t,r){this.ka[e]=t}removeLocalQueryTarget(e){this.Ua.ra(e)}isLocalQueryTarget(e){return this.Ua.activeTargetIds.has(e)}clearQueryState(e){delete this.ka[e]}getAllActiveQueryTargets(){return this.Ua.activeTargetIds}isActiveQueryTarget(e){return this.Ua.activeTargetIds.has(e)}start(){return this.Ua=new az,Promise.resolve()}handleUserChange(e,t,r){}setOnlineState(e){}shutdown(){}writeSequenceNumber(e){}notifyBundleLoaded(e){}}function aj(){return"undefined"!=typeof document?document:null}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class aK{constructor(e,t){this.asyncQueue=e,this.onlineStateHandler=t,this.state="Unknown",this.qa=0,this.$a=null,this.Ka=!0}Wa(){0===this.qa&&(this.Qa("Unknown"),this.$a=this.asyncQueue.enqueueAfterDelay("online_state_timeout",1e4,()=>(this.$a=null,this.Ga("Backend didn't respond within 10 seconds."),this.Qa("Offline"),Promise.resolve())))}za(e){"Online"===this.state?this.Qa("Unknown"):(this.qa++,this.qa>=1&&(this.ja(),this.Ga(`Connection failed 1 times. Most recent error: ${e.toString()}`),this.Qa("Offline")))}set(e){this.ja(),this.qa=0,"Online"===e&&(this.Ka=!1),this.Qa(e)}Qa(e){e!==this.state&&(this.state=e,this.onlineStateHandler(e))}Ga(e){let t=`Could not reach Cloud Firestore backend. ${e}
This typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;this.Ka?(_(t),this.Ka=!1):v("OnlineStateTracker",t)}ja(){null!==this.$a&&(this.$a.cancel(),this.$a=null)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let aG="RemoteStore";class aH{constructor(e,t,r,n,s){this.localStore=e,this.datastore=t,this.asyncQueue=r,this.remoteSyncer={},this.Ha=[],this.Ja=new Map,this.Ya=new Map,this.Za=new Map,this.Xa=new ad(1e3),this.eu=new ad(1001),this.tu=new Set,this.nu=[],this.ru=s,this.ru.bt(e=>{r.enqueueAndForget(async()=>{a4(this)&&(v(aG,"Restarting streams for network reachability change."),await async function(e){e.tu.add(4),await aY(e),e.iu.set("Unknown"),e.tu.delete(4),await aW(e)}(this))})}),this.iu=new aK(r,n)}}async function aW(e){if(a4(e))for(let t of e.nu)await t(!0)}async function aY(e){for(let t of e.nu)await t(!1)}function aJ(e,t){return e.Ya.get(t)||void 0}function aX(e,t){let r=aJ(e,t.targetId);if(void 0!==r&&e.Ja.has(r))return;let n=function(e,t){let r=aJ(e,t);void 0!==r&&e.Za.delete(r);let n=t%2!=0?e.eu.next():e.Xa.next();return e.Ya.set(t,n),e.Za.set(n,t),n}(e,t.targetId);v(aG,"remoteStoreListen mapping SDK target ID to remote",t.targetId,n);let s=new ao(t.target,n,t.purpose,t.sequenceNumber,t.snapshotVersion,t.lastLimboFreeSnapshotVersion,t.resumeToken);e.Ja.set(n,s),a3(e)?a2(e):oc(e).Fn()&&a0(e,s)}function aZ(e,t){let r=oc(e),n=aJ(e,t);v(aG,"remoteStoreUnlisten removing mapping of SDK target ID to remote",t,n),e.Ja.delete(n),e.Ya.delete(t),e.Za.delete(n),r.Fn()&&a1(e,n),0===e.Ja.size&&(r.Fn()?r.Nn():a4(e)&&e.iu.set("Unknown"))}function a0(e,t){if(e.su.We(t.targetId),t.resumeToken.approximateByteSize()>0||t.snapshotVersion.compareTo(et.min())>0){let r=e.Za.get(t.targetId);if(void 0===r)return void v(aG,"SDK target ID not found for remote ID: "+t.targetId);let n=e.remoteSyncer.getRemoteKeysForTarget(r).size;t=t.withExpectedCount(n)}oc(e).jn(t)}function a1(e,t){e.su.We(t),oc(e).Hn(t)}function a2(e){e.su=new rV({getRemoteKeysForTarget:t=>{let r=e.Za.get(t);return void 0!==r?e.remoteSyncer.getRemoteKeysForTarget(r):rf()},dt:t=>e.Ja.get(t)||null,Tt:()=>e.datastore.serializer.databaseId}),oc(e).start(),e.iu.Wa()}function a3(e){return a4(e)&&!oc(e).Cn()&&e.Ja.size>0}function a4(e){return 0===e.tu.size}async function a6(e){e.iu.set("Online")}async function a9(e){e.Ja.forEach((t,r)=>{a0(e,t)})}async function a5(e,t){e.su=void 0,a3(e)?(e.iu.za(t),a2(e)):e.iu.set("Unknown")}async function a8(e,t,r){if(e.iu.set("Online"),t instanceof rb&&2===t.state&&t.cause)try{await async function(e,t){let r=t.cause;for(let n of t.targetIds){if(e.Ja.has(n)){let t=e.Za.get(n);void 0!==t&&(await e.remoteSyncer.rejectListen(t,r),e.Ya.delete(t),e.Za.delete(n)),e.Ja.delete(n)}e.su.removeTarget(n)}}(e,t)}catch(r){v(aG,"Failed to remove targets %s: %s ",t.targetIds.join(","),r),await a7(e,r)}else if(t instanceof rx?e.su.et(t):t instanceof rN?e.su.ot(t):e.su.rt(t),!r.isEqual(et.min()))try{let t=await a$(e.localStore);r.compareTo(t)>=0&&await function(e,t){let r=e.su.Rt(t);r.targetChanges.forEach((r,n)=>{if(r.resumeToken.approximateByteSize()>0){let s=e.Ja.get(n);s&&e.Ja.set(n,s.withResumeToken(r.resumeToken,t))}}),r.targetMismatches.forEach((t,r)=>{let n=e.Ja.get(t);if(!n)return;e.Ja.set(t,n.withResumeToken(e_.EMPTY_BYTE_STRING,n.snapshotVersion)),a1(e,t);let s=new ao(n.target,t,r,n.sequenceNumber);a0(e,s)});let n=function(e,t){let r=new Map;t.targetChanges.forEach((t,n)=>{let s=e.Za.get(n);void 0!==s&&r.set(s,t)});let n=new ec(M);return t.targetMismatches.forEach((t,r)=>{let s=e.Za.get(t);void 0!==s&&(n=n.insert(s,r))}),new rE(t.snapshotVersion,r,n,t.documentUpdates,t.augmentedDocumentUpdates,t.resolvedLimboDocuments)}(e,r);return e.remoteSyncer.applyRemoteEvent(n)}(e,r)}catch(t){v(aG,"Failed to raise snapshot:",t),await a7(e,t)}}async function a7(e,t,r){if(!eo(t))throw t;e.tu.add(1),await aY(e),e.iu.set("Offline"),r||(r=()=>a$(e.localStore)),e.asyncQueue.enqueueRetryable(async()=>{v(aG,"Retrying IndexedDB access"),await r(),e.tu.delete(1),await aW(e)})}function oe(e,t){return t().catch(r=>a7(e,r,t))}async function ot(e){let t=oh(e),r=e.Ha.length>0?e.Ha[e.Ha.length-1].batchId:-1;for(;a4(e)&&e.Ha.length<10;)try{let n=await function(e,t){return e.persistence.runTransaction("Get next mutation batch","readonly",r=>(void 0===t&&(t=-1),e.mutationQueue.getNextMutationBatchAfterBatchId(r,t)))}(e.localStore,r);if(null===n){0===e.Ha.length&&t.Nn();break}r=n.batchId,function(e,t){e.Ha.push(t);let r=oh(e);r.Fn()&&r.Jn&&r.Yn(t.mutations)}(e,n)}catch(t){await a7(e,t)}or(e)&&on(e)}function or(e){return a4(e)&&!oh(e).Cn()&&e.Ha.length>0}function on(e){oh(e).start()}async function os(e){oh(e).er()}async function oi(e){let t=oh(e);for(let r of e.Ha)t.Yn(r.mutations)}async function oa(e,t,r){let n=e.Ha.shift(),s=ai.from(n,t,r);await oe(e,()=>e.remoteSyncer.applySuccessfulWrite(s)),await ot(e)}async function oo(e,t){t&&oh(e).Jn&&await async function(e,t){var r;if(function(e){switch(e){case S.OK:return x(64938);case S.CANCELLED:case S.UNKNOWN:case S.DEADLINE_EXCEEDED:case S.RESOURCE_EXHAUSTED:case S.INTERNAL:case S.UNAVAILABLE:case S.UNAUTHENTICATED:return!1;case S.INVALID_ARGUMENT:case S.NOT_FOUND:case S.ALREADY_EXISTS:case S.PERMISSION_DENIED:case S.FAILED_PRECONDITION:case S.ABORTED:case S.OUT_OF_RANGE:case S.UNIMPLEMENTED:case S.DATA_LOSS:return!0;default:return x(15467,{code:e})}}(r=t.code)&&r!==S.ABORTED){let r=e.Ha.shift();oh(e).Mn(),await oe(e,()=>e.remoteSyncer.rejectFailedWrite(r.batchId,t)),await ot(e)}}(e,t),or(e)&&on(e)}async function ou(e,t){e.asyncQueue.verifyOperationInProgress(),v(aG,"RemoteStore received new credentials");let r=a4(e);e.tu.add(3),await aY(e),r&&e.iu.set("Unknown"),await e.remoteSyncer.handleCredentialChange(t),e.tu.delete(3),await aW(e)}async function ol(e,t){t?(e.tu.delete(2),await aW(e)):t||(e.tu.add(2),await aY(e),e.iu.set("Unknown"))}function oc(e){var t,r,n;return e._u||(e._u=(t=e.datastore,r=e.asyncQueue,n={Qt:a6.bind(null,e),zt:a9.bind(null,e),Ht:a5.bind(null,e),zn:a8.bind(null,e)},t.nr(),new nm(r,t.connection,t.authCredentials,t.appCheckCredentials,t.serializer,n)),e.nu.push(async t=>{t?(e._u.Mn(),a3(e)?a2(e):e.iu.set("Unknown")):(await e._u.stop(),e.su=void 0)})),e._u}function oh(e){var t,r,n;return e.ou||(e.ou=(t=e.datastore,r=e.asyncQueue,n={Qt:()=>Promise.resolve(),zt:os.bind(null,e),Ht:oo.bind(null,e),Zn:oi.bind(null,e),Xn:oa.bind(null,e)},t.nr(),new nf(r,t.connection,t.authCredentials,t.appCheckCredentials,t.serializer,n)),e.nu.push(async t=>{t?(e.ou.Mn(),await ot(e)):(await e.ou.stop(),e.Ha.length>0&&(v(aG,`Stopping write stream with ${e.Ha.length} pending writes`),e.Ha=[]))})),e.ou}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class od{constructor(e,t,r,n,s){this.asyncQueue=e,this.timerId=t,this.targetTimeMs=r,this.op=n,this.removalCallback=s,this.deferred=new V,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch(e=>{})}get promise(){return this.deferred.promise}static createAndSchedule(e,t,r,n,s){let i=new od(e,t,Date.now()+r,n,s);return i.start(r),i}start(e){this.timerHandle=setTimeout(()=>this.handleDelayElapsed(),e)}skipDelay(){return this.handleDelayElapsed()}cancel(e){null!==this.timerHandle&&(this.clearTimeout(),this.deferred.reject(new I(S.CANCELLED,"Operation cancelled"+(e?": "+e:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget(()=>null!==this.timerHandle?(this.clearTimeout(),this.op().then(e=>this.deferred.resolve(e))):Promise.resolve())}clearTimeout(){null!==this.timerHandle&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}function om(e,t){if(_("AsyncQueue",`${t}: ${e}`),eo(e))return new I(S.UNAVAILABLE,`${t}: ${e}`);throw e}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class of{static emptySet(e){return new of(e.comparator)}constructor(e){this.comparator=e?(t,r)=>e(t,r)||G.comparator(t.key,r.key):(e,t)=>G.comparator(e.key,t.key),this.keyedMap=rl(),this.sortedSet=new ec(this.comparator)}has(e){return null!=this.keyedMap.get(e)}get(e){return this.keyedMap.get(e)}first(){return this.sortedSet.minKey()}last(){return this.sortedSet.maxKey()}isEmpty(){return this.sortedSet.isEmpty()}indexOf(e){let t=this.keyedMap.get(e);return t?this.sortedSet.indexOf(t):-1}get size(){return this.sortedSet.size}forEach(e){this.sortedSet.inorderTraversal((t,r)=>(e(t),!1))}add(e){let t=this.delete(e.key);return t.copy(t.keyedMap.insert(e.key,e),t.sortedSet.insert(e,null))}delete(e){let t=this.get(e);return t?this.copy(this.keyedMap.remove(e),this.sortedSet.remove(t)):this}isEqual(e){if(!(e instanceof of)||this.size!==e.size)return!1;let t=this.sortedSet.getIterator(),r=e.sortedSet.getIterator();for(;t.hasNext();){let e=t.getNext().key,n=r.getNext().key;if(!e.isEqual(n))return!1}return!0}toString(){let e=[];return this.forEach(t=>{e.push(t.toString())}),0===e.length?"DocumentSet ()":"DocumentSet (\n  "+e.join("  \n")+"\n)"}copy(e,t){let r=new of;return r.comparator=this.comparator,r.keyedMap=e,r.sortedSet=t,r}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class op{constructor(){this.au=new ec(G.comparator)}track(e){let t=e.doc.key,r=this.au.get(t);r?0!==e.type&&3===r.type?this.au=this.au.insert(t,e):3===e.type&&1!==r.type?this.au=this.au.insert(t,{type:r.type,doc:e.doc}):2===e.type&&2===r.type?this.au=this.au.insert(t,{type:2,doc:e.doc}):2===e.type&&0===r.type?this.au=this.au.insert(t,{type:0,doc:e.doc}):1===e.type&&0===r.type?this.au=this.au.remove(t):1===e.type&&2===r.type?this.au=this.au.insert(t,{type:1,doc:r.doc}):0===e.type&&1===r.type?this.au=this.au.insert(t,{type:2,doc:e.doc}):x(63341,{ft:e,uu:r}):this.au=this.au.insert(t,e)}cu(){let e=[];return this.au.inorderTraversal((t,r)=>{e.push(r)}),e}}class og{constructor(e,t,r,n,s,i,a,o,u){this.query=e,this.docs=t,this.oldDocs=r,this.docChanges=n,this.mutatedKeys=s,this.fromCache=i,this.syncStateChanged=a,this.excludesMetadataChanges=o,this.hasCachedResults=u}static fromInitialDocuments(e,t,r,n,s){let i=[];return t.forEach(e=>{i.push({type:0,doc:e})}),new og(e,t,of.emptySet(t),i,r,n,!0,!1,s)}get hasPendingWrites(){return!this.mutatedKeys.isEmpty()}isEqual(e){if(!(this.fromCache===e.fromCache&&this.hasCachedResults===e.hasCachedResults&&this.syncStateChanged===e.syncStateChanged&&this.mutatedKeys.isEqual(e.mutatedKeys)&&at(this.query,e.query)&&this.docs.isEqual(e.docs)&&this.oldDocs.isEqual(e.oldDocs)))return!1;let t=this.docChanges,r=e.docChanges;if(t.length!==r.length)return!1;for(let e=0;e<t.length;e++)if(t[e].type!==r[e].type||!t[e].doc.isEqual(r[e].doc))return!1;return!0}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class oy{constructor(){this.lu=void 0,this.Eu=[]}hu(){return this.Eu.some(e=>e.Tu())}}class ow{constructor(){this.queries=ov(),this.onlineState="Unknown",this.Pu=new Set}terminate(){!function(e,t){let r=e.queries;e.queries=ov(),r.forEach((e,r)=>{for(let e of r.Eu)e.onError(t)})}(this,new I(S.ABORTED,"Firestore shutting down"))}}function ov(){return new ra(e=>ae(e),at)}async function o_(e,t){let r=3,n=t.query,s=e.queries.get(n);s?!s.hu()&&t.Tu()&&(r=2):(s=new oy,r=t.Tu()?0:1);try{switch(r){case 0:s.lu=await e.onListen(n,!0);break;case 1:s.lu=await e.onListen(n,!1);break;case 2:await e.onFirstRemoteStoreListen(n)}}catch(r){let e=om(r,`Initialization of query '${i8(t.query)?i5(t.query):rt(t.query)}' failed`);return void t.onError(e)}e.queries.set(n,s),s.Eu.push(t),t.Ru(e.onlineState),s.lu&&t.Iu(s.lu)&&oN(e)}async function oE(e,t){let r=t.query,n=3,s=e.queries.get(r);if(s){let e=s.Eu.indexOf(t);e>=0&&(s.Eu.splice(e,1),0===s.Eu.length?n=t.Tu()?0:1:!s.hu()&&t.Tu()&&(n=2))}switch(n){case 0:return e.queries.delete(r),e.onUnlisten(r,!0);case 1:return e.queries.delete(r),e.onUnlisten(r,!1);case 2:return e.onLastRemoteStoreUnlisten(r);default:return}}function oT(e,t){let r=!1;for(let n of t){let t=n.query,s=e.queries.get(t);if(s){for(let e of s.Eu)e.Iu(n)&&(r=!0);s.lu=n}}r&&oN(e)}function ox(e,t,r){let n=e.queries.get(t);if(n)for(let e of n.Eu)e.onError(r);e.queries.delete(t)}function oN(e){e.Pu.forEach(e=>{e.next()})}(n=a||(a={})).Default="default",n.Cache="cache";class ob{constructor(e,t,r){this.query=e,this.Au=t,this.Vu=!1,this.du=null,this.onlineState="Unknown",this.options=r||{}}Iu(e){if(!this.options.includeMetadataChanges){let t=[];for(let r of e.docChanges)3!==r.type&&t.push(r);e=new og(e.query,e.docs,e.oldDocs,t,e.mutatedKeys,e.fromCache,e.syncStateChanged,!0,e.hasCachedResults)}let t=!1;return this.Vu?this.fu(e)&&(this.Au.next(e),t=!0):this.mu(e,this.onlineState)&&(this.pu(e),t=!0),this.du=e,t}onError(e){this.Au.error(e)}Ru(e){this.onlineState=e;let t=!1;return this.du&&!this.Vu&&this.mu(this.du,e)&&(this.pu(this.du),t=!0),t}mu(e,t){return!(e.fromCache&&this.Tu())||(!this.options.waitForSyncWhenOnline||!("Offline"!==t))&&(!e.docs.isEmpty()||e.hasCachedResults||"Offline"===t)}fu(e){if(e.docChanges.length>0)return!0;let t=this.du&&this.du.hasPendingWrites!==e.hasPendingWrites;return!(!e.syncStateChanged&&!t)&&!0===this.options.includeMetadataChanges}pu(e){e=og.fromInitialDocuments(e.query,e.docs,e.mutatedKeys,e.fromCache,e.hasCachedResults),this.Vu=!0,this.Au.next(e)}Tu(){return this.options.source!==a.Cache}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class oS{constructor(e){this.key=e}}class oI{constructor(e){this.key=e}}class oV{constructor(e,t){this.query=e,this.Ou=t,this.Mu=null,this.hasCachedResults=!1,this.current=!1,this.Nu=rf(),this.mutatedKeys=rf(),this.Lu=i8(e)?ap(e):rn(e),this.Bu=new of(this.Lu)}get Uu(){return this.Ou}ku(e,t){let r=t?t.qu:new op,n=t?t.Bu:this.Bu,s=t?t.mutatedKeys:this.mutatedKeys,i=n,a=!1,[o,u]=this.$u(this.query,n);e.inorderTraversal((e,t)=>{var l;let c=n.get(e),h=(i8(l=this.query)?af(l,t):rr(l,t))?t:null,d=!!c&&this.mutatedKeys.has(c.key),m=!!h&&(h.hasLocalMutations||this.mutatedKeys.has(h.key)&&h.hasCommittedMutations),f=!1;c&&h?c.data.isEqual(h.data)?d!==m&&(r.track({type:3,doc:h}),f=!0):this.Ku(c,h)||(r.track({type:2,doc:h}),f=!0,(o&&this.Lu(h,o)>0||u&&0>this.Lu(h,u))&&(a=!0)):!c&&h?(r.track({type:0,doc:h}),f=!0):c&&!h&&(r.track({type:1,doc:c}),f=!0,(o||u)&&(a=!0)),f&&(h?(i=i.add(h),s=m?s.add(e):s.delete(e)):(i=i.delete(e),s=s.delete(e)))});let l=this.Wu(this.query);if(l){if(i8(this.query)){let e=[];i.forEach(t=>e.push(t));let t=am(this.query,e),n=new of(ap(this.query));for(let e of t)n=n.add(e);i.forEach(e=>{n.has(e.key)||(s=s.delete(e.key),r.track({type:1,doc:e}))}),i=n}else{let e=this.Qu(this.query);for(;i.size>l;){let t="F"===e?i.last():i.first();i=i.delete(t.key),s=s.delete(t.key),r.track({type:1,doc:t})}}}return{Bu:i,qu:r,Uo:a,mutatedKeys:s}}Wu(e){return i8(e)?ag(e)?.limit:e.limit||void 0}Qu(e){if(i8(e)){let t=ag(e);return t&&t.limit<0?"L":"F"}return e.limitType}$u(e,t){if(i8(e)){let r=ag(e)?.limit;return[t.size===r?t.last():null,null]}return["F"===e.limitType&&t.size===this.Wu(this.query)?t.last():null,"L"===e.limitType&&t.size===this.Wu(this.query)?t.first():null]}Ku(e,t){return e.hasLocalMutations&&t.hasCommittedMutations&&!t.hasLocalMutations}applyChanges(e,t,r,n){let s=this.Bu;this.Bu=e.Bu,this.mutatedKeys=e.mutatedKeys;let i=e.qu.cu();i.sort((e,t)=>(function(e,t){let r=e=>{switch(e){case 0:return 1;case 2:case 3:return 2;case 1:return 0;default:return x(20277,{ft:e})}};return r(e)-r(t)})(e.type,t.type)||this.Lu(e.doc,t.doc)),this.Gu(r),n=n??!1;let a=t&&!n?this.zu():[],o=0===this.Nu.size&&this.current&&!n?1:0,u=o!==this.Mu;return(this.Mu=o,0!==i.length||u)?{snapshot:new og(this.query,e.Bu,s,i,e.mutatedKeys,0===o,u,!1,!!r&&r.resumeToken.approximateByteSize()>0),ju:a}:{ju:a}}Ru(e){return this.current&&"Offline"===e?(this.current=!1,this.applyChanges({Bu:this.Bu,qu:new op,mutatedKeys:this.mutatedKeys,Uo:!1},!1)):{ju:[]}}Hu(e){return!this.Ou.has(e)&&!!this.Bu.has(e)&&!this.Bu.get(e).hasLocalMutations}Gu(e){e&&(e.addedDocuments.forEach(e=>this.Ou=this.Ou.add(e)),e.modifiedDocuments.forEach(e=>{}),e.removedDocuments.forEach(e=>this.Ou=this.Ou.delete(e)),this.current=e.current)}zu(){if(!this.current)return[];let e=this.Nu;this.Nu=rf(),this.Bu.forEach(e=>{this.Hu(e.key)&&(this.Nu=this.Nu.add(e.key))});let t=[];return e.forEach(e=>{this.Nu.has(e)||t.push(new oI(e))}),this.Nu.forEach(r=>{e.has(r)||t.push(new oS(r))}),t}Ju(e){this.Ou=e.Jo,this.Nu=rf();let t=this.ku(e.documents);return this.applyChanges(t,!0)}Yu(){return og.fromInitialDocuments(this.query,this.Bu,this.mutatedKeys,0===this.Mu,this.hasCachedResults)}}let oC="SyncEngine";class oA{constructor(e,t,r){this.query=e,this.targetId=t,this.view=r}}class oD{constructor(e){this.key=e,this.Zu=!1}}class ok{constructor(e,t,r,n,s,i){this.localStore=e,this.remoteStore=t,this.eventManager=r,this.sharedClientState=n,this.currentUser=s,this.maxConcurrentLimboResolutions=i,this.Xu={},this.ec=new ra(e=>ae(e),at),this.tc=new Map,this.nc=new Set,this.rc=new ec(G.comparator),this.sc=new Map,this._c=new ax,this.oc={},this.ac=new Map,this.uc=ad.Cs(),this.onlineState="Unknown",this.cc=void 0}get isPrimaryClient(){return!0===this.cc}}async function oL(e,t,r=!0){let n;let s=o0(e),i=s.ec.get(t);return i?(s.sharedClientState.addLocalQueryTarget(i.targetId),n=i.view.Yu()):n=await oU(s,t,r,!0),n}async function oR(e,t){let r=o0(e);await oU(r,t,!0,!1)}async function oU(e,t,r,n){var s,i;let a;let o=await (s=e.localStore,i=i8(t)?t:t6(t),s.persistence.runTransaction("Allocate target","readwrite",e=>{let t;return s.g_.getTargetData(e,i).next(r=>r?(t=r,ea.resolve(t)):s.g_.allocateTargetId(e).next(r=>(t=new ao(i,r,"TargetPurposeListen",e.currentSequenceNumber),s.g_.addTargetData(e,t).next(()=>t))))}).then(e=>{let t=s.$o.get(e.targetId);return(null===t||e.snapshotVersion.compareTo(t.snapshotVersion)>0)&&(s.$o=s.$o.insert(e.targetId,e),s.Ko.set(i,e.targetId)),e})),u=o.targetId,l=e.sharedClientState.addLocalQueryTarget(u,r);return n&&(a=await oO(e,t,u,"current"===l,o.resumeToken)),e.isPrimaryClient&&r&&aX(e.remoteStore,o),a}async function oO(e,t,r,n,s){e.lc=(t,r,n)=>(async function(e,t,r,n){let s=t.view.ku(r);s.Uo&&(s=await aq(e.localStore,t.query,!1).then(({documents:e})=>t.view.ku(e,s)));let i=n&&n.targetChanges.get(t.targetId),a=n&&null!=n.targetMismatches.get(t.targetId),o=t.view.applyChanges(s,e.isPrimaryClient,i,a);return oW(e,t.targetId,o.ju),o.snapshot})(e,t,r,n);let i=await aq(e.localStore,t,!0),a=new oV(t,i.Jo),o=a.ku(i.documents),u=rT.createSynthesizedTargetChangeForCurrentChange(r,n&&"Offline"!==e.onlineState,s),l=a.applyChanges(o,e.isPrimaryClient,u);oW(e,r,l.ju);let c=new oA(t,r,a);return e.ec.set(t,c),e.tc.has(r)?e.tc.get(r).push(t):e.tc.set(r,[t]),l.snapshot}async function oP(e,t,r){let n=e.ec.get(t),s=e.tc.get(n.targetId);if(s.length>1)return e.tc.set(n.targetId,s.filter(e=>!at(e,t))),void e.ec.delete(t);e.isPrimaryClient?(e.sharedClientState.removeLocalQueryTarget(n.targetId),e.sharedClientState.isActiveQueryTarget(n.targetId)||await aB(e.localStore,n.targetId,!1).then(()=>{e.sharedClientState.clearQueryState(n.targetId),r&&aZ(e.remoteStore,n.targetId),oG(e,n.targetId)}).catch(ei)):(oG(e,n.targetId),await aB(e.localStore,n.targetId,!0))}async function oM(e,t){let r=e.ec.get(t),n=e.tc.get(r.targetId);e.isPrimaryClient&&1===n.length&&(e.sharedClientState.removeLocalQueryTarget(r.targetId),aZ(e.remoteStore,r.targetId))}async function oF(e,t,r){var n;let s=(e.remoteStore.remoteSyncer.applySuccessfulWrite=oz.bind(null,e),e.remoteStore.remoteSyncer.rejectFailedWrite=oQ.bind(null,e),e);try{let e;let i=await function(e,t){let r,n;let s=ee.now(),i=t.reduce((e,t)=>e.add(t.key),rf());return e.persistence.runTransaction("Locally write mutations","readwrite",a=>{let o=ro,u=rf();return e.Qo.getEntries(a,i).next(e=>{(o=e).forEach((e,t)=>{t.isValidDocument()||(u=u.add(e))})}).next(()=>e.localDocuments.getOverlayedDocuments(a,o)).next(n=>{r=n;let i=[];for(let e of t){let t=function(e,t){let r=null;for(let n of e.fieldTransforms){let e=t.data.field(n.field),s=ts(n.transform,e||null);null!=s&&(null===r&&(r=e7.empty()),r.set(n.field,s))}return r||null}(e,r.get(e.key).overlayedDocument);null!=t&&i.push(new tb(e.key,t,function e(t){let r=[];return ey(t.fields,(t,n)=>{let s=new K([t]);if(e4(n)){let t=e(n.mapValue).fields;if(0===t.length)r.push(s);else for(let e of t)r.push(s.child(e))}else r.push(s)}),new ep(r)}(t.value.mapValue),tw.exists(!0)))}return e.mutationQueue.addMutationBatch(a,s,i,t)}).next(t=>{n=t;let s=t.applyToLocalDocumentSet(r,u);return e.documentOverlayCache.saveOverlays(a,t.batchId,s)})}).then(()=>({batchId:n.batchId,changes:rc(r)}))}(s.localStore,t);s.sharedClientState.addPendingMutation(i.batchId),n=i.batchId,(e=s.oc[s.currentUser.toKey()])||(e=new ec(M)),e=e.insert(n,r),s.oc[s.currentUser.toKey()]=e,await oJ(s,i.changes),await ot(s.remoteStore)}catch(t){let e=om(t,"Failed to persist write");r.reject(e)}}async function o$(e,t){try{let r=await function(e,t){let r=t.snapshotVersion,n=e.$o;return e.persistence.runTransaction("Apply remote event","readwrite-primary",s=>{var i;let a,o;let u=e.Qo.newChangeBuffer({trackRemovals:!0});n=e.$o;let l=[];t.targetChanges.forEach((i,a)=>{var o;let u=n.get(a);if(!u)return;l.push(e.g_.removeMatchingKeys(s,i.removedDocuments,a).next(()=>e.g_.addMatchingKeys(s,i.addedDocuments,a)));let c=u.withSequenceNumber(s.currentSequenceNumber);null!==t.targetMismatches.get(a)?c=c.withResumeToken(e_.EMPTY_BYTE_STRING,et.min()).withLastLimboFreeSnapshotVersion(et.min()):i.resumeToken.approximateByteSize()>0&&(c=c.withResumeToken(i.resumeToken,r)),n=n.insert(a,c),o=c,(0===u.resumeToken.approximateByteSize()||o.snapshotVersion.toMicroseconds()-u.snapshotVersion.toMicroseconds()>=3e8||i.addedDocuments.size+i.modifiedDocuments.size+i.removedDocuments.size>0)&&l.push(e.g_.updateTargetData(s,c))});let c=ro,h=rf();if(t.documentUpdates.forEach(r=>{t.resolvedLimboDocuments.has(r)&&l.push(e.persistence.referenceDelegate.updateLimboDocument(s,r))}),l.push((i=t.documentUpdates,a=rf(),o=rf(),i.forEach(e=>a=a.add(e)),u.getEntries(s,a).next(e=>{let t=ro;return i.forEach((r,n)=>{let s=e.get(r);n.isFoundDocument()!==s.isFoundDocument()&&(o=o.add(r)),n.isNoDocument()&&n.version.isEqual(et.min())?(u.removeEntry(r,n.readTime),t=t.insert(r,n)):!s.isValidDocument()||n.version.compareTo(s.version)>0||0===n.version.compareTo(s.version)&&s.hasPendingWrites?(u.addEntry(n),t=t.insert(r,n)):v(aP,"Ignoring outdated watch update for ",r,". Current version:",s.version," Watch version:",n.version)}),{jo:t,Ho:o}})).next(e=>{c=e.jo,h=e.Ho})),!r.isEqual(et.min())){let t=e.g_.getLastRemoteSnapshotVersion(s).next(t=>e.g_.setTargetsMetadata(s,s.currentSequenceNumber,r));l.push(t)}return ea.waitFor(l).next(()=>u.apply(s)).next(()=>e.localDocuments.getLocalViewOfDocuments(s,c,h)).next(()=>c)}).then(t=>(e.$o=n,t))}(e.localStore,t);t.targetChanges.forEach((t,r)=>{let n=e.sc.get(r);n&&(b(t.addedDocuments.size+t.modifiedDocuments.size+t.removedDocuments.size<=1,22616),t.addedDocuments.size>0?n.Zu=!0:t.modifiedDocuments.size>0?b(n.Zu,14607):t.removedDocuments.size>0&&(b(n.Zu,42227),n.Zu=!1))}),await oJ(e,r,t)}catch(e){await ei(e)}}function oB(e,t,r){var n;if(e.isPrimaryClient&&0===r||!e.isPrimaryClient&&1===r){let r;let s=[];e.ec.forEach((e,r)=>{let n=r.view.Ru(t);n.snapshot&&s.push(n.snapshot)}),(n=e.eventManager).onlineState=t,r=!1,n.queries.forEach((e,n)=>{for(let e of n.Eu)e.Ru(t)&&(r=!0)}),r&&oN(n),s.length&&e.Xu.zn(s),e.onlineState=t,e.isPrimaryClient&&e.sharedClientState.setOnlineState(t)}}async function oq(e,t,r){e.sharedClientState.updateQueryState(t,"rejected",r);let n=e.sc.get(t),s=n&&n.key;if(s){let r=new ec(G.comparator);r=r.insert(s,tH.newNoDocument(s,et.min()));let n=rf().add(s),i=new rE(et.min(),new Map,new ec(M),r,ro,n);await o$(e,i),e.rc=e.rc.remove(s),e.sc.delete(t),oY(e)}else await aB(e.localStore,t,!1).then(()=>oG(e,t,r)).catch(ei)}async function oz(e,t){var r;let n=t.batch.batchId;try{let s=await (r=e.localStore).persistence.runTransaction("Acknowledge batch","readwrite-primary",e=>{let n=t.batch.keys(),s=r.Qo.newChangeBuffer({trackRemovals:!0});return(function(e,t,r,n){let s=r.batch,i=s.keys(),a=ea.resolve();return i.forEach(e=>{a=a.next(()=>n.getEntry(t,e)).next(t=>{let i=r.docVersions.get(e);b(null!==i,48541),0>t.version.compareTo(i)&&(s.applyToRemoteDocument(t,r),t.isValidDocument()&&(t.setReadTime(r.commitVersion),n.addEntry(t)))})}),a.next(()=>e.mutationQueue.removeMutationBatch(t,s))})(r,e,t,s).next(()=>s.apply(e)).next(()=>r.mutationQueue.performConsistencyCheck(e)).next(()=>r.documentOverlayCache.removeOverlaysForBatchId(e,n,t.batch.batchId)).next(()=>r.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(e,function(e){let t=rf();for(let r=0;r<e.mutationResults.length;++r)e.mutationResults[r].transformResults.length>0&&(t=t.add(e.batch.mutations[r].key));return t}(t))).next(()=>r.localDocuments.getDocuments(e,n))});oK(e,n,null),oj(e,n),e.sharedClientState.updateMutationState(n,"acknowledged"),await oJ(e,s)}catch(e){await ei(e)}}async function oQ(e,t,r){var n;try{let s=await (n=e.localStore).persistence.runTransaction("Reject batch","readwrite-primary",e=>{let r;return n.mutationQueue.lookupMutationBatch(e,t).next(t=>(b(null!==t,37113),r=t.keys(),n.mutationQueue.removeMutationBatch(e,t))).next(()=>n.mutationQueue.performConsistencyCheck(e)).next(()=>n.documentOverlayCache.removeOverlaysForBatchId(e,r,t)).next(()=>n.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(e,r)).next(()=>n.localDocuments.getDocuments(e,r))});oK(e,t,r),oj(e,t),e.sharedClientState.updateMutationState(t,"rejected",r),await oJ(e,s)}catch(e){await ei(e)}}function oj(e,t){(e.ac.get(t)||[]).forEach(e=>{e.resolve()}),e.ac.delete(t)}function oK(e,t,r){let n=e.oc[e.currentUser.toKey()];if(n){let s=n.get(t);s&&(r?s.reject(r):s.resolve(),n=n.remove(t)),e.oc[e.currentUser.toKey()]=n}}function oG(e,t,r=null){for(let n of(e.sharedClientState.removeLocalQueryTarget(t),e.tc.get(t)))e.ec.delete(n),r&&e.Xu.Ec(n,r);e.tc.delete(t),e.isPrimaryClient&&e._c.s_(t).forEach(t=>{e._c.containsKey(t)||oH(e,t)})}function oH(e,t){e.nc.delete(t.path.canonicalString());let r=e.rc.get(t);null!==r&&(aZ(e.remoteStore,r),e.rc=e.rc.remove(t),e.sc.delete(r),oY(e))}function oW(e,t,r){for(let n of r)n instanceof oS?(e._c.addReference(n.key,t),function(e,t){let r=t.key,n=r.path.canonicalString();e.rc.get(r)||e.nc.has(n)||(v(oC,"New document in limbo: "+r),e.nc.add(n),oY(e))}(e,n)):n instanceof oI?(v(oC,"Document no longer in limbo: "+n.key),e._c.removeReference(n.key,t),e._c.containsKey(n.key)||oH(e,n.key)):x(19791,{hc:n})}function oY(e){for(;e.nc.size>0&&e.rc.size<e.maxConcurrentLimboResolutions;){let t=e.nc.values().next().value;e.nc.delete(t);let r=new G(Q.fromString(t)),n=e.uc.next();e.sc.set(n,new oD(r)),e.rc=e.rc.insert(r,n),aX(e.remoteStore,new ao(t6(new t1(r.path)),n,"TargetPurposeLimboResolution",eu.ce))}}async function oJ(e,t,r){let n=[],s=[],i=[];e.ec.isEmpty()||(e.ec.forEach((a,o)=>{i.push(e.lc(o,t,r).then(t=>{if((t||r)&&e.isPrimaryClient){let n=t?!t.fromCache:r?.targetChanges.get(o.targetId)?.current;e.sharedClientState.updateQueryState(o.targetId,n?"current":"not-current")}if(t){n.push(t);let e=aL.vo(o.targetId,t);s.push(e)}}))}),await Promise.all(i),e.Xu.zn(n),await async function(e,t){try{await e.persistence.runTransaction("notifyLocalViewChanges","readwrite",r=>ea.forEach(t,t=>ea.forEach(t.wo,n=>e.persistence.referenceDelegate.addReference(r,t.targetId,n)).next(()=>ea.forEach(t.bo,n=>e.persistence.referenceDelegate.removeReference(r,t.targetId,n)))))}catch(e){if(!eo(e))throw e;v(aP,"Failed to update sequence numbers: "+e)}for(let r of t){let t=r.targetId;if(!r.fromCache){let r=e.$o.get(t),n=r.snapshotVersion,s=r.withLastLimboFreeSnapshotVersion(n);e.$o=e.$o.insert(t,s)}}}(e.localStore,s))}async function oX(e,t){var r;if(!e.currentUser.isEqual(t)){v(oC,"User change. New user:",t.toKey());let n=await aF(e.localStore,t);e.currentUser=t,r="'waitForPendingWrites' promise is rejected due to a user change.",e.ac.forEach(e=>{e.forEach(e=>{e.reject(new I(S.CANCELLED,r))})}),e.ac.clear(),e.sharedClientState.handleUserChange(t,n.removedBatchIds,n.addedBatchIds),await oJ(e,n.zo)}}function oZ(e,t){let r=e.sc.get(t);if(r&&r.Zu)return rf().add(r.key);{let r=rf(),n=e.tc.get(t);if(!n)return r;for(let t of n??[]){let n=e.ec.get(t);r=r.unionWith(n.view.Uu)}return r}}function o0(e){return e.remoteStore.remoteSyncer.applyRemoteEvent=o$.bind(null,e),e.remoteStore.remoteSyncer.getRemoteKeysForTarget=oZ.bind(null,e),e.remoteStore.remoteSyncer.rejectListen=oq.bind(null,e),e.Xu.zn=oT.bind(null,e.eventManager),e.Xu.Ec=ox.bind(null,e.eventManager),e}class o1{constructor(){this.kind="memory",this.synchronizeTabs=!1}async initialize(e){this.serializer=r2(e.databaseInfo.databaseId),this.sharedClientState=this.Rc(e),this.persistence=this.Ic(e),await this.persistence.start(),this.localStore=this.Ac(e),this.gcScheduler=this.Vc(e,this.localStore),this.indexBackfillerScheduler=this.dc(e,this.localStore)}Vc(e,t){return null}dc(e,t){return null}Ac(e){var t;return t=this.persistence,new aM(t,new aO,e.initialUser,this.serializer)}Ic(e){return new aC(aD.C_,this.serializer)}Rc(e){return new aQ}async terminate(){this.gcScheduler?.stop(),this.indexBackfillerScheduler?.stop(),this.sharedClientState.shutdown(),await this.persistence.shutdown()}}o1.provider={build:()=>new o1};class o2 extends o1{constructor(e){super(),this.cacheSizeBytes=e}Vc(e,t){return b(this.persistence.referenceDelegate instanceof ak,46915),new nx(this.persistence.referenceDelegate.garbageCollector,e.asyncQueue,t)}Ic(e){let t=void 0!==this.cacheSizeBytes?nv.withCacheSize(this.cacheSizeBytes):nv.DEFAULT;return new aC(e=>ak.C_(e,t),this.serializer)}}class o3{async initialize(e,t){this.localStore||(this.localStore=e.localStore,this.sharedClientState=e.sharedClientState,this.datastore=this.createDatastore(t),this.remoteStore=this.createRemoteStore(t),this.eventManager=this.createEventManager(t),this.syncEngine=this.createSyncEngine(t,!e.synchronizeTabs),this.sharedClientState.onlineStateHandler=e=>oB(this.syncEngine,e,1),this.remoteStore.remoteSyncer.handleCredentialChange=oX.bind(null,this.syncEngine),await ol(this.remoteStore,this.syncEngine.isPrimaryClient))}createEventManager(e){return new ow}createDatastore(e){let t=r2(e.databaseInfo.databaseId),r=new nl(e.databaseInfo);return new ng(e.authCredentials,e.appCheckCredentials,r,t)}createRemoteStore(e){var t;return t=this.localStore,new aH(t,this.datastore,e.asyncQueue,e=>oB(this.syncEngine,e,0),ne.C()?new ne:new r8)}createSyncEngine(e,t){return function(e,t,r,n,s,i,a){let o=new ok(e,t,r,n,s,i);return a&&(o.cc=!0),o}(this.localStore,this.remoteStore,this.eventManager,this.sharedClientState,e.initialUser,e.maxConcurrentLimboResolutions,t)}async terminate(){await async function(e){v(aG,"RemoteStore shutting down."),e.tu.add(5),await aY(e),e.ru.shutdown(),e.iu.set("Unknown")}(this.remoteStore),this.datastore?.terminate(),this.eventManager?.terminate()}}o3.provider={build:()=>new o3};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class o4{constructor(e){this.observer=e,this.muted=!1}next(e){this.muted||this.observer.next&&this.mc(this.observer.next,e)}error(e){this.muted||(this.observer.error?this.mc(this.observer.error,e):_("Uncaught Error in snapshot listener:",e.toString()))}gc(){this.muted=!0}mc(e,t){setTimeout(()=>{this.muted||e(t)},0)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let o6="FirestoreClient";class o9{constructor(e,t,r,n,s){this.authCredentials=e,this.appCheckCredentials=t,this.asyncQueue=r,this._databaseInfo=n,this.user=f.UNAUTHENTICATED,this.clientId=P.newId(),this.authCredentialListener=()=>Promise.resolve(),this.appCheckCredentialListener=()=>Promise.resolve(),this._uninitializedComponentsProvider=s,this.authCredentials.start(r,async e=>{v(o6,"Received user=",e.uid),await this.authCredentialListener(e),this.user=e}),this.appCheckCredentials.start(r,e=>(v(o6,"Received new app check token=",e),this.appCheckCredentialListener(e,this.user)))}get configuration(){return{asyncQueue:this.asyncQueue,databaseInfo:this._databaseInfo,clientId:this.clientId,authCredentials:this.authCredentials,appCheckCredentials:this.appCheckCredentials,initialUser:this.user,maxConcurrentLimboResolutions:100}}setCredentialChangeListener(e){this.authCredentialListener=e}setAppCheckTokenChangeListener(e){this.appCheckCredentialListener=e}terminate(){this.asyncQueue.enterRestrictedMode();let e=new V;return this.asyncQueue.enqueueAndForgetEvenWhileRestricted(async()=>{try{this._onlineComponents&&await this._onlineComponents.terminate(),this._offlineComponents&&await this._offlineComponents.terminate(),this.authCredentials.shutdown(),this.appCheckCredentials.shutdown(),e.resolve()}catch(r){let t=om(r,"Failed to shutdown persistence");e.reject(t)}}),e.promise}}async function o5(e,t){e.asyncQueue.verifyOperationInProgress(),v(o6,"Initializing OfflineComponentProvider");let r=e.configuration;await t.initialize(r);let n=r.initialUser;e.setCredentialChangeListener(async e=>{n.isEqual(e)||(await aF(t.localStore,e),n=e)}),t.persistence.setDatabaseDeletedListener(()=>e.terminate()),e._offlineComponents=t}async function o8(e,t){e.asyncQueue.verifyOperationInProgress();let r=await o7(e);v(o6,"Initializing OnlineComponentProvider"),await t.initialize(r,e.configuration),e.setCredentialChangeListener(e=>ou(t.remoteStore,e)),e.setAppCheckTokenChangeListener((e,r)=>ou(t.remoteStore,r)),e._onlineComponents=t}async function o7(e){if(!e._offlineComponents){if(e._uninitializedComponentsProvider){v(o6,"Using user provided OfflineComponentProvider");try{await o5(e,e._uninitializedComponentsProvider._offline)}catch(t){if(!("FirebaseError"===t.name?t.code===S.FAILED_PRECONDITION||t.code===S.UNIMPLEMENTED:!("undefined"!=typeof DOMException&&t instanceof DOMException)||22===t.code||20===t.code||11===t.code))throw t;E("Error using user provided cache. Falling back to memory cache: "+t),await o5(e,new o1)}}else v(o6,"Using default OfflineComponentProvider"),await o5(e,new o2(void 0))}return e._offlineComponents}async function ue(e){return e._onlineComponents||(e._uninitializedComponentsProvider?(v(o6,"Using user provided OnlineComponentProvider"),await o8(e,e._uninitializedComponentsProvider._online)):(v(o6,"Using default OnlineComponentProvider"),await o8(e,new o3))),e._onlineComponents}async function ut(e){let t=await ue(e),r=t.eventManager;return r.onListen=oL.bind(null,t.syncEngine),r.onUnlisten=oP.bind(null,t.syncEngine),r.onFirstRemoteStoreListen=oR.bind(null,t.syncEngine),r.onLastRemoteStoreUnlisten=oM.bind(null,t.syncEngine),r}function ur(e,t,r={}){let n=new V;return e.asyncQueue.enqueueAndForget(async()=>(function(e,t,r,n,s){let i=new o4({next:o=>{i.gc(),t.enqueueAndForget(()=>oE(e,a));let u=o.docs.has(r);!u&&o.fromCache?s.reject(new I(S.UNAVAILABLE,"Failed to get document because the client is offline.")):u&&o.fromCache&&n&&"server"===n.source?s.reject(new I(S.UNAVAILABLE,'Failed to get document from server. (However, this document does exist in the local cache. Run again without setting source to "server" to retrieve the cached document.)')):s.resolve(o)},error:e=>s.reject(e)}),a=new ob(new t1(r.path),i,{includeMetadataChanges:!0,waitForSyncWhenOnline:!0});return o_(e,a)})(await ut(e),e.asyncQueue,t,r,n)),n.promise}function un(e,t){let r=new V;return e.asyncQueue.enqueueAndForget(async()=>oF(await ue(e).then(e=>e.syncEngine),t,r)),r.promise}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let us="AsyncQueue";class ui{constructor(e=Promise.resolve()){this.qc=[],this.$c=!1,this.Kc=[],this.Wc=null,this.Qc=!1,this.Gc=!1,this.zc=[],this.xn=new nc(this,"async_queue_retry"),this.jc=()=>{let e=aj();e&&v(us,"Visibility state changed to "+e.visibilityState),this.xn.gn()},this.Hc=e;let t=aj();t&&"function"==typeof t.addEventListener&&t.addEventListener("visibilitychange",this.jc)}get isShuttingDown(){return this.$c}enqueueAndForget(e){this.enqueue(e)}enqueueAndForgetEvenWhileRestricted(e){this.Jc(),this.Yc(e)}enterRestrictedMode(e){if(!this.$c){this.$c=!0,this.Gc=e||!1;let t=aj();t&&"function"==typeof t.removeEventListener&&t.removeEventListener("visibilitychange",this.jc)}}enqueue(e){if(this.Jc(),this.$c)return new Promise(()=>{});let t=new V;return this.Yc(()=>this.$c&&this.Gc?Promise.resolve():(e().then(t.resolve,t.reject),t.promise)).then(()=>t.promise)}enqueueRetryable(e){this.enqueueAndForget(()=>(this.qc.push(e),this.Zc()))}async Zc(){if(0!==this.qc.length){try{await this.qc[0](),this.qc.shift(),this.xn.reset()}catch(e){if(!eo(e))throw e;v(us,"Operation failed with retryable error: "+e)}this.qc.length>0&&this.xn.mn(()=>this.Zc())}}Yc(e){let t=this.Hc.then(()=>(this.Qc=!0,e().catch(e=>{throw this.Wc=e,this.Qc=!1,_("INTERNAL UNHANDLED ERROR: ",ua(e)),e}).then(e=>(this.Qc=!1,e))));return this.Hc=t,t}enqueueAfterDelay(e,t,r){this.Jc(),this.zc.indexOf(e)>-1&&(t=0);let n=od.createAndSchedule(this,e,t,r,e=>this.Xc(e));return this.Kc.push(n),n}Jc(){this.Wc&&x(47125,{el:ua(this.Wc)})}verifyOperationInProgress(){}async tl(){let e;do e=this.Hc,await e;while(e!==this.Hc)}nl(e){for(let t of this.Kc)if(t.timerId===e)return!0;return!1}rl(e){return this.tl().then(()=>{for(let t of(this.Kc.sort((e,t)=>e.targetTimeMs-t.targetTimeMs),this.Kc))if(t.skipDelay(),"all"!==e&&t.timerId===e)break;return this.tl()})}il(e){this.zc.push(e)}Xc(e){let t=this.Kc.indexOf(e);this.Kc.splice(t,1)}}function ua(e){let t=e.message||"";return e.stack&&(t=e.stack.includes(e.message)?e.stack:e.message+"\n"+e.stack),t}class uo extends nI{constructor(e,t,r,n){super(e,t,r,n),this.type="firestore",this._queue=new ui,this._persistenceKey=n?.name||"[DEFAULT]"}async _terminate(){if(this._firestoreClient){let e=this._firestoreClient.terminate();this._queue=new ui(e),this._firestoreClient=void 0,await e}}}function uu(e,t){let r="object"==typeof e?e:(0,o.Mq)(),n=(0,o.qX)(r,"firestore").getImmediate({identifier:"string"==typeof e?e:t||eL});if(!n._initialized){let e=(0,u.P0)("firestore");e&&function(e,t,r,n={}){e=J(e,nI);let s=(0,u.Xx)(t),i=e._getSettings(),a={...i,emulatorOptions:e._getEmulatorOptions()},o=`${t}:${r}`;s&&(0,u.Uo)(`https://${o}`),i.host!==nb&&i.host!==o&&E("Host has been set in both settings() and connectFirestoreEmulator(), emulator host will be used.");let l={...i,host:o,ssl:s,emulatorOptions:n};if(!(0,u.vZ)(l,a)&&(e._setSettings(l),n.mockUserToken)){let t,r;if("string"==typeof n.mockUserToken)t=n.mockUserToken,r=f.MOCK_USER;else{t=(0,u.Sg)(n.mockUserToken,e._app?.options.projectId);let s=n.mockUserToken.sub||n.mockUserToken.user_id;if(!s)throw new I(S.INVALID_ARGUMENT,"mockUserToken must contain 'sub' or 'user_id' field!");r=new f(s)}e._authCredentials=new D(new C(t,r))}}(n,...e)}return n}function ul(e){if(e._terminated)throw new I(S.FAILED_PRECONDITION,"The client has already been terminated.");return e._firestoreClient||function(e){var t,r,n,s;let i=e._freezeSettings(),a=(t=e._databaseId,r=e._app?.options.appId||"",n=e._persistenceKey,s=e._app?.options.apiKey,new ek(t,r,n,i.host,i.ssl,i.experimentalForceLongPolling,i.experimentalAutoDetectLongPolling,r5(i.experimentalLongPollingOptions),i.useFetchStreams,i.isUsingEmulator,s));e._componentsProvider||i.localCache?._offlineComponentProvider&&i.localCache?._onlineComponentProvider&&(e._componentsProvider={_offline:i.localCache._offlineComponentProvider,_online:i.localCache._onlineComponentProvider}),e._firestoreClient=new o9(e._authCredentials,e._appCheckCredentials,e._queue,a,e._componentsProvider&&function(e){let t=e?._online.build();return{_offline:e?._offline.build(t),_online:t}}(e._componentsProvider))}(e),e._firestoreClient}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class uc{convertValue(e,t="none"){switch(eQ(e)){case 0:return null;case 1:return e.booleanValue;case 2:return ex(e.integerValue||e.doubleValue);case 3:return this.convertTimestamp(e.timestampValue);case 4:return this.convertServerTimestamp(e,t);case 5:return e.stringValue;case 6:return this.convertBytes(eN(e.bytesValue));case 7:return this.convertReference(e.referenceValue);case 8:return this.convertGeoPoint(e.geoPointValue);case 9:return this.convertArray(e.arrayValue,t);case 11:return this.convertObject(e.mapValue,t);case 10:return this.convertVectorValue(e.mapValue);default:throw x(62114,{value:e})}}convertObject(e,t){return this.convertObjectMap(e.fields,t)}convertObjectMap(e,t="none"){let r={};return ey(e,(e,n)=>{r[e]=this.convertValue(n,t)}),r}convertVectorValue(e){return new nk(e.fields?.[e$].arrayValue?.values?.map(e=>ex(e.doubleValue)))}convertGeoPoint(e){return new r9(ex(e.latitude),ex(e.longitude))}convertArray(e,t){return(e.values||[]).map(e=>this.convertValue(e,t))}convertServerTimestamp(e,t){switch(t){case"previous":let r=eA(e);return null==r?null:this.convertValue(r,t);case"estimate":return this.convertTimestamp(eD(e));default:return null}}convertTimestamp(e){let t=eT(e);return new ee(t.seconds,t.nanos)}convertDocumentKey(e,t){let r=Q.fromString(e);b(rX(r),9688,{name:e});let n=new eR(r.get(1),r.get(3)),s=new G(r.popFirst(5));return n.isEqual(t)||_(`Document ${s} contains a document reference within a different database (${n.projectId}/${n.database}) which is not supported. It will be treated as a reference in the current database (${t.projectId}/${t.database}) instead.`),s}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class uh extends uc{constructor(e){super(),this.firestore=e}convertBytes(e){return new r3(e)}convertReference(e){let t=this.convertDocumentKey(e,this.firestore._databaseId);return new nC(this.firestore,null,t)}}}}]);