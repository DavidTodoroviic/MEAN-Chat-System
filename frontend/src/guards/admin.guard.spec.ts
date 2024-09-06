import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AdminGuard } from './admin.guard';
import { AuthService } from '../app/services/auth.service'; // Corrected path
import { RouterTestingModule } from '@angular/router/testing';

describe('AdminGuard', () => {
  let guard: AdminGuard;
  let authService: AuthService;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        AdminGuard,
        {
          provide: AuthService,
          useValue: {
            hasRole: jasmine.createSpy('hasRole').and.returnValue(true)
          }
        }
      ]
    });

    guard = TestBed.inject(AdminGuard);
    authService = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should allow access if user has admin role', () => {
    (authService.hasRole as jasmine.Spy).and.returnValue(true);
    expect(guard.canActivate()).toBe(true);
  });

  it('should deny access if user does not have admin role', () => {
    (authService.hasRole as jasmine.Spy).and.returnValue(false);
    spyOn(router, 'navigate');
    expect(guard.canActivate()).toBe(false);
    expect(router.navigate).toHaveBeenCalledWith(['/login']);
  });
});
