import{S as D,i as F,s as G,E as H,k as v,q as O,a as S,J,l as p,m as b,r as A,h as f,c as q,n as y,C as g,b as C,F as K,G as U,H as V,g as Y,d as j,K as B,u as M}from"../chunks/index.5fa4193b.mjs";function x(d,n,o){const s=d.slice();return s[3]=n[o],s}function N(d){let n,o,s=d[3]+"",a,i,r;return{c(){n=v("li"),o=v("a"),a=O(s),r=S(),this.h()},l(h){n=p(h,"LI",{});var l=b(n);o=p(l,"A",{href:!0,class:!0});var k=b(o);a=A(k,s),k.forEach(f),r=q(l),l.forEach(f),this.h()},h(){y(o,"href",i="/guides/hooks/"+d[3]),y(o,"class","hover:underline")},m(h,l){C(h,n,l),g(n,o),g(o,a),g(n,r)},p(h,l){l&1&&s!==(s=h[3]+"")&&M(a,s),l&1&&i!==(i="/guides/hooks/"+h[3])&&y(o,"href",i)},d(h){h&&f(n)}}}function P(d){let n,o,s,a,i,r,h,l,k,E=d[0].hooks,c=[];for(let t=0;t<E.length;t+=1)c[t]=N(x(d,E,t));const z=d[2].default,u=H(z,d,d[1],null);return{c(){n=v("style"),o=O(`:root {
			--code-bg: var(--back-light);
			--code-base: hsl(45, 7%, 35%);
			--code-comment: hsl(0, 0%, 41%);
			--code-keyword: hsl(204, 88%, 35%);
			--code-function: hsl(19, 67%, 44%);
			--code-string: hsl(41, 37%, 38%);
			--code-number: hsl(120, 100%, 25%);
			--code-template-string: hsl(2, 80%, 47%);
			--code-tags: var(--code-function);
			--code-important: var(--code-string);
		}

		pre {
			tab-size: 2;
			-moz-tab-size: 2;
		}

		.code-block pre {
			background-color: var(--code-bg);
			color: var(--code-base);
			border-radius: 0.5rem;
			padding: 1rem;
			margin: 0 0 1rem;
			font-size: 14px;
		}

		.code-block pre code,
		.token {
			color: var(--code-base);
		}

		.token.tag,
		.token.attr-value .attr-equals {
			color: var(--code-function);
		}

		.token.string,
		.token.interpolation-punctuation,
		.token.attr-value,
		.token.inserted {
			color: var(--code-string);
		}

		.token.builtin,
		.token.function {
			color: var(--code-function);
		}

		.token.keyword,
		.token.boolean {
			color: var(--code-keyword);
		}

		.token.comment {
			color: var(--code-comment);
		}

		.token.deleted {
			color: #fc9b9b;
		}

		.token.template-string .interpolation-punctuation,
		.token.template-string .string {
			color: var(--code-template-string);
		}`),s=S(),a=v("div"),i=v("section"),r=v("ul");for(let t=0;t<c.length;t+=1)c[t].c();h=S(),l=v("section"),u&&u.c(),this.h()},l(t){const m=J("svelte-4ylx25",document.head);n=p(m,"STYLE",{});var e=b(n);o=A(e,`:root {
			--code-bg: var(--back-light);
			--code-base: hsl(45, 7%, 35%);
			--code-comment: hsl(0, 0%, 41%);
			--code-keyword: hsl(204, 88%, 35%);
			--code-function: hsl(19, 67%, 44%);
			--code-string: hsl(41, 37%, 38%);
			--code-number: hsl(120, 100%, 25%);
			--code-template-string: hsl(2, 80%, 47%);
			--code-tags: var(--code-function);
			--code-important: var(--code-string);
		}

		pre {
			tab-size: 2;
			-moz-tab-size: 2;
		}

		.code-block pre {
			background-color: var(--code-bg);
			color: var(--code-base);
			border-radius: 0.5rem;
			padding: 1rem;
			margin: 0 0 1rem;
			font-size: 14px;
		}

		.code-block pre code,
		.token {
			color: var(--code-base);
		}

		.token.tag,
		.token.attr-value .attr-equals {
			color: var(--code-function);
		}

		.token.string,
		.token.interpolation-punctuation,
		.token.attr-value,
		.token.inserted {
			color: var(--code-string);
		}

		.token.builtin,
		.token.function {
			color: var(--code-function);
		}

		.token.keyword,
		.token.boolean {
			color: var(--code-keyword);
		}

		.token.comment {
			color: var(--code-comment);
		}

		.token.deleted {
			color: #fc9b9b;
		}

		.token.template-string .interpolation-punctuation,
		.token.template-string .string {
			color: var(--code-template-string);
		}`),e.forEach(f),m.forEach(f),s=q(t),a=p(t,"DIV",{});var _=b(a);i=p(_,"SECTION",{class:!0});var I=b(i);r=p(I,"UL",{class:!0});var L=b(r);for(let w=0;w<c.length;w+=1)c[w].l(L);L.forEach(f),I.forEach(f),h=q(_),l=p(_,"SECTION",{class:!0,id:!0});var T=b(l);u&&u.l(T),T.forEach(f),_.forEach(f),this.h()},h(){y(r,"class","space-y-3 mt-8"),y(i,"class","fixed top-0 w-80 h-screen pt-16 flex flex-col border-r border-black"),y(l,"class","pl-80"),y(l,"id","main-container")},m(t,m){g(document.head,n),g(n,o),C(t,s,m),C(t,a,m),g(a,i),g(i,r);for(let e=0;e<c.length;e+=1)c[e].m(r,null);g(a,h),g(a,l),u&&u.m(l,null),k=!0},p(t,[m]){if(m&1){E=t[0].hooks;let e;for(e=0;e<E.length;e+=1){const _=x(t,E,e);c[e]?c[e].p(_,m):(c[e]=N(_),c[e].c(),c[e].m(r,null))}for(;e<c.length;e+=1)c[e].d(1);c.length=E.length}u&&u.p&&(!k||m&2)&&K(u,z,t,t[1],k?V(z,t[1],m,null):U(t[1]),null)},i(t){k||(Y(u,t),k=!0)},o(t){j(u,t),k=!1},d(t){f(n),t&&f(s),t&&f(a),B(c,t),u&&u.d(t)}}}function Q(d,n,o){let{$$slots:s={},$$scope:a}=n,{data:i}=n;return d.$$set=r=>{"data"in r&&o(0,i=r.data),"$$scope"in r&&o(1,a=r.$$scope)},[i,a,s]}class W extends D{constructor(n){super(),F(this,n,Q,P,G,{data:0})}}export{W as default};
