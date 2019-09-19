angular.module('tests', []);

describe('example', function () {
	let q, rootScope;
	
	beforeEach(function () {
		angular.mock.module('tests', function ($qProvider) {
      //$qProvider.errorOnUnhandledRejections(false); //It hurts!
    });
		inject(function ($q, $rootScope) {
			q = $q;
			rootScope = $rootScope;
		});
	});
	
	it('should not call promise without digest', function () {
		const spy = jasmine.createSpy('spy').and.returnValue('it works!');
		q.resolve('something')
		    .then(spy);
		expect(spy).not.toHaveBeenCalled();
	});
	
	it('should call promise after digest', function () {
		const spy = jasmine.createSpy('spy').and.returnValue('it works!');
		q.resolve('something')
		    .then(spy);
		rootScope.$digest();
		expect(spy).toHaveBeenCalled();
	});
	
	it('other method to test async code', function (done) {
		q.resolve('something')
		    .then(done);
		rootScope.$digest();
  });
  
  xit('failing promise', function () {
    q.reject('error!');
		rootScope.$digest();
  });
});
