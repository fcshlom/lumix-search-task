import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { GithubService } from './github.service';
import { SearchResults } from '../models/search-results';
import { HttpErrorResponse } from '@angular/common/http';

describe('GithubService', () => {
  let service: GithubService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [GithubService],
    });
    service = TestBed.inject(GithubService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('searchRepositories', () => {
    const apiUrl = 'https://api.github.com/search/repositories';

    it('should return search results when the API call is successful', () => {
      const query = 'angular';
      const page = 1;
      const pageSize = 10;

      const mockResponse: SearchResults = {
        query,
        total_count: 2,
        incomplete_results: false,
        items: [
          {
            name: 'angular-repo-1',
            description: 'This is repo 1',
            watchers: 10,
            html_url: 'https://github.com/angular/angular-repo-1',
            forks: 5,
            stargazers_count: 20,
            owner: { login: 'angular', avatar_url: 'https://avatar.url' },
          },
          {
            name: 'angular-repo-2',
            description: 'This is repo 2',
            watchers: 15,
            html_url: 'https://github.com/angular/angular-repo-2',
            forks: 8,
            stargazers_count: 30,
            owner: { login: 'angular', avatar_url: 'https://avatar.url' },
          },
        ],
      };

      service.searchRepositories(query, page, pageSize).subscribe((data) => {
        expect(data).toEqual(mockResponse);
      });

      const req = httpTestingController.expectOne(
        `${apiUrl}?q=${query}&per_page=${pageSize}&page=${page}`
      );
      expect(req.request.method).toBe('GET');
      req.flush(mockResponse);
    });

    it('should handle API errors correctly', () => {
      const query = 'invalid-query';
      const page = 1;
      const pageSize = 10;
      const errorMessage = 'An error occurred while fetching data.';

      service.searchRepositories(query, page, pageSize).subscribe(
        () => fail('Should not succeed'),
        (error: string) => {
          expect(error).toBe(errorMessage);
        }
      );

      const req = httpTestingController.expectOne(
        `${apiUrl}?q=${query}&per_page=${pageSize}&page=${page}`
      );
      req.flush('Not Found', { status: 404, statusText: 'Not Found' });
    });
  });

  describe('handleError', () => {
    it('should handle client-side error correctly', () => {
      const errorMessage = 'This is a client-side error message';
      const clientError = new ErrorEvent('Client-side error', {
        error: { message: errorMessage },
      });

      const errorResponse = new HttpErrorResponse({
        error: clientError,
        status: 0, // 0 for client-side errors
        statusText: 'Unknown Error',
      });

      const errorObservable = service['handleError'](errorResponse);

      // Use toThrowError on the observable to check if an error is emitted.
      expect(() => {
        errorObservable.subscribe();
      }).toThrowError(errorMessage);
    });

    it('should handle server-side error correctly', () => {
      const serverError = {
        status: 500,
        message: 'Internal Server Error',
      };

      const errorResponse = new HttpErrorResponse({
        error: serverError,
        status: serverError.status,
        statusText: serverError.message,
      });

      const errorObservable = service['handleError'](errorResponse);

      // Use toThrowError on the observable to check if an error is emitted.
      expect(() => {
        errorObservable.subscribe();
      }).toThrowError('Error Code: 500\nMessage: Internal Server Error');
    });
  });
});
