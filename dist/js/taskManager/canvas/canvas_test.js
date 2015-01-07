define(["require","./canvasModule","./canvasConstructor","angular"],function(e){e("./canvasModule");var t=e("./canvasConstructor"),n=e("angular").element;describe("canvas",function(){describe("constructor",function(){it("should throw if not given a map",function(){expect(function(){t(null,{})}).toThrow()}),it("should throw if settings is not set",function(){expect(function(){t({},null)}).toThrow()}),it("should throw if settings has a non existant key",function(){expect(function(){t({},{nonExistant:!0})}).toThrow()}),it("should set the css according to a rule",function(){var e=n("<div>"),r={element:e,property:"color"};t({test:r},{test:"red"}),expect(e.css("color")).toBe("red")}),it("should remove the rule when the cb is called",function(){var e=n("<div>").css("color","green"),r={element:e,property:"color"},i=t({test:r},{test:"red"});i.apply(),expect(e.css("color")).toBe("green")}),it("should remove all rules when cb is called",function(){var e={css:jasmine.createSpy("css")},n={rule1:{element:e},rule2:{element:e}},r=t(n,{rule1:"",rule2:""});e.css.reset(),r.apply(),expect(e.css.calls.length).toBe(2)}),it("should not throw if no rules are activated",function(){var e=t({},{});expect(e).not.toThrow()})}),describe("service",function(){var e,t,r;beforeEach(module("pi.canvas")),beforeEach(inject(function(i,s,o){e=i,t=n(s[0].body),r=o})),it("should apply backgroundColor",function(){r({backgroundColor:"rgb(255, 0, 0)"}),expect(t.css("backgroundColor")).toBe("rgb(255, 0, 0)")}),it("should apply canvasColor",function(){r({canvasColor:"red"}),expect(e.css("background")).toBe("red")}),it("should apply fontSize",function(){r({fontSize:"3em"}),expect(e.css("fontSize")).toBe("3em")}),it("should apply fontColor",function(){r({fontColor:"red"}),expect(e.css("color")).toBe("red")})})})});