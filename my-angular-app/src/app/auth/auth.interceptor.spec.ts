import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthInterceptor } from './auth.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

describe('AuthInterceptor', () => {
  let httpTestingController: HttpTestingController;
  let authInterceptor: AuthInterceptor;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        AuthInterceptor,
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
      ]
    });

    httpTestingController = TestBed.inject(HttpTestingController);
    authInterceptor = TestBed.inject(AuthInterceptor);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(authInterceptor).toBeTruthy();
  });

  it('should add Authorization header if token is available', () => {
    const token = 'dummy-token';
    localStorage.setItem('jwtToken', token);


    const req = httpTestingController.expectOne('/your-endpoint');
    expect(req.request.headers.has('Authorization')).toEqual(true);
    expect(req.request.headers.get('Authorization')).toBe(`Bearer ${token}`);
  });

  it('should not add Authorization header if token is not available', () => {
    localStorage.removeItem('jwtToken');


    const req = httpTestingController.expectOne('/your-endpoint');
    expect(req.request.headers.has('Authorization')).toEqual(false);
  });

  it('should not modify requests to excluded endpoints', () => {
    const excludedUrl = '/register';


    const req = httpTestingController.expectOne(excludedUrl);
    expect(req.request.headers.has('Authorization')).toEqual(false);
  });
});
