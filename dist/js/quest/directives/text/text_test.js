define(["underscore","../questDirectivesModule"],function(e){describe("questText",function(){var e,t,n,r,i,s,o,u=jasmine.createSpy("addQuest"),a=angular.element,f,l=function(s){e=a('<div id="input" quest-text quest-data="data" ng-model="current.logObj"></div>'),s.name="test",n.data=s,r(e)(n),n.$digest(),t=e.find("input"),f=n.current.logObj};beforeEach(module("questDirectives",function(e){e.directive("piqPageInject",function(){return{priority:-100,link:function(e,t){t.data("$piqPageController",{addQuest:u})}}})})),beforeEach(inject(function(e,u,a){i=u,s=a,r=e.get("$compile"),n=e.get("$rootScope"),n.current={},n=n.$new(),o=function(e){t.val(e),t.trigger(i.hasEvent("input")?"input":"change")}})),it("should bind to a model",function(){l({}),expect(f.response).toBe(""),o("hello"),expect(f.response).toBe("hello"),o("band"),expect(f.response).toBe("band")}),it("should support dflt",function(){l({dflt:"default value"}),expect(t.val()).toBe("default value"),expect(f.response).toBe("default value")}),it("should support dflt even if the default value is 0",function(){l({name:2,dflt:0}),expect(t.val()).toBe("0")}),describe(": required validation",function(){var t;beforeEach(function(){l({required:!0,errorMsg:{required:"required msg"}}),t=e.find('[pi-quest-validation="form.$error.required && $parent.$parent.submitAttempt"]')}),it("should be valid at the begining",function(){expect(t).not.toBeShown()}),it('should invalidate after "submitAttempt"',function(){n.$parent.submitAttempt=!0,n.$digest(),expect(e).toBeInvalid(),expect(t).toBeShown()}),it("should be valid if there is any input",function(){n.$parent.submitAttempt=!0,n.$digest(),o("hello"),expect(e).toBeValid(),expect(t).toBeHidden()})}),it("should support maxlength",function(){l({maxlength:5,errorMsg:{maxlength:"maxlength msg"}});var t=e.find('[pi-quest-validation="form.$error.maxlength"]');expect(t.text()).toBe("maxlength msg"),o("aaa"),expect(e).toBeValid(),expect(t).toBeHidden(),o("aaaaaaa"),expect(e).toBeInvalid()}),it("should support minlength",function(){l({minlength:5,errorMsg:{minlength:"minlength msg"}});var t=e.find('[pi-quest-validation="form.$error.minlength"]');expect(t.text()).toBe("minlength msg"),o("aaaaaaa"),expect(e).toBeValid(),expect(t).toBeHidden(),o("aaa"),expect(e).toBeInvalid()}),it("should support correct validation",function(){l({correct:!0,correctValue:123,errorMsg:{correct:"correct msg"}});var t=e.find('[pi-quest-validation="model.$error.correct"]');expect(t.text()).toBe("correct msg"),o("123"),expect(e).toBeValid(),expect(t).toBeHidden(),o("aaa"),expect(e).toBeInvalid()}),it("should support pattern regex",function(){l({pattern:/^\d\d\d-\d\d-\d\d\d\d$/,errorMsg:{pattern:"pattern msg"}});var t=e.find('[pi-quest-validation="form.$error.pattern"]');expect(t.text()).toBe("pattern msg"),o("x000-00-0000x"),expect(e).toBeInvalid(),o("000-00-0000"),expect(e).toBeValid(),expect(t).toBeHidden(),o("000-00-0000x"),expect(e).toBeInvalid(),o("123-45-6789"),expect(e).toBeValid(),o("x"),expect(e).toBeInvalid()}),it("should support pattern string",function(){l({pattern:"^\\d\\d\\d-\\d\\d-\\d\\d\\d\\d$",errorMsg:{pattern:"pattern msg"}});var t=e.find('[pi-quest-validation="form.$error.pattern"]');expect(t.text()).toBe("pattern msg"),o("x000-00-0000x"),expect(e).toBeInvalid(),o("000-00-0000"),expect(e).toBeValid(),expect(t).toBeHidden(),o("000-00-0000x"),expect(e).toBeInvalid(),o("123-45-6789"),expect(e).toBeValid(),o("x"),expect(e).toBeInvalid()}),it("should support autoSubmit",function(){var e=a.Event("keypress",{keyCode:13,which:13}),r;l({}),r=jasmine.createSpy("quest:submit:now"),n.$on("quest:submit:now",r),t.trigger(e),expect(r).not.toHaveBeenCalled(),l({autoSubmit:!0}),r=jasmine.createSpy("quest:submit:now"),n.$on("quest:submit:now",r),t.trigger(e),expect(r).toHaveBeenCalled()})}),describe("toRegexFilter",function(){var t;beforeEach(module("questDirectives")),beforeEach(inject(function(e){t=e})),it("should be good for undefined values",function(){var n=t();expect(e.isRegExp(n)).toBeTruthy(),expect(n.toString()).toBe("/(?:)/")}),it("should parse a string correctly",function(){var n=t("a|b");expect(e.isRegExp(n)).toBeTruthy(),expect(n.toString()).toBe("/a|b/")}),it("should parse a regex correctly",function(){var n=t(/a|b/);expect(e.isRegExp(n)).toBeTruthy(),expect(n.toString()).toBe("/a|b/")}),it("should throw for non regex values",function(){expect(function(){t({})}).toThrow()})})});