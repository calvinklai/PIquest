define(["require","underscore"],function(e){function n(e){function n(r,i){function s(e){return n(e,i)}return t.isArray(r)&&(r={and:r}),r.and?t.every(r.and,s):r.nand?!t.every(r.nand,s):r.or?t.some(r.or,s):r.nor?!t.some(r.nor,s):e(r,i)}return n}var t=e("underscore");return n.$inject=["mixerCondition"],n});