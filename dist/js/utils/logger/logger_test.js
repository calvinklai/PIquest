define(["./logger-module"],function(){var e,t,n={pulse:3};describe("Logger",function(){beforeEach(module("logger",function(e){e.settings={pulse:10,url:"/url",fake:"fake"}})),beforeEach(inject(function(r,i){e=r,t=new i,t.setSettings(n)})),it("should add logged objects to the stack",function(){t.log(1),t.log(2),expect(t.pending[0]).toBe(1),expect(t.pending[1]).toBe(2)}),describe(": settings",function(){it('should have a method that sets "settings"',function(){var e={a:1};expect(t.setSettings).toBeDefined(),t.setSettings(e),expect(t.setSettings().a).toBe(1)}),it("should inherit settings (across instances)",function(){expect(t.settings.fake).toBe("fake"),expect(t.settings.pulse).not.toBe(10)}),it("should throw an error if meta is set and we try to log a non object",inject(function(e){var n=new e({meta:{a:1}});expect(function(){t.log(1234)}).not.toThrow(),expect(function(){n.log(1234)}).toThrow()}))}),describe(": pulse",function(){it("should support send after logging settings.pulse objects",function(){spyOn(t,"send"),t.log(1),t.log(2),expect(t.send).not.toHaveBeenCalled(),t.log(3),expect(t.send).toHaveBeenCalled()}),it("should not pulse if pulse is not set or set to 0",function(){spyOn(t,"send"),t.settings.pulse=0,t.log(1),t.log(2),expect(t.send).not.toHaveBeenCalled(),t.settings.pulse=undefined,t.log(3),t.log(4),expect(t.send).not.toHaveBeenCalled()}),it("should not pulse if suppressPulse was called",function(){spyOn(t,"send"),t.suppressPulse(),t.log(1),t.log(2),t.log(3),expect(t.send).not.toHaveBeenCalled()}),describe(": suppressPulse",function(){it("should set suppress to true by default",function(){t.suppressPulse(),expect(t.suppress).toBeTruthy()}),it("should set suppress to the argument",function(){t.suppressPulse(!0),expect(t.suppress).toBeTruthy(),t.suppressPulse(!1),expect(t.suppress).not.toBeTruthy()})})}),describe(": send",function(){beforeEach(function(){e.when("POST","/url").respond({})}),afterEach(function(){e.verifyNoOutstandingExpectation(),e.verifyNoOutstandingRequest()}),it("should post data to settings.url",function(){e.expectPOST("/url"),t.log(1),t.send(),e.flush()}),it("should not post data if there are no pending objects",inject(function(e){spyOn(e,"post"),t.send(),expect(e.post).not.toHaveBeenCalled()})),it("should remove logged objects from the stack and save them after each send",function(){t.log(1),t.log(2),t.log(3),expect(t.sent.length).toBe(3),expect(t.pending.length).toBe(0),e.flush()}),it("should throw an error only if there was a log but a url was not set",function(){expect(function(){t.send()}).not.toThrow(),t.log(1),expect(function(){t.send()}).not.toThrow(),t.log(1),t.settings.url=undefined,expect(function(){t.send()}).toThrow(),e.flush()}),it("should return a promise",function(){expect(t.send().then).toEqual(jasmine.any(Function)),t.log(1),expect(t.send().then).toEqual(jasmine.any(Function)),e.flush()})}),it("should supply a log counter across instances",inject(function(e){var t=new e;t.setSettings(n);var r=new e;r.setSettings(n),expect(t.getCount()).toBe(0),t.log(123),r.log(123),expect(t.getCount()).toBe(2),r.log(123),expect(t.getCount()).toBe(3),expect(r.getCount()).toBe(3)})),it("should log an object to the console if DEBUG is set to true",inject(function(e,n){n.tags=!0,t.log(123),expect(e.debug.logs[0]).toEqual(["Logged: ",123])})),it("should parse the input using logFn if it exists",function(){t.settings.logFn=function(e,t){return e+t},t.log(1,2),expect(t.pending[0]).toBe(3)}),it("should use the default log function if it is set (and pass all relevant arguments)",inject(function(e){var t=jasmine.createSpy("logFn").andCallFake(function(e){return e}),n=new e(t);n.log(1,2,3),expect(n.pending[0]).toBe(1),expect(t).toHaveBeenCalledWith(1,2,3)})),it("should extend the log object with whatever is set in settings.meta",inject(function(e){var t=new e;t.setSettings({meta:{a:1}}),t.log({b:2}),t.log({c:3}),expect(t.pending[0]).toEqual({a:1,b:2}),expect(t.pending[1]).toEqual({a:1,c:3})}))})});